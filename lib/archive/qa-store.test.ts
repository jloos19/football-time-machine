import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CanonicalMatch } from "./types";
import {
  applyQaDecisions,
  mapDecisionToSourceState,
  resolveLatestSourceDecisions,
  type QaDecisionStore,
} from "./qa-store";

function baseMatch(): CanonicalMatch {
  return {
    tournamentId: "france-1998",
    canonicalMatchId: "france-1998-c04",
    chronologicalIndex: 4,
    kickoffOrder: 4,
    date: "June 11, 1998",
    stage: "Group Stage",
    homeTeam: "Cameroon",
    awayTeam: "Austria",
    venue: "Stade de la Beaujoire",
    replaySources: [
      {
        id: "france-1998-c04-src-1",
        provider: "Dailymotion",
        url: "https://example.com/video",
        status: "active",
        fullMatch: true,
        automatedCheck: {
          status: "ok",
          lastChecked: "2026-07-22T00:00:00.000Z",
        },
        humanVerification: {
          status: "verified",
          verifiedBy: "archive",
          verifiedAt: "2026-07-22T00:00:00.000Z",
        },
      },
    ],
  };
}

describe("resolveLatestSourceDecisions", () => {
  it("uses the latest decision regardless of action type", () => {
    const store: QaDecisionStore = {
      version: 1,
      decisions: [
        {
          tournamentId: "france-1998",
          canonicalMatchId: "france-1998-c04",
          sourceId: "france-1998-c04-src-1",
          action: "verify",
          humanVerification: { status: "verified" },
          updatedAt: "2026-07-23T11:00:00.000Z",
        },
        {
          tournamentId: "france-1998",
          canonicalMatchId: "france-1998-c04",
          sourceId: "france-1998-c04-src-1",
          action: "dead",
          status: "dead",
          updatedAt: "2026-07-23T12:00:00.000Z",
        },
      ],
    };

    const latest = resolveLatestSourceDecisions(store.decisions);
    const decision = latest.get("france-1998:france-1998-c04:france-1998-c04-src-1");
    assert.equal(decision?.action, "dead");
  });
});

describe("mapDecisionToSourceState", () => {
  it("maps dead to failed human status", () => {
    const state = mapDecisionToSourceState({
      tournamentId: "france-1998",
      canonicalMatchId: "france-1998-c04",
      sourceId: "france-1998-c04-src-1",
      action: "dead",
      status: "dead",
      updatedAt: "2026-07-23T12:00:00.000Z",
    });
    assert.equal(state.status, "dead");
    assert.equal(state.humanVerification.status, "failed");
  });
});

describe("applyQaDecisions", () => {
  it("does not keep archive verified status after a later dead decision", () => {
    const store: QaDecisionStore = {
      version: 1,
      decisions: [
        {
          tournamentId: "france-1998",
          canonicalMatchId: "france-1998-c04",
          sourceId: "france-1998-c04-src-1",
          action: "dead",
          status: "dead",
          updatedAt: "2026-07-23T12:00:00.000Z",
        },
      ],
    };

    const [match] = applyQaDecisions([baseMatch()], store);
    assert.equal(match.replaySources[0].status, "dead");
    assert.equal(match.replaySources[0].humanVerification.status, "failed");
  });

  it("prefers a later verify over an earlier failure", () => {
    const store: QaDecisionStore = {
      version: 1,
      decisions: [
        {
          tournamentId: "france-1998",
          canonicalMatchId: "france-1998-c04",
          sourceId: "france-1998-c04-src-1",
          action: "dead",
          status: "dead",
          updatedAt: "2026-07-23T11:00:00.000Z",
        },
        {
          tournamentId: "france-1998",
          canonicalMatchId: "france-1998-c04",
          sourceId: "france-1998-c04-src-1",
          action: "verify",
          humanVerification: {
            status: "verified",
            verifiedBy: "qa",
            verifiedAt: "2026-07-23T12:00:00.000Z",
          },
          updatedAt: "2026-07-23T12:00:00.000Z",
        },
      ],
    };

    const [match] = applyQaDecisions([baseMatch()], store);
    assert.equal(match.replaySources[0].status, "active");
    assert.equal(match.replaySources[0].humanVerification.status, "verified");
  });
});
