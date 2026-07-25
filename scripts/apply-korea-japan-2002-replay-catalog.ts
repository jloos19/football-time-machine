#!/usr/bin/env node
/**
 * Applies the manually curated Korea/Japan 2002 Complete Tournament replay catalog
 * to the production archive. Does not alter Journey membership, routing, or editorial.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { koreaJapan2002Matches } from "../lib/archive/matches/koreaJapan2002";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { applyKoreaJapan2002ReplayCatalogToArchive } from "../lib/archive/koreaJapan2002-replay-apply";
import { KOREA_JAPAN_2002_REPLAY_CATALOG } from "../lib/archive/koreaJapan2002-replay-catalog";
import {
  getPreferredSource,
  isProductionReadySource,
} from "../lib/archive/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VERIFIED_AT = new Date().toISOString();

async function main() {
  const { matches, mappings } = applyKoreaJapan2002ReplayCatalogToArchive(
    koreaJapan2002Matches,
    VERIFIED_AT
  );

  if (mappings.length !== KOREA_JAPAN_2002_REPLAY_CATALOG.length) {
    throw new Error(
      `Expected ${KOREA_JAPAN_2002_REPLAY_CATALOG.length} catalog mappings, got ${mappings.length}`
    );
  }

  const urls = mappings.map((m) => m.entry.url);
  if (new Set(urls).size !== urls.length) {
    throw new Error("Catalog contains duplicate replay URLs.");
  }

  const missing: string[] = [];
  for (const match of matches) {
    const preferred = getPreferredSource(match);
    if (!preferred || !isProductionReadySource(preferred)) {
      missing.push(
        `${match.canonicalMatchId} (${match.homeTeam} vs ${match.awayTeam})`
      );
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing production replay links:\n${missing.join("\n")}`);
  }

  fs.writeFileSync(
    path.join(ROOT, "lib/archive/matches/koreaJapan2002.ts"),
    serializeCanonicalMatches("koreaJapan2002Matches", matches)
  );

  const fifaCount = mappings.filter((m) => m.entry.provider === "FIFA").length;
  const dmCount = mappings.filter((m) => m.entry.provider === "Dailymotion").length;
  const liveFifa = matches.filter(
    (m) => getPreferredSource(m)?.provider === "FIFA"
  ).length;
  const liveDm = matches.filter(
    (m) => getPreferredSource(m)?.provider === "Dailymotion"
  ).length;

  console.log(`Applied ${mappings.length} Korea/Japan 2002 catalog mappings.`);
  console.log(`Catalog FIFA / Dailymotion: ${fifaCount} / ${dmCount}`);
  console.log(`Live preferred FIFA / Dailymotion: ${liveFifa} / ${liveDm}`);
  console.log(`Matches: ${matches.length}`);
  console.log(`Unique replay URLs: ${new Set(urls).size}`);
  console.log(`Missing links: ${missing.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
