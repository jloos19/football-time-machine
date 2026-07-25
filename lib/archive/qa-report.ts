import {
  getAllCanonicalMatches,
  getExperienceProgress,
  getExperiencesForMatch,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
} from "./index";
import type { QaDecisionStore } from "./qa-store";
import type { QaMatchRow, QaReport } from "./qa-report-types";

export type { QaMatchRow, QaProgressRow, QaReport } from "./qa-report-types";
export { filterQaMatches } from "./qa-report-types";

function matchHumanStatus(
  match: ReturnType<typeof getAllCanonicalMatches>[number],
  preferred: ReturnType<typeof getPreferredSource>
): string {
  if (preferred) return preferred.humanVerification.status;
  const statuses = match.replaySources.map((s) => s.humanVerification.status);
  if (statuses.includes("failed")) return "failed";
  if (statuses.includes("verified")) return "verified";
  return "untested";
}

function buildMatchRow(match: ReturnType<typeof getAllCanonicalMatches>[number]): QaMatchRow {
  const preferred = getPreferredSource(match);
  return {
    tournamentId: match.tournamentId,
    canonicalMatchId: match.canonicalMatchId,
    chronologicalIndex: match.chronologicalIndex,
    officialMatchNumber: match.officialMatchNumber,
    teams: `${match.homeTeam} vs ${match.awayTeam}`,
    date: match.date,
    stage: match.stage,
    experiences: getExperiencesForMatch(match),
    preferredSource: preferred
      ? {
          id: preferred.id,
          provider: preferred.provider,
          url: preferred.url,
          humanStatus: preferred.humanVerification.status,
          automatedStatus: preferred.automatedCheck.status,
          recheckRecommended: preferred.automatedCheck.recheckRecommended ?? false,
        }
      : null,
    alternativeSources: match.replaySources
      .filter((s) => s.id !== preferred?.id)
      .map((s) => ({
        id: s.id,
        provider: s.provider,
        url: s.url,
        status: s.status,
        humanStatus: s.humanVerification.status,
        automatedStatus: s.automatedCheck.status,
        fullMatch: s.fullMatch,
        notes: s.humanVerification.notes ?? s.notes,
        recheckRecommended: s.automatedCheck.recheckRecommended ?? false,
      })),
    noHumanVerifiedReplay: !hasHumanVerifiedFullMatch(match),
    humanStatus: matchHumanStatus(match, preferred),
  };
}

export function buildQaReport(
  generatedAt = new Date().toISOString(),
  qaStore?: QaDecisionStore
): QaReport {
  const matches = getAllCanonicalMatches(qaStore)
    .map(buildMatchRow)
    .sort((a, b) => {
      if (a.tournamentId !== b.tournamentId) {
        return a.tournamentId.localeCompare(b.tournamentId);
      }
      return a.chronologicalIndex - b.chronologicalIndex;
    });

  return {
    generatedAt,
    progress: getExperienceProgress(qaStore),
    matches,
  };
}
