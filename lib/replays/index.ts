import type { ReplayProvider } from "./types";
import type { Replay, ReplayAlternate } from "@/data/seasons";
import type {
  CanonicalMatch,
  CanonicalReplaySource,
  HighlightPackageKind,
} from "@/lib/archive/types";
import {
  getAllCanonicalMatches,
  getCanonicalMatch,
  getCanonicalMatchByEpisodeId,
  getEligibleSources,
  getPreferredHighlightSource,
  getPreferredSource,
  isProductionReadySource,
  sortSourcesByPriority,
  TOURNAMENT_NAMES,
} from "@/lib/archive";
import { officialHighlightsLabel } from "@/lib/archive/highlights-label";

/** User-facing official highlights link — never marks a match complete. */
export type OfficialHighlights = {
  url: string;
  provider: ReplayProvider;
  packageKind: HighlightPackageKind;
  /** Display label — always "Highlights" in the primary UI. */
  label: string;
  official: boolean;
} | null;

export { TOURNAMENT_NAMES };
export { UBLOCK_ORIGIN_URL } from "./constants";


const PROVIDER_PRIORITY: ReplayProvider[] = [
  "FIFA",
  "Official broadcaster",
  "Dailymotion",
  "YouTube",
];

export const PROVIDER_LABEL: Record<ReplayProvider, string> = {
  FIFA: "FIFA",
  "Official broadcaster": "Official broadcaster",
  Dailymotion: "Dailymotion",
  YouTube: "YouTube",
};

/** @deprecated Replay libraries are now in lib/archive. */
export const replayLibraries: Record<string, Record<string, never>> = {
  "usa-1994": {},
  "france-1998": {},
  "korea-japan-2002": {},
};

function providerRank(provider: ReplayProvider): number {
  const index = PROVIDER_PRIORITY.indexOf(provider);
  return index === -1 ? PROVIDER_PRIORITY.length : index;
}

export function sortSources(
  sources: CanonicalReplaySource[]
): CanonicalReplaySource[] {
  return sortSourcesByPriority(sources);
}

export function isUsableSource(source: CanonicalReplaySource): boolean {
  return isProductionReadySource(source);
}

export function getActiveSources(match: CanonicalMatch | null): CanonicalReplaySource[] {
  if (!match) return [];
  return getEligibleSources(match);
}

export function getMatchReplay(
  tournamentId: string,
  episodeId: string
): CanonicalMatch | null {
  return getCanonicalMatchByEpisodeId(
    tournamentId as "usa-1994" | "france-1998" | "korea-japan-2002",
    episodeId
  );
}

function toAlternate(source: CanonicalReplaySource): ReplayAlternate {
  return {
    provider: source.provider,
    label: PROVIDER_LABEL[source.provider],
    url: source.url,
    continuationUrl: source.continuationUrl,
  };
}

function effectivePreferredProvider(match: CanonicalMatch): ReplayProvider | undefined {
  const preferred = getPreferredSource(match);
  return preferred?.provider;
}

export function resolveUserFacingSources(
  match: CanonicalMatch | null
): { primary: CanonicalReplaySource; alternates: CanonicalReplaySource[] } | null {
  if (!match) return null;

  const preferred = getPreferredSource(match);
  if (!preferred) return null;

  // When FIFA is the production replay, keep Dailymotion as internal backup only.
  if (preferred.provider === "FIFA") {
    return { primary: preferred, alternates: [] };
  }

  const alternates = getEligibleSources(match).filter((s) => s.id !== preferred.id);
  return { primary: preferred, alternates };
}

export function resolveReplay(match: CanonicalMatch | null): Replay {
  const resolved = resolveUserFacingSources(match);
  if (!resolved) return null;

  const { primary, alternates } = resolved;

  return {
    url: primary.url,
    provider: primary.provider,
    preferredSource: match ? effectivePreferredProvider(match) : undefined,
    runtime: match?.editorial?.runtime,
    continuationUrl: primary.continuationUrl,
    alternates: alternates.map(toAlternate),
  };
}

/**
 * Resolves official highlights for a match.
 * Independent of full-match provider selection — FIFA / Dailymotion / future.
 */
export function resolveHighlights(match: CanonicalMatch | null): OfficialHighlights {
  if (!match) return null;
  const preferred = getPreferredHighlightSource(match);
  if (!preferred) return null;
  const packageKind = preferred.packageKind ?? "highlights";
  return {
    url: preferred.url,
    provider: preferred.provider,
    packageKind,
    label: officialHighlightsLabel(preferred.provider, packageKind),
    official: preferred.officialSource === true || preferred.provider === "FIFA",
  };
}

function resolveMatchForEpisode(episode: {
  id: string;
  tournamentId: string;
  canonicalMatchId?: string;
}): CanonicalMatch | null {
  const tournamentId = episode.tournamentId as
    | "usa-1994"
    | "france-1998"
    | "korea-japan-2002";
  return (
    getMatchReplay(episode.tournamentId, episode.id) ??
    getCanonicalMatch(tournamentId, episode.canonicalMatchId ?? episode.id)
  );
}

export function getPreferredReplay(matchId: string): Replay {
  const match = getAllCanonicalMatches().find(
    (m) =>
      m.canonicalMatchId === matchId ||
      m.editorial?.journeyEpisodeId === matchId
  );
  return resolveReplay(match ?? null);
}

export function getPreferredReplayForEpisode(episode: {
  id: string;
  tournamentId: string;
  canonicalMatchId?: string;
}): Replay {
  return resolveReplay(resolveMatchForEpisode(episode));
}

export function getPreferredHighlightsForEpisode(episode: {
  id: string;
  tournamentId: string;
  canonicalMatchId?: string;
}): OfficialHighlights {
  return resolveHighlights(resolveMatchForEpisode(episode));
}

/**
 * True when the user-facing preferred replay is hosted on Dailymotion.
 * Driven by replay provider metadata — not by button labels or URL text.
 */
export function shouldShowDailymotionRecommendation(
  replay: Replay | null | undefined
): boolean {
  return replay?.provider === "Dailymotion";
}

export function attachReplay<T extends { id: string; tournamentId: string }>(
  episode: T
): T & { replay: Replay; canonicalMatchId?: string } {
  const tournamentId = episode.tournamentId as
    | "usa-1994"
    | "france-1998"
    | "korea-japan-2002";
  const match =
    getMatchReplay(episode.tournamentId, episode.id) ??
    getCanonicalMatch(tournamentId, episode.id);
  return {
    ...episode,
    canonicalMatchId: match?.canonicalMatchId,
    replay: resolveReplay(match),
  };
}

export type ReplayAuditRow = {
  tournament: string;
  matchNumber: number;
  teams: string;
  preferredSource: ReplayProvider | "None";
  fallbackSources: ReplayProvider[];
  excludedSources: string[];
  verificationStatus: string;
  lastChecked: string | null;
  notes: string;
};

function formatSourceAudit(source: CanonicalReplaySource): string {
  const human = source.humanVerification.status;
  const auto = source.automatedCheck.status;
  const recheck = source.automatedCheck.recheckRecommended ? ", recheck recommended" : "";
  return `${source.provider} (human: ${human}, auto: ${auto}, ${source.status}${recheck})`;
}

export function auditReplayLibrary(
  tournamentId: string,
  matches: CanonicalMatch[]
): ReplayAuditRow[] {
  const tournament = TOURNAMENT_NAMES[tournamentId as keyof typeof TOURNAMENT_NAMES] ?? tournamentId;

  return matches
    .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex)
    .map((match) => {
      const resolved = resolveUserFacingSources(match);
      const preferred = resolved?.primary;
      const fallbacks = resolved?.alternates.map((s) => s.provider) ?? [];
      const excluded = sortSourcesByPriority(match.replaySources)
        .filter((s) => !isProductionReadySource(s))
        .map((s) => `${s.provider} (${s.status})`);

      const notes = [
        match.editorial?.auditNote,
        ...sortSourcesByPriority(match.replaySources).map(formatSourceAudit),
      ]
        .filter(Boolean)
        .join("; ");

      const lastChecked =
        preferred?.automatedCheck.lastChecked ??
        match.replaySources[0]?.automatedCheck.lastChecked ??
        null;

      return {
        tournament,
        matchNumber: match.chronologicalIndex,
        teams: `${match.homeTeam} vs ${match.awayTeam}`,
        preferredSource: preferred?.provider ?? "None",
        fallbackSources: fallbacks,
        excludedSources: excluded,
        verificationStatus: preferred
          ? `${preferred.provider} primary`
          : excluded.length > 0
            ? `No human-verified full-match source; excluded: ${excluded.join(", ")}`
            : "No human-verified full-match source",
        lastChecked,
        notes,
      };
    });
}

export function auditAllReplayLibraries(): ReplayAuditRow[] {
  return (["usa-1994", "france-1998", "korea-japan-2002"] as const).flatMap(
    (tournamentId) =>
      auditReplayLibrary(
        tournamentId,
        getAllCanonicalMatches().filter((m) => m.tournamentId === tournamentId)
      )
  );
}

export {
  getCanonicalMatch,
  getCanonicalMatchByEpisodeId,
  getExperienceMatches,
  getExperienceProgress,
  hasHumanVerifiedFullMatch,
} from "@/lib/archive";
