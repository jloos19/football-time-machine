import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, it } from "node:test";
import { createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import { Window } from "happy-dom";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import {
  TeamProfileContent,
  TeamProfileOverlay,
} from "@/components/experiences/TeamProfileOverlay";
import { TeamDossier } from "@/components/experiences/TeamDossier";
import { getTeamDossier } from "@/lib/editorial";
import {
  formatTeamProfileCoverage,
  validateTeamDossiers,
} from "@/lib/editorial/validate";
import {
  FRANCE_1998_PARTICIPANT_NAMES,
  KOREA_JAPAN_2002_PARTICIPANT_NAMES,
  USA_1994_PARTICIPANT_NAMES,
  getExperienceByRoute,
  resolveExperienceEpisodes,
  teamIdFromName,
  teamProfileAriaLabel,
} from "@/lib/experiences";

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
      try {
        window.document.body.innerHTML = "";
      } catch {
        // ignore
      }
      g.window = previous.window;
      g.document = previous.document;
      g.HTMLElement = previous.HTMLElement;
      g.Node = previous.Node;
      g.MutationObserver = previous.MutationObserver;
    },
  };
}

async function settle(frames = 2) {
  for (let i = 0; i < frames; i += 1) {
    await new Promise((r) => setTimeout(r, 0));
  }
}

describe("Team Profile coverage", () => {
  it("USA 1994 has 24/24, France 1998 32/32, and Korea/Japan 2002 32/32 profiles", () => {
    assert.equal(USA_1994_PARTICIPANT_NAMES.length, 24);
    assert.equal(FRANCE_1998_PARTICIPANT_NAMES.length, 32);
    assert.equal(KOREA_JAPAN_2002_PARTICIPANT_NAMES.length, 32);
    const coverage = formatTeamProfileCoverage();
    assert.deepEqual(coverage, [
      {
        tournament: "usa-1994",
        teams: 24,
        profilesComplete: 24,
        missing: 0,
        fallback: 0,
      },
      {
        tournament: "france-1998",
        teams: 32,
        profilesComplete: 32,
        missing: 0,
        fallback: 0,
      },
      {
        tournament: "korea-japan-2002",
        teams: 32,
        profilesComplete: 32,
        missing: 0,
        fallback: 0,
      },
    ]);
    assert.ok(validateTeamDossiers().every((r) => !r.usesFallback));
  });

  it("Germany resolves tournament-specific profiles, not a global generic", () => {
    const usa = getTeamDossier("usa-1994", "germany");
    const fra = getTeamDossier("france-1998", "germany");
    assert.ok(usa);
    assert.ok(fra);
    assert.equal(usa.tournamentId, "usa-1994");
    assert.equal(fra.tournamentId, "france-1998");
    assert.notEqual(usa.title, fra.title);
    assert.notEqual(usa.introduction, fra.introduction);
    assert.equal(usa.manager, "Berti Vogts");
    assert.equal(fra.manager, "Berti Vogts");
    assert.notEqual(usa.captain, fra.captain);
  });

  it("TeamProfileContent is the same canonical renderer as Team Journeys", () => {
    assert.equal(TeamProfileContent, TeamDossier);
    const source = readFileSync(
      join(process.cwd(), "components/experiences/TeamProfileOverlay.tsx"),
      "utf8"
    );
    assert.match(source, /TeamProfileContent/);
    assert.doesNotMatch(source, /Start Journey|Continue Journey|Campaign progress|team-epilogue/);
  });
});

describe("Match Team Profile overlay entry points", () => {
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

  function germanyBoliviaMatch() {
    const experience = getExperienceByRoute("usa-1994", "story")!;
    const episodes = resolveExperienceEpisodes(experience);
    const episode = episodes.find((e) => e.match === "Germany vs Bolivia")!;
    assert.ok(episode, "Germany vs Bolivia episode");
    return { experience, episode };
  }

  it("both Match header teams are interactive and open the correct profile", async () => {
    const { experience, episode } = germanyBoliviaMatch();
    const historyLenBefore = dom
      ? null
      : null;
    const host = mount(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: "USA 1994",
        completed: false,
        prev: null,
        next: null,
        standings: {
          group: "C",
          rows: [
            { team: "Germany", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            { team: "Spain", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            { team: "South Korea", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            { team: "Bolivia", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
          ],
        },
        onClose: () => undefined,
        onToggleComplete: () => undefined,
        onOpen: () => undefined,
        onBackToList: () => undefined,
        onBackToExperienceHome: () => undefined,
      })
    );
    await settle(2);

    const triggers = [
      ...host.querySelectorAll('[data-testid="team-profile-trigger"]'),
    ] as HTMLButtonElement[];
    const headerTriggers = triggers.filter((el) =>
      el.className.includes("match-experience__team-trigger")
    );
    assert.equal(headerTriggers.length, 2);

    const germanyBtn = headerTriggers.find(
      (el) => el.getAttribute("data-team-name") === "Germany"
    )!;
    const boliviaBtn = headerTriggers.find(
      (el) => el.getAttribute("data-team-name") === "Bolivia"
    )!;
    assert.ok(germanyBtn);
    assert.ok(boliviaBtn);
    assert.equal(
      germanyBtn.getAttribute("aria-label"),
      teamProfileAriaLabel("usa-1994", "Germany")
    );
    assert.match(germanyBtn.getAttribute("aria-label") || "", /Germany/);
    assert.match(germanyBtn.getAttribute("aria-label") || "", /USA/);

    const historyBefore = dom!.window.history.length;
    germanyBtn.focus();
    germanyBtn.click();
    await settle(3);

    const overlay = host.querySelector('[data-testid="team-profile-overlay"]');
    assert.ok(overlay);
    assert.match(overlay!.textContent || "", /Team Profile/);
    assert.match(overlay!.textContent || "", /Berti Vogts/);
    assert.doesNotMatch(overlay!.textContent || "", /Start Journey|Continue Journey|Campaign progress|After the final whistle/);
    assert.equal(dom!.window.history.length, historyBefore);

    // Escape closes
    dom!.window.document.dispatchEvent(
      new dom!.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    await settle(3);
    assert.equal(host.querySelector('[data-testid="team-profile-overlay"]'), null);
    assert.equal(dom!.window.document.activeElement, germanyBtn);

    // Bolivia opens Bolivia profile
    boliviaBtn.click();
    await settle(3);
    const boliviaOverlay = host.querySelector(
      '[data-testid="team-profile-overlay"]'
    );
    assert.ok(boliviaOverlay);
    assert.match(boliviaOverlay!.textContent || "", /Xabier Azkargorta|Bolivia/);
    assert.doesNotMatch(boliviaOverlay!.textContent || "", /Berti Vogts/);

    void historyLenBefore;
  });

  it("standings-table team names open the correct profile", async () => {
    const { experience, episode } = germanyBoliviaMatch();
    const host = mount(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: "USA 1994",
        completed: false,
        prev: null,
        next: null,
        standings: {
          group: "C",
          rows: [
            { team: "Germany", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            { team: "Spain", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            { team: "South Korea", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            { team: "Bolivia", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
          ],
        },
        onClose: () => undefined,
        onToggleComplete: () => undefined,
        onOpen: () => undefined,
        onBackToList: () => undefined,
        onBackToExperienceHome: () => undefined,
      })
    );
    await settle(2);

    const spainTrigger = [
      ...host.querySelectorAll(".standings-table__team-trigger"),
    ].find((el) => el.getAttribute("data-team-name") === "Spain") as HTMLButtonElement;
    assert.ok(spainTrigger);
    spainTrigger.click();
    await settle(3);
    const overlay = host.querySelector('[data-testid="team-profile-overlay"]');
    assert.ok(overlay);
    assert.match(overlay!.textContent || "", /Javier Clemente|Spain/);
  });

  it("opening and closing the overlay does not affect match progress or scroll", async () => {
    const { experience, episode } = germanyBoliviaMatch();
    let completed = false;
    const host = mount(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: "USA 1994",
        completed,
        prev: null,
        next: null,
        standings: null,
        onClose: () => undefined,
        onToggleComplete: () => {
          completed = true;
        },
        onOpen: () => undefined,
        onBackToList: () => undefined,
        onBackToExperienceHome: () => undefined,
      })
    );
    await settle(2);

    const modal = host.querySelector(
      '[data-testid="match-experience-modal"]'
    ) as HTMLElement;
    modal.scrollTop = 140;
    const trigger = host.querySelector(
      '.match-experience__team-trigger[data-team-name="Germany"]'
    ) as HTMLButtonElement;
    trigger.click();
    await settle(3);
    assert.ok(host.querySelector('[data-testid="team-profile-overlay"]'));
    assert.equal(completed, false);

    dom!.window.document.dispatchEvent(
      new dom!.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    await settle(3);
    assert.equal(host.querySelector('[data-testid="team-profile-overlay"]'), null);
    assert.equal(completed, false);
    assert.equal(modal.scrollTop, 140);
  });

  it("overlay defaults closed and does not push history", async () => {
    const { experience, episode } = germanyBoliviaMatch();
    const host = mount(
      createElement(MatchExperienceModal, {
        episode,
        experience,
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
    await settle(2);
    assert.equal(host.querySelector('[data-testid="team-profile-overlay"]'), null);
    const before = dom!.window.history.length;
    (
      host.querySelector(
        '.match-experience__team-trigger[data-team-name="Germany"]'
      ) as HTMLButtonElement
    ).click();
    await settle(2);
    assert.ok(host.querySelector('[data-testid="team-profile-overlay"]'));
    assert.equal(dom!.window.history.length, before);
  });

  it("no future-tournament spoilers appear in Match-page profiles", () => {
    for (const name of USA_1994_PARTICIPANT_NAMES) {
      const d = getTeamDossier("usa-1994", teamIdFromName(name))!;
      const blob = [
        d.title,
        d.introduction,
        d.beforeTheTournament.majorStorylines,
        d.tournamentOutlook.summary,
        ...d.keyPlayers.map((p) => p.note),
      ].join(" ");
      assert.doesNotMatch(blob, /\beliminated in\b/i);
      assert.doesNotMatch(blob, /\bwent on to\b/i);
      assert.doesNotMatch(blob, /\bgolden (boot|ball)\b/i);
      assert.doesNotMatch(blob, /\beventual(ly)?\b/i);
    }
  });
});

describe("TeamProfileOverlay focus and content", () => {
  let root: Root | null = null;
  let dom: ReturnType<typeof installDom> | null = null;

  afterEach(async () => {
    if (root) {
      try {
        flushSync(() => root?.unmount());
      } catch {
        // ignore
      }
      root = null;
    }
    await new Promise((r) => setTimeout(r, 20));
    dom?.restore();
    dom = null;
  });

  it("renders TeamProfileContent without journey controls", async () => {
    dom = installDom();
    const host = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(host);
    const trigger = dom.window.document.createElement("button");
    trigger.textContent = "Open";
    host.appendChild(trigger);
    let open = true;
    root = createRoot(host);
    const render = () => {
      flushSync(() => {
        root!.render(
          createElement(TeamProfileOverlay, {
            selection: open
              ? { tournamentId: "usa-1994", teamName: "Germany" }
              : null,
            onClose: () => {
              open = false;
              render();
            },
            returnFocusRef: { current: trigger },
          })
        );
      });
    };
    render();
    await settle(2);
    const overlay = host.querySelector('[data-testid="team-profile-overlay"]');
    assert.ok(overlay);
    assert.ok(overlay!.querySelector('[data-testid="team-dossier"]'));
    assert.doesNotMatch(
      overlay!.textContent || "",
      /Start Journey|Continue Journey|Campaign progress|unlocked next|After the final whistle|Campaign Epilogue/i
    );
  });
});
