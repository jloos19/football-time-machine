/**
 * Rebuild canonical match editorial from Story season JSON + curated non-story packs.
 * Run: npx tsx scripts/enrich-editorial.ts
 */
import { writeFileSync } from "node:fs";
import { getCanonicalArchive } from "../lib/archive";
import usaStory from "../data/usa1994.json";
import fraStory from "../data/france1998.json";
import usaEd from "../data/editorial/usa-1994-matches.json";
import fraEd from "../data/editorial/france-1998-matches.json";
import type { CanonicalMatchEditorial } from "../lib/editorial/types";

type StoryEp = {
  id: string;
  intro?: string;
  world?: string;
  tournament?: string;
  postMatch: {
    score: string;
    halftime: string;
    goal: string;
    keyEvents: string[];
    impactPlayers: Array<{
      name: string;
      team: string;
      role: string;
      summary: string;
    }>;
    sourceNote?: string;
  } | null;
};

type Player = CanonicalMatchEditorial["postMatch"]["playersWhoShapedTheMatch"][number];
type Moment = CanonicalMatchEditorial["postMatch"]["keyMoments"][number];

function parseGoalMoments(goal: string): Moment[] {
  const trimmed = goal.trim();
  if (!trimmed || /^no goals/i.test(trimmed)) return [];
  const moments: Moment[] = [];
  for (const group of trimmed.split(/\s*;\s*/)) {
    const nameMatch = group.match(/^(.+?)\s+(?=\d)/);
    if (!nameMatch) continue;
    const name = nameMatch[1]!.trim();
    const rest = group.slice(nameMatch[0].length);
    const noteMatch = rest.match(/\(([^)]+)\)\s*$/);
    const note = noteMatch?.[1] ?? null;
    const minutePart = noteMatch ? rest.slice(0, noteMatch.index) : rest;
    const minutes = [...minutePart.matchAll(/(\d+)\s*[′'`]/g)].map((m) => m[1]!);
    minutes.forEach((minute, index) => {
      const isLast = index === minutes.length - 1;
      const label = note && isLast ? `${name} (${note})` : name;
      moments.push({
        minute: `${minute}'`,
        title: `${label} scores`,
      });
    });
  }
  return moments;
}

function mergeStory(
  editorial: CanonicalMatchEditorial[],
  story: StoryEp[],
  tournamentId: "usa-1994" | "france-1998",
  archiveNoteDefault: string
): CanonicalMatchEditorial[] {
  const archive = getCanonicalArchive(tournamentId);
  const byEpisode = new Map(story.map((e) => [e.id, e]));
  const storyByCanonical = new Map<string, StoryEp>();
  for (const match of archive) {
    const epId = match.editorial?.journeyEpisodeId;
    if (!epId) continue;
    const ep = byEpisode.get(epId);
    if (ep) storyByCanonical.set(match.canonicalMatchId, ep);
  }

  return editorial.map((row) => {
    const ep = storyByCanonical.get(row.canonicalMatchId);
    if (!ep?.postMatch) return row;
    const pm = ep.postMatch;
    const goalMoments = parseGoalMoments(pm.goal);
    const eventMoments: Moment[] = (pm.keyEvents ?? []).map((event) => ({
      title: event.replace(/\.$/, ""),
    }));
    const keyMoments =
      goalMoments.length > 0
        ? [
            ...goalMoments,
            ...eventMoments
              .filter(
                (k) =>
                  !goalMoments.some((g) =>
                    k.title
                      .toLowerCase()
                      .includes((g.title.split(" ")[0] || "").toLowerCase())
                  )
              )
              .slice(0, 2),
          ]
        : eventMoments.length > 0
          ? eventMoments
          : row.postMatch.keyMoments;

    const players: Player[] = (pm.impactPlayers ?? []).map((p) => ({
      player: p.name,
      team: p.team,
      role: p.role,
      description: p.summary,
    }));

    return {
      canonicalMatchId: row.canonicalMatchId,
      preMatch: {
        sceneSetter: row.preMatch.sceneSetter,
        aroundTheWorld: ep.world?.trim() || row.preMatch.aroundTheWorld,
        inTheTournament: ep.tournament?.trim() || row.preMatch.inTheTournament,
        whyItMatters: ep.intro?.trim() || row.preMatch.whyItMatters,
      },
      postMatch: {
        score: pm.score,
        halftime: pm.halftime,
        goal: pm.goal,
        matchReport:
          (pm.keyEvents ?? []).join(" ").trim() || row.postMatch.matchReport,
        keyMoments,
        playersWhoShapedTheMatch:
          players.length >= 2
            ? players
            : row.postMatch.playersWhoShapedTheMatch,
        archiveNote: pm.sourceNote || archiveNoteDefault,
        sources: row.postMatch.sources ?? ["RSSSF", "FIFA match records"],
      },
    };
  });
}

const USA_NONSTORY: Record<
  string,
  { players: Player[]; moments?: Moment[]; report?: string }
> = {
  "usa-1994-c02": {
    report:
      "Spain established a two-goal advantage through Goikoetxea and Salinas. South Korea refused the script, with Hong Myung-bo and Seo Jung-won striking late. The Cotton Bowl finished level after a remarkable recovery.",
    players: [
      {
        player: "Hong Myung-bo",
        team: "South Korea",
        role: "Late rally leader",
        description:
          "Stepped forward late to spark South Korea’s recovery and score the goal that made the comeback possible.",
      },
      {
        player: "Julio Salinas",
        team: "Spain",
        role: "Second-half finisher",
        description:
          "Extended Spain’s lead after the interval and looked set to settle the opening Group C point.",
      },
      {
        player: "Seo Jung-won",
        team: "South Korea",
        role: "Stoppage-time scorer",
        description:
          "Struck in the final moments to complete a remarkable 2–2 recovery.",
      },
    ],
  },
  "usa-1994-c05": {
    players: [
      {
        player: "Kjetil Rekdal",
        team: "Norway",
        role: "Match winner",
        description:
          "Converted the late penalty that decided a tense, low-scoring meeting with Mexico.",
      },
      {
        player: "Erik Thorstvedt",
        team: "Norway",
        role: "Commanding goalkeeper",
        description:
          "Helped Norway survive long spells of Mexican pressure before the decisive award.",
      },
    ],
  },
  "usa-1994-c06": {
    players: [
      {
        player: "Martin Dahlin",
        team: "Sweden",
        role: "Equaliser",
        description:
          "Restored parity late after Cameroon had twice threatened to pull clear.",
      },
      {
        player: "François Omam-Biyik",
        team: "Cameroon",
        role: "Attacking threat",
        description:
          "Scored and repeatedly unsettled Sweden’s defence in an open Group B contest.",
      },
      {
        player: "Roger Ljung",
        team: "Sweden",
        role: "Early breakthrough",
        description:
          "Gave Sweden a dream start with an early goal at the Rose Bowl.",
      },
    ],
  },
  "usa-1994-c09": {
    moments: [
      {
        title: "A hard-earned stalemate",
        description:
          "South Korea and Bolivia cancel each other out in Foxborough.",
      },
      {
        title: "Defences hold",
        description: "Clear chances remain scarce across ninety minutes.",
      },
    ],
    players: [
      {
        player: "Carlos Trucco",
        team: "Bolivia",
        role: "Reliable last line",
        description:
          "Helped Bolivia leave Foxboro with a hard-earned point against South Korea.",
      },
      {
        player: "Hong Myung-bo",
        team: "South Korea",
        role: "Defensive organiser",
        description:
          "Anchored South Korea’s attempts to break down a compact Bolivian side.",
      },
    ],
  },
  "usa-1994-c10": {
    players: [
      {
        player: "Wim Jonk",
        team: "Netherlands",
        role: "Equaliser",
        description:
          "Levelled after Saudi Arabia’s early shock and restored Dutch control.",
      },
      {
        player: "Ronald de Boer",
        team: "Netherlands",
        role: "Late winner",
        description:
          "Struck late to turn a difficult afternoon into three points.",
      },
      {
        player: "Fuad Amin",
        team: "Saudi Arabia",
        role: "Early shock",
        description:
          "Gave Saudi Arabia an unlikely early lead that forced the Netherlands to chase.",
      },
    ],
  },
  "usa-1994-c11": {
    players: [
      {
        player: "Marc Degryse",
        team: "Belgium",
        role: "Match winner",
        description:
          "Scored early and gave Belgium a lead they protected with disciplined defending.",
      },
      {
        player: "Michel Preud'homme",
        team: "Belgium",
        role: "Goalkeeper",
        description: "Repelled Morocco’s later surges to preserve the narrow win.",
      },
    ],
  },
  "usa-1994-c16": {
    players: [
      {
        player: "Adrian Knup",
        team: "Switzerland",
        role: "Clinical finisher",
        description:
          "Scored twice as Switzerland overwhelmed Romania after the interval.",
      },
      {
        player: "Stéphane Chapuisat",
        team: "Switzerland",
        role: "Attacking catalyst",
        description:
          "Added a crucial second-half goal and stretched Romania’s defence.",
      },
      {
        player: "Gheorghe Hagi",
        team: "Romania",
        role: "Consolation and quality",
        description:
          "Produced Romania’s reply and remained the visitors’ clearest creative outlet.",
      },
    ],
  },
  "usa-1994-c17": {
    players: [
      {
        player: "Dino Baggio",
        team: "Italy",
        role: "Match winner",
        description:
          "Struck the second-half goal that decided a grinding contest with Norway.",
      },
      {
        player: "Franco Baresi",
        team: "Italy",
        role: "Defensive control",
        description:
          "Organised Italy’s back line through Norway’s direct pressure.",
      },
    ],
  },
  "usa-1994-c18": {
    players: [
      {
        player: "Romário",
        team: "Brazil",
        role: "Opener",
        description:
          "Broke Cameroon’s resistance and set Brazil on course for a convincing win.",
      },
      {
        player: "Bebeto",
        team: "Brazil",
        role: "Finisher",
        description:
          "Added the third goal as Brazil’s movement overwhelmed the Cameroon defence.",
      },
      {
        player: "Márcio Santos",
        team: "Brazil",
        role: "Unexpected scorer",
        description:
          "Added a second-half goal from defence to underline Brazil’s control.",
      },
    ],
  },
  "usa-1994-c19": {
    players: [
      {
        player: "José Luis Caminero",
        team: "Spain",
        role: "Two-goal midfielder",
        description:
          "Scored twice in quick succession to break Bolivia’s resistance in Chicago.",
      },
      {
        player: "Pep Guardiola",
        team: "Spain",
        role: "Penalty composure",
        description:
          "Opened the scoring from the spot and dictated Spain’s midfield tempo.",
      },
      {
        player: "Erwin Sánchez",
        team: "Bolivia",
        role: "Consolation",
        description:
          "Provided Bolivia’s reply and remained their most inventive attacking presence.",
      },
    ],
  },
  "usa-1994-c21": {
    players: [
      {
        player: "Martin Dahlin",
        team: "Sweden",
        role: "Two-goal forward",
        description:
          "Scored twice after Russia’s early shock and powered Sweden’s response.",
      },
      {
        player: "Tomas Brolin",
        team: "Sweden",
        role: "Penalty and creation",
        description:
          "Levelled from the spot and linked Sweden’s attacks throughout.",
      },
      {
        player: "Oleg Salenko",
        team: "Russia",
        role: "Early threat",
        description:
          "Gave Russia a fourth-minute lead before Sweden’s comeback took hold.",
      },
    ],
  },
  "usa-1994-c22": {
    players: [
      {
        player: "Sami Al-Jaber",
        team: "Saudi Arabia",
        role: "Early penalty",
        description:
          "Settled Saudi Arabia with a composed early penalty against Morocco.",
      },
      {
        player: "Fuad Amin",
        team: "Saudi Arabia",
        role: "Second goal",
        description:
          "Added the second goal that put the result beyond Morocco before half-time.",
      },
      {
        player: "Mohammed Chaouch",
        team: "Morocco",
        role: "Reply",
        description:
          "Pulled Morocco level briefly and kept the contest alive into the first half.",
      },
    ],
  },
  "usa-1994-c25": {
    players: [
      {
        player: "Hristo Stoichkov",
        team: "Bulgaria",
        role: "Two-goal spearhead",
        description:
          "Opened the scoring and converted a penalty as Bulgaria dismantled Greece.",
      },
      {
        player: "Yordan Letchkov",
        team: "Bulgaria",
        role: "Midfield finisher",
        description:
          "Added the third goal and embodied Bulgaria’s growing belief.",
      },
      {
        player: "Daniel Borimirov",
        team: "Bulgaria",
        role: "Late seal",
        description: "Finished the scoring in stoppage time.",
      },
    ],
  },
  "usa-1994-c26": {
    players: [
      {
        player: "Hernán Gaviria",
        team: "Colombia",
        role: "Opener",
        description:
          "Gave Colombia a first-half lead that Switzerland never recovered from.",
      },
      {
        player: "Harold Lozano",
        team: "Colombia",
        role: "Late seal",
        description:
          "Added the second goal deep in stoppage time to confirm Colombia’s win.",
      },
      {
        player: "Óscar Córdoba",
        team: "Colombia",
        role: "Goalkeeper",
        description:
          "Protected Colombia’s advantage as Switzerland pressed for a way back.",
      },
    ],
  },
  "usa-1994-c28": {
    players: [
      {
        player: "Oleg Salenko",
        team: "Russia",
        role: "Five-goal record",
        description:
          "Scored five times in a single World Cup match, rewriting the tournament record books.",
      },
      {
        player: "Dmitri Radchenko",
        team: "Russia",
        role: "Sixth goal",
        description: "Completed Russia’s 6–1 rout with a late strike.",
      },
      {
        player: "Roger Milla",
        team: "Cameroon",
        role: "Historic reply",
        description:
          "Scored Cameroon’s consolation and became the World Cup’s oldest scorer.",
      },
    ],
  },
  "usa-1994-c29": {
    players: [
      {
        player: "Finidi George",
        team: "Nigeria",
        role: "Opener",
        description: "Broke the deadlock before half-time against Greece.",
      },
      {
        player: "Daniel Amokachi",
        team: "Nigeria",
        role: "Late seal",
        description: "Added the second goal late to confirm Nigeria’s progress.",
      },
    ],
  },
  "usa-1994-c31": {
    moments: [
      {
        title: "A crucial stalemate",
        description:
          "Ireland and Norway share a goalless draw that keeps both in the qualification conversation.",
      },
    ],
    players: [
      {
        player: "Packie Bonner",
        team: "Republic of Ireland",
        role: "Last line",
        description:
          "Helped Ireland secure a goalless draw that kept their knockout hopes alive.",
      },
      {
        player: "Erik Thorstvedt",
        team: "Norway",
        role: "Matching resolve",
        description:
          "Matched Ireland’s organisation as Norway chased a decisive opening.",
      },
    ],
  },
  "usa-1994-c32": {
    players: [
      {
        player: "Daniele Massaro",
        team: "Italy",
        role: "Opener",
        description: "Put Italy ahead early in the second half against Mexico.",
      },
      {
        player: "Marcelino Bernal",
        team: "Mexico",
        role: "Equaliser",
        description: "Answered quickly to earn Mexico a valuable point.",
      },
    ],
  },
  "usa-1994-c35": {
    players: [
      {
        player: "Dennis Bergkamp",
        team: "Netherlands",
        role: "Opener",
        description:
          "Opened the scoring and repeatedly threatened Morocco’s defence.",
      },
      {
        player: "Bryan Roy",
        team: "Netherlands",
        role: "Winner",
        description:
          "Struck the decisive second-half goal that settled the contest.",
      },
      {
        player: "Hassan Nader",
        team: "Morocco",
        role: "Equaliser",
        description:
          "Levelled after the interval and forced the Netherlands to respond.",
      },
    ],
  },
  "usa-1994-c36": {
    players: [
      {
        player: "Hristo Stoichkov",
        team: "Bulgaria",
        role: "Breakthrough",
        description:
          "Opened the scoring against Argentina and set Bulgaria on a famous path.",
      },
      {
        player: "Nasko Sirakov",
        team: "Bulgaria",
        role: "Late seal",
        description:
          "Added the second goal late to confirm a result that stunned Group D.",
      },
    ],
  },
};

const FRA_NONSTORY: Record<
  string,
  {
    score?: string;
    halftime?: string;
    goal?: string;
    report: string;
    moments: Moment[];
    players: Player[];
  }
> = {
  "france-1998-c05": {
    score: "Paraguay 0–0 Bulgaria",
    halftime: "Halftime: 0–0",
    goal: "No goals",
    report:
      "Paraguay and Bulgaria cancelled each other out in a cautious Group D meeting. Clear chances were scarce as Chilavert organised a firm Paraguayan line. The shared point left both sides still searching for a first tournament win.",
    moments: [
      {
        title: "Goalless stalemate",
        description: "Neither side broke the deadlock in Montpellier.",
      },
      {
        title: "Defences hold firm",
        description: "Set pieces and half-chances come to nothing.",
      },
    ],
    players: [
      {
        player: "José Luis Chilavert",
        team: "Paraguay",
        role: "Commanding goalkeeper",
        description:
          "Organised Paraguay’s defensive shape and kept Bulgaria at bay.",
      },
      {
        player: "Krasimir Balakov",
        team: "Bulgaria",
        role: "Creative spark",
        description:
          "Offered Bulgaria’s clearest invention without finding a finishing touch.",
      },
    ],
  },
  "france-1998-c03": {
    report:
      "Italy led through Vieri before Salas struck twice either side of half-time. Roberto Baggio’s late penalty rescued a point in Bordeaux. An absorbing Group B opener finished 2–2.",
    moments: [
      { minute: "10'", title: "Christian Vieri scores" },
      { minute: "45'", title: "Marcelo Salas equalises" },
      { minute: "50'", title: "Salas puts Chile ahead" },
      { minute: "85'", title: "Roberto Baggio converts a penalty" },
    ],
    players: [
      {
        player: "Marcelo Salas",
        team: "Chile",
        role: "Two-goal threat",
        description:
          "Scored twice to turn the match and announce Chile’s attacking quality.",
      },
      {
        player: "Roberto Baggio",
        team: "Italy",
        role: "Late rescue",
        description:
          "Kept his nerve from the spot to salvage a point for Italy.",
      },
      {
        player: "Christian Vieri",
        team: "Italy",
        role: "Early breakthrough",
        description: "Gave Italy a tenth-minute lead with a sharp finish.",
      },
    ],
  },
};

function applyPack(
  rows: CanonicalMatchEditorial[],
  pack: typeof USA_NONSTORY
): CanonicalMatchEditorial[] {
  return rows.map((row) => {
    const extra = pack[row.canonicalMatchId];
    if (!extra) return row;
    const goalMoments = parseGoalMoments(row.postMatch.goal);
    return {
      ...row,
      postMatch: {
        ...row.postMatch,
        matchReport: extra.report || row.postMatch.matchReport,
        keyMoments:
          extra.moments?.length
            ? extra.moments
            : goalMoments.length
              ? goalMoments
              : row.postMatch.keyMoments,
        playersWhoShapedTheMatch: extra.players,
      },
    };
  });
}

function applyFranceNonStory(
  rows: CanonicalMatchEditorial[]
): CanonicalMatchEditorial[] {
  return rows.map((row) => {
    const extra = FRA_NONSTORY[row.canonicalMatchId];
    if (!extra) return row;
    // Only fill gaps / replace generic reports
    const generic = /finished without a goal/.test(row.postMatch.matchReport);
    const missing =
      !row.postMatch.keyMoments?.length ||
      !row.postMatch.playersWhoShapedTheMatch?.length;
    if (!generic && !missing) return row;
    return {
      ...row,
      postMatch: {
        ...row.postMatch,
        score: extra.score || row.postMatch.score,
        halftime: extra.halftime || row.postMatch.halftime,
        goal: extra.goal || row.postMatch.goal,
        matchReport: extra.report,
        keyMoments: extra.moments,
        playersWhoShapedTheMatch: extra.players,
        archiveNote:
          row.postMatch.archiveNote ||
          "Score, scorers and major incidents cross-checked against RSSSF’s complete France ’98 match archive.",
        sources: row.postMatch.sources ?? ["RSSSF", "FIFA match records"],
      },
    };
  });
}

function assertComplete(rows: CanonicalMatchEditorial[], label: string) {
  const bad: string[] = [];
  for (const row of rows) {
    const p = row.preMatch;
    const po = row.postMatch;
    if (
      !p.sceneSetter?.trim() ||
      !p.aroundTheWorld?.trim() ||
      !p.inTheTournament?.trim() ||
      !p.whyItMatters?.trim() ||
      !po.score?.trim() ||
      !po.matchReport?.trim() ||
      !po.keyMoments?.length ||
      !po.playersWhoShapedTheMatch?.length ||
      /finished without a goal/.test(po.matchReport) ||
      /defining influence in a match shaped by fine margins/.test(
        JSON.stringify(po.playersWhoShapedTheMatch)
      ) ||
      /No information available|Both teams wanted to win/i.test(
        JSON.stringify(row)
      )
    ) {
      bad.push(row.canonicalMatchId);
    }
  }
  if (bad.length) {
    console.error(`${label} incomplete:`, bad);
    throw new Error(`${label}: ${bad.length} incomplete records`);
  }
  console.log(`${label}: ${rows.length} complete`);
}

let usa = mergeStory(
  usaEd as CanonicalMatchEditorial[],
  usaStory as StoryEp[],
  "usa-1994",
  "Score, scorers and major incidents cross-checked against RSSSF’s complete USA ’94 match archive."
);
usa = applyPack(usa, USA_NONSTORY);

let fra = mergeStory(
  fraEd as CanonicalMatchEditorial[],
  fraStory as StoryEp[],
  "france-1998",
  "Score, scorers and major incidents cross-checked against RSSSF’s complete France ’98 match archive."
);
fra = applyFranceNonStory(fra);

// Remaining France non-story IDs that still need player/moment enrichment
const FRA_EXTRA_PLAYERS: Record<string, Player[]> = {
  "france-1998-c04": [
    {
      player: "Tony Polster",
      team: "Austria",
      role: "Late equaliser",
      description: "Struck in stoppage time to rescue a point against Cameroon.",
    },
    {
      player: "Patrick Mboma",
      team: "Cameroon",
      role: "Opener",
      description: "Gave Cameroon the lead before Austria’s late reply.",
    },
  ],
  "france-1998-c06": [
    {
      player: "Christophe Dugarry",
      team: "France",
      role: "Opener",
      description: "Broke South African resistance in Marseille.",
    },
    {
      player: "Thierry Henry",
      team: "France",
      role: "Late seal",
      description: "Added a late third as France controlled the night.",
    },
  ],
  "france-1998-c07": [
    {
      player: "Luis Hernández",
      team: "Mexico",
      role: "Two-goal finisher",
      description: "Scored twice as Mexico pulled clear of South Korea.",
    },
    {
      player: "Ricardo Peláez",
      team: "Mexico",
      role: "Breakthrough",
      description: "Opened Mexico’s account after South Korea’s early lead.",
    },
  ],
  "france-1998-c10": [
    {
      player: "Siniša Mihajlović",
      team: "Yugoslavia",
      role: "Match winner",
      description: "Struck the decisive free-kick against Iran.",
    },
    {
      player: "Predrag Mijatović",
      team: "Yugoslavia",
      role: "Attacking threat",
      description: "Linked Yugoslavia’s forward play throughout.",
    },
  ],
  "france-1998-c12": [
    {
      player: "Gabriel Batistuta",
      team: "Argentina",
      role: "Match winner",
      description: "Scored the only goal against Japan in Toulouse.",
    },
    {
      player: "Juan Sebastián Verón",
      team: "Argentina",
      role: "Midfield control",
      description: "Dictated tempo as Argentina managed the contest.",
    },
  ],
  "france-1998-c13": [
    {
      player: "Adrian Ilie",
      team: "Romania",
      role: "Match winner",
      description: "Scored before half-time to defeat Colombia.",
    },
    {
      player: "Gheorghe Hagi",
      team: "Romania",
      role: "Creative lead",
      description: "Orchestrated Romania’s most dangerous passages.",
    },
  ],
  "france-1998-c14": [
    {
      player: "Alan Shearer",
      team: "England",
      role: "Opener",
      description: "Gave England the lead against Tunisia in Marseille.",
    },
    {
      player: "Paul Scholes",
      team: "England",
      role: "Late seal",
      description: "Added a second late to confirm the win.",
    },
  ],
  "france-1998-c16": [
    {
      player: "Håvard Flo",
      team: "Norway",
      role: "Opener",
      description: "Put Norway ahead against Scotland.",
    },
    {
      player: "Craig Burley",
      team: "Scotland",
      role: "Equaliser",
      description: "Levelled for Scotland in a hard-fought draw.",
    },
  ],
  "france-1998-c17": [
    {
      player: "Ronaldo",
      team: "Brazil",
      role: "Opener",
      description: "Broke the deadlock early against Morocco.",
    },
    {
      player: "Rivaldo",
      team: "Brazil",
      role: "Second goal",
      description: "Added a first-half second as Brazil took control.",
    },
    {
      player: "Bebeto",
      team: "Brazil",
      role: "Third goal",
      description: "Finished the scoring shortly after the interval.",
    },
  ],
  "france-1998-c18": [
    {
      player: "Marcelo Salas",
      team: "Chile",
      role: "Opener",
      description: "Put Chile ahead against Austria.",
    },
    {
      player: "Ivica Vastić",
      team: "Austria",
      role: "Late equaliser",
      description: "Rescued a point deep in stoppage time.",
    },
  ],
  "france-1998-c23": [
    {
      player: "Victor Ikpeba",
      team: "Nigeria",
      role: "Match winner",
      description: "Scored the only goal against Bulgaria in Paris.",
    },
    {
      player: "Jay-Jay Okocha",
      team: "Nigeria",
      role: "Creative spark",
      description: "Drove Nigeria’s transitions throughout.",
    },
  ],
  "france-1998-c24": [
    {
      player: "Phillip Cocu",
      team: "Netherlands",
      role: "Opener",
      description: "Started the Dutch rout of South Korea.",
    },
    {
      player: "Marc Overmars",
      team: "Netherlands",
      role: "Second goal",
      description: "Added a quick second as the Netherlands took command.",
    },
    {
      player: "Dennis Bergkamp",
      team: "Netherlands",
      role: "Third goal",
      description: "Emphasised Dutch superiority after the interval.",
    },
  ],
  "france-1998-c27": [
    {
      player: "Predrag Mijatović",
      team: "Yugoslavia",
      role: "Key scorer",
      description: "Helped Yugoslavia take the contest to Germany.",
    },
    {
      player: "Oliver Bierhoff",
      team: "Germany",
      role: "Aerial threat",
      description: "Occupied Yugoslavia’s defence throughout a tense draw.",
    },
  ],
  "france-1998-c30": [
    {
      player: "Léider Preciado",
      team: "Colombia",
      role: "Match winner",
      description: "Scored late to defeat Tunisia in Montpellier.",
    },
    {
      player: "Carlos Valderrama",
      team: "Colombia",
      role: "Playmaker",
      description: "Dictated Colombia’s midfield rhythm.",
    },
  ],
  "france-1998-c33": [
    {
      player: "Salaheddine Bassir",
      team: "Morocco",
      role: "Two-goal spearhead",
      description: "Scored twice as Morocco overwhelmed Scotland.",
    },
    {
      player: "Abdeljalil Hadda",
      team: "Morocco",
      role: "Second goal",
      description: "Added a rapid second to put the result beyond doubt.",
    },
  ],
  "france-1998-c37": [
    {
      player: "Benni McCarthy",
      team: "South Africa",
      role: "Equaliser",
      description: "Levelled for South Africa against Denmark.",
    },
    {
      player: "Allan Nielsen",
      team: "Denmark",
      role: "Opener",
      description: "Gave Denmark an early lead in Toulouse.",
    },
  ],
  "france-1998-c38": [
    {
      player: "José Cardozo",
      team: "Paraguay",
      role: "Late seal",
      description: "Completed Paraguay’s comeback win over Nigeria.",
    },
    {
      player: "Celso Ayala",
      team: "Paraguay",
      role: "Equaliser",
      description: "Helped turn the contest after Nigeria’s early lead.",
    },
  ],
  "france-1998-c39": [
    {
      player: "Fernando Morientes",
      team: "Spain",
      role: "Two-goal finisher",
      description: "Scored twice in Spain’s emphatic win over Bulgaria.",
    },
    {
      player: "Fernando Hierro",
      team: "Spain",
      role: "Early penalty",
      description: "Opened the scoring from the spot.",
    },
  ],
  "france-1998-c40": [
    {
      player: "Phillip Cocu",
      team: "Netherlands",
      role: "Opener",
      description: "Gave the Netherlands an early lead against Mexico.",
    },
    {
      player: "Luis Hernández",
      team: "Mexico",
      role: "Late equaliser",
      description: "Helped Mexico snatch a dramatic late point.",
    },
    {
      player: "Ronald de Boer",
      team: "Netherlands",
      role: "Late strike",
      description: "Thought he had won it before Mexico’s final reply.",
    },
  ],
  "france-1998-c41": [
    {
      player: "Luc Nilis",
      team: "Belgium",
      role: "Opener",
      description: "Put Belgium ahead early against South Korea.",
    },
    {
      player: "Yoo Sang-chul",
      team: "South Korea",
      role: "Equaliser",
      description: "Levelled for South Korea in Paris.",
    },
  ],
  "france-1998-c42": [
    {
      player: "Oliver Bierhoff",
      team: "Germany",
      role: "Opener",
      description: "Broke Iran’s resistance after the interval.",
    },
    {
      player: "Jürgen Klinsmann",
      team: "Germany",
      role: "Second goal",
      description: "Added a quick second to settle the contest.",
    },
  ],
  "france-1998-c43": [
    {
      player: "Slobodan Komljenović",
      team: "Yugoslavia",
      role: "Match winner",
      description: "Scored early to defeat the United States in Paris.",
    },
    {
      player: "Kasey Keller",
      team: "United States",
      role: "Busy goalkeeper",
      description: "Kept the United States competitive after the early setback.",
    },
  ],
  "france-1998-c45": [
    {
      player: "Viorel Moldovan",
      team: "Romania",
      role: "Opener",
      description: "Put Romania ahead against Tunisia.",
    },
    {
      player: "Skander Souayah",
      team: "Tunisia",
      role: "Penalty equaliser",
      description: "Answered almost immediately from the spot.",
    },
  ],
  "france-1998-c46": [
    {
      player: "Gabriel Batistuta",
      team: "Argentina",
      role: "Hat-trick",
      description: "Scored three times as Argentina overwhelmed Jamaica.",
    },
    {
      player: "Ariel Ortega",
      team: "Argentina",
      role: "Two-goal spark",
      description: "Opened the scoring twice in the first hour.",
    },
  ],
  "france-1998-c47": [
    {
      player: "Davor Šuker",
      team: "Croatia",
      role: "Match winner",
      description: "Scored the only goal against Japan in Nantes.",
    },
    {
      player: "Zvonimir Boban",
      team: "Croatia",
      role: "Midfield control",
      description: "Helped Croatia manage the contest after taking the lead.",
    },
  ],
  "france-1998-c50": [
    {
      player: "Ebbe Sand",
      team: "Denmark",
      role: "Match winner",
      description: "Scored the goal that defeated Saudi Arabia in Lens.",
    },
    {
      player: "Peter Schmeichel",
      team: "Denmark",
      role: "Commanding goalkeeper",
      description: "Protected Denmark’s narrow advantage.",
    },
  ],
};

fra = fra.map((row) => {
  const players = FRA_EXTRA_PLAYERS[row.canonicalMatchId];
  if (!players) return row;
  if ((row.postMatch.playersWhoShapedTheMatch?.length ?? 0) >= 2) return row;
  const goalMoments = parseGoalMoments(row.postMatch.goal);
  return {
    ...row,
    postMatch: {
      ...row.postMatch,
      keyMoments: goalMoments.length
        ? goalMoments
        : row.postMatch.keyMoments,
      playersWhoShapedTheMatch: players,
    },
  };
});

assertComplete(usa, "USA 1994");
assertComplete(fra, "France 1998");

writeFileSync(
  "data/editorial/usa-1994-matches.json",
  `${JSON.stringify(usa, null, 2)}\n`
);
writeFileSync(
  "data/editorial/france-1998-matches.json",
  `${JSON.stringify(fra, null, 2)}\n`
);

console.log("Wrote enriched editorial archives.");
console.log(
  "c02",
  usa.find((m) => m.canonicalMatchId === "usa-1994-c02")?.postMatch.score
);
console.log(
  "c64",
  fra.find((m) => m.canonicalMatchId === "france-1998-c64")?.postMatch.goal
);
