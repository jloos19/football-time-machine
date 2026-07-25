import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  USA_1994_DAILYMOTION_VERIFIED_BY,
  USA_1994_FIFA_VERIFIED_BY,
  USA_1994_JOURNEY_GROUP_STAGE,
  USA_1994_JOURNEY_KNOCKOUT,
  USA_1994_JOURNEY_MEMBERSHIP,
  USA_1994_REPLAY_CATALOG,
} from "./usa1994-replay-catalog";
import {
  Usa1994CatalogMappingError,
  findCanonicalMatchForUsa1994Entry,
  mapUsa1994ReplayCatalog,
} from "./usa1994-replay-apply";
import {
  getCanonicalArchive,
  getExperience,
  getExperienceMatches,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
  isProductionReadySource,
} from "./index";
import { usa1994Matches } from "./matches/usa1994";
import { resolveReplay } from "@/lib/replays";
import { USA_1994_ESSENTIALS } from "@/data/experiences/usa-1994/essentials";
import { USA_1994_TEAM_JOURNEYS } from "@/data/experiences/usa-1994/team-journeys";
import { USA_1994_STORY } from "@/data/experiences/usa-1994/story";

const FIFA_WATCH_PREFIX = "https://www.fifa.com/en/watch/";
const DAILYMOTION_PREFIX = "https://www.dailymotion.com/video/";
const BLOCKED_STATUSES = new Set(["dead", "wrong-match", "private", "needs-review"]);

const PROOF_CASES = [
  {
    title: "United States vs Colombia",
    teams: ["United States", "Colombia"] as const,
    stage: "Group Stage" as const,
    group: "A",
    url: "https://www.dailymotion.com/video/x9ja742",
  },
  {
    title: "Brazil vs Russia",
    teams: ["Brazil", "Russia"] as const,
    stage: "Group Stage" as const,
    group: "B",
    url: "https://www.fifa.com/en/watch/3cIv3vMoVzk0y6NWXQB2Q6",
  },
  {
    title: "Argentina vs Bulgaria",
    teams: ["Argentina", "Bulgaria"] as const,
    stage: "Group Stage" as const,
    group: "D",
    url: "https://www.dailymotion.com/video/x9jvcl2",
  },
  {
    title: "Italy vs Mexico",
    teams: ["Italy", "Mexico"] as const,
    stage: "Group Stage" as const,
    group: "E",
    url: "https://www.dailymotion.com/video/x9k2qyu",
  },
  {
    title: "Norway vs Republic of Ireland",
    teams: ["Norway", "Republic of Ireland"] as const,
    stage: "Group Stage" as const,
    group: "E",
    url: "https://www.dailymotion.com/video/x9k2qyo",
  },
  {
    title: "Morocco vs Netherlands",
    teams: ["Morocco", "Netherlands"] as const,
    stage: "Group Stage" as const,
    group: "F",
    url: "https://www.fifa.com/en/watch/4dG0ibZynW7kkZcagDYPin",
  },
  {
    title: "Brazil vs Italy",
    teams: ["Brazil", "Italy"] as const,
    stage: "Final" as const,
    url: "https://www.fifa.com/en/watch/5gHFVHGXu1z25dDe6id7TE",
  },
] as const;

describe("USA 1994 curated replay catalog", () => {
  const matches = getCanonicalArchive("usa-1994");
  const mappings = mapUsa1994ReplayCatalog(matches);
  const journey = getExperience("usa-1994", "journey");
  const complete = getExperience("usa-1994", "complete");
  const journeyIds = journey?.canonicalMatchIds ?? [];
  const journeySet = new Set(journeyIds);
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, m]));

  const suppliedUrlByMatchId = new Map<string, string>();
  for (const { entry, match } of mappings) {
    suppliedUrlByMatchId.set(match.canonicalMatchId, entry.url);
  }

  it("contains exactly 52 unique canonical matches", () => {
    assert.equal(matches.length, 52);
    assert.equal(new Set(matches.map((m) => m.canonicalMatchId)).size, 52);
    assert.equal(usa1994Matches.length, 52);
  });

  it("maps all 52 catalog records exactly once", () => {
    assert.equal(USA_1994_REPLAY_CATALOG.length, 52);
    assert.equal(mappings.length, 52);
    assert.equal(new Set(USA_1994_REPLAY_CATALOG.map((e) => e.url)).size, 52);
    assert.equal(new Set(mappings.map((m) => m.match.canonicalMatchId)).size, 52);
  });

  it("every canonical match has a production-selectable replay", () => {
    for (const match of matches) {
      const preferred = getPreferredSource(match);
      assert.ok(preferred, `${match.canonicalMatchId} missing preferred source`);
      assert.ok(isProductionReadySource(preferred!));
      assert.ok(hasHumanVerifiedFullMatch(match));
      assert.ok(resolveReplay(match)?.url);
    }
  });

  it("provider totals are FIFA 36 and Dailymotion 16", () => {
    const fifa = USA_1994_REPLAY_CATALOG.filter((e) => e.provider === "FIFA");
    const dailymotion = USA_1994_REPLAY_CATALOG.filter(
      (e) => e.provider === "Dailymotion"
    );
    assert.equal(fifa.length, 36);
    assert.equal(dailymotion.length, 16);

    let liveFifa = 0;
    let liveDm = 0;
    for (const match of matches) {
      const preferred = getPreferredSource(match)!;
      if (preferred.provider === "FIFA") liveFifa += 1;
      if (preferred.provider === "Dailymotion") liveDm += 1;
    }
    assert.equal(liveFifa, 36);
    assert.equal(liveDm, 16);
  });

  it("every supplied FIFA URL begins with fifa.com/en/watch/", () => {
    for (const entry of USA_1994_REPLAY_CATALOG.filter((e) => e.provider === "FIFA")) {
      assert.ok(entry.url.startsWith(FIFA_WATCH_PREFIX), entry.url);
    }
  });

  it("every supplied Dailymotion URL begins with dailymotion.com/video/", () => {
    for (const entry of USA_1994_REPLAY_CATALOG.filter(
      (e) => e.provider === "Dailymotion"
    )) {
      assert.ok(entry.url.startsWith(DAILYMOTION_PREFIX), entry.url);
    }
  });

  it("contains no duplicate replay URLs", () => {
    const urls = USA_1994_REPLAY_CATALOG.map((e) => e.url);
    assert.equal(new Set(urls).size, urls.length);
  });

  it("fails closed when a record maps to zero or multiple matches", () => {
    assert.throws(
      () =>
        findCanonicalMatchForUsa1994Entry(
          {
            title: "Ghost vs Phantom",
            teams: ["Ghost", "Phantom"],
            stage: "Group Stage",
            group: "Z",
          },
          matches
        ),
      (error: unknown) =>
        error instanceof Usa1994CatalogMappingError &&
        error.title === "Ghost vs Phantom"
    );
  });

  it("maps every supplied record to exactly one canonical match", () => {
    for (const entry of USA_1994_REPLAY_CATALOG) {
      const match = findCanonicalMatchForUsa1994Entry(entry, matches);
      assert.equal(match.tournamentId, "usa-1994");
    }
  });

  it("no canonical match has more than one preferred source", () => {
    for (const match of matches) {
      const preferredId = match.preferredSourceId;
      assert.ok(preferredId, match.canonicalMatchId);
      const preferredSources = match.replaySources.filter(
        (s) => s.id === preferredId && isProductionReadySource(s)
      );
      assert.equal(preferredSources.length, 1, match.canonicalMatchId);
      assert.equal(getPreferredSource(match)?.id, preferredId);
    }
  });

  it("FIFA outranks Dailymotion when both providers exist for the same match", () => {
    for (const match of matches) {
      const fifa = match.replaySources.find(
        (s) => s.provider === "FIFA" && isProductionReadySource(s)
      );
      const preferred = getPreferredSource(match);
      if (fifa) {
        assert.equal(preferred?.provider, "FIFA", match.canonicalMatchId);
        assert.equal(preferred?.url, fifa.url, match.canonicalMatchId);
      }
    }
  });

  it("Journey contains exactly 32 unique canonical matches", () => {
    assert.equal(USA_1994_JOURNEY_MEMBERSHIP.length, 32);
    assert.equal(journeyIds.length, 32);
    assert.equal(journeySet.size, 32);
    assert.equal(USA_1994_STORY.targetCount, 32);
  });

  it("Journey stage mix is 16 group / 8 R16 / 4 QF / 2 SF / 1 third / 1 final", () => {
    const stageCounts = {
      "Group Stage": 0,
      "Round of 16": 0,
      "Quarter-final": 0,
      "Semi-final": 0,
      "Third-place play-off": 0,
      Final: 0,
    };
    for (const id of journeyIds) {
      const stage = byId.get(id)!.stage;
      stageCounts[stage] += 1;
    }
    assert.equal(stageCounts["Group Stage"], 16);
    assert.equal(stageCounts["Round of 16"], 8);
    assert.equal(stageCounts["Quarter-final"], 4);
    assert.equal(stageCounts["Semi-final"], 2);
    assert.equal(stageCounts["Third-place play-off"], 1);
    assert.equal(stageCounts.Final, 1);
    assert.equal(USA_1994_JOURNEY_GROUP_STAGE.length, 16);
    assert.equal(USA_1994_JOURNEY_KNOCKOUT.length, 16);
  });

  it("Journey group counts are exactly 4,2,3,3,2,2", () => {
    const counts: Record<string, number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    for (const id of journeyIds) {
      const match = byId.get(id)!;
      if (match.stage !== "Group Stage" || !match.group) continue;
      counts[match.group] = (counts[match.group] ?? 0) + 1;
    }
    assert.deepEqual(counts, { A: 4, B: 2, C: 3, D: 3, E: 2, F: 2 });
    for (const count of Object.values(counts)) {
      assert.ok(count >= 2);
    }
  });

  it("includes all 16 knockout matches in Journey", () => {
    const knockout = matches.filter((m) => m.stage !== "Group Stage");
    assert.equal(knockout.length, 16);
    for (const match of knockout) {
      assert.ok(journeySet.has(match.canonicalMatchId), match.canonicalMatchId);
    }
  });

  it("includes United States vs Switzerland and United States vs Colombia", () => {
    const usaSwiss = findCanonicalMatchForUsa1994Entry(
      {
        title: "United States vs Switzerland",
        teams: ["United States", "Switzerland"],
        stage: "Group Stage",
        group: "A",
      },
      matches
    );
    const usaColombia = findCanonicalMatchForUsa1994Entry(
      {
        title: "United States vs Colombia",
        teams: ["United States", "Colombia"],
        stage: "Group Stage",
        group: "A",
      },
      matches
    );
    assert.ok(journeySet.has(usaSwiss.canonicalMatchId));
    assert.ok(journeySet.has(usaColombia.canonicalMatchId));
  });

  it("identifies Germany vs Bolivia as Group C", () => {
    const germanyBolivia = findCanonicalMatchForUsa1994Entry(
      {
        title: "Germany vs Bolivia",
        teams: ["Germany", "Bolivia"],
        stage: "Group Stage",
        group: "C",
      },
      matches
    );
    assert.equal(germanyBolivia.group, "C");
    assert.ok(journeySet.has(germanyBolivia.canonicalMatchId));
  });

  it("orders Journey chronologically", () => {
    for (let i = 1; i < journeyIds.length; i++) {
      const prev = byId.get(journeyIds[i - 1]!)!;
      const next = byId.get(journeyIds[i]!)!;
      assert.ok(
        prev.chronologicalIndex < next.chronologicalIndex,
        `${prev.canonicalMatchId} should precede ${next.canonicalMatchId}`
      );
    }
  });

  it("Every Match / Complete Tournament contains exactly 52 matches", () => {
    assert.equal(complete?.canonicalMatchIds.length, 52);
    assert.equal(new Set(complete?.canonicalMatchIds).size, 52);
    assert.equal(getExperienceMatches("usa-1994", "complete").length, 52);
  });

  it("blocked or unverified sources are never production-selectable", () => {
    for (const match of matches) {
      const preferred = getPreferredSource(match);
      assert.ok(preferred);
      assert.equal(preferred!.status, "active");
      assert.equal(preferred!.fullMatch, true);
      assert.equal(preferred!.humanVerification.status, "verified");
      assert.equal(BLOCKED_STATUSES.has(preferred!.status), false);

      const lower = `${preferred!.url} ${preferred!.notes ?? ""} ${
        preferred!.humanVerification.notes ?? ""
      }`.toLowerCase();
      assert.equal(lower.includes("highlight"), false, match.canonicalMatchId);
      assert.equal(lower.includes("clip-only"), false, match.canonicalMatchId);

      for (const source of match.replaySources) {
        if (
          source.status === "dead" ||
          source.status === "wrong-match" ||
          source.status === "private" ||
          source.status === "needs-review" ||
          source.humanVerification.status === "failed" ||
          source.humanVerification.status === "untested" ||
          !source.fullMatch
        ) {
          assert.notEqual(preferred!.id, source.id, match.canonicalMatchId);
          assert.equal(isProductionReadySource(source), false, source.id);
        }
      }
    }
  });

  it("live resolver returns the exact supplied URL for all 52 matches", () => {
    assert.equal(suppliedUrlByMatchId.size, 52);
    for (const match of matches) {
      const supplied = suppliedUrlByMatchId.get(match.canonicalMatchId);
      assert.ok(supplied, `No supplied URL for ${match.canonicalMatchId}`);
      assert.equal(getPreferredSource(match)?.url, supplied);
      assert.equal(resolveReplay(match)?.url, supplied);
    }
  });

  it("proof-case resolver URLs match the supplied catalog exactly", () => {
    for (const proof of PROOF_CASES) {
      const match = findCanonicalMatchForUsa1994Entry(proof, matches);
      const live = byId.get(match.canonicalMatchId)!;
      assert.equal(getPreferredSource(live)?.url, proof.url);
      assert.equal(resolveReplay(live)?.url, proof.url);
    }
  });

  it("applies correct verification metadata by provider", () => {
    for (const { entry, match } of mappings) {
      const live = byId.get(match.canonicalMatchId)!;
      const preferred = getPreferredSource(live)!;
      assert.equal(preferred.provider, entry.provider);
      assert.equal(preferred.fullMatch, true);
      assert.equal(preferred.status, "active");
      assert.equal(preferred.humanVerification.status, "verified");
      if (entry.provider === "FIFA") {
        assert.equal(preferred.officialSource, true);
        assert.equal(
          preferred.humanVerification.verifiedBy,
          USA_1994_FIFA_VERIFIED_BY
        );
      } else {
        assert.equal(preferred.officialSource, false);
        assert.equal(
          preferred.humanVerification.verifiedBy,
          USA_1994_DAILYMOTION_VERIFIED_BY
        );
      }
    }
  });

  it("exposes available Essentials (16) and Team Journeys (9)", () => {
    assert.equal(USA_1994_ESSENTIALS.status, "available");
    assert.equal(USA_1994_ESSENTIALS.canonicalMatchIds.length, 16);
    assert.equal(getExperience("usa-1994", "essential")?.canonicalMatchIds.length, 16);
    assert.equal(USA_1994_TEAM_JOURNEYS.status, "available");
    assert.equal(USA_1994_TEAM_JOURNEYS.teams.length, 9);
    assert.equal(
      USA_1994_TEAM_JOURNEYS.teams.find((t) => t.team === "Brazil")?.canonicalMatchIds
        .length,
      7
    );
  });
});
