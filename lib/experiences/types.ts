import type { TournamentId } from "@/lib/archive/types";

/** User-facing experience kinds for USA 1994 and France 1998. */
export type ExperienceType = "story" | "essentials" | "team" | "complete";

/**
 * Unlock policy for browsing matches within an experience.
 * - sequential: match N unlocks when N-1 is completed (Story, Essentials, Team)
 * - archive: group stage free; knockout spoiler-gated (Every Match)
 */
export type ExperienceUnlockMode = "sequential" | "archive";

export type TournamentExperience = {
  id: string;
  tournamentId: TournamentId;
  type: ExperienceType;
  title: string;
  shortDescription: string;
  canonicalMatchIds: string[];
  teamId?: string;
  unlockMode: ExperienceUnlockMode;
};

export type ExperienceOption = {
  type: ExperienceType;
  /** Stable route slug: story | essentials | every-match | team */
  slug: string;
  title: string;
  shortDescription: string;
  /** For type === "team", the picker lists teams instead of a single experience. */
  experienceId?: string;
};

export type TeamJourneyMeta = {
  teamId: string;
  teamName: string;
  /** Nation name used in nav / pickers / hero. */
  title: string;
  /**
   * Short spoiler-free editorial line for cards and hero lede.
   * Must never hint at finishing position or campaign length.
   */
  shortDescription?: string;
  /** Longer spoiler-free hero body. */
  editorial?: string;
};
