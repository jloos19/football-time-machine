#!/usr/bin/env node
/**
 * Applies the manually curated France 1998 official highlights catalog
 * onto canonical match records (highlightSources only — never touches
 * full-match replaySources / preferredSourceId).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { france1998Matches } from "../lib/archive/matches/france1998";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { applyFrance1998HighlightsCatalogToArchive } from "../lib/archive/france1998-highlights-apply";
import { FRANCE_1998_HIGHLIGHTS_CATALOG } from "../lib/archive/france1998-highlights-catalog";
import { getPreferredHighlightSource } from "../lib/archive/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VERIFIED_AT = new Date().toISOString();

function main() {
  if (FRANCE_1998_HIGHLIGHTS_CATALOG.length === 0) {
    console.error(
      "FRANCE_1998_HIGHLIGHTS_CATALOG is empty — add curated FIFA highlight URLs first."
    );
    process.exit(1);
  }

  const beforeFull = new Map(
    france1998Matches.map((m) => [
      m.canonicalMatchId,
      {
        preferredSourceId: m.preferredSourceId,
        replayUrls: m.replaySources.map((s) => s.url).join("|"),
      },
    ])
  );

  const { matches, mappings } = applyFrance1998HighlightsCatalogToArchive(
    france1998Matches,
    VERIFIED_AT
  );

  for (const match of matches) {
    const prior = beforeFull.get(match.canonicalMatchId)!;
    if (match.preferredSourceId !== prior.preferredSourceId) {
      throw new Error(
        `Full Match preferredSourceId changed for ${match.canonicalMatchId}`
      );
    }
    const replayUrls = match.replaySources.map((s) => s.url).join("|");
    if (replayUrls !== prior.replayUrls) {
      throw new Error(
        `Full Match replaySources changed for ${match.canonicalMatchId}`
      );
    }
  }

  const outPath = path.join(ROOT, "lib/archive/matches/france1998.ts");
  fs.writeFileSync(
    outPath,
    serializeCanonicalMatches("france1998Matches", matches)
  );

  const withHighlights = matches.filter((m) => getPreferredHighlightSource(m));
  const groupHl = withHighlights.filter((m) => m.stage === "Group Stage").length;
  const knockoutHl = withHighlights.filter(
    (m) => m.stage !== "Group Stage"
  ).length;
  const standard = withHighlights.filter(
    (m) => getPreferredHighlightSource(m)?.packageKind === "highlights"
  ).length;
  const extended = withHighlights.filter(
    (m) =>
      getPreferredHighlightSource(m)?.packageKind === "extended-highlights"
  ).length;

  console.log(
    `Applied ${mappings.length} France 1998 highlight URLs → ${withHighlights.length} matches with production highlights.`
  );
  console.log(
    `Stage split: group ${groupHl}, knockout ${knockoutHl}; subtype: standard ${standard}, extended ${extended}.`
  );
  console.log(`Wrote ${outPath}`);
}

main();
