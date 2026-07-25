import {
  KOREA_JAPAN_2002_TEAM_NAMES,
  buildTeamJourneyMeta,
  resolveTeamJourneyMembership,
} from "@/lib/experiences/membership";

/**
 * Korea/Japan 2002 Team Journeys — membership generated from canonical fixtures.
 */
export const KOREA_JAPAN_2002_TEAM_JOURNEYS = {
  tournamentId: "korea-japan-2002" as const,
  kind: "team-journey" as const,
  type: "team" as const,
  label: "Follow a Team",
  status: "available" as const,
  get teams() {
    return buildTeamJourneyMeta(
      "korea-japan-2002",
      KOREA_JAPAN_2002_TEAM_NAMES
    ).map((team) => ({
      team: team.teamName,
      teamId: team.teamId,
      title: team.title,
      canonicalMatchIds: resolveTeamJourneyMembership(
        "korea-japan-2002",
        team.teamName
      ),
    }));
  },
};
