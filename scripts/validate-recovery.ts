#!/usr/bin/env node
import { getCanonicalMatch, isProductionReadySource } from "../lib/archive/index";
import { loadQaDecisionsFromFile } from "../lib/archive/qa-persist.server";
import { applyQaDecisions } from "../lib/archive/qa-store";
import { FRANCE_98_JOURNEY_RECOVERY_IDS } from "../lib/archive/recovery";
import { loadRecoveryStore } from "../lib/archive/recovery-persist.server";
import { france1998Matches } from "../lib/archive/matches/france1998";

type ValidationIssue = { code: string; message: string };

function main(): void {
  const issues: ValidationIssue[] = [];
  const store = loadRecoveryStore();
  const qaStore = loadQaDecisionsFromFile();
  const archiveMatches = applyQaDecisions(structuredClone(france1998Matches), qaStore);

  const queueIds = new Set(store.queue.map((e) => e.canonicalMatchId));
  for (const matchId of FRANCE_98_JOURNEY_RECOVERY_IDS) {
    if (!queueIds.has(matchId)) {
      issues.push({
        code: "missing-queue-entry",
        message: `Missing recovery queue entry for ${matchId}`,
      });
    }
  }

  if (store.queue.length !== FRANCE_98_JOURNEY_RECOVERY_IDS.length) {
    issues.push({
      code: "queue-count",
      message: `Expected ${FRANCE_98_JOURNEY_RECOVERY_IDS.length} queue entries, found ${store.queue.length}`,
    });
  }

  const promoted = store.candidates.filter((c) => c.candidateStatus === "promoted");
  for (const candidate of promoted) {
    if (candidate.humanVerification.status !== "verified") {
      issues.push({
        code: "promoted-not-verified",
        message: `Promoted candidate ${candidate.candidateId} lacks humanVerification.status === "verified"`,
      });
    }

    const match =
      getCanonicalMatch(candidate.tournamentId, candidate.canonicalMatchId) ??
      archiveMatches.find((m) => m.canonicalMatchId === candidate.canonicalMatchId);

    if (!match) {
      issues.push({
        code: "promoted-match-missing",
        message: `Promoted candidate ${candidate.candidateId} references missing match`,
      });
      continue;
    }

    const source = match.replaySources.find(
      (s) => s.id === candidate.sourceId || s.url === candidate.url
    );
    if (!source) {
      issues.push({
        code: "promoted-not-in-archive",
        message: `Promoted candidate ${candidate.candidateId} not found in canonical replay library`,
      });
      continue;
    }

    if (!isProductionReadySource(source)) {
      issues.push({
        code: "promoted-not-production-ready",
        message: `Promoted source ${source.id} is not production-ready in canonical library`,
      });
    }
  }

  const rejected = store.candidates.filter((c) => c.candidateStatus === "rejected");
  for (const candidate of rejected) {
    const match = archiveMatches.find(
      (m) => m.canonicalMatchId === candidate.canonicalMatchId
    );
    if (!match) continue;

    const inProduction = match.replaySources.some(
      (s) =>
        s.url === candidate.url &&
        s.status === "active" &&
        s.humanVerification.status === "verified"
    );
    if (inProduction) {
      issues.push({
        code: "rejected-in-production",
        message: `Rejected candidate ${candidate.candidateId} appears as verified production source`,
      });
    }
  }

  for (const entry of store.queue) {
    if (entry.fifaDiscoveryStatus === "discovery-error") {
      issues.push({
        code: "fifa-discovery-error",
        message: `FIFA discovery error for ${entry.canonicalMatchId}`,
      });
    }
  }

  for (const entry of store.queue) {
    if (!entry.failedSource) continue;
    const match = archiveMatches.find(
      (m) => m.canonicalMatchId === entry.canonicalMatchId
    );
    if (!match) continue;

    const failed = match.replaySources.find((s) => s.id === entry.failedSource!.id);
    if (!failed) continue;

    const wasFailed =
      failed.status === "dead" ||
      failed.status === "wrong-match" ||
      failed.status === "private" ||
      failed.humanVerification.status === "failed";

    const nowVerified =
      failed.status === "active" && failed.humanVerification.status === "verified";

    if (wasFailed && nowVerified) {
      issues.push({
        code: "failed-source-restored",
        message: `Failed source ${failed.id} was automatically restored for ${entry.canonicalMatchId}`,
      });
    }
  }

  if (issues.length === 0) {
    console.log("Recovery validation passed.");
    console.log(`  Queue: ${store.queue.length} matches`);
    console.log(`  Candidates: ${store.candidates.length} (${promoted.length} promoted, ${rejected.length} rejected)`);
    return;
  }

  console.error(`Recovery validation failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`  [${issue.code}] ${issue.message}`);
  }
  process.exitCode = 1;
}

main();
