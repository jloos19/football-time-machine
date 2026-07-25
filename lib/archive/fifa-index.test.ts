import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { findBestFifaIndexMatch, buildFifaArchiveIndex } from "./fifa-index";
import {
  normalizeTeamName,
  teamsMatch,
  titleLooksLikeFullMatch,
} from "./fifa-normalize";
import { parseFifaUrl } from "./fifa-url";

describe("FIFA URL parsing", () => {
  it("parses fifa.com/en/watch URLs", () => {
    const parsed = parseFifaUrl("https://www.fifa.com/en/watch/495Zo9RWtcADL0vvcw8AjL");
    assert.equal(parsed?.fifaContentId, "495Zo9RWtcADL0vvcw8AjL");
    assert.equal(parsed?.host, "fifa.com");
  });

  it("parses plus.fifa.com slug + uuid URLs", () => {
    const parsed = parseFifaUrl(
      "https://www.plus.fifa.com/en/content/nigeria-v-denmark-round-of-16-1998-fifa-world-cup-france-full-match-replay/37367a2f-8563-4058-b845-53d52106a55a"
    );
    assert.equal(parsed?.uuid, "37367a2f-8563-4058-b845-53d52106a55a");
    assert.equal(parsed?.host, "plus.fifa.com");
  });
});

describe("FIFA normalized matching", () => {
  it("matches team aliases regardless of order", () => {
    assert.equal(teamsMatch("Brazil", "Netherlands", "Holland", "Brazil"), true);
    assert.equal(normalizeTeamName("Holland"), "netherlands");
  });

  it("detects full-match titles", () => {
    assert.equal(
      titleLooksLikeFullMatch(
        "Brazil v Netherlands | Semi-finals | 1998 FIFA World Cup France™ | Full Match Replay"
      ),
      true
    );
    assert.equal(
      titleLooksLikeFullMatch(
        "Germany v Croatia | Quarter-finals | 1998 FIFA World Cup France™ | Extended Highlights"
      ),
      false
    );
  });
});

describe("FIFA index matching for france-1998-c61", () => {
  it("finds Brazil vs Netherlands semi-final with high confidence", () => {
    const index = buildFifaArchiveIndex();
    const match = findBestFifaIndexMatch(
      {
        tournamentId: "france-1998",
        canonicalMatchId: "france-1998-c61",
        homeTeam: "Brazil",
        awayTeam: "Netherlands",
        stage: "Semi-final",
        tournamentYear: 1998,
      },
      index
    );

    assert.ok(match);
    assert.ok(match!.confidence >= 60);
    assert.match(match!.indexItem.canonicalUrl, /495Zo9RWtcADL0vvcw8AjL/);
    assert.equal(match!.indexItem.fullMatchReplay, true);
  });
});
