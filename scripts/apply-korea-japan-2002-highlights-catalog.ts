#!/usr/bin/env node
/**
 * Applies the manually curated Korea/Japan 2002 official highlights catalog
 * onto canonical match records (highlightSources only — never touches
 * full-match replaySources / preferredSourceId).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { koreaJapan2002Matches } from "../lib/archive/matches/koreaJapan2002";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { applyKoreaJapan2002HighlightsCatalogToArchive } from "../lib/archive/koreaJapan2002-highlights-apply";
import { KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG } from "../lib/archive/koreaJapan2002-highlights-catalog";
import { getPreferredHighlightSource } from "../lib/archive/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VERIFIED_AT = new Date().toISOString();

function main() {
  if (KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.length === 0) {
    console.error(
      "KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG is empty — add curated FIFA highlight URLs first."
    );
    process.exit(1);
  }

  const beforeFull = new Map(
    koreaJapan2002Matches.map((m) => [
      m.canonicalMatchId,
      {
        preferredSourceId: m.preferredSourceId,
        replayUrls: m.replaySources.map((s) => s.url).join("|"),
      },
    ])
  );

  const { matches, mappings } = applyKoreaJapan2002HighlightsCatalogToArchive(
    koreaJapan2002Matches,
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

  const outPath = path.join(ROOT, "lib/archive/matches/koreaJapan2002.ts");
  fs.writeFileSync(
    outPath,
    serializeCanonicalMatches("koreaJapan2002Matches", matches)
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
  const missing = matches.length - withHighlights.length;

  console.log(
    `Applied ${mappings.length} Korea/Japan 2002 highlight URLs → ${withHighlights.length} matches with production highlights.`
  );
  console.log(
    `Stage split: group ${groupHl}, knockout ${knockoutHl}; subtype: standard ${standard}, extended ${extended}; missing ${missing}.`
  );
  console.log(`Wrote ${outPath}`);
}

main();
