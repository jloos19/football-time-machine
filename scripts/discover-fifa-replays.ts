#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  discoverFifaReplaysForRecovery,
  summarizeFifaDiscovery,
} from "../lib/archive/fifa-discover";
import { FIFA_ARCHIVE_INDEX_PATH, buildFifaArchiveIndex } from "../lib/archive/fifa-index";
import { FRANCE_98_JOURNEY_RECOVERY_IDS } from "../lib/archive/recovery";
import {
  loadRecoveryStore,
  saveRecoveryStore,
} from "../lib/archive/recovery-persist.server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, FIFA_ARCHIVE_INDEX_PATH);

function loadIndex() {
  if (!fs.existsSync(INDEX_PATH)) {
    return buildFifaArchiveIndex();
  }
  const raw = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  return raw.version === 1 ? raw : buildFifaArchiveIndex();
}

async function main(): Promise<void> {
  const store = loadRecoveryStore();
  const index = loadIndex();
  const { store: updatedStore, results } = await discoverFifaReplaysForRecovery({
    store,
    index,
    matchIds: FRANCE_98_JOURNEY_RECOVERY_IDS,
  });

  saveRecoveryStore(updatedStore);

  const summary = summarizeFifaDiscovery(results);
  console.log(`FIFA discovery for France '98 Journey (${FRANCE_98_JOURNEY_RECOVERY_IDS.length} matches)`);
  console.log(`  Index items: ${index.items.length}`);
  console.log(`  fifa-candidate-found: ${summary["fifa-candidate-found"]}`);
  console.log(`  manual-search-required: ${summary["manual-search-required"]}`);
  console.log(`  no-indexed-fifa-candidate: ${summary["no-indexed-fifa-candidate"]}`);
  console.log(`  discovery-error: ${summary["discovery-error"]}`);
  console.log(`  human-verified: ${summary["human-verified"]}`);
  console.log(`  human-rejected: ${summary["human-rejected"]}`);

  for (const result of results) {
    const suffix = result.matchUrl ? ` → ${result.matchUrl}` : result.notes ? ` (${result.notes})` : "";
    console.log(`  ${result.canonicalMatchId}: ${result.status}${suffix}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
