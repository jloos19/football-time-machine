import type { HighlightPackageKind, MatchStage } from "./types";

/**
 * Manually curated Korea/Japan 2002 official highlights catalog (partial).
 * URLs are exact supplied fifa.com/en/watch links — do not alter.
 *
 * Follows the same pattern as USA 1994 / France 1998:
 *   lib/archive/<tournament>-highlights-catalog.ts
 *   lib/archive/<tournament>-highlights-apply.ts
 *
 * Duplicate-source rule: when both standard and Extended Highlights exist for
 * the same match, prefer Extended Highlights as the sole canonical Highlight.
 * Portugal vs Korea Republic shorter duplicate is intentionally omitted:
 *   https://www.fifa.com/en/watch/3MKRnPzKkEWjkRkDvvrM57
 */
export type KoreaJapan2002HighlightsCatalogEntry = {
  title: string;
  teams: readonly [string, string];
  stage: MatchStage;
  group?: string;
  url: string;
  provider: "FIFA" | "Dailymotion" | "YouTube";
  /** Standard highlights vs extended highlights (stored in metadata). */
  packageKind: HighlightPackageKind;
};

export const KOREA_JAPAN_2002_HIGHLIGHTS_VERIFIED_BY =
  "browser-extracted-manual-curation";

/**
 * Rejected alternate for Portugal vs Korea Republic (standard Highlights).
 * Not imported — Extended Highlights URL is canonical.
 */
export const KOREA_JAPAN_2002_REJECTED_DUPLICATE_HIGHLIGHT_URL =
  "https://www.fifa.com/en/watch/3MKRnPzKkEWjkRkDvvrM57";

/**
 * Canonical Extended Highlights URL for Portugal vs Korea Republic.
 */
export const PORTUGAL_VS_KOREA_REPUBLIC_CANONICAL_HIGHLIGHT_URL =
  "https://www.fifa.com/en/watch/1SC9AxIloIjyTrcQNrj3Og";

/**
 * First curated highlights import for Korea/Japan 2002 — 33 unique matches.
 * Team names use archive canonical forms (United States, Korea Republic, …).
 */
export const KOREA_JAPAN_2002_HIGHLIGHTS_CATALOG: KoreaJapan2002HighlightsCatalogEntry[] =
  [
    // ── Group Stage (17) ─────────────────────────────────────────────────────
    {
      title: "Argentina vs England",
      teams: ["Argentina", "England"],
      stage: "Group Stage",
      group: "F",
      url: "https://www.fifa.com/en/watch/17SOa0EZTaD8SRIXBU4fxy",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "France vs Senegal",
      teams: ["France", "Senegal"],
      stage: "Group Stage",
      group: "A",
      url: "https://www.fifa.com/en/watch/liuB6SSFkgYJ5uwpV3cDD",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Denmark vs France",
      teams: ["Denmark", "France"],
      stage: "Group Stage",
      group: "A",
      url: "https://www.fifa.com/en/watch/2zwDu6VNddBg8WiEqtB9Tx",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Portugal vs Korea Republic",
      teams: ["Portugal", "Korea Republic"],
      stage: "Group Stage",
      group: "D",
      url: PORTUGAL_VS_KOREA_REPUBLIC_CANONICAL_HIGHLIGHT_URL,
      provider: "FIFA",
      packageKind: "extended-highlights",
    },
    {
      title: "Republic of Ireland vs Cameroon",
      teams: ["Republic of Ireland", "Cameroon"],
      stage: "Group Stage",
      group: "E",
      url: "https://www.fifa.com/en/watch/2YrXyDeWEfgMBpa9CN8k5E",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Germany vs Republic of Ireland",
      teams: ["Germany", "Republic of Ireland"],
      stage: "Group Stage",
      group: "E",
      url: "https://www.fifa.com/en/watch/7Bl7iGjE6EgVlsGw8f1DD3",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Saudi Arabia vs Republic of Ireland",
      teams: ["Saudi Arabia", "Republic of Ireland"],
      stage: "Group Stage",
      group: "E",
      url: "https://www.fifa.com/en/watch/6vtIzG7GoV8H7DX2ENNW2j",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Japan vs Belgium",
      teams: ["Japan", "Belgium"],
      stage: "Group Stage",
      group: "H",
      url: "https://www.fifa.com/en/watch/3tXmLnx5iNmlWnvbBlWZEv",
      provider: "FIFA",
      packageKind: "extended-highlights",
    },
    {
      title: "Spain vs Slovenia",
      teams: ["Spain", "Slovenia"],
      stage: "Group Stage",
      group: "B",
      url: "https://www.fifa.com/en/watch/4RIMdhcYlI4RWqBsSNlbcC",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "South Africa vs Slovenia",
      teams: ["South Africa", "Slovenia"],
      stage: "Group Stage",
      group: "B",
      url: "https://www.fifa.com/en/watch/4nJ1L9ktIJRRppj0fJGICx",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "South Africa vs Spain",
      teams: ["South Africa", "Spain"],
      stage: "Group Stage",
      group: "B",
      url: "https://www.fifa.com/en/watch/5Il5BOo7RMUKB7MydNZ7KI",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Spain vs Paraguay",
      teams: ["Spain", "Paraguay"],
      stage: "Group Stage",
      group: "B",
      url: "https://www.fifa.com/en/watch/5X25YRrRVkdElu8BI5aoM7",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Portugal vs Poland",
      teams: ["Portugal", "Poland"],
      stage: "Group Stage",
      group: "D",
      url: "https://www.fifa.com/en/watch/4SDutyDM84tlEzwcgpCd3",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Poland vs United States",
      teams: ["Poland", "United States"],
      stage: "Group Stage",
      group: "D",
      url: "https://www.fifa.com/en/watch/7Hvw71RS0hjavYc7u8oGZx",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "United States vs Portugal",
      teams: ["United States", "Portugal"],
      stage: "Group Stage",
      group: "D",
      url: "https://www.fifa.com/en/watch/44DSnhaY4tK0bjvAyqKBIf",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Russia vs Tunisia",
      teams: ["Russia", "Tunisia"],
      stage: "Group Stage",
      group: "H",
      url: "https://www.fifa.com/en/watch/7d3arnsUbwJS0Kl9ByFesw",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Korea Republic vs United States",
      teams: ["Korea Republic", "United States"],
      stage: "Group Stage",
      group: "D",
      url: "https://www.fifa.com/en/watch/2DBd3JHoQgWRrGwfQrKSe4",
      provider: "FIFA",
      packageKind: "highlights",
    },

    // ── Round of 16 (8) ──────────────────────────────────────────────────────
    {
      title: "Spain vs Republic of Ireland",
      teams: ["Spain", "Republic of Ireland"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/69mfZhVvz2xN11gk7uaclH",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Korea Republic vs Italy",
      teams: ["Korea Republic", "Italy"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/3Ie3xqHN6It2iQg9NPCyZp",
      provider: "FIFA",
      packageKind: "extended-highlights",
    },
    {
      title: "Sweden vs Senegal",
      teams: ["Sweden", "Senegal"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/3ydrZpAFrtkkWrcBORVcz5",
      provider: "FIFA",
      packageKind: "extended-highlights",
    },
    {
      title: "Mexico vs United States",
      teams: ["Mexico", "United States"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/6fYxrAaL2ceE3kwgoOa3TV",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Germany vs Paraguay",
      teams: ["Germany", "Paraguay"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/3LXJydL3jSlJ5qf1xsvmDY",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Japan vs Turkey",
      teams: ["Japan", "Turkey"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/4qelFbks06aujS9Y64MnOi",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Denmark vs England",
      teams: ["Denmark", "England"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/1NYYfh9o9AEyCrs3t3FDiR",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Brazil vs Belgium",
      teams: ["Brazil", "Belgium"],
      stage: "Round of 16",
      url: "https://www.fifa.com/en/watch/1OFSxqeyK05xM6BBWMuNiA",
      provider: "FIFA",
      packageKind: "highlights",
    },

    // ── Quarter-final (4) ────────────────────────────────────────────────────
    {
      title: "Spain vs Korea Republic",
      teams: ["Spain", "Korea Republic"],
      stage: "Quarter-final",
      url: "https://www.fifa.com/en/watch/1wy510yzqXQQnfLGDIEuqM",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Germany vs United States",
      teams: ["Germany", "United States"],
      stage: "Quarter-final",
      url: "https://www.fifa.com/en/watch/1rbgHn5tPS4DjDtp0wu6qP",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "England vs Brazil",
      teams: ["England", "Brazil"],
      stage: "Quarter-final",
      url: "https://www.fifa.com/en/watch/7zLNWgf5PYwqwnQHmXtx0G",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Senegal vs Turkey",
      teams: ["Senegal", "Turkey"],
      stage: "Quarter-final",
      url: "https://www.fifa.com/en/watch/iMFyvC9s0NfZBeo1DNyUR",
      provider: "FIFA",
      packageKind: "highlights",
    },

    // ── Semi-final (2) ───────────────────────────────────────────────────────
    {
      title: "Germany vs Korea Republic",
      teams: ["Germany", "Korea Republic"],
      stage: "Semi-final",
      url: "https://www.fifa.com/en/watch/4nz68YFC1c6VSDcCz5ey7Y",
      provider: "FIFA",
      packageKind: "highlights",
    },
    {
      title: "Brazil vs Turkey",
      teams: ["Brazil", "Turkey"],
      stage: "Semi-final",
      url: "https://www.fifa.com/en/watch/4gNlpr5WAwNjTBuD6xNcTa",
      provider: "FIFA",
      packageKind: "highlights",
    },

    // ── Third-place play-off (1) ─────────────────────────────────────────────
    {
      title: "Korea Republic vs Turkey",
      teams: ["Korea Republic", "Turkey"],
      stage: "Third-place play-off",
      url: "https://www.fifa.com/en/watch/5v4IuPCfHf4xswGX3vSHZD",
      provider: "FIFA",
      packageKind: "highlights",
    },

    // ── Final (1) ────────────────────────────────────────────────────────────
    {
      title: "Germany vs Brazil",
      teams: ["Germany", "Brazil"],
      stage: "Final",
      url: "https://www.fifa.com/en/watch/2t5caS1C0fMww1ndh81gj",
      provider: "FIFA",
      packageKind: "highlights",
    },
  ];
