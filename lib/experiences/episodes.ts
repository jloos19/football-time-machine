import { seasons, type Episode, type PostMatch } from "@/data/seasons";
import {
  getCanonicalArchive,
  getCanonicalMatch,
  matchLabel,
} from "@/lib/archive";
import type { CanonicalMatch, TournamentId } from "@/lib/archive/types";
import {
  getCanonicalMatchEditorial,
  type CanonicalMatchEditorial,
} from "@/lib/editorial";
import { projectPostMatch } from "@/lib/editorial/project";
import { resolveReplay } from "@/lib/replays";
import type { TournamentExperience } from "./types";

export type ExperienceEpisode = Episode & {
  canonicalMatchId: string;
};

/** Experience-only framing from Story season JSON (titles / legacy fields). */
function storyFramingByCanonicalId(
  tournamentId: TournamentId
): Map<string, Episode> {
  const season = seasons.find((s) => s.id === tournamentId);
  const map = new Map<string, Episode>();
  if (!season) return map;

  const archive = getCanonicalArchive(tournamentId);
  const byEpisodeId = new Map(
    archive
      .filter((m) => m.editorial?.journeyEpisodeId)
      .map((m) => [m.editorial!.journeyEpisodeId!, m])
  );

  for (const episode of season.episodes) {
    const match = byEpisodeId.get(episode.id);
    if (match) {
      map.set(match.canonicalMatchId, episode);
    }
  }
  return map;
}

function formatCity(venue: string): string {
  const parts = venue.split(",").map((p) => p.trim());
  return parts[0] || venue;
}

function formatDate(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function defaultTitle(
  experience: TournamentExperience,
  match: CanonicalMatch,
  framing: Episode | undefined,
  index: number
): string {
  if (experience.type === "story" && framing?.title) return framing.title;
  if (experience.type === "essentials" && framing?.title) return framing.title;
  if (experience.type === "complete") {
    return `Match ${String(index + 1).padStart(2, "0")}`;
  }
  return matchLabel(match);
}

function episodeFromCanonical(
  match: CanonicalMatch,
  editorial: CanonicalMatchEditorial,
  experience: TournamentExperience,
  framing: Episode | undefined,
  index: number
): ExperienceEpisode {
  const postMatch = projectPostMatch(editorial) as PostMatch;
  return {
    id:
      experience.type === "story"
        ? (match.editorial?.journeyEpisodeId ?? match.canonicalMatchId)
        : match.canonicalMatchId,
    tournamentId: match.tournamentId,
    canonicalMatchId: match.canonicalMatchId,
    n: index + 1,
    title: defaultTitle(experience, match, framing, index),
    match: matchLabel(match),
    date: framing?.date || formatDate(match.date),
    city: framing?.city || formatCity(match.venue),
    stage: match.stage,
    scene: editorial.preMatch.sceneSetter,
    world: editorial.preMatch.aroundTheWorld,
    tournament: editorial.preMatch.inTheTournament,
    intro: editorial.preMatch.whyItMatters,
    replay: resolveReplay(match),
    postMatch,
  };
}

/**
 * Defensive UI-only fallback. Production validation fails if any canonical
 * match relies on this path.
 */
function minimalEpisodeFromMatch(
  match: CanonicalMatch,
  index: number
): ExperienceEpisode {
  return {
    id: match.canonicalMatchId,
    tournamentId: match.tournamentId,
    canonicalMatchId: match.canonicalMatchId,
    n: index + 1,
    title: matchLabel(match),
    match: matchLabel(match),
    date: formatDate(match.date),
    city: formatCity(match.venue),
    stage: match.stage,
    replay: resolveReplay(match),
    postMatch: null,
  };
}

/**
 * Project an experience onto playable episodes.
 * Core pre/post editorial always resolves by canonicalMatchId.
 * Experiences may supply framing (chapter/moment titles) only.
 */
export function resolveExperienceEpisodes(
  experience: TournamentExperience
): ExperienceEpisode[] {
  const tournamentId = experience.tournamentId;
  const byId = new Map(
    getCanonicalArchive(tournamentId).map((m) => [m.canonicalMatchId, m])
  );
  const framing = storyFramingByCanonicalId(tournamentId);

  return experience.canonicalMatchIds.map((canonicalMatchId, index) => {
    const match =
      byId.get(canonicalMatchId) ??
      getCanonicalMatch(tournamentId, canonicalMatchId);
    if (!match) {
      throw new Error(
        `Missing canonical match ${canonicalMatchId} in ${experience.id}`
      );
    }
    const editorial = getCanonicalMatchEditorial(canonicalMatchId);
    if (!editorial) {
      return minimalEpisodeFromMatch(match, index);
    }
    return episodeFromCanonical(
      match,
      editorial,
      experience,
      framing.get(canonicalMatchId),
      index
    );
  });
}

/** True when an episode is using the defensive empty fallback. */
export function isProductionEditorialFallback(
  episode: ExperienceEpisode
): boolean {
  return (
    !episode.world ||
    !episode.tournament ||
    !episode.intro ||
    !episode.postMatch
  );
}
