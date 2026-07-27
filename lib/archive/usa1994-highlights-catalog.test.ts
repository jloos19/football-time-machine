import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getPreferredHighlightSource,
  getPreferredSource,
  isProductionReadyHighlight,
  isProductionReadySource,
} from "./index";
import { officialHighlightsLabel } from "./highlights-label";
import { usa1994Matches } from "./matches/usa1994";
import {
  applyUsa1994HighlightsCatalogToArchive,
  applyUsa1994HighlightsCatalogSource,
  mapUsa1994HighlightsCatalog,
} from "./usa1994-highlights-apply";
import { USA_1994_HIGHLIGHTS_CATALOG } from "./usa1994-highlights-catalog";
import { resolveHighlights, resolveReplay } from "@/lib/replays";
import type { CanonicalMatch } from "./types";

describe("USA 1994 official highlights catalog", () => {
  it("keeps highlight URLs out of full-match provider selection", () => {
    const base = structuredClone(usa1994Matches[0]!);
    const withHighlights = applyUsa1994HighlightsCatalogSource(
      base,
      {
        url: "https://www.fifa.com/en/watch/highlights-test-url",
        provider: "FIFA",
        packageKind: "highlights",
      },
      "2026-07-26T12:00:00.000Z"
    );

    const preferredFull = getPreferredSource(withHighlights);
    const preferredHighlights = getPreferredHighlightSource(withHighlights);

    assert.ok(preferredFull);
    assert.equal(preferredFull.fullMatch, true);
    assert.notEqual(preferredFull.url, "https://www.fifa.com/en/watch/highlights-test-url");
    assert.ok(preferredHighlights);
    assert.equal(
      preferredHighlights.url,
      "https://www.fifa.com/en/watch/highlights-test-url"
    );
    assert.equal(preferredHighlights.packageKind, "highlights");
    assert.equal(preferredHighlights.officialSource, true);
    assert.equal(isProductionReadyHighlight(preferredHighlights), true);

    const replay = resolveReplay(withHighlights);
    const highlights = resolveHighlights(withHighlights);
    assert.equal(replay?.url, preferredFull.url);
    assert.equal(highlights?.url, preferredHighlights.url);
    assert.equal(highlights?.provider, "FIFA");
    assert.equal(highlights?.label, "Highlights");
    assert.equal(highlights?.official, true);
  });

  it("labels all highlight packages simply as Highlights", () => {
    const base = structuredClone(usa1994Matches[0]!);
    const withHighlights = applyUsa1994HighlightsCatalogSource(
      base,
      {
        url: "https://www.fifa.com/en/watch/extended-highlights-test",
        provider: "FIFA",
        packageKind: "extended-highlights",
      },
      "2026-07-26T12:00:00.000Z"
    );
    const highlights = resolveHighlights(withHighlights);
    assert.equal(highlights?.packageKind, "extended-highlights");
    assert.equal(highlights?.label, "Highlights");
    assert.equal(officialHighlightsLabel("FIFA", "extended-highlights"), "Highlights");
    assert.equal(officialHighlightsLabel("Dailymotion", "highlights"), "Highlights");
    assert.equal(officialHighlightsLabel("YouTube", "highlights"), "Highlights");
  });

  it("maps every catalog entry to exactly one canonical match", () => {
    const mappings = mapUsa1994HighlightsCatalog(
      usa1994Matches as CanonicalMatch[]
    );
    assert.equal(mappings.length, USA_1994_HIGHLIGHTS_CATALOG.length);
    const ids = mappings.map((m) => m.match.canonicalMatchId);
    assert.equal(new Set(ids).size, ids.length, "duplicate match mappings");
  });

  it("has unique highlight URLs in the catalog", () => {
    const urls = USA_1994_HIGHLIGHTS_CATALOG.map((e) => e.url);
    assert.equal(new Set(urls).size, urls.length, "duplicate highlight URLs");
  });

  it("covers all 52 USA 1994 matches with highlights", () => {
    assert.equal(usa1994Matches.length, 52);
    assert.equal(USA_1994_HIGHLIGHTS_CATALOG.length, 52);
  });

  it("applies highlights without overwriting full-match replay data", () => {
    const before = new Map(
      usa1994Matches.map((m) => [
        m.canonicalMatchId,
        {
          preferredSourceId: m.preferredSourceId,
          replaySources: structuredClone(m.replaySources),
        },
      ])
    );

    const { matches, mappings } = applyUsa1994HighlightsCatalogToArchive(
      usa1994Matches as CanonicalMatch[],
      "2026-07-26T12:00:00.000Z"
    );

    assert.equal(mappings.length, USA_1994_HIGHLIGHTS_CATALOG.length);

    for (const match of matches) {
      const prior = before.get(match.canonicalMatchId)!;
      assert.equal(match.preferredSourceId, prior.preferredSourceId);
      assert.deepEqual(match.replaySources, prior.replaySources);
      assert.ok(isProductionReadySource(getPreferredSource(match)!));
    }

    const withHighlights = matches.filter((m) => getPreferredHighlightSource(m));
    assert.equal(withHighlights.length, 52);

    for (const match of withHighlights) {
      const hl = getPreferredHighlightSource(match)!;
      assert.ok(
        hl.provider === "FIFA" ||
          hl.provider === "Dailymotion" ||
          hl.provider === "YouTube"
      );
      assert.equal(hl.officialSource, hl.provider === "FIFA");
      assert.ok(hl.packageKind === "highlights" || hl.packageKind === "extended-highlights");
      assert.equal(resolveHighlights(match)?.label, "Highlights");
    }
  });

  it("leaves full-match preferredSourceId unchanged when applying highlights", () => {
    const base = structuredClone(usa1994Matches[0]!);
    const beforePreferred = base.preferredSourceId;
    const updated = applyUsa1994HighlightsCatalogSource(
      base,
      {
        url: "https://www.fifa.com/en/watch/another-highlights-url",
        provider: "FIFA",
        packageKind: "highlights",
      },
      "2026-07-26T12:00:00.000Z"
    );
    assert.equal(updated.preferredSourceId, beforePreferred);
    assert.ok(updated.preferredHighlightSourceId);
    assert.notEqual(updated.preferredHighlightSourceId, updated.preferredSourceId);
  });
});
