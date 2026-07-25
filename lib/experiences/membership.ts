import {
  getCanonicalArchive,
  getExperience,
} from "@/lib/archive";
import type { CanonicalMatch, MatchStage, TournamentId } from "@/lib/archive/types";
import { enrichTeamJourneyMeta } from "./journey";
import type { TeamJourneyMeta } from "./types";

export type MatchFixtureRef = {
  homeTeam: string;
  awayTeam: string;
  stage: MatchStage;
};

/** Resolve a single canonical match by unordered teams + stage. */
export function findCanonicalMatchByFixture(
  matches: CanonicalMatch[],
  ref: MatchFixtureRef
): CanonicalMatch {
  const hits = matches.filter((m) => {
    if (m.stage !== ref.stage) return false;
    const teams = new Set([m.homeTeam, m.awayTeam]);
    return teams.has(ref.homeTeam) && teams.has(ref.awayTeam);
  });
  if (hits.length !== 1) {
    throw new Error(
      `Expected exactly one match for ${ref.homeTeam} vs ${ref.awayTeam} (${ref.stage}); found ${hits.length}`
    );
  }
  return hits[0]!;
}

/** Resolve fixture refs → chronological canonical IDs. */
export function resolveEssentialsMembership(
  tournamentId: TournamentId,
  fixtures: readonly MatchFixtureRef[]
): string[] {
  const matches = getCanonicalArchive(tournamentId);
  const resolved = fixtures.map((ref) => findCanonicalMatchByFixture(matches, ref));
  return [...resolved]
    .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex)
    .map((m) => m.canonicalMatchId);
}

/** Every chronological match played by a team. */
export function resolveTeamJourneyMembership(
  tournamentId: TournamentId,
  teamName: string
): string[] {
  return getCanonicalArchive(tournamentId)
    .filter((m) => m.homeTeam === teamName || m.awayTeam === teamName)
    .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex)
    .map((m) => m.canonicalMatchId);
}

export function storyMembership(tournamentId: TournamentId): string[] {
  return getExperience(tournamentId, "journey")?.canonicalMatchIds ?? [];
}

export function everyMatchMembership(tournamentId: TournamentId): string[] {
  return getExperience(tournamentId, "complete")?.canonicalMatchIds ?? [];
}

export function teamIdFromName(teamName: string): string {
  return teamName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function tournamentShortLabel(tournamentId: TournamentId): string {
  if (tournamentId === "usa-1994") return "USA 1994";
  if (tournamentId === "france-1998") return "France 1998";
  return "Korea/Japan 2002";
}

export function teamJourneyTitle(
  _tournamentId: TournamentId,
  teamName: string
): string {
  return teamName;
}

export function buildTeamJourneyMeta(
  tournamentId: TournamentId,
  teamNames: readonly string[]
): TeamJourneyMeta[] {
  return teamNames.map((teamName) =>
    enrichTeamJourneyMeta(tournamentId, {
      teamId: teamIdFromName(teamName),
      teamName,
      title: teamName,
    })
  );
}

export const USA_1994_ESSENTIALS_FIXTURES: readonly MatchFixtureRef[] = [
  { homeTeam: "United States", awayTeam: "Colombia", stage: "Group Stage" },
  { homeTeam: "Colombia", awayTeam: "Romania", stage: "Group Stage" },
  { homeTeam: "Brazil", awayTeam: "Sweden", stage: "Group Stage" },
  { homeTeam: "Argentina", awayTeam: "Nigeria", stage: "Group Stage" },
  { homeTeam: "Italy", awayTeam: "Republic of Ireland", stage: "Group Stage" },
  { homeTeam: "Belgium", awayTeam: "Saudi Arabia", stage: "Group Stage" },
  { homeTeam: "Germany", awayTeam: "Belgium", stage: "Round of 16" },
  { homeTeam: "Nigeria", awayTeam: "Italy", stage: "Round of 16" },
  { homeTeam: "Brazil", awayTeam: "United States", stage: "Round of 16" },
  { homeTeam: "Romania", awayTeam: "Argentina", stage: "Round of 16" },
  { homeTeam: "Romania", awayTeam: "Sweden", stage: "Quarter-final" },
  { homeTeam: "Bulgaria", awayTeam: "Germany", stage: "Quarter-final" },
  { homeTeam: "Netherlands", awayTeam: "Brazil", stage: "Quarter-final" },
  { homeTeam: "Italy", awayTeam: "Spain", stage: "Quarter-final" },
  { homeTeam: "Bulgaria", awayTeam: "Italy", stage: "Semi-final" },
  { homeTeam: "Brazil", awayTeam: "Italy", stage: "Final" },
] as const;

export const FRANCE_1998_ESSENTIALS_FIXTURES: readonly MatchFixtureRef[] = [
  { homeTeam: "Brazil", awayTeam: "Scotland", stage: "Group Stage" },
  { homeTeam: "Nigeria", awayTeam: "Spain", stage: "Group Stage" },
  { homeTeam: "France", awayTeam: "Denmark", stage: "Group Stage" },
  { homeTeam: "Germany", awayTeam: "United States", stage: "Group Stage" },
  { homeTeam: "Netherlands", awayTeam: "Belgium", stage: "Group Stage" },
  { homeTeam: "Romania", awayTeam: "England", stage: "Group Stage" },
  { homeTeam: "Argentina", awayTeam: "Croatia", stage: "Group Stage" },
  { homeTeam: "Nigeria", awayTeam: "Denmark", stage: "Round of 16" },
  { homeTeam: "Argentina", awayTeam: "England", stage: "Round of 16" },
  { homeTeam: "France", awayTeam: "Paraguay", stage: "Round of 16" },
  { homeTeam: "Italy", awayTeam: "France", stage: "Quarter-final" },
  { homeTeam: "Brazil", awayTeam: "Denmark", stage: "Quarter-final" },
  { homeTeam: "Netherlands", awayTeam: "Argentina", stage: "Quarter-final" },
  { homeTeam: "Germany", awayTeam: "Croatia", stage: "Quarter-final" },
  { homeTeam: "Brazil", awayTeam: "Netherlands", stage: "Semi-final" },
  { homeTeam: "France", awayTeam: "Croatia", stage: "Semi-final" },
  { homeTeam: "Netherlands", awayTeam: "Croatia", stage: "Third-place play-off" },
  { homeTeam: "Brazil", awayTeam: "France", stage: "Final" },
] as const;

export const USA_1994_TEAM_NAMES = [
  "United States",
  "Brazil",
  "Italy",
  "Sweden",
  "Bulgaria",
  "Romania",
  "Netherlands",
  "Germany",
  "Spain",
] as const;

export const FRANCE_1998_TEAM_NAMES = [
  "France",
  "Brazil",
  "Croatia",
  "Netherlands",
  "Italy",
  "Germany",
  "Argentina",
  "Denmark",
] as const;

/** Korea/Japan 2002 Essentials — 18 defining matches (includes third-place). */
export const KOREA_JAPAN_2002_ESSENTIALS_FIXTURES: readonly MatchFixtureRef[] = [
  { homeTeam: "France", awayTeam: "Senegal", stage: "Group Stage" },
  { homeTeam: "Brazil", awayTeam: "Turkey", stage: "Group Stage" },
  { homeTeam: "United States", awayTeam: "Portugal", stage: "Group Stage" },
  { homeTeam: "Argentina", awayTeam: "England", stage: "Group Stage" },
  { homeTeam: "Sweden", awayTeam: "Argentina", stage: "Group Stage" },
  { homeTeam: "Portugal", awayTeam: "Korea Republic", stage: "Group Stage" },
  { homeTeam: "Mexico", awayTeam: "Italy", stage: "Group Stage" },
  { homeTeam: "Japan", awayTeam: "Russia", stage: "Group Stage" },
  { homeTeam: "Mexico", awayTeam: "United States", stage: "Round of 16" },
  { homeTeam: "Korea Republic", awayTeam: "Italy", stage: "Round of 16" },
  { homeTeam: "England", awayTeam: "Brazil", stage: "Quarter-final" },
  { homeTeam: "Germany", awayTeam: "United States", stage: "Quarter-final" },
  { homeTeam: "Spain", awayTeam: "Korea Republic", stage: "Quarter-final" },
  { homeTeam: "Senegal", awayTeam: "Turkey", stage: "Quarter-final" },
  { homeTeam: "Germany", awayTeam: "Korea Republic", stage: "Semi-final" },
  { homeTeam: "Brazil", awayTeam: "Turkey", stage: "Semi-final" },
  { homeTeam: "Korea Republic", awayTeam: "Turkey", stage: "Third-place play-off" },
  { homeTeam: "Germany", awayTeam: "Brazil", stage: "Final" },
] as const;

export const KOREA_JAPAN_2002_TEAM_NAMES = [
  "Brazil",
  "Germany",
  "Korea Republic",
  "Turkey",
  "United States",
  "Senegal",
  "Spain",
  "England",
  "Japan",
] as const;
