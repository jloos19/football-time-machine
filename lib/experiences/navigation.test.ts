import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import {
  createElement,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";
import type { TournamentId } from "@/lib/archive/types";
import { ExperiencePicker } from "@/components/experiences/ExperiencePicker";
import { TeamPicker } from "@/components/experiences/TeamPicker";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import { seasons } from "@/data/seasons";
import {
  experienceActionLabel,
  getExperienceByRoute,
  getSupportedTeamJourneys,
  resolveContinueCanonicalMatchId,
  resolveExperienceEpisodes,
  tournamentHomeBackLabel,
  tournamentLandingPath,
  type ExperienceEpisode,
  type ExperienceOption,
  type TournamentExperience,
} from "./index";
import { parseAppPathname, screenToPath } from "./app-routes";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Lightweight landing stand-in — avoids next/image teardown races in happy-dom. */
function LandingStub({
  experience,
  episodes,
  completedCanonicalIds,
  teamName,
  tournamentName,
  onBack,
  onOpenEpisode,
}: {
  experience: TournamentExperience;
  episodes: ExperienceEpisode[];
  completedCanonicalIds: ReadonlySet<string>;
  teamName?: string;
  tournamentName: string;
  onBack: () => void;
  onOpenEpisode: (episode: ExperienceEpisode) => void;
}) {
  const completed = episodes.filter((ep) =>
    completedCanonicalIds.has(ep.canonicalMatchId)
  ).length;
  const label = experienceActionLabel({
    completed,
    total: episodes.length,
  });
  const cta =
    label === "Start"
      ? "Start Journey"
      : label === "Continue"
        ? "Continue Journey"
        : "Review Journey";
  const next =
    episodes.find((ep) => !completedCanonicalIds.has(ep.canonicalMatchId)) ??
    episodes[0] ??
    null;
  const backLabel =
    experience.type === "team"
      ? tournamentHomeBackLabel(tournamentName)
      : "Tournament home";

  return createElement(
    "div",
    {
      "data-testid":
        experience.type === "story" ? "story-view" : "journey-view",
      "data-journey-type": experience.type,
    },
    createElement(
      "button",
      { type: "button", className: "journey-hero__back", onClick: onBack },
      `← ${backLabel}`
    ),
    createElement("h1", null, teamName ?? experience.title),
    createElement(
      "button",
      {
        type: "button",
        className: "journey-hero__cta",
        disabled: !next,
        onClick: () => {
          if (next) onOpenEpisode(next);
        },
      },
      cta
    )
  );
}

const TOURNAMENTS: TournamentId[] = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
];

function installDom() {
  const window = new Window({ url: "https://example.test/" });
  const g = globalThis as typeof globalThis & {
    window?: Window;
    document?: Document;
    HTMLElement?: typeof HTMLElement;
    Node?: typeof Node;
    MutationObserver?: typeof MutationObserver;
    localStorage?: Storage;
  };
  const previous = {
    window: g.window,
    document: g.document,
    HTMLElement: g.HTMLElement,
    Node: g.Node,
    MutationObserver: g.MutationObserver,
    localStorage: g.localStorage,
  };
  g.window = window as unknown as Window;
  g.document = window.document as unknown as Document;
  g.HTMLElement = window.HTMLElement as unknown as typeof HTMLElement;
  g.Node = window.Node as unknown as typeof Node;
  g.MutationObserver =
    window.MutationObserver as unknown as typeof MutationObserver;
  g.localStorage = window.localStorage;
  return {
    window,
    restore() {
      try {
        window.localStorage.clear();
        window.document.body.innerHTML = "";
      } catch {
        // ignore
      }
      g.window = previous.window;
      g.document = previous.document;
      g.HTMLElement = previous.HTMLElement;
      g.Node = previous.Node;
      g.MutationObserver = previous.MutationObserver;
      g.localStorage = previous.localStorage;
    },
  };
}

async function settle(frames = 2) {
  for (let i = 0; i < frames; i += 1) {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
}

/**
 * Mirrors FootballTimeMachine experience-entry rules:
 * - openExperience → landing only (clears match)
 * - continueExperience → explicit resume only
 * - team / option selection never opens a match
 */
function ExperienceEntryHarness({
  tournamentId,
  MatchPage,
  initialTeamId,
  initialCompleted,
}: {
  tournamentId: TournamentId;
  MatchPage: (props: { episode: ExperienceEpisode }) => ReactNode;
  /** Simulate a direct/refreshed Team Journey URL. */
  initialTeamId?: string;
  initialCompleted?: ReadonlyArray<string>;
}) {
  type View =
    | { type: "tournament" }
    | { type: "team-picker" }
    | { type: "experience"; experience: TournamentExperience };

  const initialExperience = initialTeamId
    ? getExperienceByRoute(tournamentId, "team", initialTeamId)
    : null;

  const [view, setView] = useState<View>(() =>
    initialExperience
      ? { type: "experience", experience: initialExperience }
      : { type: "tournament" }
  );
  const [selectedEpisode, setSelectedEpisode] =
    useState<ExperienceEpisode | null>(null);
  const [completed] = useState(
    () => new Set<string>(initialCompleted ?? [])
  );
  const [routePath, setRoutePath] = useState(() =>
    initialExperience
      ? screenToPath({
          type: "experience",
          tournamentId,
          experience: initialExperience,
          returnTo: "home",
        })
      : tournamentLandingPath(tournamentId)
  );

  function clearMatch() {
    setSelectedEpisode(null);
  }

  function goTournamentHome() {
    clearMatch();
    setView({ type: "tournament" });
    setRoutePath(tournamentLandingPath(tournamentId));
  }

  function openExperience(experience: TournamentExperience) {
    clearMatch();
    setView({ type: "experience", experience });
    const path = screenToPath({
      type: "experience",
      tournamentId,
      experience,
      returnTo: "home",
    });
    setRoutePath(path);
  }

  function continueExperience(experience: TournamentExperience) {
    const episodes = resolveExperienceEpisodes(experience);
    const targetId = resolveContinueCanonicalMatchId(
      experience,
      completed,
      null
    );
    const ep = targetId
      ? episodes.find((row) => row.canonicalMatchId === targetId) ?? null
      : null;
    setSelectedEpisode(ep);
    setView({ type: "experience", experience });
    setRoutePath(
      screenToPath({
        type: "experience",
        tournamentId,
        experience,
        returnTo: "home",
      })
    );
  }

  const season = seasons.find((s) => s.id === tournamentId)!;

  return createElement(
    "div",
    {
      "data-testid": "harness",
      "data-route-path": routePath,
      "data-completed-count": String(completed.size),
    },
    view.type === "tournament"
      ? createElement(ExperiencePicker, {
          tournamentId,
          completedCanonicalIds: completed,
          onSelectOption: (option: ExperienceOption) => {
            if (option.type === "team") {
              clearMatch();
              setView({ type: "team-picker" });
              setRoutePath(`/tournaments/${tournamentId}/team`);
              return;
            }
            const experience = getExperienceByRoute(tournamentId, option.slug);
            if (experience) openExperience(experience);
          },
          onOpenTeamPicker: () => {
            clearMatch();
            setView({ type: "team-picker" });
            setRoutePath(`/tournaments/${tournamentId}/team`);
          },
          onSelectTeam: (teamId: string) => {
            const experience = getExperienceByRoute(
              tournamentId,
              "team",
              teamId
            );
            if (experience) openExperience(experience);
          },
        })
      : null,
    view.type === "team-picker"
      ? createElement(TeamPicker, {
          tournamentId,
          tournamentName: season.name,
          completedCanonicalIds: completed,
          onBack: goTournamentHome,
          onSelectTeam: (teamId: string) => {
            const experience = getExperienceByRoute(
              tournamentId,
              "team",
              teamId
            );
            if (experience) openExperience(experience);
          },
        })
      : null,
    view.type === "experience"
      ? createElement(LandingStub, {
          experience: view.experience,
          episodes: resolveExperienceEpisodes(view.experience),
          completedCanonicalIds: completed,
          tournamentName: season.name,
          teamName:
            view.experience.type === "team"
              ? getSupportedTeamJourneys(tournamentId).find(
                  (t) => t.teamId === view.experience.teamId
                )?.teamName
              : undefined,
          onBack: goTournamentHome,
          onOpenEpisode: (episode) => setSelectedEpisode(episode),
        })
      : null,
    selectedEpisode
      ? createElement(MatchPage, { episode: selectedEpisode })
      : null,
    createElement(
      "button",
      {
        type: "button",
        "data-testid": "explicit-continue",
        onClick: () => {
          const story = getExperienceByRoute(tournamentId, "story");
          if (story) continueExperience(story);
        },
      },
      "Explicit Continue Journey"
    )
  );
}

describe("experience navigation never auto-opens Match page", () => {
  let root: Root | null = null;
  let dom: ReturnType<typeof installDom> | null = null;

  afterEach(async () => {
    if (root) {
      try {
        flushSync(() => {
          root?.unmount();
        });
      } catch {
        // ignore teardown races
      }
      root = null;
    }
    await new Promise((r) => setTimeout(r, 20));
    dom?.restore();
    dom = null;
  });

  function mount(node: ReactNode) {
    dom = installDom();
    const host = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(host);
    root = createRoot(host);
    flushSync(() => {
      root!.render(node);
    });
    return host;
  }

  function click(el: Element | null, label: string) {
    assert.ok(el, `missing click target: ${label}`);
    (el as HTMLElement).click();
  }

  for (const tournamentId of TOURNAMENTS) {
    describe(tournamentId, () => {
      it("Story / Essentials / Every Match / Follow a Team open landings without MatchPage", async () => {
        let matchMounts = 0;
        const MatchPage = mock.fn(
          ({ episode }: { episode: ExperienceEpisode }) => {
            matchMounts += 1;
            return createElement(
              "div",
              { "data-testid": "match-experience-modal" },
              episode.match
            );
          }
        );

        const host = mount(
          createElement(ExperienceEntryHarness, {
            tournamentId,
            MatchPage,
          })
        );
        await settle(3);

        const storyBtn = [...host.querySelectorAll("button")].find((btn) =>
          (btn.getAttribute("aria-label") || btn.textContent || "").includes(
            "The Story"
          )
        );
        click(storyBtn ?? null, "The Story");
        await settle(3);
        assert.ok(host.querySelector('[data-testid="story-view"]'));
        assert.equal(host.querySelector('[data-testid="match-experience-modal"]'), null);
        assert.equal(matchMounts, 0);

        click(host.querySelector(".journey-hero__back"), "back");
        await settle(2);

        const essentialsBtn = [...host.querySelectorAll("button")].find((btn) =>
          (btn.getAttribute("aria-label") || btn.textContent || "").includes(
            "The Essentials"
          )
        );
        click(essentialsBtn ?? null, "The Essentials");
        await settle(3);
        assert.equal(
          host
            .querySelector("[data-journey-type]")
            ?.getAttribute("data-journey-type"),
          "essentials"
        );
        assert.equal(matchMounts, 0);

        click(host.querySelector(".journey-hero__back"), "back");
        await settle(2);

        const everyBtn = [...host.querySelectorAll("button")].find((btn) =>
          (btn.getAttribute("aria-label") || btn.textContent || "").includes(
            "Every Match"
          )
        );
        click(everyBtn ?? null, "Every Match");
        await settle(3);
        assert.equal(
          host
            .querySelector("[data-journey-type]")
            ?.getAttribute("data-journey-type"),
          "complete"
        );
        assert.equal(matchMounts, 0);

        click(host.querySelector(".journey-hero__back"), "back");
        await settle(2);

        click(
          host.querySelector('[data-testid="follow-a-team-open"]'),
          "Follow a Team"
        );
        await settle(3);
        assert.ok(host.querySelector('[data-testid="team-picker"]'));
        assert.equal(matchMounts, 0);
        assert.doesNotMatch(host.innerHTML, /Choose a Nation/);
        assert.equal(MatchPage.mock.callCount(), 0);
      });

      it("nation selection opens Team Journey landing without MatchPage", async () => {
        let matchMounts = 0;
        const MatchPage = mock.fn(
          ({ episode }: { episode: ExperienceEpisode }) => {
            matchMounts += 1;
            return createElement(
              "div",
              { "data-testid": "match-experience-modal" },
              episode.match
            );
          }
        );
        const host = mount(
          createElement(ExperienceEntryHarness, {
            tournamentId,
            MatchPage,
          })
        );
        await settle(2);
        click(
          host.querySelector('[data-testid="follow-a-team-open"]'),
          "Follow a Team"
        );
        await settle(2);
        const brazil =
          getSupportedTeamJourneys(tournamentId).find(
            (t) => t.teamName === "Brazil"
          ) ?? getSupportedTeamJourneys(tournamentId)[0]!;
        click(
          host.querySelector(`[data-team-id="${brazil.teamId}"]`),
          brazil.teamName
        );
        await settle(3);
        assert.equal(
          host
            .querySelector("[data-journey-type]")
            ?.getAttribute("data-journey-type"),
          "team"
        );
        assert.ok((host.textContent || "").includes(brazil.teamName));
        assert.equal(matchMounts, 0);
        assert.equal(MatchPage.mock.callCount(), 0);
      });

      it("Start Journey opens the first match only after explicit click", async () => {
        let opened: string | null = null;
        const MatchPage = mock.fn(
          ({ episode }: { episode: ExperienceEpisode }) => {
            opened = episode.canonicalMatchId;
            return createElement(
              "div",
              { "data-testid": "match-experience-modal" },
              episode.match
            );
          }
        );
        const host = mount(
          createElement(ExperienceEntryHarness, {
            tournamentId,
            MatchPage,
          })
        );
        await settle(2);
        const storyBtn = [...host.querySelectorAll("button")].find((btn) =>
          (btn.getAttribute("aria-label") || "").includes("The Story")
        );
        click(storyBtn ?? null, "The Story");
        await settle(3);
        assert.equal(MatchPage.mock.callCount(), 0);

        const story = getExperienceByRoute(tournamentId, "story")!;
        const first = story.canonicalMatchIds[0]!;
        click(
          [...host.querySelectorAll("button")].find((btn) =>
            (btn.textContent || "").includes("Start Journey")
          ) ?? null,
          "Start Journey"
        );
        await settle(3);
        assert.equal(opened, first);
        assert.ok(MatchPage.mock.callCount() >= 1);
      });

      it("Continue Journey opens resume match; calculating resume alone does not navigate", async () => {
        const story = getExperienceByRoute(tournamentId, "story")!;
        const completed = new Set([story.canonicalMatchIds[0]!]);
        const resumeId = resolveContinueCanonicalMatchId(
          story,
          completed,
          story.canonicalMatchIds[0]!
        );
        assert.equal(resumeId, story.canonicalMatchIds[1]);

        // Resume calculation must not imply a MatchPage mount.
        assert.ok(resumeId);

        let opened: string | null = null;
        const MatchPage = mock.fn(
          ({ episode }: { episode: ExperienceEpisode }) => {
            opened = episode.canonicalMatchId;
            return createElement(
              "div",
              { "data-testid": "match-experience-modal" },
              episode.match
            );
          }
        );
        const host = mount(
          createElement(ExperienceEntryHarness, {
            tournamentId,
            MatchPage,
          })
        );
        await settle(2);
        assert.equal(MatchPage.mock.callCount(), 0);

        // Explicit continue control (home / tournament hero equivalent).
        click(
          host.querySelector('[data-testid="explicit-continue"]'),
          "Explicit Continue Journey"
        );
        await settle(3);
        assert.ok(MatchPage.mock.callCount() >= 1);
        assert.ok(opened);
      });

      it("changing experience clears selected match state", async () => {
        const MatchPage = mock.fn(
          ({ episode }: { episode: ExperienceEpisode }) =>
            createElement(
              "div",
              { "data-testid": "match-experience-modal" },
              episode.match
            )
        );
        const host = mount(
          createElement(ExperienceEntryHarness, {
            tournamentId,
            MatchPage,
          })
        );
        await settle(2);
        click(
          [...host.querySelectorAll("button")].find((btn) =>
            (btn.getAttribute("aria-label") || "").includes("The Story")
          ) ?? null,
          "The Story"
        );
        await settle(2);
        click(
          [...host.querySelectorAll("button")].find((btn) =>
            (btn.textContent || "").includes("Start Journey")
          ) ?? null,
          "Start Journey"
        );
        await settle(2);
        assert.ok(host.querySelector('[data-testid="match-experience-modal"]'));

        click(host.querySelector(".journey-hero__back"), "back to tournament");
        await settle(2);
        const mountsBefore = MatchPage.mock.callCount();
        click(
          [...host.querySelectorAll("button")].find((btn) =>
            (btn.getAttribute("aria-label") || "").includes("The Essentials")
          ) ?? null,
          "The Essentials"
        );
        await settle(3);
        assert.equal(
          host.querySelector('[data-testid="match-experience-modal"]'),
          null
        );
        assert.equal(MatchPage.mock.callCount(), mountsBefore);
      });

      it("ExperiencePicker has no Choose a Nation CTA", () => {
        const markup = renderToStaticMarkup(
          createElement(ExperiencePicker, {
            tournamentId,
            completedCanonicalIds: new Set(),
            onSelectOption: () => undefined,
            onSelectTeam: () => undefined,
            onOpenTeamPicker: () => undefined,
          })
        );
        assert.doesNotMatch(markup, /Choose a [Nn]ation/);
        assert.doesNotMatch(
          markup.match(/data-experience-type="team"[\s\S]*?<\/article>/)?.[0] ||
            "",
          /experience-card__cta/
        );
      });
    });
  }

  it("MatchExperienceModal is the Match page surface under test", () => {
    const story = getExperienceByRoute("usa-1994", "story")!;
    const episode = resolveExperienceEpisodes(story)[0]!;
    const markup = renderToStaticMarkup(
      createElement(MatchExperienceModal, {
        episode,
        experience: story,
        tournamentName: "USA 1994",
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
    assert.match(markup, /data-testid="match-experience-modal"/);
  });

  it("hydrating resume targets does not require opening a match", () => {
    for (const tournamentId of TOURNAMENTS) {
      const story = getExperienceByRoute(tournamentId, "story")!;
      const first = story.canonicalMatchIds[0]!;
      const completed = new Set([first]);
      const target = resolveContinueCanonicalMatchId(story, completed, first);
      assert.equal(target, story.canonicalMatchIds[1]);
      // Pure calculation — no UI navigation side effects possible here.
    }
  });
});

describe("Team Journey back link returns to tournament homepage", () => {
  let root: Root | null = null;
  let dom: ReturnType<typeof installDom> | null = null;

  afterEach(async () => {
    if (root) {
      try {
        flushSync(() => {
          root?.unmount();
        });
      } catch {
        // ignore teardown races
      }
      root = null;
    }
    await new Promise((r) => setTimeout(r, 20));
    dom?.restore();
    dom = null;
  });

  function mount(node: ReactNode) {
    dom = installDom();
    const host = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(host);
    root = createRoot(host);
    flushSync(() => {
      root!.render(node);
    });
    return host;
  }

  function click(el: Element | null, label: string) {
    assert.ok(el, `missing click target: ${label}`);
    (el as HTMLElement).click();
  }

  function harness(host: Element) {
    const el = host.querySelector('[data-testid="harness"]');
    assert.ok(el, "harness root");
    return el;
  }

  const CASES: Array<{
    tournamentId: TournamentId;
    teamId: string;
    expectedLabel: RegExp;
  }> = [
    {
      tournamentId: "usa-1994",
      teamId: "brazil",
      expectedLabel: /Back to USA [’']94/,
    },
    {
      tournamentId: "usa-1994",
      teamId: "united-states",
      expectedLabel: /Back to USA [’']94/,
    },
    {
      tournamentId: "france-1998",
      teamId: "france",
      expectedLabel: /Back to France [’']98/,
    },
    {
      tournamentId: "france-1998",
      teamId: "brazil",
      expectedLabel: /Back to France [’']98/,
    },
  ];

  for (const { tournamentId, teamId, expectedLabel } of CASES) {
    it(`${tournamentId}/${teamId} back label, route, and no team picker`, async () => {
      let matchMounts = 0;
      const MatchPage = mock.fn(
        ({ episode }: { episode: ExperienceEpisode }) => {
          matchMounts += 1;
          return createElement(
            "div",
            { "data-testid": "match-experience-modal" },
            episode.match
          );
        }
      );

      const experience = getExperienceByRoute(tournamentId, "team", teamId)!;
      const firstMatch = experience.canonicalMatchIds[0]!;
      const hostEl = mount(
        createElement(ExperienceEntryHarness, {
          tournamentId,
          MatchPage,
          initialTeamId: teamId,
          initialCompleted: [firstMatch],
        })
      );
      await settle(2);

      const shell = harness(hostEl);
      const back = hostEl.querySelector(".journey-hero__back");
      assert.ok(back, "back link");
      assert.match(back.textContent || "", expectedLabel);
      assert.doesNotMatch(back.textContent || "", /\bTeams\b/);
      assert.doesNotMatch(hostEl.textContent || "", /\b← Teams\b/);
      assert.equal(
        shell.getAttribute("data-route-path"),
        `/tournaments/${tournamentId}/team/${teamId}`
      );
      assert.equal(shell.getAttribute("data-completed-count"), "1");
      assert.equal(matchMounts, 0);

      click(back, "tournament back");
      await settle(2);

      assert.equal(
        shell.getAttribute("data-route-path"),
        tournamentLandingPath(tournamentId)
      );
      assert.equal(
        parseAppPathname(shell.getAttribute("data-route-path") || "")?.type,
        "tournament-landing"
      );
      assert.equal(hostEl.querySelector('[data-testid="team-picker"]'), null);
      assert.equal(
        hostEl.querySelector('[data-journey-type="team"]'),
        null
      );
      assert.ok(hostEl.querySelector('[data-testid="experience-picker"]'));
      assert.equal(matchMounts, 0);
      assert.equal(MatchPage.mock.callCount(), 0);
      assert.equal(shell.getAttribute("data-completed-count"), "1");
      assert.doesNotMatch(hostEl.textContent || "", /\b← Teams\b/);
    });
  }

  it("refreshed Team Journey back still uses tournament landing path", async () => {
    const MatchPage = mock.fn(() => null);
    const hostEl = mount(
      createElement(ExperienceEntryHarness, {
        tournamentId: "usa-1994",
        MatchPage,
        initialTeamId: "brazil",
      })
    );
    await settle(2);

    // Direct URL hydrate — not browser history.
    const hydrated = parseAppPathname("/tournaments/usa-1994/team/brazil");
    assert.ok(hydrated);
    assert.equal(hydrated.type, "experience");
    assert.equal(
      screenToPath({
        type: "tournament-landing",
        tournamentId: "usa-1994",
        returnTo: "home",
      }),
      "/tournaments/usa-1994"
    );

    click(hostEl.querySelector(".journey-hero__back"), "back after refresh");
    await settle(2);
    assert.equal(
      harness(hostEl).getAttribute("data-route-path"),
      "/tournaments/usa-1994"
    );
    assert.equal(hostEl.querySelector('[data-testid="team-picker"]'), null);
  });

  it("production machine uses explicit tournament route, not history back", () => {
    const rootDir = process.cwd();
    const machine = readFileSync(
      join(rootDir, "components/FootballTimeMachine.tsx"),
      "utf8"
    );
    const story = readFileSync(
      join(rootDir, "components/experiences/StoryView.tsx"),
      "utf8"
    );
    const scrollToTop = readFileSync(
      join(rootDir, "components/ScrollToTop.tsx"),
      "utf8"
    );

    assert.doesNotMatch(machine, /router\.back\s*\(/);
    assert.doesNotMatch(machine, /history\.back\s*\(/);
    assert.match(machine, /router\.push\(path,\s*\{\s*scroll:\s*true\s*\}\)/);
    assert.match(scrollToTop, /window\.scrollTo\(0,\s*0\)/);
    // Team journeys no longer divert to the team-picker on back.
    assert.doesNotMatch(
      machine,
      /goTournamentHome[\s\S]*?openTeamPicker/
    );
    assert.doesNotMatch(story, /← Teams/);
    assert.match(story, /tournamentHomeBackLabel\(season\.name\)/);
  });

  it("tournamentHomeBackLabel is built from the tournament display title", () => {
    assert.equal(tournamentHomeBackLabel("USA ’94"), "Back to USA ’94");
    assert.equal(tournamentHomeBackLabel("France ’98"), "Back to France ’98");
  });
});
