import type { ReplayProvider } from "@/lib/replays/types";

export type ReplaySourceStatus =
  | "active"
  | "needs-review"
  | "private"
  | "dead"
  | "wrong-match";

export type TournamentId = "usa-1994" | "france-1998" | "korea-japan-2002";

export type ExperienceKind = "complete" | "journey" | "essential";

export type MatchStage =
  | "Group Stage"
  | "Round of 16"
  | "Quarter-final"
  | "Semi-final"
  | "Third-place play-off"
  | "Final";

export type HumanVerificationStatus = "untested" | "verified" | "failed";

export type HumanVerification = {
  status: HumanVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
};

export type AutomatedCheckStatus =
  | "unchecked"
  | "ok"
  | "needs-review"
  | "private"
  | "dead"
  | "error";

export type AutomatedCheck = {
  status: AutomatedCheckStatus;
  lastChecked: string;
  reason?: string;
  recheckRecommended?: boolean;
};

export type CanonicalReplaySource = {
  id: string;
  provider: ReplayProvider;
  url: string;
  status: ReplaySourceStatus;
  fullMatch: boolean;
  /** True for official provider libraries (e.g. FIFA full-match replays). */
  officialSource?: boolean;
  automatedCheck: AutomatedCheck;
  humanVerification: HumanVerification;
  notes?: string;
  continuationUrl?: string;
};

/** Distinguishes standard highlights from extended packages. */
export type HighlightPackageKind = "highlights" | "extended-highlights";

/**
 * Official highlights package for a match — stored separately from full-match
 * replaySources so provider selection for Full Match stays unchanged.
 */
export type CanonicalHighlightSource = {
  id: string;
  provider: ReplayProvider;
  url: string;
  status: ReplaySourceStatus;
  /** Standard highlights vs extended highlights (FIFA package length). */
  packageKind: HighlightPackageKind;
  /** True for official provider libraries (e.g. FIFA match highlights). */
  officialSource?: boolean;
  automatedCheck: AutomatedCheck;
  humanVerification: HumanVerification;
  notes?: string;
};

export type CanonicalMatch = {
  tournamentId: TournamentId;
  canonicalMatchId: string;
  officialMatchNumber?: number;
  chronologicalIndex: number;
  date: string;
  kickoffOrder: number;
  stage: MatchStage;
  group?: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  editorial?: {
    journeyEpisodeId?: string;
    journeySlot?: number;
    auditNote?: string;
    runtime?: string;
  };
  /** Full-match replay sources (FIFA, Dailymotion, etc.). */
  replaySources: CanonicalReplaySource[];
  preferredSourceId?: string;
  /** Official highlights sources — never used for Full Match selection. */
  highlightSources?: CanonicalHighlightSource[];
  preferredHighlightSourceId?: string;
  qaState?: {
    hasHumanVerifiedFullMatch: boolean;
    productionReady: boolean;
  };
};

export type ExperienceDefinition = {
  tournamentId: TournamentId;
  kind: ExperienceKind;
  label: string;
  canonicalMatchIds: string[];
};

export type CanonicalArchive = {
  tournamentId: TournamentId;
  matches: CanonicalMatch[];
  experiences: ExperienceDefinition[];
};

export function matchLabel(match: Pick<CanonicalMatch, "homeTeam" | "awayTeam">): string {
  return `${match.homeTeam} vs ${match.awayTeam}`;
}
