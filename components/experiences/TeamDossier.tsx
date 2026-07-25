"use client";

import type { TeamTournamentDossier } from "@/lib/editorial";
import { TeamMark } from "./TeamMark";

type TeamDossierProps = {
  dossier: TeamTournamentDossier;
  teamName: string;
};

const POSITION_ORDER = [
  "Goalkeepers",
  "Defenders",
  "Midfielders",
  "Forwards",
] as const;

type FactRow = { label: string; value: string };

function buildFactRows(dossier: TeamTournamentDossier): FactRow[] {
  const rows: FactRow[] = [
    { label: "Manager", value: dossier.manager },
    { label: "Captain", value: dossier.captain },
    { label: "Confederation", value: dossier.confederation },
    { label: "Qualification", value: dossier.qualification.method },
    {
      label: "World Cup appearances",
      value: String(dossier.history.worldCupAppearances),
    },
    { label: "Best finish", value: dossier.history.bestFinishEntering },
  ];
  if (typeof dossier.fifaRanking === "number") {
    rows.push({ label: "FIFA Ranking", value: String(dossier.fifaRanking) });
  }
  return rows;
}

/**
 * Canonical Team Profile presentation — shared by Team Journeys and overlays.
 * Journey campaign controls and epilogues must stay outside this component.
 */
export function TeamProfileContent({ dossier, teamName }: TeamDossierProps) {
  const rosterByGroup = POSITION_ORDER.map((group) => ({
    group,
    players: dossier.roster.filter((p) => p.positionGroup === group),
  })).filter((row) => row.players.length > 0);
  const factRows = buildFactRows(dossier);

  return (
    <section
      className="team-dossier"
      data-testid="team-dossier"
      aria-labelledby="team-dossier-title"
    >
      <header className="team-dossier__hero">
        <TeamMark teamName={teamName} size="lg" labelled />
        <p className="kicker">Team Profile</p>
        <h2 id="team-dossier-title" className="team-dossier__title">
          {dossier.title}
        </h2>
      </header>

      <dl className="team-dossier__facts" data-testid="team-dossier-facts">
        {factRows.map((row) => (
          <div key={row.label} className="team-dossier__fact">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="team-dossier__section" data-dossier-section="overview">
        <h3>Team overview</h3>
        <p className="team-dossier__intro">{dossier.introduction}</p>
      </div>

      <div className="team-dossier__section" data-dossier-section="before">
        <h3>Before the tournament</h3>
        <p>{dossier.beforeTheTournament.stateOfTeam}</p>
        <p>{dossier.beforeTheTournament.expectations}</p>
        <p>{dossier.beforeTheTournament.majorStorylines}</p>
      </div>

      <div className="team-dossier__section" data-dossier-section="qualification">
        <h3>Qualification</h3>
        <p>{dossier.qualification.summary}</p>
        {dossier.qualification.record ? (
          <p className="team-dossier__meta">
            Record: {dossier.qualification.record}
          </p>
        ) : null}
        {dossier.qualification.notableAchievements ? (
          <p className="team-dossier__meta">
            {dossier.qualification.notableAchievements}
          </p>
        ) : null}
      </div>

      <div className="team-dossier__section" data-dossier-section="history">
        <h3>Program history</h3>
        <p>{dossier.history.summary}</p>
        <p className="team-dossier__meta">
          Previous appearance: {dossier.history.previousAppearance}
          {" · "}
          Best finish entering: {dossier.history.bestFinishEntering}
          {" · "}
          World Cup appearances: {dossier.history.worldCupAppearances}
        </p>
      </div>

      <div className="team-dossier__section" data-dossier-section="manager">
        <h3>Manager and style</h3>
        <p className="team-dossier__meta">
          Manager: {dossier.manager}
          {" · "}
          Captain: {dossier.captain}
          {" · "}
          Identity: {dossier.tacticalIdentity}
        </p>
        <p>{dossier.style}</p>
      </div>

      <div className="team-dossier__section" data-dossier-section="key-players">
        <h3>Key players to know</h3>
        <ul className="team-dossier__keys">
          {dossier.keyPlayers.map((player) => (
            <li key={player.name}>
              <strong>{player.name}</strong>
              {` · ${player.position}`}
              <span>{player.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="team-dossier__section" data-dossier-section="outlook">
        <h3>Tournament outlook</h3>
        <p className="team-dossier__outlook-label">
          {dossier.tournamentOutlook.label}
        </p>
        <p>{dossier.tournamentOutlook.summary}</p>
      </div>

      <div className="team-dossier__section" data-dossier-section="squad">
        <h3>Squad snapshot</h3>
        <div className="team-dossier__roster">
          {rosterByGroup.map((row) => (
            <div key={row.group}>
              <h4>{row.group}</h4>
              <p>{row.players.map((p) => p.name).join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** @deprecated Prefer TeamProfileContent — alias kept for existing imports. */
export const TeamDossier = TeamProfileContent;

type TeamEpilogueProps = {
  finish: string;
  record: string;
  goalsFor: number;
  goalsAgainst: number;
  topScorer?: { name: string; goals: number };
  definingMoments: string[];
  legacy: string;
  matchCount: number;
  watchTimeLabel: string;
};

/** Only render when campaignComplete is true — callers must gate. */
export function TeamEpiloguePanel({
  finish,
  record,
  goalsFor,
  goalsAgainst,
  topScorer,
  definingMoments,
  legacy,
  matchCount,
  watchTimeLabel,
}: TeamEpilogueProps) {
  return (
    <section
      className="team-epilogue"
      data-testid="team-epilogue"
      aria-labelledby="team-epilogue-title"
    >
      <p className="kicker">Campaign Epilogue</p>
      <h2 id="team-epilogue-title">After the final whistle</h2>
      <dl className="team-epilogue__stats">
        <div>
          <dt>Finish</dt>
          <dd>{finish}</dd>
        </div>
        <div>
          <dt>Record</dt>
          <dd>{record}</dd>
        </div>
        <div>
          <dt>Goals</dt>
          <dd>
            {goalsFor}–{goalsAgainst}
          </dd>
        </div>
        {topScorer ? (
          <div>
            <dt>Top scorer</dt>
            <dd>
              {topScorer.name} ({topScorer.goals})
            </dd>
          </div>
        ) : null}
        <div>
          <dt>Matches</dt>
          <dd>{matchCount}</dd>
        </div>
        <div>
          <dt>Watch time</dt>
          <dd>{watchTimeLabel}</dd>
        </div>
      </dl>
      <div className="team-epilogue__section">
        <h3>Defining moments</h3>
        <ul>
          {definingMoments.map((moment) => (
            <li key={moment}>{moment}</li>
          ))}
        </ul>
      </div>
      <div className="team-epilogue__section">
        <h3>Legacy</h3>
        <p>{legacy}</p>
      </div>
    </section>
  );
}
