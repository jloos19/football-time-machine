import fs from "node:fs";
import path from "node:path";
import type { TournamentId, ExperienceKind } from "./types";
import {
  CANONICAL_MATCH_COUNTS,
  getAllCanonicalMatches,
  getCanonicalArchive,
  getExperience,
  getExperienceMatches,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
  isProductionReadySource,
  tournamentExperiences,
} from "./index";
import { usa1994Matches } from "./matches/usa1994";
import { france1998Matches } from "./matches/france1998";
import { koreaJapan2002Matches } from "./matches/koreaJapan2002";

export type ArchiveValidationError = {
  code: string;
  message: string;
  tournamentId?: string;
  canonicalMatchId?: string;
};

function duplicateIds(matches: { canonicalMatchId: string; chronologicalIndex: number }[]) {
  const seen = new Set<number>();
  const errors: ArchiveValidationError[] = [];
  for (const match of matches) {
    if (seen.has(match.chronologicalIndex)) {
      errors.push({
        code: "duplicate-chronological-index",
        message: `Duplicate chronological index ${match.chronologicalIndex}.`,
        canonicalMatchId: match.canonicalMatchId,
      });
    }
    seen.add(match.chronologicalIndex);
  }
  return errors;
}

function checkMatchCounts(): ArchiveValidationError[] {
  const errors: ArchiveValidationError[] = [];
  if (usa1994Matches.length !== 52) {
    errors.push({
      code: "invalid-match-count",
      message: `USA '94 must contain exactly 52 canonical matches (found ${usa1994Matches.length}).`,
      tournamentId: "usa-1994",
    });
  }
  if (france1998Matches.length !== 64) {
    errors.push({
      code: "invalid-match-count",
      message: `France '98 must contain exactly 64 canonical matches (found ${france1998Matches.length}).`,
      tournamentId: "france-1998",
    });
  }
  if (koreaJapan2002Matches.length !== 64) {
    errors.push({
      code: "invalid-match-count",
      message: `Korea/Japan '02 must contain exactly 64 canonical matches (found ${koreaJapan2002Matches.length}).`,
      tournamentId: "korea-japan-2002",
    });
  }
  return errors;
}

function checkExperienceReferences(): ArchiveValidationError[] {
  const errors: ArchiveValidationError[] = [];
  const allIds = new Set(getAllCanonicalMatches().map((m) => m.canonicalMatchId));

  for (const exp of tournamentExperiences) {
    if (exp.kind === "essential" && exp.canonicalMatchIds.length === 0) {
      continue;
    }

    const seen = new Set<string>();
    for (const id of exp.canonicalMatchIds) {
      if (!allIds.has(id)) {
        errors.push({
          code: "missing-canonical-reference",
          message: `${exp.label} references missing canonical match ${id}.`,
          tournamentId: exp.tournamentId,
          canonicalMatchId: id,
        });
      }
      if (seen.has(id)) {
        errors.push({
          code: "duplicate-experience-reference",
          message: `${exp.label} contains duplicate reference to ${id}.`,
          tournamentId: exp.tournamentId,
          canonicalMatchId: id,
        });
      }
      seen.add(id);
    }

    const expected = CANONICAL_MATCH_COUNTS[exp.tournamentId as TournamentId];
    if (exp.kind === "complete" && exp.canonicalMatchIds.length !== expected) {
      errors.push({
        code: "invalid-complete-count",
        message: `Complete tournament for ${exp.tournamentId} must reference ${expected} matches (found ${exp.canonicalMatchIds.length}).`,
        tournamentId: exp.tournamentId,
      });
    }

    if (exp.kind === "journey") {
      const expectedJourney = exp.tournamentId === "usa-1994" ? 32 : 36;
      if (exp.canonicalMatchIds.length !== expectedJourney) {
        errors.push({
          code: "invalid-journey-count",
          message: `Journey for ${exp.tournamentId} must reference ${expectedJourney} matches (found ${exp.canonicalMatchIds.length}).`,
          tournamentId: exp.tournamentId,
        });
      }
    }
  }

  return errors;
}

function checkLegacyReplayDuplication(): ArchiveValidationError[] {
  const errors: ArchiveValidationError[] = [];
  const legacyFiles = [
    path.join(process.cwd(), "lib/replays/usa1994.ts"),
    path.join(process.cwd(), "lib/replays/france1998.ts"),
    path.join(process.cwd(), "lib/replays/koreaJapan2002.ts"),
  ];

  for (const file of legacyFiles) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");
    if (/https?:\/\//.test(content)) {
      errors.push({
        code: "duplicated-replay-data",
        message: `Replay URLs must not be duplicated outside the canonical archive (${path.basename(file)}).`,
      });
    }
  }

  return errors;
}

function checkJourneyProductionReplays(): ArchiveValidationError[] {
  const errors: ArchiveValidationError[] = [];
  const tournaments: TournamentId[] = [
    "usa-1994",
    "france-1998",
    "korea-japan-2002",
  ];

  for (const tournamentId of tournaments) {
    const journey = getExperienceMatches(tournamentId, "journey");
    for (const match of journey) {
      const preferred = getPreferredSource(match);
      if (!preferred || !isProductionReadySource(preferred)) {
        errors.push({
          code: "journey-replay-not-human-verified",
          message: `Journey match ${matchLabel(match)} (${match.canonicalMatchId}) has no human-verified production replay.`,
          tournamentId,
          canonicalMatchId: match.canonicalMatchId,
        });
      }
    }
  }

  return errors;
}

function matchLabel(match: { homeTeam: string; awayTeam: string }): string {
  return `${match.homeTeam} vs ${match.awayTeam}`;
}

export function validateArchive(options?: {
  strictProduction?: boolean;
}): ArchiveValidationError[] {
  const strict = options?.strictProduction ?? true;
  const errors: ArchiveValidationError[] = [
    ...checkMatchCounts(),
    ...duplicateIds(usa1994Matches),
    ...duplicateIds(france1998Matches),
    ...checkExperienceReferences(),
    ...checkLegacyReplayDuplication(),
  ];

  if (strict) {
    errors.push(...checkJourneyProductionReplays());
  }

  return errors;
}

export function getCandidateReplacements(
  tournamentId: TournamentId,
  kind: Exclude<ExperienceKind, "complete">
): Array<{ slot: number; current: string; candidates: string[] }> {
  const exp = getExperience(tournamentId, kind);
  if (!exp) return [];

  const archive = getCanonicalArchive(tournamentId);
  const byId = new Map(archive.map((m) => [m.canonicalMatchId, m]));

  return exp.canonicalMatchIds
    .map((id, index) => {
      const match = byId.get(id);
      if (!match || hasHumanVerifiedFullMatch(match)) return null;

      const candidates = archive
        .filter(
          (candidate) =>
            candidate.canonicalMatchId !== id &&
            hasHumanVerifiedFullMatch(candidate) &&
            candidate.stage === match.stage
        )
        .map((c) => c.canonicalMatchId);

      return {
        slot: index + 1,
        current: id,
        candidates,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row != null && row.candidates.length > 0);
}
