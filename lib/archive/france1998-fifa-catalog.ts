import type { MatchStage } from "./types";

/**
 * Manually curated France 1998 FIFA full-match replay catalog.
 * URLs are browser-extracted exact fifa.com/en/watch links — do not alter.
 */
export type France1998FifaCatalogEntry = {
  title: string;
  teams: readonly [string, string];
  stage: MatchStage;
  group?: string;
  url: string;
};

export const FRANCE_1998_FIFA_REPLAYS = [
  // GROUP STAGE — 18
  {
    title: "Japan v Croatia",
    teams: ["Japan", "Croatia"],
    stage: "Group Stage",
    group: "H",
    url: "https://www.fifa.com/en/watch/4ue6x6cbkn45E3Sk6dn5HS",
  },
  {
    title: "Argentina v Croatia",
    teams: ["Argentina", "Croatia"],
    stage: "Group Stage",
    group: "H",
    url: "https://www.fifa.com/en/watch/6rKfoYVxQEGwoZXyNFRLAh",
  },
  {
    title: "Japan v Jamaica",
    teams: ["Japan", "Jamaica"],
    stage: "Group Stage",
    group: "H",
    url: "https://www.fifa.com/en/watch/3u4zQnKwvKKAH2kN0qWGO8",
  },
  {
    title: "Argentina v Jamaica",
    teams: ["Argentina", "Jamaica"],
    stage: "Group Stage",
    group: "H",
    url: "https://www.fifa.com/en/watch/2a9bZOvDxGRVdh7b6ERJtG",
  },
  {
    title: "Jamaica v Croatia",
    teams: ["Jamaica", "Croatia"],
    stage: "Group Stage",
    group: "H",
    url: "https://www.fifa.com/en/watch/3ZpiU8Tfa1OmV3EAlG6S3D",
  },
  {
    title: "Brazil v Norway",
    teams: ["Brazil", "Norway"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/5k0Xi6ils4gMkk5D0y43nl",
  },
  {
    title: "Brazil v Scotland",
    teams: ["Brazil", "Scotland"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/4RUVF7D8UD04p7QIGUe8H2",
  },
  {
    title: "Morocco v Norway",
    teams: ["Morocco", "Norway"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/59lNV8tJ1xPnOUGGvefNNx",
  },
  {
    title: "Chile v Cameroon",
    teams: ["Chile", "Cameroon"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/5aJQ3zCbizQpVKWJ4ATs2B",
  },
  {
    title: "Italy v Austria",
    teams: ["Italy", "Austria"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/1J2DpipotxHPO3fysAIZfY",
  },
  {
    title: "Italy v Cameroon",
    teams: ["Italy", "Cameroon"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/OnpgMwBE8IfvBhN4FD2ij",
  },
  {
    title: "Chile v Austria",
    teams: ["Chile", "Austria"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/16JV1hWTJ88rPHujtzQ19t",
  },
  {
    title: "Cameroon v Austria",
    teams: ["Cameroon", "Austria"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/2YGNRNLyRHPjB8WSJG87Az",
  },
  {
    title: "France v Denmark",
    teams: ["France", "Denmark"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/1wUVci179rFNW5g005r31j",
  },
  {
    title: "South Africa v Saudi Arabia",
    teams: ["South Africa", "Saudi Arabia"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/45eQVR6TSIw3y73arjAQ4D",
  },
  {
    title: "South Africa v Denmark",
    teams: ["South Africa", "Denmark"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/DjpLRvdqJC4oU44vOnx7n",
  },
  {
    title: "France v Saudi Arabia",
    teams: ["France", "Saudi Arabia"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/1mEQyorSBLOgTtFsIpxvgM",
  },
  {
    title: "Belgium v Mexico",
    teams: ["Belgium", "Mexico"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.fifa.com/en/watch/5Jl1o4mTJyaG2iQGC6h4H0",
  },
  // ROUND OF 16 — 8
  {
    title: "Italy v Norway",
    teams: ["Italy", "Norway"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/1DYHMnH9VqAxKNELNLZcEq",
  },
  {
    title: "Brazil v Chile",
    teams: ["Brazil", "Chile"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/6rBQuV3GbFJoBNDTfvVS3F",
  },
  {
    title: "Nigeria v Denmark",
    teams: ["Nigeria", "Denmark"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/6Km4DpzMKPVVqYgvr3gE8u",
  },
  {
    title: "France v Paraguay",
    teams: ["France", "Paraguay"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/3A0xomr21iD9hflEWfeURt",
  },
  {
    title: "Netherlands v Yugoslavia",
    teams: ["Netherlands", "Yugoslavia"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/2N01CI1tixOVzWFb4Rlxus",
  },
  {
    title: "Argentina v England",
    teams: ["Argentina", "England"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/3GI371qzcZMaWfckfvevpH",
  },
  {
    title: "Romania v Croatia",
    teams: ["Romania", "Croatia"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/3wjPh9efgiPyV8WwBIpLRi",
  },
  {
    title: "Germany v Mexico",
    teams: ["Germany", "Mexico"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/2UiXCqJptcMsVwDkTg4jAj",
  },
  // QUARTERFINALS — 4
  {
    title: "Netherlands v Argentina",
    teams: ["Netherlands", "Argentina"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/F2WJFEcD7KAeRZMjeBzlR",
  },
  {
    title: "Italy v France",
    teams: ["Italy", "France"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/d9cmdDTQ1cjI5qkgLmMXs",
  },
  {
    title: "Germany v Croatia",
    teams: ["Germany", "Croatia"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/GF61Ogtlj4589D7l2gDlC",
  },
  {
    title: "Brazil v Denmark",
    teams: ["Brazil", "Denmark"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/71qGDOrBb3Uaip7stHN5iv",
  },
  // SEMIFINALS — 2
  {
    title: "France v Croatia",
    teams: ["France", "Croatia"],
    stage: "Semi-final",
    url: "https://www.fifa.com/en/watch/5DNg9CqGKSxGMYKb5mFG0K",
  },
  {
    title: "Brazil v Netherlands",
    teams: ["Brazil", "Netherlands"],
    stage: "Semi-final",
    url: "https://www.fifa.com/en/watch/495Zo9RWtcADL0vvcw8AjL",
  },
  // THIRD-PLACE MATCH — 1
  {
    title: "Netherlands v Croatia",
    teams: ["Netherlands", "Croatia"],
    stage: "Third-place play-off",
    url: "https://www.fifa.com/en/watch/25dkYKAN7LWtFyzKQb3aRc",
  },
  // FINAL — 1
  {
    title: "Brazil v France",
    teams: ["Brazil", "France"],
    stage: "Final",
    url: "https://www.fifa.com/en/watch/8ZvjzOYODw13FFUp0D4Gv",
  },
] as const satisfies readonly France1998FifaCatalogEntry[];

/**
 * Official FIFA Collection matches that remain curated but are not Journey members.
 * Journey membership is independent of FIFA availability.
 */
export const FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS = [
  "france-1998-c04", // Cameroon vs Austria
  "france-1998-c18", // Chile vs Austria
  "france-1998-c37", // South Africa vs Denmark
  "france-1998-c46", // Argentina vs Jamaica
  "france-1998-c47", // Japan vs Croatia
] as const;

/** Non-FIFA Journey group-stage slots with verified Dailymotion full-match replays. */
export const FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS = [
  {
    canonicalMatchId: "france-1998-c09",
    url: "https://www.dailymotion.com/video/x9ptcza",
    reason:
      "Spain vs Nigeria — Group D Dailymotion full-match curated for Journey (FIFA catalog does not include this fixture).",
  },
  {
    canonicalMatchId: "france-1998-c15",
    url: "https://www.dailymotion.com/video/x9q8oca",
    reason:
      "Germany vs United States — Group F Dailymotion full-match curated for Journey (FIFA catalog does not include this fixture).",
  },
  {
    canonicalMatchId: "france-1998-c25",
    url: "https://www.dailymotion.com/video/x9puhqu",
    reason:
      "Spain vs Paraguay — Group D Dailymotion full-match curated for Journey rebalance.",
  },
  {
    canonicalMatchId: "france-1998-c08",
    url: "https://www.dailymotion.com/video/x9q0k0o",
    reason:
      "Netherlands vs Belgium — Group E Dailymotion full-match curated for Journey rebalance.",
  },
  {
    canonicalMatchId: "france-1998-c26",
    url: "https://www.dailymotion.com/video/x9qayg4",
    reason:
      "United States vs Iran — Group F Dailymotion full-match curated for Journey rebalance.",
  },
  {
    canonicalMatchId: "france-1998-c31",
    url: "https://www.dailymotion.com/video/x9qlig4",
    reason:
      "Romania vs England — Group G Dailymotion full-match curated for Journey rebalance.",
  },
  {
    canonicalMatchId: "france-1998-c44",
    url: "https://www.dailymotion.com/video/x9qpz3c",
    reason:
      "Colombia vs England — Group G Dailymotion full-match curated for Journey rebalance.",
  },
] as const;

/**
 * Remaining Complete Tournament sources (not in the Official FIFA Collection of 34).
 * Mapped by teams + stage — do not guess canonical IDs at call sites.
 */
export type France1998CompleteCoverageEntry = {
  title: string;
  teams: readonly [string, string];
  stage: MatchStage;
  group?: string;
  url: string;
  provider: "FIFA" | "Dailymotion";
};

export const FRANCE_1998_COMPLETE_COVERAGE_REPLAYS = [
  {
    title: "Scotland vs Norway",
    teams: ["Scotland", "Norway"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/6hoJwta10lKzNEgXGAiI7l",
    provider: "FIFA",
  },
  {
    title: "Brazil vs Morocco",
    teams: ["Brazil", "Morocco"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.dailymotion.com/video/x9p5w4q",
    provider: "Dailymotion",
  },
  {
    title: "Scotland vs Morocco",
    teams: ["Scotland", "Morocco"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.dailymotion.com/video/x9p6s2q",
    provider: "Dailymotion",
  },
  {
    title: "Italy vs Chile",
    teams: ["Italy", "Chile"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.dailymotion.com/video/x9pewiw",
    provider: "Dailymotion",
  },
  {
    title: "Saudi Arabia vs Denmark",
    teams: ["Saudi Arabia", "Denmark"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.dailymotion.com/video/x9pmgfi",
    provider: "Dailymotion",
  },
  {
    title: "France vs South Africa",
    teams: ["France", "South Africa"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.dailymotion.com/video/x9pmglg",
    provider: "Dailymotion",
  },
  {
    title: "Paraguay vs Bulgaria",
    teams: ["Paraguay", "Bulgaria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9ptcz8",
    provider: "Dailymotion",
  },
  {
    title: "Nigeria vs Bulgaria",
    teams: ["Nigeria", "Bulgaria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9puhqs",
    provider: "Dailymotion",
  },
  {
    title: "Spain vs Paraguay",
    teams: ["Spain", "Paraguay"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9puhqu",
    provider: "Dailymotion",
  },
  {
    title: "Spain vs Bulgaria",
    teams: ["Spain", "Bulgaria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9pwea6",
    provider: "Dailymotion",
  },
  {
    title: "Nigeria vs Paraguay",
    teams: ["Nigeria", "Paraguay"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9pwea8",
    provider: "Dailymotion",
  },
  {
    title: "South Korea vs Mexico",
    teams: ["South Korea", "Mexico"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9q0k0q",
    provider: "Dailymotion",
  },
  {
    title: "Netherlands vs Belgium",
    teams: ["Netherlands", "Belgium"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9q0k0o",
    provider: "Dailymotion",
  },
  {
    title: "Netherlands vs South Korea",
    teams: ["Netherlands", "South Korea"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.fifa.com/en/watch/4Edn6NBcKCsGaTMFIl3MWe",
    provider: "FIFA",
  },
  {
    title: "Belgium vs South Korea",
    teams: ["Belgium", "South Korea"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9q48bc",
    provider: "Dailymotion",
  },
  {
    title: "Netherlands vs Mexico",
    teams: ["Netherlands", "Mexico"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9q48be",
    provider: "Dailymotion",
  },
  {
    title: "Yugoslavia vs Iran",
    teams: ["Yugoslavia", "Iran"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9q8oc8",
    provider: "Dailymotion",
  },
  {
    title: "Germany vs Yugoslavia",
    teams: ["Germany", "Yugoslavia"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9qayg6",
    provider: "Dailymotion",
  },
  {
    title: "United States vs Iran",
    teams: ["United States", "Iran"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9qayg4",
    provider: "Dailymotion",
  },
  {
    title: "United States vs Yugoslavia",
    teams: ["United States", "Yugoslavia"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9qdcqa",
    provider: "Dailymotion",
  },
  {
    title: "Germany vs Iran",
    teams: ["Germany", "Iran"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9qdcq8",
    provider: "Dailymotion",
  },
  {
    title: "England vs Tunisia",
    teams: ["England", "Tunisia"],
    stage: "Group Stage",
    group: "G",
    url: "https://www.dailymotion.com/video/x9qk9a2",
    provider: "Dailymotion",
  },
  {
    title: "Romania vs Colombia",
    teams: ["Romania", "Colombia"],
    stage: "Group Stage",
    group: "G",
    url: "https://www.dailymotion.com/video/x9qk9a0",
    provider: "Dailymotion",
  },
  {
    title: "Colombia vs Tunisia",
    teams: ["Colombia", "Tunisia"],
    stage: "Group Stage",
    group: "G",
    url: "https://www.dailymotion.com/video/x9qlig2",
    provider: "Dailymotion",
  },
  {
    title: "Romania vs England",
    teams: ["Romania", "England"],
    stage: "Group Stage",
    group: "G",
    url: "https://www.dailymotion.com/video/x9qlig4",
    provider: "Dailymotion",
  },
  {
    title: "Colombia vs England",
    teams: ["Colombia", "England"],
    stage: "Group Stage",
    group: "G",
    url: "https://www.dailymotion.com/video/x9qpz3c",
    provider: "Dailymotion",
  },
  {
    title: "Romania vs Tunisia",
    teams: ["Romania", "Tunisia"],
    stage: "Group Stage",
    group: "G",
    url: "https://www.fifa.com/en/watch/xlvUXa7KL0L87197omqDL",
    provider: "FIFA",
  },
  {
    title: "Argentina vs Japan",
    teams: ["Argentina", "Japan"],
    stage: "Group Stage",
    group: "H",
    url: "https://www.dailymotion.com/video/x9quitw",
    provider: "Dailymotion",
  },
] as const satisfies readonly France1998CompleteCoverageEntry[];

/**
 * Former Journey Dailymotion sources retained on Complete Tournament matches
 * but marked ineligible for production selection.
 */
export const FRANCE_1998_RETIRED_JOURNEY_DAILYMOTION_SOURCES = [
  {
    canonicalMatchId: "france-1998-c03",
    url: "https://www.dailymotion.com/video/x9pq5bc",
    status: "dead" as const,
    reason: "Dailymotion replay deleted; ineligible for production.",
  },
  {
    canonicalMatchId: "france-1998-c05",
    url: "https://www.dailymotion.com/video/x9pq5e8",
    status: "wrong-match" as const,
    reason: "Dailymotion replay is the incorrect match; ineligible for production.",
  },
] as const;

export const FRANCE_1998_FIFA_VERIFIED_BY = "browser-extracted-manual-curation";
export const FRANCE_1998_DAILYMOTION_VERIFIED_BY = "manual-curation";
