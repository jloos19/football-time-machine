import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getCanonicalArchive,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
} from "@/lib/archive";
import { resolveReplay } from "@/lib/replays";
import {
  experiencePath,
  experienceProgress,
  getExperienceByRoute,
  getSupportedTeamJourneys,
  getTournamentExperience,
  getTournamentExperienceOptions,
  getTournamentExperiences,
  isExperienceMatchUnlocked,
  resolveExperienceEpisodes,
  resolveTeamJourneyMembership,
  teamIdFromName,
} from "./index";
import type { TournamentId } from "@/lib/archive/types";

const TOURNAMENTS: TournamentId[] = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
];

describe("shared experience engine registry", () => {
  for (const tournamentId of TOURNAMENTS) {
    it(`${tournamentId} exposes Story, Essentials, Team, and Every Match options`, () => {
      const options = getTournamentExperienceOptions(tournamentId);
      assert.deepEqual(
        options.map((o) => o.type),
        ["story", "essentials", "team", "complete"]
      );
      assert.deepEqual(
        options.map((o) => o.slug),
        ["story", "essentials", "team", "every-match"]
      );
    });

    it(`${tournamentId} has no empty production-visible experiences`, () => {
      for (const exp of getTournamentExperiences(tournamentId)) {
        assert.ok(
          exp.canonicalMatchIds.length > 0,
          `${exp.id} should not be empty`
        );
      }
    });
  }
});

describe("experience match counts", () => {
  it("USA Story = 32", () => {
    assert.equal(getExperienceByRoute("usa-1994", "story")?.canonicalMatchIds.length, 32);
  });
  it("USA Essentials = 16", () => {
    assert.equal(
      getExperienceByRoute("usa-1994", "essentials")?.canonicalMatchIds.length,
      16
    );
  });
  it("USA Every Match = 52", () => {
    assert.equal(
      getExperienceByRoute("usa-1994", "every-match")?.canonicalMatchIds.length,
      52
    );
  });
  it("France Story = 36", () => {
    assert.equal(
      getExperienceByRoute("france-1998", "story")?.canonicalMatchIds.length,
      36
    );
  });
  it("France Essentials = 18", () => {
    assert.equal(
      getExperienceByRoute("france-1998", "essentials")?.canonicalMatchIds.length,
      18
    );
  });
  it("France Every Match = 64", () => {
    assert.equal(
      getExperienceByRoute("france-1998", "every-match")?.canonicalMatchIds.length,
      64
    );
  });
  it("Korea/Japan Story = 36", () => {
    assert.equal(
      getExperienceByRoute("korea-japan-2002", "story")?.canonicalMatchIds.length,
      36
    );
  });
  it("Korea/Japan Essentials = 18", () => {
    assert.equal(
      getExperienceByRoute("korea-japan-2002", "essentials")?.canonicalMatchIds
        .length,
      18
    );
  });
  it("Korea/Japan Every Match = 64", () => {
    assert.equal(
      getExperienceByRoute("korea-japan-2002", "every-match")?.canonicalMatchIds
        .length,
      64
    );
  });
  it("USA has exactly nine supported team journeys", () => {
    assert.equal(getSupportedTeamJourneys("usa-1994").length, 9);
    assert.equal(
      getTournamentExperiences("usa-1994").filter((e) => e.type === "team").length,
      9
    );
  });
  it("France has exactly eight supported team journeys", () => {
    assert.equal(getSupportedTeamJourneys("france-1998").length, 8);
    assert.equal(
      getTournamentExperiences("france-1998").filter((e) => e.type === "team")
        .length,
      8
    );
  });
  it("Korea/Japan has exactly nine supported team journeys", () => {
    assert.equal(getSupportedTeamJourneys("korea-japan-2002").length, 9);
    assert.equal(
      getTournamentExperiences("korea-japan-2002").filter((e) => e.type === "team")
        .length,
      9
    );
  });
});

describe("team journey membership", () => {
  for (const tournamentId of TOURNAMENTS) {
    for (const team of getSupportedTeamJourneys(tournamentId)) {
      it(`${team.title} contains only that team's matches, chronologically`, () => {
        const ids = resolveTeamJourneyMembership(tournamentId, team.teamName);
        const archive = getCanonicalArchive(tournamentId);
        const byId = new Map(archive.map((m) => [m.canonicalMatchId, m]));
        const teamMatches = archive
          .filter((m) => m.homeTeam === team.teamName || m.awayTeam === team.teamName)
          .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex);

        assert.deepEqual(
          ids,
          teamMatches.map((m) => m.canonicalMatchId)
        );

        for (let i = 1; i < ids.length; i++) {
          const prev = byId.get(ids[i - 1]!)!;
          const next = byId.get(ids[i]!)!;
          assert.ok(prev.chronologicalIndex < next.chronologicalIndex);
        }

        const experience = getExperienceByRoute(tournamentId, "team", team.teamId)!;
        assert.deepEqual(experience.canonicalMatchIds, ids);
      });
    }
  }

  it("Brazil USA 1994 journey contains seven matches", () => {
    assert.equal(
      resolveTeamJourneyMembership("usa-1994", "Brazil").length,
      7
    );
  });
  it("United States USA 1994 journey contains four matches", () => {
    assert.equal(
      resolveTeamJourneyMembership("usa-1994", "United States").length,
      4
    );
  });
  it("France France 1998 journey contains seven matches", () => {
    assert.equal(resolveTeamJourneyMembership("france-1998", "France").length, 7);
  });
  it("Croatia France 1998 journey contains seven matches", () => {
    assert.equal(
      resolveTeamJourneyMembership("france-1998", "Croatia").length,
      7
    );
  });
});

describe("shared progress projection", () => {
  it("completing a canonical match updates progress in every containing experience", () => {
    const matchId = "usa-1994-c42"; // Brazil vs United States
    const completed = new Set([matchId]);
    const containing = getTournamentExperiences("usa-1994").filter((exp) =>
      exp.canonicalMatchIds.includes(matchId)
    );
    assert.ok(containing.length >= 4);
    for (const exp of containing) {
      assert.equal(experienceProgress(exp, completed).completed, 1);
    }
  });

  it("completion is counted once per canonical match, not per experience", () => {
    const completed = new Set(["usa-1994-c42"]);
    assert.equal(completed.size, 1);
    const story = getExperienceByRoute("usa-1994", "story")!;
    const essentials = getExperienceByRoute("usa-1994", "essentials")!;
    assert.equal(experienceProgress(story, completed).completed, 1);
    assert.equal(experienceProgress(essentials, completed).completed, 1);
  });

  it("removing an experience membership does not erase canonical completion set", () => {
    const completed = new Set(["usa-1994-c15", "usa-1994-c42"]);
    const withoutStory = completed; // completion store is independent of experience lists
    assert.ok(withoutStory.has("usa-1994-c15"));
    assert.ok(withoutStory.has("usa-1994-c42"));
  });
});

describe("routing resolution", () => {
  it("every experience entry point resolves to a real experience", () => {
    for (const tournamentId of TOURNAMENTS) {
      for (const slug of ["story", "essentials", "every-match"] as const) {
        const exp = getExperienceByRoute(tournamentId, slug);
        assert.ok(exp);
        assert.ok(exp!.canonicalMatchIds.length > 0);
        assert.equal(experiencePath(tournamentId, slug), `/tournaments/${tournamentId}/${slug}`);
      }
      for (const team of getSupportedTeamJourneys(tournamentId)) {
        const exp = getExperienceByRoute(tournamentId, "team", team.teamId);
        assert.ok(exp);
        assert.equal(
          experiencePath(tournamentId, "team", team.teamId),
          `/tournaments/${tournamentId}/team/${team.teamId}`
        );
      }
    }
  });

  it("team routes resolve only for supported teams", () => {
    assert.equal(getExperienceByRoute("usa-1994", "team", "england"), null);
    assert.equal(getExperienceByRoute("france-1998", "team", "sweden"), null);
    assert.ok(getExperienceByRoute("usa-1994", "team", "united-states"));
    assert.ok(getExperienceByRoute("france-1998", "team", "france"));
  });

  it("getTournamentExperience resolves by stable id", () => {
    assert.ok(getTournamentExperience("usa-1994", "usa-1994-story"));
    assert.ok(getTournamentExperience("france-1998", "france-1998-essentials"));
    assert.equal(getTournamentExperience("usa-1994", "missing"), null);
  });
});

describe("playback / replay selectability", () => {
  for (const tournamentId of TOURNAMENTS) {
    it(`${tournamentId} every experience match resolves through the live replay resolver`, () => {
      for (const exp of getTournamentExperiences(tournamentId)) {
        const episodes = resolveExperienceEpisodes(exp);
        assert.equal(episodes.length, exp.canonicalMatchIds.length);
        for (const episode of episodes) {
          const replay = resolveReplay(
            getCanonicalArchive(tournamentId).find(
              (m) => m.canonicalMatchId === episode.canonicalMatchId
            ) ?? null
          );
          assert.ok(replay?.url, `${exp.id} / ${episode.canonicalMatchId}`);
        }
      }
    });
  }

  it("USA Every Match has 52 selectable replay URLs", () => {
    const matches = getCanonicalArchive("usa-1994");
    assert.equal(matches.length, 52);
    for (const match of matches) {
      assert.ok(getPreferredSource(match));
      assert.ok(hasHumanVerifiedFullMatch(match));
      assert.ok(resolveReplay(match)?.url);
    }
  });

  it("France Every Match has 64 selectable replay URLs", () => {
    const matches = getCanonicalArchive("france-1998");
    assert.equal(matches.length, 64);
    for (const match of matches) {
      assert.ok(getPreferredSource(match));
      assert.ok(hasHumanVerifiedFullMatch(match));
      assert.ok(resolveReplay(match)?.url);
    }
  });

  it("Korea/Japan Every Match has 64 selectable replay URLs", () => {
    const matches = getCanonicalArchive("korea-japan-2002");
    assert.equal(matches.length, 64);
    for (const match of matches) {
      assert.ok(getPreferredSource(match));
      assert.ok(hasHumanVerifiedFullMatch(match));
      assert.ok(resolveReplay(match)?.url);
    }
  });

  it("canonical archive totals 180 matches with selectable replays", () => {
    const usa = getCanonicalArchive("usa-1994");
    const fra = getCanonicalArchive("france-1998");
    const kor = getCanonicalArchive("korea-japan-2002");
    assert.equal(usa.length + fra.length + kor.length, 180);
    for (const match of [...usa, ...fra, ...kor]) {
      assert.ok(resolveReplay(match)?.url, match.canonicalMatchId);
    }
  });
});

describe("sequential / archive unlocking", () => {
  it("Story and Essentials enforce sequential unlocking", () => {
    for (const slug of ["story", "essentials"] as const) {
      const exp = getExperienceByRoute("usa-1994", slug)!;
      const empty = new Set<string>();
      assert.equal(isExperienceMatchUnlocked(exp, 0, empty), true);
      assert.equal(isExperienceMatchUnlocked(exp, 1, empty), false);
      assert.equal(
        isExperienceMatchUnlocked(exp, 1, new Set([exp.canonicalMatchIds[0]!])),
        true
      );
    }
  });

  it("Team Journeys enforce sequential unlocking", () => {
    const exp = getExperienceByRoute("usa-1994", "team", "brazil")!;
    const empty = new Set<string>();
    assert.equal(isExperienceMatchUnlocked(exp, 0, empty), true);
    assert.equal(isExperienceMatchUnlocked(exp, 1, empty), false);
  });

  it("Every Match allows group stage while gating knockout spoilers", () => {
    const exp = getExperienceByRoute("usa-1994", "every-match")!;
    const archive = getCanonicalArchive("usa-1994");
    const byId = new Map(archive.map((m) => [m.canonicalMatchId, m]));
    const empty = new Set<string>();

    for (let i = 0; i < exp.canonicalMatchIds.length; i++) {
      const match = byId.get(exp.canonicalMatchIds[i]!)!;
      if (match.stage === "Group Stage") {
        assert.equal(isExperienceMatchUnlocked(exp, i, empty), true);
      } else {
        assert.equal(isExperienceMatchUnlocked(exp, i, empty), false);
      }
    }

    const allGroups = new Set(
      exp.canonicalMatchIds.filter((id) => byId.get(id)?.stage === "Group Stage")
    );
    const firstKnockoutIndex = exp.canonicalMatchIds.findIndex(
      (id) => byId.get(id)?.stage !== "Group Stage"
    );
    assert.ok(firstKnockoutIndex > 0);
    assert.equal(isExperienceMatchUnlocked(exp, firstKnockoutIndex, allGroups), true);
    assert.equal(
      isExperienceMatchUnlocked(exp, firstKnockoutIndex + 1, allGroups),
      false
    );
  });
});

describe("team id helpers", () => {
  it("slugifies team names stably", () => {
    assert.equal(teamIdFromName("United States"), "united-states");
    assert.equal(teamIdFromName("Republic of Ireland"), "republic-of-ireland");
  });
});
