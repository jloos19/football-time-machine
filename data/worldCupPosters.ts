import { Season, seasons } from "./seasons";

export type PosterTheme =
  | "usa94"
  | "france98"
  | "korea2002"
  | "germany2006"
  | "sa2010"
  | "brazil2014";

export type WorldCupPosterData = {
  seasonId: string;
  tournament: string;
  country: string;
  year: number;
  theme: PosterTheme;
  status: Season["status"];
};

const POSTER_ORDER = [
  "usa-1994",
  "france-1998",
  "korea-japan-2002",
  "germany-2006",
  "south-africa-2010",
  "brazil-2014",
] as const;

const POSTER_THEMES: Record<string, PosterTheme> = {
  "usa-1994": "usa94",
  "france-1998": "france98",
  "korea-japan-2002": "korea2002",
  "germany-2006": "germany2006",
  "south-africa-2010": "sa2010",
  "brazil-2014": "brazil2014",
};

export const worldCupPosters: WorldCupPosterData[] = POSTER_ORDER.map((id) => {
  const season = seasons.find((s) => s.id === id)!;
  return {
    seasonId: season.id,
    tournament: season.name,
    country: season.host,
    year: season.year,
    theme: POSTER_THEMES[id],
    status: season.status,
  };
});
