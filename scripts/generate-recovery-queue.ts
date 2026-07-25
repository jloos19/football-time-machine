#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadRecoveryStore,
  recoveryFilePath,
  regenerateRecoveryQueue,
} from "../lib/archive/recovery-persist.server";
import { FRANCE_98_JOURNEY_RECOVERY_IDS } from "../lib/archive/recovery";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function main(): void {
  const existing = loadRecoveryStore();
  const store = regenerateRecoveryQueue(existing);

  console.log(`France '98 Journey recovery queue`);
  console.log(`  Target matches: ${FRANCE_98_JOURNEY_RECOVERY_IDS.length}`);
  console.log(`  Queue entries: ${store.queue.length}`);
  console.log(`  Candidates: ${store.candidates.length}`);
  console.log(`Wrote ${path.relative(ROOT, recoveryFilePath())}`);

  if (store.queue.length !== FRANCE_98_JOURNEY_RECOVERY_IDS.length) {
    console.warn(
      `Warning: expected ${FRANCE_98_JOURNEY_RECOVERY_IDS.length} queue entries, got ${store.queue.length}`
    );
    process.exitCode = 1;
  }
}

main();
