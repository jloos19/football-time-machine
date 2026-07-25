export type ReplayProvider =
  | "FIFA"
  | "Official broadcaster"
  | "Dailymotion"
  | "YouTube";

export type ReplaySourceStatus =
  | "active"
  | "needs-review"
  | "private"
  | "dead"
  | "wrong-match";

export type HumanVerificationStatus = "untested" | "verified" | "failed";

export type HumanVerification = {
  status: HumanVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
};

export type AutomatedCheck = {
  status:
    | "unchecked"
    | "ok"
    | "needs-review"
    | "private"
    | "dead"
    | "error";
  lastChecked: string;
  reason?: string;
  recheckRecommended?: boolean;
};

/** @deprecated Legacy shape — replay data now lives in lib/archive. */
export type ReplaySource = {
  provider: ReplayProvider;
  url: string;
  verified: boolean;
  fullMatch: boolean;
  status: ReplaySourceStatus;
  lastChecked: string;
  notes?: string;
  continuationUrl?: string;
  humanVerification?: HumanVerification;
  automatedCheck?: AutomatedCheck;
};

/** @deprecated Legacy shape — use CanonicalMatch from lib/archive. */
export type MatchReplayEntry = {
  match: string;
  runtime?: string;
  preferredSource?: ReplayProvider;
  sources: ReplaySource[];
  auditNote?: string;
};

/** @deprecated Legacy shape — replay data now lives in lib/archive. */
export type MatchReplayLibrary = Record<string, MatchReplayEntry>;

export type {
  CanonicalMatch,
  CanonicalReplaySource,
  ExperienceDefinition,
  ExperienceKind,
  TournamentId,
} from "@/lib/archive/types";
