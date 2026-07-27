import type { CanonicalMatch } from "../types";

export const usa1994Matches: CanonicalMatch[] = [
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c01",
    "officialMatchNumber": 1,
    "chronologicalIndex": 1,
    "date": "June 17, 1994",
    "kickoffOrder": 1,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Germany",
    "awayTeam": "Bolivia",
    "venue": "Soldier Field, Chicago",
    "editorial": {
      "journeyEpisodeId": "usa-1994-01",
      "journeySlot": 1
    },
    "replaySources": [
      {
        "id": "usa-1994-c01-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2cXiWxu6eQ2nNWv4GajH2b",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c01-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jlylo",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c01-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c01-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7KOfJAvcrGyZrMxhZcIFTh",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c01-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c02",
    "officialMatchNumber": 2,
    "chronologicalIndex": 2,
    "date": "June 17, 1994",
    "kickoffOrder": 2,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Spain",
    "awayTeam": "South Korea",
    "venue": "Cotton Bowl, Dallas",
    "replaySources": [
      {
        "id": "usa-1994-c02-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/01RkBvmA7uVcsiLLLRomhC",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "FIFA page loaded but player availability could not be confirmed automatically"
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "usa-1994-c02-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jm0aq",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c02-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c02-hl-1",
        "provider": "YouTube" as const,
        "url": "https://www.youtube.com/watch?v=3X0ZnOz3Cbc",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (YouTube); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (YouTube) (browser-extracted manual curation)"
        },
        "notes": "Highlights (YouTube)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c02-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c03",
    "officialMatchNumber": 3,
    "chronologicalIndex": 3,
    "date": "June 18, 1994",
    "kickoffOrder": 3,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "United States",
    "awayTeam": "Switzerland",
    "venue": "Pontiac Silverdome, Pontiac",
    "editorial": {
      "journeyEpisodeId": "usa-1994-02",
      "journeySlot": 2
    },
    "replaySources": [
      {
        "id": "usa-1994-c03-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4e1xQjsgo8jG2J9NzAlfoq",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c03-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9j9ohy",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c03-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c03-hl-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9lek66",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (Dailymotion); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (Dailymotion) (browser-extracted manual curation)"
        },
        "notes": "Highlights (Dailymotion)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c03-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c04",
    "officialMatchNumber": 4,
    "chronologicalIndex": 4,
    "date": "June 18, 1994",
    "kickoffOrder": 4,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Italy",
    "awayTeam": "Republic of Ireland",
    "venue": "Giants Stadium, East Rutherford",
    "editorial": {
      "journeyEpisodeId": "usa-1994-03",
      "journeySlot": 3
    },
    "replaySources": [
      {
        "id": "usa-1994-c04-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3pnE85Z7lPhnaK4nQU6O2b",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c04-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jxdve",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c04-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c04-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5i2kIrSVCPrJmjeZTbxvib",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c04-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c05",
    "officialMatchNumber": 5,
    "chronologicalIndex": 5,
    "date": "June 18, 1994",
    "kickoffOrder": 5,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Norway",
    "awayTeam": "Mexico",
    "venue": "RFK Stadium, Washington",
    "replaySources": [
      {
        "id": "usa-1994-c05-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jxdvg",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "usa-1994-c05-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c05-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1OOQHGFjCXVEjoTaRMvzfW",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c05-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c06",
    "officialMatchNumber": 6,
    "chronologicalIndex": 6,
    "date": "June 18, 1994",
    "kickoffOrder": 6,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Cameroon",
    "awayTeam": "Sweden",
    "venue": "Rose Bowl, Pasadena",
    "replaySources": [
      {
        "id": "usa-1994-c06-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jelag",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "usa-1994-c06-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c06-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1yTANxFWtrZQys6bRZR4QU",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c06-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c07",
    "officialMatchNumber": 7,
    "chronologicalIndex": 7,
    "date": "June 19, 1994",
    "kickoffOrder": 7,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Colombia",
    "awayTeam": "Romania",
    "venue": "Rose Bowl, Pasadena",
    "replaySources": [
      {
        "id": "usa-1994-c07-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9j9oi0",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "usa-1994-c07-src-1",
    "editorial": {
      "journeyEpisodeId": "usa-1994-04",
      "journeySlot": 4
    },
    "highlightSources": [
      {
        "id": "usa-1994-c07-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3H2dYSdQwlHhaCGVX0MVWX",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c07-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c08",
    "officialMatchNumber": 8,
    "chronologicalIndex": 8,
    "date": "June 19, 1994",
    "kickoffOrder": 8,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Russia",
    "awayTeam": "Brazil",
    "venue": "Stanford Stadium, Stanford",
    "editorial": {
      "journeyEpisodeId": "usa-1994-05",
      "journeySlot": 5
    },
    "replaySources": [
      {
        "id": "usa-1994-c08-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3cIv3vMoVzk0y6NWXQB2Q6",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c08-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jefts",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c08-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c08-hl-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9lewha",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (Dailymotion); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (Dailymotion) (browser-extracted manual curation)"
        },
        "notes": "Highlights (Dailymotion)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c08-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c09",
    "officialMatchNumber": 9,
    "chronologicalIndex": 9,
    "date": "June 19, 1994",
    "kickoffOrder": 9,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "South Korea",
    "awayTeam": "Bolivia",
    "venue": "Foxboro Stadium, Foxborough",
    "replaySources": [
      {
        "id": "usa-1994-c09-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4mhQyScr1zKXP9rlgxMVtL",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c09-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c09-hl-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9lhzke",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (Dailymotion); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (Dailymotion) (browser-extracted manual curation)"
        },
        "notes": "Highlights (Dailymotion)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c09-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c10",
    "officialMatchNumber": 10,
    "chronologicalIndex": 10,
    "date": "June 20, 1994",
    "kickoffOrder": 10,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Netherlands",
    "awayTeam": "Saudi Arabia",
    "venue": "RFK Stadium, Washington",
    "replaySources": [
      {
        "id": "usa-1994-c10-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9k8szy",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c10-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c10-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6lTRw8Jo05sYTPC77o1y41",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c10-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c11",
    "officialMatchNumber": 11,
    "chronologicalIndex": 11,
    "date": "June 20, 1994",
    "kickoffOrder": 11,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Belgium",
    "awayTeam": "Morocco",
    "venue": "Camping World Stadium, Orlando",
    "replaySources": [
      {
        "id": "usa-1994-c11-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9k8szw",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "usa-1994-c11-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c11-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4TcxQTKBCITOb6tHJq0HIv",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c11-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c12",
    "officialMatchNumber": 12,
    "chronologicalIndex": 12,
    "date": "June 21, 1994",
    "kickoffOrder": 12,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Argentina",
    "awayTeam": "Greece",
    "venue": "Foxboro Stadium, Foxborough",
    "editorial": {
      "journeyEpisodeId": "usa-1994-06",
      "journeySlot": 6
    },
    "replaySources": [
      {
        "id": "usa-1994-c12-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/71KANTSZe9JB9sCKMTZsnb",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "FIFA page loaded but player availability could not be confirmed automatically"
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "usa-1994-c12-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jsu1y",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c12-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c12-hl-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9lf5qo",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (Dailymotion); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (Dailymotion) (browser-extracted manual curation)"
        },
        "notes": "Highlights (Dailymotion)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c12-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c13",
    "officialMatchNumber": 13,
    "chronologicalIndex": 13,
    "date": "June 21, 1994",
    "kickoffOrder": 13,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Germany",
    "awayTeam": "Spain",
    "venue": "Soldier Field, Chicago",
    "editorial": {
      "journeyEpisodeId": "usa-1994-07",
      "journeySlot": 7
    },
    "replaySources": [
      {
        "id": "usa-1994-c13-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jmqqk",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c13-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c13-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6FfAn3tRCoE1mfpOR73MNa",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c13-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c14",
    "officialMatchNumber": 14,
    "chronologicalIndex": 14,
    "date": "June 21, 1994",
    "kickoffOrder": 14,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Nigeria",
    "awayTeam": "Bulgaria",
    "venue": "Cotton Bowl, Dallas",
    "editorial": {
      "journeyEpisodeId": "usa-1994-08",
      "journeySlot": 8
    },
    "replaySources": [
      {
        "id": "usa-1994-c14-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jsu20",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c14-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c14-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/t0THMJ2yY7aBIMT0LXGLr",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c14-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c15",
    "officialMatchNumber": 15,
    "chronologicalIndex": 15,
    "date": "June 22, 1994",
    "kickoffOrder": 15,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "United States",
    "awayTeam": "Colombia",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-09",
      "journeySlot": 9
    },
    "replaySources": [
      {
        "id": "usa-1994-c15-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ja742",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c15-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c15-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/ZmuFFdsQWhzEWzPpcNmPU",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c15-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c16",
    "officialMatchNumber": 16,
    "chronologicalIndex": 16,
    "date": "June 22, 1994",
    "kickoffOrder": 16,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Switzerland",
    "awayTeam": "Romania",
    "venue": "Pontiac Silverdome, Pontiac",
    "replaySources": [
      {
        "id": "usa-1994-c16-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5G6LB8E8y94HjYQP5rl7oz",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c16-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c16-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4bKKDEUuyVnUDHbJoT1Npf",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c16-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c17",
    "officialMatchNumber": 17,
    "chronologicalIndex": 17,
    "date": "June 23, 1994",
    "kickoffOrder": 17,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Italy",
    "awayTeam": "Norway",
    "venue": "Giants Stadium, East Rutherford",
    "replaySources": [
      {
        "id": "usa-1994-c17-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jyzqi",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c17-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c17-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/76WGQ5wUJjBLpQzJTwpTgQ",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c17-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c18",
    "officialMatchNumber": 18,
    "chronologicalIndex": 18,
    "date": "June 23, 1994",
    "kickoffOrder": 18,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Brazil",
    "awayTeam": "Cameroon",
    "venue": "Stanford Stadium, Stanford",
    "replaySources": [
      {
        "id": "usa-1994-c18-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/17MQlnlIoKqs1etjmppfJv",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c18-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jfba4",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c18-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c18-hl-1",
        "provider": "YouTube" as const,
        "url": "https://www.youtube.com/watch?v=n6PJMzfS1oI",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (YouTube); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (YouTube) (browser-extracted manual curation)"
        },
        "notes": "Highlights (YouTube)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c18-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c19",
    "officialMatchNumber": 19,
    "chronologicalIndex": 19,
    "date": "June 24, 1994",
    "kickoffOrder": 19,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Bolivia",
    "awayTeam": "Spain",
    "venue": "Soldier Field, Chicago",
    "replaySources": [
      {
        "id": "usa-1994-c19-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6QtOgz4JKeyQ9Q6nY4qcor",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c19-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c19-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3V1EmDW7271x4XWb3maA6x",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c19-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c20",
    "officialMatchNumber": 20,
    "chronologicalIndex": 20,
    "date": "June 24, 1994",
    "kickoffOrder": 20,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Mexico",
    "awayTeam": "Republic of Ireland",
    "venue": "Citrus Bowl, Orlando",
    "replaySources": [
      {
        "id": "usa-1994-c20-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/UGnTUHrxAi4n6lCGhzVWE",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c20-src-1",
    "editorial": {
      "journeyEpisodeId": "usa-1994-10",
      "journeySlot": 10
    },
    "highlightSources": [
      {
        "id": "usa-1994-c20-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2Pq2DEpqTit0oepM3m6Tih",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c20-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c21",
    "officialMatchNumber": 21,
    "chronologicalIndex": 21,
    "date": "June 24, 1994",
    "kickoffOrder": 21,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Sweden",
    "awayTeam": "Russia",
    "venue": "Pontiac Silverdome, Pontiac",
    "replaySources": [
      {
        "id": "usa-1994-c21-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3Csb7zXorYyfDLLE47T42c",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c21-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c21-hl-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9li5pm",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (Dailymotion); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (Dailymotion) (browser-extracted manual curation)"
        },
        "notes": "Highlights (Dailymotion)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c21-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c22",
    "officialMatchNumber": 22,
    "chronologicalIndex": 22,
    "date": "June 25, 1994",
    "kickoffOrder": 22,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Morocco",
    "awayTeam": "Saudi Arabia",
    "venue": "Giants Stadium, East Rutherford",
    "replaySources": [
      {
        "id": "usa-1994-c22-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5zmY74MCudvQ4IF4OfkQit",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c22-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c22-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1TiHCtl86BHikForIoAX15",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c22-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c23",
    "officialMatchNumber": 23,
    "chronologicalIndex": 23,
    "date": "June 25, 1994",
    "kickoffOrder": 23,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Netherlands",
    "awayTeam": "Belgium",
    "venue": "Camping World Stadium, Orlando",
    "editorial": {
      "journeyEpisodeId": "usa-1994-11",
      "journeySlot": 11
    },
    "replaySources": [
      {
        "id": "usa-1994-c23-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/g96lS8AhVhWDrSYEDgsKh",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c23-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ka1q4",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c23-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c23-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5BT03afM76AUMqqYaSRBs2",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c23-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c24",
    "officialMatchNumber": 24,
    "chronologicalIndex": 24,
    "date": "June 25, 1994",
    "kickoffOrder": 24,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Argentina",
    "awayTeam": "Nigeria",
    "venue": "Foxboro Stadium, Foxborough",
    "editorial": {
      "journeyEpisodeId": "usa-1994-12",
      "journeySlot": 12
    },
    "replaySources": [
      {
        "id": "usa-1994-c24-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4RxGTKZvGZ8yse5260Y7RL",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c24-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jtcje",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c24-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c24-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3so3Y00003mkFLLMuSXUCO",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c24-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c25",
    "officialMatchNumber": 25,
    "chronologicalIndex": 25,
    "date": "June 26, 1994",
    "kickoffOrder": 25,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Bulgaria",
    "awayTeam": "Greece",
    "venue": "Soldier Field, Chicago",
    "replaySources": [
      {
        "id": "usa-1994-c25-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1Q7tkiOkd9fu4d61pJvLTI",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c25-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c25-hl-1",
        "provider": "YouTube" as const,
        "url": "https://www.youtube.com/watch?v=XJnNevyaDV8",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (YouTube); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (YouTube) (browser-extracted manual curation)"
        },
        "notes": "Highlights (YouTube)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c25-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c26",
    "officialMatchNumber": 26,
    "chronologicalIndex": 26,
    "date": "June 26, 1994",
    "kickoffOrder": 26,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Switzerland",
    "awayTeam": "Colombia",
    "venue": "Stanford Stadium, Stanford",
    "replaySources": [
      {
        "id": "usa-1994-c26-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5n7IZztj45j4FBmRkHp5QM",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c26-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c26-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2auBz7S2rnA5hJGWJlD5Ex",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c26-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c27",
    "officialMatchNumber": 27,
    "chronologicalIndex": 27,
    "date": "June 26, 1994",
    "kickoffOrder": 27,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "United States",
    "awayTeam": "Romania",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-13",
      "journeySlot": 13
    },
    "replaySources": [
      {
        "id": "usa-1994-c27-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4kDG1XZUlAC9uz6l7hltLb",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c27-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jdrqi",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c27-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c27-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5Vp8l5Jbew0mpJ6UZscJYL",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c27-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c28",
    "officialMatchNumber": 28,
    "chronologicalIndex": 28,
    "date": "June 26, 1994",
    "kickoffOrder": 28,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Russia",
    "awayTeam": "Cameroon",
    "venue": "Stanford Stadium, Stanford",
    "replaySources": [
      {
        "id": "usa-1994-c28-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6QQxdSzdcCZ0k44SMPA0LM",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c28-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c28-hl-1",
        "provider": "YouTube" as const,
        "url": "https://www.youtube.com/watch?v=S6IOnEZyTEI",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (YouTube); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (YouTube) (browser-extracted manual curation)"
        },
        "notes": "Highlights (YouTube)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c28-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c29",
    "officialMatchNumber": 29,
    "chronologicalIndex": 29,
    "date": "June 27, 1994",
    "kickoffOrder": 29,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Greece",
    "awayTeam": "Nigeria",
    "venue": "Foxboro Stadium, Foxborough",
    "replaySources": [
      {
        "id": "usa-1994-c29-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jvcl0",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "usa-1994-c29-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c29-hl-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9lkjym",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (Dailymotion); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (Dailymotion) (browser-extracted manual curation)"
        },
        "notes": "Highlights (Dailymotion)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c29-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c30",
    "officialMatchNumber": 30,
    "chronologicalIndex": 30,
    "date": "June 27, 1994",
    "kickoffOrder": 30,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Germany",
    "awayTeam": "South Korea",
    "venue": "Soldier Field, Chicago",
    "editorial": {
      "journeyEpisodeId": "usa-1994-14",
      "journeySlot": 14
    },
    "replaySources": [
      {
        "id": "usa-1994-c30-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3dntssX3wSbS5RBV8R6YTg",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c30-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jqiau",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c30-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c30-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5oJenL8ezjLLTvPGnnF8rD",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c30-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c31",
    "officialMatchNumber": 31,
    "chronologicalIndex": 31,
    "date": "June 28, 1994",
    "kickoffOrder": 31,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Republic of Ireland",
    "awayTeam": "Norway",
    "venue": "Giants Stadium, East Rutherford",
    "replaySources": [
      {
        "id": "usa-1994-c31-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9k2qyo",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "usa-1994-c31-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c31-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3bWV7qHkv8Vsmt8vhexfBQ",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c31-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c32",
    "officialMatchNumber": 32,
    "chronologicalIndex": 32,
    "date": "June 28, 1994",
    "kickoffOrder": 32,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Italy",
    "awayTeam": "Mexico",
    "venue": "Giants Stadium, East Rutherford",
    "replaySources": [
      {
        "id": "usa-1994-c32-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2nNyNBySuQ7cYxMbvym0gW",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "FIFA page loaded but player availability could not be confirmed automatically"
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "usa-1994-c32-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9k2qyu",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c32-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c32-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4AciXHsuNjdtMHKAR92yOQ",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c32-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c33",
    "officialMatchNumber": 33,
    "chronologicalIndex": 33,
    "date": "June 28, 1994",
    "kickoffOrder": 33,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Brazil",
    "awayTeam": "Sweden",
    "venue": "Pontiac Silverdome, Pontiac",
    "editorial": {
      "journeyEpisodeId": "usa-1994-15",
      "journeySlot": 15
    },
    "replaySources": [
      {
        "id": "usa-1994-c33-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jhgl0",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c33-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c33-hl-1",
        "provider": "YouTube" as const,
        "url": "https://www.youtube.com/watch?v=WPYvsebMAmc",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (YouTube); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (YouTube) (browser-extracted manual curation)"
        },
        "notes": "Highlights (YouTube)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c33-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c34",
    "officialMatchNumber": 34,
    "chronologicalIndex": 34,
    "date": "June 29, 1994",
    "kickoffOrder": 34,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Belgium",
    "awayTeam": "Saudi Arabia",
    "venue": "RFK Stadium, Washington",
    "editorial": {
      "journeyEpisodeId": "usa-1994-16",
      "journeySlot": 16
    },
    "replaySources": [
      {
        "id": "usa-1994-c34-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/55KaRoYBswcZdpJfgSaqqe",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c34-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kb6ro",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c34-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c34-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4YK6YT9twGXUk4YnFvaTOX",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c34-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c35",
    "officialMatchNumber": 35,
    "chronologicalIndex": 35,
    "date": "June 29, 1994",
    "kickoffOrder": 35,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Morocco",
    "awayTeam": "Netherlands",
    "venue": "Citrus Bowl, Orlando",
    "replaySources": [
      {
        "id": "usa-1994-c35-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4dG0ibZynW7kkZcagDYPin",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "usa-1994-c35-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c35-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4JoFaD9WKDcmr1oDG4R0ym",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c35-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c36",
    "officialMatchNumber": 36,
    "chronologicalIndex": 36,
    "date": "June 30, 1994",
    "kickoffOrder": 36,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Argentina",
    "awayTeam": "Bulgaria",
    "venue": "Cotton Bowl, Dallas",
    "replaySources": [
      {
        "id": "usa-1994-c36-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9jvcl2",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "usa-1994-c36-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c36-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6KEtmLSov69cCUcTSrDB2t",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c36-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c37",
    "officialMatchNumber": 37,
    "chronologicalIndex": 37,
    "date": "July 2, 1994",
    "kickoffOrder": 37,
    "stage": "Round of 16" as const,
    "homeTeam": "Germany",
    "awayTeam": "Belgium",
    "venue": "Soldier Field, Chicago",
    "editorial": {
      "journeyEpisodeId": "usa-1994-17",
      "journeySlot": 17
    },
    "replaySources": [
      {
        "id": "usa-1994-c37-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/k86eWgJv7a0WVMeLGRP4B",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c37-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kdnsg",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c37-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c37-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6hoTfMt9i7LujeQ6NzaZPN",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c37-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c38",
    "officialMatchNumber": 38,
    "chronologicalIndex": 38,
    "date": "July 2, 1994",
    "kickoffOrder": 38,
    "stage": "Round of 16" as const,
    "homeTeam": "Spain",
    "awayTeam": "Switzerland",
    "venue": "RFK Stadium, Washington",
    "editorial": {
      "journeyEpisodeId": "usa-1994-18",
      "journeySlot": 18
    },
    "replaySources": [
      {
        "id": "usa-1994-c38-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3IF2S8Fk3yg21wKjiQSchQ",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c38-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kfgb8",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c38-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c38-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4rtQMv0ESzC0pjzCl0gJJU",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c38-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c39",
    "officialMatchNumber": 39,
    "chronologicalIndex": 39,
    "date": "July 3, 1994",
    "kickoffOrder": 39,
    "stage": "Round of 16" as const,
    "homeTeam": "Saudi Arabia",
    "awayTeam": "Sweden",
    "venue": "Cotton Bowl, Dallas",
    "editorial": {
      "journeyEpisodeId": "usa-1994-19",
      "journeySlot": 19
    },
    "replaySources": [
      {
        "id": "usa-1994-c39-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1JZOsVsdDNUjBNtwKS2U1F",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c39-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kfwuc",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c39-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c39-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/36PJHw9PTbDhEYB5UNeWBx",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c39-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c40",
    "officialMatchNumber": 40,
    "chronologicalIndex": 40,
    "date": "July 3, 1994",
    "kickoffOrder": 40,
    "stage": "Round of 16" as const,
    "homeTeam": "Romania",
    "awayTeam": "Argentina",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-20",
      "journeySlot": 20
    },
    "replaySources": [
      {
        "id": "usa-1994-c40-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/50DpWNpSFuQ5ik6p9n2Xrd",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c40-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9khr56",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c40-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c40-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/fkN5NSEN5e6czwHatV9mL",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c40-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c41",
    "officialMatchNumber": 41,
    "chronologicalIndex": 41,
    "date": "July 4, 1994",
    "kickoffOrder": 41,
    "stage": "Round of 16" as const,
    "homeTeam": "Netherlands",
    "awayTeam": "Republic of Ireland",
    "venue": "Citrus Bowl, Orlando",
    "editorial": {
      "journeyEpisodeId": "usa-1994-21",
      "journeySlot": 21
    },
    "replaySources": [
      {
        "id": "usa-1994-c41-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/MxndnC55QWQfApwuY06n0",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c41-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kje8u",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c41-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c41-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5zBSfWmv9YWrDdHr5Vl4mo",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c41-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c42",
    "officialMatchNumber": 42,
    "chronologicalIndex": 42,
    "date": "July 4, 1994",
    "kickoffOrder": 42,
    "stage": "Round of 16" as const,
    "homeTeam": "Brazil",
    "awayTeam": "United States",
    "venue": "Stanford Stadium, Stanford",
    "editorial": {
      "journeyEpisodeId": "usa-1994-22",
      "journeySlot": 22
    },
    "replaySources": [
      {
        "id": "usa-1994-c42-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7zWFPsZVrydttekm2fn25M",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c42-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kkjh4",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c42-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c42-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2qKt4e9PKsCihAUtijryO8",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c42-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c43",
    "officialMatchNumber": 43,
    "chronologicalIndex": 43,
    "date": "July 5, 1994",
    "kickoffOrder": 43,
    "stage": "Round of 16" as const,
    "homeTeam": "Nigeria",
    "awayTeam": "Italy",
    "venue": "Foxboro Stadium, Foxborough",
    "editorial": {
      "journeyEpisodeId": "usa-1994-23",
      "journeySlot": 23
    },
    "replaySources": [
      {
        "id": "usa-1994-c43-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3wJSwjkzgYA82EnJD3yJUu",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c43-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kn130",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c43-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c43-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4iCRiAfpi0ZntPBPhqp0n4",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c43-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c44",
    "officialMatchNumber": 44,
    "chronologicalIndex": 44,
    "date": "July 5, 1994",
    "kickoffOrder": 44,
    "stage": "Round of 16" as const,
    "homeTeam": "Mexico",
    "awayTeam": "Bulgaria",
    "venue": "Giants Stadium, East Rutherford",
    "editorial": {
      "journeyEpisodeId": "usa-1994-24",
      "journeySlot": 24
    },
    "replaySources": [
      {
        "id": "usa-1994-c44-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3LQ5JxKfXYzxT2kLIYBFAf",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c44-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kqjzu",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c44-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c44-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6arrPyDjcxvFuLyuCdxpsD",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c44-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c45",
    "officialMatchNumber": 45,
    "chronologicalIndex": 45,
    "date": "July 9, 1994",
    "kickoffOrder": 45,
    "stage": "Quarter-final" as const,
    "homeTeam": "Italy",
    "awayTeam": "Spain",
    "venue": "Foxboro Stadium, Foxborough",
    "editorial": {
      "journeyEpisodeId": "usa-1994-25",
      "journeySlot": 25
    },
    "replaySources": [
      {
        "id": "usa-1994-c45-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1rRt2pAV6xGmYW9v5zvtoq",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c45-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ksn32",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c45-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c45-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3nZZ1euGzGe6Vh5EtANF8b",
        "status": "active",
        "packageKind": "extended-highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Extended highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c45-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c46",
    "officialMatchNumber": 46,
    "chronologicalIndex": 46,
    "date": "July 9, 1994",
    "kickoffOrder": 46,
    "stage": "Quarter-final" as const,
    "homeTeam": "Netherlands",
    "awayTeam": "Brazil",
    "venue": "Cotton Bowl, Dallas",
    "editorial": {
      "journeyEpisodeId": "usa-1994-26",
      "journeySlot": 26
    },
    "replaySources": [
      {
        "id": "usa-1994-c46-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3zT4IjsvIKHCId5WCxxnMX",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c46-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ku6ro",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c46-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c46-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1OINggfc2NuyBoGigT4Bt2",
        "status": "active",
        "packageKind": "extended-highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Extended highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c46-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c47",
    "officialMatchNumber": 47,
    "chronologicalIndex": 47,
    "date": "July 10, 1994",
    "kickoffOrder": 47,
    "stage": "Quarter-final" as const,
    "homeTeam": "Bulgaria",
    "awayTeam": "Germany",
    "venue": "Giants Stadium, East Rutherford",
    "editorial": {
      "journeyEpisodeId": "usa-1994-27",
      "journeySlot": 27
    },
    "replaySources": [
      {
        "id": "usa-1994-c47-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4tocGMHs2byq6ZPwUH1epe",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c47-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9kx414",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c47-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c47-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4coghu6zf00KTkL2Wxt3W6",
        "status": "active",
        "packageKind": "extended-highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Extended highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c47-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c48",
    "officialMatchNumber": 48,
    "chronologicalIndex": 48,
    "date": "July 10, 1994",
    "kickoffOrder": 48,
    "stage": "Quarter-final" as const,
    "homeTeam": "Romania",
    "awayTeam": "Sweden",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-28",
      "journeySlot": 28
    },
    "replaySources": [
      {
        "id": "usa-1994-c48-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7zGXJyLSjrhuwleToqymUw",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c48-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9l265e",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c48-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c48-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5kwrREcrMCS9N9ecvjSI1r",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c48-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c49",
    "officialMatchNumber": 49,
    "chronologicalIndex": 49,
    "date": "July 13, 1994",
    "kickoffOrder": 49,
    "stage": "Semi-final" as const,
    "homeTeam": "Bulgaria",
    "awayTeam": "Italy",
    "venue": "Giants Stadium, East Rutherford",
    "editorial": {
      "journeyEpisodeId": "usa-1994-29",
      "journeySlot": 29
    },
    "replaySources": [
      {
        "id": "usa-1994-c49-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6XTEGrIxWRjYFAm6cdHcXo",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "usa-1994-c49-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9l4nb0",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c49-src-1",
    "highlightSources": [
      {
        "id": "usa-1994-c49-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2mJY7xQeQlY07jGRSibkTg",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c49-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c50",
    "officialMatchNumber": 50,
    "chronologicalIndex": 50,
    "date": "July 13, 1994",
    "kickoffOrder": 50,
    "stage": "Semi-final" as const,
    "homeTeam": "Sweden",
    "awayTeam": "Brazil",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-30",
      "journeySlot": 30
    },
    "replaySources": [
      {
        "id": "usa-1994-c50-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5FshwWJhMxLvbxFtntYZPf",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c50-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9l4nay",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c50-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c50-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6laEkqinSAYpaGJQvROIfU",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c50-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c51",
    "officialMatchNumber": 51,
    "chronologicalIndex": 51,
    "date": "July 16, 1994",
    "kickoffOrder": 51,
    "stage": "Third-place play-off" as const,
    "homeTeam": "Sweden",
    "awayTeam": "Bulgaria",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-31",
      "journeySlot": 31
    },
    "replaySources": [
      {
        "id": "usa-1994-c51-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6fyDAuK4PxCC2NIyabqTxg",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c51-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9l75na",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c51-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c51-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/itz9GOGFzRbj7JwJSHxLS",
        "status": "active",
        "packageKind": "highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c51-hl-1"
  },
  {
    "tournamentId": "usa-1994",
    "canonicalMatchId": "usa-1994-c52",
    "officialMatchNumber": 52,
    "chronologicalIndex": 52,
    "date": "July 17, 1994",
    "kickoffOrder": 52,
    "stage": "Final" as const,
    "homeTeam": "Brazil",
    "awayTeam": "Italy",
    "venue": "Rose Bowl, Pasadena",
    "editorial": {
      "journeyEpisodeId": "usa-1994-32",
      "journeySlot": 32
    },
    "replaySources": [
      {
        "id": "usa-1994-c52-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5gHFVHGXu1z25dDe6id7TE",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T18:56:25.912Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "usa-1994-c52-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9l7piu",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-22",
          "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "usa-1994-c52-src-2",
    "highlightSources": [
      {
        "id": "usa-1994-c52-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3DVmRfaGYZahU0FaujCQuO",
        "status": "active",
        "packageKind": "extended-highlights" as const,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-27",
          "reason": "Extended highlights (FIFA); browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-27T00:53:20.297Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "usa-1994-c52-hl-1"
  }
];
