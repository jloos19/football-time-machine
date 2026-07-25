#!/usr/bin/env node
/**
 * Generates canonical match archive files from fixture schedules and migrates
 * existing replay-library data into the canonical model.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CanonicalReplaySource } from "../lib/archive/types";
import type { ReplayProvider, ReplaySourceStatus } from "../lib/replays/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

type FixtureRow = {
  home: string;
  away: string;
  date: string;
  venue: string;
  stage: string;
  group?: string;
  official?: number;
};

function normalizeTeams(home: string, away: string): string {
  return `${home} vs ${away}`;
}

function teamsMatch(a: string, b: string): boolean {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/republic of ireland/g, "ireland")
      .replace(/\s+/g, " ")
      .trim();
  const flip = (s: string) => {
    const [left, right] = s.split(" vs ");
    return `${right} vs ${left}`;
  };
  const na = norm(a);
  const nb = norm(b);
  return na === nb || flip(na) === nb;
}

const USA_1994_FIXTURES: FixtureRow[] = [
  { home: "Germany", away: "Bolivia", date: "June 17, 1994", venue: "Soldier Field, Chicago", stage: "Group Stage", group: "C", official: 1 },
  { home: "Spain", away: "South Korea", date: "June 17, 1994", venue: "Cotton Bowl, Dallas", stage: "Group Stage", group: "C", official: 2 },
  { home: "United States", away: "Switzerland", date: "June 18, 1994", venue: "Pontiac Silverdome, Pontiac", stage: "Group Stage", group: "A", official: 3 },
  { home: "Italy", away: "Republic of Ireland", date: "June 18, 1994", venue: "Giants Stadium, East Rutherford", stage: "Group Stage", group: "E", official: 4 },
  { home: "Norway", away: "Mexico", date: "June 18, 1994", venue: "RFK Stadium, Washington", stage: "Group Stage", group: "E", official: 5 },
  { home: "Cameroon", away: "Sweden", date: "June 18, 1994", venue: "Rose Bowl, Pasadena", stage: "Group Stage", group: "B", official: 6 },
  { home: "Colombia", away: "Romania", date: "June 19, 1994", venue: "Rose Bowl, Pasadena", stage: "Group Stage", group: "A", official: 7 },
  { home: "Russia", away: "Brazil", date: "June 19, 1994", venue: "Stanford Stadium, Stanford", stage: "Group Stage", group: "B", official: 8 },
  { home: "South Korea", away: "Bolivia", date: "June 19, 1994", venue: "Foxboro Stadium, Foxborough", stage: "Group Stage", group: "C", official: 9 },
  { home: "Netherlands", away: "Saudi Arabia", date: "June 20, 1994", venue: "RFK Stadium, Washington", stage: "Group Stage", group: "F", official: 10 },
  { home: "Belgium", away: "Morocco", date: "June 20, 1994", venue: "Camping World Stadium, Orlando", stage: "Group Stage", group: "F", official: 11 },
  { home: "Argentina", away: "Greece", date: "June 21, 1994", venue: "Foxboro Stadium, Foxborough", stage: "Group Stage", group: "D", official: 12 },
  { home: "Germany", away: "Spain", date: "June 21, 1994", venue: "Soldier Field, Chicago", stage: "Group Stage", group: "C", official: 13 },
  { home: "Nigeria", away: "Bulgaria", date: "June 21, 1994", venue: "Cotton Bowl, Dallas", stage: "Group Stage", group: "D", official: 14 },
  { home: "United States", away: "Colombia", date: "June 22, 1994", venue: "Rose Bowl, Pasadena", stage: "Group Stage", group: "A", official: 15 },
  { home: "Switzerland", away: "Romania", date: "June 22, 1994", venue: "Pontiac Silverdome, Pontiac", stage: "Group Stage", group: "A", official: 16 },
  { home: "Italy", away: "Norway", date: "June 23, 1994", venue: "Giants Stadium, East Rutherford", stage: "Group Stage", group: "E", official: 17 },
  { home: "Brazil", away: "Cameroon", date: "June 23, 1994", venue: "Stanford Stadium, Stanford", stage: "Group Stage", group: "B", official: 18 },
  { home: "Bolivia", away: "Spain", date: "June 24, 1994", venue: "Soldier Field, Chicago", stage: "Group Stage", group: "C", official: 19 },
  { home: "Mexico", away: "Republic of Ireland", date: "June 24, 1994", venue: "Citrus Bowl, Orlando", stage: "Group Stage", group: "E", official: 20 },
  { home: "Sweden", away: "Russia", date: "June 24, 1994", venue: "Pontiac Silverdome, Pontiac", stage: "Group Stage", group: "B", official: 21 },
  { home: "Morocco", away: "Saudi Arabia", date: "June 25, 1994", venue: "Giants Stadium, East Rutherford", stage: "Group Stage", group: "F", official: 22 },
  { home: "Netherlands", away: "Belgium", date: "June 25, 1994", venue: "Camping World Stadium, Orlando", stage: "Group Stage", group: "F", official: 23 },
  { home: "Argentina", away: "Nigeria", date: "June 25, 1994", venue: "Foxboro Stadium, Foxborough", stage: "Group Stage", group: "D", official: 24 },
  { home: "Bulgaria", away: "Greece", date: "June 26, 1994", venue: "Soldier Field, Chicago", stage: "Group Stage", group: "D", official: 25 },
  { home: "Switzerland", away: "Colombia", date: "June 26, 1994", venue: "Stanford Stadium, Stanford", stage: "Group Stage", group: "A", official: 26 },
  { home: "United States", away: "Romania", date: "June 26, 1994", venue: "Rose Bowl, Pasadena", stage: "Group Stage", group: "A", official: 27 },
  { home: "Russia", away: "Cameroon", date: "June 26, 1994", venue: "Stanford Stadium, Stanford", stage: "Group Stage", group: "B", official: 28 },
  { home: "Greece", away: "Nigeria", date: "June 27, 1994", venue: "Foxboro Stadium, Foxborough", stage: "Group Stage", group: "D", official: 29 },
  { home: "Germany", away: "South Korea", date: "June 27, 1994", venue: "Soldier Field, Chicago", stage: "Group Stage", group: "C", official: 30 },
  { home: "Republic of Ireland", away: "Norway", date: "June 28, 1994", venue: "Giants Stadium, East Rutherford", stage: "Group Stage", group: "E", official: 31 },
  { home: "Italy", away: "Mexico", date: "June 28, 1994", venue: "Giants Stadium, East Rutherford", stage: "Group Stage", group: "E", official: 32 },
  { home: "Brazil", away: "Sweden", date: "June 28, 1994", venue: "Pontiac Silverdome, Pontiac", stage: "Group Stage", group: "B", official: 33 },
  { home: "Belgium", away: "Saudi Arabia", date: "June 29, 1994", venue: "RFK Stadium, Washington", stage: "Group Stage", group: "F", official: 34 },
  { home: "Morocco", away: "Netherlands", date: "June 29, 1994", venue: "Citrus Bowl, Orlando", stage: "Group Stage", group: "F", official: 35 },
  { home: "Argentina", away: "Bulgaria", date: "June 30, 1994", venue: "Cotton Bowl, Dallas", stage: "Group Stage", group: "D", official: 36 },
  { home: "Germany", away: "Belgium", date: "July 2, 1994", venue: "Soldier Field, Chicago", stage: "Round of 16", official: 37 },
  { home: "Spain", away: "Switzerland", date: "July 2, 1994", venue: "RFK Stadium, Washington", stage: "Round of 16", official: 38 },
  { home: "Saudi Arabia", away: "Sweden", date: "July 3, 1994", venue: "Cotton Bowl, Dallas", stage: "Round of 16", official: 39 },
  { home: "Romania", away: "Argentina", date: "July 3, 1994", venue: "Rose Bowl, Pasadena", stage: "Round of 16", official: 40 },
  { home: "Netherlands", away: "Republic of Ireland", date: "July 4, 1994", venue: "Citrus Bowl, Orlando", stage: "Round of 16", official: 41 },
  { home: "Brazil", away: "United States", date: "July 4, 1994", venue: "Stanford Stadium, Stanford", stage: "Round of 16", official: 42 },
  { home: "Nigeria", away: "Italy", date: "July 5, 1994", venue: "Foxboro Stadium, Foxborough", stage: "Round of 16", official: 43 },
  { home: "Mexico", away: "Bulgaria", date: "July 5, 1994", venue: "Giants Stadium, East Rutherford", stage: "Round of 16", official: 44 },
  { home: "Italy", away: "Spain", date: "July 9, 1994", venue: "Foxboro Stadium, Foxborough", stage: "Quarter-final", official: 45 },
  { home: "Netherlands", away: "Brazil", date: "July 9, 1994", venue: "Cotton Bowl, Dallas", stage: "Quarter-final", official: 46 },
  { home: "Bulgaria", away: "Germany", date: "July 10, 1994", venue: "Giants Stadium, East Rutherford", stage: "Quarter-final", official: 47 },
  { home: "Romania", away: "Sweden", date: "July 10, 1994", venue: "Rose Bowl, Pasadena", stage: "Quarter-final", official: 48 },
  { home: "Bulgaria", away: "Italy", date: "July 13, 1994", venue: "Giants Stadium, East Rutherford", stage: "Semi-final", official: 49 },
  { home: "Sweden", away: "Brazil", date: "July 13, 1994", venue: "Rose Bowl, Pasadena", stage: "Semi-final", official: 50 },
  { home: "Sweden", away: "Bulgaria", date: "July 16, 1994", venue: "Rose Bowl, Pasadena", stage: "Third-place play-off", official: 51 },
  { home: "Brazil", away: "Italy", date: "July 17, 1994", venue: "Rose Bowl, Pasadena", stage: "Final", official: 52 },
];

const FRANCE_1998_FIXTURES: FixtureRow[] = [
  { home: "Brazil", away: "Scotland", date: "June 10, 1998", venue: "Stade de France, Saint-Denis", stage: "Group Stage", group: "A", official: 1 },
  { home: "Morocco", away: "Norway", date: "June 10, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Group Stage", group: "A", official: 2 },
  { home: "Italy", away: "Chile", date: "June 11, 1998", venue: "Parc Lescure, Bordeaux", stage: "Group Stage", group: "B", official: 3 },
  { home: "Cameroon", away: "Austria", date: "June 11, 1998", venue: "Stade de Toulouse, Toulouse", stage: "Group Stage", group: "B", official: 4 },
  { home: "Paraguay", away: "Bulgaria", date: "June 12, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Group Stage", group: "D", official: 5 },
  { home: "France", away: "South Africa", date: "June 12, 1998", venue: "Stade Vélodrome, Marseille", stage: "Group Stage", group: "C", official: 6 },
  { home: "South Korea", away: "Mexico", date: "June 13, 1998", venue: "Stade Vélodrome, Marseille", stage: "Group Stage", group: "E", official: 7 },
  { home: "Netherlands", away: "Belgium", date: "June 13, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "E", official: 8 },
  { home: "Spain", away: "Nigeria", date: "June 13, 1998", venue: "Stade de la Beaujoire, Nantes", stage: "Group Stage", group: "D", official: 9 },
  { home: "Yugoslavia", away: "Iran", date: "June 14, 1998", venue: "Stade Geoffroy-Guichard, Saint-Étienne", stage: "Group Stage", group: "F", official: 10 },
  { home: "Croatia", away: "Jamaica", date: "June 14, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "H", official: 11 },
  { home: "Argentina", away: "Japan", date: "June 14, 1998", venue: "Stade de Toulouse, Toulouse", stage: "Group Stage", group: "H", official: 12 },
  { home: "Romania", away: "Colombia", date: "June 15, 1998", venue: "Stade de Gerland, Lyon", stage: "Group Stage", group: "G", official: 13 },
  { home: "England", away: "Tunisia", date: "June 15, 1998", venue: "Stade Vélodrome, Marseille", stage: "Group Stage", group: "G", official: 14 },
  { home: "Germany", away: "United States", date: "June 15, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "F", official: 15 },
  { home: "Scotland", away: "Norway", date: "June 16, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "A", official: 16 },
  { home: "Brazil", away: "Morocco", date: "June 16, 1998", venue: "Stade de la Beaujoire, Nantes", stage: "Group Stage", group: "A", official: 17 },
  { home: "Chile", away: "Austria", date: "June 17, 1998", venue: "Stade Geoffroy-Guichard, Saint-Étienne", stage: "Group Stage", group: "B", official: 18 },
  { home: "Italy", away: "Cameroon", date: "June 17, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Group Stage", group: "B", official: 19 },
  { home: "South Africa", away: "Saudi Arabia", date: "June 18, 1998", venue: "Stade de France, Saint-Denis", stage: "Group Stage", group: "C", official: 20 },
  { home: "France", away: "Denmark", date: "June 18, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "C", official: 21 },
  { home: "Mexico", away: "Belgium", date: "June 19, 1998", venue: "Parc Lescure, Bordeaux", stage: "Group Stage", group: "E", official: 22 },
  { home: "Nigeria", away: "Bulgaria", date: "June 19, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "D", official: 23 },
  { home: "South Korea", away: "Netherlands", date: "June 20, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "E", official: 24 },
  { home: "Spain", away: "Paraguay", date: "June 20, 1998", venue: "Stade Geoffroy-Guichard, Saint-Étienne", stage: "Group Stage", group: "D", official: 25 },
  { home: "Iran", away: "United States", date: "June 21, 1998", venue: "Stade de Gerland, Lyon", stage: "Group Stage", group: "F", official: 26 },
  { home: "Germany", away: "Yugoslavia", date: "June 21, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "F", official: 27 },
  { home: "Japan", away: "Jamaica", date: "June 21, 1998", venue: "Stade de Toulouse, Toulouse", stage: "Group Stage", group: "H", official: 28 },
  { home: "Argentina", away: "Croatia", date: "June 21, 1998", venue: "Stade Chaban-Delmas, Bordeaux", stage: "Group Stage", group: "H", official: 29 },
  { home: "Colombia", away: "Tunisia", date: "June 22, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Group Stage", group: "G", official: 30 },
  { home: "Romania", away: "England", date: "June 22, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "G", official: 31 },
  { home: "Brazil", away: "Norway", date: "June 23, 1998", venue: "Stade de France, Saint-Denis", stage: "Group Stage", group: "A", official: 32 },
  { home: "Scotland", away: "Morocco", date: "June 23, 1998", venue: "Stade Geoffroy-Guichard, Saint-Étienne", stage: "Group Stage", group: "A", official: 33 },
  { home: "Italy", away: "Austria", date: "June 23, 1998", venue: "Stade de France, Saint-Denis", stage: "Group Stage", group: "B", official: 34 },
  { home: "Chile", away: "Cameroon", date: "June 23, 1998", venue: "Stade de la Beaujoire, Nantes", stage: "Group Stage", group: "B", official: 35 },
  { home: "France", away: "Saudi Arabia", date: "June 24, 1998", venue: "Stade de la Beaujoire, Nantes", stage: "Group Stage", group: "C", official: 36 },
  { home: "South Africa", away: "Denmark", date: "June 24, 1998", venue: "Stade de Toulouse, Toulouse", stage: "Group Stage", group: "C", official: 37 },
  { home: "Nigeria", away: "Paraguay", date: "June 24, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Group Stage", group: "D", official: 38 },
  { home: "Spain", away: "Bulgaria", date: "June 24, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "D", official: 39 },
  { home: "Netherlands", away: "Mexico", date: "June 25, 1998", venue: "Stade Geoffroy-Guichard, Saint-Étienne", stage: "Group Stage", group: "E", official: 40 },
  { home: "Belgium", away: "South Korea", date: "June 25, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "E", official: 41 },
  { home: "Germany", away: "Iran", date: "June 25, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Group Stage", group: "F", official: 42 },
  { home: "United States", away: "Yugoslavia", date: "June 25, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "F", official: 43 },
  { home: "Colombia", away: "England", date: "June 26, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "G", official: 44 },
  { home: "Romania", away: "Tunisia", date: "June 26, 1998", venue: "Stade de la Beaujoire, Nantes", stage: "Group Stage", group: "G", official: 45 },
  { home: "Argentina", away: "Jamaica", date: "June 26, 1998", venue: "Parc des Princes, Paris", stage: "Group Stage", group: "H", official: 46 },
  { home: "Japan", away: "Croatia", date: "June 26, 1998", venue: "Stade de la Beaujoire, Nantes", stage: "Group Stage", group: "H", official: 47 },
  { home: "Denmark", away: "Saudi Arabia", date: "June 28, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Group Stage", group: "C", official: 48 },
  { home: "Italy", away: "Norway", date: "June 27, 1998", venue: "Stade Vélodrome, Marseille", stage: "Round of 16", official: 49 },
  { home: "Brazil", away: "Chile", date: "June 27, 1998", venue: "Parc des Princes, Paris", stage: "Round of 16", official: 50 },
  { home: "France", away: "Paraguay", date: "June 28, 1998", venue: "Stade Félix-Bollaert, Lens", stage: "Round of 16", official: 51 },
  { home: "Nigeria", away: "Denmark", date: "June 28, 1998", venue: "Stade de France, Saint-Denis", stage: "Round of 16", official: 52 },
  { home: "Germany", away: "Mexico", date: "June 29, 1998", venue: "Stade de la Mosson, Montpellier", stage: "Round of 16", official: 53 },
  { home: "Netherlands", away: "Yugoslavia", date: "June 29, 1998", venue: "Stade de Toulouse, Toulouse", stage: "Round of 16", official: 54 },
  { home: "Romania", away: "Croatia", date: "June 30, 1998", venue: "Stade Chaban-Delmas, Bordeaux", stage: "Round of 16", official: 55 },
  { home: "Argentina", away: "England", date: "June 30, 1998", venue: "Stade Geoffroy-Guichard, Saint-Étienne", stage: "Round of 16", official: 56 },
  { home: "Italy", away: "France", date: "July 3, 1998", venue: "Stade de France, Saint-Denis", stage: "Quarter-final", official: 57 },
  { home: "Brazil", away: "Denmark", date: "July 3, 1998", venue: "Stade de France, Saint-Denis", stage: "Quarter-final", official: 58 },
  { home: "Netherlands", away: "Argentina", date: "July 4, 1998", venue: "Stade Vélodrome, Marseille", stage: "Quarter-final", official: 59 },
  { home: "Germany", away: "Croatia", date: "July 4, 1998", venue: "Stade de Gerland, Lyon", stage: "Quarter-final", official: 60 },
  { home: "Brazil", away: "Netherlands", date: "July 7, 1998", venue: "Stade de France, Saint-Denis", stage: "Semi-final", official: 61 },
  { home: "France", away: "Croatia", date: "July 8, 1998", venue: "Stade de France, Saint-Denis", stage: "Semi-final", official: 62 },
  { home: "Netherlands", away: "Croatia", date: "July 11, 1998", venue: "Parc des Princes, Paris", stage: "Third-place play-off", official: 63 },
  { home: "Brazil", away: "France", date: "July 12, 1998", venue: "Stade de France, Saint-Denis", stage: "Final", official: 64 },
];

const USA_JOURNEY = [
  "Germany vs Bolivia", "Spain vs South Korea", "United States vs Switzerland",
  "Italy vs Republic of Ireland", "Brazil vs Russia", "Netherlands vs Saudi Arabia",
  "Argentina vs Greece", "Germany vs Spain", "Nigeria vs Bulgaria",
  "United States vs Colombia", "Italy vs Norway", "Brazil vs Cameroon",
  "Netherlands vs Belgium", "Argentina vs Nigeria", "United States vs Romania",
  "Germany vs South Korea", "Italy vs Mexico", "Brazil vs Sweden",
  "Belgium vs Saudi Arabia", "Argentina vs Bulgaria", "Germany vs Belgium",
  "Spain vs Switzerland", "Saudi Arabia vs Sweden", "Romania vs Argentina",
  "Netherlands vs Republic of Ireland", "Brazil vs United States", "Nigeria vs Italy",
  "Mexico vs Bulgaria", "Italy vs Spain", "Netherlands vs Brazil",
  "Bulgaria vs Germany", "Romania vs Sweden", "Bulgaria vs Italy",
  "Sweden vs Brazil", "Sweden vs Bulgaria", "Brazil vs Italy",
];

const FRANCE_JOURNEY = [
  "Brazil vs Scotland",
  "Morocco vs Norway",
  "Italy vs Chile",
  "Cameroon vs Austria",
  "Paraguay vs Bulgaria",
  "Croatia vs Jamaica",
  "Chile vs Austria",
  "Italy vs Cameroon",
  "South Africa vs Saudi Arabia",
  "France vs Denmark",
  "Mexico vs Belgium",
  "Japan vs Jamaica",
  "Argentina vs Croatia",
  "Brazil vs Norway",
  "Italy vs Austria",
  "Chile vs Cameroon",
  "France vs Saudi Arabia",
  "South Africa vs Denmark",
  "Argentina vs Jamaica",
  "Japan vs Croatia",
  "Italy vs Norway",
  "Brazil vs Chile",
  "France vs Paraguay",
  "Nigeria vs Denmark",
  "Germany vs Mexico",
  "Netherlands vs Yugoslavia",
  "Romania vs Croatia",
  "Argentina vs England",
  "Italy vs France",
  "Brazil vs Denmark",
  "Netherlands vs Argentina",
  "Germany vs Croatia",
  "Brazil vs Netherlands",
  "France vs Croatia",
  "Netherlands vs Croatia",
  "Brazil vs France",
];

function sortFixtures(fixtures: FixtureRow[]): FixtureRow[] {
  const dateOrder = (d: string) => new Date(d).getTime();
  return [...fixtures].sort((a, b) => {
    const da = dateOrder(a.date);
    const db = dateOrder(b.date);
    if (da !== db) return da - db;
    return (a.official ?? 0) - (b.official ?? 0);
  });
}

function stageForJourneySlot(slot: number): string | null {
  if (slot >= 1 && slot <= 20) return "Group Stage";
  if (slot >= 21 && slot <= 28) return "Round of 16";
  if (slot >= 29 && slot <= 32) return "Quarter-final";
  if (slot >= 33 && slot <= 34) return "Semi-final";
  if (slot === 35) return "Third-place play-off";
  if (slot === 36) return "Final";
  return null;
}

function buildCanonicalMatches(
  tournamentId: string,
  fixtures: FixtureRow[],
  journeyLabels: string[]
) {
  const sorted = sortFixtures(fixtures);
  const expected = tournamentId === "usa-1994" ? 52 : 64;
  if (sorted.length !== expected) {
    throw new Error(`Expected ${expected} fixtures for ${tournamentId}, got ${sorted.length}`);
  }

  const journeyIds: string[] = [];
  const usedCanonical = new Set<string>();

  const matches = sorted.map((f, index) => {
    const chronologicalIndex = index + 1;
    const canonicalMatchId = `${tournamentId}-c${String(chronologicalIndex).padStart(2, "0")}`;

    return {
      tournamentId,
      canonicalMatchId,
      officialMatchNumber: f.official,
      chronologicalIndex,
      date: f.date,
      kickoffOrder: index + 1,
      stage: f.stage,
      group: f.group,
      homeTeam: f.home,
      awayTeam: f.away,
      venue: f.venue,
      editorial: undefined as
        | {
            journeyEpisodeId?: string;
            journeySlot?: number;
            runtime?: string;
            auditNote?: string;
          }
        | undefined,
      preferredSourceId: undefined as string | undefined,
      replaySources: [] as CanonicalReplaySource[],
    };
  });

  for (let journeySlot = 0; journeySlot < journeyLabels.length; journeySlot++) {
    const label = journeyLabels[journeySlot];
    const expectedStage = stageForJourneySlot(journeySlot + 1);
    const found = matches.find((match) => {
      if (usedCanonical.has(match.canonicalMatchId)) return false;
      const labelMatch = teamsMatch(label, `${match.homeTeam} vs ${match.awayTeam}`);
      if (!labelMatch) return false;
      if (expectedStage && match.stage !== expectedStage) return false;
      return true;
    });

    if (!found) {
      throw new Error(
        `Journey mapping failed for ${tournamentId} slot ${journeySlot + 1}: ${label} (${expectedStage})`
      );
    }

    usedCanonical.add(found.canonicalMatchId);
    journeyIds[journeySlot] = found.canonicalMatchId;
    found.editorial = {
      journeyEpisodeId: `${tournamentId}-${String(journeySlot + 1).padStart(2, "0")}`,
      journeySlot: journeySlot + 1,
    };
  }

  return { matches, journeyIds, completeIds: matches.map((m) => m.canonicalMatchId) };
}

function migrateReplaySource(source: Record<string, unknown>, index: number, matchId: string) {
  const verified = source.verified === true;
  const status = source.status ?? "active";
  const lastChecked = source.lastChecked ?? "2026-07-22";
  const auditStatus =
    status === "dead"
      ? "dead"
      : status === "private"
        ? "private"
        : status === "needs-review"
          ? "needs-review"
          : verified
            ? "ok"
            : "unchecked";

  return {
    id: `${matchId}-src-${index + 1}`,
    provider: source.provider,
    url: source.url,
    status,
    fullMatch: source.fullMatch ?? true,
    automatedCheck: {
      status: auditStatus,
      lastChecked,
      reason: typeof source.notes === "string" ? source.notes : undefined,
    },
    humanVerification: verified
      ? {
          status: "verified" as const,
          verifiedBy: "archive-migration",
          verifiedAt: "2026-07-22",
          notes: "Migrated from legacy replay library verified flag.",
        }
      : { status: "untested" as const },
    notes: source.notes,
    continuationUrl: source.continuationUrl,
  };
}

function restoreReplaysFromAudit(
  matches: ReturnType<typeof buildCanonicalMatches>["matches"],
  auditPath: string
) {
  if (!fs.existsSync(auditPath)) return;
  const report = JSON.parse(fs.readFileSync(auditPath, "utf8")) as {
    sources: Array<{
      tournamentId: string;
      episodeId: string;
      provider: string;
      url: string;
      previousStatus: string;
      previousVerified: boolean;
      auditResult: string;
      reason: string;
      lastChecked: string;
    }>;
  };

  const byEpisode = new Map<string, typeof report.sources>();
  for (const row of report.sources) {
    const list = byEpisode.get(row.episodeId) ?? [];
    list.push(row);
    byEpisode.set(row.episodeId, list);
  }

  for (const match of matches) {
    const episodeId = match.editorial?.journeyEpisodeId;
    if (!episodeId) continue;
    const rows = byEpisode.get(episodeId);
    if (!rows?.length) continue;

    match.replaySources = rows.map((row, index) => {
      const verified = row.previousVerified === true;
      const status = row.previousStatus;
      return {
        id: `${match.canonicalMatchId}-src-${index + 1}`,
        provider: row.provider as ReplayProvider,
        url: row.url,
        status: status as ReplaySourceStatus,
        fullMatch: true,
        automatedCheck: {
          status:
            row.auditResult === "ok"
              ? "ok"
              : row.auditResult === "private"
                ? "private"
                : row.auditResult === "dead"
                  ? "dead"
                  : "needs-review",
          lastChecked: row.lastChecked.slice(0, 10),
          reason: row.reason,
        },
        humanVerification: verified
          ? {
              status: "verified" as const,
              verifiedBy: "archive-migration",
              verifiedAt: "2026-07-22",
              notes: "Restored from replay audit report.",
            }
          : { status: "untested" as const },
        notes: row.reason,
      };
    });

    const fifa = match.replaySources.find(
      (s) => s.provider === "FIFA" && s.humanVerification.status === "verified"
    );
    if (fifa) {
      match.preferredSourceId = fifa.id;
    }
  }
}

function serializeMatches(exportName: string, matches: unknown[]) {
  let body = JSON.stringify(matches, null, 2);
  body = body.replace(
    /"stage": "(Group Stage|Round of 16|Quarter-final|Semi-final|Third-place play-off|Final)"/g,
    '"stage": "$1" as const'
  );
  body = body.replace(
    /"provider": "(FIFA|Official broadcaster|Dailymotion|YouTube)"/g,
    '"provider": "$1" as const'
  );
  return `import type { CanonicalMatch } from "../types";\n\nexport const ${exportName}: CanonicalMatch[] = ${body};\n`;
}

function serializeExperiences(experiences: unknown[]) {
  let body = JSON.stringify(experiences, null, 2);
  body = body.replace(/"kind": "(complete|journey|essential)"/g, '"kind": "$1" as const');
  return `import type { ExperienceDefinition } from "./types";\n\nexport const tournamentExperiences: ExperienceDefinition[] = ${body};\n`;
}

async function main() {
  const usa = buildCanonicalMatches("usa-1994", USA_1994_FIXTURES, USA_JOURNEY);
  const france = buildCanonicalMatches("france-1998", FRANCE_1998_FIXTURES, FRANCE_JOURNEY);

  const auditPath = path.join(ROOT, "reports/replay-audit.json");
  restoreReplaysFromAudit(usa.matches, auditPath);
  restoreReplaysFromAudit(france.matches, auditPath);

  const experiences = [
    { tournamentId: "usa-1994", kind: "complete", label: "Complete Tournament", canonicalMatchIds: usa.completeIds },
    { tournamentId: "usa-1994", kind: "journey", label: "The Journey", canonicalMatchIds: usa.journeyIds },
    { tournamentId: "usa-1994", kind: "essential", label: "The Essential Cut", canonicalMatchIds: [] },
    { tournamentId: "france-1998", kind: "complete", label: "Complete Tournament", canonicalMatchIds: france.completeIds },
    { tournamentId: "france-1998", kind: "journey", label: "The Journey", canonicalMatchIds: france.journeyIds },
    { tournamentId: "france-1998", kind: "essential", label: "The Essential Cut", canonicalMatchIds: [] },
  ];

  const archiveDir = path.join(ROOT, "lib/archive/matches");
  fs.mkdirSync(archiveDir, { recursive: true });
  fs.writeFileSync(path.join(archiveDir, "usa1994.ts"), serializeMatches("usa1994Matches", usa.matches));
  fs.writeFileSync(path.join(archiveDir, "france1998.ts"), serializeMatches("france1998Matches", france.matches));
  fs.writeFileSync(path.join(ROOT, "lib/archive/experiences.ts"), serializeExperiences(experiences));

  console.log(`Generated ${usa.matches.length} USA matches, ${france.matches.length} France matches`);
  console.log(`Journey mapped: USA ${usa.journeyIds.length}, France ${france.journeyIds.length}`);
  console.log(
    `Replay sources migrated: USA ${usa.matches.filter((m) => m.replaySources.length).length}, France ${france.matches.filter((m) => m.replaySources.length).length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
