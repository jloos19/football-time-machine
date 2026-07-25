"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Season } from "@/data/seasons";
import { getPosterImagePath } from "@/lib/posters";
import {
  experienceActionLabel,
  formatWatchTime,
  isExperienceMatchUnlocked,
  spoilerSafeMatchView,
  tournamentHomeBackLabel,
  type ExperienceEpisode,
  type TournamentExperience,
} from "@/lib/experiences";
import {
  displayStageHeading,
  groupEpisodesByStage,
  journeyAccent,
  journeyContentsCopy,
  journeyEditorialIntro,
  journeyEyebrow,
  journeyItemLabel,
  journeyProgressLabel,
  teamJourneyEditorial,
} from "@/lib/experiences/journey";
import { episodeTeaser } from "@/lib/experiences/teasers";
import {
  getTeamDossier,
  resolveTeamEpilogue,
} from "@/lib/editorial";
import type { TournamentId } from "@/lib/archive/types";
import { ProgressBar } from "./ProgressBar";
import { TeamEpiloguePanel, TeamProfileContent } from "./TeamDossier";
import { TeamMark } from "./TeamMark";

export type JourneyViewProps = {
  season: Season;
  experience: TournamentExperience;
  episodes: ExperienceEpisode[];
  completedCanonicalIds: Set<string>;
  onBack: () => void;
  onOpenEpisode: (episode: ExperienceEpisode) => void;
  /** Required for team journeys — nation identity in the hero. */
  teamName?: string;
};

/** @deprecated Prefer JourneyView — kept for existing imports/tests. */
export function StoryView(props: JourneyViewProps) {
  return <JourneyView {...props} />;
}

export function JourneyView({
  season,
  experience,
  episodes,
  completedCanonicalIds,
  onBack,
  onOpenEpisode,
  teamName,
}: JourneyViewProps) {
  const posterSrc = getPosterImagePath(season.id);
  const [posterFailed, setPosterFailed] = useState(!posterSrc);

  useEffect(() => {
    setPosterFailed(!posterSrc);
  }, [posterSrc]);

  const accent = journeyAccent(experience.type);
  const progress = {
    completed: episodes.filter((ep) =>
      completedCanonicalIds.has(ep.canonicalMatchId)
    ).length,
    total: episodes.length,
  };
  const allComplete =
    progress.total > 0 && progress.completed >= progress.total;
  const nextEpisode =
    episodes.find((ep, index) => {
      if (completedCanonicalIds.has(ep.canonicalMatchId)) return false;
      return isExperienceMatchUnlocked(
        experience,
        index,
        completedCanonicalIds
      );
    }) ?? null;

  const journeyLabel = experienceActionLabel(progress);
  const ctaLabel =
    journeyLabel === "Start"
      ? "Start Journey"
      : journeyLabel === "Continue"
        ? "Continue Journey"
        : "Review Journey";

  const nextTitle = nextEpisode
    ? spoilerSafeMatchView(nextEpisode, {
        unlocked: true,
        hideKnockoutSpoilers: false,
      }).title
    : null;

  const isTeam = experience.type === "team";
  const isArchive = experience.type === "complete";
  const nationName = teamName ?? experience.title;

  const ctaDetail = allComplete
    ? isTeam
      ? "Return to the opening match"
      : experience.type === "complete"
        ? "Return to the opening match"
        : experience.type === "essentials"
          ? "Return to the first moment"
          : "Return to the opening chapter"
    : nextEpisode
      ? isTeam
        ? `Next Match · ${nextEpisode.match}`
        : `${journeyItemLabel(experience.type, nextEpisode.n)} · ${
            experience.type === "complete" ? nextEpisode.match : nextTitle
          }`
      : experience.shortDescription;

  const progressLabel = journeyProgressLabel({
    type: experience.type,
    completed: progress.completed,
    total: progress.total,
    currentN: nextEpisode?.n ?? null,
  });

  const dossier =
    isTeam && experience.teamId
      ? getTeamDossier(
          experience.tournamentId as TournamentId,
          experience.teamId
        )
      : null;
  const epilogue =
    isTeam && experience.teamId
      ? resolveTeamEpilogue({
          tournamentId: experience.tournamentId as TournamentId,
          teamId: experience.teamId,
          campaignComplete: allComplete,
        })
      : null;
  const editorial = isTeam
    ? dossier?.introduction ?? teamJourneyEditorial(experience, nationName)
    : journeyEditorialIntro(experience, progress.total);
  const contents = journeyContentsCopy(experience.type);

  // Team: never expose future rounds/fixtures — only completed + current.
  const visibleTeamEpisodes = isTeam
    ? episodes.filter((ep, index) => {
        const unlocked = isExperienceMatchUnlocked(
          experience,
          index,
          completedCanonicalIds
        );
        return unlocked || completedCanonicalIds.has(ep.canonicalMatchId);
      })
    : episodes;

  const stageGroups =
    isTeam && allComplete
      ? groupEpisodesByStage(episodes)
      : [{ stage: "", episodes: isTeam ? visibleTeamEpisodes : episodes }];

  function handlePrimaryAction() {
    if (allComplete && episodes[0]) {
      onOpenEpisode(episodes[0]);
      return;
    }
    if (nextEpisode) onOpenEpisode(nextEpisode);
  }

  function renderChapter(
    episode: ExperienceEpisode,
    indexInExperience: number
  ) {
    const unlocked = isExperienceMatchUnlocked(
      experience,
      indexInExperience,
      completedCanonicalIds
    );
    const done = completedCanonicalIds.has(episode.canonicalMatchId);
    const isCurrent =
      nextEpisode?.canonicalMatchId === episode.canonicalMatchId;
    const view = spoilerSafeMatchView(episode, {
      unlocked,
      hideKnockoutSpoilers: true,
    });
    const itemLabel = isTeam
      ? isCurrent
        ? "Next Match"
        : done
          ? `Match ${String(episode.n).padStart(2, "0")}`
          : "Future chapter"
      : journeyItemLabel(experience.type, episode.n);
    const teaser = view.classified
      ? "A knockout fixture waits beyond this point."
      : episodeTeaser(episode);

    const className = [
      "journey-chapter",
      "story-chapter",
      done ? "journey-chapter--done story-chapter--done" : "",
      isCurrent ? "journey-chapter--current story-chapter--current" : "",
      !unlocked ? "journey-chapter--future story-chapter--future" : "",
      view.classified
        ? "journey-chapter--classified story-chapter--classified"
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    const metaParts = isTeam
      ? [view.matchLabel, view.dateLabel].filter(Boolean)
      : experience.type === "complete"
        ? view.classified
          ? [view.stageLabel, view.dateLabel]
          : [view.matchLabel, view.dateLabel, episode.city].filter(Boolean)
        : view.classified
          ? [view.stageLabel, view.dateLabel]
          : [view.matchLabel, view.dateLabel];

    const displayTitle = isTeam
      ? view.matchLabel
      : experience.type === "complete"
        ? view.classified
          ? "Classified"
          : view.matchLabel
        : view.title;

    return (
      <li key={episode.canonicalMatchId} className={className}>
        <button
          type="button"
          className="journey-chapter__button story-chapter__button"
          disabled={!unlocked}
          onClick={() => onOpenEpisode(episode)}
          aria-current={isCurrent ? "step" : undefined}
          aria-label={
            view.classified
              ? `${itemLabel}, locked knockout fixture`
              : `${displayTitle}. ${view.matchLabel}. ${view.dateLabel}.${
                  done ? " Completed." : isCurrent ? " Up next." : ""
                }`
          }
        >
          <span
            className="journey-chapter__rail story-chapter__rail"
            aria-hidden="true"
          >
            <span className="journey-chapter__node story-chapter__node" />
          </span>
          <span className="journey-chapter__body story-chapter__body">
            <span className="journey-chapter__index story-chapter__index">
              {itemLabel}
              {done ? (
                <span className="journey-chapter__status story-chapter__status">
                  {experience.type === "story" ? "Read" : "Done"}
                </span>
              ) : isCurrent ? (
                <span className="journey-chapter__status journey-chapter__status--now story-chapter__status story-chapter__status--now">
                  Now
                </span>
              ) : null}
            </span>
            <span className="journey-chapter__title story-chapter__title">
              {displayTitle}
            </span>
            {!isTeam ? (
              <span className="journey-chapter__teaser" aria-hidden="true">
                {teaser}
              </span>
            ) : null}
            <span className="journey-chapter__meta story-chapter__meta">
              {metaParts.map((part, partIndex) => (
                <span key={`${part}-${partIndex}`}>
                  {partIndex > 0 ? <span aria-hidden="true"> · </span> : null}
                  {part}
                </span>
              ))}
            </span>
          </span>
        </button>
      </li>
    );
  }

  const indexById = new Map(
    episodes.map((ep, index) => [ep.canonicalMatchId, index] as const)
  );

  return (
    <div
      className={`journey-view story-view journey-view--${experience.type} journey-view--${season.theme} story-view--${season.theme} journey-view--accent-${accent}`}
      data-testid={
        experience.type === "story" ? "story-view" : "journey-view"
      }
      data-journey-type={experience.type}
    >
      <section className="journey-hero story-hero" aria-labelledby="journey-hero-title">
        <div className="journey-hero__media story-hero__media" aria-hidden="true">
          {!posterFailed && posterSrc ? (
            <Image
              src={posterSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="journey-hero__poster story-hero__poster"
              onError={() => setPosterFailed(true)}
            />
          ) : null}
          <div className="journey-hero__vignette story-hero__vignette" />
          <div className="journey-hero__grain story-hero__grain" />
        </div>

        <div className="journey-hero__content story-hero__content">
          <button
            type="button"
            className="journey-hero__back story-hero__back"
            onClick={onBack}
          >
            {isTeam
              ? `← ${tournamentHomeBackLabel(season.name)}`
              : "← Tournament home"}
          </button>

          <p className="journey-hero__eyebrow story-hero__eyebrow">
            {journeyEyebrow(experience.type)}
          </p>

          {isTeam ? (
            <div className="journey-hero__nation">
              <TeamMark teamName={nationName} size="lg" labelled />
            </div>
          ) : null}

          <h1 id="journey-hero-title" className="journey-hero__title story-hero__title">
            {isTeam ? nationName : season.name}
          </h1>

          {isTeam && dossier ? (
            <p className="journey-hero__lede story-hero__lede">{dossier.title}</p>
          ) : (
            <p className="journey-hero__lede story-hero__lede">
              {experience.shortDescription}
            </p>
          )}

          <p className="journey-hero__editorial">{editorial}</p>

          <div className="journey-hero__progress story-hero__progress">
            {isTeam ? (
              progress.completed <= 0 ? (
                <ProgressBar
                  value={0}
                  max={1}
                  label="Campaign progress"
                  accent={accent}
                  showPercent
                />
              ) : allComplete ? (
                <ProgressBar
                  value={1}
                  max={1}
                  label="Campaign complete"
                  accent={accent}
                  showPercent
                />
              ) : (
                <p className="journey-hero__begun">Journey begun</p>
              )
            ) : (
              <ProgressBar
                value={progress.completed}
                max={progress.total}
                label={progressLabel}
                accent={accent}
              />
            )}
          </div>

          <button
            type="button"
            className="journey-hero__cta story-hero__cta"
            onClick={handlePrimaryAction}
            disabled={!allComplete && !nextEpisode}
            aria-label={`${ctaLabel}. ${ctaDetail}`}
          >
            <span className="journey-hero__cta-kicker story-hero__cta-kicker">
              {ctaLabel}
            </span>
            <span className="journey-hero__cta-detail story-hero__cta-detail">
              {isTeam && nextEpisode && !allComplete ? (
                <>
                  <span className="journey-hero__cta-match">
                    {nextEpisode.match}
                  </span>
                  <span className="journey-hero__cta-date">
                    {nextEpisode.date}
                  </span>
                </>
              ) : (
                ctaDetail
              )}
            </span>
          </button>
        </div>
      </section>

      <section
        className={`journey-chapters story-chapters${
          isArchive ? " journey-chapters--archive" : ""
        }${isTeam ? " journey-chapters--team" : ""}`}
        aria-labelledby="journey-chapters-title"
      >
        {isTeam && dossier ? (
          <TeamProfileContent dossier={dossier} teamName={nationName} />
        ) : null}

        {isTeam && allComplete && epilogue ? (
          <TeamEpiloguePanel
            finish={epilogue.finish}
            record={epilogue.record}
            goalsFor={epilogue.goalsFor}
            goalsAgainst={epilogue.goalsAgainst}
            topScorer={epilogue.topScorer}
            definingMoments={epilogue.definingMoments}
            legacy={epilogue.legacy}
            matchCount={epilogue.matchCount}
            watchTimeLabel={formatWatchTime(epilogue.matchCount)}
          />
        ) : null}

        {isTeam && allComplete ? (
          <div className="journey-campaign-complete" data-testid="campaign-complete">
            <p className="kicker">Campaign Complete</p>
            <h2>You have experienced every match played by this nation during the tournament.</h2>
            <dl className="journey-campaign-complete__stats">
              <div>
                <dt>Matches watched</dt>
                <dd>{progress.total}</dd>
              </div>
              <div>
                <dt>Total watch time</dt>
                <dd>{formatWatchTime(progress.total)}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        <header className="journey-chapters__intro story-chapters__intro">
          <p className="kicker">{contents.kicker}</p>
          <h2 id="journey-chapters-title">
            {isTeam ? "Campaign entry" : contents.title}
          </h2>
          <p className="journey-chapters__lede story-chapters__lede">
            {isTeam
              ? "Start with the first unlocked match. Future fixtures stay hidden until you are ready."
              : contents.lede}
          </p>
        </header>

        {stageGroups.map((group, groupIndex) => (
          <div
            key={group.stage || "all"}
            className={
              isTeam && allComplete
                ? "journey-round"
                : "journey-round journey-round--flat"
            }
          >
            {isTeam && allComplete && group.stage ? (
              <div className="journey-round__header">
                {groupIndex > 0 ? (
                  <span className="journey-round__connector" aria-hidden="true">
                    ↓
                  </span>
                ) : null}
                <h3 className="journey-round__title">
                  {displayStageHeading(group.stage)}
                </h3>
              </div>
            ) : null}

            <ol
              className={`journey-timeline story-timeline${
                isArchive ? " journey-timeline--archive" : ""
              }`}
            >
              {group.episodes.map((episode) => {
                const index = indexById.get(episode.canonicalMatchId) ?? 0;
                return renderChapter(episode, index);
              })}

              {isTeam && !allComplete ? (
                <li className="journey-chapter journey-chapter--locked-future story-chapter">
                  <div
                    className="journey-chapter__button story-chapter__button journey-chapter__placeholder"
                    aria-label="Future chapter. Match to be revealed."
                  >
                    <span
                      className="journey-chapter__rail story-chapter__rail"
                      aria-hidden="true"
                    >
                      <span className="journey-chapter__node story-chapter__node" />
                    </span>
                    <span className="journey-chapter__body story-chapter__body">
                      <span className="journey-chapter__index story-chapter__index">
                        Future chapter
                      </span>
                      <span className="journey-chapter__title story-chapter__title">
                        Match to be revealed…
                      </span>
                    </span>
                  </div>
                </li>
              ) : null}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
