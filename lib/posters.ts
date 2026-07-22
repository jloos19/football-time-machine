const POSTER_IMAGE_PATHS: Record<string, string> = {
  "usa-1994": "/posters/usa-1994.webp",
  "france-1998": "/posters/france-1998.webp",
  "korea-japan-2002": "/posters/korea-japan-2002.webp",
  "germany-2006": "/posters/germany-2006.webp",
  "south-africa-2010": "/posters/south-africa-2010.webp",
  "brazil-2014": "/posters/brazil-2014.webp",
};

export function getPosterImagePath(seasonId: string): string {
  return POSTER_IMAGE_PATHS[seasonId] ?? "";
}
