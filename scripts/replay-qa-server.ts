#!/usr/bin/env node
/**
 * Dev-only HTTP server for Replay QA persistence.
 * Run alongside `npm run dev`: npm run replay-qa-server
 */
import http from "node:http";
import { URL } from "node:url";
import { buildQaReport, filterQaMatches } from "../lib/archive/qa-report";
import type { ExperienceKind, TournamentId } from "../lib/archive/types";
import { buildQaCurrentState } from "../lib/archive/qa-store";
import {
  loadQaDecisionsFromFile,
  updateSourceQa,
} from "../lib/archive/qa-persist.server";
import type { RecoveryRejectReason } from "../lib/archive/recovery-types";
import {
  addRecoveryCandidate,
  loadRecoveryStore,
  promoteRecoveryCandidate,
  rejectRecoveryCandidate,
  revalidateRecoveryCandidate,
} from "../lib/archive/recovery-persist.server";

const PORT = Number.parseInt(process.env.REPLAY_QA_PORT || "3847", 10);

function jsonResponse(res: http.ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(`${JSON.stringify(body)}\n`);
}

function handleGet(url: URL) {
  const store = loadQaDecisionsFromFile();
  const report = buildQaReport(new Date().toISOString(), store);
  const matches = filterQaMatches(report.matches, {
    tournament: (url.searchParams.get("tournament") ?? "all") as TournamentId | "all",
    experience: (url.searchParams.get("experience") ?? "all") as ExperienceKind | "all",
    status: url.searchParams.get("status") ?? "all",
    provider: url.searchParams.get("provider") ?? "all",
    search: url.searchParams.get("search") ?? "",
  });

  return {
    generatedAt: report.generatedAt,
    progress: report.progress,
    qaDecisions: store,
    qaCurrentState: buildQaCurrentState(store, report.generatedAt),
    matches,
  };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    jsonResponse(res, 204, {});
    return;
  }

  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (req.method === "GET" && url.pathname === "/recovery") {
    jsonResponse(res, 200, loadRecoveryStore());
    return;
  }

  if (req.method === "POST" && url.pathname === "/recovery") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as {
      action: string;
      candidateId?: string;
      canonicalMatchId?: string;
      tournamentId?: TournamentId;
      url?: string;
      notes?: string;
      reason?: RecoveryRejectReason;
      updatedBy?: string;
    };

    try {
      switch (body.action) {
        case "add-candidate": {
          if (!body.canonicalMatchId || !body.tournamentId || !body.url) {
            jsonResponse(res, 400, { error: "Missing match or URL" });
            return;
          }
          const result = await addRecoveryCandidate({
            canonicalMatchId: body.canonicalMatchId,
            tournamentId: body.tournamentId,
            url: body.url,
            discoveredBy: body.updatedBy ?? "recovery-dashboard",
            notes: body.notes,
          });
          jsonResponse(res, 200, { ok: true, ...result });
          return;
        }
        case "verify-promote": {
          if (!body.candidateId) {
            jsonResponse(res, 400, { error: "Missing candidateId" });
            return;
          }
          const store = promoteRecoveryCandidate({
            candidateId: body.candidateId,
            verifiedBy: body.updatedBy ?? "recovery-dashboard",
            notes: body.notes,
          });
          jsonResponse(res, 200, { ok: true, store });
          return;
        }
        case "reject": {
          if (!body.candidateId || !body.reason) {
            jsonResponse(res, 400, { error: "Missing candidateId or reason" });
            return;
          }
          const store = rejectRecoveryCandidate({
            candidateId: body.candidateId,
            reason: body.reason,
            notes: body.notes,
            verifiedBy: body.updatedBy ?? "recovery-dashboard",
          });
          jsonResponse(res, 200, { ok: true, store });
          return;
        }
        case "revalidate": {
          if (!body.candidateId) {
            jsonResponse(res, 400, { error: "Missing candidateId" });
            return;
          }
          const result = await revalidateRecoveryCandidate(body.candidateId);
          jsonResponse(res, 200, { ok: true, ...result });
          return;
        }
        default:
          jsonResponse(res, 400, { error: "Unknown recovery action" });
          return;
      }
    } catch (error) {
      jsonResponse(res, 500, {
        error: error instanceof Error ? error.message : "Recovery action failed",
      });
      return;
    }
  }

  if (req.method === "GET" && url.pathname === "/") {
    jsonResponse(res, 200, handleGet(url));
    return;
  }

  if (req.method === "POST" && url.pathname === "/") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as {
      tournamentId: TournamentId;
      canonicalMatchId: string;
      sourceId: string;
      action: string;
      notes?: string;
      updatedBy?: string;
    };

    const now = new Date().toISOString();
    const store = (() => {
      switch (body.action) {
        case "verify":
          return updateSourceQa({
            tournamentId: body.tournamentId,
            canonicalMatchId: body.canonicalMatchId,
            sourceId: body.sourceId,
            action: "verify",
            humanVerification: {
              status: "verified",
              verifiedBy: body.updatedBy ?? "replay-qa-dashboard",
              verifiedAt: now,
              notes: body.notes,
            },
          });
        case "fail":
          return updateSourceQa({
            tournamentId: body.tournamentId,
            canonicalMatchId: body.canonicalMatchId,
            sourceId: body.sourceId,
            action: "fail",
            humanVerification: {
              status: "failed",
              verifiedBy: body.updatedBy ?? "replay-qa-dashboard",
              verifiedAt: now,
              notes: body.notes,
            },
          });
        case "private":
          return updateSourceQa({
            ...body,
            action: "private",
            status: "private",
            humanVerification: {
              status: "failed",
              verifiedBy: body.updatedBy ?? "replay-qa-dashboard",
              verifiedAt: now,
              notes: body.notes,
            },
          } as Parameters<typeof updateSourceQa>[0]);
        case "dead":
          return updateSourceQa({
            ...body,
            action: "dead",
            status: "dead",
            humanVerification: {
              status: "failed",
              verifiedBy: body.updatedBy ?? "replay-qa-dashboard",
              verifiedAt: now,
              notes: body.notes,
            },
          } as Parameters<typeof updateSourceQa>[0]);
        case "wrong-match":
          return updateSourceQa({
            tournamentId: body.tournamentId,
            canonicalMatchId: body.canonicalMatchId,
            sourceId: body.sourceId,
            action: "wrong-match",
            status: "wrong-match",
            humanVerification: {
              status: "failed",
              verifiedBy: body.updatedBy ?? "replay-qa-dashboard",
              verifiedAt: now,
              notes: body.notes ?? "Marked as wrong match.",
            },
          });
        case "set-preferred":
          return updateSourceQa({
            tournamentId: body.tournamentId,
            canonicalMatchId: body.canonicalMatchId,
            sourceId: body.sourceId,
            action: "set-preferred",
            preferredSourceId: body.sourceId,
          });
        case "notes":
          return updateSourceQa({
            tournamentId: body.tournamentId,
            canonicalMatchId: body.canonicalMatchId,
            sourceId: body.sourceId,
            action: "notes",
            notes: body.notes ?? "",
          });
        default:
          return null;
      }
    })();

    if (!store) {
      jsonResponse(res, 400, { error: "Unknown action" });
      return;
    }

    jsonResponse(res, 200, {
      ok: true,
      decisions: store,
      currentState: buildQaCurrentState(store),
    });
    return;
  }

  jsonResponse(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Replay QA server listening on http://localhost:${PORT}`);
});
