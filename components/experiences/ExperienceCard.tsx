"use client";

import type { ExperienceType, TeamJourneyMeta } from "@/lib/experiences";
import {
  experienceActionLabel,
  experienceEyebrow,
  experienceScaleLabel,
  experienceVisualVariant,
} from "@/lib/experiences/presentation";
import { ProgressBar } from "./ProgressBar";
import { TeamMark } from "./TeamMark";

export type ExperienceCardProps = {
  type: ExperienceType;
  title: string;
  description: string;
  matchCount: number;
  completedCount: number;
  percent: number;
  /** Primary action (Start / Continue / Review). */
  onPrimary: () => void;
  /** Optional secondary action (e.g. open list / choose team). */
  onSecondary?: () => void;
  secondaryLabel?: string;
  featured?: "primary" | "secondary" | false;
  disabled?: boolean;
  /** Override primary button label. */
  primaryLabel?: string;
  /** Hide the primary CTA (e.g. Follow a Team — nation pills are the navigation). */
  hidePrimary?: boolean;
  /** Selectable team marks previewed inside the Follow a Team card. */
  teamPreview?: readonly TeamJourneyMeta[];
  onSelectTeam?: (teamId: string) => void;
};

export function ExperienceCard({
  type,
  title,
  description,
  matchCount,
  completedCount,
  percent,
  onPrimary,
  onSecondary,
  secondaryLabel,
  featured = false,
  disabled = false,
  primaryLabel,
  hidePrimary = false,
  teamPreview,
  onSelectTeam,
}: ExperienceCardProps) {
  const variant = experienceVisualVariant(type);
  const action =
    primaryLabel ??
    experienceActionLabel({ completed: completedCount, total: matchCount });
  const scale = experienceScaleLabel(matchCount);
  const featuredClass =
    featured === "primary"
      ? "experience-card--featured-primary"
      : featured === "secondary"
        ? "experience-card--featured-secondary"
        : "";
  const started = matchCount > 0 && completedCount > 0;
  const complete = matchCount > 0 && completedCount >= matchCount;
  const showPrimary = !hidePrimary;
  const showActions = showPrimary || Boolean(onSecondary && secondaryLabel);

  const primaryAria = `${action} ${title}${
    matchCount > 0
      ? `, ${completedCount} of ${matchCount} matches complete`
      : ""
  }`;

  return (
    <article
      className={`experience-card experience-card--${variant} ${featuredClass}`.trim()}
      data-experience-type={type}
      aria-labelledby={`experience-card-title-${type}`}
    >
      <div className="experience-card__header">
        <div className="experience-card__eyebrow-row">
          <p className="experience-card__eyebrow">{experienceEyebrow(type)}</p>
          {featured === "primary" && (
            <span className="experience-card__recommend">Begin here</span>
          )}
        </div>
        {type === "team" && hidePrimary ? (
          <button
            type="button"
            id={`experience-card-title-${type}`}
            className="experience-card__title experience-card__title-button"
            onClick={onPrimary}
            disabled={disabled}
            aria-label={`Open ${title} nation selector`}
            data-testid="follow-a-team-open"
          >
            {title}
          </button>
        ) : (
          <h3 id={`experience-card-title-${type}`} className="experience-card__title">
            {title}
          </h3>
        )}
        <p className="experience-card__description">{description}</p>
      </div>

      <div className="experience-card__body">
        {type === "team" && teamPreview && teamPreview.length > 0 ? (
          <div className="experience-card__teams" role="list" aria-label="Selectable teams">
            {teamPreview.map((team) => (
              <button
                key={team.teamId}
                type="button"
                role="listitem"
                className="experience-card__team"
                onClick={() => onSelectTeam?.(team.teamId)}
                disabled={disabled || !onSelectTeam}
                aria-label={`Follow ${team.teamName}`}
                title={team.teamName}
              >
                <TeamMark teamName={team.teamName} size="md" labelled />
                <span className="experience-card__team-name">{team.teamName}</span>
              </button>
            ))}
          </div>
        ) : matchCount > 0 ? (
          <>
            <p className="experience-card__scale">{scale}</p>
            {started && (
              <ProgressBar
                value={completedCount}
                max={matchCount}
                label={
                  complete
                    ? `Journey complete · ${matchCount} matches`
                    : `${completedCount} of ${matchCount} experienced`
                }
                className="experience-card__progress"
              />
            )}
          </>
        ) : null}
      </div>

      {showActions ? (
        <div className="experience-card__actions">
          {showPrimary ? (
            <button
              type="button"
              className="experience-card__cta"
              onClick={onPrimary}
              disabled={disabled}
              aria-label={primaryAria}
            >
              {action}
              <span aria-hidden="true"> →</span>
            </button>
          ) : null}
          {onSecondary && secondaryLabel ? (
            <button
              type="button"
              className="experience-card__secondary"
              onClick={onSecondary}
              disabled={disabled}
            >
              {secondaryLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
