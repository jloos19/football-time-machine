import fs from "node:fs";
import path from "node:path";
import type { QaReport } from "@/lib/archive/qa-report-types";
import type { RecoveryCandidatesStore } from "@/lib/archive/recovery-types";
import type { ReplayAuditReport } from "@/lib/replays/audit-report";

const ROOT = process.cwd();

export const INTERNAL_REPORT_PATHS = {
  replayAuditJson: path.join(ROOT, "reports/replay-audit.json"),
  replayAuditMd: path.join(ROOT, "reports/replay-audit.md"),
  replayQaJson: path.join(ROOT, "reports/replay-qa.json"),
  flagAuditMd: path.join(ROOT, "reports/flag-audit.md"),
  recoveryCandidates: path.join(ROOT, "data/replay-qa/recovery-candidates.json"),
  humanVerification: path.join(ROOT, "data/replay-qa/human-verification.json"),
  currentState: path.join(ROOT, "data/replay-qa/current-state.json"),
  fifaArchiveIndex: path.join(ROOT, "data/replay-qa/fifa-archive-index.json"),
} as const;

export const PUBLIC_REPORTS_DIR = path.join(ROOT, "public/reports");

export function assertDevOnly(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Internal report helpers are development-only");
  }
}

function readJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

/** Load the latest replay-audit report from the non-public reports directory. */
export function loadReplayAuditReport(): ReplayAuditReport | null {
  assertDevOnly();
  return readJsonFile<ReplayAuditReport>(INTERNAL_REPORT_PATHS.replayAuditJson);
}

/**
 * Build a fresh QA report from canonical archive + human-verification decisions.
 * Uses dynamic imports so production static analysis does not pull archive writers.
 */
export async function loadReplayQaReport(): Promise<QaReport> {
  assertDevOnly();
  const [{ buildQaReport }, { loadQaDecisionsFromFile }] = await Promise.all([
    import("@/lib/archive/qa-report"),
    import("@/lib/archive/qa-persist.server"),
  ]);
  const store = loadQaDecisionsFromFile();
  return buildQaReport(new Date().toISOString(), store);
}

/** Load recovery candidates from data/replay-qa (never public/). */
export function loadRecoveryCandidatesReport(): RecoveryCandidatesStore {
  assertDevOnly();
  const store = readJsonFile<RecoveryCandidatesStore>(
    INTERNAL_REPORT_PATHS.recoveryCandidates
  );
  if (store?.version === 1) return store;
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

export function publicReportsDirExists(): boolean {
  return fs.existsSync(PUBLIC_REPORTS_DIR);
}

export function listPublicReportFiles(): string[] {
  if (!publicReportsDirExists()) return [];
  return fs
    .readdirSync(PUBLIC_REPORTS_DIR)
    .filter((name) => !name.startsWith("."))
    .map((name) => path.join(PUBLIC_REPORTS_DIR, name));
}
