import { seasons } from "@/data/seasons";
import { worldCupPosters } from "@/data/worldCupPosters";
import type { TournamentId } from "@/lib/archive/types";
import {
  experienceProgress,
  getExperienceByRoute,
  resolveContinueCanonicalMatchId,
  resolveContinueWatchingExperience,
  resolveExperienceEpisodes,
  type ResumeHints,
  type TournamentExperience,
} from "@/lib/experiences";
import {
  hasEnteredExperience,
  isJourneyStarted,
  readCompletedCanonicalMatches,
  readLastViewedMatch,
  readStoryProgress,
} from "@/lib/progress";

export type HomeHeroCta = {
  kind: "begin" | "continue";
  label: string;
  detail: string;
  ariaLabel: string;
  tournamentId: TournamentId | null;
  experience: TournamentExperience | null;
};

export const DEFAULT_START_TOURNAMENT: TournamentId = "usa-1994";

function seasonName(tournamentId: TournamentId): string {
  return seasons.find((s) => s.id === tournamentId)?.name ?? tournamentId;
}

function readHomeResumeHints(tournamentId: TournamentId): ResumeHints {
  const enteredExperienceIds = new Set<string>();
  const lastViewedByExperienceId = new Map<string, string | null>();
  const candidates = [
    getExperienceByRoute(tournamentId, "story"),
    getExperienceByRoute(tournamentId, "essentials"),
    getExperienceByRoute(tournamentId, "every-match"),
  ].filter((exp): exp is TournamentExperience => Boolean(exp));

  for (const exp of candidates) {
    if (hasEnteredExperience(exp.id)) enteredExperienceIds.add(exp.id);
    lastViewedByExperienceId.set(exp.id, readLastViewedMatch(exp.id));
  }
  return { enteredExperienceIds, lastViewedByExperienceId };
}

/**
 * Deterministic homepage hero CTA for SSR + first client paint.
 * Continue Watching is only resolved after progress has hydrated.
 */
export function buildHomeHeroCta(args: {
  hasHydratedProgress: boolean;
  resume?: {
    tournamentId: TournamentId;
    experience: TournamentExperience;
    detail: string;
  } | null;
}): HomeHeroCta {
  if (args.hasHydratedProgress && args.resume) {
    return {
      kind: "continue",
      label: "Continue Watching",
      detail: args.resume.detail,
      ariaLabel: `Continue watching: ${args.resume.detail}`,
      tournamentId: args.resume.tournamentId,
      experience: args.resume.experience,
    };
  }

  const startName = seasonName(DEFAULT_START_TOURNAMENT);
  return {
    kind: "begin",
    label: "Begin Your Journey",
    detail: `Start with ${startName}`,
    ariaLabel: `Begin your journey. Start with ${startName}`,
    tournamentId: DEFAULT_START_TOURNAMENT,
    experience: null,
  };
}

/**
 * Progress line for hero continue context, e.g. "France ’98 · Match 12 of 36".
 * Uses Story membership when available so counts stay consistent with posters.
 */
export function formatHomeContinueDetail(
  tournamentId: TournamentId,
  experience: TournamentExperience,
  completed: ReadonlySet<string>,
  lastViewed: string | null
): string {
  const name = seasonName(tournamentId);
  const story =
    getExperienceByRoute(tournamentId, "story") ?? experience;
  const progress = experienceProgress(story, completed);
  const targetId = resolveContinueCanonicalMatchId(
    experience,
    completed,
    lastViewed
  );
  const eps = resolveExperienceEpisodes(story);
  const targetIndex = targetId
    ? eps.findIndex((ep) => ep.canonicalMatchId === targetId)
    : -1;
  const matchNumber =
    targetIndex >= 0
      ? targetIndex + 1
      : Math.min(progress.completed + 1, Math.max(progress.total, 1));

  return `${name} · Match ${matchNumber} of ${progress.total}`;
}

/**
 * Prefer the earliest started available tournament with an in-progress experience.
 * Storage reads happen only when called after hydration (inside useEffect).
 */
export function resolveHomeContinueResume(): {
  tournamentId: TournamentId;
  experience: TournamentExperience;
  detail: string;
} | null {
  for (const poster of worldCupPosters) {
    if (poster.status === "coming-soon") continue;
    if (
      poster.seasonId !== "usa-1994" &&
      poster.seasonId !== "france-1998" &&
      poster.seasonId !== "korea-japan-2002"
    ) {
      continue;
    }
    const tournamentId = poster.seasonId as TournamentId;
    if (!isJourneyStarted(tournamentId)) continue;

    const completed = readCompletedCanonicalMatches(tournamentId);
    const hints = readHomeResumeHints(tournamentId);
    const experience = resolveContinueWatchingExperience(
      tournamentId,
      completed,
      hints
    );
    if (!experience) {
      const story = getExperienceByRoute(tournamentId, "story");
      if (!story) continue;
      const storyProgress = readStoryProgress(tournamentId);
      if (storyProgress.completed <= 0 && !isJourneyStarted(tournamentId)) {
        continue;
      }
      const detail = formatHomeContinueDetail(
        tournamentId,
        story,
        completed,
        null
      );
      return { tournamentId, experience: story, detail };
    }

    const lastViewed =
      hints.lastViewedByExperienceId.get(experience.id) ?? null;
    const detail = formatHomeContinueDetail(
      tournamentId,
      experience,
      completed,
      lastViewed
    );
    return { tournamentId, experience, detail };
  }

  return null;
}

