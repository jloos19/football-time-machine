import type { TournamentId } from "@/lib/archive/types";
import type { ExperienceEpisode } from "./episodes";
import type { ExperienceType, TeamJourneyMeta, TournamentExperience } from "./types";

export type JourneyAccent = "gold" | "blue" | "green" | "warm";

export type JourneyItemUnit = "chapter" | "moment" | "match";

export function journeyAccent(type: ExperienceType): JourneyAccent {
  switch (type) {
    case "story":
      return "gold";
    case "essentials":
      return "blue";
    case "complete":
      return "green";
    case "team":
      return "warm";
  }
}

export function journeyItemUnit(type: ExperienceType): JourneyItemUnit {
  switch (type) {
    case "story":
      return "chapter";
    case "essentials":
      return "moment";
    case "complete":
    case "team":
      return "match";
  }
}

export function formatItemIndex(n: number): string {
  return String(n).padStart(2, "0");
}

/** "Chapter 01" / "Moment 01" / "Match 01" */
export function journeyItemLabel(type: ExperienceType, n: number): string {
  const unit = journeyItemUnit(type);
  const index = formatItemIndex(n);
  switch (unit) {
    case "chapter":
      return `Chapter ${index}`;
    case "moment":
      return `Moment ${index}`;
    case "match":
      return `Match ${index}`;
  }
}

function unitNoun(unit: JourneyItemUnit, count: number): string {
  switch (unit) {
    case "chapter":
      return count === 1 ? "chapter" : "chapters";
    case "moment":
      return count === 1 ? "moment" : "moments";
    case "match":
      return count === 1 ? "match" : "matches";
  }
}

function unitTitle(unit: JourneyItemUnit): string {
  switch (unit) {
    case "chapter":
      return "Chapter";
    case "moment":
      return "Moment";
    case "match":
      return "Match";
  }
}

/**
 * Progress copy:
 * - before start: "0 of 32 chapters completed"
 * - in progress: "Chapter 1 of 32"
 * - complete: "Journey complete"
 */
export function journeyProgressLabel(args: {
  type: ExperienceType;
  completed: number;
  total: number;
  currentN?: number | null;
}): string {
  const { type, completed, total, currentN } = args;
  // Team campaigns never reveal totals or remaining length.
  if (type === "team") {
    if (total > 0 && completed >= total) return "Campaign complete";
    if (completed <= 0) return "Campaign progress";
    return "Journey begun";
  }
  if (total > 0 && completed >= total) return "Journey complete";
  const unit = journeyItemUnit(type);
  if (completed <= 0) {
    return `0 of ${total} ${unitNoun(unit, total)} completed`;
  }
  const n = currentN ?? completed + 1;
  return `${unitTitle(unit)} ${n} of ${total}`;
}

export function journeyEditorialIntro(
  experience: TournamentExperience,
  total: number
): string {
  const { tournamentId, type } = experience;
  const name =
    tournamentId === "usa-1994" ? "USA ’94" : "France ’98";

  switch (type) {
    case "story":
      return tournamentId === "usa-1994"
        ? `${numberWord(total)} carefully selected matches that recreate ${name} exactly as it unfolded. No spoilers. No hindsight. Experience the tournament as the world did.`
        : `${numberWord(total)} carefully selected matches that recreate ${name} exactly as it unfolded. No spoilers. No hindsight. Experience the tournament as the world did.`;
    case "essentials":
      return `The defining moments of ${name}. ${numberWord(total)} matches that capture the tournament without requiring every fixture.`;
    case "complete":
      return "The complete tournament exactly as it was played. Every match. Every date. Every step.";
    case "team":
      return experience.shortDescription;
  }
}

/** Spoiler-free longer hero body for a team campaign. */
export function teamJourneyEditorial(
  experience: TournamentExperience,
  teamName: string
): string {
  if (experience.type !== "team" || !experience.teamId) {
    return experience.shortDescription;
  }
  const copy = resolveTeamJourneyCopy(
    experience.tournamentId,
    experience.teamId,
    teamName
  );
  return copy.editorial;
}

function numberWord(n: number): string {
  const words: Record<number, string> = {
    16: "Sixteen",
    17: "Seventeen",
    32: "Thirty-two",
    36: "Thirty-six",
    52: "Fifty-two",
    64: "Sixty-four",
  };
  return words[n] ?? String(n);
}

export function journeyEyebrow(type: ExperienceType): string {
  switch (type) {
    case "story":
      return "The Story";
    case "essentials":
      return "The Essentials";
    case "complete":
      return "Every Match";
    case "team":
      return "Team Journey";
  }
}

export function journeyContentsCopy(type: ExperienceType): {
  kicker: string;
  title: string;
  lede: string;
} {
  switch (type) {
    case "story":
      return {
        kicker: "Contents",
        title: "The journey, chapter by chapter",
        lede: "Read down the page as the tournament unfolds. Future chapters stay visible — quietly waiting their turn.",
      };
    case "essentials":
      return {
        kicker: "Director’s cut",
        title: "The moments that define the summer",
        lede: "A shorter path through the tournament. Each moment chosen for what it reveals — never for what it spoils.",
      };
    case "complete":
      return {
        kicker: "Archive",
        title: "The tournament in full",
        lede: "Browse chronologically as the fixtures were played. An historical record, not a highlight reel.",
      };
    case "team":
      return {
        kicker: "The campaign",
        title: "One nation. One match at a time.",
        lede: "The campaign unfolds as it did for supporters — the next fixture revealed only when you are ready.",
      };
  }
}

export type StageGroup = {
  stage: string;
  episodes: ExperienceEpisode[];
};

const STAGE_ORDER = [
  "Group Stage",
  "Round of 16",
  "Quarter-final",
  "Semi-final",
  "Third-place",
  "Final",
] as const;

export function groupEpisodesByStage(
  episodes: ExperienceEpisode[]
): StageGroup[] {
  const buckets = new Map<string, ExperienceEpisode[]>();
  for (const ep of episodes) {
    const key = normalizeStageLabel(ep.stage);
    const list = buckets.get(key) ?? [];
    list.push(ep);
    buckets.set(key, list);
  }

  const ordered: StageGroup[] = [];
  for (const stage of STAGE_ORDER) {
    const list = buckets.get(stage);
    if (list?.length) ordered.push({ stage, episodes: list });
    buckets.delete(stage);
  }
  for (const [stage, list] of buckets) {
    if (list.length) ordered.push({ stage, episodes: list });
  }
  return ordered;
}

export function displayStageHeading(stage: string): string {
  switch (stage) {
    case "Quarter-final":
      return "Quarter-finals";
    case "Semi-final":
      return "Semi-finals";
    case "Third-place":
      return "Third place";
    default:
      return stage;
  }
}

function normalizeStageLabel(stage: string): string {
  if (stage === "Quarter-finals") return "Quarter-final";
  if (stage === "Semi-finals") return "Semi-final";
  if (stage === "Third Place" || stage === "Third-place play-off") {
    return "Third-place";
  }
  return stage;
}

type TeamJourneyCopy = {
  /** Short unique editorial — cards & hero lede. Never spoil progress. */
  shortDescription: string;
  /** Longer hero body. Never hint at finishing position or length. */
  editorial: string;
};

const USA_1994_TEAM_COPY: Record<string, TeamJourneyCopy> = {
  "united-states": {
    shortDescription:
      "Experience the tournament from the host nation’s perspective.",
    editorial:
      "See the tournament from the host nation’s perspective. One match at a time, exactly as supporters experienced it.",
  },
  brazil: {
    shortDescription:
      "Every tournament creates expectations. This is Brazil’s campaign, experienced exactly as it unfolded.",
    editorial:
      "Follow Brazil through every match of USA ’94. Experience the tournament entirely through one nation’s eyes.",
  },
  italy: {
    shortDescription: "Tradition, pressure and ninety minutes at a time.",
    editorial:
      "Follow Italy through USA ’94 one fixture at a time — tradition and pressure, never more than the next match.",
  },
  sweden: {
    shortDescription:
      "A composed campaign, watched without knowing where it leads.",
    editorial:
      "Follow Sweden through every match of USA ’94. The summer unfolds only as far as you watch.",
  },
  bulgaria: {
    shortDescription:
      "A quieter football nation steps onto the world’s brightest stage.",
    editorial:
      "Follow Bulgaria through USA ’94. One nation, one campaign, revealed a match at a time.",
  },
  romania: {
    shortDescription: "One nation. One campaign. One unforgettable summer.",
    editorial:
      "Follow Romania through every match of USA ’94. Experience the tournament entirely through one nation’s eyes.",
  },
  netherlands: {
    shortDescription:
      "Orange arrives in America. The campaign begins with the next kickoff.",
    editorial:
      "Follow the Netherlands through USA ’94. Each fixture appears only when the last is done.",
  },
  germany: {
    shortDescription:
      "Follow one of football’s traditional powers through every chapter of the tournament.",
    editorial:
      "Follow Germany through every match of USA ’94. Experience the tournament entirely through one nation’s eyes.",
  },
  spain: {
    shortDescription:
      "Expectation travels with them. The fixtures decide what comes next.",
    editorial:
      "Follow Spain through USA ’94 one match at a time — no hindsight, no map of what lies ahead.",
  },
};

const FRANCE_1998_TEAM_COPY: Record<string, TeamJourneyCopy> = {
  france: {
    shortDescription:
      "Experience the tournament from the host nation’s perspective.",
    editorial:
      "See France ’98 from the host nation’s perspective. One match at a time, exactly as supporters experienced it.",
  },
  brazil: {
    shortDescription:
      "Every tournament creates expectations. This is Brazil’s campaign, experienced exactly as it unfolded.",
    editorial:
      "Follow Brazil through every match of France ’98. Experience the tournament entirely through one nation’s eyes.",
  },
  croatia: {
    shortDescription:
      "A young football nation writes its first pages on the world stage.",
    editorial:
      "Follow Croatia through France ’98. The campaign reveals itself only as far as you watch.",
  },
  netherlands: {
    shortDescription:
      "Orange returns to the world’s stage — one fixture at a time.",
    editorial:
      "Follow the Netherlands through every match of France ’98. No map ahead. Only the next kickoff.",
  },
  italy: {
    shortDescription: "Tradition, pressure and ninety minutes at a time.",
    editorial:
      "Follow Italy through France ’98 one fixture at a time — tradition and pressure, never more than the next match.",
  },
  germany: {
    shortDescription:
      "Follow one of football’s traditional powers through every chapter of the tournament.",
    editorial:
      "Follow Germany through every match of France ’98. Experience the tournament entirely through one nation’s eyes.",
  },
  argentina: {
    shortDescription:
      "Ambition arrives with the opening whistle. The rest is still unwritten.",
    editorial:
      "Follow Argentina through France ’98. Each match appears only when you are ready for it.",
  },
  denmark: {
    shortDescription:
      "A composed side begins a summer without a settled script.",
    editorial:
      "Follow Denmark through every match of France ’98. One nation. One campaign. Revealed in order.",
  },
};

export function resolveTeamJourneyCopy(
  tournamentId: TournamentId,
  teamId: string,
  teamName: string
): TeamJourneyCopy {
  const map =
    tournamentId === "usa-1994" ? USA_1994_TEAM_COPY : FRANCE_1998_TEAM_COPY;
  return (
    map[teamId] ?? {
      shortDescription: `Follow ${teamName} through the tournament, one match at a time.`,
      editorial: `Follow ${teamName} through every match of the tournament. Experience it entirely through one nation’s eyes.`,
    }
  );
}

export function enrichTeamJourneyMeta(
  tournamentId: TournamentId,
  team: TeamJourneyMeta
): TeamJourneyMeta {
  const copy = resolveTeamJourneyCopy(
    tournamentId,
    team.teamId,
    team.teamName
  );
  return {
    ...team,
    title: team.teamName,
    shortDescription: copy.shortDescription,
    editorial: copy.editorial,
  };
}
