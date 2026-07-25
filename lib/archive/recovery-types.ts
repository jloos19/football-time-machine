import type { ReplayProvider } from "@/lib/replays/types";
import type { FifaDiscoveryStatus } from "./fifa-types";
import type { MatchStage, TournamentId } from "./types";

export type CandidateStatus =
  | "discovered"
  | "metadata-valid"
  | "needs-human-review"
  | "rejected"
  | "promoted";

export type RecoveryHumanVerificationStatus = "untested" | "verified" | "failed";

export type RecoveryHumanVerification = {
  status: RecoveryHumanVerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
};

export type RecoveryCandidateValidation = {
  validatedAt: string;
  domainOk: boolean;
  pageResponded: boolean;
  privacyStatus?: string;
  embeddable?: boolean;
  uploadStatus?: string;
  durationSeconds?: number;
  private?: boolean;
  published?: boolean;
  availability?: string;
  geoblocking?: string;
  rejectionReasons: string[];
  requiresHumanPlayback: boolean;
};

export type RecoveryCandidate = {
  candidateId: string;
  tournamentId: TournamentId;
  canonicalMatchId: string;
  sourceId?: string;
  provider: ReplayProvider;
  url: string;
  discoveredBy: string;
  discoveredAt: string;
  title?: string;
  uploader?: string;
  durationSeconds?: number;
  officialSource: boolean;
  publicAvailability?: string;
  embeddable?: boolean;
  candidateStatus: CandidateStatus;
  rejectionReason?: string;
  humanVerification: RecoveryHumanVerification;
  notes?: string;
  validation?: RecoveryCandidateValidation;
};

export type RecoveryFailedSource = {
  id: string;
  provider: ReplayProvider;
  url: string;
  status: string;
  humanStatus: string;
  failureReason: string;
};

export type RecoveryQueueEntry = {
  tournamentId: TournamentId;
  canonicalMatchId: string;
  teams: string;
  homeTeam: string;
  awayTeam: string;
  stage: MatchStage;
  importance: "group" | "knockout";
  failedSource: RecoveryFailedSource | null;
  searchQueries: string[];
  fifaSearchQueries?: string[];
  fifaDiscoveryStatus?: FifaDiscoveryStatus;
  fifaMatchConfidence?: number;
};

export type RecoveryCandidatesStore = {
  version: 1;
  generatedAt: string;
  target: {
    tournamentId: TournamentId;
    experience: "journey";
    label: string;
  };
  queue: RecoveryQueueEntry[];
  candidates: RecoveryCandidate[];
};

export type RecoveryRejectReason =
  | "wrong-match"
  | "highlights-only"
  | "deleted"
  | "private"
  | "geo-blocked"
  | "rejected";
