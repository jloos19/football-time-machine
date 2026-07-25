/**
 * Terminal validation report for multi-experience membership + replay selectability.
 *
 * Usage: npx tsx scripts/validate-experiences.ts
 */
import {
  getCanonicalArchive,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
} from "../lib/archive";
import type { TournamentId } from "../lib/archive/types";
import {
  getSupportedTeamJourneys,
  getTournamentExperiences,
  resolveTeamJourneyMembership,
} from "../lib/experiences";
import { resolveReplay } from "../lib/replays";

function selectableCount(tournamentId: TournamentId, ids: string[]): number {
  const byId = new Map(
    getCanonicalArchive(tournamentId).map((m) => [m.canonicalMatchId, m])
  );
  let count = 0;
  for (const id of ids) {
    const match = byId.get(id);
    if (!match) continue;
    const preferred = getPreferredSource(match);
    if (
      preferred &&
      hasHumanVerifiedFullMatch(match) &&
      resolveReplay(match)?.url
    ) {
      count += 1;
    }
  }
  return count;
}

function reportTournament(tournamentId: TournamentId) {
  console.log(`\n=== ${tournamentId} ===`);
  console.log("experience id | type | title | match count | selectable replay count");

  const experiences = getTournamentExperiences(tournamentId);
  for (const exp of experiences) {
    const selectable = selectableCount(tournamentId, exp.canonicalMatchIds);
    console.log(
      `${exp.id} | ${exp.type} | ${exp.title} | ${exp.canonicalMatchIds.length} | ${selectable}`
    );
  }

  console.log("\nteam | tournament | matches played | experience match count | valid");
  for (const team of getSupportedTeamJourneys(tournamentId)) {
    const played = resolveTeamJourneyMembership(tournamentId, team.teamName);
    const exp = experiences.find(
      (e) => e.type === "team" && e.teamId === team.teamId
    );
    const count = exp?.canonicalMatchIds.length ?? -1;
    const valid =
      count === played.length &&
      selectableCount(tournamentId, played) === played.length
        ? "yes"
        : "no";
    console.log(
      `${team.teamName} | ${tournamentId} | ${played.length} | ${count} | ${valid}`
    );
  }
}

reportTournament("usa-1994");
reportTournament("france-1998");
