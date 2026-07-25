import type {
  CanonicalMatch,
  CanonicalReplaySource,
  ExperienceDefinition,
  ExperienceKind,
  HumanVerification,
  TournamentId,
} from "./types";
import { usa1994Matches } from "./matches/usa1994";
import { france1998Matches } from "./matches/france1998";
import { koreaJapan2002Matches } from "./matches/koreaJapan2002";
import { tournamentExperiences } from "./experiences";
import { applyQaDecisions, loadQaDecisions, type QaDecisionStore } from "./qa-store";

export const CANONICAL_MATCH_COUNTS: Record<TournamentId, number> = {
  "usa-1994": 52,
  "france-1998": 64,
  "korea-japan-2002": 64,
};

export const TOURNAMENT_NAMES: Record<TournamentId, string> = {
  "usa-1994": "USA '94",
  "france-1998": "France '98",
  "korea-japan-2002": "Korea/Japan '02",
};

const baseArchives: Record<TournamentId, CanonicalMatch[]> = {
  "usa-1994": usa1994Matches,
  "france-1998": france1998Matches,
  "korea-japan-2002": koreaJapan2002Matches,
};

function cloneMatch(match: CanonicalMatch): CanonicalMatch {
  return structuredClone(match);
}

/** Load archive with QA decision overlays applied. */
export function getCanonicalArchive(
  tournamentId: TournamentId,
  qaStore?: QaDecisionStore
): CanonicalMatch[] {
  const base = baseArchives[tournamentId].map(cloneMatch);
  return applyQaDecisions(base, qaStore ?? loadQaDecisions());
}

export function getAllCanonicalMatches(qaStore?: QaDecisionStore): CanonicalMatch[] {
  const store = qaStore ?? loadQaDecisions();
  return (Object.keys(baseArchives) as TournamentId[]).flatMap((id) =>
    getCanonicalArchive(id, store)
  );
}

export function getCanonicalMatch(
  tournamentId: TournamentId,
  canonicalMatchId: string
): CanonicalMatch | null {
  return getCanonicalArchive(tournamentId).find(
    (m) => m.canonicalMatchId === canonicalMatchId
  ) ?? null;
}

export function getCanonicalMatchByEpisodeId(
  tournamentId: TournamentId,
  episodeId: string
): CanonicalMatch | null {
  return getCanonicalArchive(tournamentId).find(
    (m) => m.editorial?.journeyEpisodeId === episodeId
  ) ?? null;
}

export function getExperience(
  tournamentId: TournamentId,
  kind: ExperienceKind
): ExperienceDefinition | null {
  return (
    tournamentExperiences.find(
      (exp) => exp.tournamentId === tournamentId && exp.kind === kind
    ) ?? null
  );
}

export function getExperienceMatches(
  tournamentId: TournamentId,
  kind: ExperienceKind,
  qaStore?: QaDecisionStore
): CanonicalMatch[] {
  const exp = getExperience(tournamentId, kind);
  if (!exp) return [];
  const archive = getCanonicalArchive(tournamentId, qaStore);
  const byId = new Map(archive.map((m) => [m.canonicalMatchId, m]));
  return exp.canonicalMatchIds
    .map((id) => byId.get(id))
    .filter((m): m is CanonicalMatch => m != null);
}

export function getExperiencesForMatch(match: CanonicalMatch): ExperienceKind[] {
  return tournamentExperiences
    .filter(
      (exp) =>
        exp.tournamentId === match.tournamentId &&
        exp.canonicalMatchIds.includes(match.canonicalMatchId)
    )
    .map((exp) => exp.kind);
}

export function isHumanVerified(source: CanonicalReplaySource): boolean {
  return source.humanVerification.status === "verified";
}

export function isProductionReadySource(source: CanonicalReplaySource): boolean {
  return (
    source.status === "active" &&
    source.fullMatch &&
    isHumanVerified(source)
  );
}

export function sortSourcesByPriority(
  sources: CanonicalReplaySource[]
): CanonicalReplaySource[] {
  const priority = ["FIFA", "Official broadcaster", "Dailymotion", "YouTube"];
  return [...sources].sort(
    (a, b) => priority.indexOf(a.provider) - priority.indexOf(b.provider)
  );
}

export function getPreferredSource(
  match: CanonicalMatch
): CanonicalReplaySource | null {
  if (match.preferredSourceId) {
    const preferred = match.replaySources.find(
      (s) => s.id === match.preferredSourceId
    );
    if (preferred && isProductionReadySource(preferred)) {
      return preferred;
    }
  }

  const fifa = match.replaySources.find(
    (s) => s.provider === "FIFA" && isProductionReadySource(s)
  );
  if (fifa) return fifa;

  return (
    sortSourcesByPriority(match.replaySources).find(isProductionReadySource) ??
    null
  );
}

export function getEligibleSources(
  match: CanonicalMatch
): CanonicalReplaySource[] {
  return sortSourcesByPriority(match.replaySources).filter(
    isProductionReadySource
  );
}

export function hasHumanVerifiedFullMatch(match: CanonicalMatch): boolean {
  return match.replaySources.some(isProductionReadySource);
}

export type ExperienceProgress = {
  tournamentId: TournamentId;
  kind: ExperienceKind;
  label: string;
  total: number;
  humanVerified: number;
  noWorkingReplay: number;
};

export function getExperienceProgress(qaStore?: QaDecisionStore): ExperienceProgress[] {
  const kinds: ExperienceKind[] = ["complete", "journey", "essential"];
  const tournaments: TournamentId[] = ["usa-1994", "france-1998", "korea-japan-2002"];

  return tournaments.flatMap((tournamentId) =>
    kinds.map((kind) => {
      const exp = getExperience(tournamentId, kind);
      const matches = getExperienceMatches(tournamentId, kind, qaStore);
      const humanVerified = matches.filter(hasHumanVerifiedFullMatch).length;
      return {
        tournamentId,
        kind,
        label: exp?.label ?? kind,
        total: matches.length,
        humanVerified,
        noWorkingReplay: matches.length - humanVerified,
      };
    })
  );
}

export { matchLabel } from "./types";
export { tournamentExperiences } from "./experiences";
export {
  FRANCE_1998_FIFA_REPLAYS,
  FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS,
  FRANCE_1998_RETIRED_JOURNEY_DAILYMOTION_SOURCES,
} from "./france1998-fifa-catalog";
export {
  mapFrance1998FifaCatalog,
  findCanonicalMatchForFifaEntry,
} from "./france1998-fifa-apply";
export {
  USA_1994_REPLAY_CATALOG,
  USA_1994_JOURNEY_MEMBERSHIP,
} from "./usa1994-replay-catalog";
export {
  mapUsa1994ReplayCatalog,
  findCanonicalMatchForUsa1994Entry,
  applyUsa1994ReplayCatalogToArchive,
} from "./usa1994-replay-apply";
