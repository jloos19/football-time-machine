import type { TournamentId } from "@/lib/archive/types";

export type MatchKeyMoment = {
  minute?: string;
  title: string;
  description?: string;
};

export type MatchShapingPlayer = {
  player: string;
  team: string;
  role: string;
  description: string;
};

export type CanonicalMatchEditorial = {
  canonicalMatchId: string;
  preMatch: {
    sceneSetter: string;
    aroundTheWorld: string;
    inTheTournament: string;
    whyItMatters: string;
  };
  postMatch: {
    score: string;
    halftime: string;
    goal: string;
    matchReport: string;
    keyMoments: MatchKeyMoment[];
    playersWhoShapedTheMatch: MatchShapingPlayer[];
    archiveNote?: string;
    sources?: string[];
  };
};

/** Pre-tournament expectation label — never references tournament outcomes. */
export type TournamentOutlookLabel =
  | "Tournament favorite"
  | "Dark horse"
  | "Host nation under pressure"
  | "Expected to reach the second round"
  | "Defending champions"
  | "Returning after long absence"
  | "Debutants with belief"
  | "Established contender";

export type TeamDossierKeyPlayer = {
  name: string;
  position: string;
  note: string;
};

export type TeamDossierRosterPlayer = {
  name: string;
  positionGroup: "Goalkeepers" | "Defenders" | "Midfielders" | "Forwards";
};

/**
 * Structured pre-tournament media-guide metadata for a Team Journey.
 * Rendering must stay tournament-agnostic: supply fields, render sections.
 */
export type TeamTournamentDossier = {
  tournamentId: TournamentId;
  teamId: string;
  title: string;
  /** TEAM OVERVIEW — one paragraph on the nation’s situation entering the tournament. */
  introduction: string;
  /** BEFORE THE TOURNAMENT */
  beforeTheTournament: {
    stateOfTeam: string;
    expectations: string;
    majorStorylines: string;
  };
  /** QUALIFICATION */
  qualification: {
    /** Short fact-card label, e.g. "Host Nation" or "UEFA Group 1 winners". */
    method: string;
    summary: string;
    record?: string;
    notableAchievements?: string;
    automaticQualifier?: boolean;
  };
  /** PROGRAM HISTORY — entering this tournament only. */
  history: {
    /** FIFA finals appearance number including this tournament. */
    worldCupAppearances: number;
    previousAppearance: string;
    bestFinishEntering: string;
    summary: string;
  };
  confederation: string;
  /** FIFA/Coca-Cola ranking immediately before kickoff, when available. */
  fifaRanking?: number;
  manager: string;
  captain: string;
  /** MANAGER & STYLE */
  tacticalIdentity: string;
  style: string;
  /** TOURNAMENT OUTLOOK — expectations before Match 1 only. */
  tournamentOutlook: {
    label: TournamentOutlookLabel;
    summary: string;
  };
  keyPlayers: TeamDossierKeyPlayer[];
  roster: TeamDossierRosterPlayer[];
  sources?: string[];
};

export type TeamCampaignEpilogue = {
  tournamentId: TournamentId;
  teamId: string;
  finish: string;
  record: string;
  goalsFor: number;
  goalsAgainst: number;
  topScorer?: { name: string; goals: number };
  definingMoments: string[];
  legacy: string;
  matchCount: number;
  sources?: string[];
};
