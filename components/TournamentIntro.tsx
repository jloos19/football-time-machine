"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Season } from "@/data/seasons";
import { getPosterImagePath } from "@/lib/posters";
import { isJourneyStarted } from "@/lib/progress";

type TournamentIntroProps = {
  season: Season;
  onEnter: () => void;
  onBack: () => void;
};

export function TournamentIntro({ season, onEnter, onBack }: TournamentIntroProps) {
  const intro = season.intro!;
  const posterSrc = getPosterImagePath(season.id);
  const [posterFailed, setPosterFailed] = useState(!posterSrc);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const ctaLabel = journeyStarted ? intro.ctaContinue : intro.ctaBegin;

  useEffect(() => {
    setPosterFailed(!posterSrc);
  }, [posterSrc]);

  useEffect(() => {
    setJourneyStarted(isJourneyStarted(season.id));
  }, [season.id]);

  return (
    <section
      className={`tournament-intro tournament-intro--${season.theme}`}
      aria-labelledby="tournament-intro-title"
    >
      <div className="tournament-intro__media" aria-hidden="true">
        {!posterFailed && posterSrc && (
          <Image
            src={posterSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="tournament-intro__poster"
            onError={() => setPosterFailed(true)}
          />
        )}
        <div className="tournament-intro__vignette" />
        <div className="tournament-intro__grain" />
      </div>

      <div className="tournament-intro__content">
        <button type="button" className="tournament-intro__back" onClick={onBack}>
          ← {intro.backLabel}
        </button>

        <div className="tournament-intro__copy">
          <p className="tournament-intro__eyebrow">{intro.eyebrow}</p>
          <h1 id="tournament-intro-title" className="tournament-intro__title">
            {season.name}
          </h1>
          <p className="tournament-intro__meta">
            {season.host}
            <span aria-hidden="true"> · </span>
            {intro.dateRange}
          </p>
          <p className="tournament-intro__tagline">{intro.tagline}</p>
          <div className="tournament-intro__body">
            {intro.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <button type="button" className="tournament-intro__cta" onClick={onEnter}>
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
