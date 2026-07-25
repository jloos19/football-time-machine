import type {
  CanonicalMatch,
  CanonicalReplaySource,
  HumanVerification,
  ReplaySourceStatus,
} from "./types";

export type QaDecision = {
  tournamentId: string;
  canonicalMatchId: string;
  sourceId: string;
  action:
    | "verify"
    | "fail"
    | "private"
    | "dead"
    | "wrong-match"
    | "set-preferred"
    | "notes";
  humanVerification?: HumanVerification;
  status?: ReplaySourceStatus;
  preferredSourceId?: string;
  notes?: string;
  updatedAt: string;
  updatedBy?: string;
};

export type QaDecisionStore = {
  version: 1;
  decisions: QaDecision[];
};

export type ResolvedSourceState = {
  tournamentId: string;
  canonicalMatchId: string;
  sourceId: string;
  latestAction: QaDecision["action"];
  status?: ReplaySourceStatus;
  humanVerification: HumanVerification;
  updatedAt: string;
};

export type ResolvedPreferredSource = {
  tournamentId: string;
  canonicalMatchId: string;
  preferredSourceId: string;
  updatedAt: string;
};

export type QaCurrentState = {
  version: 1;
  resolvedAt: string;
  eventCount: number;
  sources: ResolvedSourceState[];
  preferredSources: ResolvedPreferredSource[];
};

const STATE_ACTIONS = new Set<QaDecision["action"]>([
  "verify",
  "fail",
  "private",
  "dead",
  "wrong-match",
]);

import bundledQaDecisions from "@/data/replay-qa/human-verification.json";

export function loadQaDecisions(): QaDecisionStore {
  const raw = bundledQaDecisions as QaDecisionStore;
  return raw.version === 1 ? raw : { version: 1, decisions: [] };
}

export function sourceDecisionKey(
  tournamentId: string,
  canonicalMatchId: string,
  sourceId: string
): string {
  return `${tournamentId}:${canonicalMatchId}:${sourceId}`;
}

export function matchDecisionKey(
  tournamentId: string,
  canonicalMatchId: string
): string {
  return `${tournamentId}:${canonicalMatchId}`;
}

function isNewerDecision(next: QaDecision, current: QaDecision | undefined): boolean {
  if (!current) return true;
  const byTime = next.updatedAt.localeCompare(current.updatedAt);
  if (byTime !== 0) return byTime > 0;
  return true;
}

export function resolveLatestSourceDecisions(
  decisions: QaDecision[]
): Map<string, QaDecision> {
  const latest = new Map<string, QaDecision>();
  for (const decision of decisions) {
    if (!STATE_ACTIONS.has(decision.action)) continue;
    const key = sourceDecisionKey(
      decision.tournamentId,
      decision.canonicalMatchId,
      decision.sourceId
    );
    const existing = latest.get(key);
    if (isNewerDecision(decision, existing)) {
      latest.set(key, decision);
    }
  }
  return latest;
}

export function mapDecisionToSourceState(decision: QaDecision): ResolvedSourceState {
  const base = {
    tournamentId: decision.tournamentId,
    canonicalMatchId: decision.canonicalMatchId,
    sourceId: decision.sourceId,
    latestAction: decision.action,
    updatedAt: decision.updatedAt,
  };

  switch (decision.action) {
    case "verify":
      return {
        ...base,
        status: "active",
        humanVerification: decision.humanVerification ?? { status: "verified" },
      };
    case "fail":
      return {
        ...base,
        humanVerification: decision.humanVerification ?? { status: "failed" },
      };
    case "dead":
      return {
        ...base,
        status: "dead",
        humanVerification: {
          ...decision.humanVerification,
          status: "failed",
        },
      };
    case "private":
      return {
        ...base,
        status: "private",
        humanVerification: {
          ...decision.humanVerification,
          status: "failed",
        },
      };
    case "wrong-match":
      return {
        ...base,
        status: "wrong-match",
        humanVerification: {
          ...decision.humanVerification,
          status: "failed",
        },
      };
    default:
      return {
        ...base,
        humanVerification: decision.humanVerification ?? { status: "untested" },
      };
  }
}

export function resolveCurrentSourceStates(
  store: QaDecisionStore
): Map<string, ResolvedSourceState> {
  const resolved = new Map<string, ResolvedSourceState>();
  for (const decision of resolveLatestSourceDecisions(store.decisions).values()) {
    resolved.set(
      sourceDecisionKey(
        decision.tournamentId,
        decision.canonicalMatchId,
        decision.sourceId
      ),
      mapDecisionToSourceState(decision)
    );
  }
  return resolved;
}

export function resolveLatestNotes(decisions: QaDecision[]): Map<string, string> {
  const latest = new Map<string, QaDecision>();
  for (const decision of decisions) {
    if (decision.action !== "notes") continue;
    const key = sourceDecisionKey(
      decision.tournamentId,
      decision.canonicalMatchId,
      decision.sourceId
    );
    const existing = latest.get(key);
    if (isNewerDecision(decision, existing)) {
      latest.set(key, decision);
    }
  }
  return new Map(
    [...latest.entries()]
      .filter(([, decision]) => decision.notes !== undefined)
      .map(([key, decision]) => [key, decision.notes as string])
  );
}

export function resolveLatestPreferredSources(
  decisions: QaDecision[]
): Map<string, ResolvedPreferredSource> {
  const latest = new Map<string, QaDecision>();
  for (const decision of decisions) {
    if (decision.action !== "set-preferred" || !decision.preferredSourceId) {
      continue;
    }
    const key = matchDecisionKey(decision.tournamentId, decision.canonicalMatchId);
    const existing = latest.get(key);
    if (isNewerDecision(decision, existing)) {
      latest.set(key, decision);
    }
  }
  return new Map(
    [...latest.entries()].map(([key, decision]) => [
      key,
      {
        tournamentId: decision.tournamentId,
        canonicalMatchId: decision.canonicalMatchId,
        preferredSourceId: decision.preferredSourceId as string,
        updatedAt: decision.updatedAt,
      },
    ])
  );
}

export function buildQaCurrentState(
  store: QaDecisionStore,
  resolvedAt = new Date().toISOString()
): QaCurrentState {
  return {
    version: 1,
    resolvedAt,
    eventCount: store.decisions.length,
    sources: [...resolveCurrentSourceStates(store).values()].sort((a, b) =>
      a.updatedAt.localeCompare(b.updatedAt)
    ),
    preferredSources: [...resolveLatestPreferredSources(store.decisions).values()].sort(
      (a, b) => a.updatedAt.localeCompare(b.updatedAt)
    ),
  };
}

export function applyQaDecisions(
  matches: CanonicalMatch[],
  store: QaDecisionStore
): CanonicalMatch[] {
  const resolvedSources = resolveCurrentSourceStates(store);
  const latestNotes = resolveLatestNotes(store.decisions);
  const latestPreferred = resolveLatestPreferredSources(store.decisions);

  return matches.map((match) => {
    const updated = structuredClone(match);

    for (const source of updated.replaySources) {
      const key = sourceDecisionKey(
        match.tournamentId,
        match.canonicalMatchId,
        source.id
      );
      const state = resolvedSources.get(key);

      if (state) {
        source.humanVerification = { ...state.humanVerification };
        if (state.status !== undefined) {
          source.status = state.status;
        }
      }

      const notes = latestNotes.get(key);
      if (notes !== undefined) {
        source.humanVerification = {
          ...source.humanVerification,
          notes,
        };
      }
    }

    const preferred = latestPreferred.get(
      matchDecisionKey(match.tournamentId, match.canonicalMatchId)
    );
    if (preferred?.preferredSourceId) {
      updated.preferredSourceId = preferred.preferredSourceId;
    }

    return updated;
  });
}

export function getSourceHumanStatus(
  source: CanonicalReplaySource
): "untested" | "verified" | "failed" {
  return source.humanVerification.status;
}
