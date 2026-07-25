export type CuratedJourneyExclusion = {
  tournamentId: string;
  match: string;
  date: string;
  city: string;
  stage: string;
  originalEpisodeId: string;
  originalMatchNumber: number;
  reason: string;
  replacedByEpisodeId: string;
  replacedByMatch: string;
  excludedAt: string;
};

export const CURATED_JOURNEY_REVISION: Record<string, number> = {
  "usa-1994": 1,
  "france-1998": 4,
};

/**
 * USA 1994 Journey revision 0 membership (pre-manual-catalog 36-match Journey).
 * Used to migrate completion by canonical match ID into revision 1 slots.
 */
export const USA_1994_JOURNEY_REVISION_0_IDS: readonly string[] = [
  "usa-1994-c01",
  "usa-1994-c02",
  "usa-1994-c03",
  "usa-1994-c04",
  "usa-1994-c08",
  "usa-1994-c10",
  "usa-1994-c12",
  "usa-1994-c13",
  "usa-1994-c14",
  "usa-1994-c15",
  "usa-1994-c17",
  "usa-1994-c18",
  "usa-1994-c23",
  "usa-1994-c24",
  "usa-1994-c27",
  "usa-1994-c30",
  "usa-1994-c32",
  "usa-1994-c33",
  "usa-1994-c34",
  "usa-1994-c36",
  "usa-1994-c37",
  "usa-1994-c38",
  "usa-1994-c39",
  "usa-1994-c40",
  "usa-1994-c41",
  "usa-1994-c42",
  "usa-1994-c43",
  "usa-1994-c44",
  "usa-1994-c45",
  "usa-1994-c46",
  "usa-1994-c47",
  "usa-1994-c48",
  "usa-1994-c49",
  "usa-1994-c50",
  "usa-1994-c51",
  "usa-1994-c52",
];

/**
 * Journey revision 1 membership (slot index 0..35 → canonicalMatchId).
 * Used to migrate completion by canonical match ID into later revisions.
 */
export const FRANCE_1998_JOURNEY_REVISION_1_IDS: readonly string[] = [
  "france-1998-c01",
  "france-1998-c02",
  "france-1998-c03",
  "france-1998-c04",
  "france-1998-c05",
  "france-1998-c09",
  "france-1998-c07",
  "france-1998-c08",
  "france-1998-c10",
  "france-1998-c15",
  "france-1998-c11",
  "france-1998-c14",
  "france-1998-c06",
  "france-1998-c12",
  "france-1998-c32",
  "france-1998-c38",
  "france-1998-c21",
  "france-1998-c29",
  "france-1998-c42",
  "france-1998-c44",
  "france-1998-c48",
  "france-1998-c49",
  "france-1998-c51",
  "france-1998-c52",
  "france-1998-c53",
  "france-1998-c54",
  "france-1998-c55",
  "france-1998-c56",
  "france-1998-c57",
  "france-1998-c58",
  "france-1998-c59",
  "france-1998-c60",
  "france-1998-c61",
  "france-1998-c62",
  "france-1998-c63",
  "france-1998-c64",
];

/**
 * Journey revision 2 membership (FIFA catalog rebuild + Italy–Chile / Paraguay–Bulgaria).
 * Used to migrate completion by canonical match ID into revision 3 slots.
 */
export const FRANCE_1998_JOURNEY_REVISION_2_IDS: readonly string[] = [
  "france-1998-c01",
  "france-1998-c02",
  "france-1998-c03",
  "france-1998-c04",
  "france-1998-c05",
  "france-1998-c11",
  "france-1998-c18",
  "france-1998-c19",
  "france-1998-c20",
  "france-1998-c21",
  "france-1998-c22",
  "france-1998-c28",
  "france-1998-c29",
  "france-1998-c32",
  "france-1998-c34",
  "france-1998-c35",
  "france-1998-c36",
  "france-1998-c37",
  "france-1998-c46",
  "france-1998-c47",
  "france-1998-c48",
  "france-1998-c49",
  "france-1998-c51",
  "france-1998-c52",
  "france-1998-c53",
  "france-1998-c54",
  "france-1998-c55",
  "france-1998-c56",
  "france-1998-c57",
  "france-1998-c58",
  "france-1998-c59",
  "france-1998-c60",
  "france-1998-c61",
  "france-1998-c62",
  "france-1998-c63",
  "france-1998-c64",
];

/**
 * Journey revision 3 membership (Spain–Nigeria / Germany–USA enter; Italy–Chile /
 * Paraguay–Bulgaria leave). Used to migrate completion into revision 4 slots.
 */
export const FRANCE_1998_JOURNEY_REVISION_3_IDS: readonly string[] = [
  "france-1998-c01",
  "france-1998-c02",
  "france-1998-c04",
  "france-1998-c09",
  "france-1998-c11",
  "france-1998-c15",
  "france-1998-c18",
  "france-1998-c19",
  "france-1998-c20",
  "france-1998-c21",
  "france-1998-c22",
  "france-1998-c28",
  "france-1998-c29",
  "france-1998-c32",
  "france-1998-c34",
  "france-1998-c35",
  "france-1998-c36",
  "france-1998-c37",
  "france-1998-c46",
  "france-1998-c47",
  "france-1998-c48",
  "france-1998-c49",
  "france-1998-c51",
  "france-1998-c52",
  "france-1998-c53",
  "france-1998-c54",
  "france-1998-c55",
  "france-1998-c56",
  "france-1998-c57",
  "france-1998-c58",
  "france-1998-c59",
  "france-1998-c60",
  "france-1998-c61",
  "france-1998-c62",
  "france-1998-c63",
  "france-1998-c64",
];

export const curatedJourneyExclusions: CuratedJourneyExclusion[] = [
  {
    tournamentId: "france-1998",
    match: "Romania vs Colombia",
    date: "June 15, 1998",
    city: "Lyon",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-11",
    originalMatchNumber: 11,
    reason: "Excluded from curated journey — no verified full-match replay.",
    replacedByEpisodeId: "france-1998-11",
    replacedByMatch: "Croatia vs Jamaica",
    excludedAt: "2026-07-22",
  },
  {
    tournamentId: "france-1998",
    match: "Italy vs Chile",
    date: "June 11, 1998",
    city: "Bordeaux",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-03",
    originalMatchNumber: 3,
    reason: "Excluded from curated journey — Dailymotion replay deleted.",
    replacedByEpisodeId: "france-1998-04",
    replacedByMatch: "Spain vs Nigeria",
    excludedAt: "2026-07-24",
  },
  {
    tournamentId: "france-1998",
    match: "Paraguay vs Bulgaria",
    date: "June 12, 1998",
    city: "Montpellier",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-05",
    originalMatchNumber: 5,
    reason: "Excluded from curated journey — Dailymotion replay is the incorrect match.",
    replacedByEpisodeId: "france-1998-06",
    replacedByMatch: "Germany vs United States",
    excludedAt: "2026-07-24",
  },
  {
    tournamentId: "france-1998",
    match: "Cameroon vs Austria",
    date: "June 11, 1998",
    city: "Toulouse",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-03",
    originalMatchNumber: 3,
    reason: "Excluded from curated journey — Journey group-stage rebalance (Group B reduced to 3).",
    replacedByEpisodeId: "france-1998-03",
    replacedByMatch: "Netherlands vs Belgium",
    excludedAt: "2026-07-24",
  },
  {
    tournamentId: "france-1998",
    match: "Chile vs Austria",
    date: "June 17, 1998",
    city: "Saint-Étienne",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-07",
    originalMatchNumber: 7,
    reason: "Excluded from curated journey — Journey group-stage rebalance (Group B reduced to 3).",
    replacedByEpisodeId: "france-1998-11",
    replacedByMatch: "Spain vs Paraguay",
    excludedAt: "2026-07-24",
  },
  {
    tournamentId: "france-1998",
    match: "South Africa vs Denmark",
    date: "June 24, 1998",
    city: "Toulouse",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-18",
    originalMatchNumber: 18,
    reason: "Excluded from curated journey — Journey group-stage rebalance (Group C reduced to 3).",
    replacedByEpisodeId: "france-1998-12",
    replacedByMatch: "United States vs Iran",
    excludedAt: "2026-07-24",
  },
  {
    tournamentId: "france-1998",
    match: "Argentina vs Jamaica",
    date: "June 21, 1998",
    city: "Paris",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-19",
    originalMatchNumber: 19,
    reason: "Excluded from curated journey — Journey group-stage rebalance (Group H reduced to 3).",
    replacedByEpisodeId: "france-1998-15",
    replacedByMatch: "Romania vs England",
    excludedAt: "2026-07-24",
  },
  {
    tournamentId: "france-1998",
    match: "Japan vs Croatia",
    date: "June 20, 1998",
    city: "Nantes",
    stage: "Group Stage",
    originalEpisodeId: "france-1998-20",
    originalMatchNumber: 20,
    reason: "Excluded from curated journey — Journey group-stage rebalance (Group H reduced to 3).",
    replacedByEpisodeId: "france-1998-20",
    replacedByMatch: "Colombia vs England",
    excludedAt: "2026-07-24",
  },
];

export function getCuratedExclusions(tournamentId: string): CuratedJourneyExclusion[] {
  return curatedJourneyExclusions.filter(
    (entry) => entry.tournamentId === tournamentId
  );
}
