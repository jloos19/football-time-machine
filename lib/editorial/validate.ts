import { getCanonicalArchive, CANONICAL_MATCH_COUNTS } from "@/lib/archive";
import type { TournamentId } from "@/lib/archive/types";
import { teamIdFromName } from "@/lib/experiences/membership";
import {
  FRANCE_1998_PARTICIPANT_NAMES,
  KOREA_JAPAN_2002_PARTICIPANT_NAMES,
  USA_1994_PARTICIPANT_NAMES,
} from "@/lib/experiences/participants";
import {
  getCanonicalMatchEditorial,
  listCanonicalMatchEditorials,
  listTeamDossiers,
  getTeamEpilogue,
} from "./index";
import type { CanonicalMatchEditorial, TeamTournamentDossier } from "./types";

const PLACEHOLDER_RE =
  /no information available|both teams wanted to win|this match was part of the group stage|finished without a goal|defining influence in a match shaped by fine margins/i;

/** Flags retrospective THIS-tournament spoilers in pre-match copy. */
const FUTURE_SPOILER_RE =
  /\b(went on to|would later|eventually (won|lifted|reached)|lifted the trophy|won (this |the )?(world cup|tournament)|destined to (win|reach)|will (win|lift|reach) the)\b/i;

export type MatchEditorialStatus = "complete" | "missing" | "fallback" | "invalid";

export type MatchEditorialRow = {
  canonicalMatchId: string;
  teams: string;
  preMatch: MatchEditorialStatus;
  postMatch: MatchEditorialStatus;
  sourceStatus: "present" | "missing";
};

export type TournamentEditorialCoverage = {
  tournamentId: TournamentId;
  canonicalMatches: number;
  preMatchComplete: number;
  postMatchComplete: number;
  missing: number;
  rows: MatchEditorialRow[];
};

export type DossierValidationRow = {
  tournament: TournamentId;
  team: string;
  dossierComplete: boolean;
  rosterPresent: boolean;
  sourcesPresent: boolean;
  spoilerSafe: boolean;
  /** True when a production profile exists (never a generic fallback). */
  usesFallback: boolean;
};

export type TeamProfileCoverageRow = {
  tournament: TournamentId;
  teams: number;
  profilesComplete: number;
  missing: number;
  fallback: number;
};

function minLen(text: string, n: number): boolean {
  return text.trim().length >= n;
}

function preMatchComplete(ed: CanonicalMatchEditorial): boolean {
  const p = ed.preMatch;
  return (
    minLen(p.sceneSetter, 20) &&
    minLen(p.aroundTheWorld, 60) &&
    minLen(p.inTheTournament, 20) &&
    minLen(p.whyItMatters, 60) &&
    !PLACEHOLDER_RE.test(
      `${p.sceneSetter} ${p.aroundTheWorld} ${p.inTheTournament} ${p.whyItMatters}`
    ) &&
    !FUTURE_SPOILER_RE.test(
      `${p.sceneSetter} ${p.aroundTheWorld} ${p.inTheTournament} ${p.whyItMatters}`
    )
  );
}

function postMatchComplete(ed: CanonicalMatchEditorial): boolean {
  const p = ed.postMatch;
  return (
    minLen(p.score, 5) &&
    minLen(p.halftime, 5) &&
    minLen(p.goal, 2) &&
    minLen(p.matchReport, 80) &&
    p.keyMoments.length >= 1 &&
    p.playersWhoShapedTheMatch.length >= 2 &&
    !PLACEHOLDER_RE.test(p.matchReport) &&
    !PLACEHOLDER_RE.test(JSON.stringify(p.playersWhoShapedTheMatch))
  );
}

export function validateTournamentEditorial(
  tournamentId: TournamentId
): TournamentEditorialCoverage {
  const archive = getCanonicalArchive(tournamentId);
  const rows: MatchEditorialRow[] = [];
  let preMatchCompleteCount = 0;
  let postMatchCompleteCount = 0;

  for (const match of archive) {
    const ed = getCanonicalMatchEditorial(match.canonicalMatchId);
    const teams = `${match.homeTeam} vs ${match.awayTeam}`;
    if (!ed) {
      rows.push({
        canonicalMatchId: match.canonicalMatchId,
        teams,
        preMatch: "missing",
        postMatch: "missing",
        sourceStatus: "missing",
      });
      continue;
    }
    const pre = preMatchComplete(ed) ? "complete" : "invalid";
    const post = postMatchComplete(ed) ? "complete" : "invalid";
    if (pre === "complete") preMatchCompleteCount += 1;
    if (post === "complete") postMatchCompleteCount += 1;
    rows.push({
      canonicalMatchId: match.canonicalMatchId,
      teams,
      preMatch: pre,
      postMatch: post,
      sourceStatus:
        (ed.postMatch.sources?.length ?? 0) > 0 || ed.postMatch.archiveNote
          ? "present"
          : "missing",
    });
  }

  const expected = CANONICAL_MATCH_COUNTS[tournamentId];
  const missing =
    expected -
    rows.filter((r) => r.preMatch === "complete" && r.postMatch === "complete")
      .length;

  return {
    tournamentId,
    canonicalMatches: archive.length,
    preMatchComplete: preMatchCompleteCount,
    postMatchComplete: postMatchCompleteCount,
    missing: Math.max(0, missing),
    rows,
  };
}

/** Flags THIS-tournament outcome spoilers — historical finishes and entering status are allowed. */
const DOSSIER_SPOILER_RE =
  /\b(eventual(ly)?(\s+\w+){0,4}\s+champions?|went on to|would later|destined to|eliminated in|road to glory|miracle of|golden (boot|ball)|lifted the trophy|won (this|the) (world cup|tournament)|finished (as|the|in) (the )?(champions?|runners?-up|third|fourth))\b/i;

const REQUIRED_DOSSIER_SECTIONS = [
  "overview",
  "before",
  "qualification",
  "history",
  "manager",
  "key-players",
  "outlook",
  "squad",
] as const;

function dossierComplete(d: TeamTournamentDossier): boolean {
  const before = d.beforeTheTournament;
  const outlook = d.tournamentOutlook;
  return (
    minLen(d.title, 4) &&
    minLen(d.introduction, 40) &&
    minLen(before.stateOfTeam, 20) &&
    minLen(before.expectations, 20) &&
    minLen(before.majorStorylines, 20) &&
    minLen(d.qualification.method, 3) &&
    minLen(d.qualification.summary, 20) &&
    minLen(d.history.summary, 20) &&
    minLen(d.history.previousAppearance, 2) &&
    minLen(d.history.bestFinishEntering, 3) &&
    typeof d.history.worldCupAppearances === "number" &&
    d.history.worldCupAppearances >= 1 &&
    minLen(d.confederation, 3) &&
    minLen(d.manager, 3) &&
    minLen(d.captain, 3) &&
    minLen(d.tacticalIdentity, 4) &&
    minLen(d.style, 20) &&
    minLen(outlook.label, 3) &&
    minLen(outlook.summary, 20) &&
    d.keyPlayers.length >= 3 &&
    d.keyPlayers.length <= 5 &&
    d.keyPlayers.every(
      (p) => minLen(p.name, 2) && minLen(p.position, 2) && minLen(p.note, 12)
    ) &&
    d.roster.length >= 18
  );
}

function dossierSpoilerSafe(d: TeamTournamentDossier): boolean {
  const blob = [
    d.title,
    d.introduction,
    d.beforeTheTournament.stateOfTeam,
    d.beforeTheTournament.expectations,
    d.beforeTheTournament.majorStorylines,
    d.qualification.summary,
    d.qualification.notableAchievements ?? "",
    d.history.summary,
    d.style,
    d.tournamentOutlook.label,
    d.tournamentOutlook.summary,
    ...d.keyPlayers.map((p) => p.note),
  ].join(" ");
  return !DOSSIER_SPOILER_RE.test(blob);
}

export function listRequiredDossierSections(): readonly string[] {
  return REQUIRED_DOSSIER_SECTIONS;
}

export function validateTeamDossiers(): DossierValidationRow[] {
  const rows: DossierValidationRow[] = [];
  const sets: Array<[TournamentId, readonly string[]]> = [
    ["usa-1994", USA_1994_PARTICIPANT_NAMES],
    ["france-1998", FRANCE_1998_PARTICIPANT_NAMES],
    ["korea-japan-2002", KOREA_JAPAN_2002_PARTICIPANT_NAMES],
  ];

  for (const [tournamentId, names] of sets) {
    const dossiers = listTeamDossiers(tournamentId);
    for (const name of names) {
      const teamId = teamIdFromName(name);
      const d = dossiers.find((row) => row.teamId === teamId);
      if (!d) {
        rows.push({
          tournament: tournamentId,
          team: teamId,
          dossierComplete: false,
          rosterPresent: false,
          sourcesPresent: false,
          spoilerSafe: false,
          usesFallback: true,
        });
        continue;
      }
      rows.push({
        tournament: tournamentId,
        team: teamId,
        dossierComplete: dossierComplete(d),
        rosterPresent: d.roster.length >= 18,
        sourcesPresent: (d.sources?.length ?? 0) > 0,
        spoilerSafe: dossierSpoilerSafe(d),
        usesFallback: false,
      });
    }
  }
  return rows;
}

/** Coverage table for all tournament participants (not only Team Journey nations). */
export function formatTeamProfileCoverage(
  rows: DossierValidationRow[] = validateTeamDossiers()
): TeamProfileCoverageRow[] {
  const out: TeamProfileCoverageRow[] = [];
  for (const tournament of [
    "usa-1994",
    "france-1998",
    "korea-japan-2002",
  ] as TournamentId[]) {
    const subset = rows.filter((r) => r.tournament === tournament);
    const profilesComplete = subset.filter(
      (r) =>
        r.dossierComplete &&
        r.rosterPresent &&
        r.sourcesPresent &&
        r.spoilerSafe &&
        !r.usesFallback
    ).length;
    out.push({
      tournament,
      teams: subset.length,
      profilesComplete,
      missing: subset.length - profilesComplete,
      fallback: subset.filter((r) => r.usesFallback).length,
    });
  }
  return out;
}

export function findDuplicateEditorialReports(): string[] {
  const seen = new Map<string, string>();
  const dupes: string[] = [];
  for (const tournamentId of [
    "usa-1994",
    "france-1998",
    "korea-japan-2002",
  ] as TournamentId[]) {
    for (const ed of listCanonicalMatchEditorials(tournamentId)) {
      const key = ed.postMatch.matchReport.trim().toLowerCase();
      const prev = seen.get(key);
      if (prev && prev !== ed.canonicalMatchId) {
        dupes.push(`${prev} == ${ed.canonicalMatchId}`);
      } else {
        seen.set(key, ed.canonicalMatchId);
      }
    }
  }
  return dupes;
}

/** Boilerplate phrases that indicate template-generated Team Profile copy. */
const DOSSIER_BOILERPLATE_RE =
  /\b(has shaped the squad around recognised leaders|judged against a realistic path through the group stage|can translate form onto Asia.?s stages|built to control key moments, protect .+ leadership|enter with a defined group path and the knowledge that Asia.?s first World Cup|Central figure in .+ plans entering|Organised tournament side|secured a place through their confederation.?s qualifying pathway|finals history framed by their best previous finish)\b/i;

export type DossierSimilarityIssue = {
  tournament: TournamentId;
  teamA: string;
  teamB: string;
  kind: "identical-sentence" | "similar-paragraph" | "repeated-ngram" | "boilerplate";
  detail: string;
};

export type DossierCoverageReportRow = {
  team: string;
  introBespoke: boolean;
  qualificationVerified: boolean;
  historyVerified: boolean;
  managerStyleVerified: boolean;
  outlookBespoke: boolean;
  keyPlayersVerified: boolean;
  rosterVerified: boolean;
  sourcesPresent: boolean;
  similarityPassed: boolean;
  spoilerSafe: boolean;
};

function normalizeEditorialText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\w\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => normalizeEditorialText(s))
    .filter((s) => s.split(" ").length >= 8);
}

function dossierNarrativeFields(d: TeamTournamentDossier): string[] {
  return [
    d.introduction,
    d.beforeTheTournament.stateOfTeam,
    d.beforeTheTournament.expectations,
    d.beforeTheTournament.majorStorylines,
    d.qualification.summary,
    d.qualification.notableAchievements ?? "",
    d.history.summary,
    d.style,
    d.tournamentOutlook.summary,
    ...d.keyPlayers.map((p) => p.note),
  ].filter((t) => t.trim().length > 0);
}

function tokenSet(text: string): Set<string> {
  return new Set(normalizeEditorialText(text).split(" ").filter(Boolean));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter += 1;
  return inter / (a.size + b.size - inter);
}

function wordNgrams(text: string, n: number): string[] {
  const words = normalizeEditorialText(text).split(" ").filter(Boolean);
  if (words.length < n) return [];
  const out: string[] = [];
  for (let i = 0; i <= words.length - n; i += 1) {
    out.push(words.slice(i, i + n).join(" "));
  }
  return out;
}

/** Generic football phrases allowed to recur without failing similarity. */
const ALLOWED_REPEATED_NGRAMS = new Set([
  "fifa world cup",
  "the world cup",
  "world cup finals",
  "the finals in",
  "entering the tournament",
  "before the tournament",
  "group stage and",
  "in front of",
  "of the ball",
  "from the back",
]);

function dossierHasBoilerplate(d: TeamTournamentDossier): boolean {
  return DOSSIER_BOILERPLATE_RE.test(dossierNarrativeFields(d).join(" "));
}

/**
 * Flags identical sentences, highly similar paragraphs, heavy n-gram reuse,
 * and known template boilerplate across Team Profiles in a tournament.
 */
export function validateDossierSimilarity(
  tournamentId: TournamentId
): DossierSimilarityIssue[] {
  const dossiers = listTeamDossiers(tournamentId);
  const issues: DossierSimilarityIssue[] = [];

  for (const d of dossiers) {
    if (dossierHasBoilerplate(d)) {
      issues.push({
        tournament: tournamentId,
        teamA: d.teamId,
        teamB: d.teamId,
        kind: "boilerplate",
        detail: "Contains known template boilerplate phrasing.",
      });
    }
  }

  for (let i = 0; i < dossiers.length; i += 1) {
    for (let j = i + 1; j < dossiers.length; j += 1) {
      const a = dossiers[i]!;
      const b = dossiers[j]!;
      const aFields = dossierNarrativeFields(a);
      const bFields = dossierNarrativeFields(b);

      const aSentences = new Map<string, string>();
      for (const field of aFields) {
        for (const sentence of splitSentences(field)) {
          aSentences.set(sentence, field.slice(0, 120));
        }
      }
      for (const field of bFields) {
        for (const sentence of splitSentences(field)) {
          if (aSentences.has(sentence)) {
            issues.push({
              tournament: tournamentId,
              teamA: a.teamId,
              teamB: b.teamId,
              kind: "identical-sentence",
              detail: sentence.slice(0, 160),
            });
          }
        }
      }

      for (const fa of aFields) {
        for (const fb of bFields) {
          if (fa.trim().length < 40 || fb.trim().length < 40) continue;
          const score = jaccard(tokenSet(fa), tokenSet(fb));
          if (score >= 0.72) {
            issues.push({
              tournament: tournamentId,
              teamA: a.teamId,
              teamB: b.teamId,
              kind: "similar-paragraph",
              detail: `jaccard=${score.toFixed(2)} :: ${normalizeEditorialText(fa).slice(0, 90)}`,
            });
          }
        }
      }

      const aNgrams = new Set<string>();
      for (const field of aFields) {
        for (const ng of wordNgrams(field, 8)) {
          if (ALLOWED_REPEATED_NGRAMS.has(ng)) continue;
          aNgrams.add(ng);
        }
      }
      const seenPairNgrams = new Set<string>();
      for (const field of bFields) {
        for (const ng of wordNgrams(field, 8)) {
          if (ALLOWED_REPEATED_NGRAMS.has(ng) || !aNgrams.has(ng)) continue;
          if (seenPairNgrams.has(ng)) continue;
          seenPairNgrams.add(ng);
          issues.push({
            tournament: tournamentId,
            teamA: a.teamId,
            teamB: b.teamId,
            kind: "repeated-ngram",
            detail: ng,
          });
        }
      }
    }
  }

  return issues;
}

export function dossierPairSimilarityPassed(
  tournamentId: TournamentId,
  teamIdA: string,
  teamIdB: string
): boolean {
  return !validateDossierSimilarity(tournamentId).some(
    (issue) =>
      (issue.teamA === teamIdA && issue.teamB === teamIdB) ||
      (issue.teamA === teamIdB && issue.teamB === teamIdA)
  );
}

function qualificationLooksSpecific(d: TeamTournamentDossier): boolean {
  const method = d.qualification.method.trim();
  const summary = d.qualification.summary.trim();
  if (method.length < 8 || summary.length < 60) return false;
  if (/regional qualifiers/i.test(method) && summary.length < 100) return false;
  if (
    /secured a place through their confederation|qualified through a competitive campaign/i.test(
      summary
    )
  ) {
    return false;
  }
  return true;
}

function historyLooksSpecific(d: TeamTournamentDossier): boolean {
  const summary = d.history.summary.trim();
  if (summary.length < 60) return false;
  if (/finals history framed by their best previous finish/i.test(summary)) {
    return false;
  }
  return (
    Boolean(d.history.previousAppearance) &&
    Boolean(d.history.bestFinishEntering) &&
    d.history.worldCupAppearances >= 1
  );
}

function managerStyleLooksSpecific(d: TeamTournamentDossier): boolean {
  if (d.manager.trim().length < 3 || d.captain.trim().length < 2) return false;
  if (/organised tournament side/i.test(d.tacticalIdentity)) return false;
  if (/built to control key moments, protect .+ leadership/i.test(d.style)) {
    return false;
  }
  return d.style.trim().length >= 40 && d.tacticalIdentity.trim().length >= 4;
}

function outlookLooksBespoke(d: TeamTournamentDossier): boolean {
  const summary = d.tournamentOutlook.summary.trim();
  if (summary.length < 40) return false;
  return !/enter with a defined group path and the knowledge that Asia/i.test(
    summary
  );
}

function keyPlayersLookVerified(d: TeamTournamentDossier): boolean {
  if (d.keyPlayers.length < 3 || d.keyPlayers.length > 5) return false;
  return d.keyPlayers.every(
    (p) =>
      minLen(p.name, 2) &&
      minLen(p.position, 2) &&
      minLen(p.note, 24) &&
      !/central figure in .+ plans entering/i.test(p.note)
  );
}

function introLooksBespoke(d: TeamTournamentDossier): boolean {
  const intro = d.introduction.trim();
  if (intro.length < 60) return false;
  return !/arrive at Asia.?s first World Cup with a settled squad/i.test(intro);
}

/** Per-team coverage table for the Korea/Japan 2002 rewrite audit. */
export function formatKoreaJapan2002ProfileAudit(
  similarityIssues: DossierSimilarityIssue[] = validateDossierSimilarity(
    "korea-japan-2002"
  )
): DossierCoverageReportRow[] {
  const failingTeams = new Set<string>();
  for (const issue of similarityIssues) {
    failingTeams.add(issue.teamA);
    failingTeams.add(issue.teamB);
  }
  return listTeamDossiers("korea-japan-2002").map((d) => {
    const base = validateTeamDossiers().find(
      (r) => r.tournament === "korea-japan-2002" && r.team === d.teamId
    );
    return {
      team: d.teamId,
      introBespoke: introLooksBespoke(d),
      qualificationVerified: qualificationLooksSpecific(d),
      historyVerified: historyLooksSpecific(d),
      managerStyleVerified: managerStyleLooksSpecific(d),
      outlookBespoke: outlookLooksBespoke(d),
      keyPlayersVerified: keyPlayersLookVerified(d),
      rosterVerified: d.roster.length >= 23,
      sourcesPresent: (d.sources?.length ?? 0) > 0,
      similarityPassed: !failingTeams.has(d.teamId),
      spoilerSafe: base?.spoilerSafe ?? dossierSpoilerSafe(d),
    };
  });
}

export function assertEpilogueLockedUntilComplete(
  tournamentId: TournamentId,
  teamId: string,
  campaignComplete: boolean
): boolean {
  if (campaignComplete) {
    return getTeamEpilogue(tournamentId, teamId) != null;
  }
  // Resolver must return null before completion — checked by callers via resolveTeamEpilogue
  return getTeamEpilogue(tournamentId, teamId) != null;
}

export function formatCoverageTable(
  coverage: TournamentEditorialCoverage
): string {
  return [
    `${coverage.tournamentId} | ${coverage.canonicalMatches} | ${coverage.preMatchComplete} | ${coverage.postMatchComplete} | ${coverage.missing}`,
  ].join("\n");
}
