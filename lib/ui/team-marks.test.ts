import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  USA_1994_PARTICIPANT_NAMES,
  FRANCE_1998_PARTICIPANT_NAMES,
  KOREA_JAPAN_2002_PARTICIPANT_NAMES,
  listTournamentParticipantNames,
} from "@/lib/experiences/participants";
import { teamIdFromName } from "@/lib/experiences/membership";
import type { TournamentId } from "@/lib/archive/types";
import {
  hasTeamFlag,
  teamCountryCode,
  teamFlagEmoji,
} from "./team-marks";

const TOURNAMENTS: Array<{
  id: TournamentId;
  label: string;
  expectedCount: number;
  names: readonly string[];
}> = [
  {
    id: "usa-1994",
    label: "USA 1994",
    expectedCount: 24,
    names: USA_1994_PARTICIPANT_NAMES,
  },
  {
    id: "france-1998",
    label: "France 1998",
    expectedCount: 32,
    names: FRANCE_1998_PARTICIPANT_NAMES,
  },
  {
    id: "korea-japan-2002",
    label: "Korea/Japan 2002",
    expectedCount: 32,
    names: KOREA_JAPAN_2002_PARTICIPANT_NAMES,
  },
];

describe("team flag system", () => {
  it("covers every participating nation across USA 1994, France 1998, and Korea/Japan 2002 (88/88)", () => {
    let ok = 0;
    for (const tournament of TOURNAMENTS) {
      assert.equal(
        tournament.names.length,
        tournament.expectedCount,
        `${tournament.label} participant count`
      );
      assert.deepEqual(
        [...listTournamentParticipantNames(tournament.id)],
        [...tournament.names]
      );

      for (const name of tournament.names) {
        const teamId = teamIdFromName(name);
        const code = teamCountryCode(name);
        const flag = teamFlagEmoji(name);
        assert.ok(teamId, `${name}: team id`);
        assert.ok(code, `${name}: country code`);
        assert.notEqual(flag, "🏳️", `${name}: flag asset`);
        assert.equal(hasTeamFlag(name), true, `${name}: hasTeamFlag`);
        ok += 1;
      }
    }
    assert.equal(ok, 88);
  });

  it("maps Korea Republic and South Korea to the same canonical flag asset", () => {
    assert.equal(teamCountryCode("Korea Republic"), "KR");
    assert.equal(teamCountryCode("South Korea"), "KR");
    assert.equal(teamFlagEmoji("Korea Republic"), teamFlagEmoji("South Korea"));
    assert.equal(teamFlagEmoji("Korea Republic"), "🇰🇷");
  });

  it("resolves newly introduced Korea/Japan 2002 nations", () => {
    const samples: Array<[string, string, string]> = [
      ["Senegal", "SN", "🇸🇳"],
      ["Turkey", "TR", "🇹🇷"],
      ["Uruguay", "UY", "🇺🇾"],
      ["Slovenia", "SI", "🇸🇮"],
      ["China", "CN", "🇨🇳"],
      ["Costa Rica", "CR", "🇨🇷"],
      ["Portugal", "PT", "🇵🇹"],
      ["Poland", "PL", "🇵🇱"],
      ["Ecuador", "EC", "🇪🇨"],
    ];
    for (const [name, code, flag] of samples) {
      assert.equal(teamCountryCode(name), code);
      assert.equal(teamFlagEmoji(name), flag);
    }
  });
});
