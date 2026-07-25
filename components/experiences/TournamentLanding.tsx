"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import type { Season } from "@/data/seasons";
import { getPosterImagePath } from "@/lib/posters";
import type { TournamentHeroAction } from "@/lib/experiences/tournament-hero";
import { ProgressBar } from "./ProgressBar";

type TournamentLandingProps = {
  season: Season;
  onBack: () => void;
  overallProgress: { completed: number; total: number; percent: number };
  /** Always provided — stable SSR/client markup (Explore or Continue). */
  heroAction: TournamentHeroAction;
  onHeroAction: () => void;
  children: ReactNode;
};

export function TournamentLanding({
  season,
  onBack,
  overallProgress,
  heroAction,
  onHeroAction,
  children,
}: TournamentLandingProps) {
  const intro = season.intro!;
  const posterSrc = getPosterImagePath(season.id);
  const [posterFailed, setPosterFailed] = useState(!posterSrc);

  useEffect(() => {
    setPosterFailed(!posterSrc);
  }, [posterSrc]);

  return (
    <div
      className={`tournament-landing tournament-landing--${season.theme}`}
      data-testid="tournament-landing"
    >
      <section
        className="tournament-hero"
        aria-labelledby="tournament-hero-title"
      >
        <div className="tournament-hero__media" aria-hidden="true">
          {!posterFailed && posterSrc && (
            <Image
              src={posterSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="tournament-hero__poster"
              onError={() => setPosterFailed(true)}
            />
          )}
          <div className="tournament-hero__vignette" />
          <div className="tournament-hero__grain" />
        </div>

        <div className="tournament-hero__content">
          <button
            type="button"
            className="tournament-hero__back"
            onClick={onBack}
          >
            {`← ${intro.backLabel}`}
          </button>

          <p className="tournament-hero__eyebrow">{intro.eyebrow}</p>
          <h1 id="tournament-hero-title" className="tournament-hero__title">
            {season.name}
          </h1>
          <p className="tournament-hero__meta">
            {season.host}
            <span aria-hidden="true"> · </span>
            {season.year}
            <span aria-hidden="true"> · </span>
            {intro.dateRange}
          </p>
          <p className="tournament-hero__tagline">{intro.tagline}</p>

          <div className="tournament-hero__progress">
            <ProgressBar
              value={overallProgress.completed}
              max={overallProgress.total}
              label={`${overallProgress.completed} of ${overallProgress.total} tournament matches experienced`}
            />
          </div>

          <button
            type="button"
            className="tournament-hero__cta"
            onClick={onHeroAction}
            aria-label={heroAction.ariaLabel}
            data-hero-action={heroAction.kind}
          >
            <span className="tournament-hero__cta-kicker">
              {heroAction.label}
            </span>
            <span className="tournament-hero__cta-detail">
              {heroAction.detail}
            </span>
            {heroAction.meta ? (
              <span className="tournament-hero__cta-meta">{heroAction.meta}</span>
            ) : null}
          </button>
        </div>
      </section>

      <section
        className="tournament-why"
        aria-labelledby="tournament-why-title"
        data-testid="tournament-why"
      >
        <div className="tournament-why__intro">
          <p className="kicker red">Context</p>
          <h2 id="tournament-why-title">Why This Tournament Matters</h2>
          <p className="tournament-why__lede">
            Before choosing a path through the archive, three points of historical
            frame — spoiler-free, and enough to know why this summer still resonates.
          </p>
        </div>
        <ol className="tournament-why__list">
          {intro.whyItMatters.map((point, index) => (
            <li key={point.label} className="tournament-why__item">
              <span className="tournament-why__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="tournament-why__copy">
                <h3 className="tournament-why__label">{point.label}</h3>
                <p className="tournament-why__text">{point.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tournament-landing__experiences" aria-label="Experiences">
        {children}
      </section>
    </div>
  );
}
