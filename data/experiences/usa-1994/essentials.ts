import {
  USA_1994_ESSENTIALS_FIXTURES,
  resolveEssentialsMembership,
} from "@/lib/experiences/membership";

/**
 * USA 1994 Essentials — 16 defining matches.
 * Membership is resolved from canonical fixtures (teams + stage), then sorted chronologically.
 */
export const USA_1994_ESSENTIALS = {
  tournamentId: "usa-1994" as const,
  kind: "essential" as const,
  type: "essentials" as const,
  label: "The Essentials",
  status: "available" as const,
  fixtures: USA_1994_ESSENTIALS_FIXTURES,
  get canonicalMatchIds() {
    return resolveEssentialsMembership("usa-1994", USA_1994_ESSENTIALS_FIXTURES);
  },
};
