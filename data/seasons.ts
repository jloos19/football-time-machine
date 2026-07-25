import usa1994 from "./usa1994.json";
import france1998 from "./france1998.json";
import koreaJapan2002 from "./koreaJapan2002.json";
import { attachReplay } from "@/lib/replays";

// Replay URLs are resolved exclusively from lib/replays/* — tournament JSON must
// not carry direct replay, replayUrl, videoUrl, watchUrl, or embedUrl fields.

import type { ReplayProvider } from "@/lib/replays/types";

export type ReplayAlternate = {
  provider: ReplayProvider;
  label: string;
  url: string;
  continuationUrl?: string;
};

export type Replay = {
  url: string;
  source?: string;
  provider?: ReplayProvider;
  /** Internal policy flag — e.g. "FIFA" when an official full-match replay exists. */
  preferredSource?: ReplayProvider;
  runtime?: string;
  continuationUrl?: string;
  alternates?: ReplayAlternate[];
} | null;

export type ImpactPlayer = {
  name: string;
  team: string;
  role: string;
  summary: string;
};

export type PostMatchKeyMoment = {
  minute?: string;
  title: string;
  description?: string;
};

export type PostMatch = {
  score: string;
  halftime: string;
  goal: string;
  keyEvents: string[];
  /** Preferred narrative report when present. */
  matchReport?: string;
  /** Structured timeline; preferred over parsing `goal` when present. */
  keyMoments?: PostMatchKeyMoment[];
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
  /** One-line atmospheric scene setter (spoiler-free). */
  scene?: string;
  world?: string;
  tournament?: string;
  intro?: string;
  replay: Replay;
  postMatch: PostMatch;
  status?: string;
};

export type TournamentWhyItMattersPoint = {
  /** Short editorial label — spoiler-free historical framing. */
  label: string;
  /** One concise sentence of context. */
  text: string;
};

export type TournamentIntroContent = {
  eyebrow: string;
  dateRange: string;
  tagline: string;
  body: string[];
  /** Three spoiler-free context points for the tournament landing. */
  whyItMatters: TournamentWhyItMattersPoint[];
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
    episodes: (usa1994 as Omit<Episode, "replay">[]).map(attachReplay),
    intro: {
      eyebrow: "WORLD CUP JOURNEY",
      dateRange: "June 17 – July 17, 1994",
      tagline: "A nation prepares to host the world’s game.",
      body: [
        "For the first time, football’s greatest tournament arrives in the United States. Twenty-four nations come carrying expectation, pressure and possibility. Some are established powers. Others are about to introduce themselves to the world.",
        "No one knows which story will define the summer.",
      ],
      whyItMatters: [
        {
          label: "A first for America",
          text: "The World Cup arrives on United States soil for the first time, asking a new sporting culture to host the world’s game.",
        },
        {
          label: "Twenty-four nations",
          text: "Established powers share the stage with sides still introducing themselves — and no script is guaranteed.",
        },
        {
          label: "A summer without certainty",
          text: "From the opening whistle, the tournament belongs to whoever can remake expectation under American floodlights.",
        },
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
    tagline: "Football returns home.",
    theme: "france98",
    status: "available",
    episodes: (france1998 as Omit<Episode, "replay">[]).map(attachReplay),
    intro: {
      eyebrow: "WORLD CUP JOURNEY",
      dateRange: "June 10 – July 12, 1998",
      tagline: "Football returns home.",
      body: [
        "Sixty-eight years after hosting the third World Cup, France welcomes the tournament back to Europe.",
        "The competition expands to thirty-two nations for the first time. Established powers arrive expecting glory. Emerging generations are ready to change football forever.",
        "No one knows which story will define the summer.",
      ],
      whyItMatters: [
        {
          label: "Europe welcomes it back",
          text: "Sixty-eight years after first hosting, France brings the World Cup home to a continent ready to watch it expand.",
        },
        {
          label: "Thirty-two nations",
          text: "The field grows wider than ever — more voices, more paths, and a longer road from opening day to July.",
        },
        {
          label: "A generation arrives",
          text: "Established powers expect the summer to belong to them. A rising generation arrives prepared to rewrite that assumption.",
        },
      ],
      ctaBegin: "Begin Journey",
      ctaContinue: "Continue Journey",
      backLabel: "Back to World Cups",
    },
  },
  {
    id: "korea-japan-2002",
    year: 2002,
    name: "Korea/Japan 2002",
    host: "Korea / Japan",
    tagline: "The World Cup goes east.",
    theme: "korea2002",
    status: "available",
    episodes: (koreaJapan2002 as Omit<Episode, "replay">[]).map(attachReplay),
    intro: {
      eyebrow: "WORLD CUP JOURNEY",
      dateRange: "May 31 – June 30, 2002",
      tagline: "The World Cup goes east.",
      body: [
        "For the first time, the World Cup is staged in Asia — co-hosted by Korea Republic and Japan across a month of new stadiums and unfamiliar nights.",
        "Defending champions arrive with expectation. Debutants arrive with belief. Host nations carry a continent’s attention.",
        "No one knows which story will define the summer.",
      ],
      whyItMatters: [
        {
          label: "Asia’s first World Cup",
          text: "The tournament leaves Europe and the Americas for a co-hosted stage built across two countries.",
        },
        {
          label: "Hosts under the lights",
          text: "Korea Republic and Japan open their doors with home expectation and the chance to write new national chapters.",
        },
        {
          label: "Favourites and shocks",
          text: "Established powers expect control. The opening nights of 2002 suggest the tournament will refuse a simple script.",
        },
      ],
      ctaBegin: "Begin Journey",
      ctaContinue: "Continue Journey",
      backLabel: "Back to World Cups",
    },
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
