import usa1994 from "./usa1994.json";
import france1998 from "./france1998.json";

export type Replay = {
  url: string;
  source?: string;
  runtime?: string;
  continuationUrl?: string;
} | null;

export type ImpactPlayer = {
  name: string;
  team: string;
  role: string;
  summary: string;
};

export type PostMatch = {
  score: string;
  halftime: string;
  goal: string;
  keyEvents: string[];
  impactPlayers: ImpactPlayer[];
  sourceNote?: string;
} | null;

export type Episode = {
  id: string;
  tournamentId: string;
  n: number;
  title: string;
  match: string;
  date: string;
  city: string;
  stage: string;
  world?: string;
  tournament?: string;
  intro?: string;
  replay: Replay;
  postMatch: PostMatch;
  status?: string;
};

export type TournamentIntroContent = {
  eyebrow: string;
  dateRange: string;
  tagline: string;
  body: string[];
  ctaBegin: string;
  ctaContinue: string;
  backLabel: string;
};

export type Season = {
  id: string;
  year: number;
  name: string;
  host: string;
  tagline: string;
  theme: "usa94" | "france98" | "korea2002" | "germany2006" | "sa2010" | "brazil2014";
  status: "available" | "in-development" | "coming-soon";
  episodes: Episode[];
  intro?: TournamentIntroContent;
};

export const seasons: Season[] = [
  {
    id: "usa-1994",
    year: 1994,
    name: "USA ’94",
    host: "United States",
    tagline: "The tournament that changed soccer in America.",
    theme: "usa94",
    status: "available",
    episodes: usa1994 as Episode[],
    intro: {
      eyebrow: "WORLD CUP JOURNEY",
      dateRange: "June 17 – July 17, 1994",
      tagline: "A nation prepares to host the world’s game.",
      body: [
        "For the first time, football’s greatest tournament arrives in the United States. Twenty-four nations come carrying expectation, pressure and possibility. Some are established powers. Others are about to introduce themselves to the world.",
        "No one knows which story will define the summer.",
      ],
      ctaBegin: "Begin Journey",
      ctaContinue: "Continue Journey",
      backLabel: "Back to World Cups",
    },
  },
  {
    id: "france-1998",
    year: 1998,
    name: "France ’98",
    host: "France",
    tagline: "A new generation arrives.",
    theme: "france98",
    status: "in-development",
    episodes: france1998 as Episode[],
  },
  {
    id: "korea-japan-2002",
    year: 2002,
    name: "Korea/Japan 2002",
    host: "Korea / Japan",
    tagline: "The World Cup goes east.",
    theme: "korea2002",
    status: "coming-soon",
    episodes: [],
  },
  {
    id: "germany-2006",
    year: 2006,
    name: "Germany 2006",
    host: "Germany",
    tagline: "A summer fairy tale.",
    theme: "germany2006",
    status: "coming-soon",
    episodes: [],
  },
  {
    id: "south-africa-2010",
    year: 2010,
    name: "South Africa 2010",
    host: "South Africa",
    tagline: "The first World Cup on African soil.",
    theme: "sa2010",
    status: "coming-soon",
    episodes: [],
  },
  {
    id: "brazil-2014",
    year: 2014,
    name: "Brazil 2014",
    host: "Brazil",
    tagline: "All in one rhythm.",
    theme: "brazil2014",
    status: "coming-soon",
    episodes: [],
  },
];
