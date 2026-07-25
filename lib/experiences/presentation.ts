import type { ExperienceType, TournamentExperience } from "./types";
import type { ExperienceEpisode } from "./episodes";
import { experienceProgress } from "./unlock";

/** Approximate full-match watch time used for experience estimates. */
export const HOURS_PER_MATCH = 1.75;

export function estimateWatchHours(matchCount: number): number {
  if (matchCount <= 0) return 0;
  return Math.round(matchCount * HOURS_PER_MATCH * 10) / 10;
}

export function formatWatchTime(matchCount: number): string {
  const hours = estimateWatchHours(matchCount);
  if (hours <= 0) return "—";
  if (hours < 1) return "Under 1 hr";
  if (Number.isInteger(hours)) return `~${hours} hr`;
  return `~${hours} hrs`;
}

export function experienceActionLabel(progress: {
  completed: number;
  total: number;
}): "Start" | "Continue" | "Review" {
  if (progress.total > 0 && progress.completed >= progress.total) return "Review";
  if (progress.completed > 0) return "Continue";
  return "Start";
}

export function matchActionLabel(args: {
  done: boolean;
  isNext: boolean;
  unlocked: boolean;
  startedExperience: boolean;
}): "Start" | "Continue" | "Rewatch" | "Locked" {
  if (!args.unlocked) return "Locked";
  if (args.done) return "Rewatch";
  if (args.isNext && args.startedExperience) return "Continue";
  return "Start";
}

export type ExperienceVisualVariant =
  | "story"
  | "essentials"
  | "team"
  | "complete";

export function experienceVisualVariant(
  type: ExperienceType
): ExperienceVisualVariant {
  return type;
}

export function experienceEyebrow(type: ExperienceType): string {
  switch (type) {
    case "story":
      return "Recommended first";
    case "essentials":
      return "A shorter cut";
    case "team":
      return "A national campaign";
    case "complete":
      return "The complete archive";
  }
}

/** Single editorial line of match scale — not a dashboard stat strip. */
export function experienceScaleLabel(matchCount: number): string {
  if (matchCount <= 0) return "";
  const watch = formatWatchTime(matchCount);
  const matchesLabel = matchCount === 1 ? "1 match" : `${matchCount} matches`;
  return watch === "—" ? matchesLabel : `${matchesLabel} · ${watch}`;
}

export type SpoilerSafeMatchView = {
  title: string;
  matchLabel: string;
  dateLabel: string;
  stageLabel: string;
  classified: boolean;
};

/**
 * Spoiler-safe labels for locked knockout fixtures.
 * Never includes scores or outcomes.
 */
export function spoilerSafeMatchView(
  episode: Pick<ExperienceEpisode, "title" | "match" | "date" | "stage">,
  args: { unlocked: boolean; hideKnockoutSpoilers: boolean }
): SpoilerSafeMatchView {
  const classified =
    !args.unlocked &&
    args.hideKnockoutSpoilers &&
    episode.stage !== "Group Stage";

  if (classified) {
    return {
      title: "Classified",
      matchLabel: "Fixture hidden until unlocked",
      dateLabel: "Unlock to reveal",
      stageLabel: episode.stage === "Group Stage" ? "Group Stage" : "Knockout",
      classified: true,
    };
  }

  return {
    title: episode.title,
    matchLabel: episode.match,
    dateLabel: episode.date,
    stageLabel: episode.stage,
    classified: false,
  };
}

export type WatchedFilter = "all" | "watched" | "unwatched";

export type EveryMatchFilters = {
  query: string;
  stage: string;
  group: string;
  team: string;
  watched: WatchedFilter;
};

export const EMPTY_EVERY_MATCH_FILTERS: EveryMatchFilters = {
  query: "",
  stage: "all",
  group: "all",
  team: "all",
  watched: "all",
};

export function filterEveryMatchEpisodes(
  episodes: ExperienceEpisode[],
  filters: EveryMatchFilters,
  completedCanonicalIds: ReadonlySet<string>,
  metaById: ReadonlyMap<
    string,
    { homeTeam: string; awayTeam: string; group?: string }
  >
): ExperienceEpisode[] {
  const q = filters.query.trim().toLowerCase();

  return episodes.filter((ep) => {
    const meta = metaById.get(ep.canonicalMatchId);
    const done = completedCanonicalIds.has(ep.canonicalMatchId);

    if (filters.watched === "watched" && !done) return false;
    if (filters.watched === "unwatched" && done) return false;

    if (filters.stage !== "all" && ep.stage !== filters.stage) return false;

    if (filters.group !== "all") {
      const group = meta?.group ?? "";
      if (group !== filters.group) return false;
    }

    if (filters.team !== "all") {
      const home = meta?.homeTeam ?? "";
      const away = meta?.awayTeam ?? "";
      if (home !== filters.team && away !== filters.team) return false;
    }

    if (q) {
      const haystack = [
        ep.title,
        ep.match,
        ep.stage,
        ep.date,
        ep.city,
        meta?.homeTeam,
        meta?.awayTeam,
        meta?.group,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function overallTournamentProgress(
  experience: TournamentExperience | null,
  completedCanonicalIds: ReadonlySet<string>
): { completed: number; total: number; percent: number } {
  if (!experience) return { completed: 0, total: 0, percent: 0 };
  return experienceProgress(experience, completedCanonicalIds);
}

export function splitMatchTeams(matchLabel: string): {
  home: string;
  away: string;
} {
  const parts = matchLabel.split(/\s+vs\s+/i);
  if (parts.length === 2) {
    return { home: parts[0]!.trim(), away: parts[1]!.trim() };
  }
  return { home: matchLabel, away: "" };
}

/** Back-link copy from a Team Journey to its tournament homepage. */
export function tournamentHomeBackLabel(tournamentDisplayName: string): string {
  return `Back to ${tournamentDisplayName}`;
}
