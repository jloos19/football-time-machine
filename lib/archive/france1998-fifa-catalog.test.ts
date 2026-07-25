import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FRANCE_1998_COMPLETE_COVERAGE_REPLAYS,
  FRANCE_1998_FIFA_REPLAYS,
  FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS,
  FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS,
} from "./france1998-fifa-catalog";
import {
  FifaCatalogMappingError,
  findCanonicalMatchForCompleteCoverageEntry,
  findCanonicalMatchForFifaEntry,
  mapFrance1998CompleteCoverage,
  mapFrance1998FifaCatalog,
} from "./france1998-fifa-apply";
import {
  getCanonicalArchive,
  getExperience,
  getExperienceMatches,
  getPreferredSource,
  hasHumanVerifiedFullMatch,
  isProductionReadySource,
} from "./index";
import { france1998Matches } from "./matches/france1998";
import { resolveReplay } from "@/lib/replays";

const FIFA_WATCH_PREFIX = "https://www.fifa.com/en/watch/";
const BLOCKED_STATUSES = new Set(["dead", "wrong-match", "private", "needs-review"]);

const EXPECTED_JOURNEY_GROUP_STAGE = {
  A: ["france-1998-c01", "france-1998-c02", "france-1998-c32"],
  B: ["france-1998-c19", "france-1998-c34", "france-1998-c35"],
  C: ["france-1998-c20", "france-1998-c21", "france-1998-c36"],
  D: ["france-1998-c09", "france-1998-c25"],
  E: ["france-1998-c08", "france-1998-c22"],
  F: ["france-1998-c15", "france-1998-c26"],
  G: ["france-1998-c31", "france-1998-c44"],
  H: ["france-1998-c11", "france-1998-c28", "france-1998-c29"],
} as const;

const JOURNEY_ADDITIONS = [
  "france-1998-c25",
  "france-1998-c08",
  "france-1998-c26",
  "france-1998-c31",
  "france-1998-c44",
] as const;

const JOURNEY_REMOVALS = [
  "france-1998-c18", // Chile vs Austria
  "france-1998-c04", // Cameroon vs Austria
  "france-1998-c37", // South Africa vs Denmark
  "france-1998-c46", // Argentina vs Jamaica
  "france-1998-c47", // Japan vs Croatia
] as const;

const SUPPLIED_URL_BY_MATCH_ID = new Map<string, string>();

describe("France 1998 curated FIFA catalog", () => {
  const matches = getCanonicalArchive("france-1998");
  const mappings = mapFrance1998FifaCatalog(matches);
  const coverageMappings = mapFrance1998CompleteCoverage(matches);
  const journey = getExperience("france-1998", "journey");
  const complete = getExperience("france-1998", "complete");
  const journeyIds = new Set(journey?.canonicalMatchIds ?? []);

  for (const { entry, match } of mappings) {
    SUPPLIED_URL_BY_MATCH_ID.set(match.canonicalMatchId, entry.url);
  }
  for (const { entry, match } of coverageMappings) {
    SUPPLIED_URL_BY_MATCH_ID.set(match.canonicalMatchId, entry.url);
  }
  for (const extra of FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS) {
    SUPPLIED_URL_BY_MATCH_ID.set(extra.canonicalMatchId, extra.url);
  }

  it("contains exactly 34 unique Official FIFA Collection records", () => {
    assert.equal(FRANCE_1998_FIFA_REPLAYS.length, 34);
    const urls = FRANCE_1998_FIFA_REPLAYS.map((e) => e.url);
    assert.equal(new Set(urls).size, 34);
    const titles = FRANCE_1998_FIFA_REPLAYS.map((e) => e.title);
    assert.equal(new Set(titles).size, 34);
  });

  it("contains 18 group-stage and 16 knockout Official FIFA Collection records", () => {
    const group = FRANCE_1998_FIFA_REPLAYS.filter((e) => e.stage === "Group Stage");
    const knockout = FRANCE_1998_FIFA_REPLAYS.filter((e) => e.stage !== "Group Stage");
    assert.equal(group.length, 18);
    assert.equal(knockout.length, 16);
  });

  it("maps every Official FIFA Collection record to exactly one canonical match", () => {
    assert.equal(mappings.length, 34);
    const ids = mappings.map((m) => m.match.canonicalMatchId);
    assert.equal(new Set(ids).size, 34);

    for (const entry of FRANCE_1998_FIFA_REPLAYS) {
      const match = findCanonicalMatchForFifaEntry(entry, matches);
      assert.equal(match.tournamentId, "france-1998");
    }
  });

  it("fails closed on ambiguous or missing mappings", () => {
    assert.throws(
      () =>
        findCanonicalMatchForFifaEntry(
          {
            title: "Ghost v Phantom",
            teams: ["Ghost", "Phantom"],
            stage: "Group Stage",
            group: "Z",
          },
          matches
        ),
      (error: unknown) =>
        error instanceof FifaCatalogMappingError && error.title === "Ghost v Phantom"
    );
  });

  it("requires every Official FIFA Collection URL to begin with fifa.com/en/watch/", () => {
    for (const entry of FRANCE_1998_FIFA_REPLAYS) {
      assert.ok(entry.url.startsWith(FIFA_WATCH_PREFIX), entry.url);
    }
  });

  it("Official FIFA Collection preferred sources resolve to exact catalog URLs", () => {
    for (const { match, entry } of mappings) {
      const live = matches.find((m) => m.canonicalMatchId === match.canonicalMatchId)!;
      const preferred = getPreferredSource(live);
      assert.equal(preferred?.provider, "FIFA");
      assert.equal(preferred?.url, entry.url);
      assert.equal(preferred?.officialSource, true);
      assert.equal(preferred?.status, "active");
      assert.equal(preferred?.fullMatch, true);
      assert.equal(preferred?.humanVerification.status, "verified");
      assert.equal(resolveReplay(live)?.url, entry.url);

      const base = france1998Matches.find(
        (m) => m.canonicalMatchId === match.canonicalMatchId
      )!;
      const basePreferred = base.replaySources.find((s) => s.url === entry.url);
      assert.equal(
        basePreferred?.humanVerification.verifiedBy,
        "browser-extracted-manual-curation"
      );
    }
  });

  it("keeps Official FIFA Collection membership independent of Journey", () => {
    for (const id of FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS) {
      assert.ok(
        mappings.some((m) => m.match.canonicalMatchId === id),
        `${id} should remain in Official FIFA Collection`
      );
      assert.equal(journeyIds.has(id), false, `${id} should not be in Journey`);
      assert.ok(complete?.canonicalMatchIds.includes(id));
    }
  });
});

describe("France 1998 Complete Tournament coverage", () => {
  const matches = getCanonicalArchive("france-1998");
  const coverageMappings = mapFrance1998CompleteCoverage(matches);
  const complete = getExperience("france-1998", "complete");
  const journey = getExperience("france-1998", "journey");
  const journeyIds = new Set(journey?.canonicalMatchIds ?? []);

  it("contains exactly 28 unique Complete Tournament coverage records", () => {
    assert.equal(FRANCE_1998_COMPLETE_COVERAGE_REPLAYS.length, 28);
    assert.equal(coverageMappings.length, 28);
    assert.equal(
      new Set(FRANCE_1998_COMPLETE_COVERAGE_REPLAYS.map((e) => e.url)).size,
      28
    );
    assert.equal(
      new Set(coverageMappings.map((m) => m.match.canonicalMatchId)).size,
      28
    );
  });

  it("maps every coverage record by teams and stage without guessing IDs", () => {
    for (const entry of FRANCE_1998_COMPLETE_COVERAGE_REPLAYS) {
      const match = findCanonicalMatchForCompleteCoverageEntry(entry, matches);
      assert.equal(match.tournamentId, "france-1998");
      assert.equal(match.stage, "Group Stage");
    }
  });

  it("Complete Tournament contains exactly 64 unique matches", () => {
    assert.equal(complete?.canonicalMatchIds.length, 64);
    assert.equal(new Set(complete?.canonicalMatchIds).size, 64);
    assert.equal(matches.length, 64);
  });

  it("every Complete Tournament match has a production-selectable replay", () => {
    for (const match of matches) {
      const preferred = getPreferredSource(match);
      assert.ok(preferred, `${match.canonicalMatchId} missing preferred source`);
      assert.ok(
        isProductionReadySource(preferred!),
        `${match.canonicalMatchId} preferred source is not production-ready`
      );
      assert.ok(hasHumanVerifiedFullMatch(match));
      assert.ok(resolveReplay(match)?.url);
    }
  });

  it("live resolver URLs equal the manually supplied URLs for coverage matches", () => {
    for (const { entry, match } of coverageMappings) {
      const live = matches.find((m) => m.canonicalMatchId === match.canonicalMatchId)!;
      const preferred = getPreferredSource(live);
      assert.equal(preferred?.url, entry.url);
      assert.equal(preferred?.provider, entry.provider);
      assert.equal(preferred?.fullMatch, true);
      assert.equal(preferred?.status, "active");
      assert.equal(preferred?.humanVerification.status, "verified");
      if (entry.provider === "FIFA") {
        assert.equal(preferred?.officialSource, true);
        assert.equal(
          preferred?.humanVerification.verifiedBy,
          "browser-extracted-manual-curation"
        );
      } else {
        assert.equal(preferred?.officialSource, false);
        assert.equal(preferred?.humanVerification.verifiedBy, "manual-curation");
      }
      assert.equal(resolveReplay(live)?.url, entry.url);
    }
  });

  it("retains Germany–USA and Nigeria–Spain Journey Dailymotion URLs", () => {
    const expected = {
      "france-1998-c15": "https://www.dailymotion.com/video/x9q8oca",
      "france-1998-c09": "https://www.dailymotion.com/video/x9ptcza",
    } as const;
    for (const [id, url] of Object.entries(expected)) {
      assert.ok(journeyIds.has(id));
      const live = matches.find((m) => m.canonicalMatchId === id)!;
      assert.equal(getPreferredSource(live)?.url, url);
      assert.equal(getPreferredSource(live)?.provider, "Dailymotion");
    }
  });

  it("does not let dead, wrong-match, deleted, private, DAZN, or highlights sources be selectable", () => {
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
      assert.equal(lower.includes("dazn"), false, match.canonicalMatchId);
      assert.equal(lower.includes("highlight"), false, match.canonicalMatchId);

      for (const source of match.replaySources) {
        if (
          source.status === "dead" ||
          source.status === "wrong-match" ||
          source.status === "private" ||
          source.humanVerification.status === "failed" ||
          !source.fullMatch
        ) {
          assert.notEqual(preferred!.id, source.id, match.canonicalMatchId);
        }
      }
    }
  });

  it("keeps retired Italy–Chile / Paraguay–Bulgaria Dailymotion sources ineligible", () => {
    const italyChile = matches.find((m) => m.canonicalMatchId === "france-1998-c03")!;
    const paraguayBulgaria = matches.find((m) => m.canonicalMatchId === "france-1998-c05")!;

    const italyDm = italyChile.replaySources.find(
      (s) => s.url === "https://www.dailymotion.com/video/x9pq5bc"
    );
    const paraguayDm = paraguayBulgaria.replaySources.find(
      (s) => s.url === "https://www.dailymotion.com/video/x9pq5e8"
    );

    assert.equal(italyDm?.status, "dead");
    assert.equal(paraguayDm?.status, "wrong-match");
    assert.notEqual(getPreferredSource(italyChile)?.url, italyDm?.url);
    assert.notEqual(getPreferredSource(paraguayBulgaria)?.url, paraguayDm?.url);
    assert.equal(
      getPreferredSource(italyChile)?.url,
      "https://www.dailymotion.com/video/x9pewiw"
    );
    assert.equal(
      getPreferredSource(paraguayBulgaria)?.url,
      "https://www.dailymotion.com/video/x9ptcz8"
    );
  });
});

describe("France 1998 Journey rebalance", () => {
  const matches = getCanonicalArchive("france-1998");
  const journey = getExperience("france-1998", "journey");
  const complete = getExperience("france-1998", "complete");
  const journeyIds = journey?.canonicalMatchIds ?? [];
  const journeySet = new Set(journeyIds);
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, m]));

  it("Journey contains exactly 36 unique matches", () => {
    assert.equal(journeyIds.length, 36);
    assert.equal(journeySet.size, 36);
  });

  it("Journey contains exactly 20 group-stage and 16 knockout matches", () => {
    const group = journeyIds.filter((id) => byId.get(id)?.stage === "Group Stage");
    const knockout = journeyIds.filter((id) => byId.get(id)?.stage !== "Group Stage");
    assert.equal(group.length, 20);
    assert.equal(knockout.length, 16);
  });

  it("every group A–H has at least two Journey matches with final counts 3,3,3,2,2,2,2,3", () => {
    const counts: Record<string, number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0,
    };
    for (const id of journeyIds) {
      const match = byId.get(id)!;
      if (match.stage !== "Group Stage" || !match.group) continue;
      counts[match.group] = (counts[match.group] ?? 0) + 1;
    }
    assert.deepEqual(counts, { A: 3, B: 3, C: 3, D: 2, E: 2, F: 2, G: 2, H: 3 });

    for (const [group, expectedIds] of Object.entries(EXPECTED_JOURNEY_GROUP_STAGE)) {
      for (const id of expectedIds) {
        assert.ok(journeySet.has(id), `Group ${group} missing ${id}`);
        assert.equal(byId.get(id)?.group, group);
      }
    }
  });

  it("includes the five Journey additions", () => {
    for (const id of JOURNEY_ADDITIONS) {
      assert.ok(journeySet.has(id), `${id} should be in Journey`);
    }
  });

  it("excludes the five Journey removals but keeps them in Complete Tournament", () => {
    for (const id of JOURNEY_REMOVALS) {
      assert.equal(journeySet.has(id), false, `${id} should not be in Journey`);
      assert.ok(complete?.canonicalMatchIds.includes(id));
      assert.ok(isProductionReadySource(getPreferredSource(byId.get(id)!)!));
    }
  });

  it("orders Journey chronologically by match date / kickoff order", () => {
    for (let i = 1; i < journeyIds.length; i++) {
      const prev = byId.get(journeyIds[i - 1]!)!;
      const next = byId.get(journeyIds[i]!)!;
      assert.ok(
        prev.chronologicalIndex < next.chronologicalIndex,
        `${prev.canonicalMatchId} should precede ${next.canonicalMatchId}`
      );
    }
  });

  it("uses FIFA for 29 Journey matches and Dailymotion for exactly 7", () => {
    let fifa = 0;
    let dailymotion = 0;
    for (const id of journeyIds) {
      const preferred = getPreferredSource(byId.get(id)!)!;
      if (preferred.provider === "FIFA") fifa += 1;
      if (preferred.provider === "Dailymotion") dailymotion += 1;
    }
    assert.equal(fifa, 29);
    assert.equal(dailymotion, 7);
    assert.equal(FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS.length, 7);
  });

  it("Journey and Complete experiences resolve without dropping members", () => {
    assert.equal(getExperienceMatches("france-1998", "journey").length, 36);
    assert.equal(getExperienceMatches("france-1998", "complete").length, 64);
  });
});

describe("France 1998 live resolver URL inventory", () => {
  const matches = getCanonicalArchive("france-1998");
  const mappings = mapFrance1998FifaCatalog(matches);
  const coverageMappings = mapFrance1998CompleteCoverage(matches);

  const expected = new Map<string, string>();
  for (const { entry, match } of mappings) {
    expected.set(match.canonicalMatchId, entry.url);
  }
  for (const { entry, match } of coverageMappings) {
    expected.set(match.canonicalMatchId, entry.url);
  }
  for (const extra of FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS) {
    expected.set(extra.canonicalMatchId, extra.url);
  }

  it("all live resolver URLs equal the manually supplied URLs", () => {
    assert.equal(expected.size, 64);
    for (const match of matches) {
      const supplied = expected.get(match.canonicalMatchId);
      assert.ok(supplied, `No supplied URL for ${match.canonicalMatchId}`);
      assert.equal(resolveReplay(match)?.url, supplied);
      assert.equal(getPreferredSource(match)?.url, supplied);
    }
  });
});

describe("France 1998 FIFA catalog source selection", () => {
  it("hides Dailymotion alternates when FIFA is preferred", () => {
    const matches = getCanonicalArchive("france-1998");
    const brazilNorway = matches.find((m) => m.canonicalMatchId === "france-1998-c32")!;
    const replay = resolveReplay(brazilNorway);
    assert.equal(replay?.provider, "FIFA");
    assert.equal(replay?.alternates?.length ?? 0, 0);
  });
});
