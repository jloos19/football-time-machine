"use client";

import { useEffect, useState } from "react";
import { worldCupPosters } from "@/data/worldCupPosters";
import { getPosterImagePath } from "@/lib/posters";
import { getSeasonMatchTotal, isJourneyStarted, readProgress } from "@/lib/progress";
import { Poster } from "@/components/Poster";

type ContinueItem = {
  seasonId: string;
  tournament: string;
  year: number;
  tagline: string;
  theme: (typeof worldCupPosters)[number]["theme"];
  completed: number;
  total: number;
};

type ContinueWatchingProps = {
  onSelectSeason: (seasonId: string) => void;
  progressRevision?: number;
};

export function ContinueWatching({
  onSelectSeason,
  progressRevision = 0,
}: ContinueWatchingProps) {
  const [items, setItems] = useState<ContinueItem[]>([]);

  useEffect(() => {
    const next: ContinueItem[] = [];
    for (const poster of worldCupPosters) {
      if (poster.status === "coming-soon") continue;
      if (!isJourneyStarted(poster.seasonId)) continue;
      const completed = readProgress(poster.seasonId);
      const total = getSeasonMatchTotal(poster.seasonId);
      if (total === 0) continue;
      next.push({
        seasonId: poster.seasonId,
        tournament: poster.tournament,
        year: poster.year,
        tagline: poster.tagline,
        theme: poster.theme,
        completed,
        total,
      });
    }
    setItems(next);
  }, [progressRevision]);

  if (items.length === 0) return null;

  return (
    <section
      className="continue-watching"
      aria-labelledby="continue-watching-title"
    >
      <header className="continue-watching__header">
        <h2 id="continue-watching-title" className="continue-watching__title">
          Continue Watching
        </h2>
        <p className="continue-watching__subtitle">
          Pick up where the story left off.
        </p>
      </header>

      <div className="continue-watching__track" role="list">
        {items.map((item, index) => {
          const progressPct = item.total > 0 ? (item.completed / item.total) * 100 : 0;
          const resumeLabel =
            item.completed > 0
              ? `${item.completed} of ${item.total} matches`
              : "Ready to begin";

          return (
            <div
              key={item.seasonId}
              className="continue-watching__item"
              role="listitem"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <button
                type="button"
                className="continue-card"
                onClick={() => onSelectSeason(item.seasonId)}
                aria-label={`Continue watching ${item.tournament}, ${resumeLabel}`}
              >
                <div className="continue-card__poster">
                  <Poster
                    src={getPosterImagePath(item.seasonId)}
                    alt={`${item.tournament} poster`}
                    theme={item.theme}
                    decorative
                  />
                </div>
                <div className="continue-card__body">
                  <p className="continue-card__eyebrow">In progress</p>
                  <h3 className="continue-card__title">{item.tournament}</h3>
                  <p className="continue-card__tagline">{item.tagline}</p>
                  <div className="continue-card__progress">
                    <span>{resumeLabel}</span>
                    <div className="continue-card__progress-track">
                      <div
                        className="continue-card__progress-fill"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                  <span className="continue-card__cta">
                    Continue
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
