import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { Window } from "happy-dom";
import { seasons } from "@/data/seasons";
import { TournamentLanding } from "@/components/experiences/TournamentLanding";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import {
  EMPTY_RESUME_HINTS,
  buildTournamentHeroAction,
  continueWatchingDetail,
  experienceActionLabel,
  experienceProgress,
  getExperienceByRoute,
  resolveContinueCanonicalMatchId,
  resolveContinueWatchingExperience,
  type ResumeHints,
  type TournamentHeroAction,
} from "./index";
import type { TournamentId } from "@/lib/archive/types";

const TOURNAMENTS: TournamentId[] = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
];

function seasonFor(tournamentId: TournamentId) {
  const season = seasons.find((s) => s.id === tournamentId);
  assert.ok(season?.intro);
  return season!;
}

function exploreHero(tournamentId: TournamentId): TournamentHeroAction {
  const season = seasonFor(tournamentId);
  const story = getExperienceByRoute(tournamentId, "story");
  return buildTournamentHeroAction({
    hasHydratedProgress: false,
    seasonName: season.name,
    defaultStory: story,
    continueExperience: null,
    continueDetail: null,
    continueLabel: "Continue Journey",
  });
}

function renderLanding(
  tournamentId: TournamentId,
  heroAction: TournamentHeroAction,
  overall = { completed: 0, total: 52, percent: 0 }
) {
  const season = seasonFor(tournamentId);
  return renderToStaticMarkup(
    createElement(TournamentLanding, {
      season,
      overallProgress: overall,
      heroAction,
      onHeroAction: () => undefined,
      onBack: () => undefined,
      children: createElement("div", { "data-testid": "experiences-slot" }),
    })
  );
}

function installDom() {
  const window = new Window({ url: "https://example.test/" });
  const g = globalThis as typeof globalThis & {
    window?: Window;
    document?: Document;
    HTMLElement?: typeof HTMLElement;
    Node?: typeof Node;
    MutationObserver?: typeof MutationObserver;
  };
  const previous = {
    window: g.window,
    document: g.document,
    HTMLElement: g.HTMLElement,
    Node: g.Node,
    MutationObserver: g.MutationObserver,
  };
  g.window = window as unknown as Window;
  g.document = window.document as unknown as Document;
  g.HTMLElement = window.HTMLElement as unknown as typeof HTMLElement;
  g.Node = window.Node as unknown as typeof Node;
  g.MutationObserver =
    window.MutationObserver as unknown as typeof MutationObserver;
  return {
    window,
    restore() {
      g.window = previous.window;
      g.document = previous.document;
      g.HTMLElement = previous.HTMLElement;
      g.Node = previous.Node;
      g.MutationObserver = previous.MutationObserver;
      window.close();
    },
  };
}

describe("tournament landing hydration safety", () => {
  let getItemCalls = 0;
  let originalGetItem: Storage["getItem"] | null = null;

  beforeEach(() => {
    getItemCalls = 0;
    if (typeof globalThis.localStorage === "undefined") {
      const store = new Map<string, string>();
      globalThis.localStorage = {
        getItem(key: string) {
          getItemCalls += 1;
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
      originalGetItem = localStorage.getItem.bind(localStorage);
      localStorage.clear();
      mock.method(localStorage, "getItem", (key: string) => {
        getItemCalls += 1;
        return originalGetItem!(key);
      });
    }
  });

  afterEach(() => {
    mock.restoreAll();
  });

  for (const tournamentId of TOURNAMENTS) {
    it(`${tournamentId}: server and initial client markup share the same structure`, () => {
      const hero = exploreHero(tournamentId);
      const server = renderLanding(tournamentId, hero);
      const clientInitial = renderLanding(tournamentId, hero);
      assert.equal(server, clientInitial);
      assert.match(server, /tournament-hero__cta/);
      assert.match(server, /data-hero-action="explore"/);
      assert.match(server, /Explore tournament/);
      assert.match(server, /Why This Tournament Matters/);
      assert.match(server, /data-testid="tournament-why"/);
      assert.doesNotMatch(server, /Continue Journey/);
    });

    it(`${tournamentId}: hero CTA exists before progress hydration with deterministic content`, () => {
      const hero = exploreHero(tournamentId);
      assert.equal(hero.kind, "explore");
      assert.equal(hero.label, "Explore tournament");
      assert.equal(hero.ariaLabel, `Explore ${seasonFor(tournamentId).name}`);

      const markup = renderLanding(tournamentId, hero);
      assert.match(markup, /class="tournament-hero__cta"/);
      assert.match(markup, /aria-label="Explore /);
      assert.match(markup, /The Story/);
    });

    it(`${tournamentId}: persisted progress is not read while building pre-hydration hero`, () => {
      localStorage.setItem("ftm-last-viewed-usa-1994-story", "usa-1994-001");
      localStorage.setItem("ftm-experience-entered-usa-1994-story", "true");
      getItemCalls = 0;

      const before = getItemCalls;
      const hero = exploreHero(tournamentId);
      renderLanding(tournamentId, hero);
      buildTournamentHeroAction({
        hasHydratedProgress: false,
        seasonName: seasonFor(tournamentId).name,
        defaultStory: getExperienceByRoute(tournamentId, "story"),
        continueExperience: null,
        continueDetail: null,
        continueLabel: "Continue Journey",
      });
      resolveContinueWatchingExperience(
        tournamentId,
        new Set(),
        EMPTY_RESUME_HINTS
      );

      assert.equal(hero.kind, "explore");
      assert.equal(getItemCalls, before);
    });

    it(`${tournamentId}: progress resume hints drive Continue only after hydration`, () => {
      const story = getExperienceByRoute(tournamentId, "story")!;
      const firstId = story.canonicalMatchIds[0]!;
      const completed = new Set<string>([firstId]);
      const hints: ResumeHints = {
        enteredExperienceIds: new Set([story.id]),
        lastViewedByExperienceId: new Map([[story.id, firstId]]),
      };

      const continueExp = resolveContinueWatchingExperience(
        tournamentId,
        completed,
        hints
      );
      assert.ok(continueExp);
      assert.equal(continueExp!.id, story.id);

      const detail = continueWatchingDetail(continueExp!, completed, firstId);
      const hero = buildTournamentHeroAction({
        hasHydratedProgress: true,
        seasonName: seasonFor(tournamentId).name,
        defaultStory: story,
        continueExperience: continueExp,
        continueDetail: detail,
        continueLabel: "Continue Journey",
      });

      assert.equal(hero.kind, "continue");
      assert.equal(hero.label, "Continue Journey");
      assert.match(hero.ariaLabel, /Continue Journey:/);
      assert.match(hero.detail, /.+/);
      assert.match(hero.meta ?? "", /Match \d+ of \d+ • The Story/);

      const markup = renderLanding(tournamentId, hero, {
        completed: 1,
        total: 52,
        percent: 2,
      });
      assert.match(markup, /data-hero-action="continue"/);
      assert.match(markup, /Continue Journey/);
      assert.match(markup, /tournament-hero__cta-meta/);
      // Same button element contract — still a single CTA.
      assert.equal(
        (markup.match(/class="tournament-hero__cta"/g) ?? []).length,
        1
      );
    });

    it(`${tournamentId}: experience card Start becomes Continue after hydrated progress`, () => {
      const story = getExperienceByRoute(tournamentId, "story")!;
      const empty = experienceProgress(story, new Set());
      const started = experienceProgress(
        story,
        new Set([story.canonicalMatchIds[0]!])
      );

      assert.equal(experienceActionLabel(empty), "Start");
      assert.equal(experienceActionLabel(started), "Continue");

      const before = renderToStaticMarkup(
        createElement(ExperienceCard, {
          type: "story",
          title: story.title,
          description: story.shortDescription,
          matchCount: empty.total,
          completedCount: empty.completed,
          percent: empty.percent,
          onPrimary: () => undefined,
        })
      );
      const after = renderToStaticMarkup(
        createElement(ExperienceCard, {
          type: "story",
          title: story.title,
          description: story.shortDescription,
          matchCount: started.total,
          completedCount: started.completed,
          percent: started.percent,
          onPrimary: () => undefined,
        })
      );

      assert.match(before, /aria-label="Start /);
      assert.match(after, /aria-label="Continue /);
    });

    it(`${tournamentId}: renders without hydration warnings`, async () => {
      const dom = installDom();
      const errors: string[] = [];
      const originalError = console.error;
      console.error = (...args: unknown[]) => {
        errors.push(args.map(String).join(" "));
      };

      try {
        const hero = exploreHero(tournamentId);
        const html = renderLanding(tournamentId, hero);
        dom.window.document.body.innerHTML = `<div id="root">${html}</div>`;
        const rootEl = dom.window.document.getElementById("root");
        assert.ok(rootEl);

        const season = seasonFor(tournamentId);
        await new Promise<void>((resolve, reject) => {
          try {
            hydrateRoot(
              rootEl!,
              createElement(TournamentLanding, {
                season,
                overallProgress: { completed: 0, total: 52, percent: 0 },
                heroAction: hero,
                onHeroAction: () => undefined,
                onBack: () => undefined,
                children: createElement("div", {
                  "data-testid": "experiences-slot",
                }),
              })
            );
            // Allow React to flush hydration diagnostics.
            setTimeout(resolve, 20);
          } catch (err) {
            reject(err);
          }
        });

        const hydrationNoise = errors.filter(
          (msg) =>
            /Hydration failed/i.test(msg) ||
            /didn't match/i.test(msg) ||
            /server rendered HTML/i.test(msg)
        );
        assert.deepEqual(hydrationNoise, []);
      } finally {
        console.error = originalError;
        dom.restore();
      }
    });
  }

  it("user with no saved progress sees Explore tournament", () => {
    for (const tournamentId of TOURNAMENTS) {
      const continueExp = resolveContinueWatchingExperience(
        tournamentId,
        new Set(),
        EMPTY_RESUME_HINTS
      );
      assert.equal(continueExp, null);

      const hero = buildTournamentHeroAction({
        hasHydratedProgress: true,
        seasonName: seasonFor(tournamentId).name,
        defaultStory: getExperienceByRoute(tournamentId, "story"),
        continueExperience: null,
        continueDetail: null,
        continueLabel: "Continue Journey",
      });
      assert.equal(hero.kind, "explore");
      assert.equal(hero.label, "Explore tournament");
    }
  });

  it("user with saved progress resumes the correct canonical match", () => {
    const tournamentId: TournamentId = "usa-1994";
    const story = getExperienceByRoute(tournamentId, "story")!;
    const lastViewed = story.canonicalMatchIds[0]!;
    assert.ok(lastViewed);

    const target = resolveContinueCanonicalMatchId(
      story,
      new Set(),
      lastViewed
    );
    assert.equal(target, lastViewed);

    const detail = continueWatchingDetail(story, new Set(), lastViewed);
    assert.match(
      detail.matchLabel,
      /Germany vs Bolivia|United States vs Switzerland/
    );
    assert.match(detail.meta, /Match \d+ of \d+ • The Story/);

    const hints: ResumeHints = {
      enteredExperienceIds: new Set([story.id]),
      lastViewedByExperienceId: new Map([[story.id, lastViewed]]),
    };
    const continueExp = resolveContinueWatchingExperience(
      tournamentId,
      new Set(),
      hints
    );
    assert.ok(continueExp);
    assert.equal(
      resolveContinueCanonicalMatchId(continueExp!, new Set(), lastViewed),
      lastViewed
    );
  });

  it("progress hydration gate: Continue is withheld until hasHydratedProgress", () => {
    const tournamentId: TournamentId = "france-1998";
    const story = getExperienceByRoute(tournamentId, "story")!;
    const lastViewed = story.canonicalMatchIds[0]!;
    const hints: ResumeHints = {
      enteredExperienceIds: new Set([story.id]),
      lastViewedByExperienceId: new Map([[story.id, lastViewed]]),
    };
    const continueExp = resolveContinueWatchingExperience(
      tournamentId,
      new Set(),
      hints
    );
    const detail = continueWatchingDetail(continueExp!, new Set(), lastViewed);

    const before = buildTournamentHeroAction({
      hasHydratedProgress: false,
      seasonName: seasonFor(tournamentId).name,
      defaultStory: story,
      continueExperience: continueExp,
      continueDetail: detail,
      continueLabel: "Continue Journey",
    });
    const after = buildTournamentHeroAction({
      hasHydratedProgress: true,
      seasonName: seasonFor(tournamentId).name,
      defaultStory: story,
      continueExperience: continueExp,
      continueDetail: detail,
      continueLabel: "Continue Journey",
    });

    assert.equal(before.kind, "explore");
    assert.equal(after.kind, "continue");
  });
});
