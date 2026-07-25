import type { MatchStage } from "./types";

/**
 * Manually curated USA 1994 Complete Tournament replay catalog.
 * URLs are exact supplied fifa.com/en/watch and dailymotion.com/video links — do not alter.
 */
export type Usa1994ReplayCatalogEntry = {
  title: string;
  teams: readonly [string, string];
  stage: MatchStage;
  group?: string;
  url: string;
  provider: "FIFA" | "Dailymotion";
};

export const USA_1994_FIFA_VERIFIED_BY = "browser-extracted-manual-curation";
export const USA_1994_DAILYMOTION_VERIFIED_BY = "manual-curation";

export const USA_1994_REPLAY_CATALOG = [
  // GROUP A — 6
  {
    title: "Romania vs Switzerland",
    teams: ["Romania", "Switzerland"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/5G6LB8E8y94HjYQP5rl7oz",
    provider: "FIFA",
  },
  {
    title: "Switzerland vs Colombia",
    teams: ["Switzerland", "Colombia"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/5n7IZztj45j4FBmRkHp5QM",
    provider: "FIFA",
  },
  {
    title: "United States vs Romania",
    teams: ["United States", "Romania"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/4kDG1XZUlAC9uz6l7hltLb",
    provider: "FIFA",
  },
  {
    title: "United States vs Switzerland",
    teams: ["United States", "Switzerland"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.fifa.com/en/watch/4e1xQjsgo8jG2J9NzAlfoq",
    provider: "FIFA",
  },
  {
    title: "Colombia vs Romania",
    teams: ["Colombia", "Romania"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.dailymotion.com/video/x9j9oi0",
    provider: "Dailymotion",
  },
  {
    title: "United States vs Colombia",
    teams: ["United States", "Colombia"],
    stage: "Group Stage",
    group: "A",
    url: "https://www.dailymotion.com/video/x9ja742",
    provider: "Dailymotion",
  },

  // GROUP B — 6
  {
    title: "Russia vs Cameroon",
    teams: ["Russia", "Cameroon"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/6QQxdSzdcCZ0k44SMPA0LM",
    provider: "FIFA",
  },
  {
    title: "Sweden vs Russia",
    teams: ["Sweden", "Russia"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/3Csb7zXorYyfDLLE47T42c",
    provider: "FIFA",
  },
  {
    title: "Brazil vs Cameroon",
    teams: ["Brazil", "Cameroon"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/17MQlnlIoKqs1etjmppfJv",
    provider: "FIFA",
  },
  {
    title: "Brazil vs Russia",
    teams: ["Brazil", "Russia"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.fifa.com/en/watch/3cIv3vMoVzk0y6NWXQB2Q6",
    provider: "FIFA",
  },
  {
    title: "Cameroon vs Sweden",
    teams: ["Cameroon", "Sweden"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.dailymotion.com/video/x9jelag",
    provider: "Dailymotion",
  },
  {
    title: "Brazil vs Sweden",
    teams: ["Brazil", "Sweden"],
    stage: "Group Stage",
    group: "B",
    url: "https://www.dailymotion.com/video/x9jhgl0",
    provider: "Dailymotion",
  },

  // GROUP C — 6
  {
    title: "Germany vs Korea Republic",
    teams: ["Germany", "Korea Republic"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/3dntssX3wSbS5RBV8R6YTg",
    provider: "FIFA",
  },
  {
    title: "Bolivia vs Spain",
    teams: ["Bolivia", "Spain"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/6QtOgz4JKeyQ9Q6nY4qcor",
    provider: "FIFA",
  },
  {
    title: "Korea Republic vs Bolivia",
    teams: ["Korea Republic", "Bolivia"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/4mhQyScr1zKXP9rlgxMVtL",
    provider: "FIFA",
  },
  {
    title: "Germany vs Bolivia",
    teams: ["Germany", "Bolivia"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.fifa.com/en/watch/2cXiWxu6eQ2nNWv4GajH2b",
    provider: "FIFA",
  },
  {
    title: "Germany vs Spain",
    teams: ["Germany", "Spain"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.dailymotion.com/video/x9jmqqk",
    provider: "Dailymotion",
  },
  {
    title: "Korea Republic vs Spain",
    teams: ["Korea Republic", "Spain"],
    stage: "Group Stage",
    group: "C",
    url: "https://www.dailymotion.com/video/x9jm0aq",
    provider: "Dailymotion",
  },

  // GROUP D — 6
  {
    title: "Bulgaria vs Greece",
    teams: ["Bulgaria", "Greece"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.fifa.com/en/watch/1Q7tkiOkd9fu4d61pJvLTI",
    provider: "FIFA",
  },
  {
    title: "Argentina vs Nigeria",
    teams: ["Argentina", "Nigeria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.fifa.com/en/watch/4RxGTKZvGZ8yse5260Y7RL",
    provider: "FIFA",
  },
  {
    title: "Nigeria vs Bulgaria",
    teams: ["Nigeria", "Bulgaria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9jsu20",
    provider: "Dailymotion",
  },
  {
    title: "Greece vs Nigeria",
    teams: ["Greece", "Nigeria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9jvcl0",
    provider: "Dailymotion",
  },
  {
    title: "Argentina vs Greece",
    teams: ["Argentina", "Greece"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9jsu1y",
    provider: "Dailymotion",
  },
  {
    title: "Argentina vs Bulgaria",
    teams: ["Argentina", "Bulgaria"],
    stage: "Group Stage",
    group: "D",
    url: "https://www.dailymotion.com/video/x9jvcl2",
    provider: "Dailymotion",
  },

  // GROUP E — 6
  {
    title: "Italy vs Republic of Ireland",
    teams: ["Italy", "Republic of Ireland"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.fifa.com/en/watch/3pnE85Z7lPhnaK4nQU6O2b",
    provider: "FIFA",
  },
  {
    title: "Mexico vs Republic of Ireland",
    teams: ["Mexico", "Republic of Ireland"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.fifa.com/en/watch/UGnTUHrxAi4n6lCGhzVWE",
    provider: "FIFA",
  },
  {
    title: "Norway vs Mexico",
    teams: ["Norway", "Mexico"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9jxdvg",
    provider: "Dailymotion",
  },
  {
    title: "Italy vs Norway",
    teams: ["Italy", "Norway"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9jyzqi",
    provider: "Dailymotion",
  },
  {
    title: "Italy vs Mexico",
    teams: ["Italy", "Mexico"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9k2qyu",
    provider: "Dailymotion",
  },
  {
    title: "Norway vs Republic of Ireland",
    teams: ["Norway", "Republic of Ireland"],
    stage: "Group Stage",
    group: "E",
    url: "https://www.dailymotion.com/video/x9k2qyo",
    provider: "Dailymotion",
  },

  // GROUP F — 6
  {
    title: "Belgium vs Saudi Arabia",
    teams: ["Belgium", "Saudi Arabia"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.fifa.com/en/watch/55KaRoYBswcZdpJfgSaqqe",
    provider: "FIFA",
  },
  {
    title: "Saudi Arabia vs Morocco",
    teams: ["Saudi Arabia", "Morocco"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.fifa.com/en/watch/5zmY74MCudvQ4IF4OfkQit",
    provider: "FIFA",
  },
  {
    title: "Belgium vs Netherlands",
    teams: ["Belgium", "Netherlands"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.fifa.com/en/watch/g96lS8AhVhWDrSYEDgsKh",
    provider: "FIFA",
  },
  {
    title: "Belgium vs Morocco",
    teams: ["Belgium", "Morocco"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9k8szw",
    provider: "Dailymotion",
  },
  {
    title: "Netherlands vs Saudi Arabia",
    teams: ["Netherlands", "Saudi Arabia"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.dailymotion.com/video/x9k8szy",
    provider: "Dailymotion",
  },
  {
    title: "Morocco vs Netherlands",
    teams: ["Morocco", "Netherlands"],
    stage: "Group Stage",
    group: "F",
    url: "https://www.fifa.com/en/watch/4dG0ibZynW7kkZcagDYPin",
    provider: "FIFA",
  },

  // ROUND OF 16 — 8
  {
    title: "Germany vs Belgium",
    teams: ["Germany", "Belgium"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/k86eWgJv7a0WVMeLGRP4B",
    provider: "FIFA",
  },
  {
    title: "Spain vs Switzerland",
    teams: ["Spain", "Switzerland"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/3IF2S8Fk3yg21wKjiQSchQ",
    provider: "FIFA",
  },
  {
    title: "Mexico vs Bulgaria",
    teams: ["Mexico", "Bulgaria"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/3LQ5JxKfXYzxT2kLIYBFAf",
    provider: "FIFA",
  },
  {
    title: "Nigeria vs Italy",
    teams: ["Nigeria", "Italy"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/3wJSwjkzgYA82EnJD3yJUu",
    provider: "FIFA",
  },
  {
    title: "Brazil vs United States",
    teams: ["Brazil", "United States"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/7zWFPsZVrydttekm2fn25M",
    provider: "FIFA",
  },
  {
    title: "Netherlands vs Republic of Ireland",
    teams: ["Netherlands", "Republic of Ireland"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/MxndnC55QWQfApwuY06n0",
    provider: "FIFA",
  },
  {
    title: "Saudi Arabia vs Sweden",
    teams: ["Saudi Arabia", "Sweden"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/1JZOsVsdDNUjBNtwKS2U1F",
    provider: "FIFA",
  },
  {
    title: "Romania vs Argentina",
    teams: ["Romania", "Argentina"],
    stage: "Round of 16",
    url: "https://www.fifa.com/en/watch/50DpWNpSFuQ5ik6p9n2Xrd",
    provider: "FIFA",
  },

  // QUARTERFINALS — 4
  {
    title: "Romania vs Sweden",
    teams: ["Romania", "Sweden"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/7zGXJyLSjrhuwleToqymUw",
    provider: "FIFA",
  },
  {
    title: "Bulgaria vs Germany",
    teams: ["Bulgaria", "Germany"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/4tocGMHs2byq6ZPwUH1epe",
    provider: "FIFA",
  },
  {
    title: "Netherlands vs Brazil",
    teams: ["Netherlands", "Brazil"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/3zT4IjsvIKHCId5WCxxnMX",
    provider: "FIFA",
  },
  {
    title: "Italy vs Spain",
    teams: ["Italy", "Spain"],
    stage: "Quarter-final",
    url: "https://www.fifa.com/en/watch/1rRt2pAV6xGmYW9v5zvtoq",
    provider: "FIFA",
  },

  // SEMIFINALS — 2
  {
    title: "Bulgaria vs Italy",
    teams: ["Bulgaria", "Italy"],
    stage: "Semi-final",
    url: "https://www.fifa.com/en/watch/6XTEGrIxWRjYFAm6cdHcXo",
    provider: "FIFA",
  },
  {
    title: "Sweden vs Brazil",
    teams: ["Sweden", "Brazil"],
    stage: "Semi-final",
    url: "https://www.fifa.com/en/watch/5FshwWJhMxLvbxFtntYZPf",
    provider: "FIFA",
  },

  // THIRD-PLACE MATCH — 1
  {
    title: "Sweden vs Bulgaria",
    teams: ["Sweden", "Bulgaria"],
    stage: "Third-place play-off",
    url: "https://www.fifa.com/en/watch/6fyDAuK4PxCC2NIyabqTxg",
    provider: "FIFA",
  },

  // FINAL — 1
  {
    title: "Brazil vs Italy",
    teams: ["Brazil", "Italy"],
    stage: "Final",
    url: "https://www.fifa.com/en/watch/5gHFVHGXu1z25dDe6id7TE",
    provider: "FIFA",
  },
] as const satisfies readonly Usa1994ReplayCatalogEntry[];

/** Journey group-stage membership (unordered editorial set; chronology applied later). */
export type Usa1994JourneyMembershipEntry = {
  title: string;
  teams: readonly [string, string];
  stage: MatchStage;
  group?: string;
};

export const USA_1994_JOURNEY_GROUP_STAGE = [
  // GROUP A — 4
  {
    title: "United States vs Switzerland",
    teams: ["United States", "Switzerland"],
    stage: "Group Stage",
    group: "A",
  },
  {
    title: "Colombia vs Romania",
    teams: ["Colombia", "Romania"],
    stage: "Group Stage",
    group: "A",
  },
  {
    title: "United States vs Colombia",
    teams: ["United States", "Colombia"],
    stage: "Group Stage",
    group: "A",
  },
  {
    title: "United States vs Romania",
    teams: ["United States", "Romania"],
    stage: "Group Stage",
    group: "A",
  },
  // GROUP B — 2
  {
    title: "Brazil vs Russia",
    teams: ["Brazil", "Russia"],
    stage: "Group Stage",
    group: "B",
  },
  {
    title: "Brazil vs Sweden",
    teams: ["Brazil", "Sweden"],
    stage: "Group Stage",
    group: "B",
  },
  // GROUP C — 3
  {
    title: "Germany vs Bolivia",
    teams: ["Germany", "Bolivia"],
    stage: "Group Stage",
    group: "C",
  },
  {
    title: "Germany vs Korea Republic",
    teams: ["Germany", "Korea Republic"],
    stage: "Group Stage",
    group: "C",
  },
  {
    title: "Germany vs Spain",
    teams: ["Germany", "Spain"],
    stage: "Group Stage",
    group: "C",
  },
  // GROUP D — 3
  {
    title: "Argentina vs Greece",
    teams: ["Argentina", "Greece"],
    stage: "Group Stage",
    group: "D",
  },
  {
    title: "Argentina vs Nigeria",
    teams: ["Argentina", "Nigeria"],
    stage: "Group Stage",
    group: "D",
  },
  {
    title: "Nigeria vs Bulgaria",
    teams: ["Nigeria", "Bulgaria"],
    stage: "Group Stage",
    group: "D",
  },
  // GROUP E — 2
  {
    title: "Italy vs Republic of Ireland",
    teams: ["Italy", "Republic of Ireland"],
    stage: "Group Stage",
    group: "E",
  },
  {
    title: "Mexico vs Republic of Ireland",
    teams: ["Mexico", "Republic of Ireland"],
    stage: "Group Stage",
    group: "E",
  },
  // GROUP F — 2
  {
    title: "Belgium vs Netherlands",
    teams: ["Belgium", "Netherlands"],
    stage: "Group Stage",
    group: "F",
  },
  {
    title: "Belgium vs Saudi Arabia",
    teams: ["Belgium", "Saudi Arabia"],
    stage: "Group Stage",
    group: "F",
  },
] as const satisfies readonly Usa1994JourneyMembershipEntry[];

export const USA_1994_JOURNEY_KNOCKOUT = [
  // ROUND OF 16 — 8
  {
    title: "Germany vs Belgium",
    teams: ["Germany", "Belgium"],
    stage: "Round of 16",
  },
  {
    title: "Spain vs Switzerland",
    teams: ["Spain", "Switzerland"],
    stage: "Round of 16",
  },
  {
    title: "Mexico vs Bulgaria",
    teams: ["Mexico", "Bulgaria"],
    stage: "Round of 16",
  },
  {
    title: "Nigeria vs Italy",
    teams: ["Nigeria", "Italy"],
    stage: "Round of 16",
  },
  {
    title: "Brazil vs United States",
    teams: ["Brazil", "United States"],
    stage: "Round of 16",
  },
  {
    title: "Netherlands vs Republic of Ireland",
    teams: ["Netherlands", "Republic of Ireland"],
    stage: "Round of 16",
  },
  {
    title: "Saudi Arabia vs Sweden",
    teams: ["Saudi Arabia", "Sweden"],
    stage: "Round of 16",
  },
  {
    title: "Romania vs Argentina",
    teams: ["Romania", "Argentina"],
    stage: "Round of 16",
  },
  // QUARTERFINALS — 4
  {
    title: "Romania vs Sweden",
    teams: ["Romania", "Sweden"],
    stage: "Quarter-final",
  },
  {
    title: "Bulgaria vs Germany",
    teams: ["Bulgaria", "Germany"],
    stage: "Quarter-final",
  },
  {
    title: "Netherlands vs Brazil",
    teams: ["Netherlands", "Brazil"],
    stage: "Quarter-final",
  },
  {
    title: "Italy vs Spain",
    teams: ["Italy", "Spain"],
    stage: "Quarter-final",
  },
  // SEMIFINALS — 2
  {
    title: "Bulgaria vs Italy",
    teams: ["Bulgaria", "Italy"],
    stage: "Semi-final",
  },
  {
    title: "Sweden vs Brazil",
    teams: ["Sweden", "Brazil"],
    stage: "Semi-final",
  },
  // THIRD PLACE — 1
  {
    title: "Sweden vs Bulgaria",
    teams: ["Sweden", "Bulgaria"],
    stage: "Third-place play-off",
  },
  // FINAL — 1
  {
    title: "Brazil vs Italy",
    teams: ["Brazil", "Italy"],
    stage: "Final",
  },
] as const satisfies readonly Usa1994JourneyMembershipEntry[];

export const USA_1994_JOURNEY_MEMBERSHIP = [
  ...USA_1994_JOURNEY_GROUP_STAGE,
  ...USA_1994_JOURNEY_KNOCKOUT,
] as const;
