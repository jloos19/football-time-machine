"use client";

import { useEffect, useRef, useState } from "react";
import { worldCupPosters } from "@/data/worldCupPosters";
import {
  MENS_WORLD_CUPS_COLLECTION,
  MENS_WORLD_CUPS_SECTION_ID,
} from "@/lib/home";
import { getSeasonMatchTotal, readStoryProgress } from "@/lib/progress";
import { isSupportedTournamentId } from "@/lib/experiences";
import { WorldCupPoster } from "./WorldCupPoster";

type PosterShelfProps = {
  onSelectSeason: (seasonId: string) => void;
  progressRevision?: number;
};

type ProgressState = Record<string, { completed: number; total: number }>;

function initialProgress(): ProgressState {
  const next: ProgressState = {};
  for (const poster of worldCupPosters) {
    next[poster.seasonId] = {
      completed: 0,
      total: getSeasonMatchTotal(poster.seasonId),
    };
  }
  return next;
}

export function PosterShelf({ onSelectSeason, progressRevision = 0 }: PosterShelfProps) {
  const [progress, setProgress] = useState<ProgressState>(initialProgress);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const next: ProgressState = {};
    for (const poster of worldCupPosters) {
      if (isSupportedTournamentId(poster.seasonId)) {
        next[poster.seasonId] = readStoryProgress(poster.seasonId);
      } else {
        next[poster.seasonId] = {
          completed: 0,
          total: getSeasonMatchTotal(poster.seasonId),
        };
      }
    }
    setProgress(next);
  }, [progressRevision]);

  function scrollTrack(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.min(360, track.clientWidth * 0.7);
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  const collection = MENS_WORLD_CUPS_COLLECTION;
  const posters = collection.seasonIds
    .map((seasonId) => worldCupPosters.find((poster) => poster.seasonId === seasonId))
    .filter((poster): poster is (typeof worldCupPosters)[number] => Boolean(poster));

  return (
    <section
      className="poster-shelf"
      id={MENS_WORLD_CUPS_SECTION_ID}
      aria-labelledby="poster-shelf-title"
      data-collection-id={collection.id}
    >
      <header className="poster-shelf__header">
        <h2 id="poster-shelf-title" className="poster-shelf__title">
          {collection.heading}
        </h2>
        <p className="poster-shelf__subtitle">{collection.subtitle}</p>
      </header>

      <div className="poster-shelf__gallery">
        <button
          type="button"
          className="poster-shelf__scroll poster-shelf__scroll--prev"
          aria-label={`Scroll ${collection.heading} left`}
          onClick={() => scrollTrack(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div
          ref={trackRef}
          className="poster-shelf__track"
          role="list"
          tabIndex={0}
          aria-label={collection.heading}
        >
          {posters.map((poster, index) => {
            const state = progress[poster.seasonId] ?? {
              completed: 0,
              total: getSeasonMatchTotal(poster.seasonId),
            };
            return (
              <div
                key={poster.seasonId}
                className="poster-shelf__item"
                role="listitem"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <WorldCupPoster
                  poster={poster}
                  completed={state.completed}
                  matchTotal={state.total}
                  onSelect={onSelectSeason}
                />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="poster-shelf__scroll poster-shelf__scroll--next"
          aria-label={`Scroll ${collection.heading} right`}
          onClick={() => scrollTrack(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
