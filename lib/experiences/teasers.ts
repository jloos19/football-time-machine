import type { ExperienceEpisode } from "./episodes";

/**
 * One-line spoiler-free teasers for named story chapters.
 * Keyed by episode id when tournament-specific; title keys are shared fallbacks.
 * Never reveal results, scorers, or outcomes.
 */
const CURATED_TEASERS: Record<string, string> = {
  // USA ’94 — named group-stage chapters
  "usa-1994-01":
    "The World Cup arrives in America beneath enormous expectation.",
  "Opening Night":
    "The World Cup arrives beneath enormous expectation.",
  "Home Soil":
    "The hosts step onto the stage they have spent years preparing.",
  "Heavy Weather":
    "The summer begins shaping matches before tactics do.",
  "South American Arrival":
    "Familiar rivalries cross the Atlantic into unfamiliar stadiums.",
  Expectations:
    "Reputation travels ahead of the opening whistle.",
  "One Last Dance":
    "A generation arrives knowing the clock is already moving.",
  "Old Powers":
    "Established nations reopen accounts written across decades.",
  "New Arrivals":
    "Sides still introducing themselves find the world’s brightest lights.",
  "Pasadena Shock":
    "The Rose Bowl becomes a theatre of early tournament nerves.",
  "Shared Ambition":
    "Two campaigns press forward with little room to breathe.",
  Neighbors:
    "Proximity offers no comfort when the points are scarce.",
  "Speed and Nerve":
    "Tempo and courage begin to separate the field.",
  "The Hosts’ Horizon":
    "Home support watches a campaign find its true shape.",
  "Final Turn":
    "The group stage tightens as every result begins to matter twice.",
  "Nothing Assured":
    "Qualification remains a question until the last group evening.",

  // France ’98 — named chapters
  "france-1998-01":
    "France welcomes the world beneath a new tournament sky.",
  "First Evenings":
    "The tournament settles into its first nights across France.",
  "Orange and Red":
    "Colour and reputation arrive together on the same evening.",
  "Spanish Expectation":
    "A familiar power begins under the weight of its own name.",
  "Caribbean Meets the Balkans":
    "Distant football cultures share a pitch for the first time here.",
  "Continental Weight":
    "Europe’s heavier names begin to lean into the summer.",
  "Italian Authority":
    "Experience walks out as if the occasion already belongs to it.",
  "Southern Ambition":
    "Ambition from the south presses into a tournament still forming.",
  "Host Under Pressure":
    "Home support becomes another opponent to manage.",
  "Drawn Lines":
    "Early patterns start to harden inside unfinished groups.",
  "Iberian Pressure":
    "Pressure gathers where expectation has nowhere left to hide.",
  "Political Night":
    "The occasion carries more than ninety minutes can hold.",
  "First World Cup Nights":
    "Nations new to this stage take their first deep breath.",
  "Class of '98":
    "A generation announces itself without promising the ending.",
  "English Ambition":
    "An old football nation returns carrying fresh urgency.",
  "Group A Decider":
    "One group tightens toward a night that settles its order.",
  "Group B Decided":
    "The table waits for a final evening to write it down.",
  "Three Points Enough":
    "Qualification can be quiet — and still decisive.",
  "Hosts Unbeaten":
    "The home campaign keeps its clean sheet of possibility.",
  "Final Group G Night":
    "The last group evening asks who has done enough.",
};

const STAGE_TEASERS: Record<string, string> = {
  "Group Stage":
    "Another chapter in a group still writing its own ending.",
  "Round of 16":
    "The tournament narrows. One evening decides who continues.",
  "Quarter-final":
    "Eight remain. The margins grow thinner with every touch.",
  "Semi-final":
    "The final four gather. The air changes.",
  "Third-place":
    "One last fixture before the tournament closes its book.",
  Final:
    "The last match of the summer. Everything else has led here.",
};

function firstSentence(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^(.+?[.!?])(?:\s|$)/);
  return (match?.[1] ?? cleaned).trim();
}

function isSpoilerSafe(text: string): boolean {
  return !/\b(\d+\s*[-–]\s*\d+|pens?|penalty|won|lost|beat|defeat|champion|eliminat)/i.test(
    text
  );
}

/**
 * Spoiler-free one-line teaser for a journey item.
 * Prefer curated copy; otherwise a short editorial line from existing prose.
 */
export function episodeTeaser(
  episode: Pick<
    ExperienceEpisode,
    "id" | "title" | "stage" | "world" | "tournament" | "intro"
  >
): string {
  const curated =
    CURATED_TEASERS[episode.id] ?? CURATED_TEASERS[episode.title];
  if (curated) return curated;

  for (const source of [episode.world, episode.tournament, episode.intro]) {
    if (!source) continue;
    const sentence = firstSentence(source);
    if (
      sentence.length >= 28 &&
      sentence.length <= 120 &&
      isSpoilerSafe(sentence)
    ) {
      return sentence;
    }
  }

  return (
    STAGE_TEASERS[episode.stage] ??
    "The tournament continues — still without a settled script."
  );
}
