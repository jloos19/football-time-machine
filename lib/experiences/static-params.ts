import {
  getSupportedTeamJourneys,
  isSupportedTournamentId,
} from "@/lib/experiences";

export const TOURNAMENT_IDS = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
] as const;

export function tournamentStaticParams() {
  return TOURNAMENT_IDS.map((tournamentId) => ({ tournamentId }));
}

export function teamStaticParams() {
  return TOURNAMENT_IDS.flatMap((tournamentId) =>
    getSupportedTeamJourneys(tournamentId).map((team) => ({
      tournamentId,
      teamId: team.teamId,
    }))
  );
}

export function assertTournamentId(tournamentId: string) {
  return isSupportedTournamentId(tournamentId);
}
