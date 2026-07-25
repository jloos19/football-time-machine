"use client";

import { useEffect, useState } from "react";
import { HeroArchiveSequence } from "./HeroArchiveSequence";
import {
  buildHomeHeroCta,
  resolveHomeContinueResume,
  type HomeHeroCta,
} from "@/lib/home";
import type { TournamentExperience } from "@/lib/experiences";
import type { TournamentId } from "@/lib/archive/types";

type HeroProps = {
  progressRevision?: number;
  onBeginJourney: () => void;
  onContinueWatching: (args: {
    tournamentId: TournamentId;
    experience: TournamentExperience;
  }) => void;
};

export function Hero({
  progressRevision = 0,
  onBeginJourney,
  onContinueWatching,
}: HeroProps) {
  const [cta, setCta] = useState<HomeHeroCta>(() =>
    buildHomeHeroCta({ hasHydratedProgress: false })
  );

  useEffect(() => {
    try {
      const resume = resolveHomeContinueResume();
      setCta(
        buildHomeHeroCta({
          hasHydratedProgress: true,
          resume,
        })
      );
    } catch {
      setCta(buildHomeHeroCta({ hasHydratedProgress: true, resume: null }));
    }
  }, [progressRevision]);

  function handleCta() {
    if (cta.kind === "continue" && cta.tournamentId && cta.experience) {
      onContinueWatching({
        tournamentId: cta.tournamentId,
        experience: cta.experience,
      });
      return;
    }
    onBeginJourney();
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__image" />
        <div className="hero__vignette" />
        <div className="hero__grain" />
      </div>

      <div className="hero__layout">
        <div className="hero__content">
          <p className="hero__eyebrow">A spoiler-free archive of football history</p>
          <h1 id="hero-title" className="hero__title">
            Football Time Machine
          </h1>
          <div className="hero__tagline">
            <p>You know who won.</p>
            <p>Now discover why it mattered.</p>
          </div>
          <p className="hero__product">
            Watch football history unfold one match at a time.
          </p>
          <button
            type="button"
            className="hero__cta"
            onClick={handleCta}
            aria-label={cta.ariaLabel}
            data-cta-kind={cta.kind}
          >
            <span className="hero__cta-stack">
              <span className="hero__cta-label">{cta.label}</span>
              <span className="hero__cta-detail">{cta.detail}</span>
            </span>
            <span className="hero__cta-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <HeroArchiveSequence />
      </div>
    </section>
  );
}
