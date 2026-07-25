import assert from "node:assert/strict";
import { describe, it } from "node:test";
import france1998Episodes from "../../data/france1998.json";
import type { CanonicalMatch, CanonicalReplaySource } from "@/lib/archive/types";
import { getCanonicalArchive, getPreferredSource } from "@/lib/archive";
import {
  attachReplay,
  getPreferredReplay,
  getPreferredReplayForEpisode,
  resolveReplay,
} from "./index";

function source(
  provider: CanonicalReplaySource["provider"],
  url: string,
  opts: {
    humanVerified?: boolean;
    status?: CanonicalReplaySource["status"];
    id?: string;
  } = {}
): CanonicalReplaySource {
  const humanVerified = opts.humanVerified ?? false;
  return {
    id: opts.id ?? `${provider}-1`,
    provider,
    url,
    status: opts.status ?? "active",
    fullMatch: true,
    automatedCheck: {
      status: humanVerified ? "ok" : "unchecked",
      lastChecked: "2026-07-22",
    },
    humanVerification: humanVerified
      ? {
          status: "verified",
          verifiedBy: "test",
          verifiedAt: "2026-07-22",
        }
      : { status: "untested" },
  };
}

function matchWithSources(
  sources: CanonicalReplaySource[],
  runtime = "1:50:00"
): CanonicalMatch {
  return {
    tournamentId: "usa-1994",
    canonicalMatchId: "usa-1994-c99",
    chronologicalIndex: 99,
    date: "June 17, 1994",
    kickoffOrder: 99,
    stage: "Group Stage",
    homeTeam: "Test",
    awayTeam: "Fixture",
    venue: "Test Stadium",
    editorial: { runtime },
    replaySources: sources,
  };
}

describe("getPreferredReplay", () => {
  it("selects human-verified FIFA when Dailymotion is dead", () => {
    const replay = resolveReplay(
      matchWithSources([
        source("FIFA", "https://www.fifa.com/en/watch/test-fifa", {
          humanVerified: true,
          id: "fifa-1",
        }),
        source("Dailymotion", "https://www.dailymotion.com/video/dead123", {
          status: "dead",
          id: "dm-1",
        }),
      ])
    );

    assert.equal(replay?.provider, "FIFA");
    assert.equal(replay?.url, "https://www.fifa.com/en/watch/test-fifa");
  });

  it("returns unavailable when only Dailymotion is dead", () => {
    const replay = resolveReplay(
      matchWithSources([
        source("Dailymotion", "https://www.dailymotion.com/video/dead-only", {
          status: "dead",
        }),
      ])
    );

    assert.equal(replay, null);
  });

  it("selects human-verified Dailymotion when it is the only usable source", () => {
    const replay = resolveReplay(
      matchWithSources([
        source("Dailymotion", "https://www.dailymotion.com/video/live123", {
          humanVerified: true,
        }),
      ])
    );

    assert.equal(replay?.provider, "Dailymotion");
    assert.equal(replay?.url, "https://www.dailymotion.com/video/live123");
  });

  it("prefers human-verified FIFA over human-verified Dailymotion", () => {
    const replay = resolveReplay(
      matchWithSources([
        source("Dailymotion", "https://www.dailymotion.com/video/dm123", {
          humanVerified: true,
          id: "dm-1",
        }),
        source("FIFA", "https://www.fifa.com/en/watch/fifa123", {
          humanVerified: true,
          id: "fifa-1",
        }),
      ])
    );

    assert.equal(replay?.provider, "FIFA");
    assert.equal(replay?.preferredSource, "FIFA");
    assert.equal(replay?.alternates?.length ?? 0, 0);
  });

  it("does not use sources without human verification", () => {
    const replay = resolveReplay(
      matchWithSources([
        source("Dailymotion", "https://www.dailymotion.com/video/unverified", {
          humanVerified: false,
        }),
      ])
    );

    assert.equal(replay, null);
  });

  it("ignores legacy JSON replay URLs when attachReplay resolves from the archive", () => {
    const legacyEpisode = {
      id: "france-1998-02",
      tournamentId: "france-1998",
      n: 2,
      match: "Morocco vs Norway",
      replay: {
        url: "https://www.dailymotion.com/video/x9pq5a0",
        source: "Legacy Dailymotion",
      },
    };

    const resolved = attachReplay(legacyEpisode);
    const preferred = getPreferredReplayForEpisode(legacyEpisode);

    assert.equal(resolved.replay?.provider, "FIFA");
    assert.notEqual(resolved.replay?.url, legacyEpisode.replay.url);
    assert.deepEqual(preferred, resolved.replay);
  });
});

describe("France '98 curated matches", () => {
  it("Cameroon vs Austria keeps Official FIFA Collection replay outside Journey", () => {
    const match = getCanonicalArchive("france-1998").find(
      (entry) => entry.canonicalMatchId === "france-1998-c04"
    );
    assert.ok(match);
    assert.equal(match.editorial?.journeyEpisodeId, undefined);

    const preferred = getPreferredSource(match);
    assert.ok(preferred);
    assert.equal(preferred.provider, "FIFA");
    assert.equal(preferred.url, "https://www.fifa.com/en/watch/2YGNRNLyRHPjB8WSJG87Az");
  });

  it("Morocco vs Norway resolves to FIFA without Dailymotion backup exposed", () => {
    const episode = france1998Episodes.find(
      (entry) => entry.match === "Morocco vs Norway"
    );
    assert.ok(episode);

    const replay = getPreferredReplay(episode.id);
    assert.ok(replay);
    assert.equal(replay.provider, "FIFA");
    assert.equal(replay.url, "https://www.fifa.com/en/watch/59lNV8tJ1xPnOUGGvefNNx");
    assert.equal(replay.alternates?.length ?? 0, 0);
  });

  it("hides Dailymotion backups for matches with human-verified FIFA replays", () => {
    const fifaMatches = [
      "Brazil vs Scotland",
      "Morocco vs Norway",
      "Italy vs Cameroon",
      "Croatia vs Jamaica",
      "Brazil vs Norway",
      "Italy vs Norway",
      "Brazil vs Chile",
      "France vs Paraguay",
    ];

    for (const match of fifaMatches) {
      const episode = france1998Episodes.find((entry) => entry.match === match);
      assert.ok(episode, match);

      const replay = getPreferredReplayForEpisode(episode);
      assert.equal(replay?.provider, "FIFA", match);
      assert.match(replay?.url ?? "", /^https:\/\/www\.fifa\.com\/en\/watch\//, match);
      assert.equal(replay?.alternates?.length ?? 0, 0, match);
    }
  });
});
