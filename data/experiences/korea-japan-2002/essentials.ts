import {
  KOREA_JAPAN_2002_ESSENTIALS_FIXTURES,
  resolveEssentialsMembership,
} from "@/lib/experiences/membership";

/**
 * Korea/Japan 2002 Essentials — 18 defining matches (includes third-place).
 * Fixtures: France-Senegal, Brazil-Turkey, USA-Portugal, Argentina-England,
 * Sweden-Argentina, Portugal-Korea Republic, Mexico-Italy, Japan-Russia,
 * Mexico-USA R16, Korea Republic-Italy, England-Brazil, Germany-USA,
 * Spain-Korea Republic, Senegal-Turkey, Germany-Korea Republic,
 * Brazil-Turkey SF, Korea Republic-Turkey 3rd, Germany-Brazil Final.
 */
export const KOREA_JAPAN_2002_ESSENTIALS = {
  tournamentId: "korea-japan-2002" as const,
  kind: "essential" as const,
  type: "essentials" as const,
  label: "The Essentials",
  status: "available" as const,
  fixtures: KOREA_JAPAN_2002_ESSENTIALS_FIXTURES,
  get canonicalMatchIds() {
    return resolveEssentialsMembership(
      "korea-japan-2002",
      KOREA_JAPAN_2002_ESSENTIALS_FIXTURES
    );
  },
};
