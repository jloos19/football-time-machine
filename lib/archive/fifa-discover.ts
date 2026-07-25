import {
  buildFifaArchiveIndex,
  findBestFifaIndexMatch,
  findBestFifaIndexMatches,
  toFifaMatchQuery,
} from "./fifa-index";
import {
  FIFA_MANUAL_SEARCH_REQUIRED,
  FIFA_SHOWCASE_UNRESOLVED,
} from "./fifa-seeds";
import type { FifaArchiveIndex, FifaDiscoveryStatus } from "./fifa-types";
import { getCanonicalMatch } from "./index";
import { loadQaDecisionsFromFile } from "./qa-persist.server";
import {
  FRANCE_98_JOURNEY_RECOVERY_IDS,
  buildFrance98JourneyRecoveryQueue,
  nextCandidateId,
} from "./recovery";
import type { RecoveryCandidate, RecoveryCandidatesStore, RecoveryQueueEntry } from "./recovery-types";
import { validateRecoveryCandidateUrl } from "./recovery-validate";

export type FifaDiscoveryResult = {
  canonicalMatchId: string;
  status: FifaDiscoveryStatus;
  confidence?: number;
  candidate?: RecoveryCandidate;
  matchUrl?: string;
  notes?: string;
};

export type DiscoverFifaReplaysResult = {
  index: FifaArchiveIndex;
  store: RecoveryCandidatesStore;
  results: FifaDiscoveryResult[];
};

function manualSearchRequired(canonicalMatchId: string): boolean {
  return (
    FIFA_MANUAL_SEARCH_REQUIRED.some((entry) => entry.canonicalMatchId === canonicalMatchId) ||
    FIFA_SHOWCASE_UNRESOLVED.some((entry) => entry.canonicalMatchId === canonicalMatchId)
  );
}

function candidateAlreadyExists(
  candidates: RecoveryCandidate[],
  canonicalMatchId: string,
  url: string
): boolean {
  return candidates.some(
    (candidate) =>
      candidate.canonicalMatchId === canonicalMatchId &&
      candidate.url === url &&
      candidate.candidateStatus !== "rejected"
  );
}

function attachFifaDiscoveryStatus(
  entry: RecoveryQueueEntry,
  status: FifaDiscoveryStatus,
  confidence?: number
): RecoveryQueueEntry {
  return {
    ...entry,
    fifaDiscoveryStatus: status,
    fifaMatchConfidence: confidence,
  };
}

export async function discoverFifaForMatch(params: {
  canonicalMatchId: string;
  index: FifaArchiveIndex;
  store: RecoveryCandidatesStore;
}): Promise<FifaDiscoveryResult> {
  const match = getCanonicalMatch("france-1998", params.canonicalMatchId);
  if (!match) {
    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "discovery-error",
      notes: "Canonical match not found",
    };
  }

  const verifiedCandidate = params.store.candidates.find(
    (candidate) =>
      candidate.canonicalMatchId === params.canonicalMatchId &&
      candidate.provider === "FIFA" &&
      candidate.humanVerification.status === "verified"
  );
  if (verifiedCandidate) {
    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "human-verified",
      matchUrl: verifiedCandidate.url,
      candidate: verifiedCandidate,
    };
  }

  const rejectedCandidate = params.store.candidates.find(
    (candidate) =>
      candidate.canonicalMatchId === params.canonicalMatchId &&
      candidate.provider === "FIFA" &&
      candidate.candidateStatus === "rejected" &&
      candidate.humanVerification.status === "failed"
  );
  if (rejectedCandidate) {
    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "human-rejected",
      matchUrl: rejectedCandidate.url,
      candidate: rejectedCandidate,
    };
  }

  const query = toFifaMatchQuery(match);
  const best = findBestFifaIndexMatch(query, params.index, 60);

  if (!best) {
    if (manualSearchRequired(params.canonicalMatchId)) {
      const showcaseOnly = FIFA_SHOWCASE_UNRESOLVED.some(
        (entry) => entry.canonicalMatchId === params.canonicalMatchId
      );
      return {
        canonicalMatchId: params.canonicalMatchId,
        status: "manual-search-required",
        notes: showcaseOnly
          ? "Listed on FIFA+ 1998 full-match showcase but URL not yet indexed"
          : "No FIFA full-match listing found in index or showcase catalog",
      };
    }
    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "no-indexed-fifa-candidate",
      notes: "No indexed FIFA candidate matched normalized teams/year/stage",
    };
  }

  const url = best.indexItem.canonicalUrl;
  if (candidateAlreadyExists(params.store.candidates, params.canonicalMatchId, url)) {
    const existing = params.store.candidates.find(
      (candidate) =>
        candidate.canonicalMatchId === params.canonicalMatchId && candidate.url === url
    )!;
    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "fifa-candidate-found",
      confidence: best.confidence,
      matchUrl: url,
      candidate: existing,
      notes: "Candidate already present in recovery store",
    };
  }

  try {
    const validation = await validateRecoveryCandidateUrl(url);
    const matchCandidates = params.store.candidates.filter(
      (candidate) => candidate.canonicalMatchId === params.canonicalMatchId
    );
    const candidate: RecoveryCandidate = {
      candidateId: nextCandidateId(params.canonicalMatchId, matchCandidates.length),
      tournamentId: "france-1998",
      canonicalMatchId: params.canonicalMatchId,
      provider: "FIFA",
      url,
      discoveredBy: "fifa-discovery",
      discoveredAt: new Date().toISOString(),
      title: validation.title ?? best.indexItem.title,
      durationSeconds: validation.durationSeconds ?? best.indexItem.durationSeconds,
      officialSource: true,
      publicAvailability: validation.publicAvailability,
      candidateStatus: "needs-human-review",
      rejectionReason: validation.rejectionReason,
      humanVerification: { status: "untested" },
      notes: `FIFA index match (${best.confidence}%): ${best.matchReasons.join(", ")}`,
      validation: validation.validation,
    };

    params.store.candidates.push(candidate);

    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "fifa-candidate-found",
      confidence: best.confidence,
      matchUrl: url,
      candidate,
    };
  } catch (error) {
    return {
      canonicalMatchId: params.canonicalMatchId,
      status: "discovery-error",
      matchUrl: url,
      notes: error instanceof Error ? error.message : "FIFA candidate validation failed",
    };
  }
}

export async function discoverFifaReplaysForRecovery(params?: {
  store?: RecoveryCandidatesStore;
  index?: FifaArchiveIndex;
  matchIds?: readonly string[];
}): Promise<DiscoverFifaReplaysResult> {
  const index = params?.index ?? buildFifaArchiveIndex();
  const store = params?.store ?? {
    version: 1 as const,
    generatedAt: new Date().toISOString(),
    target: {
      tournamentId: "france-1998" as const,
      experience: "journey" as const,
      label: "France '98 Journey recovery",
    },
    queue: [],
    candidates: [],
  };

  const matchIds = params?.matchIds ?? FRANCE_98_JOURNEY_RECOVERY_IDS;
  const results: FifaDiscoveryResult[] = [];

  for (const canonicalMatchId of matchIds) {
    results.push(
      await discoverFifaForMatch({
        canonicalMatchId,
        index,
        store,
      })
    );
  }

  store.queue = buildFrance98JourneyRecoveryQueue(loadQaDecisionsFromFile()).map((entry) => {
    const result = results.find((row) => row.canonicalMatchId === entry.canonicalMatchId);
    if (!result) return entry;
    return attachFifaDiscoveryStatus(entry, result.status, result.confidence);
  });

  store.generatedAt = new Date().toISOString();

  return { index, store, results };
}

export function summarizeFifaDiscovery(results: FifaDiscoveryResult[]): Record<FifaDiscoveryStatus, number> {
  const summary: Record<FifaDiscoveryStatus, number> = {
    "fifa-candidate-found": 0,
    "no-indexed-fifa-candidate": 0,
    "discovery-error": 0,
    "manual-search-required": 0,
    "human-verified": 0,
    "human-rejected": 0,
  };
  for (const result of results) {
    summary[result.status] += 1;
  }
  return summary;
}

export { findBestFifaIndexMatch, findBestFifaIndexMatches };
