import {
  FRANCE_1998_TEAM_NAMES,
  buildTeamJourneyMeta,
  resolveTeamJourneyMembership,
} from "@/lib/experiences/membership";

/**
 * France 1998 Team Journeys — membership generated from canonical fixtures.
 */
export const FRANCE_1998_TEAM_JOURNEYS = {
  tournamentId: "france-1998" as const,
  kind: "team-journey" as const,
  type: "team" as const,
  label: "Follow a Team",
  status: "available" as const,
  get teams() {
    return buildTeamJourneyMeta("france-1998", FRANCE_1998_TEAM_NAMES).map(
      (team) => ({
        team: team.teamName,
        teamId: team.teamId,
        title: team.title,
        canonicalMatchIds: resolveTeamJourneyMembership(
          "france-1998",
          team.teamName
        ),
      })
    );
  },
};
