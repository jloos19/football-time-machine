import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import type { TournamentId } from "@/lib/archive/types";
import {
  getExperienceByRoute,
  getSupportedTeamJourneys,
  MATCH_EDITORIAL_SECTIONS,
  MATCH_TYPE,
  resolveExperienceEpisodes,
  type ExperienceEpisode,
} from "./index";
import { seasons } from "@/data/seasons";

const TOURNAMENTS: TournamentId[] = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
];
const EXPERIENCE_ROUTES = ["story", "essentials", "every-match"] as const;

function noop() {}

function withEditorial(episode: ExperienceEpisode): ExperienceEpisode {
  const fallbackPlayers = [
    {
      name: "Player A",
      team: "Nation",
      role: "Forward",
      summary: "Carried the opening hour with composure.",
    },
  ];
  const existing = episode.postMatch;

  return {
    ...episode,
    scene: episode.scene ?? "Scene setter context for typography checks.",
    world: episode.world ?? "World context for typography checks.",
    tournament: episode.tournament ?? "Tournament context for typography checks.",
    intro: episode.intro ?? "Stakes context for typography checks.",
    postMatch: {
      score: existing?.score ?? "2-1",
      halftime: existing?.halftime ?? "HT 1-0",
      goal: existing?.goal || "Player A 12'; Player B 67'",
      keyEvents:
        existing?.keyEvents?.length ? existing.keyEvents : ["A sharp opening. A late reply."],
      matchReport:
        existing?.matchReport ??
        "A sharp opening shaped the hour before a late reply settled the archive.",
      impactPlayers:
        existing?.impactPlayers?.length ? existing.impactPlayers : fallbackPlayers,
      sourceNote: existing?.sourceNote ?? "Archive citation for typography checks.",
    },
  };
}

function resolveExperience(tournamentId: TournamentId, route: string) {
  if (route === "team") {
    const team = getSupportedTeamJourneys(tournamentId)[0];
    assert.ok(team, `missing team journey for ${tournamentId}`);
    return getExperienceByRoute(tournamentId, "team", team.teamId);
  }
  return getExperienceByRoute(tournamentId, route);
}

function renderMatchPage(options: {
  tournamentId: TournamentId;
  route: string;
  completed?: boolean;
  withStandings?: boolean;
}) {
  const experience = resolveExperience(options.tournamentId, options.route);
  assert.ok(experience, `missing experience for ${options.tournamentId}/${options.route}`);
  const episodes = resolveExperienceEpisodes(experience);
  assert.ok(episodes.length > 0);

  const episode = withEditorial(episodes[0]!);
  const next = episodes[1] ? withEditorial(episodes[1]) : null;
  const season = seasons.find((s) => s.id === options.tournamentId)!;
  const [home = "Home", away = "Away"] = episode.match.split(/\s+vs\s+/i);

  return renderToStaticMarkup(
    createElement(MatchExperienceModal, {
      episode,
      experience,
      tournamentName: season.name,
      completed: options.completed ?? false,
      prev: null,
      next,
      standings: options.withStandings
        ? {
            group: "A",
            rows: [
              { team: home, p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
              { team: away, p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
            ],
          }
        : null,
      onClose: noop,
      onToggleComplete: noop,
      onOpen: noop,
      onBackToList: noop,
      onBackToExperienceHome: noop,
    })
  );
}

function bodyClassForSection(markup: string, section: string): string | null {
  const pattern = new RegExp(
    `data-editorial-section="${section}"[\\s\\S]*?<p class="([^"]*)"`,
    "i"
  );
  const match = markup.match(pattern);
  return match?.[1] ?? null;
}

describe("match typography system", () => {
  it("exports one shared class map for editorial and interface roles", () => {
    assert.equal(MATCH_TYPE.body, "match-type-body");
    assert.equal(MATCH_TYPE.heading, "match-type-heading");
    assert.equal(MATCH_TYPE.meta, "match-type-meta");
    assert.equal(MATCH_TYPE.eyebrow, "match-type-eyebrow");
    assert.equal(MATCH_TYPE.playerName, "match-type-player-name");
    assert.equal(MATCH_TYPE.playerRole, "match-type-player-role");
    assert.equal(MATCH_TYPE.table, "match-type-table");
    assert.match(MATCH_TYPE.actionPrimary, /match-type-action/);
    assert.match(MATCH_TYPE.actionSecondary, /match-type-action--secondary/);
    assert.deepEqual([...MATCH_EDITORIAL_SECTIONS], [
      "Scene setter",
      "Around the world",
      "In the tournament",
      "Why this match matters",
    ]);
  });

  it("uses the same editorial body class for pre-match narrative sections", () => {
    const markup = renderMatchPage({
      tournamentId: "usa-1994",
      route: "story",
    });

    const classes = MATCH_EDITORIAL_SECTIONS.map((section) =>
      bodyClassForSection(markup, section)
    );

    for (const className of classes) {
      assert.ok(className, "editorial section body missing");
      assert.match(className!, new RegExp(`\\b${MATCH_TYPE.body}\\b`));
      assert.doesNotMatch(className!, /match-chapter__body--lead|match-chapter__body--emphasis/);
    }

    assert.equal(classes[0], classes[1]);
    assert.equal(classes[1], classes[2]);
    assert.equal(classes[2], classes[3]);
  });

  it("uses editorial body for match report and player descriptions", () => {
    const markup = renderMatchPage({
      tournamentId: "france-1998",
      route: "story",
      completed: true,
    });

    assert.match(
      markup,
      new RegExp(`data-editorial-section="Match report"[\\s\\S]*?${MATCH_TYPE.body}`)
    );
    assert.match(markup, new RegExp(`impact-exhibit__name[^"]*${MATCH_TYPE.playerName}`));
    assert.match(markup, new RegExp(`impact-exhibit__summary[^"]*${MATCH_TYPE.body}`));
    assert.match(markup, new RegExp(`impact-exhibit__role[^"]*${MATCH_TYPE.playerRole}`));
  });

  it("uses interface typography for metadata, eyebrows, and action buttons", () => {
    const markup = renderMatchPage({
      tournamentId: "usa-1994",
      route: "essentials",
    });

    assert.match(markup, new RegExp(`match-experience__meta[^"]*${MATCH_TYPE.meta}`));
    assert.match(markup, new RegExp(`match-experience__context[^"]*${MATCH_TYPE.meta}`));
    assert.match(markup, new RegExp(`kicker red[^"]*${MATCH_TYPE.eyebrow}`));
    assert.match(markup, new RegExp(`watch-button[^"]*${MATCH_TYPE.action}`));
    assert.match(markup, new RegExp(`secondary-button[^"]*${MATCH_TYPE.actionSecondary}`));
    assert.match(markup, /▶ Watch Match/);
    assert.match(markup, /Mark complete/);
  });

  it("keeps standings tables on the sans-serif table class", () => {
    const markup = renderMatchPage({
      tournamentId: "usa-1994",
      route: "story",
      withStandings: true,
    });

    assert.match(markup, new RegExp(`standings-table[^"]*${MATCH_TYPE.table}`));
    assert.match(markup, new RegExp(`table-note[^"]*${MATCH_TYPE.meta}`));
    assert.match(markup, /standings-table__row--featured/);
    assert.doesNotMatch(
      markup,
      /standings-table__row--featured[\s\S]{0,120}match-type-player-name|font-serif/
    );
  });

  for (const tournamentId of TOURNAMENTS) {
    for (const route of EXPERIENCE_ROUTES) {
      it(`${tournamentId} / ${route} match page shares the typography system`, () => {
        const markup = renderMatchPage({ tournamentId, route });

        assert.match(markup, /data-testid="match-experience-modal"/);
        for (const section of MATCH_EDITORIAL_SECTIONS) {
          const className = bodyClassForSection(markup, section);
          assert.ok(className?.includes(MATCH_TYPE.body), `${section} body class`);
        }
        assert.match(markup, new RegExp(MATCH_TYPE.heading));
        assert.match(markup, new RegExp(MATCH_TYPE.meta));
        assert.match(markup, new RegExp(MATCH_TYPE.action));
        assert.match(markup, /match-type-action--primary/);
      });
    }

    it(`${tournamentId} team journey match page shares the typography system`, () => {
      const markup = renderMatchPage({
        tournamentId,
        route: "team",
        completed: true,
      });

      assert.match(markup, /data-testid="match-experience-modal"/);
      assert.match(markup, new RegExp(MATCH_TYPE.body));
      assert.match(markup, new RegExp(`post-report__heading[^"]*${MATCH_TYPE.heading}`));
      assert.match(markup, new RegExp(`scoreboard[\\s\\S]*?${MATCH_TYPE.eyebrow}`));
      assert.match(markup, new RegExp(`next-match__kicker[^"]*${MATCH_TYPE.eyebrow}`));
      assert.match(markup, new RegExp(`next-match__title[^"]*${MATCH_TYPE.heading}`));
      assert.match(markup, new RegExp(`next-match__match[^"]*${MATCH_TYPE.meta}`));
    });
  }

  it("renders USA 1994 and France 1998 with identical typography class contracts", () => {
    const usa = renderMatchPage({
      tournamentId: "usa-1994",
      route: "story",
      completed: true,
      withStandings: true,
    });
    const france = renderMatchPage({
      tournamentId: "france-1998",
      route: "story",
      completed: true,
      withStandings: true,
    });

    for (const section of MATCH_EDITORIAL_SECTIONS) {
      assert.equal(
        bodyClassForSection(usa, section),
        bodyClassForSection(france, section)
      );
    }

    const sharedTokens = [
      MATCH_TYPE.body,
      MATCH_TYPE.heading,
      MATCH_TYPE.meta,
      MATCH_TYPE.eyebrow,
      MATCH_TYPE.playerName,
      MATCH_TYPE.playerRole,
      MATCH_TYPE.table,
      MATCH_TYPE.action,
    ];

    for (const token of sharedTokens) {
      assert.match(usa, new RegExp(token));
      assert.match(france, new RegExp(token));
    }
  });
});
