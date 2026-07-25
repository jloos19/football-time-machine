"use client";

import { matchActionLabel, spoilerSafeMatchView } from "@/lib/experiences/presentation";
import { splitMatchTeams } from "@/lib/experiences/presentation";
import { journeyItemLabel } from "@/lib/experiences/journey";
import type { ExperienceEpisode, ExperienceType } from "@/lib/experiences";
import { TeamMark } from "./TeamMark";

export type MatchCardProps = {
  episode: ExperienceEpisode;
  unlocked: boolean;
  done: boolean;
  isNext: boolean;
  startedExperience: boolean;
  hideKnockoutSpoilers: boolean;
  hasReplay: boolean;
  onSelect: () => void;
  /** Defaults to match labeling when omitted. */
  experienceType?: ExperienceType;
};

export function MatchCard({
  episode,
  unlocked,
  done,
  isNext,
  startedExperience,
  hideKnockoutSpoilers,
  hasReplay,
  onSelect,
  experienceType = "complete",
}: MatchCardProps) {
  const view = spoilerSafeMatchView(episode, {
    unlocked,
    hideKnockoutSpoilers,
  });
  const action = matchActionLabel({
    done,
    isNext,
    unlocked,
    startedExperience,
  });
  const teams = view.classified
    ? { home: "Hidden", away: "Hidden" }
    : splitMatchTeams(episode.match);

  const statusText = done
    ? "Completed"
    : !unlocked
      ? "Locked"
      : isNext
        ? "Up next"
        : "Ready";

  const className = [
    "match-card",
    done ? "match-card--done" : "",
    isNext ? "match-card--next" : "",
    !unlocked ? "match-card--locked" : "",
    view.classified ? "match-card--classified" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      disabled={!unlocked}
      onClick={onSelect}
      aria-label={
        view.classified
          ? `${journeyItemLabel(experienceType, episode.n)}, locked knockout fixture`
          : `${action}: ${episode.match}, ${episode.stage}, ${statusText}`
      }
    >
      <div className="match-card__topline">
        <span className="match-card__index">
          {journeyItemLabel(experienceType, episode.n)}
        </span>
        <span className="match-card__stage">{view.stageLabel}</span>
      </div>

      {!view.classified ? (
        <div className="match-card__teams">
          <span className="match-card__side">
            <TeamMark teamName={teams.home} size="sm" />
            <span>{teams.home}</span>
          </span>
          <span className="match-card__vs" aria-hidden="true">
            vs
          </span>
          <span className="match-card__side match-card__side--away">
            <TeamMark teamName={teams.away} size="sm" />
            <span>{teams.away}</span>
          </span>
        </div>
      ) : (
        <h3 className="match-card__classified-title">{view.title}</h3>
      )}

      <p className="match-card__meta">
        <span>{view.dateLabel}</span>
        {!view.classified && episode.city ? (
          <>
            <span aria-hidden="true"> · </span>
            <span>{episode.city}</span>
          </>
        ) : null}
      </p>

      <div className="match-card__footer">
        <span
          className={`match-card__status match-card__status--${statusText
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          <span className="match-card__status-dot" aria-hidden="true" />
          {statusText}
        </span>
        <span
          className={`match-card__replay ${hasReplay ? "is-available" : "is-unavailable"}`}
        >
          {hasReplay ? "Replay available" : "Replay unavailable"}
        </span>
        <strong className="match-card__action">{action}</strong>
      </div>
    </button>
  );
}
