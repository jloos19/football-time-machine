import fs from "node:fs";
import path from "node:path";
import { usa1994Matches } from "./matches/usa1994";
import { france1998Matches } from "./matches/france1998";
import { koreaJapan2002Matches } from "./matches/koreaJapan2002";
import {
  buildFrance98JourneyRecoveryQueue,
  choosePreferredSourceId,
  nextCandidateId,
  nextRecoverySourceId,
  tournamentArchiveExportName,
} from "./recovery";
import type {
  RecoveryCandidate,
  RecoveryCandidatesStore,
  RecoveryRejectReason,
} from "./recovery-types";
import { validateRecoveryCandidateUrl } from "./recovery-validate";
import { serializeCanonicalMatches } from "./serialize";
import type { CanonicalMatch, CanonicalReplaySource, TournamentId } from "./types";
import { applyQaDecisions } from "./qa-store";
import {
  loadQaDecisionsFromFile,
  regenerateQaArtifacts,
  updateSourceQa,
} from "./qa-persist.server";

const QA_DIR = path.join(process.cwd(), "data/replay-qa");
const RECOVERY_FILE = path.join(QA_DIR, "recovery-candidates.json");

const archiveByTournament: Record<TournamentId, CanonicalMatch[]> = {
  "usa-1994": usa1994Matches,
  "france-1998": france1998Matches,
  "korea-japan-2002": koreaJapan2002Matches,
};

export function recoveryFilePath(): string {
  return RECOVERY_FILE;
}

export function loadRecoveryStore(): RecoveryCandidatesStore {
  if (!fs.existsSync(RECOVERY_FILE)) {
    return buildEmptyRecoveryStore();
  }
  const raw = JSON.parse(fs.readFileSync(RECOVERY_FILE, "utf8")) as RecoveryCandidatesStore;
  return raw.version === 1 ? raw : buildEmptyRecoveryStore();
}

function buildEmptyRecoveryStore(): RecoveryCandidatesStore {
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    target: {
      tournamentId: "france-1998",
      experience: "journey",
      label: "France '98 Journey recovery",
    },
    queue: [],
    candidates: [],
  };
}

export function saveRecoveryStore(store: RecoveryCandidatesStore): void {
  fs.mkdirSync(path.dirname(RECOVERY_FILE), { recursive: true });
  const contents = `${JSON.stringify(store, null, 2)}\n`;
  fs.writeFileSync(RECOVERY_FILE, contents, "utf8");
}

export function regenerateRecoveryQueue(store?: RecoveryCandidatesStore): RecoveryCandidatesStore {
  const qaStore = loadQaDecisionsFromFile();
  const current = store ?? loadRecoveryStore();
  const updated: RecoveryCandidatesStore = {
    ...current,
    generatedAt: new Date().toISOString(),
    queue: buildFrance98JourneyRecoveryQueue(qaStore),
  };
  saveRecoveryStore(updated);
  return updated;
}

export async function addRecoveryCandidate(params: {
  canonicalMatchId: string;
  tournamentId: TournamentId;
  url: string;
  discoveredBy: string;
  notes?: string;
}): Promise<{ store: RecoveryCandidatesStore; candidate: RecoveryCandidate }> {
  const store = loadRecoveryStore();
  const matchCandidates = store.candidates.filter(
    (c) => c.canonicalMatchId === params.canonicalMatchId
  );

  if (matchCandidates.some((c) => c.url === params.url && c.candidateStatus !== "rejected")) {
    throw new Error("A candidate with this URL already exists for this match");
  }

  const validationResult = await validateRecoveryCandidateUrl(params.url);
  const candidateId = nextCandidateId(params.canonicalMatchId, matchCandidates.length);

  const candidate: RecoveryCandidate = {
    candidateId,
    tournamentId: params.tournamentId,
    canonicalMatchId: params.canonicalMatchId,
    provider: validationResult.provider,
    url: params.url,
    discoveredBy: params.discoveredBy,
    discoveredAt: new Date().toISOString(),
    title: validationResult.title,
    uploader: validationResult.uploader,
    durationSeconds: validationResult.durationSeconds,
    officialSource: validationResult.officialSource,
    publicAvailability: validationResult.publicAvailability,
    embeddable: validationResult.embeddable,
    candidateStatus: validationResult.candidateStatus,
    rejectionReason: validationResult.rejectionReason,
    humanVerification: { status: "untested" },
    notes: params.notes,
    validation: validationResult.validation,
  };

  store.candidates.push(candidate);
  store.generatedAt = new Date().toISOString();
  saveRecoveryStore(store);
  return { store, candidate };
}

function writeArchiveMatches(tournamentId: TournamentId, matches: CanonicalMatch[]): void {
  const relative =
    tournamentId === "usa-1994"
      ? "lib/archive/matches/usa1994.ts"
      : tournamentId === "france-1998"
        ? "lib/archive/matches/france1998.ts"
        : "lib/archive/matches/koreaJapan2002.ts";
  const filePath = path.join(process.cwd(), relative);
  const exportName = tournamentArchiveExportName(tournamentId);
  fs.writeFileSync(filePath, serializeCanonicalMatches(exportName, matches), "utf8");
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildPromotedSource(
  match: CanonicalMatch,
  candidate: RecoveryCandidate,
  sourceId: string
): CanonicalReplaySource {
  const now = todayIsoDate();
  return {
    id: sourceId,
    provider: candidate.provider,
    url: candidate.url,
    status: "active",
    fullMatch: true,
    automatedCheck: {
      status: candidate.validation?.rejectionReasons.length
        ? "needs-review"
        : "ok",
      lastChecked: now,
      reason:
        candidate.validation?.rejectionReasons.length === 0
          ? "Recovery candidate metadata validated; human playback verified"
          : "Promoted after human playback verification",
      recheckRecommended: false,
    },
    humanVerification: {
      status: "verified",
      verifiedBy: candidate.humanVerification.verifiedBy ?? "recovery-dashboard",
      verifiedAt: candidate.humanVerification.verifiedAt ?? new Date().toISOString(),
      notes: candidate.notes ?? "Promoted from recovery queue after human verification",
    },
    notes: candidate.title ? `Recovery: ${candidate.title}` : "Recovery candidate promoted",
  };
}

export function promoteRecoveryCandidate(params: {
  candidateId: string;
  verifiedBy?: string;
  notes?: string;
}): RecoveryCandidatesStore {
  const store = loadRecoveryStore();
  const candidate = store.candidates.find((c) => c.candidateId === params.candidateId);
  if (!candidate) {
    throw new Error(`Candidate not found: ${params.candidateId}`);
  }
  if (candidate.candidateStatus === "promoted") {
    throw new Error("Candidate already promoted");
  }
  if (candidate.candidateStatus === "rejected") {
    throw new Error("Cannot promote a rejected candidate");
  }

  const matches = structuredClone(archiveByTournament[candidate.tournamentId]);
  const matchIndex = matches.findIndex(
    (m) => m.canonicalMatchId === candidate.canonicalMatchId
  );
  if (matchIndex < 0) {
    throw new Error(`Match not found: ${candidate.canonicalMatchId}`);
  }

  const match = matches[matchIndex]!;
  const sourceId =
    candidate.sourceId ??
    nextRecoverySourceId(candidate.canonicalMatchId, match.replaySources.length);

  if (match.replaySources.some((s) => s.id === sourceId)) {
    throw new Error(`Source ID already exists: ${sourceId}`);
  }

  const now = new Date().toISOString();
  candidate.candidateStatus = "promoted";
  candidate.sourceId = sourceId;
  candidate.humanVerification = {
    status: "verified",
    verifiedBy: params.verifiedBy ?? "recovery-dashboard",
    verifiedAt: now,
  };
  if (params.notes) candidate.notes = params.notes;

  const newSource = buildPromotedSource(match, candidate, sourceId);
  match.replaySources.push(newSource);

  const qaStore = loadQaDecisionsFromFile();
  const withQa = applyQaDecisions([match], qaStore)[0]!;
  const preferredId = choosePreferredSourceId(withQa, sourceId);
  match.preferredSourceId = preferredId;
  matches[matchIndex] = match;

  writeArchiveMatches(candidate.tournamentId, matches);

  updateSourceQa({
    tournamentId: candidate.tournamentId,
    canonicalMatchId: candidate.canonicalMatchId,
    sourceId,
    action: "verify",
    humanVerification: newSource.humanVerification,
    updatedBy: params.verifiedBy ?? "recovery-dashboard",
  });

  updateSourceQa({
    tournamentId: candidate.tournamentId,
    canonicalMatchId: candidate.canonicalMatchId,
    sourceId: preferredId,
    action: "set-preferred",
    preferredSourceId: preferredId,
    updatedBy: params.verifiedBy ?? "recovery-dashboard",
  });

  store.generatedAt = now;
  saveRecoveryStore(store);
  regenerateQaArtifacts(loadQaDecisionsFromFile());
  regenerateRecoveryQueue(store);
  return store;
}

const REJECT_ACTION_MAP: Record<
  RecoveryRejectReason,
  { candidateStatus: "rejected"; rejectionReason: string; humanStatus: "failed" }
> = {
  "wrong-match": {
    candidateStatus: "rejected",
    rejectionReason: "Wrong match",
    humanStatus: "failed",
  },
  "highlights-only": {
    candidateStatus: "rejected",
    rejectionReason: "Highlights only — not a full match",
    humanStatus: "failed",
  },
  deleted: {
    candidateStatus: "rejected",
    rejectionReason: "Video deleted or unavailable",
    humanStatus: "failed",
  },
  private: {
    candidateStatus: "rejected",
    rejectionReason: "Video is private or access-restricted",
    humanStatus: "failed",
  },
  "geo-blocked": {
    candidateStatus: "rejected",
    rejectionReason: "Geo-blocked or region-restricted",
    humanStatus: "failed",
  },
  rejected: {
    candidateStatus: "rejected",
    rejectionReason: "Rejected during human review",
    humanStatus: "failed",
  },
};

export function rejectRecoveryCandidate(params: {
  candidateId: string;
  reason: RecoveryRejectReason;
  notes?: string;
  verifiedBy?: string;
}): RecoveryCandidatesStore {
  const store = loadRecoveryStore();
  const candidate = store.candidates.find((c) => c.candidateId === params.candidateId);
  if (!candidate) {
    throw new Error(`Candidate not found: ${params.candidateId}`);
  }

  const mapping = REJECT_ACTION_MAP[params.reason];
  candidate.candidateStatus = mapping.candidateStatus;
  candidate.rejectionReason = params.notes ?? mapping.rejectionReason;
  candidate.humanVerification = {
    status: mapping.humanStatus,
    verifiedBy: params.verifiedBy ?? "recovery-dashboard",
    verifiedAt: new Date().toISOString(),
  };
  if (params.notes) candidate.notes = params.notes;

  store.generatedAt = new Date().toISOString();
  saveRecoveryStore(store);
  return store;
}

export async function revalidateRecoveryCandidate(
  candidateId: string
): Promise<{ store: RecoveryCandidatesStore; candidate: RecoveryCandidate }> {
  const store = loadRecoveryStore();
  const candidate = store.candidates.find((c) => c.candidateId === candidateId);
  if (!candidate) {
    throw new Error(`Candidate not found: ${candidateId}`);
  }
  if (candidate.candidateStatus === "promoted") {
    throw new Error("Cannot revalidate a promoted candidate");
  }

  const validationResult = await validateRecoveryCandidateUrl(
    candidate.url,
    candidate.provider
  );

  candidate.provider = validationResult.provider;
  candidate.title = validationResult.title ?? candidate.title;
  candidate.uploader = validationResult.uploader ?? candidate.uploader;
  candidate.durationSeconds =
    validationResult.durationSeconds ?? candidate.durationSeconds;
  candidate.officialSource = validationResult.officialSource;
  candidate.publicAvailability = validationResult.publicAvailability;
  candidate.embeddable = validationResult.embeddable;
  candidate.candidateStatus = validationResult.candidateStatus;
  candidate.rejectionReason = validationResult.rejectionReason;
  candidate.validation = validationResult.validation;

  store.generatedAt = new Date().toISOString();
  saveRecoveryStore(store);
  return { store, candidate };
}
