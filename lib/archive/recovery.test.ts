import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildFifaSearchQueries,
  buildSearchQueries,
  detectProviderFromUrl,
  FRANCE_98_JOURNEY_RECOVERY_IDS,
  isKnockoutStage,
  looksLikeHighlightsTitle,
  matchImportance,
} from "./recovery";
import { parseIso8601Duration } from "./recovery-validate";

describe("recovery search queries", () => {
  it("generates reusable discovery queries for a match", () => {
    const queries = buildSearchQueries("Brazil", "Norway", "Group Stage");
    assert.ok(queries.length >= 7);
    assert.ok(queries[0]?.includes("Brazil vs Norway"));
    assert.ok(queries.some((q) => q.includes("site:plus.fifa.com")));
    assert.ok(queries.some((q) => q.includes("site:fifa.com")));
    assert.ok(queries.some((q) => q.includes("site:youtube.com")));
    assert.ok(queries.some((q) => q.includes("site:dailymotion.com")));
  });

  it("generates FIFA-specific query variants for Brazil vs Netherlands", () => {
    const queries = buildFifaSearchQueries("Brazil", "Netherlands", "Semi-final");
    assert.ok(queries.some((q) => q.includes('site:plus.fifa.com "Brazil v Netherlands" "Full Match Replay"')));
    assert.ok(queries.some((q) => q.includes('site:plus.fifa.com "Brasil v Netherlands"')));
    assert.ok(queries.some((q) => q.includes('site:fifa.com/en/watch Brazil Netherlands 1998')));
    assert.ok(queries.some((q) => q.includes("Semi-finals")));
  });
});

describe("detectProviderFromUrl", () => {
  it("detects providers from URLs", () => {
    assert.equal(
      detectProviderFromUrl("https://www.plus.fifa.com/en/content/example/uuid"),
      "FIFA"
    );
    assert.equal(
      detectProviderFromUrl("https://www.youtube.com/watch?v=abc"),
      "YouTube"
    );
    assert.equal(
      detectProviderFromUrl("https://www.dailymotion.com/video/x9abc"),
      "Dailymotion"
    );
  });
});

describe("match importance", () => {
  it("marks knockout stages correctly", () => {
    assert.equal(isKnockoutStage("Quarter-final"), true);
    assert.equal(isKnockoutStage("Group Stage"), false);
    assert.equal(matchImportance("Semi-final"), "knockout");
    assert.equal(matchImportance("Group Stage"), "group");
  });
});

describe("highlights detection", () => {
  it("flags highlight titles", () => {
    assert.equal(looksLikeHighlightsTitle("Brazil vs Norway Extended Highlights"), true);
    assert.equal(looksLikeHighlightsTitle("Brazil vs Norway Full Match 1998"), false);
  });
});

describe("YouTube duration parsing", () => {
  it("parses ISO 8601 durations", () => {
    assert.equal(parseIso8601Duration("PT1H35M20S"), 5720);
    assert.equal(parseIso8601Duration("PT45M"), 2700);
  });
});

describe("France 98 journey recovery ids", () => {
  it("lists exactly 12 target matches", () => {
    assert.equal(FRANCE_98_JOURNEY_RECOVERY_IDS.length, 12);
    assert.ok(FRANCE_98_JOURNEY_RECOVERY_IDS.includes("france-1998-c04"));
    assert.ok(FRANCE_98_JOURNEY_RECOVERY_IDS.includes("france-1998-c63"));
  });
});
