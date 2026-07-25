import {
  USA_1994_TEAM_NAMES,
  buildTeamJourneyMeta,
  resolveTeamJourneyMembership,
} from "@/lib/experiences/membership";

/**
 * USA 1994 Team Journeys — membership generated from canonical fixtures.
 */
export const USA_1994_TEAM_JOURNEYS = {
  tournamentId: "usa-1994" as const,
  kind: "team-journey" as const,
  type: "team" as const,
  label: "Follow a Team",
  status: "available" as const,
  get teams() {
    return buildTeamJourneyMeta("usa-1994", USA_1994_TEAM_NAMES).map((team) => ({
      team: team.teamName,
      teamId: team.teamId,
      title: team.title,
      canonicalMatchIds: resolveTeamJourneyMembership("usa-1994", team.teamName),
    }));
  },
};
