import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { Window } from "happy-dom";
import { Hero } from "@/components/home/Hero";
import { HeroArchiveSequence } from "@/components/home/HeroArchiveSequence";
import { PosterShelf } from "@/components/home/PosterShelf";
import { SiteNav } from "@/components/home/SiteNav";
import { WorldCupPoster } from "@/components/home/WorldCupPoster";
import { worldCupPosters } from "@/data/worldCupPosters";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  HERO_ARCHIVE_CROSSFADE_MS,
  HERO_ARCHIVE_FIRST,
  HERO_ARCHIVE_HOLD_MS,
  HERO_ARCHIVE_IMAGES,
  HOME_COLLECTIONS,
  MENS_WORLD_CUPS_COLLECTION,
  MENS_WORLD_CUPS_SECTION_ID,
  WORLD_CUPS_NAV_LABEL,
  buildHomeHeroCta,
  consumeScrollToMensWorldCups,
  formatHomeContinueDetail,
  peekScrollToMensWorldCups,
  requestScrollToMensWorldCups,
  resolveHomeContinueResume,
  scrollToMensWorldCups,
} from "@/lib/home";
import { getExperienceByRoute } from "@/lib/experiences";
import { getSeasonMatchTotal } from "@/lib/progress";

function installDom(options?: { reducedMotion?: boolean }) {
  const window = new Window({ url: "https://example.test/" });
  const g = globalThis as typeof globalThis & {
    window?: Window;
    document?: Document;
    HTMLElement?: typeof HTMLElement;
    Node?: typeof Node;
    MutationObserver?: typeof MutationObserver;
    matchMedia?: typeof window.matchMedia;
  };
  const previous = {
    window: g.window,
    document: g.document,
    HTMLElement: g.HTMLElement,
    Node: g.Node,
    MutationObserver: g.MutationObserver,
    matchMedia: g.matchMedia,
  };

  const reducedMotion = options?.reducedMotion ?? false;
  window.matchMedia = ((query: string) => {
    const matches =
      query.includes("prefers-reduced-motion") &&
      query.includes("reduce") &&
      reducedMotion;
    return {
      matches,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    };
  }) as typeof window.matchMedia;

  g.window = window as unknown as Window;
  g.document = window.document as unknown as Document;
  g.HTMLElement = window.HTMLElement as unknown as typeof HTMLElement;
  g.Node = window.Node as unknown as typeof Node;
  g.MutationObserver =
    window.MutationObserver as unknown as typeof MutationObserver;
  g.matchMedia = window.matchMedia;

  return {
    window,
    restore() {
      g.window = previous.window;
      g.document = previous.document;
      g.HTMLElement = previous.HTMLElement;
      g.Node = previous.Node;
      g.MutationObserver = previous.MutationObserver;
      g.matchMedia = previous.matchMedia;
      try {
        window.document.body.innerHTML = "";
      } catch {
        // ignore
      }
    },
  };
}

function renderHero() {
  return renderToStaticMarkup(
    createElement(Hero, {
      onBeginJourney: () => undefined,
      onContinueWatching: () => undefined,
    })
  );
}

function extractArchiveRegion(html: string): string {
  const start = html.indexOf('data-hero-archive');
  assert.ok(start >= 0, "hero archive region missing");
  const asideStart = html.lastIndexOf("<aside", start);
  assert.ok(asideStart >= 0, "hero archive aside missing");
  const end = html.indexOf("</aside>", asideStart);
  assert.ok(end >= 0, "hero archive aside unclosed");
  return html.slice(asideStart, end + "</aside>".length);
}

describe("homepage hero copy and CTA", () => {
  it("renders the emotional tagline and product explanation", () => {
    const html = renderHero();
    assert.match(html, /You know who won\./);
    assert.match(html, /Now discover why it mattered\./);
    assert.match(
      html,
      /Watch football history unfold one match at a time\./
    );
  });

  it("always renders a stable CTA element with Begin Your Journey by default", () => {
    const begin = buildHomeHeroCta({ hasHydratedProgress: false });
    assert.equal(begin.kind, "begin");
    assert.equal(begin.label, "Begin Your Journey");
    assert.match(begin.detail, /Start with USA/);

    const html = renderHero();
    assert.match(html, /hero__cta/);
    assert.match(html, /Begin Your Journey/);
    assert.match(html, /Start with USA/);
    assert.match(html, /data-cta-kind="begin"/);
  });

  it("updates CTA to Continue Watching after saved progress hydrates", () => {
    const story = getExperienceByRoute("france-1998", "story")!;
    const continueCta = buildHomeHeroCta({
      hasHydratedProgress: true,
      resume: {
        tournamentId: "france-1998",
        experience: story,
        detail: "France ’98 · Match 12 of 36",
      },
    });
    assert.equal(continueCta.kind, "continue");
    assert.equal(continueCta.label, "Continue Watching");
    assert.equal(continueCta.detail, "France ’98 · Match 12 of 36");
  });

  it("keeps the primary CTA as the only match-starting action in the hero", () => {
    const html = renderHero();
    const buttonMatches = html.match(/<button\b/g) ?? [];
    assert.equal(buttonMatches.length, 1);
    assert.match(html, /hero__cta/);
    assert.doesNotMatch(html, /View Match/);
  });
});

describe("homepage hero archive sequence (spoiler-safe)", () => {
  it("does not render Featured Match or Brazil–Italy final copy", () => {
    const html = renderHero();
    assert.doesNotMatch(html, /Featured Match/);
    assert.doesNotMatch(html, /Brazil vs Italy/);
    assert.doesNotMatch(html, /Rose Bowl/);
    assert.doesNotMatch(html, /July 17, 1994/);
    assert.doesNotMatch(
      html,
      /A tournament, and an era, decided from twelve yards/
    );
    assert.doesNotMatch(html, /View Match/);
    assert.doesNotMatch(html, /featured-match/);
  });

  it("renders the archive container without team, stage, score, or outcome spoilers", () => {
    const html = renderHero();
    const archive = extractArchiveRegion(html);

    assert.match(html, /data-hero-archive/);
    assert.match(html, /hero-archive__stage/);
    // Visible copy only — strip attributes so poster file paths are ignored.
    const visible = archive
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    assert.equal(visible, "");
    assert.doesNotMatch(archive, /Brazil vs Italy|Featured Match|View Match|Rose Bowl/);
    assert.doesNotMatch(archive, /\bFinal\b|\bSemi-?final\b/i);
    assert.doesNotMatch(archive, /\b\d+\s*[–\-]\s*\d+\b/);
    assert.doesNotMatch(archive, /\b(won|champion|score|result|trophy)\b/i);
  });

  it("uses a deterministic first image for SSR and initial client render", () => {
    assert.equal(HERO_ARCHIVE_FIRST.src, "/hero-archive/empty-stands.jpg");
    assert.equal(HERO_ARCHIVE_IMAGES[0]?.id, HERO_ARCHIVE_FIRST.id);

    const html = renderHero();
    assert.match(html, /data-active-index="0"/);
    assert.match(
      html,
      new RegExp(
        `data-archive-id="${HERO_ARCHIVE_FIRST.id}"[\\s\\S]*?is-active|is-active[\\s\\S]*?data-archive-id="${HERO_ARCHIVE_FIRST.id}"`
      )
    );
    assert.match(html, new RegExp(`src="${HERO_ARCHIVE_FIRST.src}"`));
  });

  it("keeps a stable slide DOM for every manifest image", () => {
    const html = renderHero();
    for (const image of HERO_ARCHIVE_IMAGES) {
      assert.match(html, new RegExp(`data-archive-id="${image.id}"`));
      assert.match(html, new RegExp(`src="${image.src}"`));
    }
    assert.equal(
      (html.match(/hero-archive__slide/g) ?? []).length,
      HERO_ARCHIVE_IMAGES.length
    );
  });

  it("marks archive imagery decorative and does not expose outcome-laden alt text", () => {
    const html = renderHero();
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /alt=""/);
    for (const image of HERO_ARCHIVE_IMAGES) {
      assert.doesNotMatch(image.alt, /won|finalist|champion|score|result/i);
      assert.doesNotMatch(image.alt, /Brazil|Italy|Baggio/i);
    }
  });
});

describe("homepage hero archive rotation behavior", { concurrency: false }, () => {
  let dom: ReturnType<typeof installDom> | null = null;
  let root: ReturnType<typeof import("react-dom/client").createRoot> | null =
    null;

  afterEach(async () => {
    if (root) {
      const { flushSync } = await import("react-dom");
      flushSync(() => {
        root?.unmount();
      });
      root = null;
    }
    await new Promise((r) => setTimeout(r, 20));
    dom?.restore();
    dom = null;
  });

  it("keeps motion off and index 0 until client effects run (SSR contract)", () => {
    const html = renderToStaticMarkup(createElement(HeroArchiveSequence));
    assert.match(html, /data-active-index="0"/);
    assert.match(html, /data-motion="off"/);
    assert.ok(HERO_ARCHIVE_HOLD_MS >= 15_000 && HERO_ARCHIVE_HOLD_MS <= 20_000);
  });

  it("enables motion after mount when reduced-motion is not preferred", async () => {
    dom = installDom({ reducedMotion: false });
    const { createRoot } = await import("react-dom/client");
    const { flushSync } = await import("react-dom");
    const rootEl = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(rootEl);
    root = createRoot(rootEl as unknown as Element);

    flushSync(() => {
      root!.render(createElement(HeroArchiveSequence));
    });

    const aside = rootEl.querySelector("[data-hero-archive]");
    assert.ok(aside);
    assert.equal(aside.getAttribute("data-active-index"), "0");

    await new Promise((r) => setTimeout(r, 40));
    assert.equal(aside.getAttribute("data-motion"), "on");
    assert.equal(aside.getAttribute("data-active-index"), "0");
  });

  it("uses a static first image under prefers-reduced-motion", async () => {
    dom = installDom({ reducedMotion: true });
    const { createRoot } = await import("react-dom/client");
    const { flushSync } = await import("react-dom");
    const rootEl = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(rootEl);
    root = createRoot(rootEl as unknown as Element);

    flushSync(() => {
      root!.render(createElement(HeroArchiveSequence));
    });
    await new Promise((r) => setTimeout(r, 40));

    const aside = rootEl.querySelector("[data-hero-archive]");
    assert.ok(aside);
    assert.equal(aside.getAttribute("data-motion"), "off");
    assert.equal(aside.getAttribute("data-active-index"), "0");
  });
});

describe("homepage hero archive visibility", () => {
  function readHomeCss(): string {
    const { readFileSync } = require("node:fs") as typeof import("node:fs");
    const { join } = require("node:path") as typeof import("node:path");
    return readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  }

  function extractRule(
    css: string,
    selector: string,
    options?: { preferContaining?: RegExp }
  ): string {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "gm");
    const blocks: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = re.exec(css)) !== null) {
      blocks.push(match[1]!);
    }
    assert.ok(blocks.length > 0, `missing CSS rule for ${selector}`);
    if (options?.preferContaining) {
      const preferred = blocks.find((block) =>
        options.preferContaining!.test(block)
      );
      assert.ok(
        preferred,
        `no ${selector} rule matching ${options.preferContaining}`
      );
      return preferred;
    }
    return blocks[0]!;
  }

  function parseOpacity(declarationBlock: string): number {
    const match = declarationBlock.match(/opacity:\s*([0-9.]+)/);
    assert.ok(match, "opacity declaration missing");
    return Number(match[1]);
  }

  it("does not give the archive container a solid black background", () => {
    const css = readHomeCss();
    const archive = extractRule(css, ".hero-archive", {
      preferContaining: /background:\s*transparent/,
    });
    const stage = extractRule(css, ".hero-archive__stage", {
      preferContaining: /mask-image:/,
    });
    assert.match(archive, /background:\s*transparent/);
    assert.match(stage, /background:\s*transparent/);
    assert.doesNotMatch(archive, /background:\s*(#000|#080808|rgb\(0,\s*0,\s*0\))/i);
    assert.doesNotMatch(css, /\.hero-archive__mask\s*\{/);
    assert.doesNotMatch(css, /\.hero-archive__feather\s*\{/);
  });

  it("keeps active image opacity at or above 0.6 with a single filter treatment", () => {
    const css = readHomeCss();
    const image = extractRule(css, ".hero-archive__image", {
      preferContaining: /brightness\(/,
    });
    assert.ok(parseOpacity(image) >= 0.6);
    assert.match(
      image,
      /filter:\s*grayscale\([^)]+\)\s+sepia\([^)]+\)\s+saturate\([^)]+\)\s+contrast\([^)]+\)\s+brightness\([^)]+\)/
    );
    const brightness = image.match(/brightness\(([0-9.]+)\)/);
    assert.ok(brightness);
    assert.ok(Number(brightness[1]) >= 0.7);
  });

  it("fades all image edges — center stays fully opaque in the mask", () => {
    const css = readHomeCss();
    const stage = extractRule(css, ".hero-archive__stage", {
      preferContaining: /mask-image:/,
    });
    assert.match(stage, /mask-image:/);
    assert.match(stage, /#000\s+28%/);
    assert.match(stage, /#000\s+78%/);
    assert.match(stage, /transparent\s+100%/);
    assert.doesNotMatch(css, /\.hero-archive__mask[\s\S]*rgba\(8,\s*8,\s*8,\s*0\.9/);
  });

  it("sizes the desktop archive as a wide cinematic frame, not a poster card", () => {
    const css = readHomeCss();
    const archive = extractRule(css, ".hero-archive", {
      preferContaining: /aspect-ratio:\s*16\s*\/\s*9/,
    });
    assert.match(archive, /width:\s*clamp\(460px,\s*36vw,\s*650px\)/);
    assert.match(archive, /aspect-ratio:\s*16\s*\/\s*9/);
    assert.match(archive, /max-height:\s*430px/);
    assert.match(archive, /background:\s*transparent/);
    assert.match(archive, /border:\s*none/);
    assert.match(archive, /box-shadow:\s*none/);
  });

  it("raises mobile opacity instead of darkening into a black block", () => {
    const css = readHomeCss();
    const mobileBlock = css.match(
      /@media \(max-width: 650px\)\s*\{([\s\S]*?)\n\}\n\n@media/
    );
    assert.ok(mobileBlock);
    const mobileImage = mobileBlock[1]!.match(
      /\.hero-archive__image\s*\{([^}]*)\}/
    );
    assert.ok(mobileImage);
    assert.ok(parseOpacity(mobileImage[1]!) >= 0.6);
  });

  it("crossfades with a stable container and overlapping slide opacities", () => {
    assert.ok(
      HERO_ARCHIVE_CROSSFADE_MS >= 1_800 && HERO_ARCHIVE_CROSSFADE_MS <= 2_200
    );
    const css = readHomeCss();
    const slide = extractRule(css, ".hero-archive__slide", {
      preferContaining: /opacity:\s*0/,
    });
    const active = extractRule(css, ".hero-archive__slide.is-active", {
      preferContaining: /opacity:\s*1/,
    });
    assert.match(slide, /opacity:\s*0/);
    assert.match(active, /opacity:\s*1/);
    assert.match(
      slide,
      /transition:\s*opacity\s+var\(--hero-archive-crossfade-ms/
    );

    const html = renderToStaticMarkup(createElement(HeroArchiveSequence));
    const activeSlides = (html.match(/hero-archive__slide is-active/g) ?? [])
      .length;
    assert.equal(activeSlides, 1);
    assert.match(html, /data-hero-archive-glow/);
    assert.doesNotMatch(html, /hero-archive__mask/);
    assert.doesNotMatch(html, /hero-archive__feather/);
  });

  it("renders one visible static image under reduced motion with the same treatment", async () => {
    const css = readHomeCss();
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
    assert.match(css, /\.hero-archive__image--drift[\s\S]*?animation:\s*none/);

    const dom = installDom({ reducedMotion: true });
    try {
      const { createRoot } = await import("react-dom/client");
      const { flushSync } = await import("react-dom");
      const rootEl = dom.window.document.createElement("div");
      dom.window.document.body.appendChild(rootEl);
      const root = createRoot(rootEl as unknown as Element);
      flushSync(() => {
        root.render(createElement(HeroArchiveSequence));
      });
      await new Promise((r) => setTimeout(r, 40));

      const aside = rootEl.querySelector("[data-hero-archive]");
      assert.ok(aside);
      assert.equal(aside.getAttribute("data-motion"), "off");
      assert.equal(aside.getAttribute("data-active-index"), "0");
      const active = aside.querySelector(".hero-archive__slide.is-active img");
      assert.ok(active);
      assert.equal(
        active.getAttribute("src"),
        HERO_ARCHIVE_FIRST.src
      );
      flushSync(() => root.unmount());
    } finally {
      dom.restore();
    }
  });

  it("keeps archive copy free of spoiler-specific text", () => {
    for (const image of HERO_ARCHIVE_IMAGES) {
      assert.doesNotMatch(image.alt, /won|finalist|champion|score|result|trophy/i);
      assert.doesNotMatch(image.alt, /Brazil vs|Italy|Baggio|penalty/i);
    }
    const html = renderHero();
    const archive = extractArchiveRegion(html);
    assert.doesNotMatch(archive, /Featured Match|View Match|Rose Bowl/);
    assert.doesNotMatch(archive, /\bFinal\b|\bSemi-?final\b/i);
  });

  it("uses wide photographic archive assets — never tournament poster covers", () => {
    const srcs = HERO_ARCHIVE_IMAGES.map((image) => image.src);
    assert.ok(srcs.length >= 6 && srcs.length <= 8);
    assert.ok(srcs.every((src) => src.startsWith("/hero-archive/")));
    assert.ok(srcs.every((src) => !src.includes("/posters/")));
    assert.ok(srcs.includes("/hero-archive/empty-stands.jpg"));
    assert.ok(srcs.includes("/hero-archive/kickoff-tunnel.jpg"));
    assert.ok(srcs.includes("/hero-archive/match-ball.jpg"));
    for (const image of HERO_ARCHIVE_IMAGES) {
      assert.doesNotMatch(image.id, /poster/i);
      assert.doesNotMatch(image.alt, /poster|tournament logo|world cup poster/i);
      assert.doesNotMatch(image.alt, /\b19\d{2}\b|\b20\d{2}\b/);
    }
  });
});

describe("homepage World Cups collection labeling", () => {
  it("uses Men's World Cups as the homepage shelf heading", () => {
    assert.equal(MENS_WORLD_CUPS_COLLECTION.heading, "Men's World Cups");
    assert.equal(MENS_WORLD_CUPS_COLLECTION.id, "mens-world-cups");

    const html = renderToStaticMarkup(
      createElement(PosterShelf, {
        onSelectSeason: () => undefined,
      })
    );
    assert.match(
      html,
      /poster-shelf__title[^>]*>Men(?:'|&#x27;)s World Cups</
    );
    assert.match(html, /data-collection-id="mens-world-cups"/);
    assert.match(html, new RegExp(`id="${MENS_WORLD_CUPS_SECTION_ID}"`));
    assert.doesNotMatch(
      html,
      /poster-shelf__title[^>]*>World Cups</
    );
  });

  it("keeps top navigation labeled World Cups", () => {
    assert.equal(WORLD_CUPS_NAV_LABEL, "World Cups");

    const html = renderToStaticMarkup(
      createElement(SiteNav, {
        onWorldCups: () => undefined,
        onScrollToArchive: () => undefined,
      })
    );
    assert.match(html, />World Cups</);
    assert.doesNotMatch(html, /Men's World Cups/);
  });

  it("prepares the collection model for men's and women's World Cups", () => {
    assert.ok(HOME_COLLECTIONS.some((c) => c.id === "mens-world-cups"));
    assert.equal(
      HOME_COLLECTIONS.some((c) => c.id === "womens-world-cups"),
      false,
      "Women's World Cups placeholders must not ship yet"
    );
    assert.deepEqual(
      [...MENS_WORLD_CUPS_COLLECTION.seasonIds],
      worldCupPosters.map((poster) => poster.seasonId)
    );
  });
});

describe("WORLD CUPS navigation scrolls to Men's World Cups", () => {
  afterEach(() => {
    // Clear any leftover pending scroll between tests.
    consumeScrollToMensWorldCups();
  });

  it("exposes a pending-scroll handshake for cross-route WORLD CUPS clicks", () => {
    assert.equal(peekScrollToMensWorldCups(), false);
    requestScrollToMensWorldCups();
    assert.equal(peekScrollToMensWorldCups(), true);
    assert.equal(consumeScrollToMensWorldCups(), true);
    assert.equal(peekScrollToMensWorldCups(), false);
    assert.equal(consumeScrollToMensWorldCups(), false);
  });

  it("scrolls the Men's World Cups section into view", () => {
    const { restore } = installDom();
    try {
      const section = document.createElement("section");
      section.id = MENS_WORLD_CUPS_SECTION_ID;
      let scrolled = false;
      section.scrollIntoView = ((..._args: unknown[]) => {
        scrolled = true;
      }) as typeof section.scrollIntoView;
      document.body.appendChild(section);

      assert.equal(scrollToMensWorldCups("smooth"), true);
      assert.equal(scrolled, true);
    } finally {
      restore();
    }
  });

  it("wires homepage WORLD CUPS to scroll, not a collection page", () => {
    const root = process.cwd();
    const machine = readFileSync(
      join(root, "components/FootballTimeMachine.tsx"),
      "utf8"
    );
    const scrollToTop = readFileSync(
      join(root, "components/ScrollToTop.tsx"),
      "utf8"
    );
    const homePage = readFileSync(
      join(root, "components/home/HomePage.tsx"),
      "utf8"
    );
    const css = readFileSync(join(root, "app/globals.css"), "utf8");

    assert.match(machine, /function navigateToMensWorldCups/);
    assert.match(machine, /onNavigateToWorldCups=\{navigateToMensWorldCups\}/);
    assert.match(machine, /requestScrollToMensWorldCups\(\)/);
    assert.match(machine, /scrollToMensWorldCups\("smooth"\)/);
    assert.doesNotMatch(machine, /type:\s*["']collection["']/);
    assert.doesNotMatch(machine, /COLLECTION ONE/);
    assert.doesNotMatch(machine, /setScreen\(\{\s*type:\s*["']collection["']\s*\}\)/);

    assert.match(scrollToTop, /consumeScrollToMensWorldCups\(\)/);
    assert.match(scrollToTop, /scrollToMensWorldCups\("smooth"\)/);
    assert.match(homePage, /MENS_WORLD_CUPS_SECTION_ID/);
    assert.match(css, /#mens-world-cups\s*\{[^}]*scroll-margin-top:/s);
  });

  it("replaces legacy /world-cups without stacking history", () => {
    const machine = readFileSync(
      join(process.cwd(), "components/FootballTimeMachine.tsx"),
      "utf8"
    );
    assert.match(
      machine,
      /router\.replace\(\s*["']\/["']\s*,\s*\{\s*scroll:\s*false\s*\}\s*\)/
    );
    assert.match(machine, /pathname === ["']\/world-cups["']/);
  });
});

describe("homepage tournament cards", () => {
  it("marks available tournaments interactive and coming-soon clearly", () => {
    const usa = worldCupPosters.find((p) => p.seasonId === "usa-1994")!;
    const korea = worldCupPosters.find((p) => p.seasonId === "korea-japan-2002")!;

    const availableHtml = renderToStaticMarkup(
      createElement(WorldCupPoster, {
        poster: usa,
        completed: 0,
        matchTotal: getSeasonMatchTotal("usa-1994"),
        onSelect: () => undefined,
      })
    );
    assert.doesNotMatch(availableHtml, /disabled/);
    assert.match(availableHtml, /0 of 32 matches/);
    assert.match(availableHtml, /Explore Tournament/);
    assert.doesNotMatch(availableHtml, /0 of 0/);

    const koreaHtml = renderToStaticMarkup(
      createElement(WorldCupPoster, {
        poster: korea,
        completed: 0,
        matchTotal: getSeasonMatchTotal("korea-japan-2002"),
        onSelect: () => undefined,
      })
    );
    assert.doesNotMatch(koreaHtml, /disabled/);
    assert.match(koreaHtml, /0 of 36 matches/);
    assert.match(koreaHtml, /Explore Tournament/);
    assert.doesNotMatch(koreaHtml, /Coming Soon/);
  });

  it("shows correct USA ’94 and France ’98 progress counts", () => {
    const usa = worldCupPosters.find((p) => p.seasonId === "usa-1994")!;
    const france = worldCupPosters.find((p) => p.seasonId === "france-1998")!;

    const usaHtml = renderToStaticMarkup(
      createElement(WorldCupPoster, {
        poster: usa,
        completed: 5,
        matchTotal: 32,
        onSelect: () => undefined,
      })
    );
    assert.match(usaHtml, /5 of 32 matches/);

    const franceHtml = renderToStaticMarkup(
      createElement(WorldCupPoster, {
        poster: france,
        completed: 12,
        matchTotal: 36,
        onSelect: () => undefined,
      })
    );
    assert.match(franceHtml, /12 of 36 matches/);
  });

  it("exposes explore action for keyboard focus as well as hover", () => {
    const usa = worldCupPosters.find((p) => p.seasonId === "usa-1994")!;
    const html = renderToStaticMarkup(
      createElement(WorldCupPoster, {
        poster: usa,
        completed: 0,
        matchTotal: 32,
        onSelect: () => undefined,
      })
    );
    assert.match(html, /world-cup-poster__explore/);
    assert.match(html, /Explore Tournament/);
  });
});

describe("homepage continue detail formatting", () => {
  it("formats resume context using story match ordinals", () => {
    const story = getExperienceByRoute("france-1998", "story")!;
    const completed = new Set(story.canonicalMatchIds.slice(0, 11));
    const detail = formatHomeContinueDetail(
      "france-1998",
      story,
      completed,
      null
    );
    assert.equal(detail, "France ’98 · Match 12 of 36");
  });
});

describe("homepage hydration safety", { concurrency: false }, () => {
  let dom: ReturnType<typeof installDom> | null = null;
  let consoleError: ReturnType<typeof mock.method> | null = null;
  let hydratedRoot: ReturnType<typeof hydrateRoot> | null = null;
  const hydrationErrors: string[] = [];

  beforeEach(() => {
    if (typeof globalThis.localStorage === "undefined") {
      const store = new Map<string, string>();
      globalThis.localStorage = {
        getItem(key: string) {
          return store.get(key) ?? null;
        },
        setItem(key: string, value: string) {
          store.set(key, value);
        },
        removeItem(key: string) {
          store.delete(key);
        },
        clear() {
          store.clear();
        },
        key() {
          return null;
        },
        get length() {
          return store.size;
        },
      };
    } else {
      localStorage.clear();
    }

    dom = installDom();
    hydrationErrors.length = 0;
    consoleError = mock.method(console, "error", (...args: unknown[]) => {
      const message = args.map(String).join(" ");
      if (
        /Hydration failed|didn't match|server rendered HTML/i.test(message)
      ) {
        hydrationErrors.push(message);
      }
    });
  });

  afterEach(async () => {
    if (hydratedRoot) {
      const { flushSync } = await import("react-dom");
      flushSync(() => {
        hydratedRoot?.unmount();
      });
      hydratedRoot = null;
    }
    consoleError?.mock.restore();
    await new Promise((r) => setTimeout(r, 20));
    dom?.restore();
    dom = null;
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  });

  it("hydrates the hero without mismatch warnings", async () => {
    assert.ok(dom);
    const markup = renderHero();
    dom.window.document.body.innerHTML = `<div id="root">${markup}</div>`;
    const rootEl = dom.window.document.getElementById("root");
    assert.ok(rootEl);

    await new Promise<void>((resolve, reject) => {
      try {
        hydratedRoot = hydrateRoot(
          rootEl as unknown as Element,
          createElement(Hero, {
            onBeginJourney: () => undefined,
            onContinueWatching: () => undefined,
          })
        );
        setTimeout(() => resolve(), 40);
      } catch (error) {
        reject(error);
      }
    });

    assert.deepEqual(hydrationErrors, []);
    assert.match(dom.window.document.body.innerHTML, /hero__cta/);
    assert.match(dom.window.document.body.innerHTML, /data-hero-archive/);
    assert.match(dom.window.document.body.innerHTML, /data-active-index="0"/);
    assert.match(
      dom.window.document.body.innerHTML,
      /Watch football history unfold one match at a time\./
    );
  });

  it("does not read resume storage during the initial CTA build", () => {
    const begin = buildHomeHeroCta({ hasHydratedProgress: false });
    assert.equal(begin.kind, "begin");
    assert.equal(typeof resolveHomeContinueResume, "function");
  });
});

describe("homepage reduced motion CSS contract", () => {
  it("disables nonessential hero motion under prefers-reduced-motion", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const css = readFileSync(
      join(process.cwd(), "app/globals.css"),
      "utf8"
    );
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
    assert.match(css, /\.hero__image/);
    assert.match(css, /\.hero__grain/);
    assert.match(css, /\.hero-archive/);
    assert.match(css, /\.hero-archive__image--drift/);
    assert.match(css, /animation:\s*none\s*!important/);
  });
});

describe("homepage layout overflow contract", () => {
  it("stacks the hero on small viewports without fixed overflow widths", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const css = readFileSync(
      join(process.cwd(), "app/globals.css"),
      "utf8"
    );
    assert.match(css, /@media \(max-width: 650px\)/);
    assert.match(css, /\.hero__layout\s*\{[^}]*grid-template-columns:\s*1fr/s);
    assert.match(css, /\.hero__cta\s*\{[^}]*width:\s*100%/s);

    const mobileBlock = css.match(
      /@media \(max-width: 650px\)\s*\{([\s\S]*?)\n\}\n\n@media/
    );
    assert.ok(mobileBlock);
    assert.match(mobileBlock[1]!, /\.hero-archive\s*\{[^}]*max-width:\s*none/s);
    assert.match(mobileBlock[1]!, /\.hero-archive\s*\{[^}]*width:\s*100%/s);
    assert.doesNotMatch(
      mobileBlock[1]!,
      /\.hero-archive\s*\{[^}]*width:\s*\d{3,}px/s
    );
  });
});

describe("homepage scroll controls", () => {
  it("provides fully intentional World Cup scroll controls", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const css = readFileSync(
      join(process.cwd(), "app/globals.css"),
      "utf8"
    );
    assert.match(css, /\.poster-shelf__scroll/);
    assert.match(css, /border-radius:\s*50%/);
    assert.match(css, /width:\s*40px/);
    assert.match(css, /height:\s*40px/);
  });
});
