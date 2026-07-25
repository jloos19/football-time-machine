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
  replaySources: CanonicalReplaySource[];
  preferredSourceId?: string;
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
