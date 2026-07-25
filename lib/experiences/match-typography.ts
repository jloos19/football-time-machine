/**
 * Shared Match-page typography classes.
 * One system for every tournament and experience type.
 */
export const MATCH_TYPE = {
  /** Major page / section headings (serif) */
  heading: "match-type-heading",
  /** Narrative body copy (serif) */
  body: "match-type-body",
  /** Interface metadata: dates, venues, stage labels (sans) */
  meta: "match-type-meta",
  /** Small uppercase labels / FULL TIME / NEXT CHAPTER (sans) */
  eyebrow: "match-type-eyebrow",
  /** Player display names (serif) */
  playerName: "match-type-player-name",
  /** Nation · role labels (sans uppercase) */
  playerRole: "match-type-player-role",
  /** Standings and structured table text (sans) */
  table: "match-type-table",
  /** Watch / complete / prev / close action chrome (sans) */
  action: "match-type-action",
  actionPrimary: "match-type-action match-type-action--primary",
  actionSecondary: "match-type-action match-type-action--secondary",
} as const;

export type MatchTypeClass = (typeof MATCH_TYPE)[keyof typeof MATCH_TYPE];

/** Editorial sections that must share one body style. */
export const MATCH_EDITORIAL_SECTIONS = [
  "Scene setter",
  "Around the world",
  "In the tournament",
  "Why this match matters",
] as const;
