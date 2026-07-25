import { getCanonicalArchive } from "@/lib/archive";
import type { TournamentExperience } from "./types";

/**
 * Whether a match at `index` is unlocked given completed canonical IDs.
 */
export function isExperienceMatchUnlocked(
  experience: TournamentExperience,
  index: number,
  completedCanonicalIds: ReadonlySet<string>
): boolean {
  const ids = experience.canonicalMatchIds;
  if (index < 0 || index >= ids.length) return false;

  if (experience.unlockMode === "sequential") {
    if (index === 0) return true;
    return completedCanonicalIds.has(ids[index - 1]!);
  }

  // Archive / Every Match: group stage free; knockout spoiler-gated.
  const matches = getCanonicalArchive(experience.tournamentId);
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, m]));
  const current = byId.get(ids[index]!);
  if (!current) return false;

  if (current.stage === "Group Stage") {
    return true;
  }

  const groupIds = ids.filter((id) => byId.get(id)?.stage === "Group Stage");
  const allGroupsComplete = groupIds.every((id) => completedCanonicalIds.has(id));
  if (!allGroupsComplete) {
    return false;
  }

  const knockoutIndexes = ids
    .map((id, i) => ({ id, i, stage: byId.get(id)?.stage }))
    .filter((row) => row.stage && row.stage !== "Group Stage");

  const knockoutPos = knockoutIndexes.findIndex((row) => row.i === index);
  if (knockoutPos < 0) return false;
  if (knockoutPos === 0) return true;
  const prevKnockoutId = knockoutIndexes[knockoutPos - 1]!.id;
  return completedCanonicalIds.has(prevKnockoutId);
}

export function firstIncompleteUnlockedIndex(
  experience: TournamentExperience,
  completedCanonicalIds: ReadonlySet<string>
): number | null {
  for (let i = 0; i < experience.canonicalMatchIds.length; i++) {
    const id = experience.canonicalMatchIds[i]!;
    if (completedCanonicalIds.has(id)) continue;
    if (isExperienceMatchUnlocked(experience, i, completedCanonicalIds)) {
      return i;
    }
  }
  return null;
}

/**
 * Continue target:
 * 1. last viewed incomplete match in this experience (when still unlocked)
 * 2. else first incomplete unlocked match
 * 3. else final match (completed summary)
 */
export function resolveContinueCanonicalMatchId(
  experience: TournamentExperience,
  completedCanonicalIds: ReadonlySet<string>,
  lastViewedCanonicalMatchId: string | null
): string | null {
  const ids = experience.canonicalMatchIds;
  if (ids.length === 0) return null;

  if (lastViewedCanonicalMatchId) {
    const idx = ids.indexOf(lastViewedCanonicalMatchId);
    if (
      idx >= 0 &&
      !completedCanonicalIds.has(lastViewedCanonicalMatchId) &&
      isExperienceMatchUnlocked(experience, idx, completedCanonicalIds)
    ) {
      return lastViewedCanonicalMatchId;
    }
  }

  const nextIdx = firstIncompleteUnlockedIndex(experience, completedCanonicalIds);
  if (nextIdx != null) {
    return ids[nextIdx]!;
  }

  return ids[ids.length - 1]!;
}

export function experienceProgress(
  experience: TournamentExperience,
  completedCanonicalIds: ReadonlySet<string>
): { completed: number; total: number; percent: number } {
  const total = experience.canonicalMatchIds.length;
  const completed = experience.canonicalMatchIds.filter((id) =>
    completedCanonicalIds.has(id)
  ).length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
