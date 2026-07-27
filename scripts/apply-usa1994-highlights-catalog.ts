#!/usr/bin/env node
/**
 * Applies the manually curated USA 1994 official highlights catalog
 * onto canonical match records (highlightSources only — never touches
 * full-match replaySources / preferredSourceId).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { usa1994Matches } from "../lib/archive/matches/usa1994";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { applyUsa1994HighlightsCatalogToArchive } from "../lib/archive/usa1994-highlights-apply";
import { USA_1994_HIGHLIGHTS_CATALOG } from "../lib/archive/usa1994-highlights-catalog";
import { getPreferredHighlightSource } from "../lib/archive/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VERIFIED_AT = new Date().toISOString();

function main() {
  if (USA_1994_HIGHLIGHTS_CATALOG.length === 0) {
    console.error(
      "USA_1994_HIGHLIGHTS_CATALOG is empty — add curated FIFA highlight URLs first."
    );
    process.exit(1);
  }

  const { matches, mappings } = applyUsa1994HighlightsCatalogToArchive(
    usa1994Matches,
    VERIFIED_AT
  );

  const outPath = path.join(ROOT, "lib/archive/matches/usa1994.ts");
  fs.writeFileSync(
    outPath,
    serializeCanonicalMatches("usa1994Matches", matches)
  );

  const withHighlights = matches.filter((m) => getPreferredHighlightSource(m));
  console.log(
    `Applied ${mappings.length} USA 1994 highlight URLs → ${withHighlights.length} matches with production highlights.`
  );
  console.log(`Wrote ${outPath}`);
}

main();
