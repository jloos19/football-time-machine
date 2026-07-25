import { getPosterImagePath } from "@/lib/posters";
import type { WorldCupPosterData } from "@/data/worldCupPosters";
import { Poster } from "@/components/Poster";

type WorldCupPosterProps = {
  poster: WorldCupPosterData;
  completed: number;
  matchTotal: number;
  onSelect: (seasonId: string) => void;
};

export function WorldCupPoster({ poster, completed, matchTotal, onSelect }: WorldCupPosterProps) {
  const isAvailable = poster.status === "available" || poster.status === "in-development";
  const progressPct = matchTotal > 0 ? (completed / matchTotal) * 100 : 0;
  const showProgress = isAvailable && matchTotal > 0;
  const progressLabel = showProgress
    ? `${completed} of ${matchTotal} matches`
    : null;

  const ariaLabel = !isAvailable
    ? `${poster.tournament}, ${poster.tagline}, Coming Soon`
    : showProgress
      ? `${poster.tournament}, ${poster.tagline}, ${progressLabel}`
      : `${poster.tournament}, ${poster.tagline}`;

  return (
    <button
      type="button"
      className={`world-cup-poster ${!isAvailable ? "world-cup-poster--locked" : ""}`}
      disabled={!isAvailable}
      onClick={() => onSelect(poster.seasonId)}
      aria-label={ariaLabel}
    >
      <div className="world-cup-poster__frame">
        <div className="world-cup-poster__art">
          <Poster
            src={getPosterImagePath(poster.seasonId)}
            alt={`${poster.tournament} poster`}
            theme={poster.theme}
            decorative
          >
            <span className="world-cup-poster__year">{poster.year}</span>
          </Poster>
          {isAvailable ? (
            <span className="world-cup-poster__explore" aria-hidden="true">
              Explore Tournament →
            </span>
          ) : (
            <span className="world-cup-poster__soon-badge" aria-hidden="true">
              Coming Soon
            </span>
          )}
        </div>
        <div className="world-cup-poster__meta">
          <span className="world-cup-poster__tournament">{poster.tournament}</span>
          <span className="world-cup-poster__tagline">{poster.tagline}</span>
          <div className="world-cup-poster__status">
            {showProgress ? (
              <div className="world-cup-poster__progress">
                <span>{progressLabel}</span>
                <div
                  className="world-cup-poster__progress-track"
                  aria-hidden="true"
                >
                  <div
                    className="world-cup-poster__progress-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="world-cup-poster__coming-soon">Coming Soon</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
