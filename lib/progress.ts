const PROGRESS_PREFIX = "ftm-progress-";
export const WORLD_CUP_MATCH_TOTAL = 52;

export function progressKey(seasonId: string) {
  return `${PROGRESS_PREFIX}${seasonId}`;
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
