import { seasons } from "@/data/seasons";

const PROGRESS_PREFIX = "ftm-progress-";
const JOURNEY_PREFIX = "ftm-journey-entered-";

export function getSeasonMatchTotal(seasonId: string): number {
  return seasons.find((s) => s.id === seasonId)?.episodes.length ?? 0;
}

export function progressKey(seasonId: string) {
  return `${PROGRESS_PREFIX}${seasonId}`;
}

export function journeyKey(seasonId: string) {
  return `${JOURNEY_PREFIX}${seasonId}`;
}

export function readProgress(seasonId: string): number {
  if (typeof window === "undefined") return 0;
  try {
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
