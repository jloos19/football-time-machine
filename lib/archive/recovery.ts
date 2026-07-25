import type { ReplayProvider } from "@/lib/replays/types";
import {
  getExperienceMatches,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
  sortSourcesByPriority,
} from "./index";
import type { QaDecisionStore } from "./qa-store";
import type {
  RecoveryCandidate,
  RecoveryFailedSource,
  RecoveryQueueEntry,
} from "./recovery-types";
import type { CanonicalMatch, MatchStage, TournamentId } from "./types";
import { matchLabel } from "./types";

/** France '98 Journey matches awaiting human-verified replay recovery. */
export const FRANCE_98_JOURNEY_RECOVERY_IDS: readonly string[] = [
  "france-1998-c04",
  "france-1998-c29",
  "france-1998-c32",
  "france-1998-c42",
  "france-1998-c44",
  "france-1998-c52",
  "france-1998-c53",
  "france-1998-c58",
  "france-1998-c59",
  "france-1998-c60",
  "france-1998-c61",
  "france-1998-c63",
] as const;

const KNOCKOUT_STAGES = new Set<MatchStage>([
  "Round of 16",
  "Quarter-final",
  "Semi-final",
  "Third-place play-off",
  "Final",
]);

export function isKnockoutStage(stage: MatchStage): boolean {
  return KNOCKOUT_STAGES.has(stage);
}

export function matchImportance(stage: MatchStage): "group" | "knockout" {
  return isKnockoutStage(stage) ? "knockout" : "group";
}

const TEAM_VARIANTS: Record<string, string[]> = {
  Brazil: ["Brazil", "Brasil"],
  Netherlands: ["Netherlands", "Holland"],
};

function teamVariants(team: string): string[] {
  return TEAM_VARIANTS[team] ?? [team];
}

function versusForms(home: string, away: string): string[] {
  return [`${home} v ${away}`, `${home} vs ${away}`];
}

function stageSearchLabels(stage: MatchStage): string[] {
  switch (stage) {
    case "Semi-final":
      return ["Semi-final", "Semi-finals", "semifinal"];
    case "Third-place play-off":
      return ["Third-place play-off", "Play-off for third place", "third place"];
    case "Quarter-final":
      return ["Quarter-final", "Quarter-finals"];
    case "Round of 16":
      return ["Round of 16"];
    default:
      return [stage];
  }
}

export function buildFifaSearchQueries(
  homeTeam: string,
  awayTeam: string,
  stage: MatchStage
): string[] {
  const homeVariants = teamVariants(homeTeam);
  const awayVariants = teamVariants(awayTeam);
  const queries = new Set<string>();

  for (const home of homeVariants) {
    for (const away of awayVariants) {
      for (const teams of versusForms(home, away)) {
        queries.add(`site:plus.fifa.com "${teams}" "Full Match Replay"`);
        queries.add(`site:plus.fifa.com "${teams}" "1998"`);
        queries.add(`site:fifa.com "${teams}" "1998 FIFA World Cup"`);
        queries.add(`site:fifa.com/en/watch ${home} ${away} 1998`);
        queries.add(`"${teams} | ${stageSearchLabels(stage)[0] ?? stage} | 1998 FIFA World Cup" FIFA`);
        queries.add(`"${home} ${away} 1998 full match replay" FIFA+`);
      }
    }
  }

  for (const stageLabel of stageSearchLabels(stage)) {
    queries.add(
      `site:plus.fifa.com "${homeTeam} v ${awayTeam}" "${stageLabel}" "1998"`
    );
    queries.add(
      `site:fifa.com "${homeTeam} v ${awayTeam}" "${stageLabel}" "Full Match Replay"`
    );
  }

  return [...queries];
}

export function buildSearchQueries(
  homeTeam: string,
  awayTeam: string,
  stage: MatchStage = "Group Stage"
): string[] {
  const fifaQueries = buildFifaSearchQueries(homeTeam, awayTeam, stage);
  return [
    `"${homeTeam} vs ${awayTeam}" 1998 full match`,
    `"${homeTeam}" "${awayTeam}" France 98 full game`,
    ...fifaQueries.slice(0, 4),
    `site:youtube.com "${homeTeam} vs ${awayTeam}" "1998" "full match"`,
    `site:dailymotion.com/video "${homeTeam} vs ${awayTeam}" "1998"`,
  ];
}

export function buildSearchUrl(
  provider: "fifa" | "fifa-plus" | "youtube" | "dailymotion" | "web",
  query: string
): string {
  const encoded = encodeURIComponent(query);
  switch (provider) {
    case "fifa":
      return `https://www.google.com/search?q=${encodeURIComponent(`site:fifa.com ${query}`)}`;
    case "fifa-plus":
      return `https://www.google.com/search?q=${encodeURIComponent(`site:plus.fifa.com ${query}`)}`;
    case "youtube":
      return `https://www.google.com/search?q=${encodeURIComponent(`site:youtube.com ${query}`)}`;
    case "dailymotion":
      return `https://www.google.com/search?q=${encodeURIComponent(`site:dailymotion.com/video ${query}`)}`;
    case "web":
      return `https://www.google.com/search?q=${encoded}`;
  }
}

export function detectProviderFromUrl(url: string): ReplayProvider {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (/(^|\.)fifa\.com$/i.test(host) || /(^|\.)plus\.fifa\.com$/i.test(host)) return "FIFA";
    if (/youtube\.com|youtu\.be/i.test(host)) return "YouTube";
    if (/dailymotion\.com/i.test(host)) return "Dailymotion";
  } catch {
    /* invalid URL */
  }
  return "Official broadcaster";
}

export function isOfficialSourceProvider(provider: ReplayProvider): boolean {
  return provider === "FIFA" || provider === "Official broadcaster";
}

export function nextRecoverySourceId(
  canonicalMatchId: string,
  existingSourceCount: number
): string {
  return `${canonicalMatchId}-src-${existingSourceCount + 1}`;
}

export function nextCandidateId(canonicalMatchId: string, existingCount: number): string {
  return `${canonicalMatchId}-cand-${existingCount + 1}`;
}

function describeFailedSource(match: CanonicalMatch): RecoveryFailedSource | null {
  const preferred = getPreferredSource(match);
  const failed = match.replaySources.find(
    (s) =>
      s.humanVerification.status === "failed" ||
      s.status === "dead" ||
      s.status === "wrong-match" ||
      s.status === "private"
  );

  const source = failed ?? match.replaySources[0];
  if (!source) return null;

  const failureReason =
    source.humanVerification.notes ??
    source.notes ??
    source.automatedCheck.reason ??
    (source.status === "dead"
      ? "Source marked dead"
      : source.status === "wrong-match"
        ? "Source marked wrong match"
        : source.status === "private"
          ? "Source marked private"
          : source.humanVerification.status === "failed"
            ? "Human verification failed"
            : "No working replay");

  return {
    id: source.id,
    provider: source.provider,
    url: source.url,
    status: source.status,
    humanStatus: source.humanVerification.status,
    failureReason,
  };
}

export function buildRecoveryQueueEntry(match: CanonicalMatch): RecoveryQueueEntry {
  return {
    tournamentId: match.tournamentId,
    canonicalMatchId: match.canonicalMatchId,
    teams: matchLabel(match),
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    stage: match.stage,
    importance: matchImportance(match.stage),
    failedSource: describeFailedSource(match),
    searchQueries: buildSearchQueries(match.homeTeam, match.awayTeam, match.stage),
    fifaSearchQueries: buildFifaSearchQueries(match.homeTeam, match.awayTeam, match.stage),
  };
}

export function buildFrance98JourneyRecoveryQueue(
  qaStore?: QaDecisionStore
): RecoveryQueueEntry[] {
  const journeyMatches = getExperienceMatches("france-1998", "journey", qaStore);
  const byId = new Map(journeyMatches.map((m) => [m.canonicalMatchId, m]));

  return FRANCE_98_JOURNEY_RECOVERY_IDS.map((id) => byId.get(id))
    .filter((m): m is CanonicalMatch => m != null)
    .filter((m) => !hasHumanVerifiedFullMatch(m))
    .map(buildRecoveryQueueEntry);
}

export function getCandidatesForMatch(
  candidates: RecoveryCandidate[],
  canonicalMatchId: string
): RecoveryCandidate[] {
  return candidates.filter((c) => c.canonicalMatchId === canonicalMatchId);
}

export function getActiveCandidatesForMatch(
  candidates: RecoveryCandidate[],
  canonicalMatchId: string
): RecoveryCandidate[] {
  return getCandidatesForMatch(candidates, canonicalMatchId).filter(
    (c) => c.candidateStatus !== "rejected" && c.candidateStatus !== "promoted"
  );
}

export function choosePreferredSourceId(match: CanonicalMatch, newSourceId: string): string {
  const ranked = sortSourcesByPriority(match.replaySources);
  const productionReady = ranked.filter(
    (s) => s.status === "active" && s.fullMatch && s.humanVerification.status === "verified"
  );

  if (productionReady.length === 0) return newSourceId;
  return productionReady[0]!.id;
}

export function isPlausibleFullMatchDuration(
  durationSeconds: number | undefined,
  stage: MatchStage
): boolean {
  if (durationSeconds === undefined) return true;
  const minSeconds = isKnockoutStage(stage) ? 75 * 60 : 85 * 60;
  const maxSeconds = 150 * 60;
  return durationSeconds >= minSeconds && durationSeconds <= maxSeconds;
}

export function looksLikeHighlightsTitle(title: string | undefined): boolean {
  if (!title) return false;
  const lower = title.toLowerCase();
  return (
    lower.includes("highlights") ||
    lower.includes("extended highlights") ||
    lower.includes("goals") ||
    lower.includes("all goals") ||
    lower.includes("summary")
  );
}

export function tournamentArchivePath(tournamentId: TournamentId): string {
  return tournamentId === "usa-1994"
    ? "lib/archive/matches/usa1994.ts"
    : "lib/archive/matches/france1998.ts";
}

export function tournamentArchiveExportName(tournamentId: TournamentId): string {
  if (tournamentId === "usa-1994") return "usa1994Matches";
  if (tournamentId === "france-1998") return "france1998Matches";
  return "koreaJapan2002Matches";
}
