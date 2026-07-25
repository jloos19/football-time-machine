import type { MatchStage } from "./types";
import type { FifaMetadataSource } from "./fifa-types";

/** Curated FIFA URLs for France '98 Journey recovery targets and showcase listings. */
export type FifaRecoverySeed = {
  canonicalMatchId: string;
  url: string;
  title: string;
  tournament: string;
  tournamentYear: number;
  homeTeam: string;
  awayTeam: string;
  stage: MatchStage | string;
  durationSeconds?: number;
  fullMatchReplay: boolean;
  alternateLocaleUrls?: string[];
  metadataSource?: FifaMetadataSource;
  notes?: string;
};

export const FIFA_RECOVERY_SEEDS: FifaRecoverySeed[] = [
  {
    canonicalMatchId: "france-1998-c29",
    url: "https://www.fifa.com/en/watch/6rKfoYVxQEGwoZXyNFRLAh",
    title: "Argentina v Croatia | Group H | 1998 FIFA World Cup France™ | Full Match Replay",
    tournament: "1998 FIFA World Cup France™",
    tournamentYear: 1998,
    homeTeam: "Argentina",
    awayTeam: "Croatia",
    stage: "Group Stage",
    fullMatchReplay: true,
    metadataSource: "manual",
    notes: "Listed on FIFA+ 1998 full-match showcase",
  },
  {
    canonicalMatchId: "france-1998-c44",
    url: "https://www.fifa.com/en/watch/3I7eTkvmjuRfrOLymQHjU4",
    title: "Colombia v England | Group G | 1998 FIFA World Cup France™ | Full Match Replay",
    tournament: "1998 FIFA World Cup France™",
    tournamentYear: 1998,
    homeTeam: "Colombia",
    awayTeam: "England",
    stage: "Group Stage",
    fullMatchReplay: true,
    metadataSource: "manual",
    notes: "Listed on FIFA+ 1998 full-match showcase",
  },
  {
    canonicalMatchId: "france-1998-c52",
    url: "https://www.plus.fifa.com/en/content/nigeria-v-denmark-round-of-16-1998-fifa-world-cup-france-full-match-replay/37367a2f-8563-4058-b845-53d52106a55a",
    title: "Nigeria v Denmark | Round of 16 | 1998 FIFA World Cup France™ | Full Match Replay",
    tournament: "1998 FIFA World Cup France™",
    tournamentYear: 1998,
    homeTeam: "Nigeria",
    awayTeam: "Denmark",
    stage: "Round of 16",
    fullMatchReplay: true,
    metadataSource: "manual",
  },
  {
    canonicalMatchId: "france-1998-c53",
    url: "https://www.plus.fifa.com/en/content/germany-v-mexico-round-of-16-1998-fifa-world-cup-france-full-match-replay/e2fcd93a-07a7-418b-a3ad-a33a4992f874",
    title: "Germany v Mexico | Round of 16 | 1998 FIFA World Cup France™ | Full Match Replay",
    tournament: "1998 FIFA World Cup France™",
    tournamentYear: 1998,
    homeTeam: "Germany",
    awayTeam: "Mexico",
    stage: "Round of 16",
    fullMatchReplay: true,
    metadataSource: "manual",
  },
  {
    canonicalMatchId: "france-1998-c61",
    url: "https://www.fifa.com/en/watch/495Zo9RWtcADL0vvcw8AjL",
    title: "Brazil v Netherlands | Semi-finals | 1998 FIFA World Cup France™ | Full Match Replay",
    tournament: "1998 FIFA World Cup France™",
    tournamentYear: 1998,
    homeTeam: "Brazil",
    awayTeam: "Netherlands",
    stage: "Semi-final",
    durationSeconds: 8312,
    fullMatchReplay: true,
    metadataSource: "manual",
    notes: "Official FIFA+ full-match replay; proof-of-concept recovery target",
  },
  {
    canonicalMatchId: "france-1998-c63",
    url: "https://www.plus.fifa.com/en/content/netherlands-v-croatia-play-off-for-third-place-1998-fifa-world-cup-francetm-full-match-replay/eff5dbe0-9c56-43ae-b6d8-1cc5ef287872",
    title: "Netherlands v Croatia | Play-off for third place | 1998 FIFA World Cup France™ | Full Match Replay",
    tournament: "1998 FIFA World Cup France™",
    tournamentYear: 1998,
    homeTeam: "Netherlands",
    awayTeam: "Croatia",
    stage: "Third-place play-off",
    fullMatchReplay: true,
    metadataSource: "manual",
  },
];

/** Showcase-listed full matches without a resolved URL yet — discovery marks these manual-search-required. */
export const FIFA_SHOWCASE_UNRESOLVED: readonly {
  canonicalMatchId: string;
  label: string;
}[] = [
  { canonicalMatchId: "france-1998-c58", label: "Brazil v Denmark | Quarter-finals" },
  { canonicalMatchId: "france-1998-c59", label: "Netherlands v Argentina | Quarter-finals" },
  { canonicalMatchId: "france-1998-c60", label: "Germany v Croatia | Quarter-finals" },
];

/** Recovery targets with no FIFA full-match listing found in showcase or search. */
export const FIFA_MANUAL_SEARCH_REQUIRED: readonly {
  canonicalMatchId: string;
  label: string;
}[] = [
  { canonicalMatchId: "france-1998-c04", label: "Cameroon v Austria | Group B" },
  { canonicalMatchId: "france-1998-c32", label: "Brazil v Norway | Group A" },
  { canonicalMatchId: "france-1998-c42", label: "Germany v IR Iran | Group F" },
];

export const FIFA_1998_FULL_MATCH_SHOWCASE_URL =
  "https://www.plus.fifa.com/es/showcase/copa-mundial-de-la-fifa-francia-1998tm/41e5168b-19c1-4825-82b5-b52189ba81dd";

export const FIFA_SEARCH_DOMAINS = [
  "fifa.com",
  "www.fifa.com",
  "plus.fifa.com",
  "www.plus.fifa.com",
] as const;
