import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getPreferredHighlightSource,
  getPreferredSource,
  isProductionReadyHighlight,
  isProductionReadySource,
} from "./index";
import { officialHighlightsLabel } from "./highlights-label";
import { france1998Matches } from "./matches/france1998";
import {
  applyFrance1998HighlightsCatalogToArchive,
  applyFrance1998HighlightsCatalogSource,
  mapFrance1998HighlightsCatalog,
} from "./france1998-highlights-apply";
import { FRANCE_1998_HIGHLIGHTS_CATALOG } from "./france1998-highlights-catalog";
import { resolveHighlights, resolveReplay } from "@/lib/replays";
import type { CanonicalMatch } from "./types";

describe("France 1998 official highlights catalog", () => {
  it("keeps highlight URLs out of full-match provider selection", () => {
    const base = structuredClone(france1998Matches[0]!);
    const withHighlights = applyFrance1998HighlightsCatalogSource(
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
    assert.notEqual(
      preferredFull.url,
      "https://www.fifa.com/en/watch/highlights-test-url"
    );
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
    const base = structuredClone(france1998Matches[0]!);
    const withHighlights = applyFrance1998HighlightsCatalogSource(
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
    assert.equal(
      officialHighlightsLabel("FIFA", "extended-highlights"),
      "Highlights"
    );
    assert.equal(officialHighlightsLabel("Dailymotion", "highlights"), "Highlights");
    assert.equal(officialHighlightsLabel("YouTube", "highlights"), "Highlights");
  });

  it("maps every catalog entry to exactly one canonical match", () => {
    const mappings = mapFrance1998HighlightsCatalog(
      france1998Matches as CanonicalMatch[]
    );
    assert.equal(mappings.length, FRANCE_1998_HIGHLIGHTS_CATALOG.length);
    const ids = mappings.map((m) => m.match.canonicalMatchId);
    assert.equal(new Set(ids).size, ids.length, "duplicate match mappings");
  });

  it("has unique highlight URLs in the catalog", () => {
    const urls = FRANCE_1998_HIGHLIGHTS_CATALOG.map((e) => e.url);
    assert.equal(new Set(urls).size, urls.length, "duplicate highlight URLs");
  });

  it("covers all 64 France 1998 matches with the expected stage split", () => {
    assert.equal(france1998Matches.length, 64);
    assert.equal(FRANCE_1998_HIGHLIGHTS_CATALOG.length, 64);

    const byStage = (stage: string) =>
      FRANCE_1998_HIGHLIGHTS_CATALOG.filter((e) => e.stage === stage).length;

    assert.equal(byStage("Group Stage"), 48);
    assert.equal(byStage("Round of 16"), 8);
    assert.equal(byStage("Quarter-final"), 4);
    assert.equal(byStage("Semi-final"), 2);
    assert.equal(byStage("Third-place play-off"), 1);
    assert.equal(byStage("Final"), 1);

    const knockout = FRANCE_1998_HIGHLIGHTS_CATALOG.filter(
      (e) => e.stage !== "Group Stage"
    ).length;
    assert.equal(knockout, 16);

    const extended = FRANCE_1998_HIGHLIGHTS_CATALOG.filter(
      (e) => e.packageKind === "extended-highlights"
    ).length;
    const standard = FRANCE_1998_HIGHLIGHTS_CATALOG.filter(
      (e) => e.packageKind === "highlights"
    ).length;
    assert.equal(standard, 59);
    assert.equal(extended, 5);
  });

  it("applies highlights without overwriting full-match replay data", () => {
    const before = new Map(
      france1998Matches.map((m) => [
        m.canonicalMatchId,
        {
          preferredSourceId: m.preferredSourceId,
          replaySources: structuredClone(m.replaySources),
        },
      ])
    );

    const { matches, mappings } = applyFrance1998HighlightsCatalogToArchive(
      france1998Matches as CanonicalMatch[],
      "2026-07-26T12:00:00.000Z"
    );

    assert.equal(mappings.length, FRANCE_1998_HIGHLIGHTS_CATALOG.length);

    for (const match of matches) {
      const prior = before.get(match.canonicalMatchId)!;
      assert.equal(match.preferredSourceId, prior.preferredSourceId);
      assert.deepEqual(match.replaySources, prior.replaySources);
      assert.ok(isProductionReadySource(getPreferredSource(match)!));
    }

    const withHighlights = matches.filter((m) => getPreferredHighlightSource(m));
    assert.equal(withHighlights.length, 64);

    const groupWithHl = withHighlights.filter(
      (m) => m.stage === "Group Stage"
    ).length;
    const knockoutWithHl = withHighlights.filter(
      (m) => m.stage !== "Group Stage"
    ).length;
    assert.equal(groupWithHl, 48);
    assert.equal(knockoutWithHl, 16);

    const groupTotal = matches.filter((m) => m.stage === "Group Stage").length;
    const knockoutTotal = matches.filter(
      (m) => m.stage !== "Group Stage"
    ).length;
    assert.equal(groupTotal - groupWithHl, 0);
    assert.equal(knockoutTotal - knockoutWithHl, 0);

    for (const match of withHighlights) {
      const hl = getPreferredHighlightSource(match)!;
      assert.ok(
        hl.provider === "FIFA" ||
          hl.provider === "Dailymotion" ||
          hl.provider === "YouTube"
      );
      assert.equal(hl.officialSource, hl.provider === "FIFA");
      assert.ok(
        hl.packageKind === "highlights" ||
          hl.packageKind === "extended-highlights"
      );
      assert.equal(resolveHighlights(match)?.label, "Highlights");
    }
  });

  it("leaves full-match preferredSourceId unchanged when applying highlights", () => {
    const base = structuredClone(france1998Matches[0]!);
    const beforePreferred = base.preferredSourceId;
    const updated = applyFrance1998HighlightsCatalogSource(
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
    assert.notEqual(
      updated.preferredHighlightSourceId,
      updated.preferredSourceId
    );
  });

  it("resolves applied archive highlights with CTA label Highlights", () => {
    const withHighlights = france1998Matches.filter((m) =>
      getPreferredHighlightSource(m)
    );
    assert.equal(withHighlights.length, 64);

    for (const match of withHighlights) {
      const hl = resolveHighlights(match);
      assert.ok(hl);
      assert.equal(hl.label, "Highlights");
      assert.ok(
        hl.provider === "FIFA" ||
          hl.provider === "Dailymotion" ||
          hl.provider === "YouTube"
      );
      assert.ok(resolveReplay(match)?.url);
    }
  });
});
