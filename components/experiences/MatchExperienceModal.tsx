"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Episode } from "@/data/seasons";
import type { TournamentId } from "@/lib/archive/types";
import type { ExperienceEpisode, TournamentExperience } from "@/lib/experiences";
import { journeyItemLabel } from "@/lib/experiences/journey";
import { MATCH_TYPE } from "@/lib/experiences/match-typography";
import {
  UBLOCK_ORIGIN_URL,
  getPreferredReplayForEpisode,
  shouldShowDailymotionRecommendation,
} from "@/lib/replays";
import { splitMatchTeams } from "@/lib/experiences/presentation";
import { ExperienceNav } from "./ExperienceNav";
import { TeamMark } from "./TeamMark";
import {
  TeamProfileOverlay,
  TeamProfileTrigger,
  type TeamProfileSelection,
} from "./TeamProfileOverlay";

const DAILYMOTION_SPOILER_LINE =
  "⚠ Avoid reading comments or recommended videos if you wish to remain spoiler-free.";

type StandingsData = {
  group: string;
  rows: Array<Record<string, unknown> & { team: string }>;
};

type MatchExperienceModalProps = {
  episode: ExperienceEpisode;
  experience: TournamentExperience;
  tournamentName: string;
  completed: boolean;
  prev: ExperienceEpisode | null;
  next: ExperienceEpisode | null;
  standings: StandingsData | null;
  onClose: () => void;
  onToggleComplete: () => void;
  onOpen: (episode: ExperienceEpisode) => void;
  onBackToList: () => void;
  onBackToExperienceHome: () => void;
};

type TimelineMoment = {
  minute: string | null;
  text: string;
};

export function MatchExperienceModal({
  episode,
  experience,
  tournamentName,
  completed,
  prev,
  next,
  standings,
  onClose,
  onToggleComplete,
  onOpen,
  onBackToList,
  onBackToExperienceHome,
}: MatchExperienceModalProps) {
  const modalRef = useRef<HTMLElement>(null);
  const [profile, setProfile] = useState<TeamProfileSelection | null>(null);
  const replay = getPreferredReplayForEpisode(episode);
  const showDailymotionRecommendation =
    shouldShowDailymotionRecommendation(replay);
  const teams = splitMatchTeams(episode.match);
  const tournamentId = experience.tournamentId as TournamentId;
  const hasEditorial =
    Boolean(episode.scene) ||
    Boolean(episode.world) ||
    Boolean(episode.tournament) ||
    Boolean(episode.intro);

  // Next/Previous match reuses the same modal — reset its scroll like a new page.
  useLayoutEffect(() => {
    modalRef.current?.scrollTo(0, 0);
    setProfile(null);
  }, [episode.canonicalMatchId]);

  // Navigating away unmounts this modal — keep overlay default-closed on remount.
  useEffect(() => () => setProfile(null), []);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
      role="presentation"
    >
      <article
        ref={modalRef}
        className="episode-modal match-experience"
        data-testid="match-experience-modal"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-experience-title"
      >
        <button type="button" className="close" onClick={onClose} aria-label="Close match">
          ×
        </button>

        <ExperienceNav
          tournamentLabel={tournamentName}
          experienceLabel={experience.title}
          crumbs={[
            { label: "Experience home", onClick: onBackToExperienceHome },
            { label: "Match list", onClick: onBackToList },
            {
              label: journeyItemLabel(experience.type, episode.n),
              current: true,
            },
          ]}
        />

        <header className="match-experience__header">
          <p className={`kicker red ${MATCH_TYPE.eyebrow}`}>{episode.stage}</p>
          <p className={`match-experience__index ${MATCH_TYPE.meta}`}>
            {journeyItemLabel(experience.type, episode.n)}
            {completed ? " · Completed" : ""}
          </p>
          <h2 id="match-experience-title" className="visually-hidden">
            {episode.match}
          </h2>
          <div className="match-experience__teams" aria-hidden={false}>
            <TeamProfileTrigger
              tournamentId={tournamentId}
              teamName={teams.home}
              className="match-experience__side match-experience__team-trigger"
              onOpen={setProfile}
            >
              <TeamMark teamName={teams.home} size="lg" labelled />
              <span className="match-experience__team-name">{teams.home}</span>
            </TeamProfileTrigger>
            <span className={`match-experience__vs ${MATCH_TYPE.meta}`} aria-hidden="true">
              vs
            </span>
            <TeamProfileTrigger
              tournamentId={tournamentId}
              teamName={teams.away}
              className="match-experience__side match-experience__side--away match-experience__team-trigger"
              onOpen={setProfile}
            >
              <TeamMark teamName={teams.away} size="lg" labelled />
              <span className="match-experience__team-name">{teams.away}</span>
            </TeamProfileTrigger>
          </div>
          <p className={`episode-meta match-experience__meta ${MATCH_TYPE.meta}`}>
            {episode.date}
            {episode.city ? ` · ${episode.city}` : ""}
            {replay?.runtime ? ` · ${replay.runtime}` : ""}
          </p>
          <p className={`match-experience__context ${MATCH_TYPE.meta}`}>
            {tournamentName} · {experience.title}
          </p>
        </header>

        {!hasEditorial && (
          <section className="match-chapter match-chapter--compact">
            <h3 className={`match-chapter__title ${MATCH_TYPE.heading}`}>
              Before kickoff
            </h3>
            <p className={`match-chapter__body ${MATCH_TYPE.body}`}>
              {episode.stage}
              {episode.city ? ` at ${episode.city}` : ""}. Part of {experience.title}.
            </p>
          </section>
        )}

        {episode.scene && (
          <section
            className="match-chapter match-chapter--scene"
            data-editorial-section="Scene setter"
          >
            <p className={`match-chapter__body ${MATCH_TYPE.body}`}>
              {episode.scene}
            </p>
          </section>
        )}

        {episode.world && (
          <section
            className="match-chapter match-chapter--world"
            data-editorial-section="Around the world"
          >
            <h3 className={`match-chapter__title ${MATCH_TYPE.heading}`}>
              Around the world
            </h3>
            <p className={`match-chapter__body ${MATCH_TYPE.body}`}>
              {episode.world}
            </p>
          </section>
        )}
        {episode.tournament && (
          <section
            className="match-chapter match-chapter--tournament"
            data-editorial-section="In the tournament"
          >
            <h3 className={`match-chapter__title ${MATCH_TYPE.heading}`}>
              In the tournament
            </h3>
            <p className={`match-chapter__body ${MATCH_TYPE.body}`}>
              {episode.tournament}
            </p>
          </section>
        )}
        {standings && (
          <StandingsTable
            data={standings}
            tournamentId={tournamentId}
            highlightTeams={[teams.home, teams.away]}
            onOpenProfile={setProfile}
          />
        )}
        {episode.intro && (
          <section
            className="match-chapter match-chapter--matters"
            data-editorial-section="Why this match matters"
          >
            <h3 className={`match-chapter__title ${MATCH_TYPE.heading}`}>
              Why this match matters
            </h3>
            <p className={`match-chapter__body ${MATCH_TYPE.body}`}>
              {episode.intro}
            </p>
          </section>
        )}

        {!completed && (
          <section className="match-experience__watch" aria-label="Watch">
            <h3
              className={`match-chapter__title match-experience__watch-title ${MATCH_TYPE.heading}`}
            >
              Watch match
            </h3>
            {replay ? (
              <>
                <p className={`spoiler-warning ${MATCH_TYPE.meta}`}>
                  Open the replay directly and avoid comments or recommended videos.
                </p>
                <div className="actions match-experience__watch-actions">
                  <a
                    className={`watch-button ${MATCH_TYPE.actionPrimary}`}
                    target="_blank"
                    rel="noreferrer"
                    href={replay.url}
                  >
                    ▶ Watch Match
                  </a>
                  {replay.continuationUrl && (
                    <a
                      className={`secondary-button ${MATCH_TYPE.actionSecondary}`}
                      target="_blank"
                      rel="noreferrer"
                      href={replay.continuationUrl}
                    >
                      Continue: extra time / penalties
                    </a>
                  )}
                  <button
                    type="button"
                    className={`secondary-button ${MATCH_TYPE.actionSecondary}`}
                    onClick={onToggleComplete}
                  >
                    Mark complete
                  </button>
                </div>
                {showDailymotionRecommendation && (
                  <aside
                    className="dailymotion-note"
                    data-testid="dailymotion-recommendation"
                    data-replay-provider={replay.provider}
                    aria-label="Dailymotion viewing recommendation"
                  >
                    <p className={`dailymotion-note__body ${MATCH_TYPE.meta}`}>
                      This replay is hosted on Dailymotion. For the best viewing
                      experience, we recommend{" "}
                      <a
                        href={UBLOCK_ORIGIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open the official uBlock Origin website in a new tab."
                      >
                        uBlock Origin
                      </a>
                      , as Dailymotion can contain intrusive advertisements.
                    </p>
                    <p className={`dailymotion-note__spoiler ${MATCH_TYPE.meta}`}>
                      {DAILYMOTION_SPOILER_LINE}
                    </p>
                  </aside>
                )}
                {(replay.alternates?.length ?? 0) > 0 && (
                  <section
                    className="replay-sources"
                    aria-label="Alternative replay sources"
                  >
                    <p className={`replay-sources-label ${MATCH_TYPE.eyebrow}`}>
                      Preferred replay unavailable — try an alternative
                    </p>
                    <ul className="replay-sources-list">
                      {replay.alternates!.map((alt) => (
                        <li key={`${alt.provider}-${alt.url}`}>
                          <a href={alt.url} target="_blank" rel="noreferrer">
                            Alternative replay
                          </a>
                          {alt.continuationUrl && (
                            <>
                              {" · "}
                              <a
                                href={alt.continuationUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Continue: extra time / penalties
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            ) : (
              <div className="empty-state empty-state--inline" role="status">
                <strong>Replay unavailable</strong>
                <p className={MATCH_TYPE.body}>
                  A full-match replay is not ready for this fixture yet. You can still mark
                  the match complete when you have watched it elsewhere.
                </p>
                <button
                  type="button"
                  className={`secondary-button ${MATCH_TYPE.actionSecondary}`}
                  onClick={onToggleComplete}
                >
                  Mark complete
                </button>
              </div>
            )}
            <div className="locked-report">
              <span className={`locked-report__seal ${MATCH_TYPE.eyebrow}`}>
                Sealed archive
              </span>
              <strong className={`locked-report__title ${MATCH_TYPE.heading}`}>
                Post-match report
              </strong>
              <p className={`locked-report__tease ${MATCH_TYPE.body}`}>
                Final score, key moments, and the players who shaped the match —
                waiting to be opened.
              </p>
            </div>
          </section>
        )}

        {completed && (
          <section className="match-experience__post" aria-label="After the match">
            <div
              className={`match-experience__complete-badge ${MATCH_TYPE.eyebrow}`}
              role="status"
            >
              Match complete
            </div>
            {replay && (
              <div className="actions match-experience__post-actions">
                <a
                  className={`secondary-button ${MATCH_TYPE.actionSecondary}`}
                  target="_blank"
                  rel="noreferrer"
                  href={replay.url}
                >
                  Rewatch match
                </a>
                <button
                  type="button"
                  className={`text-button ${MATCH_TYPE.meta}`}
                  onClick={onToggleComplete}
                >
                  Mark incomplete
                </button>
              </div>
            )}
            {!replay && (
              <div className="actions match-experience__post-actions">
                <button
                  type="button"
                  className={`text-button ${MATCH_TYPE.meta}`}
                  onClick={onToggleComplete}
                >
                  Mark incomplete
                </button>
              </div>
            )}
            {episode.postMatch ? (
              <PostMatchReport episode={episode} />
            ) : (
              <div className="empty-state empty-state--inline" role="status">
                <strong className={MATCH_TYPE.heading}>Match recorded</strong>
                <p className={MATCH_TYPE.body}>
                  Completion is saved. The post-match report could not be resolved for
                  this fixture.
                </p>
              </div>
            )}
          </section>
        )}

        <div className="match-experience__nav">
          {prev && (
            <div className="actions match-experience__prev">
              <button
                type="button"
                className={`secondary-button ${MATCH_TYPE.actionSecondary}`}
                onClick={() => onOpen(prev)}
              >
                ← Previous match
              </button>
            </div>
          )}
          {completed && next && (
            <button
              type="button"
              className="next-match"
              onClick={() => onOpen(next)}
            >
              <span className={`next-match__kicker ${MATCH_TYPE.eyebrow}`}>
                Next chapter
              </span>
              <strong className={`next-match__title ${MATCH_TYPE.heading}`}>
                {next.title}
              </strong>
              <small className={`next-match__match ${MATCH_TYPE.meta}`}>
                {next.match}
              </small>
            </button>
          )}
          {completed && !next && (
            <div className="empty-state empty-state--inline" role="status">
              <strong className={MATCH_TYPE.heading}>Experience complete</strong>
              <p className={MATCH_TYPE.body}>
                You’ve reached the end of {experience.title}.
              </p>
              <button
                type="button"
                className={`secondary-button ${MATCH_TYPE.actionSecondary}`}
                onClick={onBackToExperienceHome}
              >
                Back to experience
              </button>
            </div>
          )}
        </div>
      </article>

      <TeamProfileOverlay
        selection={profile}
        onClose={() => setProfile(null)}
      />
    </div>
  );
}

function StandingsTable({
  data,
  tournamentId,
  highlightTeams,
  onOpenProfile,
}: {
  data: StandingsData;
  tournamentId: TournamentId;
  highlightTeams: string[];
  onOpenProfile: (selection: TeamProfileSelection) => void;
}) {
  const highlighted = new Set(
    highlightTeams.map((team) => team.trim().toLowerCase()).filter(Boolean),
  );

  return (
    <section className="match-chapter match-chapter--standings">
      <h3 className={`match-chapter__title ${MATCH_TYPE.heading}`}>
        Group {data.group}
      </h3>
      <p className={`match-chapter__eyebrow ${MATCH_TYPE.eyebrow}`}>
        Before kickoff
      </p>
      <p className={`table-note ${MATCH_TYPE.meta}`}>
        Official table entering this match. Simultaneous matches are excluded.
      </p>
      <div className={`table-scroll standings-table ${MATCH_TYPE.table}`}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => {
              const isFeatured = highlighted.has(r.team.trim().toLowerCase());
              return (
                <tr
                  key={r.team}
                  className={isFeatured ? "standings-table__row--featured" : undefined}
                >
                  <td>{i + 1}</td>
                  <td>
                    <TeamProfileTrigger
                      tournamentId={tournamentId}
                      teamName={r.team}
                      className="standings-table__team-trigger"
                      onOpen={onOpenProfile}
                    >
                      <span className="standings-table__team">
                        <TeamMark teamName={r.team} size="sm" />
                        <span>{r.team}</span>
                      </span>
                    </TeamProfileTrigger>
                  </td>
                  <td>{r.p as number}</td>
                  <td>{r.w as number}</td>
                  <td>{r.d as number}</td>
                  <td>{r.l as number}</td>
                  <td>{r.gd as number}</td>
                  <td>
                    <strong>{r.pts as number}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PostMatchReport({ episode }: { episode: Episode }) {
  const p = episode.postMatch!;
  const matchReport =
    p.matchReport?.trim() ||
    (p.keyEvents?.length > 0 ? p.keyEvents.join(" ") : null);
  const structuredMoments: TimelineMoment[] = (p.keyMoments ?? []).map(
    (moment) => ({
      minute: moment.minute ?? null,
      text: moment.description
        ? `${moment.title} — ${moment.description}`
        : moment.title,
    })
  );
  const timedMoments = parseGoalTimeline(p.goal);
  const keyMoments: TimelineMoment[] =
    structuredMoments.length > 0
      ? structuredMoments
      : timedMoments.length > 0
        ? timedMoments
        : (p.keyEvents ?? []).map((event) => ({ minute: null, text: event }));

  return (
    <section className="post-report">
      <div className="scoreboard">
        <small className={MATCH_TYPE.eyebrow}>Full time</small>
        <strong className="scoreboard__score">{p.score}</strong>
        <span className={`scoreboard__halftime ${MATCH_TYPE.meta}`}>{p.halftime}</span>
        {p.goal && (
          <p className="scoreboard__key-event">{p.goal}</p>
        )}
      </div>

      {matchReport && (
        <section className="post-report__chapter">
          <h4 className={`post-report__heading ${MATCH_TYPE.heading}`}>
            Match report
          </h4>
          <p
            className={`post-report__prose ${MATCH_TYPE.body}`}
            data-editorial-section="Match report"
          >
            {matchReport}
          </p>
        </section>
      )}

      {keyMoments.length > 0 && (
        <section className="post-report__chapter">
          <h4 className={`post-report__heading ${MATCH_TYPE.heading}`}>
            Key moments
          </h4>
          <ol className="key-moments">
            {keyMoments.map((moment) => (
              <li
                key={`${moment.minute ?? "moment"}-${moment.text}`}
                className="key-moments__item"
              >
                {moment.minute && (
                  <span className={`key-moments__minute ${MATCH_TYPE.meta}`}>
                    {moment.minute}
                  </span>
                )}
                <span className={`key-moments__text ${MATCH_TYPE.heading}`}>
                  {moment.text}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.impactPlayers?.length > 0 && (
        <section className="post-report__chapter">
          <h4 className={`post-report__heading ${MATCH_TYPE.heading}`}>
            Players who shaped the match
          </h4>
          <div className="impact-list">
            {p.impactPlayers.map((player) => (
              <article
                key={`${player.name}-${player.role}`}
                className="impact-exhibit"
              >
                <h5 className={`impact-exhibit__name ${MATCH_TYPE.playerName}`}>
                  {player.name}
                </h5>
                <p className={`impact-exhibit__role ${MATCH_TYPE.playerRole}`}>
                  <TeamMark teamName={player.team} size="sm" />
                  <span>
                    {player.team} · {player.role}
                  </span>
                </p>
                <p className={`impact-exhibit__summary ${MATCH_TYPE.body}`}>
                  {player.summary}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {p.sourceNote && (
        <p className={`source-note ${MATCH_TYPE.meta}`}>
          <span className={`source-note__label ${MATCH_TYPE.eyebrow}`}>
            Archive note
          </span>
          {p.sourceNote}
        </p>
      )}
    </section>
  );
}

/** Parse scorer strings like "Romário 26′; Raí 52′ (pen.)" into timeline rows. */
function parseGoalTimeline(goal: string): TimelineMoment[] {
  const trimmed = goal.trim();
  if (!trimmed || /^no goals/i.test(trimmed)) return [];

  const moments: TimelineMoment[] = [];
  const groups = trimmed.split(/\s*;\s*/);

  for (const group of groups) {
    const nameMatch = group.match(/^(.+?)\s+(?=\d)/);
    if (!nameMatch) continue;

    const name = nameMatch[1].trim();
    const rest = group.slice(nameMatch[0].length);
    const noteMatch = rest.match(/\(([^)]+)\)\s*$/);
    const note = noteMatch?.[1] ?? null;
    const minutePart = noteMatch ? rest.slice(0, noteMatch.index) : rest;
    const minutes = [...minutePart.matchAll(/(\d+)\s*[′'`]/g)].map((m) => m[1]);

    minutes.forEach((minute, index) => {
      const isLast = index === minutes.length - 1;
      moments.push({
        minute: `${minute}'`,
        text: note && isLast ? `${name} (${note})` : name,
      });
    });
  }

  return moments;
}
