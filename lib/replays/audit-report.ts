import type { ReplayProvider, ReplaySourceStatus } from "./types";

export type ReplayAuditResult =
  | "ok"
  | "needs-review"
  | "private"
  | "dead"
  | "error";

export type ReplayAuditSourceRow = {
  tournament: string;
  tournamentId: string;
  episodeId: string;
  canonicalMatchId?: string;
  matchNumber: number;
  teams: string;
  provider: ReplayProvider;
  url: string;
  previousStatus: ReplaySourceStatus;
  previousVerified: boolean;
  auditResult: ReplayAuditResult;
  recommendedStatus: ReplaySourceStatus;
  recommendedVerified: boolean;
  reason: string;
  lastChecked: string;
};

export type TournamentAuditSummary = {
  verified: number;
  needsReview: number;
  private: number;
  dead: number;
  noVerifiedReplay: number;
};

export type ReplayAuditMatchRow = {
  tournament: string;
  tournamentId: string;
  episodeId: string;
  canonicalMatchId?: string;
  matchNumber: number;
  teams: string;
  hasVerifiedReplay: boolean;
  preferredProvider: ReplayProvider | null;
};

export type CuratedJourneyAuditExclusion = {
  tournament: string;
  tournamentId: string;
  match: string;
  date: string;
  originalEpisodeId: string;
  originalMatchNumber: number;
  reason: string;
  replacedByEpisodeId: string;
  replacedByMatch: string;
};

export type ReplayAuditReport = {
  generatedAt: string;
  summary: {
    totalSourcesChecked: number;
    brokenDailymotion: number;
    "usa-1994": TournamentAuditSummary;
    "france-1998": TournamentAuditSummary;
  };
  sources: ReplayAuditSourceRow[];
  matches: ReplayAuditMatchRow[];
  curatedExclusions: CuratedJourneyAuditExclusion[];
};
