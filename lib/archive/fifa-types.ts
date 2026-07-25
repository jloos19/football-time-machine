import type { MatchStage, TournamentId } from "./types";

export type FifaDiscoveryStatus =
  | "fifa-candidate-found"
  | "no-indexed-fifa-candidate"
  | "discovery-error"
  | "manual-search-required"
  | "human-verified"
  | "human-rejected";

export type FifaDiscoveryMethod =
  | "archive-library"
  | "search-result"
  | "showcase-crawl"
  | "page-metadata"
  | "manual-url"
  | "seed-catalog";

export type FifaMetadataSource =
  | "archive-match"
  | "http-fetch"
  | "url-slug"
  | "manual"
  | "showcase-listing";

export type FifaHumanVerification = {
  status: "untested" | "verified" | "rejected";
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
};

export type FifaArchiveIndexItem = {
  /** fifa.com/en/watch/{id} content id */
  fifaContentId?: string;
  /** plus.fifa.com content UUID */
  uuid?: string;
  canonicalUrl: string;
  alternateLocaleUrls?: string[];
  title: string;
  tournament: string;
  tournamentYear: number;
  homeTeam: string;
  awayTeam: string;
  stage: MatchStage | string;
  durationSeconds?: number;
  fullMatchReplay: boolean;
  discoveredAt: string;
  discoveryMethod: FifaDiscoveryMethod;
  metadataSource: FifaMetadataSource;
  humanVerification: FifaHumanVerification;
  /** Optional link back to canonical match when known from archive */
  canonicalMatchId?: string;
  confidenceNotes?: string;
};

export type FifaArchiveIndex = {
  version: 1;
  generatedAt: string;
  items: FifaArchiveIndexItem[];
};

export type FifaMatchCandidate = {
  indexItem: FifaArchiveIndexItem;
  confidence: number;
  matchReasons: string[];
};

export type FifaMatchQuery = {
  tournamentId: TournamentId;
  canonicalMatchId: string;
  homeTeam: string;
  awayTeam: string;
  stage: MatchStage;
  tournamentYear: number;
};
