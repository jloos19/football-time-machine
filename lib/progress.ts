import { seasons } from "@/data/seasons";
import { getExperience } from "@/lib/archive";
import type { TournamentId } from "@/lib/archive/types";
import {
  getTournamentExperience,
  getTournamentExperiences,
  type TournamentExperience,
} from "@/lib/experiences";

import {
  CURATED_JOURNEY_REVISION,
  FRANCE_1998_JOURNEY_REVISION_1_IDS,
  FRANCE_1998_JOURNEY_REVISION_2_IDS,
  FRANCE_1998_JOURNEY_REVISION_3_IDS,
  USA_1994_JOURNEY_REVISION_0_IDS,
} from "@/lib/replays/curated-journey";

const PROGRESS_PREFIX = "ftm-progress-";
const JOURNEY_PREFIX = "ftm-journey-entered-";
const JOURNEY_REVISION_PREFIX = "ftm-journey-revision-";
/** Shared completion store: canonical match IDs per tournament. */
const CANONICAL_PROGRESS_PREFIX = "ftm-completed-matches-";
const EXPERIENCE_ENTERED_PREFIX = "ftm-experience-entered-";
const LAST_VIEWED_PREFIX = "ftm-last-viewed-";
const CANONICAL_MIGRATION_FLAG = "ftm-canonical-progress-migrated-";

export function getSeasonMatchTotal(seasonId: string): number {
  return seasons.find((s) => s.id === seasonId)?.episodes.length ?? 0;
}

export function progressKey(seasonId: string) {
  return `${PROGRESS_PREFIX}${seasonId}`;
}

export function journeyKey(seasonId: string) {
  return `${JOURNEY_PREFIX}${seasonId}`;
}

function canonicalProgressKey(tournamentId: string) {
  return `${CANONICAL_PROGRESS_PREFIX}${tournamentId}`;
}

function experienceEnteredKey(experienceId: string) {
  return `${EXPERIENCE_ENTERED_PREFIX}${experienceId}`;
}

function lastViewedKey(experienceId: string) {
  return `${LAST_VIEWED_PREFIX}${experienceId}`;
}

function canonicalMigrationKey(tournamentId: string) {
  return `${CANONICAL_MIGRATION_FLAG}${tournamentId}`;
}

export function readProgress(seasonId: string): number {
  if (typeof window === "undefined") return 0;
  try {
    // Prefer shared canonical completion projected onto Story membership.
    if (
      seasonId === "usa-1994" ||
      seasonId === "france-1998" ||
      seasonId === "korea-japan-2002"
    ) {
      const completed = readCompletedCanonicalMatches(seasonId);
      const story = getExperience(seasonId, "journey");
      if (story) {
        return story.canonicalMatchIds.filter((id) => completed.has(id)).length;
      }
    }
    const saved = JSON.parse(localStorage.getItem(progressKey(seasonId)) || "[]");
    return Array.isArray(saved) ? saved.length : 0;
  } catch {
    return 0;
  }
}

export function hasEnteredJourney(seasonId: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(journeyKey(seasonId)) === "true";
}

export function isJourneyStarted(seasonId: string): boolean {
  return readProgress(seasonId) > 0 || hasEnteredJourney(seasonId);
}

export function markJourneyEntered(seasonId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(journeyKey(seasonId), "true");
}

export function hasEnteredExperience(experienceId: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(experienceEnteredKey(experienceId)) === "true";
}

export function markExperienceEntered(experienceId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(experienceEnteredKey(experienceId), "true");
}

export function readLastViewedMatch(experienceId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(lastViewedKey(experienceId));
}

export function writeLastViewedMatch(
  experienceId: string,
  canonicalMatchId: string
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(lastViewedKey(experienceId), canonicalMatchId);
}

function journeyRevisionKey(seasonId: string) {
  return `${JOURNEY_REVISION_PREFIX}${seasonId}`;
}

function readStoredProgress(seasonId: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey(seasonId)) || "[]");
    return Array.isArray(saved)
      ? saved.filter((value): value is number => typeof value === "number")
      : [];
  } catch {
    return [];
  }
}

function migrateProgressByCanonicalId(
  tournamentId: "usa-1994" | "france-1998",
  progress: number[],
  previousIds: readonly string[]
): number[] {
  const journey = getExperience(tournamentId, "journey");
  const currentIds = journey?.canonicalMatchIds ?? [];
  const currentSlotById = new Map(currentIds.map((id, index) => [id, index + 1]));

  const migrated = new Set<number>();
  for (const oldSlot of progress) {
    const canonicalMatchId = previousIds[oldSlot - 1];
    if (!canonicalMatchId) continue;
    const newSlot = currentSlotById.get(canonicalMatchId);
    // Only preserve completion when the same canonical match remains in the Journey.
    if (newSlot != null) {
      migrated.add(newSlot);
    }
  }

  return [...migrated].sort((a, b) => a - b);
}

function migrateFrance1998ProgressByCanonicalId(
  progress: number[],
  previousIds: readonly string[]
): number[] {
  return migrateProgressByCanonicalId("france-1998", progress, previousIds);
}

export function migrateJourneyProgress(seasonId: string): number[] {
  if (typeof window === "undefined") return [];

  const targetRevision = CURATED_JOURNEY_REVISION[seasonId] ?? 0;
  const storedRevision = Number.parseInt(
    localStorage.getItem(journeyRevisionKey(seasonId)) || "0",
    10
  );
  const progress = readStoredProgress(seasonId);

  if (storedRevision >= targetRevision) {
    return progress;
  }

  let nextProgress = progress;

  // USA '94 revision 1: rebuild Journey to the manually curated 32-match set.
  // Preserve completion only by exact canonical match ID (not Journey position).
  if (seasonId === "usa-1994" && storedRevision < 1 && targetRevision >= 1) {
    nextProgress = migrateProgressByCanonicalId(
      "usa-1994",
      nextProgress,
      USA_1994_JOURNEY_REVISION_0_IDS
    );
  }

  // France '98 revision 1: match 11 replaced Romania vs Colombia with Croatia vs Jamaica.
  // Curated slot n=11 is unchanged, so completed progress numbers remain valid.
  if (seasonId === "france-1998" && storedRevision < 1 && targetRevision >= 1) {
    nextProgress = progress;
  }

  // France '98 revision 2+: remap pre-FIFA-catalog slots by canonical match ID onto the
  // current Journey. Completions for matches that left the Journey are dropped.
  if (seasonId === "france-1998" && storedRevision < 2 && targetRevision >= 2) {
    nextProgress = migrateFrance1998ProgressByCanonicalId(
      nextProgress,
      FRANCE_1998_JOURNEY_REVISION_1_IDS
    );
  }

  // France '98 revision 3: Italy–Chile / Paraguay–Bulgaria leave Journey; Spain–Nigeria /
  // Germany–USA enter. Do not transfer completion across those substitutions.
  if (
    seasonId === "france-1998" &&
    storedRevision >= 2 &&
    storedRevision < 3 &&
    targetRevision >= 3
  ) {
    nextProgress = migrateFrance1998ProgressByCanonicalId(
      nextProgress,
      FRANCE_1998_JOURNEY_REVISION_2_IDS
    );
  }

  // France '98 revision 4: rebalance group-stage Journey membership (remove five FIFA
  // Collection matches; add five Dailymotion Complete Tournament matches). Preserve
  // completion only by exact canonical match ID.
  if (
    seasonId === "france-1998" &&
    storedRevision >= 3 &&
    storedRevision < 4 &&
    targetRevision >= 4
  ) {
    nextProgress = migrateFrance1998ProgressByCanonicalId(
      nextProgress,
      FRANCE_1998_JOURNEY_REVISION_3_IDS
    );
  }

  localStorage.setItem(journeyRevisionKey(seasonId), String(targetRevision));
  localStorage.setItem(progressKey(seasonId), JSON.stringify(nextProgress));

  return nextProgress;
}

function readRawCanonicalProgress(tournamentId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(
      localStorage.getItem(canonicalProgressKey(tournamentId)) || "[]"
    );
    return Array.isArray(saved)
      ? saved.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

/**
 * Migrate legacy Journey slot progress into the shared canonical completion store.
 * Journey revision migration runs first so slots map to the current Story IDs.
 */
export function ensureCanonicalProgressMigrated(tournamentId: TournamentId): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(canonicalMigrationKey(tournamentId)) === "1") {
    return;
  }

  const journeySlots = migrateJourneyProgress(tournamentId);
  const journeyIds = getExperience(tournamentId, "journey")?.canonicalMatchIds ?? [];
  const fromSlots = journeySlots
    .map((slot) => journeyIds[slot - 1])
    .filter((id): id is string => typeof id === "string");

  const existing = new Set(readRawCanonicalProgress(tournamentId));
  for (const id of fromSlots) existing.add(id);

  localStorage.setItem(
    canonicalProgressKey(tournamentId),
    JSON.stringify([...existing].sort())
  );
  localStorage.setItem(canonicalMigrationKey(tournamentId), "1");
}

export function readCompletedCanonicalMatches(
  tournamentId: TournamentId
): Set<string> {
  if (typeof window === "undefined") return new Set();
  ensureCanonicalProgressMigrated(tournamentId);
  return new Set(readRawCanonicalProgress(tournamentId));
}

export function writeCompletedCanonicalMatches(
  tournamentId: TournamentId,
  completed: ReadonlySet<string>
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    canonicalProgressKey(tournamentId),
    JSON.stringify([...completed].sort())
  );
  // Keep legacy Story slot progress in sync for any remaining consumers.
  syncLegacyJourneySlots(tournamentId, completed);
}

function syncLegacyJourneySlots(
  tournamentId: TournamentId,
  completed: ReadonlySet<string>
): void {
  const journeyIds = getExperience(tournamentId, "journey")?.canonicalMatchIds ?? [];
  const slots = journeyIds
    .map((id, index) => (completed.has(id) ? index + 1 : null))
    .filter((n): n is number => n != null);
  localStorage.setItem(progressKey(tournamentId), JSON.stringify(slots));
}

export function toggleCanonicalMatchComplete(
  tournamentId: TournamentId,
  canonicalMatchId: string
): Set<string> {
  const next = readCompletedCanonicalMatches(tournamentId);
  if (next.has(canonicalMatchId)) next.delete(canonicalMatchId);
  else next.add(canonicalMatchId);
  writeCompletedCanonicalMatches(tournamentId, next);
  return next;
}

export function experienceCompletionCount(
  experience: TournamentExperience,
  completed: ReadonlySet<string>
): number {
  return experience.canonicalMatchIds.filter((id) => completed.has(id)).length;
}

export function isExperienceStarted(
  experience: TournamentExperience,
  completed: ReadonlySet<string>
): boolean {
  return (
    hasEnteredExperience(experience.id) ||
    experienceCompletionCount(experience, completed) > 0
  );
}

/** Story progress for home posters — derived from shared canonical completion. */
export function readStoryProgress(tournamentId: TournamentId): {
  completed: number;
  total: number;
} {
  const story =
    getTournamentExperience(tournamentId, `${tournamentId}-story`) ??
    getTournamentExperiences(tournamentId).find((e) => e.type === "story");
  const total = story?.canonicalMatchIds.length ?? getSeasonMatchTotal(tournamentId);
  if (typeof window === "undefined") {
    return { completed: 0, total };
  }
  const completed = readCompletedCanonicalMatches(tournamentId);
  return {
    completed: story
      ? experienceCompletionCount(story, completed)
      : 0,
    total,
  };
}
