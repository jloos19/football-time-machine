#!/usr/bin/env node
/**
 * Applies the manually curated USA 1994 Complete Tournament replay catalog,
 * rebuilds the 32-match Journey chronologically, and refreshes Journey episode
 * JSON while preserving existing editorial by match pairing.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { usa1994Matches } from "../lib/archive/matches/usa1994";
import { tournamentExperiences } from "../lib/archive/experiences";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { applyUsa1994ReplayCatalogToArchive } from "../lib/archive/usa1994-replay-apply";
import { USA_1994_REPLAY_CATALOG } from "../lib/archive/usa1994-replay-catalog";
import { getPreferredSource, isProductionReadySource } from "../lib/archive/index";
import type { CanonicalMatch } from "../lib/archive/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VERIFIED_AT = new Date().toISOString();

type EpisodeJson = {
  id: string;
  tournamentId: string;
  n: number;
  title: string;
  match: string;
  date: string;
  city: string;
  stage: string;
  world?: string;
  tournament?: string;
  intro?: string;
  watchFor?: string;
  postMatch: Record<string, unknown> | null;
  status?: string;
};

function normalizeMatchKey(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\bv\b/g, "vs")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function teamsKey(home: string, away: string): string {
  return normalizeMatchKey(`${home} vs ${away}`);
}

function flipKey(key: string): string {
  const [a, b] = key.split(" vs ");
  return `${b} vs ${a}`;
}

function cityFromVenue(venue: string): string {
  const parts = venue.split(",").map((p) => p.trim());
  return parts[parts.length - 1] ?? venue;
}

/** Editorial for Journey matches that were not previously Journey members. */
const NEW_EPISODE_EDITORIAL: Record<
  string,
  Omit<EpisodeJson, "id" | "tournamentId" | "n" | "match" | "date" | "city" | "stage">
> = {
  "usa-1994-c07": {
    title: "South American Arrival",
    world:
      "The tournament’s opening weekend continues across the country. Host venues are filling, and American audiences are discovering how quickly a World Cup creates new stories.",
    tournament:
      "Group A has opened with the United States and Switzerland sharing a point. Colombia and Romania now begin their campaigns in the same section.",
    intro:
      "Colombia arrive with attacking reputation and high expectation. Romania bring organization, creativity and a willingness to punish space. Neither side has played yet, so the first result will immediately shape the group’s early table.",
    watchFor:
      "Watch the spaces between midfield and defense. Both teams can move the ball quickly when the other side is stretched.",
    postMatch: {
      score: "Colombia 1–3 Romania",
      halftime: "Halftime: 1–0",
      goal: "Adolfo Valencia 21′; Florin Răducioiu 15′, 89′; Gheorghe Hagi 34′",
      keyEvents: [
        "Romania struck early through Răducioiu.",
        "Valencia leveled for Colombia before Hagi restored Romania’s lead.",
        "Răducioiu added a late third to complete Romania’s statement win.",
      ],
      impactPlayers: [
        {
          name: "Gheorghe Hagi",
          team: "Romania",
          role: "Creative catalyst",
          summary: "Scored and continually found space between Colombia’s lines.",
        },
        {
          name: "Florin Răducioiu",
          team: "Romania",
          role: "Two-goal threat",
          summary: "Opened and closed the scoring with decisive finishes.",
        },
        {
          name: "Adolfo Valencia",
          team: "Colombia",
          role: "Brief equalizer",
          summary: "Gave Colombia a foothold before Romania pulled away.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF’s complete USA ’94 match archive.",
    },
  },
  "usa-1994-c20": {
    title: "Shared Ambition",
    world:
      "The first full week of the World Cup is ending, and several groups are beginning to tighten around the middle of the table.",
    tournament:
      "Group E has already produced sharp early results. Mexico and the Republic of Ireland now meet with both sides chasing control of their remaining path.",
    intro:
      "Mexico bring movement, technical quality and home-continent support. Ireland arrive with belief after an opening statement and a clear sense of what they want the match to become. In a crowded group, a single result can change the pressure on every remaining fixture.",
    watchFor:
      "Notice who controls the tempo after turnovers. Mexico prefer to settle; Ireland are happiest when the match stays direct and contested.",
    postMatch: {
      score: "Mexico 2–1 Republic of Ireland",
      halftime: "Halftime: 1–0",
      goal: "Luis García 44′, 65′; John Aldridge 84′",
      keyEvents: [
        "Luis García scored either side of halftime.",
        "Aldridge pulled one back late for Ireland.",
        "Mexico held on to take a vital Group E win.",
      ],
      impactPlayers: [
        {
          name: "Luis García",
          team: "Mexico",
          role: "Match winner",
          summary: "Scored twice and repeatedly stretched Ireland’s defense.",
        },
        {
          name: "Jorge Campos",
          team: "Mexico",
          role: "Last line",
          summary: "Helped Mexico protect the lead as Ireland pressed late.",
        },
        {
          name: "John Aldridge",
          team: "Republic of Ireland",
          role: "Late response",
          summary: "Gave Ireland a late goal and a final surge of belief.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF’s complete USA ’94 match archive.",
    },
  },
};

/** Targeted spoiler-safe editorial fixes required by the new Journey membership. */
const EDITORIAL_OVERRIDES: Record<
  string,
  Partial<Pick<EpisodeJson, "tournament" | "world" | "intro" | "watchFor" | "title">>
> = {
  "usa-1994-c03": {
    // Host opening match — Group A has not begun elsewhere yet.
    tournament:
      "Group A opens here. The United States and Switzerland both begin their campaigns on the same night, with Colombia and Romania still to come.",
  },
  "usa-1994-c15": {
    title: "Pasadena Shock",
    tournament:
      "Romania lead Group A after beating Colombia. The United States and Switzerland each have a point. This meeting already feels decisive for both sides.",
    intro:
      "The hosts can seize control of their own destiny with a result against Colombia. Colombia arrived among the tournament’s most discussed attacking sides and now face a United States team lifted by the Rose Bowl crowd. Few group matches carry this much immediate historical weight for American soccer.",
  },
};

function serializeExperiences(experiences: unknown[]): string {
  let body = JSON.stringify(experiences, null, 2);
  body = body.replace(/"kind": "(complete|journey|essential)"/g, '"kind": "$1" as const');
  return `import type { ExperienceDefinition } from "./types";\n\nexport const tournamentExperiences: ExperienceDefinition[] = ${body};\n`;
}

function rebuildEpisodes(
  journeyIds: string[],
  matchesById: Map<string, CanonicalMatch>,
  previousEpisodes: EpisodeJson[]
): EpisodeJson[] {
  const byMatch = new Map<string, EpisodeJson>();
  for (const episode of previousEpisodes) {
    const key = normalizeMatchKey(episode.match);
    byMatch.set(key, episode);
    byMatch.set(flipKey(key), episode);
  }

  return journeyIds.map((canonicalMatchId, index) => {
    const match = matchesById.get(canonicalMatchId);
    if (!match) {
      throw new Error(`Missing match ${canonicalMatchId} while rebuilding episodes.`);
    }

    const label = `${match.homeTeam} vs ${match.awayTeam}`;
    const key = teamsKey(match.homeTeam, match.awayTeam);
    const previous = byMatch.get(key) ?? byMatch.get(flipKey(key));
    const fresh = NEW_EPISODE_EDITORIAL[canonicalMatchId];
    const overrides = EDITORIAL_OVERRIDES[canonicalMatchId];

    const base = previous ?? {
      id: `usa-1994-${String(index + 1).padStart(2, "0")}`,
      tournamentId: "usa-1994",
      n: index + 1,
      title: fresh?.title ?? label,
      match: label,
      date: match.date,
      city: cityFromVenue(match.venue),
      stage: match.stage,
      world: fresh?.world,
      tournament: fresh?.tournament,
      intro: fresh?.intro,
      watchFor: fresh?.watchFor,
      postMatch: fresh?.postMatch ?? null,
    };

    return {
      ...base,
      id: `usa-1994-${String(index + 1).padStart(2, "0")}`,
      tournamentId: "usa-1994",
      n: index + 1,
      match: label,
      date: match.date,
      city: cityFromVenue(match.venue),
      stage: match.stage,
      title: overrides?.title ?? previous?.title ?? fresh?.title ?? label,
      world: overrides?.world ?? previous?.world ?? fresh?.world,
      tournament: overrides?.tournament ?? previous?.tournament ?? fresh?.tournament,
      intro: overrides?.intro ?? previous?.intro ?? fresh?.intro,
      watchFor: overrides?.watchFor ?? previous?.watchFor ?? fresh?.watchFor,
      postMatch: previous?.postMatch ?? fresh?.postMatch ?? null,
    };
  });
}

function printReports(matches: CanonicalMatch[], journeyIds: string[]) {
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, m]));

  console.log("\nREPORT 1 — COMPLETE TOURNAMENT");
  console.log(
    ["canonicalMatchId", "teams", "group/stage", "provider", "exact URL", "selectable"].join(
      " | "
    )
  );
  for (const match of [...matches].sort(
    (a, b) => a.chronologicalIndex - b.chronologicalIndex
  )) {
    const preferred = getPreferredSource(match);
    const groupOrStage =
      match.stage === "Group Stage" ? `Group ${match.group}` : match.stage;
    console.log(
      [
        match.canonicalMatchId,
        `${match.homeTeam} vs ${match.awayTeam}`,
        groupOrStage,
        preferred?.provider ?? "(none)",
        preferred?.url ?? "(none)",
        preferred && isProductionReadySource(preferred) ? "yes" : "no",
      ].join(" | ")
    );
  }

  console.log("\nREPORT 2 — JOURNEY");
  console.log(
    [
      "Journey position",
      "canonicalMatchId",
      "teams",
      "group/stage",
      "provider",
      "exact URL",
    ].join(" | ")
  );
  journeyIds.forEach((id, index) => {
    const match = byId.get(id)!;
    const preferred = getPreferredSource(match);
    const groupOrStage =
      match.stage === "Group Stage" ? `Group ${match.group}` : match.stage;
    console.log(
      [
        String(index + 1),
        id,
        `${match.homeTeam} vs ${match.awayTeam}`,
        groupOrStage,
        preferred?.provider ?? "(none)",
        preferred?.url ?? "(none)",
      ].join(" | ")
    );
  });

  console.log("\nREPORT 3 — GROUP REPRESENTATION");
  console.log(["Group", "Journey match count", "Journey matches"].join(" | "));
  const groups = ["A", "B", "C", "D", "E", "F"] as const;
  for (const group of groups) {
    const members = journeyIds
      .map((id) => byId.get(id)!)
      .filter((m) => m.stage === "Group Stage" && m.group === group);
    console.log(
      [
        group,
        String(members.length),
        members.map((m) => `${m.homeTeam} vs ${m.awayTeam}`).join("; "),
      ].join(" | ")
    );
  }
}

async function main() {
  const { matches, journeyIds, mappings } = applyUsa1994ReplayCatalogToArchive(
    usa1994Matches,
    VERIFIED_AT
  );

  if (mappings.length !== USA_1994_REPLAY_CATALOG.length) {
    throw new Error(
      `Expected ${USA_1994_REPLAY_CATALOG.length} catalog mappings, got ${mappings.length}`
    );
  }

  const experiences = tournamentExperiences.map((exp) => {
    if (exp.tournamentId === "usa-1994" && exp.kind === "journey") {
      return { ...exp, canonicalMatchIds: journeyIds };
    }
    if (exp.tournamentId === "usa-1994" && exp.kind === "essential") {
      return { ...exp, canonicalMatchIds: [] };
    }
    return exp;
  });

  const previousEpisodes = JSON.parse(
    fs.readFileSync(path.join(ROOT, "data/usa1994.json"), "utf8")
  ) as EpisodeJson[];
  const matchesById = new Map(matches.map((m) => [m.canonicalMatchId, m]));
  const episodes = rebuildEpisodes(journeyIds, matchesById, previousEpisodes);

  fs.writeFileSync(
    path.join(ROOT, "lib/archive/matches/usa1994.ts"),
    serializeCanonicalMatches("usa1994Matches", matches)
  );
  fs.writeFileSync(
    path.join(ROOT, "lib/archive/experiences.ts"),
    serializeExperiences(experiences)
  );
  fs.writeFileSync(
    path.join(ROOT, "data/usa1994.json"),
    `${JSON.stringify(episodes, null, 2)}\n`
  );

  const fifaCount = mappings.filter((m) => m.entry.provider === "FIFA").length;
  const dmCount = mappings.filter((m) => m.entry.provider === "Dailymotion").length;
  const completeReady = matches.filter((match) => {
    const preferred = getPreferredSource(match);
    return preferred != null && isProductionReadySource(preferred);
  });

  console.log(`Applied ${mappings.length} USA 1994 catalog mappings.`);
  console.log(`FIFA sources: ${fifaCount}`);
  console.log(`Dailymotion sources: ${dmCount}`);
  console.log(`Journey rebuilt to ${journeyIds.length} matches.`);
  console.log(
    `Complete tournament production-ready: ${completeReady.length}/${matches.length}`
  );

  printReports(matches, journeyIds);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
