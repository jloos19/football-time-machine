import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import { StoryView } from "@/components/experiences/StoryView";
import { seasons } from "@/data/seasons";
import { getCanonicalArchive, matchLabel } from "@/lib/archive";
import type { TournamentId } from "@/lib/archive/types";
import { TeamDossier } from "@/components/experiences/TeamDossier";
import {
  getCanonicalMatchEditorial,
  getTeamDossier,
  getTeamEpilogue,
  listRequiredDossierSections,
  listTeamDossiers,
  resolveTeamEpilogue,
} from "./index";
import {
  dossierPairSimilarityPassed,
  findDuplicateEditorialReports,
  formatKoreaJapan2002ProfileAudit,
  validateDossierSimilarity,
  validateTeamDossiers,
  validateTournamentEditorial,
} from "./validate";
import {
  getExperienceByRoute,
  getSupportedTeamJourneys,
  isProductionEditorialFallback,
  resolveExperienceEpisodes,
  FRANCE_1998_TEAM_NAMES,
  KOREA_JAPAN_2002_TEAM_NAMES,
  USA_1994_TEAM_NAMES,
  teamIdFromName,
} from "@/lib/experiences";

describe("canonical editorial coverage", () => {
  it("USA 1994 has 52 complete pre-match records", () => {
    const coverage = validateTournamentEditorial("usa-1994");
    assert.equal(coverage.canonicalMatches, 52);
    assert.equal(coverage.preMatchComplete, 52);
  });

  it("USA 1994 has 52 complete post-match records", () => {
    const coverage = validateTournamentEditorial("usa-1994");
    assert.equal(coverage.postMatchComplete, 52);
    assert.equal(coverage.missing, 0);
  });

  it("France 1998 has 64 complete pre-match records", () => {
    const coverage = validateTournamentEditorial("france-1998");
    assert.equal(coverage.canonicalMatches, 64);
    assert.equal(coverage.preMatchComplete, 64);
  });

  it("France 1998 has 64 complete post-match records", () => {
    const coverage = validateTournamentEditorial("france-1998");
    assert.equal(coverage.postMatchComplete, 64);
    assert.equal(coverage.missing, 0);
  });

  it("Korea/Japan 2002 has 64 complete pre-match records", () => {
    const coverage = validateTournamentEditorial("korea-japan-2002");
    assert.equal(coverage.canonicalMatches, 64);
    assert.equal(coverage.preMatchComplete, 64);
  });

  it("Korea/Japan 2002 has 64 complete post-match records", () => {
    const coverage = validateTournamentEditorial("korea-japan-2002");
    assert.equal(coverage.postMatchComplete, 64);
    assert.equal(coverage.missing, 0);
  });

  it("no canonical match uses a production fallback", () => {
    for (const tournamentId of ["usa-1994", "france-1998", "korea-japan-2002"] as TournamentId[]) {
      const experience = getExperienceByRoute(tournamentId, "every-match");
      assert.ok(experience);
      for (const episode of resolveExperienceEpisodes(experience)) {
        assert.equal(
          isProductionEditorialFallback(episode),
          false,
          `${episode.canonicalMatchId} used production fallback`
        );
      }
    }
  });

  it("every experience resolves editorial content by canonicalMatchId", () => {
    for (const tournamentId of ["usa-1994", "france-1998", "korea-japan-2002"] as TournamentId[]) {
      const routes = ["story", "essentials", "every-match"] as const;
      for (const route of routes) {
        const experience = getExperienceByRoute(tournamentId, route)!;
        for (const episode of resolveExperienceEpisodes(experience)) {
          const ed = getCanonicalMatchEditorial(episode.canonicalMatchId);
          assert.ok(ed, episode.canonicalMatchId);
          assert.equal(episode.world, ed.preMatch.aroundTheWorld);
          assert.equal(episode.postMatch?.score, ed.postMatch.score);
        }
      }
      for (const team of getSupportedTeamJourneys(tournamentId)) {
        const experience = getExperienceByRoute(
          tournamentId,
          "team",
          team.teamId
        )!;
        for (const episode of resolveExperienceEpisodes(experience)) {
          const ed = getCanonicalMatchEditorial(episode.canonicalMatchId);
          assert.ok(ed);
          assert.equal(episode.intro, ed.preMatch.whyItMatters);
        }
      }
    }
  });

  it("the same canonical match returns the same report in all experiences", () => {
    const id = "usa-1994-c15";
    const reports = new Set<string>();
    for (const route of ["story", "essentials", "every-match"] as const) {
      const experience = getExperienceByRoute("usa-1994", route)!;
      if (!experience.canonicalMatchIds.includes(id)) continue;
      const episode = resolveExperienceEpisodes(experience).find(
        (ep) => ep.canonicalMatchId === id
      )!;
      reports.add(episode.postMatch?.matchReport ?? "");
    }
    const team = getExperienceByRoute("usa-1994", "team", "united-states")!;
    const teamEpisode = resolveExperienceEpisodes(team).find(
      (ep) => ep.canonicalMatchId === id
    )!;
    reports.add(teamEpisode.postMatch?.matchReport ?? "");
    assert.equal(reports.size, 1);
  });

  it("a match not in Story still has complete content in Every Match", () => {
    const story = getExperienceByRoute("usa-1994", "story")!;
    const every = getExperienceByRoute("usa-1994", "every-match")!;
    const outside = every.canonicalMatchIds.find(
      (id) => !story.canonicalMatchIds.includes(id)
    )!;
    assert.ok(outside);
    const episode = resolveExperienceEpisodes(every).find(
      (ep) => ep.canonicalMatchId === outside
    )!;
    assert.ok(episode.world);
    assert.ok(episode.tournament);
    assert.ok(episode.intro);
    assert.ok(episode.postMatch?.matchReport);
  });

  it("South Korea vs Spain at USA 1994 has complete pre-match content", () => {
    const ed = getCanonicalMatchEditorial("usa-1994-c02");
    assert.ok(ed);
    assert.match(ed.preMatch.sceneSetter, /Cotton Bowl|Dallas/i);
    assert.ok(ed.preMatch.aroundTheWorld.length > 60);
    assert.ok(ed.preMatch.whyItMatters.length > 60);
    const match = getCanonicalArchive("usa-1994").find(
      (m) => m.canonicalMatchId === "usa-1994-c02"
    )!;
    assert.equal(matchLabel(match), "Spain vs South Korea");
  });

  it("South Korea vs Spain reveals complete post-match content after completion", () => {
    const experience = getExperienceByRoute("usa-1994", "every-match")!;
    const episode = resolveExperienceEpisodes(experience).find(
      (ep) => ep.canonicalMatchId === "usa-1994-c02"
    )!;
    assert.equal(episode.postMatch?.score, "Spain 2–2 South Korea");
    assert.ok(episode.postMatch?.matchReport);
    assert.ok((episode.postMatch?.keyMoments?.length ?? 0) >= 2);
    assert.ok((episode.postMatch?.impactPlayers.length ?? 0) >= 2);

    const markup = renderToStaticMarkup(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: "USA ’94",
        completed: true,
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
    assert.match(markup, /Spain 2–2 South Korea/);
    assert.match(markup, /Match report/i);
    assert.match(markup, /Key moments/i);
    assert.doesNotMatch(markup, /Detailed post-match notes are available on The Story/);
  });

  it("Mark Complete reveals the report without refresh", () => {
    const experience = getExperienceByRoute("usa-1994", "every-match")!;
    const episode = resolveExperienceEpisodes(experience).find(
      (ep) => ep.canonicalMatchId === "usa-1994-c02"
    )!;
    // Same episode object is reused; only completed flag flips in the modal.
    const locked = renderToStaticMarkup(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: "USA ’94",
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
    const unlocked = renderToStaticMarkup(
      createElement(MatchExperienceModal, {
        episode,
        experience,
        tournamentName: "USA ’94",
        completed: true,
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
    assert.match(locked, /Sealed archive/);
    assert.doesNotMatch(locked, /Spain 2–2 South Korea/);
    assert.match(unlocked, /Spain 2–2 South Korea/);
    assert.match(unlocked, /Match complete/);
  });

  it("completion shared across experiences unlocks the report everywhere", () => {
    const id = "usa-1994-c02";
    for (const route of ["every-match", "essentials"] as const) {
      const experience = getExperienceByRoute("usa-1994", route);
      if (!experience?.canonicalMatchIds.includes(id)) continue;
      const episode = resolveExperienceEpisodes(experience).find(
        (ep) => ep.canonicalMatchId === id
      )!;
      assert.ok(episode.postMatch);
    }
    const spain = getExperienceByRoute("usa-1994", "team", "spain")!;
    const episode = resolveExperienceEpisodes(spain).find(
      (ep) => ep.canonicalMatchId === id
    )!;
    assert.ok(episode.postMatch?.score);
  });

  it("no pre-match record contains known future opponents or outcomes", () => {
    const re =
      /\b(went on to|would later|eventually (won|lifted|reached)|lifted the trophy|won (this |the )?(world cup|tournament))\b/i;
    for (const tournamentId of ["usa-1994", "france-1998", "korea-japan-2002"] as TournamentId[]) {
      for (const match of getCanonicalArchive(tournamentId)) {
        const ed = getCanonicalMatchEditorial(match.canonicalMatchId)!;
        const blob = Object.values(ed.preMatch).join(" ");
        assert.equal(re.test(blob), false, match.canonicalMatchId);
      }
    }
  });

  it("scores and scorer data match canonical editorial scores", () => {
    const samples: Array<[string, string, RegExp]> = [
      ["usa-1994-c01", "Germany 1–0 Bolivia", /Klinsmann/i],
      ["usa-1994-c02", "Spain 2–2 South Korea", /Hong Myung-bo|Seo Jung-won/i],
      ["france-1998-c64", "Brazil 0–3 France", /Zidane/i],
    ];
    for (const [id, score, scorer] of samples) {
      const ed = getCanonicalMatchEditorial(id)!;
      assert.equal(ed.postMatch.score, score);
      assert.match(ed.postMatch.goal, scorer);
    }
  });

  it("no duplicate canonical editorial record exists", () => {
    assert.deepEqual(findDuplicateEditorialReports(), []);
    const ids = [
      ...getCanonicalArchive("usa-1994"),
      ...getCanonicalArchive("france-1998"),
    ].map((m) => m.canonicalMatchId);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("no blank, placeholder, or boilerplate production content exists", () => {
    const coverageUsa = validateTournamentEditorial("usa-1994");
    const coverageFra = validateTournamentEditorial("france-1998");
    assert.equal(coverageUsa.missing, 0);
    assert.equal(coverageFra.missing, 0);
  });
});

describe("team dossiers", () => {
  it("user-facing copy uses Team Profile terminology", () => {
    const source = readFileSync(
      join(process.cwd(), "components/experiences/TeamDossier.tsx"),
      "utf8"
    );
    assert.match(source, />Team Profile</);
    assert.doesNotMatch(source, /Team Dossier/);
  });

  it("improves Team Profile label contrast without bright-white chrome", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    assert.match(css, /\.team-dossier \.kicker\s*\{[^}]*color:\s*rgba\(201,\s*169,\s*98,\s*0\.92\)/s);
    assert.match(css, /\.team-dossier__fact dt\s*\{[^}]*color:\s*rgba\(223,\s*200,\s*138,\s*0\.88\)/s);
    assert.match(css, /\.team-dossier__fact dd\s*\{[^}]*color:\s*rgba\(245,\s*240,\s*232,\s*0\.78\)/s);
    assert.match(css, /\.team-dossier__section h3[\s\S]*?color:\s*#e4cf96/);
    assert.match(css, /\.team-dossier__meta\s*\{[^}]*color:\s*rgba\(245,\s*240,\s*232,\s*0\.72\)/s);
    assert.match(css, /\.team-dossier__keys span\s*\{[^}]*color:\s*rgba\(245,\s*240,\s*232,\s*0\.7\)/s);
    assert.doesNotMatch(css, /\.team-dossier__section h3[\s\S]*?color:\s*#fff(?:fff)?\b/);
    assert.doesNotMatch(css, /\.team-dossier__fact dt[\s\S]*?color:\s*#fff(?:fff)?\b/);
  });

  it("all 26 supported Team Journeys have complete dossiers", () => {
    const journeyKeys = new Set([
      ...USA_1994_TEAM_NAMES.map((name) => `usa-1994:${teamIdFromName(name)}`),
      ...FRANCE_1998_TEAM_NAMES.map(
        (name) => `france-1998:${teamIdFromName(name)}`
      ),
      ...KOREA_JAPAN_2002_TEAM_NAMES.map(
        (name) => `korea-japan-2002:${teamIdFromName(name)}`
      ),
    ]);
    const rows = validateTeamDossiers().filter((r) =>
      journeyKeys.has(`${r.tournament}:${r.team}`)
    );
    assert.equal(rows.length, 26);
    assert.ok(rows.every((r) => r.dossierComplete && r.rosterPresent && r.sourcesPresent && r.spoilerSafe));
  });

  it("all 88 tournament participants have complete Team Profiles", () => {
    const rows = validateTeamDossiers();
    assert.equal(rows.length, 88);
    assert.ok(
      rows.every(
        (r) =>
          r.dossierComplete &&
          r.rosterPresent &&
          r.sourcesPresent &&
          r.spoilerSafe &&
          !r.usesFallback
      )
    );
  });

  it("every implemented team renders all required dossier sections", () => {
    const required = listRequiredDossierSections();
    for (const tournamentId of ["usa-1994", "france-1998", "korea-japan-2002"] as TournamentId[]) {
      for (const d of listTeamDossiers(tournamentId)) {
        const markup = renderToStaticMarkup(
          createElement(TeamDossier, {
            dossier: d,
            teamName: d.teamId,
          })
        );
        assert.match(markup, /team-dossier-facts/);
        assert.match(markup, />Team Profile</);
        assert.doesNotMatch(markup, /Team Dossier/);
        assert.match(markup, /Tournament outlook/i);
        for (const section of required) {
          assert.match(
            markup,
            new RegExp(`data-dossier-section="${section}"`),
            `${d.tournamentId}/${d.teamId} missing ${section}`
          );
        }
      }
    }
  });

  it("USA dossier correctly records the 1990 appearance", () => {
    const usa = getTeamDossier("usa-1994", "united-states");
    assert.ok(usa);
    assert.equal(usa.history.previousAppearance, "1990");
    assert.equal(usa.history.worldCupAppearances, 5);
    assert.doesNotMatch(
      `${usa.introduction} ${usa.history.summary} ${usa.beforeTheTournament.majorStorylines}`,
      /first World Cup appearance since 1950/i
    );
    assert.match(usa.history.summary, /1990/);
  });

  it("required structured metadata fields are present on every dossier", () => {
    for (const d of [
      ...listTeamDossiers("usa-1994"),
      ...listTeamDossiers("france-1998"),
    ]) {
      assert.ok(d.beforeTheTournament.stateOfTeam);
      assert.ok(d.beforeTheTournament.expectations);
      assert.ok(d.beforeTheTournament.majorStorylines);
      assert.ok(d.qualification.method);
      assert.ok(d.history.previousAppearance);
      assert.ok(d.history.bestFinishEntering);
      assert.ok(d.history.worldCupAppearances >= 1);
      assert.ok(d.confederation);
      assert.ok(d.captain);
      assert.ok(d.tacticalIdentity);
      assert.ok(d.tournamentOutlook.label);
      assert.ok(d.tournamentOutlook.summary);
      assert.ok(d.keyPlayers.every((p) => p.position && p.note));
      assert.ok(d.keyPlayers.length >= 3 && d.keyPlayers.length <= 5);
    }
  });

  it("Team Profiles do not expose campaign length", () => {
    for (const tournamentId of ["usa-1994", "france-1998", "korea-japan-2002"] as TournamentId[]) {
      for (const d of listTeamDossiers(tournamentId)) {
        const blob = `${d.title} ${d.introduction} ${d.beforeTheTournament.stateOfTeam} ${d.beforeTheTournament.expectations} ${d.tournamentOutlook.summary}`;
        assert.doesNotMatch(blob, /\b\d+\s+matches\b/i);
        assert.doesNotMatch(blob, /\bcampaign of\b/i);
      }
    }
  });

  it("Team Profiles do not reveal this-tournament finishing position", () => {
    for (const d of [
      ...listTeamDossiers("usa-1994"),
      ...listTeamDossiers("france-1998"),
      ...listTeamDossiers("korea-japan-2002"),
    ]) {
      const blob = [
        d.title,
        d.introduction,
        d.beforeTheTournament.stateOfTeam,
        d.beforeTheTournament.expectations,
        d.beforeTheTournament.majorStorylines,
        d.qualification.summary,
        d.tournamentOutlook.summary,
      ].join(" ");
      assert.doesNotMatch(blob, /\beventual(ly)?\b/i);
      assert.doesNotMatch(blob, /\beliminated in\b/i);
      assert.doesNotMatch(blob, /\bgolden (boot|ball)\b/i);
      assert.doesNotMatch(blob, /\bwent on to\b/i);
    }
  });

  it("Korea/Japan 2002 Portugal and United States profiles are not interchangeable", () => {
    const portugal = getTeamDossier("korea-japan-2002", "portugal");
    const usa = getTeamDossier("korea-japan-2002", "united-states");
    assert.ok(portugal && usa);
    assert.notEqual(portugal.introduction, usa.introduction);
    assert.notEqual(portugal.qualification.summary, usa.qualification.summary);
    assert.notEqual(portugal.history.summary, usa.history.summary);
    assert.notEqual(portugal.style, usa.style);
    assert.notEqual(portugal.tournamentOutlook.summary, usa.tournamentOutlook.summary);
    assert.match(portugal.introduction, /Figo|golden generation|Euro 2000/i);
    assert.match(usa.introduction, /Arena|Hexagonal|1998/i);
    assert.equal(
      dossierPairSimilarityPassed("korea-japan-2002", "portugal", "united-states"),
      true
    );
  });

  it("every Korea/Japan 2002 profile has required bespoke sections and verified squad depth", () => {
    const rows = formatKoreaJapan2002ProfileAudit();
    assert.equal(rows.length, 32);
    for (const row of rows) {
      assert.equal(row.introBespoke, true, `${row.team} intro`);
      assert.equal(row.qualificationVerified, true, `${row.team} qualification`);
      assert.equal(row.historyVerified, true, `${row.team} history`);
      assert.equal(row.managerStyleVerified, true, `${row.team} manager/style`);
      assert.equal(row.outlookBespoke, true, `${row.team} outlook`);
      assert.equal(row.keyPlayersVerified, true, `${row.team} key players`);
      assert.equal(row.rosterVerified, true, `${row.team} roster`);
      assert.equal(row.sourcesPresent, true, `${row.team} sources`);
      assert.equal(row.spoilerSafe, true, `${row.team} spoiler`);
      assert.equal(row.similarityPassed, true, `${row.team} similarity`);
    }
    assert.equal(validateDossierSimilarity("korea-japan-2002").length, 0);
  });

  it("Korea/Japan 2002 Team Profiles use no fallback or placeholder dossiers", () => {
    const rows = validateTeamDossiers().filter(
      (r) => r.tournament === "korea-japan-2002"
    );
    assert.equal(rows.length, 32);
    assert.ok(rows.every((r) => r.dossierComplete && !r.usesFallback));
    for (const d of listTeamDossiers("korea-japan-2002")) {
      assert.doesNotMatch(
        `${d.introduction} ${d.style} ${d.tournamentOutlook.summary}`,
        /no information available|TODO|TBD|placeholder/i
      );
    }
  });

  it("Team Journey and Match overlays resolve the same rewritten 2002 canonical profiles", () => {
    for (const teamId of ["portugal", "united-states", "brazil", "japan"]) {
      const canonical = getTeamDossier("korea-japan-2002", teamId);
      assert.ok(canonical);
      const journey = getExperienceByRoute("korea-japan-2002", "team", teamId);
      if (journey) {
        assert.equal(
          getTeamDossier("korea-japan-2002", teamId)?.introduction,
          canonical.introduction
        );
      }
      assert.equal(
        getTeamDossier("korea-japan-2002", teamId)?.manager,
        canonical.manager
      );
    }
  });

  it("Team Profiles do not reveal future knockout opponents", () => {
    for (const d of listTeamDossiers("usa-1994")) {
      const blob = `${d.introduction} ${d.beforeTheTournament.majorStorylines} ${d.style} ${d.tournamentOutlook.summary}`;
      assert.doesNotMatch(blob, /\bwill (face|meet|play)\b/i);
      assert.doesNotMatch(blob, /\bquarter-?final (against|vs)\b/i);
    }
  });

  it("hosts are correctly identified as automatic qualifiers", () => {
    const usa = getTeamDossier("usa-1994", "united-states");
    const fra = getTeamDossier("france-1998", "france");
    assert.equal(usa?.qualification.automaticQualifier, true);
    assert.equal(fra?.qualification.automaticQualifier, true);
    assert.match(usa!.qualification.summary, /automatic|hosts/i);
    assert.match(fra!.qualification.summary, /automatic|hosts/i);
    assert.match(usa!.qualification.method, /host/i);
    assert.match(fra!.qualification.method, /host/i);
  });

  it("each Team Profile contains a roster", () => {
    assert.equal(USA_1994_TEAM_NAMES.length, 9);
    assert.equal(FRANCE_1998_TEAM_NAMES.length, 8);
    for (const name of USA_1994_TEAM_NAMES) {
      const d = getTeamDossier("usa-1994", teamIdFromName(name));
      assert.ok((d?.roster.length ?? 0) >= 18, name);
    }
    for (const name of FRANCE_1998_TEAM_NAMES) {
      const d = getTeamDossier("france-1998", teamIdFromName(name));
      assert.ok((d?.roster.length ?? 0) >= 18, name);
    }
  });

  it("Team epilogues remain inaccessible before campaign completion", () => {
    const locked = resolveTeamEpilogue({
      tournamentId: "usa-1994",
      teamId: "brazil",
      campaignComplete: false,
    });
    assert.equal(locked, null);

    const season = seasons.find((s) => s.id === "usa-1994")!;
    const experience = getExperienceByRoute("usa-1994", "team", "brazil")!;
    const episodes = resolveExperienceEpisodes(experience);
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes,
        completedCanonicalIds: new Set<string>(),
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
        teamName: "Brazil",
      })
    );
    assert.match(markup, /team-dossier/);
    assert.doesNotMatch(markup, /team-epilogue/);
    assert.doesNotMatch(markup, /Champions/);
    assert.doesNotMatch(markup, /After the final whistle/);
  });

  it("Team epilogues unlock only after the final campaign match is completed", () => {
    const open = resolveTeamEpilogue({
      tournamentId: "france-1998",
      teamId: "france",
      campaignComplete: true,
    });
    assert.ok(open);
    assert.equal(open.finish, "Champions");
    assert.ok(getTeamEpilogue("france-1998", "france"));

    const season = seasons.find((s) => s.id === "france-1998")!;
    const experience = getExperienceByRoute("france-1998", "team", "france")!;
    const episodes = resolveExperienceEpisodes(experience);
    const completed = new Set(episodes.map((ep) => ep.canonicalMatchId));
    const markup = renderToStaticMarkup(
      createElement(StoryView, {
        season,
        experience,
        episodes,
        completedCanonicalIds: completed,
        onBack: () => undefined,
        onOpenEpisode: () => undefined,
        teamName: "France",
      })
    );
    assert.match(markup, /team-epilogue/);
    assert.match(markup, /Champions/);
  });
});
