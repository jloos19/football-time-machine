import { WORLD_CUP_MATCH_TOTAL } from "@/lib/progress";
import { getPosterImagePath } from "@/lib/posters";
import type { WorldCupPosterData } from "@/data/worldCupPosters";
import { Poster } from "@/components/Poster";

type WorldCupPosterProps = {
  poster: WorldCupPosterData;
  completed: number;
  onSelect: (seasonId: string) => void;
};

export function WorldCupPoster({ poster, completed, onSelect }: WorldCupPosterProps) {
  const isAvailable = poster.status === "available" || poster.status === "in-development";
  const progressPct = (completed / WORLD_CUP_MATCH_TOTAL) * 100;

  return (
    <button
      type="button"
      className={`world-cup-poster ${!isAvailable ? "world-cup-poster--locked" : ""}`}
      disabled={!isAvailable}
      onClick={() => onSelect(poster.seasonId)}
      aria-label={`${poster.tournament}, ${poster.country}, ${completed} of ${WORLD_CUP_MATCH_TOTAL} matches complete`}
    >
      <div className="world-cup-poster__frame">
        <Poster
          src={getPosterImagePath(poster.seasonId)}
          alt={`${poster.tournament} poster`}
          theme={poster.theme}
          decorative
        >
          <span className="world-cup-poster__year">{poster.year}</span>
        </Poster>
        <div className="world-cup-poster__meta">
          <span className="world-cup-poster__tournament">{poster.tournament}</span>
          <span className="world-cup-poster__country">{poster.country}</span>
          <div className="world-cup-poster__progress">
            <span>
              Progress · {completed}/{WORLD_CUP_MATCH_TOTAL} matches
            </span>
            <div className="world-cup-poster__progress-track">
              <div className="world-cup-poster__progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
