/**
 * USA 1994 Journey (The Story) membership — editorial data, not UI logic.
 * Chronological order is applied when resolving against the canonical archive.
 */
export {
  USA_1994_JOURNEY_GROUP_STAGE,
  USA_1994_JOURNEY_KNOCKOUT,
  USA_1994_JOURNEY_MEMBERSHIP,
} from "@/lib/archive/usa1994-replay-catalog";

export const USA_1994_STORY = {
  tournamentId: "usa-1994" as const,
  kind: "journey" as const,
  type: "story" as const,
  label: "The Story",
  status: "available" as const,
  targetCount: 32,
};
