import { worldCupPosters } from "@/data/worldCupPosters";

/**
 * Umbrella category in top navigation. Eventually contains both men's and
 * women's World Cup collections.
 */
export const WORLD_CUPS_NAV_LABEL = "World Cups";

export type HomeCollectionId = "mens-world-cups" | "womens-world-cups";

export type HomeCollection = {
  id: HomeCollectionId;
  /** Section heading on the homepage (gender-specific). */
  heading: string;
  subtitle: string;
  /** Season / tournament ids shown in this collection shelf. */
  seasonIds: readonly string[];
};

/**
 * Homepage tournament collections. Only Men's World Cups is published today;
 * Women's World Cups can be added later without changing the nav umbrella.
 */
export const HOME_COLLECTIONS: readonly HomeCollection[] = [
  {
    id: "mens-world-cups",
    heading: "Men's World Cups",
    subtitle: "Six tournaments. Experienced forwards, one match at a time.",
    seasonIds: worldCupPosters.map((poster) => poster.seasonId),
  },
] as const;

/** Primary (currently only) homepage World Cup shelf. */
export const MENS_WORLD_CUPS_COLLECTION = HOME_COLLECTIONS.find(
  (collection) => collection.id === "mens-world-cups"
)!;

export function getHomeCollection(
  id: HomeCollectionId
): HomeCollection | undefined {
  return HOME_COLLECTIONS.find((collection) => collection.id === id);
}
