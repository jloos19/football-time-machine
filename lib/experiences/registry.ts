import type { TournamentId } from "@/lib/archive/types";
import {
  FRANCE_1998_ESSENTIALS_FIXTURES,
  FRANCE_1998_TEAM_NAMES,
  KOREA_JAPAN_2002_ESSENTIALS_FIXTURES,
  KOREA_JAPAN_2002_TEAM_NAMES,
  USA_1994_ESSENTIALS_FIXTURES,
  USA_1994_TEAM_NAMES,
  buildTeamJourneyMeta,
  everyMatchMembership,
  resolveEssentialsMembership,
  resolveTeamJourneyMembership,
  storyMembership,
} from "./membership";
import type {
  ExperienceOption,
  TeamJourneyMeta,
  TournamentExperience,
} from "./types";

const STORY_COPY: Record<
  TournamentId,
  { title: string; shortDescription: string }
> = {
  "usa-1994": {
    title: "The Story",
    shortDescription: "A documentary path through USA ’94 — as it unfolded.",
  },
  "france-1998": {
    title: "The Story",
    shortDescription: "A documentary path through France ’98 — as it unfolded.",
  },
  "korea-japan-2002": {
    title: "The Story",
    shortDescription: "A documentary path through Korea/Japan ’02 — as it unfolded.",
  },
};

const ESSENTIALS_COPY: Record<
  TournamentId,
  { title: string; shortDescription: string }
> = {
  "usa-1994": {
    title: "The Essentials",
    shortDescription: "A director’s cut of USA ’94’s defining moments.",
  },
  "france-1998": {
    title: "The Essentials",
    shortDescription: "A director’s cut of France ’98’s defining moments.",
  },
  "korea-japan-2002": {
    title: "The Essentials",
    shortDescription: "A director’s cut of Korea/Japan ’02’s defining moments.",
  },
};

const COMPLETE_COPY: Record<
  TournamentId,
  { title: string; shortDescription: string }
> = {
  "usa-1994": {
    title: "Every Match",
    shortDescription: "The complete USA ’94 archive — every fixture, in order.",
  },
  "france-1998": {
    title: "Every Match",
    shortDescription: "The complete France ’98 archive — every fixture, in order.",
  },
  "korea-japan-2002": {
    title: "Every Match",
    shortDescription: "The complete Korea/Japan ’02 archive — every fixture, in order.",
  },
};

function essentialsIds(tournamentId: TournamentId): string[] {
  const fixtures =
    tournamentId === "usa-1994"
      ? USA_1994_ESSENTIALS_FIXTURES
      : tournamentId === "france-1998"
        ? FRANCE_1998_ESSENTIALS_FIXTURES
        : KOREA_JAPAN_2002_ESSENTIALS_FIXTURES;
  return resolveEssentialsMembership(tournamentId, fixtures);
}

function supportedTeams(tournamentId: TournamentId): TeamJourneyMeta[] {
  const names =
    tournamentId === "usa-1994"
      ? USA_1994_TEAM_NAMES
      : tournamentId === "france-1998"
        ? FRANCE_1998_TEAM_NAMES
        : KOREA_JAPAN_2002_TEAM_NAMES;
  return buildTeamJourneyMeta(tournamentId, names);
}

function buildStory(tournamentId: TournamentId): TournamentExperience {
  const copy = STORY_COPY[tournamentId];
  return {
    id: `${tournamentId}-story`,
    tournamentId,
    type: "story",
    title: copy.title,
    shortDescription: copy.shortDescription,
    canonicalMatchIds: storyMembership(tournamentId),
    unlockMode: "sequential",
  };
}

function buildEssentials(tournamentId: TournamentId): TournamentExperience {
  const copy = ESSENTIALS_COPY[tournamentId];
  return {
    id: `${tournamentId}-essentials`,
    tournamentId,
    type: "essentials",
    title: copy.title,
    shortDescription: copy.shortDescription,
    canonicalMatchIds: essentialsIds(tournamentId),
    unlockMode: "sequential",
  };
}

function buildComplete(tournamentId: TournamentId): TournamentExperience {
  const copy = COMPLETE_COPY[tournamentId];
  return {
    id: `${tournamentId}-every-match`,
    tournamentId,
    type: "complete",
    title: copy.title,
    shortDescription: copy.shortDescription,
    canonicalMatchIds: everyMatchMembership(tournamentId),
    unlockMode: "archive",
  };
}

function buildTeamExperience(
  tournamentId: TournamentId,
  team: TeamJourneyMeta
): TournamentExperience {
  return {
    id: `${tournamentId}-team-${team.teamId}`,
    tournamentId,
    type: "team",
    title: team.teamName,
    shortDescription:
      team.shortDescription ??
      `Follow ${team.teamName} through the tournament, one match at a time.`,
    canonicalMatchIds: resolveTeamJourneyMembership(tournamentId, team.teamName),
    teamId: team.teamId,
    unlockMode: "sequential",
  };
}

/** All playable experiences for a tournament (story, essentials, every-match, teams). */
export function getTournamentExperiences(
  tournamentId: TournamentId
): TournamentExperience[] {
  const teams = supportedTeams(tournamentId).map((team) =>
    buildTeamExperience(tournamentId, team)
  );
  return [
    buildStory(tournamentId),
    buildEssentials(tournamentId),
    buildComplete(tournamentId),
    ...teams,
  ];
}

export function getTournamentExperience(
  tournamentId: TournamentId,
  experienceId: string
): TournamentExperience | null {
  return (
    getTournamentExperiences(tournamentId).find((exp) => exp.id === experienceId) ??
    null
  );
}

export function getExperienceByRoute(
  tournamentId: TournamentId,
  slug: string,
  teamId?: string
): TournamentExperience | null {
  if (slug === "story") return buildStory(tournamentId);
  if (slug === "essentials") return buildEssentials(tournamentId);
  if (slug === "every-match") return buildComplete(tournamentId);
  if (slug === "team" && teamId) {
    const team = supportedTeams(tournamentId).find((t) => t.teamId === teamId);
    return team ? buildTeamExperience(tournamentId, team) : null;
  }
  return null;
}

/** Landing-page options (Follow a Team is a picker, not a single experience). */
export function getTournamentExperienceOptions(
  tournamentId: TournamentId
): ExperienceOption[] {
  const story = buildStory(tournamentId);
  const essentials = buildEssentials(tournamentId);
  const complete = buildComplete(tournamentId);
  return [
    {
      type: "story",
      slug: "story",
      title: story.title,
      shortDescription: story.shortDescription,
      experienceId: story.id,
    },
    {
      type: "essentials",
      slug: "essentials",
      title: essentials.title,
      shortDescription: essentials.shortDescription,
      experienceId: essentials.id,
    },
    {
      type: "team",
      slug: "team",
      title: "Follow a Team",
      shortDescription:
        "Live the tournament through one nation’s campaign.",
    },
    {
      type: "complete",
      slug: "every-match",
      title: complete.title,
      shortDescription: complete.shortDescription,
      experienceId: complete.id,
    },
  ];
}

export function getSupportedTeamJourneys(
  tournamentId: TournamentId
): TeamJourneyMeta[] {
  return supportedTeams(tournamentId);
}

export function experiencePath(
  tournamentId: TournamentId,
  slug: string,
  teamId?: string
): string {
  if (slug === "team" && teamId) {
    return `/tournaments/${tournamentId}/team/${teamId}`;
  }
  if (slug === "team") {
    return `/tournaments/${tournamentId}/team`;
  }
  return `/tournaments/${tournamentId}/${slug}`;
}

export function tournamentLandingPath(tournamentId: TournamentId): string {
  return `/tournaments/${tournamentId}`;
}

export function isSupportedTournamentId(value: string): value is TournamentId {
  return (
    value === "usa-1994" ||
    value === "france-1998" ||
    value === "korea-japan-2002"
  );
}
