"use client";

import { useMemo, useState } from "react";
import type { ExperienceEpisode, TournamentExperience } from "@/lib/experiences";
import {
  EMPTY_EVERY_MATCH_FILTERS,
  filterEveryMatchEpisodes,
  type EveryMatchFilters,
  type WatchedFilter,
} from "@/lib/experiences/presentation";
import { MatchCard } from "./MatchCard";

export type EveryMatchMeta = {
  homeTeam: string;
  awayTeam: string;
  group?: string;
};

type EveryMatchViewProps = {
  experience: TournamentExperience;
  episodes: ExperienceEpisode[];
  completedCanonicalIds: ReadonlySet<string>;
  metaById: ReadonlyMap<string, EveryMatchMeta>;
  nextCanonicalId: string | null;
  isUnlocked: (index: number) => boolean;
  hasReplay: (episode: ExperienceEpisode) => boolean;
  onSelect: (episode: ExperienceEpisode) => void;
};

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function EveryMatchView({
  experience,
  episodes,
  completedCanonicalIds,
  metaById,
  nextCanonicalId,
  isUnlocked,
  hasReplay,
  onSelect,
}: EveryMatchViewProps) {
  const [filters, setFilters] = useState<EveryMatchFilters>(
    EMPTY_EVERY_MATCH_FILTERS
  );

  const stages = useMemo(
    () => uniqueSorted(episodes.map((ep) => ep.stage)),
    [episodes]
  );
  const groups = useMemo(
    () =>
      uniqueSorted(
        episodes.map((ep) => metaById.get(ep.canonicalMatchId)?.group ?? "")
      ),
    [episodes, metaById]
  );
  const teams = useMemo(() => {
    const names: string[] = [];
    for (const ep of episodes) {
      const meta = metaById.get(ep.canonicalMatchId);
      if (meta?.homeTeam) names.push(meta.homeTeam);
      if (meta?.awayTeam) names.push(meta.awayTeam);
    }
    return uniqueSorted(names);
  }, [episodes, metaById]);

  const filtered = useMemo(
    () =>
      filterEveryMatchEpisodes(
        episodes,
        filters,
        completedCanonicalIds,
        metaById
      ),
    [episodes, filters, completedCanonicalIds, metaById]
  );

  const started = experience.canonicalMatchIds.some((id) =>
    completedCanonicalIds.has(id)
  );

  function update<K extends keyof EveryMatchFilters>(
    key: K,
    value: EveryMatchFilters[K]
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.stage !== "all" ||
    filters.group !== "all" ||
    filters.team !== "all" ||
    filters.watched !== "all";

  return (
    <div className="every-match" data-testid="every-match-view">
      <div className="every-match__filters" role="search" aria-label="Filter matches">
        <label className="every-match__field every-match__field--search">
          <span className="visually-hidden">Search matches</span>
          <input
            type="search"
            placeholder="Search teams, stages, cities…"
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
          />
        </label>

        <label className="every-match__field">
          <span>Stage</span>
          <select
            value={filters.stage}
            onChange={(e) => update("stage", e.target.value)}
          >
            <option value="all">All stages</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>

        <label className="every-match__field">
          <span>Group</span>
          <select
            value={filters.group}
            onChange={(e) => update("group", e.target.value)}
            disabled={groups.length === 0}
          >
            <option value="all">All groups</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                Group {group}
              </option>
            ))}
          </select>
        </label>

        <label className="every-match__field">
          <span>Team</span>
          <select
            value={filters.team}
            onChange={(e) => update("team", e.target.value)}
          >
            <option value="all">All teams</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </label>

        <label className="every-match__field">
          <span>Watched</span>
          <select
            value={filters.watched}
            onChange={(e) => update("watched", e.target.value as WatchedFilter)}
          >
            <option value="all">All</option>
            <option value="watched">Watched</option>
            <option value="unwatched">Unwatched</option>
          </select>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            className="text-button every-match__reset"
            onClick={() => setFilters(EMPTY_EVERY_MATCH_FILTERS)}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="every-match__summary" aria-live="polite">
        Showing {filtered.length} of {episodes.length} matches
        {hasActiveFilters ? " (filtered)" : ""} · chronological order
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state" role="status">
          <strong>No matches found</strong>
          <p>Try a different search or clear the filters.</p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setFilters(EMPTY_EVERY_MATCH_FILTERS)}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="match-grid" role="list">
          {filtered.map((ep) => {
            const index = episodes.findIndex(
              (row) => row.canonicalMatchId === ep.canonicalMatchId
            );
            const unlocked = isUnlocked(index);
            const done = completedCanonicalIds.has(ep.canonicalMatchId);
            return (
              <div key={ep.canonicalMatchId} role="listitem">
                <MatchCard
                  episode={ep}
                  unlocked={unlocked}
                  done={done}
                  isNext={nextCanonicalId === ep.canonicalMatchId}
                  startedExperience={started}
                  hideKnockoutSpoilers
                  hasReplay={hasReplay(ep)}
                  onSelect={() => onSelect(ep)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
