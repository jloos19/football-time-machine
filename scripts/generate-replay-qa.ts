#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadQaDecisionsFromFile,
  regenerateQaArtifacts,
  qaCurrentStatePath,
  qaFilePath,
} from "../lib/archive/qa-persist.server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function main(): void {
  const store = loadQaDecisionsFromFile();
  regenerateQaArtifacts(store);

  console.log(`Loaded ${store.decisions.length} QA events from ${path.relative(ROOT, qaFilePath())}`);
  console.log(`Wrote ${path.relative(ROOT, qaCurrentStatePath())}`);
  console.log(`Wrote ${path.relative(ROOT, "reports/replay-qa.json")}`);
}

main();
