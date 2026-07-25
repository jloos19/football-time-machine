import type { TournamentId } from "@/lib/archive/types";
import {
  experienceProgress,
  resolveContinueCanonicalMatchId,
} from "./unlock";
import { getExperienceByRoute, getSupportedTeamJourneys } from "./registry";
import type { TournamentExperience } from "./types";
import { resolveExperienceEpisodes } from "./episodes";

export type ResumeHints = {
  enteredExperienceIds: ReadonlySet<string>;
  lastViewedByExperienceId: ReadonlyMap<string, string | null>;
};

export type TournamentHeroAction = {
  label: string;
  detail: string;
  /** Optional secondary line under the match (Continue Journey meta). */
  meta?: string;
  ariaLabel: string;
  kind: "explore" | "continue";
};

export type ContinueWatchingDetail = {
  /** Match name, e.g. "United States vs Switzerland". */
  matchLabel: string;
  /** Progress + journey, e.g. "Match 2 of 5 • United States Path". */
  meta: string;
};

/** Journey name shown in the resume meta line. */
export function resumeJourneyName(experience: TournamentExperience): string {
  if (experience.type === "team") {
    const team = getSupportedTeamJourneys(experience.tournamentId).find(
      (row) => row.teamId === experience.teamId
    );
    return team ? `${team.teamName} Path` : experience.title;
  }
  if (experience.type === "complete") return "Complete Tournament";
  return experience.title;
}

/** Ordered experiences used for Continue Watching preference. */
export function listContinueCandidateExperiences(
  tournamentId: TournamentId
): TournamentExperience[] {
  const ordered: TournamentExperience[] = [];
  const story = getExperienceByRoute(tournamentId, "story");
  const essentials = getExperienceByRoute(tournamentId, "essentials");
  const complete = getExperienceByRoute(tournamentId, "every-match");
  if (story) ordered.push(story);
  if (essentials) ordered.push(essentials);
  for (const team of getSupportedTeamJourneys(tournamentId)) {
    const exp = getExperienceByRoute(tournamentId, "team", team.teamId);
    if (exp) ordered.push(exp);
  }
  if (complete) ordered.push(complete);
  return ordered;
}

/**
 * Prefer an in-progress experience for the tournament hero Continue Watching CTA.
 * Uses only the provided resume hints — never reads browser storage.
 */
export function resolveContinueWatchingExperience(
  tournamentId: TournamentId,
  completedCanonicalIds: ReadonlySet<string>,
  hints: ResumeHints
): TournamentExperience | null {
  const ordered = listContinueCandidateExperiences(tournamentId);

  const withProgress = ordered.filter((exp) => {
    const progress = experienceProgress(exp, completedCanonicalIds);
    return (
      progress.completed > 0 ||
      hints.enteredExperienceIds.has(exp.id) ||
      Boolean(hints.lastViewedByExperienceId.get(exp.id))
    );
  });

  if (withProgress.length === 0) return null;

  const incomplete = withProgress.find((exp) => {
    const progress = experienceProgress(exp, completedCanonicalIds);
    return progress.completed < progress.total;
  });
  return incomplete ?? withProgress[0] ?? null;
}

export function continueWatchingDetail(
  experience: TournamentExperience,
  completedCanonicalIds: ReadonlySet<string>,
  lastViewedCanonicalMatchId: string | null
): ContinueWatchingDetail {
  const targetId = resolveContinueCanonicalMatchId(
    experience,
    completedCanonicalIds,
    lastViewedCanonicalMatchId
  );
  const eps = resolveExperienceEpisodes(experience);
  const epIndex = targetId
    ? eps.findIndex((row) => row.canonicalMatchId === targetId)
    : -1;
  const ep = epIndex >= 0 ? eps[epIndex]! : null;
  const progress = experienceProgress(experience, completedCanonicalIds);
  const matchNumber =
    epIndex >= 0
      ? epIndex + 1
      : Math.min(progress.completed + 1, Math.max(progress.total, 1));
  const journey = resumeJourneyName(experience);
  const matchLabel = ep?.match ?? experience.title;
  return {
    matchLabel,
    meta: `Match ${matchNumber} of ${progress.total} • ${journey}`,
  };
}

/**
 * Deterministic hero CTA for SSR + the client's first paint.
 * Continue Watching is only resolved after progress has hydrated from storage.
 */
export function buildTournamentHeroAction(args: {
  hasHydratedProgress: boolean;
  seasonName: string;
  defaultStory: TournamentExperience | null;
  continueExperience: TournamentExperience | null;
  continueDetail: ContinueWatchingDetail | null;
  continueLabel: string;
}): TournamentHeroAction {
  if (
    args.hasHydratedProgress &&
    args.continueExperience &&
    args.continueDetail
  ) {
    const { matchLabel, meta } = args.continueDetail;
    return {
      kind: "continue",
      label: args.continueLabel,
      detail: matchLabel,
      meta,
      ariaLabel: `Continue Journey: ${matchLabel} · ${meta}`,
    };
  }

  const storyTitle = args.defaultStory?.title ?? "The Story";
  return {
    kind: "explore",
    label: "Explore tournament",
    detail: storyTitle,
    ariaLabel: `Explore ${args.seasonName}`,
  };
}

export const EMPTY_RESUME_HINTS: ResumeHints = {
  enteredExperienceIds: new Set(),
  lastViewedByExperienceId: new Map(),
};
