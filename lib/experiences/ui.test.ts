import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import {
  experienceActionLabel,
  experiencePath,
  experienceProgress,
  filterEveryMatchEpisodes,
  formatWatchTime,
  getExperienceByRoute,
  getSupportedTeamJourneys,
  getTournamentExperienceOptions,
  resolveExperienceEpisodes,
  spoilerSafeMatchView,
  tournamentHomeBackLabel,
  type ExperienceEpisode,
} from "./index";
import type { TournamentId } from "@/lib/archive/types";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { ExperiencePicker } from "@/components/experiences/ExperiencePicker";
import { MatchCard } from "@/components/experiences/MatchCard";
import { StoryView } from "@/components/experiences/StoryView";
import { TeamMark } from "@/components/experiences/TeamMark";
import { ProgressBar } from "@/components/experiences/ProgressBar";
import { seasons } from "@/data/seasons";

const TOURNAMENTS: TournamentId[] = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
];

function sampleEpisode(
  overrides: Partial<ExperienceEpisode> = {}
): ExperienceEpisode {
  return {
    id: "sample",
    tournamentId: "usa-1994",
    canonicalMatchId: "usa-1994-001",
    n: 1,
    title: "United States vs Switzerland",
    match: "United States vs Switzerland",
    date: "June 18, 1994",
    city: "Pontiac",
    stage: "Group Stage",
    replay: { url: "https://example.com/replay" },
    postMatch: {
      score: "1-1",
      halftime: "0-0",
      goal: "Should never appear locked",
      keyEvents: ["Should never appear locked"],
      impactPlayers: [],
    },
    ...overrides,
  };
}

describe("production UI: experience cards for both tournaments", () => {
  for (const tournamentId of TOURNAMENTS) {
    it(`${tournamentId} renders all four experience cards with accurate progress`, () => {
      const options = getTournamentExperienceOptions(tournamentId);
      assert.equal(options.length, 4);

      const completed = new Set<string>();
      const story = getExperienceByRoute(tournamentId, "story")!;
      completed.add(story.canonicalMatchIds[0]!);

      const markup = options
        .map((option) => {
          if (option.type === "team") {
            return renderToStaticMarkup(
              createElement(ExperienceCard, {
                type: "team",
                title: option.title,
                description: option.shortDescription,
                matchCount: 0,
                completedCount: 0,
                percent: 0,
                primaryLabel: "Choose a team",
                onPrimary: () => undefined,
              })
            );
          }
          const experience = getExperienceByRoute(tournamentId, option.slug)!;
          const progress = experienceProgress(experience, completed);
          return renderToStaticMarkup(
            createElement(ExperienceCard, {
              type: option.type,
              title: option.title,
              description: option.shortDescription,
              matchCount: progress.total,
              completedCount: progress.completed,
              percent: progress.percent,
              onPrimary: () => undefined,
            })
          );
        })
        .join("\n");

      assert.match(markup, /The Story/);
      assert.match(markup, /The Essentials/);
      assert.match(markup, /Follow a Team/);
      assert.match(markup, /Every Match/);
      assert.match(markup, /data-experience-type="story"/);
      assert.match(markup, /data-experience-type="essentials"/);
      assert.match(markup, /data-experience-type="team"/);
      assert.match(markup, /data-experience-type="complete"/);

      const storyProgress = experienceProgress(story, completed);
      assert.equal(storyProgress.completed, 1);
      assert.ok(
        markup.includes(
          `${storyProgress.completed} of ${storyProgress.total} experienced`
        )
      );
      assert.match(markup, /Continue/);
      assert.match(markup, /Start|Choose a team/);
      assert.match(markup, new RegExp(formatWatchTime(story.canonicalMatchIds.length)));
      assert.match(markup, /Begin here|Recommended first/);
    });

    it(`${tournamentId} Start and Continue routes resolve correctly`, () => {
      assert.equal(
        experiencePath(tournamentId, "story"),
        `/tournaments/${tournamentId}/story`
      );
      assert.equal(
        experiencePath(tournamentId, "essentials"),
        `/tournaments/${tournamentId}/essentials`
      );
      assert.equal(
        experiencePath(tournamentId, "every-match"),
        `/tournaments/${tournamentId}/every-match`
      );
      assert.equal(
        experiencePath(tournamentId, "team"),
        `/tournaments/${tournamentId}/team`
      );

      const teams = getSupportedTeamJourneys(tournamentId);
      assert.ok(teams.length > 0);
      const first = teams[0]!;
      assert.equal(
        experiencePath(tournamentId, "team", first.teamId),
        `/tournaments/${tournamentId}/team/${first.teamId}`
      );

      const fresh = experienceActionLabel({ completed: 0, total: 10 });
      const mid = experienceActionLabel({ completed: 3, total: 10 });
      const done = experienceActionLabel({ completed: 10, total: 10 });
      assert.equal(fresh, "Start");
      assert.equal(mid, "Continue");
      assert.equal(done, "Review");
    });
  }
});

describe("production UI: Follow a Team", () => {
  for (const tournamentId of TOURNAMENTS) {
    it(`${tournamentId} team cards expose marks, counts, and routes`, () => {
      const teams = getSupportedTeamJourneys(tournamentId);
      for (const team of teams) {
        const mark = renderToStaticMarkup(
          createElement(TeamMark, { teamName: team.teamName, labelled: true })
        );
        assert.match(mark, new RegExp(`aria-label="${team.teamName}"`));

        const experience = getExperienceByRoute(tournamentId, "team", team.teamId);
        assert.ok(experience);
        assert.ok(experience!.canonicalMatchIds.length > 0);
        assert.equal(
          experiencePath(tournamentId, "team", team.teamId),
          `/tournaments/${tournamentId}/team/${team.teamId}`
        );
      }
    });

    it(`${tournamentId} Follow a Team card uses nation pills without a Choose a nation CTA`, () => {
      const markup = renderToStaticMarkup(
        createElement(ExperiencePicker, {
          tournamentId,
          completedCanonicalIds: new Set<string>(),
          onSelectOption: () => undefined,
          onSelectTeam: () => undefined,
          onOpenTeamPicker: () => undefined,
        })
      );
      assert.match(markup, /data-experience-type="team"/);
      assert.match(markup, /experience-card__teams/);
      assert.doesNotMatch(markup, /Choose a [Nn]ation/);
      const teamCard = markup.match(
        /data-experience-type="team"[\s\S]*?<\/article>/
      )?.[0];
      assert.ok(teamCard);
      assert.doesNotMatch(teamCard, /experience-card__cta/);
      assert.match(teamCard, /data-testid="follow-a-team-open"/);
    });
  }
});

describe("production UI: Every Match filters", () => {
  it("filters by stage, team, watched state, and search without exposing scores", () => {
    const experience = getExperienceByRoute("usa-1994", "every-match")!;
    const episodes = resolveExperienceEpisodes(experience);
    const metaById = new Map(
      episodes.map((ep) => {
        const [home, away] = ep.match.split(/\s+vs\s+/i);
        return [
          ep.canonicalMatchId,
          {
            homeTeam: home?.trim() ?? "",
            awayTeam: away?.trim() ?? "",
            group: ep.stage === "Group Stage" ? "A" : undefined,
          },
        ] as const;
      })
    );
    const completed = new Set([episodes[0]!.canonicalMatchId]);

    const byStage = filterEveryMatchEpisodes(
      episodes,
      {
        query: "",
        stage: "Final",
        group: "all",
        team: "all",
        watched: "all",
      },
      completed,
      metaById
    );
    assert.ok(byStage.length >= 1);
    assert.ok(byStage.every((ep) => ep.stage === "Final"));

    const byTeam = filterEveryMatchEpisodes(
      episodes,
      {
        query: "",
        stage: "all",
        group: "all",
        team: "Brazil",
        watched: "all",
      },
      completed,
      metaById
    );
    assert.ok(byTeam.length > 0);
    assert.ok(byTeam.every((ep) => ep.match.includes("Brazil")));

    const watched = filterEveryMatchEpisodes(
      episodes,
      {
        query: "",
        stage: "all",
        group: "all",
        team: "all",
        watched: "watched",
      },
      completed,
      metaById
    );
    assert.equal(watched.length, 1);

    const searched = filterEveryMatchEpisodes(
      episodes,
      {
        query: "pontiac",
        stage: "all",
        group: "all",
        team: "all",
        watched: "all",
      },
      completed,
      metaById
    );
    assert.ok(searched.every((ep) => ep.city.toLowerCase().includes("pontiac")));
  });
});

describe("production UI: spoiler-safe match cards", () => {
  it("does not expose scores or outcomes when classified", () => {
    const episode = sampleEpisode({
      stage: "Final",
      title: "Brazil vs Italy",
      match: "Brazil vs Italy",
      postMatch: {
        score: "0-0 (3-2 pens)",
        halftime: "0-0",
        goal: "Penalty drama",
        keyEvents: ["Baggio misses"],
        impactPlayers: [],
      },
    });

    const view = spoilerSafeMatchView(episode, {
      unlocked: false,
      hideKnockoutSpoilers: true,
    });
    assert.equal(view.classified, true);
    assert.equal(view.title, "Classified");
    assert.doesNotMatch(view.matchLabel, /0-0|pens|Baggio|score/i);

    const markup = renderToStaticMarkup(
      createElement(MatchCard, {
        episode,
        unlocked: false,
        done: false,
        isNext: false,
        startedExperience: false,
        hideKnockoutSpoilers: true,
        hasReplay: true,
        onSelect: () => undefined,
      })
    );

    assert.match(markup, /Classified|Locked/i);
    assert.doesNotMatch(markup, /0-0 \(3-2 pens\)/);
    assert.doesNotMatch(markup, /Baggio/);
    assert.doesNotMatch(markup, /Penalty drama/);
  });

  it("shows spoiler-safe teams when unlocked without scores", () => {
    const episode = sampleEpisode();
    const markup = renderToStaticMarkup(
      createElement(MatchCard, {
        episode,
        unlocked: true,
        done: false,
        isNext: true,
        startedExperience: true,
        hideKnockoutSpoilers: true,
        hasReplay: true,
        onSelect: () => undefined,
      })
    );
    assert.match(markup, /United States/);
    assert.match(markup, /Switzerland/);
    assert.match(markup, /Continue/);
    assert.doesNotMatch(markup, />1-1</);
  });
});

describe("production UI: Story view", () => {
  for (const tournamentId of TOURNAMENTS) {
    it(`${tournamentId} renders editorial hero and chapter timeline`, () => {
      const season = seasons.find((s) => s.id === tournamentId)!;
      const experience = getExperienceByRoute(tournamentId, "story")!;
      const episodes = resolveExperienceEpisodes(experience);
      const completed = new Set([episodes[0]!.canonicalMatchId]);

      const markup = renderToStaticMarkup(
        createElement(StoryView, {
          season,
          experience,
          episodes,
          completedCanonicalIds: completed,
          onBack: () => undefined,
          onOpenEpisode: () => undefined,
        })
      );

      assert.match(markup, /data-testid="story-view"/);
      assert.match(markup, /The Story/);
      assert.match(markup, new RegExp(season.name.replace(/[’']/g, "[’']")));
      assert.match(markup, /Continue Journey|Start Journey|Review Journey/);
      assert.match(markup, /story-timeline|journey-timeline/);
      assert.match(markup, /Chapter 01/);
      assert.match(markup, /Chapter 2 of/);
      assert.match(markup, /No spoilers/);
      assert.match(markup, /Contents/);
      assert.match(markup, /journey-chapter__teaser/);
      assert.doesNotMatch(markup, /Match list/);
      assert.doesNotMatch(markup, /Reset progress/);
      assert.doesNotMatch(markup, /continue-panel/);
    });
  }
});

describe("production UI: journey identities", () => {
  it("Essentials uses Moment labeling and blue accent", () => {
    const season = seasons.find((s) => s.id === "usa-1994")!;
    const experience = getExperienceByRoute("usa-1994", "essentials")!;
    const episodes = resolveExperienceEpisodes(experience);
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes,
        completedCanonicalIds: new Set(),
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
      })
    );
    assert.match(markup, /data-journey-type="essentials"/);
    assert.match(markup, /Moment 01/);
    assert.match(markup, /director.s cut|Director/i);
    assert.match(markup, /0 of \d+ moments completed/);
    assert.match(markup, /journey-view--accent-blue/);
  });

  it("Every Match uses Match labeling and green accent", () => {
    const season = seasons.find((s) => s.id === "usa-1994")!;
    const experience = getExperienceByRoute("usa-1994", "every-match")!;
    const episodes = resolveExperienceEpisodes(experience);
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes,
        completedCanonicalIds: new Set(),
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
      })
    );
    assert.match(markup, /data-journey-type="complete"/);
    assert.match(markup, /Match 01/);
    assert.match(markup, /Every match\. Every date/);
    assert.match(markup, /0 of \d+ matches completed/);
    assert.match(markup, /journey-view--accent-green/);
  });

  it("Team journey stays spoiler-free before the campaign begins", () => {
    const season = seasons.find((s) => s.id === "usa-1994")!;
    const experience = getExperienceByRoute("usa-1994", "team", "brazil")!;
    const episodes = resolveExperienceEpisodes(experience);
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes,
        completedCanonicalIds: new Set(),
        teamName: "Brazil",
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
      })
    );
    assert.match(markup, /data-journey-type="team"/);
    assert.match(markup, /Brazil/);
    assert.match(markup, /team-dossier/);
    assert.match(markup, />Team Profile</);
    assert.doesNotMatch(markup, /Team Dossier/);
    assert.match(markup, /Brazil at USA ’94/);
    assert.match(markup, /Campaign progress/);
    assert.match(markup, /Campaign entry/);
    assert.match(markup, /Next Match/);
    assert.match(markup, /Match to be revealed/);
    assert.match(markup, /journey-view--accent-warm/);
    assert.doesNotMatch(markup, /team-epilogue/);
    assert.doesNotMatch(markup, /Fourth Star|Fifth Star|Road to Glory/i);
    assert.doesNotMatch(markup, /\d+ matches/);
    assert.doesNotMatch(markup, /Round of 16|Quarter-final|Semi-final/);
    // Only the opening fixture is visible — not later tournament opponents.
    assert.doesNotMatch(markup, /Netherlands vs Brazil|Brazil vs Netherlands|Italy vs Brazil|Brazil vs Italy|Sweden vs Brazil|Brazil vs Sweden/);
    assert.match(markup, /Russia vs Brazil/);
  });

  it("USA 1994 Team Journey back link says Back to USA ’94", () => {
    const season = seasons.find((s) => s.id === "usa-1994")!;
    const experience = getExperienceByRoute("usa-1994", "team", "brazil")!;
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes: resolveExperienceEpisodes(experience),
        completedCanonicalIds: new Set(),
        teamName: "Brazil",
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
      })
    );
    assert.match(markup, /Back to USA [’']94/);
    assert.doesNotMatch(markup, />\s*←?\s*Teams\s*</);
    assert.equal(
      tournamentHomeBackLabel(season.name),
      "Back to USA ’94"
    );
  });

  it("France 1998 Team Journey back link says Back to France ’98", () => {
    const season = seasons.find((s) => s.id === "france-1998")!;
    const experience = getExperienceByRoute("france-1998", "team", "france")!;
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes: resolveExperienceEpisodes(experience),
        completedCanonicalIds: new Set(),
        teamName: "France",
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
      })
    );
    assert.match(markup, /Back to France [’']98/);
    assert.doesNotMatch(markup, />\s*←?\s*Teams\s*</);
    assert.equal(
      tournamentHomeBackLabel(season.name),
      "Back to France ’98"
    );
  });

  it("every Team Journey page omits the old Teams back label", () => {
    for (const tournamentId of TOURNAMENTS) {
      const season = seasons.find((s) => s.id === tournamentId)!;
      for (const team of getSupportedTeamJourneys(tournamentId)) {
        const experience = getExperienceByRoute(
          tournamentId,
          "team",
          team.teamId
        )!;
        const markup = renderToStaticMarkup(
          createElement(StoryView, {
            season,
            experience,
            episodes: resolveExperienceEpisodes(experience),
            completedCanonicalIds: new Set(),
            teamName: team.teamName,
            onBack: () => undefined,
            onOpenEpisode: () => undefined,
          })
        );
        assert.match(
          markup,
          new RegExp(
            `Back to ${season.name.replace(/[’']/g, "[’']")}`
          )
        );
        assert.doesNotMatch(markup, /← Teams/);
        assert.doesNotMatch(markup, /Browse Nations|Choose a Nation/);
      }
    }
  });

  it("Team journey reveals stats only after the campaign is complete", () => {
    const season = seasons.find((s) => s.id === "usa-1994")!;
    const experience = getExperienceByRoute("usa-1994", "team", "united-states")!;
    const episodes = resolveExperienceEpisodes(experience);
    const completed = new Set(episodes.map((ep) => ep.canonicalMatchId));
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes,
        completedCanonicalIds: completed,
        teamName: "United States",
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
      })
    );
    assert.match(markup, /Campaign Complete/);
    assert.match(markup, /Matches watched/);
    assert.match(markup, /Total watch time/);
    assert.match(markup, /Group Stage/);
  });
});

describe("production UI: accessibility and responsive primitives", () => {
  it("progress bar exposes progressbar semantics", () => {
    const markup = renderToStaticMarkup(
      createElement(ProgressBar, {
        value: 8,
        max: 32,
        label: "8 of 32 matches",
      })
    );
    assert.match(markup, /role="progressbar"/);
    assert.match(markup, /aria-valuenow="25"/);
    assert.match(markup, /aria-label="8 of 32 matches"/);
  });

  it("experience card primary actions are keyboard-focusable buttons", () => {
    const markup = renderToStaticMarkup(
      createElement(ExperienceCard, {
        type: "story",
        title: "The Story",
        description: "Curated journey",
        matchCount: 32,
        completedCount: 0,
        percent: 0,
        onPrimary: () => undefined,
        onSecondary: () => undefined,
        secondaryLabel: "Open match list",
      })
    );
    assert.match(markup, /<button type="button" class="experience-card__cta"/);
    assert.match(markup, /aria-label="Start The Story/);
    assert.match(markup, /Open match list/);
  });

  it("mobile-oriented cards avoid fixed overflow widths", () => {
    const markup = renderToStaticMarkup(
      createElement(MatchCard, {
        episode: sampleEpisode(),
        unlocked: true,
        done: false,
        isNext: false,
        startedExperience: false,
        hideKnockoutSpoilers: true,
        hasReplay: false,
        onSelect: () => undefined,
      })
    );
    assert.doesNotMatch(markup, /width:\s*\d{4,}px/);
    assert.match(markup, /match-card/);
    assert.match(markup, /Replay unavailable/);
  });
});
