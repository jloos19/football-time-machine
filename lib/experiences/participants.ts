import { getCanonicalArchive } from "@/lib/archive";
import type { TournamentId } from "@/lib/archive/types";
import { teamIdFromName } from "./membership";

/** Group composition for standings — also the authoritative participant set. */
export const USA_1994_GROUPS: Record<string, readonly string[]> = {
  A: ["United States", "Switzerland", "Romania", "Colombia"],
  B: ["Brazil", "Russia", "Cameroon", "Sweden"],
  C: ["Germany", "Bolivia", "Spain", "South Korea"],
  D: ["Argentina", "Greece", "Nigeria", "Bulgaria"],
  E: ["Italy", "Republic of Ireland", "Norway", "Mexico"],
  F: ["Netherlands", "Saudi Arabia", "Belgium", "Morocco"],
};

export const FRANCE_1998_GROUPS: Record<string, readonly string[]> = {
  A: ["Brazil", "Scotland", "Morocco", "Norway"],
  B: ["Italy", "Chile", "Austria", "Cameroon"],
  C: ["France", "Denmark", "South Africa", "Saudi Arabia"],
  D: ["Nigeria", "Bulgaria", "Paraguay", "Spain"],
  E: ["Netherlands", "Belgium", "Mexico", "South Korea"],
  F: ["Germany", "Yugoslavia", "Iran", "United States"],
  G: ["Romania", "England", "Colombia", "Tunisia"],
  H: ["Argentina", "Japan", "Croatia", "Jamaica"],
};

export const KOREA_JAPAN_2002_GROUPS: Record<string, readonly string[]> = {
  A: ["France", "Senegal", "Uruguay", "Denmark"],
  B: ["Spain", "Slovenia", "Paraguay", "South Africa"],
  C: ["Brazil", "Turkey", "China", "Costa Rica"],
  D: ["Korea Republic", "United States", "Portugal", "Poland"],
  E: ["Germany", "Saudi Arabia", "Republic of Ireland", "Cameroon"],
  F: ["Argentina", "Nigeria", "England", "Sweden"],
  G: ["Italy", "Ecuador", "Croatia", "Mexico"],
  H: ["Japan", "Belgium", "Russia", "Tunisia"],
};

function uniqueSortedNames(groups: Record<string, readonly string[]>): string[] {
  return [...new Set(Object.values(groups).flat())].sort((a, b) =>
    a.localeCompare(b)
  );
}

export const USA_1994_PARTICIPANT_NAMES = uniqueSortedNames(
  USA_1994_GROUPS
) as readonly string[];

export const FRANCE_1998_PARTICIPANT_NAMES = uniqueSortedNames(
  FRANCE_1998_GROUPS
) as readonly string[];

export const KOREA_JAPAN_2002_PARTICIPANT_NAMES = uniqueSortedNames(
  KOREA_JAPAN_2002_GROUPS
) as readonly string[];

export function listTournamentParticipantNames(
  tournamentId: TournamentId
): readonly string[] {
  if (tournamentId === "usa-1994") return USA_1994_PARTICIPANT_NAMES;
  if (tournamentId === "france-1998") return FRANCE_1998_PARTICIPANT_NAMES;
  return KOREA_JAPAN_2002_PARTICIPANT_NAMES;
}

export function listTournamentParticipantIds(
  tournamentId: TournamentId
): readonly string[] {
  return listTournamentParticipantNames(tournamentId).map(teamIdFromName);
}

/** Cross-check group tables against the canonical match archive. */
export function archiveParticipantNames(
  tournamentId: TournamentId
): readonly string[] {
  const names = new Set<string>();
  for (const match of getCanonicalArchive(tournamentId)) {
    names.add(match.homeTeam);
    names.add(match.awayTeam);
  }
  return [...names].sort((a, b) => a.localeCompare(b));
}

export function tournamentProfileShortLabel(tournamentId: TournamentId): string {
  if (tournamentId === "usa-1994") return "USA ’94";
  if (tournamentId === "france-1998") return "France ’98";
  return "Korea/Japan ’02";
}

export function teamProfileAriaLabel(
  tournamentId: TournamentId,
  teamName: string
): string {
  return `Open ${teamName}’s ${tournamentProfileShortLabel(tournamentId)} Team Profile.`;
}
