import fs from "node:fs";
import path from "node:path";
import { buildQaReport } from "./qa-report";
import type { QaDecision, QaDecisionStore } from "./qa-store";
import { buildQaCurrentState } from "./qa-store";

const QA_DIR = path.join(process.cwd(), "data/replay-qa");
const QA_FILE = path.join(QA_DIR, "human-verification.json");
const CURRENT_STATE_FILE = path.join(QA_DIR, "current-state.json");
const REPORTS_DIR = path.join(process.cwd(), "reports");

export function qaFilePath(): string {
  return QA_FILE;
}

export function qaCurrentStatePath(): string {
  return CURRENT_STATE_FILE;
}

export function qaReportPath(): string {
  return path.join(REPORTS_DIR, "replay-qa.json");
}

export function loadQaDecisionsFromFile(): QaDecisionStore {
  if (!fs.existsSync(QA_FILE)) {
    return { version: 1, decisions: [] };
  }
  const raw = JSON.parse(fs.readFileSync(QA_FILE, "utf8")) as QaDecisionStore;
  return raw.version === 1 ? raw : { version: 1, decisions: [] };
}

export function saveQaDecisions(store: QaDecisionStore): void {
  fs.mkdirSync(path.dirname(QA_FILE), { recursive: true });
  fs.writeFileSync(QA_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export function saveQaCurrentState(store: QaDecisionStore): void {
  fs.mkdirSync(path.dirname(CURRENT_STATE_FILE), { recursive: true });
  const currentState = buildQaCurrentState(store);
  fs.writeFileSync(
    CURRENT_STATE_FILE,
    `${JSON.stringify(currentState, null, 2)}\n`,
    "utf8"
  );
}

export function writeQaReportFiles(store: QaDecisionStore): void {
  const report = buildQaReport(new Date().toISOString(), store);
  const contents = `${JSON.stringify(report, null, 2)}\n`;

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(qaReportPath(), contents, "utf8");
}

export function regenerateQaArtifacts(store: QaDecisionStore): void {
  saveQaCurrentState(store);
  writeQaReportFiles(store);
}

export function appendQaDecision(decision: QaDecision): QaDecisionStore {
  const store = loadQaDecisionsFromFile();
  store.decisions.push(decision);
  saveQaDecisions(store);
  regenerateQaArtifacts(store);
  return store;
}

export function updateSourceQa(
  params: Omit<QaDecision, "updatedAt"> & { updatedBy?: string }
): QaDecisionStore {
  return appendQaDecision({
    ...params,
    updatedAt: new Date().toISOString(),
  });
}
