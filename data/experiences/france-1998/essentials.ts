import {
  FRANCE_1998_ESSENTIALS_FIXTURES,
  resolveEssentialsMembership,
} from "@/lib/experiences/membership";

/**
 * France 1998 Essentials — 18 defining matches (includes third-place).
 */
export const FRANCE_1998_ESSENTIALS = {
  tournamentId: "france-1998" as const,
  kind: "essential" as const,
  type: "essentials" as const,
  label: "The Essentials",
  status: "available" as const,
  fixtures: FRANCE_1998_ESSENTIALS_FIXTURES,
  get canonicalMatchIds() {
    return resolveEssentialsMembership(
      "france-1998",
      FRANCE_1998_ESSENTIALS_FIXTURES
    );
  },
};
