import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  getPreferredHighlightSource,
  getPreferredSource,
  isProductionReadyHighlight,
  isProductionReadySource,
} from "./index";
import { officialHighlightsLabel } from "./highlights-label";
import { koreaJapan2002Matches } from "./matches/koreaJapan2002";
import { usa1994Matches } from "./matches/usa1994";
import { france1998Matches } from "./matches/france1998";
import {
  applyKoreaJapan2002HighlightsCatalogToArchive,
  applyKoreaJapan2002HighlightsCatalogSource,
  mapKoreaJapan2002HighlightsCatalog,
} from "./koreaJapan2002-highlights-apply";
import {
  KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG,
  KOREA_JAPAN_2002_REJECTED_DUPLICATE_HIGHLIGHT_URL,
  PORTUGAL_VS_KOREA_REPUBLIC_CANONICAL_HIGHLIGHT_URL,
} from "./koreaJapan2002-highlights-catalog";
import {
  getPreferredHighlightsForEpisode,
  resolveHighlights,
  resolveReplay,
} from "@/lib/replays";
import type { CanonicalMatch } from "./types";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { OurStoryPage } from "@/components/our-story/OurStoryPage";
import { FeedbackProvider } from "@/components/feedback/FeedbackContext";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import { seasons } from "@/data/seasons";
import {
  getExperienceByRoute,
  resolveExperienceEpisodes,
} from "@/lib/experiences";
describe("Korea/Japan 2002 official highlights catalog", () => {
  it("keeps highlight URLs out of full-match provider selection", () => {
    const base = structuredClone(koreaJapan2002Matches[0]!);
    const withHighlights = applyKoreaJapan2002HighlightsCatalogSource(
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
    const base = structuredClone(koreaJapan2002Matches[0]!);
    const withHighlights = applyKoreaJapan2002HighlightsCatalogSource(
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
  });

  it("maps every catalog entry to exactly one canonical match", () => {
    const mappings = mapKoreaJapan2002HighlightsCatalog(
      koreaJapan2002Matches as CanonicalMatch[]
    );
    assert.equal(mappings.length, KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.length);
    const ids = mappings.map((m) => m.match.canonicalMatchId);
    assert.equal(new Set(ids).size, ids.length, "duplicate match mappings");
  });

  it("has unique highlight URLs in the catalog and rejects the Portugal duplicate", () => {
    const urls = KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.map((e) => e.url);
    assert.equal(new Set(urls).size, urls.length, "duplicate highlight URLs");
    assert.equal(KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.length, 33);
    assert.ok(
      !urls.includes(KOREA_JAPAN_2002_REJECTED_DUPLICATE_HIGHLIGHT_URL)
    );
    assert.ok(urls.includes(PORTUGAL_VS_KOREA_REPUBLIC_CANONICAL_HIGHLIGHT_URL));
  });

  it("covers exactly 33 unique Korea/Japan 2002 matches with the expected stage split", () => {
    assert.equal(koreaJapan2002Matches.length, 64);
    assert.equal(KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.length, 33);

    const byStage = (stage: string) =>
      KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.filter((e) => e.stage === stage)
        .length;

    assert.equal(byStage("Group Stage"), 17);
    assert.equal(byStage("Round of 16"), 8);
    assert.equal(byStage("Quarter-final"), 4);
    assert.equal(byStage("Semi-final"), 2);
    assert.equal(byStage("Third-place play-off"), 1);
    assert.equal(byStage("Final"), 1);

    const knockout = KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.filter(
      (e) => e.stage !== "Group Stage"
    ).length;
    assert.equal(knockout, 16);

    const extended = KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.filter(
      (e) => e.packageKind === "extended-highlights"
    ).length;
    const standard = KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG.filter(
      (e) => e.packageKind === "highlights"
    ).length;
    assert.equal(standard, 29);
    assert.equal(extended, 4);
  });

  it("resolves Portugal vs Korea Republic only to the Extended Highlights URL", () => {
    const mappings = mapKoreaJapan2002HighlightsCatalog(
      koreaJapan2002Matches as CanonicalMatch[]
    );
    const portugalKorea = mappings.find(
      (m) =>
        m.entry.title === "Portugal vs Korea Republic" ||
        (m.match.homeTeam === "Portugal" &&
          m.match.awayTeam === "Korea Republic")
    );
    assert.ok(portugalKorea);
    assert.equal(
      portugalKorea!.entry.url,
      PORTUGAL_VS_KOREA_REPUBLIC_CANONICAL_HIGHLIGHT_URL
    );
    assert.equal(portugalKorea!.entry.packageKind, "extended-highlights");
    assert.notEqual(
      portugalKorea!.entry.url,
      KOREA_JAPAN_2002_REJECTED_DUPLICATE_HIGHLIGHT_URL
    );

    const applied = applyKoreaJapan2002HighlightsCatalogSource(
      structuredClone(portugalKorea!.match),
      portugalKorea!.entry,
      "2026-07-26T12:00:00.000Z"
    );
    const hl = getPreferredHighlightSource(applied)!;
    assert.equal(hl.url, PORTUGAL_VS_KOREA_REPUBLIC_CANONICAL_HIGHLIGHT_URL);
    assert.equal(hl.packageKind, "extended-highlights");
    assert.equal(resolveHighlights(applied)?.label, "Highlights");
  });

  it("applies highlights without overwriting full-match replay data", () => {
    const before = new Map(
      koreaJapan2002Matches.map((m) => [
        m.canonicalMatchId,
        {
          preferredSourceId: m.preferredSourceId,
          replaySources: structuredClone(m.replaySources),
        },
      ])
    );

    const { matches, mappings } = applyKoreaJapan2002HighlightsCatalogToArchive(
      koreaJapan2002Matches as CanonicalMatch[],
      "2026-07-26T12:00:00.000Z"
    );

    assert.equal(mappings.length, 33);

    for (const match of matches) {
      const prior = before.get(match.canonicalMatchId)!;
      assert.equal(match.preferredSourceId, prior.preferredSourceId);
      assert.deepEqual(match.replaySources, prior.replaySources);
      assert.ok(isProductionReadySource(getPreferredSource(match)!));
    }

    const withHighlights = matches.filter((m) => getPreferredHighlightSource(m));
    assert.equal(withHighlights.length, 33);

    const groupWithHl = withHighlights.filter(
      (m) => m.stage === "Group Stage"
    ).length;
    const knockoutWithHl = withHighlights.filter(
      (m) => m.stage !== "Group Stage"
    ).length;
    assert.equal(groupWithHl, 17);
    assert.equal(knockoutWithHl, 16);

    const knockoutTotal = matches.filter(
      (m) => m.stage !== "Group Stage"
    ).length;
    assert.equal(knockoutTotal, 16);
    assert.equal(knockoutTotal - knockoutWithHl, 0);

    const missing = matches.length - withHighlights.length;
    assert.equal(missing, 31);

    const urls = withHighlights.map(
      (m) => getPreferredHighlightSource(m)!.url
    );
    assert.equal(new Set(urls).size, 33);
    assert.ok(!urls.includes(KOREA_JAPAN_2002_REJECTED_DUPLICATE_HIGHLIGHT_URL));

    for (const match of withHighlights) {
      const hl = getPreferredHighlightSource(match)!;
      assert.equal(hl.provider, "FIFA");
      assert.equal(hl.officialSource, true);
      assert.ok(
        hl.packageKind === "highlights" ||
          hl.packageKind === "extended-highlights"
      );
      assert.equal(resolveHighlights(match)?.label, "Highlights");
    }
  });

  it("leaves full-match preferredSourceId unchanged when applying highlights", () => {
    const base = structuredClone(koreaJapan2002Matches[0]!);
    const beforePreferred = base.preferredSourceId;
    const updated = applyKoreaJapan2002HighlightsCatalogSource(
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
    const withHighlights = koreaJapan2002Matches.filter((m) =>
      getPreferredHighlightSource(m)
    );
    assert.equal(withHighlights.length, 33);

    for (const match of withHighlights) {
      const hl = resolveHighlights(match);
      assert.ok(hl);
      assert.equal(hl.label, "Highlights");
      assert.equal(hl.provider, "FIFA");
      assert.ok(resolveReplay(match)?.url);
    }
  });

  it("resolves the same canonical highlight across journey episode lookups", () => {
    const withHighlights = koreaJapan2002Matches.filter((m) =>
      getPreferredHighlightSource(m)
    );
    assert.ok(withHighlights.length >= 1);

    for (const match of withHighlights) {
      const direct = resolveHighlights(match);
      assert.ok(direct);

      const viaComplete = getPreferredHighlightsForEpisode({
        id: match.canonicalMatchId,
        tournamentId: "korea-japan-2002",
        canonicalMatchId: match.canonicalMatchId,
      });
      assert.equal(viaComplete?.url, direct!.url);
      assert.equal(viaComplete?.label, "Highlights");

      if (match.editorial?.journeyEpisodeId) {
        const viaJourney = getPreferredHighlightsForEpisode({
          id: match.editorial.journeyEpisodeId,
          tournamentId: "korea-japan-2002",
          canonicalMatchId: match.canonicalMatchId,
        });
        assert.equal(viaJourney?.url, direct!.url);
        assert.equal(viaJourney?.label, "Highlights");
      }
    }
  });
});

describe("Highlights coverage across tournaments", () => {
  it("USA 1994 has 52/52 Highlights", () => {
    assert.equal(usa1994Matches.length, 52);
    const withHl = usa1994Matches.filter((m) => getPreferredHighlightSource(m));
    assert.equal(withHl.length, 52);
  });

  it("France 1998 has 64/64 Highlights", () => {
    assert.equal(france1998Matches.length, 64);
    const withHl = france1998Matches.filter((m) =>
      getPreferredHighlightSource(m)
    );
    assert.equal(withHl.length, 64);
  });

  it("Korea/Japan 2002 has exactly 33 unique Highlight records after this import", () => {
    assert.equal(koreaJapan2002Matches.length, 64);
    const withHl = koreaJapan2002Matches.filter((m) =>
      getPreferredHighlightSource(m)
    );
    assert.equal(withHl.length, 33);
    const urls = withHl.map((m) => getPreferredHighlightSource(m)!.url);
    assert.equal(new Set(urls).size, 33);
  });

  it("all 2002 knockout matches have Highlights", () => {
    const knockout = koreaJapan2002Matches.filter(
      (m) => m.stage !== "Group Stage"
    );
    assert.equal(knockout.length, 16);
    for (const match of knockout) {
      assert.ok(
        getPreferredHighlightSource(match),
        `missing highlights for ${match.canonicalMatchId}`
      );
    }
  });
});

describe("Highlights user-facing labels and spoiler safety", () => {
  it("Match page CTA wording is Highlights (not Extended / Official FIFA)", () => {
    const modalSource = readFileSync(
      join(process.cwd(), "components/experiences/MatchExperienceModal.tsx"),
      "utf8"
    );
    assert.match(modalSource, /▶ Highlights/);
    assert.match(modalSource, /^\s*Highlights\s*$/m);
    assert.doesNotMatch(modalSource, /▶ Official FIFA Highlights/);
    assert.doesNotMatch(modalSource, /▶ Extended Highlights/);
    assert.doesNotMatch(
      modalSource,
      />\s*Extended Highlights\s*</
    );
    assert.doesNotMatch(
      modalSource,
      />\s*Official FIFA Highlights\s*</
    );
  });

  it("Our Story page includes accurate Full Match/Highlights messaging", () => {
    const html = renderToStaticMarkup(
      createElement(
        FeedbackProvider,
        null,
        createElement(OurStoryPage, {
          onNavigateHome: () => undefined,
          onBrowseArchive: () => undefined,
          onWorldCups: () => undefined,
        })
      )
    );
    assert.match(
      html,
      /Across the growing archive, matches can include both a full replay and a condensed highlights option/
    );
    assert.match(html, /90 minutes or just 9/);
    // Do not claim every match already has both options (2002 is partial).
    assert.doesNotMatch(
      html,
      /Every match includes both a full replay and a condensed highlights option/
    );
  });

  it("pre-click viewing UI does not contain match outcomes", () => {
    const match = koreaJapan2002Matches.find((m) =>
      getPreferredHighlightSource(m)
    )!;
    assert.ok(match);

    const experience = getExperienceByRoute("korea-japan-2002", "every-match");
    assert.ok(experience);
    const episode = resolveExperienceEpisodes(experience).find(
      (ep) => ep.canonicalMatchId === match.canonicalMatchId
    );
    assert.ok(episode);
    const season = seasons.find((s) => s.id === "korea-japan-2002")!;

    const html = renderToStaticMarkup(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: season.name,
        completed: false,
        prev: null,
        next: null,
        standings: null,
        onClose: () => undefined,
        onToggleComplete: () => undefined,
        onOpen: () => undefined,
        onBackToList: () => undefined,
        onBackToExperienceHome: () => undefined,
      })
    );

    assert.match(html, /▶ Full Match/);
    assert.match(html, /▶ Highlights/);
    assert.doesNotMatch(html, /▶ Official FIFA/);
    assert.doesNotMatch(html, /▶ Extended Highlights/);

    // Watch CTAs / button chrome must not reveal scores or outcomes.
    const watchSection = html.match(
      /aria-label="Watch"[\s\S]*?(?=<div class="match-experience__nav")/
    )?.[0];
    assert.ok(watchSection);
    assert.match(watchSection!, /data-watch-kind="full-match"/);
    assert.match(watchSection!, /data-watch-kind="official-highlights"/);
    assert.doesNotMatch(watchSection!, /\b\d-\d\b/);
    assert.doesNotMatch(
      watchSection!,
      /data-watch-kind="[^"]*"[^>]*>[^<]*(winner|champion|eliminated|\d-\d)/i
    );
    // Locked post-match tease may mention "Final score" as sealed copy — that is
    // intentional — but completed outcome UI must remain hidden pre-click.
    assert.doesNotMatch(html, /class="scoreboard"/);
    assert.doesNotMatch(html, /post-report__/);
  });
});
