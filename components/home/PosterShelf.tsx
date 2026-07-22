"use client";

import { useEffect, useState } from "react";
import { worldCupPosters } from "@/data/worldCupPosters";
import { readProgress } from "@/lib/progress";
import { WorldCupPoster } from "./WorldCupPoster";

type PosterShelfProps = {
  onSelectSeason: (seasonId: string) => void;
};

export function PosterShelf({ onSelectSeason }: PosterShelfProps) {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const next: Record<string, number> = {};
    worldCupPosters.forEach((poster) => {
      next[poster.seasonId] = readProgress(poster.seasonId);
    });
    setProgress(next);
  }, []);

  return (
    <section className="poster-shelf" id="archive" aria-labelledby="poster-shelf-title">
      <header className="poster-shelf__header">
        <p className="poster-shelf__eyebrow">Featured Collection</p>
        <h2 id="poster-shelf-title" className="poster-shelf__title">
          World Cups
        </h2>
        <p className="poster-shelf__subtitle">
          Six tournaments. Experienced forwards, one match at a time.
        </p>
      </header>

      <div className="poster-shelf__track" role="list">
        {worldCupPosters.map((poster, index) => (
          <div
            key={poster.seasonId}
            className="poster-shelf__item"
            role="listitem"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <WorldCupPoster
              poster={poster}
              completed={progress[poster.seasonId] ?? 0}
              onSelect={onSelectSeason}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
