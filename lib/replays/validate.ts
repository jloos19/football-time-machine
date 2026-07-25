import type { CanonicalMatch } from "@/lib/archive/types";
import {
  getCanonicalMatchByEpisodeId,
  getPreferredSource,
  isProductionReadySource,
} from "@/lib/archive";
import {
  getPreferredReplayForEpisode,
  resolveReplay,
} from "./index";

type ResolvedReplay = ReturnType<typeof resolveReplay>;

export type ReplayValidationError = {
  code:
    | "missing-library-record"
    | "orphan-library-record"
    | "match-id-mismatch"
    | "legacy-replay-url"
    | "ineligible-preferred-source"
    | "resolver-mismatch"
    | "missing-canonical-match";
  message: string;
  tournamentId: string;
  episodeId?: string;
  matchNumber?: number;
  canonicalMatchId?: string;
};

export type TournamentEpisode = {
  id: string;
  tournamentId: string;
  n: number;
  match: string;
  replay?: unknown;
  replayUrl?: string;
  videoUrl?: string;
  watchUrl?: string;
  embedUrl?: string;
};

const LEGACY_REPLAY_KEYS = [
  "replayUrl",
  "videoUrl",
  "watchUrl",
  "embedUrl",
] as const;

function legacyReplayUrl(episode: TournamentEpisode): string | null {
  for (const key of LEGACY_REPLAY_KEYS) {
    const value = episode[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  const replay = episode.replay;
  if (!replay || typeof replay !== "object") {
    return null;
  }

  const url = (replay as { url?: unknown }).url;
  return typeof url === "string" && url.trim().length > 0 ? url : null;
}

function episodeMatchLabel(match: string): string {
  return match.trim();
}

export function validateTournamentReplays(
  tournamentId: string,
  episodes: TournamentEpisode[]
): ReplayValidationError[] {
  const errors: ReplayValidationError[] = [];

  for (const episode of episodes) {
    const canonical = getCanonicalMatchByEpisodeId(
      tournamentId as "usa-1994" | "france-1998" | "korea-japan-2002",
      episode.id
    );

    if (!canonical) {
      errors.push({
        code: "missing-canonical-match",
        message: `Episode ${episode.id} (${episode.match}) has no canonical archive record.`,
        tournamentId,
        episodeId: episode.id,
        matchNumber: episode.n,
      });
      continue;
    }

    const canonicalLabel = `${canonical.homeTeam} vs ${canonical.awayTeam}`;
    if (
      canonicalLabel !== episodeMatchLabel(episode.match) &&
      !teamsEquivalent(canonicalLabel, episode.match)
    ) {
      errors.push({
        code: "match-id-mismatch",
        message: `Canonical match "${canonicalLabel}" does not match episode "${episode.match}" for ${episode.id}.`,
        tournamentId,
        episodeId: episode.id,
        matchNumber: episode.n,
        canonicalMatchId: canonical.canonicalMatchId,
      });
    }

    const legacyUrl = legacyReplayUrl(episode);
    if (legacyUrl) {
      errors.push({
        code: "legacy-replay-url",
        message: `Episode ${episode.id} still carries a legacy direct replay URL (${legacyUrl}).`,
        tournamentId,
        episodeId: episode.id,
        matchNumber: episode.n,
      });
    }

    const preferred = getPreferredReplayForEpisode(episode);
    const resolved = resolveReplay(canonical);

    if (JSON.stringify(preferred) !== JSON.stringify(resolved)) {
      errors.push({
        code: "resolver-mismatch",
        message: `getPreferredReplayForEpisode(${episode.id}) does not match resolveReplay for the canonical record.`,
        tournamentId,
        episodeId: episode.id,
        matchNumber: episode.n,
        canonicalMatchId: canonical.canonicalMatchId,
      });
    }

    const source = getPreferredSource(canonical);
    if (preferred && (!source || !isProductionReadySource(source))) {
      errors.push({
        code: "ineligible-preferred-source",
        message: `Preferred replay for ${episode.id} is not a human-verified active full-match source.`,
        tournamentId,
        episodeId: episode.id,
        matchNumber: episode.n,
        canonicalMatchId: canonical.canonicalMatchId,
      });
    }
  }

  return errors;
}

function teamsEquivalent(a: string, b: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/republic of ireland/i, "ireland");
  const flip = (s: string) => {
    const [left, right] = s.split(" vs ");
    return `${right} vs ${left}`;
  };
  const na = norm(a);
  const nb = norm(b);
  return na === nb || flip(na) === nb;
}

export function validateAllCuratedReplays(
  tournaments: Array<{
    tournamentId: string;
    episodes: TournamentEpisode[];
  }>
): ReplayValidationError[] {
  return tournaments.flatMap(({ tournamentId, episodes }) =>
    validateTournamentReplays(tournamentId, episodes)
  );
}

export function validateCanonicalMatch(match: CanonicalMatch): ReplayValidationError[] {
  const errors: ReplayValidationError[] = [];
  const preferred = getPreferredSource(match);
  if (preferred && !isProductionReadySource(preferred)) {
    errors.push({
      code: "ineligible-preferred-source",
      message: `Preferred source for ${match.canonicalMatchId} is not production-ready.`,
      tournamentId: match.tournamentId,
      canonicalMatchId: match.canonicalMatchId,
    });
  }
  return errors;
}
