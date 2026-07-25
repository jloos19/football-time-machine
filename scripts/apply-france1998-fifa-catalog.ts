#!/usr/bin/env node
/**
 * Applies the manually curated France 1998 FIFA catalog to the production archive,
 * installs Complete Tournament coverage sources, rebuilds Journey membership
 * (Official FIFA Collection minus Journey exclusions + verified Dailymotion extras),
 * and refreshes Journey episode JSON while preserving existing editorial by match pairing.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { france1998Matches } from "../lib/archive/matches/france1998";
import { tournamentExperiences } from "../lib/archive/experiences";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { applyFrance1998FifaCatalogToArchive } from "../lib/archive/france1998-fifa-apply";
import {
  FRANCE_1998_COMPLETE_COVERAGE_REPLAYS,
  FRANCE_1998_FIFA_REPLAYS,
  FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS,
  FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS,
} from "../lib/archive/france1998-fifa-catalog";
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

/** New Journey editorial for matches that were not previously Journey members. */
const NEW_EPISODE_EDITORIAL: Record<
  string,
  Omit<EpisodeJson, "id" | "tournamentId" | "n" | "match" | "date" | "city" | "stage">
> = {
  "france-1998-c09": {
    title: "Spanish Expectation",
    world:
      "Nantes hosts Spain and Nigeria as Group D continues to take shape across western France.",
    tournament:
      "Group D has already opened. Spain and Nigeria now begin their campaigns knowing Paraguay and Bulgaria share the section.",
    intro:
      "Spain arrive with European pedigree and attacking expectation. Nigeria bring pace, power and African Cup experience. An opening assignment in a four-team group leaves little room for caution.",
    postMatch: {
      score: "Spain 2–3 Nigeria",
      halftime: "Halftime: 1–1",
      goal: "Fernando Hierro 21′ (pen.); Mutiu Adepoju 24′; Raúl 47′; Sunday Oliseh 47′; Victor Ikpeba 80′",
      keyEvents: [
        "Hierro converted an early penalty to put Spain ahead.",
        "Adepoju equalized quickly for Nigeria.",
        "Raúl and Oliseh traded goals either side of the restart.",
        "Ikpeba sealed Nigeria's victory late in the second half.",
      ],
      impactPlayers: [
        {
          name: "Sunday Oliseh",
          team: "Nigeria",
          role: "Midfield thunderbolt",
          summary: "Struck from distance to restore Nigeria's lead after Spain had leveled.",
        },
        {
          name: "Victor Ikpeba",
          team: "Nigeria",
          role: "Late finish",
          summary: "Converted the goal that confirmed Spain's opening defeat.",
        },
        {
          name: "Raúl",
          team: "Spain",
          role: "Equalizer",
          summary: "Briefly restored parity before Nigeria pulled away again.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c15": {
    title: "Continental Weight",
    world:
      "Parc des Princes stages Germany against the United States as Group F gathers momentum in Paris.",
    tournament:
      "Group F is underway. Germany and the United States now meet knowing early points will define the room for error ahead.",
    intro:
      "Germany arrive with European pedigree and the expectation of a deep tournament run. The United States bring organization, athleticism and the confidence of a side that reached the round of 16 four years earlier. Neither can treat an opening Group F assignment lightly.",
    postMatch: {
      score: "Germany 2–0 United States",
      halftime: "Halftime: 1–0",
      goal: "Andreas Möller 9′; Jürgen Klinsmann 65′",
      keyEvents: [
        "Möller gave Germany an early lead from close range.",
        "Klinsmann doubled the advantage in the second half.",
        "Germany controlled the contest and opened Group F with a win.",
      ],
      impactPlayers: [
        {
          name: "Andreas Möller",
          team: "Germany",
          role: "Early breakthrough",
          summary: "Opened the scoring and set Germany's tempo.",
        },
        {
          name: "Jürgen Klinsmann",
          team: "Germany",
          role: "Second goal",
          summary: "Finished the contest and underlined Germany's attacking quality.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c08": {
    title: "Orange and Red",
    world:
      "Parc des Princes hosts the Netherlands against Belgium as Group E opens in Paris.",
    tournament:
      "Group E begins with a Low Countries derby. Mexico and South Korea share the section.",
    intro:
      "The Netherlands arrive with attacking expectation and technical depth. Belgium bring European organization and local knowledge of a fierce rivalry. An opening Group E assignment leaves little room for caution.",
    postMatch: {
      score: "Netherlands 0–0 Belgium",
      halftime: "Halftime: 0–0",
      goal: "No goals",
      keyEvents: [
        "Both sides created chances without converting.",
        "The derby finished goalless.",
        "Group E opened with a shared point.",
      ],
      impactPlayers: [
        {
          name: "Frank de Boer",
          team: "Netherlands",
          role: "Defensive control",
          summary: "Anchored the Dutch back line through a tense derby.",
        },
        {
          name: "Marc Wilmots",
          team: "Belgium",
          role: "Midfield drive",
          summary: "Pushed Belgium forward and kept the contest unsettled.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c25": {
    title: "Iberian Pressure",
    world:
      "Saint-Étienne stages Spain against Paraguay as Group D continues to tighten.",
    tournament:
      "Nigeria lead Group D. Spain need a result against Paraguay to restore their campaign.",
    intro:
      "Spain arrive under pressure after an opening defeat. Paraguay bring defensive resolve and counter-attacking threat. Group D's mathematics leave little margin for another slip.",
    postMatch: {
      score: "Spain 0–0 Paraguay",
      halftime: "Halftime: 0–0",
      goal: "No goals",
      keyEvents: [
        "Spain dominated possession without breaking through.",
        "Paraguay defended deep and held firm.",
        "Both sides remained level in Group D.",
      ],
      impactPlayers: [
        {
          name: "José Luis Chilavert",
          team: "Paraguay",
          role: "Goalkeeping command",
          summary: "Organized Paraguay's resistance and preserved the point.",
        },
        {
          name: "Raúl",
          team: "Spain",
          role: "Attacking threat",
          summary: "Led Spain's search for a breakthrough that never came.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c26": {
    title: "Political Night",
    world:
      "Lyon hosts Iran against the United States as Group F delivers one of the tournament's most charged fixtures.",
    tournament:
      "Group F remains open. Iran and the United States now meet knowing the result will reshape the section.",
    intro:
      "Iran arrive with organization and set-piece threat. The United States bring athleticism and tournament experience. Beyond the pitch, the fixture carries a weight few World Cup matches ever match.",
    postMatch: {
      score: "Iran 2–1 United States",
      halftime: "Halftime: 1–1",
      goal: "Estili 40′; McBride 43′; Mahdavikia 84′",
      keyEvents: [
        "Estili gave Iran the lead before halftime.",
        "McBride equalized almost immediately for the United States.",
        "Mahdavikia struck late to seal Iran's victory.",
      ],
      impactPlayers: [
        {
          name: "Mehdi Mahdavikia",
          team: "Iran",
          role: "Match winner",
          summary: "Finished the decisive late goal that secured Iran's win.",
        },
        {
          name: "Brian McBride",
          team: "United States",
          role: "Equalizer",
          summary: "Restored parity and kept the United States in the contest.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c31": {
    title: "English Ambition",
    world:
      "Toulouse stages Romania against England as Group G reaches a decisive mid-group meeting.",
    tournament:
      "Group G is finely balanced. Romania and England now meet knowing a win would seize early control.",
    intro:
      "Romania arrive with European craft and tournament composure. England bring attacking talent and the expectation of a deep run. Group G's middle fixture can redefine both campaigns overnight.",
    postMatch: {
      score: "Romania 2–1 England",
      halftime: "Halftime: 0–0",
      goal: "Viorel Moldovan 47′; Michael Owen 79′; Dan Petrescu 90′",
      keyEvents: [
        "Moldovan broke the deadlock after halftime.",
        "Owen equalized late for England.",
        "Petrescu scored in the final minute to win it for Romania.",
      ],
      impactPlayers: [
        {
          name: "Dan Petrescu",
          team: "Romania",
          role: "Late winner",
          summary: "Converted the stoppage-time finish that stunned England.",
        },
        {
          name: "Michael Owen",
          team: "England",
          role: "Equalizer",
          summary: "Briefly restored parity before Romania struck again.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c44": {
    title: "Final Group G Night",
    world:
      "Lens hosts Colombia against England as Group G reaches its closing assignment.",
    tournament:
      "England need a result to secure passage. Colombia arrive searching for a late route into the knockout rounds.",
    intro:
      "England bring urgency and attacking depth. Colombia arrive with nothing to lose and the hope of a historic recovery. Group G's final night will decide who advances.",
    postMatch: {
      score: "Colombia 0–2 England",
      halftime: "Halftime: 0–2",
      goal: "Darren Anderton 20′; David Beckham 29′",
      keyEvents: [
        "Anderton opened the scoring in the first half.",
        "Beckham doubled the lead from a free kick.",
        "England secured qualification from Group G.",
      ],
      impactPlayers: [
        {
          name: "David Beckham",
          team: "England",
          role: "Free-kick finish",
          summary: "Struck the second goal that settled England's passage.",
        },
        {
          name: "Darren Anderton",
          team: "England",
          role: "Early breakthrough",
          summary: "Opened the scoring and set England's tempo.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c18": {
    title: "Alpine Resolve",
    world:
      "Saint-Étienne hosts another Group B assignment as Chile and Austria search for clarity in a tightly contested section.",
    tournament:
      "Group B remains finely balanced. Chile and Austria now meet knowing a point could prove decisive later in the group.",
    intro:
      "Chile arrive with attacking threat and tournament experience. Austria bring European organization and the need for a result. In a four-team group, every shared point changes the mathematics.",
    postMatch: {
      score: "Chile 1–1 Austria",
      halftime: "Halftime: 0–0",
      goal: "Marcelo Salas 70′; Ivica Vastić 90+'",
      keyEvents: [
        "Salas broke the deadlock late in the second half.",
        "Vastić equalized deep in stoppage time.",
        "Both sides remained level in Group B.",
      ],
      impactPlayers: [
        {
          name: "Marcelo Salas",
          team: "Chile",
          role: "Late breakthrough",
          summary: "Found the finish that briefly put Chile ahead.",
        },
        {
          name: "Ivica Vastić",
          team: "Austria",
          role: "Stoppage-time equalizer",
          summary: "Rescued a vital point in the dying seconds.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c19": {
    title: "Italian Authority",
    world:
      "Montpellier stages Italy's second Group B assignment as Cameroon look to recover from an opening draw.",
    tournament:
      "Group B continues to take shape. Italy and Cameroon now meet knowing the first decisive result would reshape the section overnight.",
    intro:
      "Italy bring defensive structure and attacking depth. Cameroon arrive with pace and physical presence. The first decisive result in Group B would reshape the section overnight.",
    postMatch: {
      score: "Italy 3–0 Cameroon",
      halftime: "Halftime: 1–0",
      goal: "Luigi Di Biagio 7′; Christian Vieri 75′, 89′",
      keyEvents: [
        "Di Biagio gave Italy an early lead.",
        "Vieri scored twice late to complete the victory.",
        "Italy took control of Group B.",
      ],
      impactPlayers: [
        {
          name: "Christian Vieri",
          team: "Italy",
          role: "Brace",
          summary: "Finished the contest with two late goals.",
        },
        {
          name: "Luigi Di Biagio",
          team: "Italy",
          role: "Early breakthrough",
          summary: "Opened the scoring and set Italy's tempo.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c20": {
    title: "Southern Ambition",
    world:
      "The Stade de France welcomes South Africa and Saudi Arabia as Group C continues to take shape.",
    tournament:
      "France have already opened Group C. South Africa and Saudi Arabia now chase their first points of the tournament.",
    intro:
      "South Africa arrive for a first World Cup campaign with energy and ambition. Saudi Arabia bring Asian Cup pedigree and the need for a result. Neither side can afford to fall behind early in the group.",
    postMatch: {
      score: "South Africa 2–2 Saudi Arabia",
      halftime: "Halftime: 1–1",
      goal: "Shaun Bartlett 19′, 90+4′ (pen.); Sami Al-Jaber 45′ (pen.); Yousuf Al-Thunayan 74′ (pen.)",
      keyEvents: [
        "Bartlett opened the scoring for South Africa.",
        "Two Saudi penalties leveled and then led the contest.",
        "Bartlett converted a stoppage-time penalty to share the points.",
      ],
      impactPlayers: [
        {
          name: "Shaun Bartlett",
          team: "South Africa",
          role: "Brace",
          summary: "Scored early and rescued a point from the spot at the death.",
        },
        {
          name: "Sami Al-Jaber",
          team: "Saudi Arabia",
          role: "Penalty equalizer",
          summary: "Kept Saudi Arabia in the contest before halftime.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c22": {
    title: "Drawn Lines",
    world:
      "Bordeaux stages a Group E meeting between Mexico and Belgium as both sides search for separation.",
    tournament:
      "Group E remains finely balanced. Mexico and Belgium now meet knowing a draw keeps the mathematics crowded.",
    intro:
      "Mexico bring attacking flair and tournament experience. Belgium arrive with European structure and midfield craft. In a group featuring the Netherlands, every shared point carries weight.",
    postMatch: {
      score: "Mexico 2–2 Belgium",
      halftime: "Halftime: 0–1",
      goal: "Marc Wilmots 42′, 47′; Alberto García Aspe 55′ (pen.); Cuauhtémoc Blanco 62′",
      keyEvents: [
        "Wilmots scored either side of halftime to put Belgium ahead.",
        "García Aspe converted a penalty to begin Mexico's recovery.",
        "Blanco completed the comeback for a shared point.",
      ],
      impactPlayers: [
        {
          name: "Marc Wilmots",
          team: "Belgium",
          role: "Brace",
          summary: "Scored twice to put Belgium in control.",
        },
        {
          name: "Cuauhtémoc Blanco",
          team: "Mexico",
          role: "Equalizer",
          summary: "Finished the comeback that preserved Mexico's standing.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c28": {
    title: "First World Cup Nights",
    world:
      "Toulouse hosts Japan and Jamaica as two debutant World Cup nations chase a first victory in Group H.",
    tournament:
      "Argentina and Croatia have already taken points in Group H. Japan and Jamaica now meet with both still searching for a win.",
    intro:
      "Japan arrive for a first World Cup finals with discipline and organization. Jamaica bring Caribbean energy and the ambition of a historic breakthrough. A first win would transform either campaign.",
    postMatch: {
      score: "Japan 1–2 Jamaica",
      halftime: "Halftime: 0–1",
      goal: "Theodore Whitmore 39′, 54′; Masashi Nakayama 74′",
      keyEvents: [
        "Whitmore scored twice to put Jamaica in control.",
        "Nakayama pulled one back for Japan.",
        "Jamaica claimed a first World Cup finals victory.",
      ],
      impactPlayers: [
        {
          name: "Theodore Whitmore",
          team: "Jamaica",
          role: "Brace",
          summary: "Scored twice and delivered Jamaica's landmark win.",
        },
        {
          name: "Masashi Nakayama",
          team: "Japan",
          role: "Consolation",
          summary: "Found Japan's reply but could not force a draw.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c34": {
    title: "Group B Decided",
    world:
      "The Stade de France stages Italy against Austria as Group B reaches its final round of fixtures.",
    tournament:
      "Italy lead Group B. Austria still need a result to keep qualification alive on the final matchday.",
    intro:
      "Italy arrive with qualification within reach and attacking confidence. Austria bring urgency and the knowledge that only a win keeps their tournament alive. Group B's final afternoon will settle the section.",
    postMatch: {
      score: "Italy 2–1 Austria",
      halftime: "Halftime: 0–0",
      goal: "Christian Vieri 49′; Roberto Baggio 89′; Andreas Herzog 90′ (pen.)",
      keyEvents: [
        "Vieri broke the deadlock after halftime.",
        "Baggio added a late second for Italy.",
        "Herzog converted a stoppage-time penalty for Austria.",
      ],
      impactPlayers: [
        {
          name: "Christian Vieri",
          team: "Italy",
          role: "Breakthrough",
          summary: "Opened the scoring and steered Italy toward first place.",
        },
        {
          name: "Roberto Baggio",
          team: "Italy",
          role: "Late insurance",
          summary: "Added the finish that secured the result.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c35": {
    title: "Three Points Enough",
    world:
      "Nantes hosts Chile and Cameroon on Group B's final matchday as both sides chase a path into the knockout rounds.",
    tournament:
      "Italy are already in control of Group B. Chile and Cameroon now meet knowing a draw can still decide second place.",
    intro:
      "Chile arrive unbeaten and hunting qualification. Cameroon need a win to overturn the mathematics. On the final day of the group, caution and ambition collide.",
    postMatch: {
      score: "Chile 1–1 Cameroon",
      halftime: "Halftime: 1–0",
      goal: "José Luis Sierra 20′; Patrick Mboma 56′",
      keyEvents: [
        "Sierra gave Chile a first-half lead.",
        "Mboma equalized after the break.",
        "Chile's third draw secured second place in Group B.",
      ],
      impactPlayers: [
        {
          name: "José Luis Sierra",
          team: "Chile",
          role: "Early lead",
          summary: "Put Chile ahead and kept qualification on track.",
        },
        {
          name: "Patrick Mboma",
          team: "Cameroon",
          role: "Equalizer",
          summary: "Restored parity but could not force the win Cameroon needed.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c36": {
    title: "Hosts Unbeaten",
    world:
      "Nantes stages France against Saudi Arabia as the hosts look to complete a perfect Group C campaign.",
    tournament:
      "France lead Group C. Saudi Arabia arrive needing a result to stay alive on the final matchday.",
    intro:
      "France bring home support and tournament momentum. Saudi Arabia arrive under pressure and searching for a first win. The hosts can seal top spot with another controlled performance.",
    postMatch: {
      score: "France 4–0 Saudi Arabia",
      halftime: "Halftime: 1–0",
      goal: "Thierry Henry 36′, 77′; David Trezeguet 68′; Bixente Lizarazu 85′",
      keyEvents: [
        "Henry opened the scoring before halftime.",
        "Trezeguet and Henry extended the lead after the break.",
        "Lizarazu completed a dominant French victory.",
      ],
      impactPlayers: [
        {
          name: "Thierry Henry",
          team: "France",
          role: "Brace",
          summary: "Scored twice and drove the hosts' attacking rhythm.",
        },
        {
          name: "David Trezeguet",
          team: "France",
          role: "Clinical finish",
          summary: "Added the goal that broke the contest open.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c37": {
    title: "Shared Fate",
    world:
      "Toulouse hosts South Africa and Denmark as Group C reaches its final round of fixtures.",
    tournament:
      "France have already taken control of Group C. Denmark and South Africa now meet with qualification still unsettled.",
    intro:
      "Denmark arrive needing a result to secure passage. South Africa chase a first World Cup win and a late mathematical chance. The final Group C afternoon will decide who joins France.",
    postMatch: {
      score: "South Africa 1–1 Denmark",
      halftime: "Halftime: 0–1",
      goal: "Allan Nielsen 13′; Benedict McCarthy 52′",
      keyEvents: [
        "Nielsen gave Denmark an early lead.",
        "McCarthy equalized after halftime.",
        "Denmark advanced from Group C on the final standings.",
      ],
      impactPlayers: [
        {
          name: "Allan Nielsen",
          team: "Denmark",
          role: "Early breakthrough",
          summary: "Put Denmark ahead and kept qualification on course.",
        },
        {
          name: "Benedict McCarthy",
          team: "South Africa",
          role: "Equalizer",
          summary: "Restored parity and ensured South Africa finished with a point.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c46": {
    title: "Argentine Statement",
    world:
      "Paris stages Argentina against Jamaica as Group H's final round begins to settle the section.",
    tournament:
      "Argentina lead Group H. Jamaica arrive searching for points after a difficult opening to the tournament.",
    intro:
      "Argentina bring attacking depth and tournament pedigree. Jamaica arrive with energy and the hope of a historic result. Group H's closing fixtures will decide who advances.",
    postMatch: {
      score: "Argentina 5–0 Jamaica",
      halftime: "Halftime: 1–0",
      goal: "Ariel Ortega 31′, 55′; Gabriel Batistuta 72′, 80′, 83′ (pen.)",
      keyEvents: [
        "Ortega scored twice to put Argentina in control.",
        "Batistuta completed a second-half hat-trick.",
        "Argentina sealed top place in Group H.",
      ],
      impactPlayers: [
        {
          name: "Gabriel Batistuta",
          team: "Argentina",
          role: "Hat-trick",
          summary: "Finished the contest with three second-half goals.",
        },
        {
          name: "Ariel Ortega",
          team: "Argentina",
          role: "Brace",
          summary: "Opened the scoring and set Argentina's rhythm.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
  },
  "france-1998-c47": {
    title: "Group H Closed",
    world:
      "Nantes hosts Japan and Croatia on Group H's final matchday as both sides chase different outcomes.",
    tournament:
      "Argentina have already taken control of Group H. Croatia need a result to secure second place; Japan still search for a first point.",
    intro:
      "Croatia arrive with qualification within reach. Japan bring organization and the need for a first World Cup point. The final Group H fixture will confirm who advances.",
    postMatch: {
      score: "Japan 0–1 Croatia",
      halftime: "Halftime: 0–0",
      goal: "Davor Šuker 77′",
      keyEvents: [
        "Šuker scored the decisive second-half goal.",
        "Croatia secured second place in Group H.",
        "Japan finished the group without a point.",
      ],
      impactPlayers: [
        {
          name: "Davor Šuker",
          team: "Croatia",
          role: "Match winner",
          summary: "Converted the finish that confirmed Croatia's passage.",
        },
      ],
      sourceNote:
        "Score, scorers and major incidents cross-checked against RSSSF's complete France '98 match archive.",
    },
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

    const base = previous ?? {
      id: `france-1998-${String(index + 1).padStart(2, "0")}`,
      tournamentId: "france-1998",
      n: index + 1,
      title: fresh?.title ?? label,
      match: label,
      date: match.date,
      city: cityFromVenue(match.venue),
      stage: match.stage,
      world: fresh?.world,
      tournament: fresh?.tournament,
      intro: fresh?.intro,
      postMatch: fresh?.postMatch ?? null,
    };

    return {
      ...base,
      id: `france-1998-${String(index + 1).padStart(2, "0")}`,
      tournamentId: "france-1998",
      n: index + 1,
      match: label,
      date: match.date,
      city: cityFromVenue(match.venue),
      stage: match.stage,
      title: previous?.title ?? fresh?.title ?? label,
      world: previous?.world ?? fresh?.world,
      tournament: previous?.tournament ?? fresh?.tournament,
      intro: previous?.intro ?? fresh?.intro,
      postMatch: previous?.postMatch ?? fresh?.postMatch ?? null,
    };
  });
}

function printTables(
  matches: CanonicalMatch[],
  journeyIds: string[],
  mappings: ReturnType<typeof applyFrance1998FifaCatalogToArchive>["mappings"],
  coverageMappings: ReturnType<
    typeof applyFrance1998FifaCatalogToArchive
  >["coverageMappings"]
) {
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, m]));
  const journeySet = new Set(journeyIds);
  const exclusionSet = new Set<string>(FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS);

  console.log("\nTable 1 — Official FIFA Collection (34)");
  console.log(
    [
      "canonicalMatchId",
      "teams",
      "stage",
      "exact FIFA URL",
      "in Journey",
      "live resolver URL",
    ].join(" | ")
  );

  for (const { entry, match: mapped } of mappings) {
    const match = byId.get(mapped.canonicalMatchId)!;
    const preferred = getPreferredSource(match);
    console.log(
      [
        match.canonicalMatchId,
        `${match.homeTeam} vs ${match.awayTeam}`,
        match.stage,
        entry.url,
        journeySet.has(match.canonicalMatchId) ? "yes" : "no",
        preferred?.url ?? "(none)",
      ].join(" | ")
    );
  }

  console.log("\nTable 2 — Complete Tournament coverage additions");
  console.log(
    ["canonicalMatchId", "teams", "provider", "supplied URL", "live resolver URL"].join(
      " | "
    )
  );
  for (const { entry, match: mapped } of coverageMappings) {
    const match = byId.get(mapped.canonicalMatchId)!;
    const preferred = getPreferredSource(match);
    console.log(
      [
        match.canonicalMatchId,
        `${match.homeTeam} vs ${match.awayTeam}`,
        entry.provider,
        entry.url,
        preferred?.url ?? "(none)",
      ].join(" | ")
    );
  }

  console.log("\nTable 3 — France 1998 Journey");
  console.log(
    ["journey position", "canonicalMatchId", "teams", "stage", "group", "provider", "URL"].join(
      " | "
    )
  );

  const extraSet: Set<string> = new Set(
    FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS.map((e) => e.canonicalMatchId)
  );

  journeyIds.forEach((id, index) => {
    const match = byId.get(id)!;
    const preferred = getPreferredSource(match);
    const note = extraSet.has(id) ? " [non-FIFA Dailymotion]" : "";
    console.log(
      [
        String(index + 1),
        id,
        `${match.homeTeam} vs ${match.awayTeam}${note}`,
        match.stage,
        match.group ?? "-",
        preferred?.provider ?? "(none)",
        preferred?.url ?? "(none)",
      ].join(" | ")
    );
  });

  console.log("\nOfficial FIFA Collection matches excluded from Journey:");
  for (const id of exclusionSet) {
    const match = byId.get(id);
    console.log(
      `- ${id}: ${match ? `${match.homeTeam} vs ${match.awayTeam}` : "(missing)"}`
    );
  }

  console.log("\nNon-FIFA Journey selections:");
  for (const extra of FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS) {
    console.log(`- ${extra.canonicalMatchId}: ${extra.reason}`);
  }

  console.log(
    `\nComplete coverage catalog size: ${FRANCE_1998_COMPLETE_COVERAGE_REPLAYS.length}`
  );
}

async function main() {
  const { matches, journeyIds, mappings, coverageMappings } =
    applyFrance1998FifaCatalogToArchive(france1998Matches, VERIFIED_AT);

  if (mappings.length !== FRANCE_1998_FIFA_REPLAYS.length) {
    throw new Error(
      `Expected ${FRANCE_1998_FIFA_REPLAYS.length} FIFA mappings, got ${mappings.length}`
    );
  }
  if (coverageMappings.length !== FRANCE_1998_COMPLETE_COVERAGE_REPLAYS.length) {
    throw new Error(
      `Expected ${FRANCE_1998_COMPLETE_COVERAGE_REPLAYS.length} coverage mappings, got ${coverageMappings.length}`
    );
  }

  const experiences = tournamentExperiences.map((exp) => {
    if (exp.tournamentId === "france-1998" && exp.kind === "journey") {
      return { ...exp, canonicalMatchIds: journeyIds };
    }
    return exp;
  });

  const previousEpisodes = JSON.parse(
    fs.readFileSync(path.join(ROOT, "data/france1998.json"), "utf8")
  ) as EpisodeJson[];
  const matchesById = new Map(matches.map((m) => [m.canonicalMatchId, m]));
  const episodes = rebuildEpisodes(journeyIds, matchesById, previousEpisodes);

  fs.writeFileSync(
    path.join(ROOT, "lib/archive/matches/france1998.ts"),
    serializeCanonicalMatches("france1998Matches", matches)
  );
  fs.writeFileSync(
    path.join(ROOT, "lib/archive/experiences.ts"),
    serializeExperiences(experiences)
  );
  fs.writeFileSync(
    path.join(ROOT, "data/france1998.json"),
    `${JSON.stringify(episodes, null, 2)}\n`
  );

  // Validation counts using in-memory result (before module reload).
  const journeyReady = journeyIds.filter((id) => {
    const match = matchesById.get(id)!;
    return isProductionReadySource(getPreferredSource(match)!);
  });
  const completeReady = matches.filter((match) => {
    const preferred = getPreferredSource(match);
    return preferred != null && isProductionReadySource(preferred);
  });

  console.log(`Applied ${mappings.length} FIFA catalog mappings.`);
  console.log(`Applied ${coverageMappings.length} Complete Tournament coverage sources.`);
  console.log(`Journey rebuilt to ${journeyIds.length} matches.`);
  console.log(`Journey production-ready: ${journeyReady.length}/${journeyIds.length}`);
  console.log(
    `Complete tournament production-ready: ${completeReady.length}/${matches.length}`
  );

  printTables(matches, journeyIds, mappings, coverageMappings);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
