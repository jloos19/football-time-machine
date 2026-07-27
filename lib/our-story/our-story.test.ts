import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { Window } from "happy-dom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { OurStoryPage } from "@/components/our-story/OurStoryPage";
import { SiteNav } from "@/components/home/SiteNav";
import {
  OUR_STORY_DESCRIPTION,
  OUR_STORY_NAV_LABEL,
  OUR_STORY_PATH,
  OUR_STORY_TITLE,
  buildOurStoryMetadata,
  getArchiveTimeline,
} from "@/lib/our-story";
import { isAppShellPath, parseAppPathname, screenToPath } from "@/lib/experiences/app-routes";
import { FeedbackProvider } from "@/components/feedback/FeedbackContext";
import { FEEDBACK_DESTINATION } from "@/lib/feedback/destination";

function installDom(options?: { reducedMotion?: boolean; width?: number }) {
  const window = new Window({
    url: "https://example.test/our-story",
    width: options?.width ?? 1280,
    height: 900,
  });
  const g = globalThis as typeof globalThis & {
    window?: Window;
    document?: Document;
    HTMLElement?: typeof HTMLElement;
    Node?: typeof Node;
    MutationObserver?: typeof MutationObserver;
    matchMedia?: typeof window.matchMedia;
    IntersectionObserver?: typeof IntersectionObserver;
  };
  const previous = {
    window: g.window,
    document: g.document,
    HTMLElement: g.HTMLElement,
    Node: g.Node,
    MutationObserver: g.MutationObserver,
    matchMedia: g.matchMedia,
    IntersectionObserver: g.IntersectionObserver,
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

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  g.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;

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
      g.IntersectionObserver = previous.IntersectionObserver;
      try {
        window.document.body.innerHTML = "";
      } catch {
        // ignore
      }
    },
  };
}

function renderOurStory() {
  return renderToStaticMarkup(
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
}

describe("Our Story route and navigation", () => {
  it("parses /our-story as an app-shell screen", () => {
    assert.deepEqual(parseAppPathname(OUR_STORY_PATH), { type: "our-story" });
    assert.equal(isAppShellPath(OUR_STORY_PATH), true);
    assert.equal(screenToPath({ type: "our-story" }), OUR_STORY_PATH);
  });

  it("renders the Our Story page successfully", () => {
    const html = renderOurStory();
    assert.match(html, /data-testid="our-story-page"/);
    assert.match(html, /Experience football history as if it were happening today/);
  });

  it("includes OUR STORY in the main navigation", () => {
    assert.equal(OUR_STORY_NAV_LABEL, "Our Story");
    const html = renderToStaticMarkup(
      createElement(SiteNav, {
        onWorldCups: () => undefined,
        onScrollToArchive: () => undefined,
        onOurStory: () => undefined,
        active: "our-story",
      })
    );
    assert.match(html, />Our Story</);
    assert.match(html, /aria-current="page"/);
    assert.doesNotMatch(html, />About</);
  });

  it("has exactly one H1", () => {
    const html = renderOurStory();
    const matches = html.match(/<h1\b/g) ?? [];
    assert.equal(matches.length, 1);
  });
});

describe("Our Story content and CTAs", () => {
  it("Browse the Archive routes toward the homepage Men's World Cups section", () => {
    const machine = readFileSync(
      join(process.cwd(), "components/FootballTimeMachine.tsx"),
      "utf8"
    );
    const page = readFileSync(
      join(process.cwd(), "components/our-story/OurStoryPage.tsx"),
      "utf8"
    );
    assert.match(machine, /function browseArchive/);
    assert.match(machine, /requestScrollToMensWorldCups/);
    assert.match(page, /Browse the Archive/);
    assert.match(page, /onBrowseArchive/);
  });

  it("links available tournament timeline items to real tournament pages", () => {
    const html = renderOurStory();
    const timeline = getArchiveTimeline();
    const available = timeline.filter((item) => item.status === "available");
    assert.ok(available.length >= 3);
    for (const item of available) {
      assert.ok(item.href);
      assert.match(
        html,
        new RegExp(`href="${item.href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`)
      );
    }
    assert.match(html, /href="\/tournaments\/usa-1994"/);
    assert.match(html, /href="\/tournaments\/france-1998"/);
    assert.match(html, /href="\/tournaments\/korea-japan-2002"/);
  });

  it("does not link future tournament items to nonexistent routes", () => {
    const timeline = getArchiveTimeline();
    for (const item of timeline.filter((entry) => entry.status !== "available")) {
      assert.equal(item.href, null);
    }
    const html = renderOurStory();
    assert.doesNotMatch(html, /href="\/tournaments\/germany-2006"/);
    assert.doesNotMatch(html, /href="\/tournaments\/russia-2018"/);
    assert.doesNotMatch(html, /href="\/tournaments\/qatar-2022"/);
    assert.match(html, />NEXT</);
    assert.match(html, />PLANNED</);
    assert.match(html, /On the Horizon/);
  });

  it("includes spoiler-free philosophy copy", () => {
    const html = renderOurStory();
    assert.match(html, /Why Spoiler-Free Matters/);
    assert.match(html, /Spoiler-Free by Design/);
    assert.match(html, /Football is at its most compelling when you don/);
    assert.match(html, /know what happens next/);
  });

  it("includes replay-sourcing disclosure", () => {
    const html = renderOurStory();
    assert.match(html, /host match footage directly/);
    assert.match(html, /curate the best publicly available replay sources/);
    assert.match(html, /not affiliated with FIFA, Dailymotion/);
  });

  it("includes Full Match and Highlights viewing option copy", () => {
    const html = renderOurStory();
    assert.match(
      html,
      /Across the growing archive, matches can include both a full replay and a condensed highlights option/
    );
    assert.match(html, /90 minutes or just 9/);
    assert.doesNotMatch(
      html,
      /Every match includes both a full replay and a condensed highlights option/
    );
  });

  it("includes the creator origin question", () => {
    const html = renderOurStory();
    assert.match(html, /experience historic tournaments/);
    assert.match(html, /without already knowing how they end/);
    assert.match(html, /Jake Loos/);
  });

  it("includes the final closing line", () => {
    const html = renderOurStory();
    assert.match(html, /The next World Cup may be years away/);
    assert.match(html, /The last one is waiting for you/);
  });
});

describe("Our Story metadata, motion, and layout", () => {
  it("exposes spoiler-safe page metadata", () => {
    const metadata = buildOurStoryMetadata();
    assert.equal(metadata.title, OUR_STORY_TITLE);
    assert.equal(metadata.description, OUR_STORY_DESCRIPTION);
    assert.match(OUR_STORY_TITLE, /Our Story/);
    assert.doesNotMatch(OUR_STORY_DESCRIPTION, /\b\d-\d\b/);
    assert.doesNotMatch(OUR_STORY_DESCRIPTION, /champion|winner|final score/i);
    assert.doesNotMatch(String(metadata.title), /champion|winner/i);

    const routePage = readFileSync(
      join(process.cwd(), "app/our-story/page.tsx"),
      "utf8"
    );
    assert.match(routePage, /buildOurStoryMetadata/);
    assert.match(routePage, /export const metadata/);
  });

  it("opens Send Feedback via in-app modal instead of navigating away", () => {
    assert.equal(FEEDBACK_DESTINATION.type, "modal");
    const html = renderOurStory();
    assert.match(html, /data-feedback="modal"/);
    assert.match(html, /Send Feedback/);
    assert.doesNotMatch(html, /mailto:/);
    assert.doesNotMatch(html, /target="_blank"/);
  });

  it("hydrates without throwing", async () => {
    const { window, restore } = installDom();
    try {
      const html = renderOurStory();
      const container = window.document.createElement("div");
      container.innerHTML = html;
      window.document.body.appendChild(container);

      let hydrateError: unknown = null;
      hydrateRoot(
        container,
        createElement(
          FeedbackProvider,
          null,
          createElement(OurStoryPage, {
            onNavigateHome: () => undefined,
            onBrowseArchive: () => undefined,
            onWorldCups: () => undefined,
          })
        ),
        {
          onRecoverableError(error) {
            hydrateError = error;
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 20));
      assert.equal(hydrateError, null);
      assert.equal(container.querySelectorAll("h1").length, 1);
    } finally {
      restore();
    }
  });

  it("respects reduced-motion behavior", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
    assert.match(css, /\.our-story-reveal/);
    assert.match(css, /\.our-story-hero__image/);

    const { restore } = installDom({ reducedMotion: true });
    try {
      const html = renderOurStory();
      assert.match(html, /our-story-page/);
      // Reveal starts with motion off until effect runs; reduced motion keeps content visible in CSS.
      assert.match(css, /our-story-reveal\[data-motion="on"\]:not\(\[data-inview="true"\]\)/);
    } finally {
      restore();
    }
  });

  it("avoids fixed desktop-only widths that overflow on mobile", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    const ourStoryCss = css.slice(css.indexOf("OUR STORY"));
    // Allow max-width constraints; reject hard `width: NNNNpx` layout locks.
    assert.doesNotMatch(ourStoryCss, /(?<!max-)width:\s*\d{4,}px/);
    assert.match(ourStoryCss, /overflow-x:\s*clip/);
    assert.match(ourStoryCss, /max-width:\s*100%|width:\s*min\(/);

    const { window, restore } = installDom({ width: 390 });
    try {
      window.document.body.innerHTML = renderOurStory();
      const page = window.document.querySelector(".our-story-page");
      assert.ok(page);
      assert.doesNotMatch(page!.outerHTML, /style="[^"]*(?<!max-)width:\s*\d{4,}px/);
    } finally {
      restore();
    }
  });
});

describe("Our Story integration guards", () => {
  afterEach(() => {
    // no shared mutable state
  });

  it("wires Our Story through the production shell without About labeling", () => {
    const machine = readFileSync(
      join(process.cwd(), "components/FootballTimeMachine.tsx"),
      "utf8"
    );
    const nav = readFileSync(
      join(process.cwd(), "components/home/SiteNav.tsx"),
      "utf8"
    );
    assert.match(machine, /OurStoryPage/);
    assert.match(machine, /type === ["']our-story["']/);
    assert.match(nav, /OUR_STORY_NAV_LABEL/);
    assert.doesNotMatch(nav, />About</);
  });
});
