import type { CanonicalMatch } from "../types";

export const koreaJapan2002Matches: CanonicalMatch[] = [
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c01",
    "officialMatchNumber": 1,
    "chronologicalIndex": 1,
    "date": "May 31, 2002",
    "kickoffOrder": 1,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "France",
    "awayTeam": "Senegal",
    "venue": "Seoul World Cup Stadium, Seoul",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-01",
      "journeySlot": 1
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c01-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4lukFIaiPvOB4f04xBstBP",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c01-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c01-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/liuB6SSFkgYJ5uwpV3cDD",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c01-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c02",
    "officialMatchNumber": 2,
    "chronologicalIndex": 2,
    "date": "June 1, 2002",
    "kickoffOrder": 2,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Republic of Ireland",
    "awayTeam": "Cameroon",
    "venue": "Niigata Stadium Big Swan, Niigata",
    "replaySources": [
      {
        "id": "korea-japan-2002-c02-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9stnnm",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c02-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c02-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2YrXyDeWEfgMBpa9CN8k5E",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c02-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c03",
    "officialMatchNumber": 3,
    "chronologicalIndex": 3,
    "date": "June 1, 2002",
    "kickoffOrder": 3,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Uruguay",
    "awayTeam": "Denmark",
    "venue": "Munsu Cup Stadium, Ulsan",
    "replaySources": [
      {
        "id": "korea-japan-2002-c03-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/11G7o01ws5UiAhl1qp4XeM",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c03-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s4tpa",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c03-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c04",
    "officialMatchNumber": 4,
    "chronologicalIndex": 4,
    "date": "June 1, 2002",
    "kickoffOrder": 4,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Germany",
    "awayTeam": "Saudi Arabia",
    "venue": "Sapporo Dome, Sapporo",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-02",
      "journeySlot": 2
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c04-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6jcnIkFBBHPaxQe6Qw0EsD",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c04-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c05",
    "officialMatchNumber": 5,
    "chronologicalIndex": 5,
    "date": "June 2, 2002",
    "kickoffOrder": 5,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Argentina",
    "awayTeam": "Nigeria",
    "venue": "Kashima Soccer Stadium, Kashima",
    "replaySources": [
      {
        "id": "korea-japan-2002-c05-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9t20dm",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c05-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c06",
    "officialMatchNumber": 6,
    "chronologicalIndex": 6,
    "date": "June 2, 2002",
    "kickoffOrder": 6,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "England",
    "awayTeam": "Sweden",
    "venue": "Saitama Stadium 2002, Saitama",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-03",
      "journeySlot": 3
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c06-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9t2uae",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c06-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c07",
    "officialMatchNumber": 7,
    "chronologicalIndex": 7,
    "date": "June 2, 2002",
    "kickoffOrder": 7,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Paraguay",
    "awayTeam": "South Africa",
    "venue": "Busan Asiad Stadium, Busan",
    "replaySources": [
      {
        "id": "korea-japan-2002-c07-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6NNFWjsPV6HutFOzSWqe0A",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c07-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s6u9i",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c07-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c08",
    "officialMatchNumber": 8,
    "chronologicalIndex": 8,
    "date": "June 2, 2002",
    "kickoffOrder": 8,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Spain",
    "awayTeam": "Slovenia",
    "venue": "Gwangju World Cup Stadium, Gwangju",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-04",
      "journeySlot": 4
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c08-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4rFRiAEqek0DdwgeHfITAe",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c08-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/spain-v-slovenia-group-b-2002-fifa-world-cup-korea-japan-full-match-replay/cbeb864a-24a2-4edb-a177-0a280be7c2b7",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c08-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c08-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4RIMdhcYlI4RWqBsSNlbcC",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c08-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c09",
    "officialMatchNumber": 9,
    "chronologicalIndex": 9,
    "date": "June 3, 2002",
    "kickoffOrder": 9,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Croatia",
    "awayTeam": "Mexico",
    "venue": "Niigata Stadium Big Swan, Niigata",
    "replaySources": [
      {
        "id": "korea-japan-2002-c09-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1P2Yrbl64m61LYFULz0WGC",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c09-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tara4",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c09-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c10",
    "officialMatchNumber": 10,
    "chronologicalIndex": 10,
    "date": "June 3, 2002",
    "kickoffOrder": 10,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Italy",
    "awayTeam": "Ecuador",
    "venue": "Sapporo Dome, Sapporo",
    "replaySources": [
      {
        "id": "korea-japan-2002-c10-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/KZ8ZXpJVWOisObxsn6H9p",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c10-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tara6",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c10-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c11",
    "officialMatchNumber": 11,
    "chronologicalIndex": 11,
    "date": "June 3, 2002",
    "kickoffOrder": 11,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Brazil",
    "awayTeam": "Turkey",
    "venue": "Munsu Cup Stadium, Ulsan",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-05",
      "journeySlot": 5
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c11-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sagca",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c11-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c12",
    "officialMatchNumber": 12,
    "chronologicalIndex": 12,
    "date": "June 4, 2002",
    "kickoffOrder": 12,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Korea Republic",
    "awayTeam": "Poland",
    "venue": "Busan Asiad Stadium, Busan",
    "replaySources": [
      {
        "id": "korea-japan-2002-c12-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4iKbzGJbrKzv2HrcXOwxZp",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c12-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9so8yq",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c12-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c13",
    "officialMatchNumber": 13,
    "chronologicalIndex": 13,
    "date": "June 4, 2002",
    "kickoffOrder": 13,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Japan",
    "awayTeam": "Belgium",
    "venue": "Saitama Stadium 2002, Saitama",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-06",
      "journeySlot": 6
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c13-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2ahortgetZfB3GvsgDiF0i",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c13-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c13-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3tXmLnx5iNmlWnvbBlWZEv",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c13-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c14",
    "officialMatchNumber": 14,
    "chronologicalIndex": 14,
    "date": "June 4, 2002",
    "kickoffOrder": 14,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "China",
    "awayTeam": "Costa Rica",
    "venue": "Gwangju World Cup Stadium, Gwangju",
    "replaySources": [
      {
        "id": "korea-japan-2002-c14-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sbbbi",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c14-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c15",
    "officialMatchNumber": 15,
    "chronologicalIndex": 15,
    "date": "June 5, 2002",
    "kickoffOrder": 15,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Russia",
    "awayTeam": "Tunisia",
    "venue": "Kobe Wing Stadium, Kobe",
    "replaySources": [
      {
        "id": "korea-japan-2002-c15-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/50ylH4o6VokFehdPsCJW5d",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c15-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tgh6y",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c15-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c15-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7d3arnsUbwJS0Kl9ByFesw",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c15-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c16",
    "officialMatchNumber": 16,
    "chronologicalIndex": 16,
    "date": "June 5, 2002",
    "kickoffOrder": 16,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "United States",
    "awayTeam": "Portugal",
    "venue": "Suwon World Cup Stadium, Suwon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-07",
      "journeySlot": 7
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c16-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2vNcEdDQS8P2cbHfWTjKgB",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c16-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9spaey",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c16-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c16-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/44DSnhaY4tK0bjvAyqKBIf",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c16-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c17",
    "officialMatchNumber": 17,
    "chronologicalIndex": 17,
    "date": "June 5, 2002",
    "kickoffOrder": 17,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Germany",
    "awayTeam": "Republic of Ireland",
    "venue": "Kashima Soccer Stadium, Kashima",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-08",
      "journeySlot": 8
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c17-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5evG61kw2iKliahIRUzLDt",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c17-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-republic-of-ireland-group-e-2002-fifa-world-cup-korea-japantm-full-match-replay/82b77ce9-f33a-4964-ad09-0a87646a847c",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c17-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c17-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7Bl7iGjE6EgVlsGw8f1DD3",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c17-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c18",
    "officialMatchNumber": 18,
    "chronologicalIndex": 18,
    "date": "June 6, 2002",
    "kickoffOrder": 18,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Cameroon",
    "awayTeam": "Saudi Arabia",
    "venue": "Saitama Stadium 2002, Saitama",
    "replaySources": [
      {
        "id": "korea-japan-2002-c18-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9svilm",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c18-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c19",
    "officialMatchNumber": 19,
    "chronologicalIndex": 19,
    "date": "June 6, 2002",
    "kickoffOrder": 19,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Denmark",
    "awayTeam": "Senegal",
    "venue": "Daegu World Cup Stadium, Daegu",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-09",
      "journeySlot": 9
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c19-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s55uc",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c19-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c20",
    "officialMatchNumber": 20,
    "chronologicalIndex": 20,
    "date": "June 6, 2002",
    "kickoffOrder": 20,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "France",
    "awayTeam": "Uruguay",
    "venue": "Busan Asiad Stadium, Busan",
    "replaySources": [
      {
        "id": "korea-japan-2002-c20-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/BDUDWO2aDi5iQbmda3VB5",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c20-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s4yfa",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c20-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c21",
    "officialMatchNumber": 21,
    "chronologicalIndex": 21,
    "date": "June 7, 2002",
    "kickoffOrder": 21,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Sweden",
    "awayTeam": "Nigeria",
    "venue": "Kobe Wing Stadium, Kobe",
    "replaySources": [
      {
        "id": "korea-japan-2002-c21-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9t421c",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c21-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c22",
    "officialMatchNumber": 22,
    "chronologicalIndex": 22,
    "date": "June 7, 2002",
    "kickoffOrder": 22,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Spain",
    "awayTeam": "Paraguay",
    "venue": "Jeonju World Cup Stadium, Jeonju",
    "replaySources": [
      {
        "id": "korea-japan-2002-c22-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2hlEeOmtGnQW4TUE5QwvlX",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c22-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s7tpi",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c22-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c22-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5X25YRrRVkdElu8BI5aoM7",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c22-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c23",
    "officialMatchNumber": 23,
    "chronologicalIndex": 23,
    "date": "June 7, 2002",
    "kickoffOrder": 23,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Argentina",
    "awayTeam": "England",
    "venue": "Sapporo Dome, Sapporo",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-10",
      "journeySlot": 10
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c23-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/42yJdehvlrbGsp8vZ4QX5I",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c23-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9t421e",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c23-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c23-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/17SOa0EZTaD8SRIXBU4fxy",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c23-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c24",
    "officialMatchNumber": 24,
    "chronologicalIndex": 24,
    "date": "June 8, 2002",
    "kickoffOrder": 24,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "South Africa",
    "awayTeam": "Slovenia",
    "venue": "Daegu World Cup Stadium, Daegu",
    "replaySources": [
      {
        "id": "korea-japan-2002-c24-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/south-africa-v-slovenia-group-b-2002-fifa-world-cup-korea-japan-full-match-replay/64768a09-9cfc-49a0-be0e-b5819ea95941",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c24-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s8tay",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c24-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c24-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4nJ1L9ktIJRRppj0fJGICx",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c24-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c25",
    "officialMatchNumber": 25,
    "chronologicalIndex": 25,
    "date": "June 8, 2002",
    "kickoffOrder": 25,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Italy",
    "awayTeam": "Croatia",
    "venue": "Kashima Soccer Stadium, Kashima",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-11",
      "journeySlot": 11
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c25-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3pZ2LhaYsLfRqNV8zeYTMT",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c25-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tc3p0",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c25-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c26",
    "officialMatchNumber": 26,
    "chronologicalIndex": 26,
    "date": "June 8, 2002",
    "kickoffOrder": 26,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Brazil",
    "awayTeam": "China",
    "venue": "Jeju World Cup Stadium, Seogwipo",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-12",
      "journeySlot": 12
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c26-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/16GazlzIs23qfWKmSv8F1j",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c26-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sbzbu",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c26-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c27",
    "officialMatchNumber": 27,
    "chronologicalIndex": 27,
    "date": "June 9, 2002",
    "kickoffOrder": 27,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Costa Rica",
    "awayTeam": "Turkey",
    "venue": "Incheon Munhak Stadium, Incheon",
    "replaySources": [
      {
        "id": "korea-japan-2002-c27-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sec6m",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c27-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c28",
    "officialMatchNumber": 28,
    "chronologicalIndex": 28,
    "date": "June 9, 2002",
    "kickoffOrder": 28,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Mexico",
    "awayTeam": "Ecuador",
    "venue": "Miyagi Stadium, Rifu",
    "replaySources": [
      {
        "id": "korea-japan-2002-c28-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7LogaCXzFr3UH0VoufxmiI",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c28-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c29",
    "officialMatchNumber": 29,
    "chronologicalIndex": 29,
    "date": "June 9, 2002",
    "kickoffOrder": 29,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Japan",
    "awayTeam": "Russia",
    "venue": "International Stadium Yokohama, Yokohama",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-13",
      "journeySlot": 13
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c29-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tikaa",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c29-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c30",
    "officialMatchNumber": 30,
    "chronologicalIndex": 30,
    "date": "June 10, 2002",
    "kickoffOrder": 30,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Tunisia",
    "awayTeam": "Belgium",
    "venue": "Ōita Stadium, Ōita",
    "replaySources": [
      {
        "id": "korea-japan-2002-c30-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tika8",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c30-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c31",
    "officialMatchNumber": 31,
    "chronologicalIndex": 31,
    "date": "June 10, 2002",
    "kickoffOrder": 31,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Korea Republic",
    "awayTeam": "United States",
    "venue": "Daegu World Cup Stadium, Daegu",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-14",
      "journeySlot": 14
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c31-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1Iljl47YAxbPVsVHpN8MgH",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c31-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sqhz4",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c31-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c31-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2DBd3JHoQgWRrGwfQrKSe4",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c31-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c32",
    "officialMatchNumber": 32,
    "chronologicalIndex": 32,
    "date": "June 10, 2002",
    "kickoffOrder": 32,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Portugal",
    "awayTeam": "Poland",
    "venue": "Jeonju World Cup Stadium, Jeonju",
    "replaySources": [
      {
        "id": "korea-japan-2002-c32-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9srgrc",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c32-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c32-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4SDutyDM84tlEzwcgpCd3",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c32-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c33",
    "officialMatchNumber": 33,
    "chronologicalIndex": 33,
    "date": "June 11, 2002",
    "kickoffOrder": 33,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Denmark",
    "awayTeam": "France",
    "venue": "Incheon Munhak Stadium, Incheon",
    "replaySources": [
      {
        "id": "korea-japan-2002-c33-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7AzcQTj0qe7OylczMoWziF",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c33-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c33-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2zwDu6VNddBg8WiEqtB9Tx",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c33-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c34",
    "officialMatchNumber": 34,
    "chronologicalIndex": 34,
    "date": "June 11, 2002",
    "kickoffOrder": 34,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Senegal",
    "awayTeam": "Uruguay",
    "venue": "Suwon World Cup Stadium, Suwon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-15",
      "journeySlot": 15
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c34-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2itxTaB9DWOEbKkgR7Fnit",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c34-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s59js",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c34-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c35",
    "officialMatchNumber": 35,
    "chronologicalIndex": 35,
    "date": "June 11, 2002",
    "kickoffOrder": 35,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Cameroon",
    "awayTeam": "Germany",
    "venue": "Shizuoka Stadium Ecopa, Fukuroi",
    "replaySources": [
      {
        "id": "korea-japan-2002-c35-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9swuiq",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c35-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c36",
    "officialMatchNumber": 36,
    "chronologicalIndex": 36,
    "date": "June 11, 2002",
    "kickoffOrder": 36,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Saudi Arabia",
    "awayTeam": "Republic of Ireland",
    "venue": "International Stadium Yokohama, Yokohama",
    "replaySources": [
      {
        "id": "korea-japan-2002-c36-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9swvzk",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c36-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c36-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6vtIzG7GoV8H7DX2ENNW2j",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c36-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c37",
    "officialMatchNumber": 37,
    "chronologicalIndex": 37,
    "date": "June 12, 2002",
    "kickoffOrder": 37,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Sweden",
    "awayTeam": "Argentina",
    "venue": "Miyagi Stadium, Rifu",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-16",
      "journeySlot": 16
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c37-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1SjEx59cHjumPvGf1fPQBS",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c37-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c38",
    "officialMatchNumber": 38,
    "chronologicalIndex": 38,
    "date": "June 12, 2002",
    "kickoffOrder": 38,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Nigeria",
    "awayTeam": "England",
    "venue": "Nagai Stadium, Osaka",
    "replaySources": [
      {
        "id": "korea-japan-2002-c38-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5s4Ultrki50M04ZPVUsaYY",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c38-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9t652o",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c38-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c39",
    "officialMatchNumber": 39,
    "chronologicalIndex": 39,
    "date": "June 12, 2002",
    "kickoffOrder": 39,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "South Africa",
    "awayTeam": "Spain",
    "venue": "Daejeon World Cup Stadium, Daejeon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-17",
      "journeySlot": 17
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c39-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/Y024o0GHOzaHa9086s3Kv",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "korea-japan-2002-c39-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s8yra",
        "status": "active",
        "fullMatch": true,
        "officialSource": false,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c39-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c39-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5Il5BOo7RMUKB7MydNZ7KI",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c39-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c40",
    "officialMatchNumber": 40,
    "chronologicalIndex": 40,
    "date": "June 12, 2002",
    "kickoffOrder": 40,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Slovenia",
    "awayTeam": "Paraguay",
    "venue": "Jeju World Cup Stadium, Seogwipo",
    "replaySources": [
      {
        "id": "korea-japan-2002-c40-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9s9mqa",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c40-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c41",
    "officialMatchNumber": 41,
    "chronologicalIndex": 41,
    "date": "June 13, 2002",
    "kickoffOrder": 41,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Costa Rica",
    "awayTeam": "Brazil",
    "venue": "Suwon World Cup Stadium, Suwon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-18",
      "journeySlot": 18
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c41-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6RLBlXY74YOI6TQCF3fnrU",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c41-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sgx7e",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c41-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c42",
    "officialMatchNumber": 42,
    "chronologicalIndex": 42,
    "date": "June 13, 2002",
    "kickoffOrder": 42,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Turkey",
    "awayTeam": "China",
    "venue": "Seoul World Cup Stadium, Seoul",
    "replaySources": [
      {
        "id": "korea-japan-2002-c42-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7iuf7wyWSEucxxBtM0E3cW",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c42-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9sionu",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c42-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c43",
    "officialMatchNumber": 43,
    "chronologicalIndex": 43,
    "date": "June 13, 2002",
    "kickoffOrder": 43,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Mexico",
    "awayTeam": "Italy",
    "venue": "Ōita Stadium, Ōita",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-19",
      "journeySlot": 19
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c43-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5vxNRapHZEmogKWETXkucf",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c43-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c44",
    "officialMatchNumber": 44,
    "chronologicalIndex": 44,
    "date": "June 13, 2002",
    "kickoffOrder": 44,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Ecuador",
    "awayTeam": "Croatia",
    "venue": "International Stadium Yokohama, Yokohama",
    "replaySources": [
      {
        "id": "korea-japan-2002-c44-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/21yfqZAVHmQsgEhrSxH3L0",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c44-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/ecuador-v-croatia-group-g-2002-fifa-world-cup-korea-japan-full-match-replay/ce947005-b1e2-4e39-9cf4-f75df764099a",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c44-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c45",
    "officialMatchNumber": 45,
    "chronologicalIndex": 45,
    "date": "June 14, 2002",
    "kickoffOrder": 45,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Portugal",
    "awayTeam": "Korea Republic",
    "venue": "Incheon Munhak Stadium, Incheon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-20",
      "journeySlot": 20
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c45-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ssnae",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c45-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c45-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1SC9AxIloIjyTrcQNrj3Og",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c45-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c46",
    "officialMatchNumber": 46,
    "chronologicalIndex": 46,
    "date": "June 14, 2002",
    "kickoffOrder": 46,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Poland",
    "awayTeam": "United States",
    "venue": "Daejeon World Cup Stadium, Daejeon",
    "replaySources": [
      {
        "id": "korea-japan-2002-c46-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ssqja",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c46-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c46-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7Hvw71RS0hjavYc7u8oGZx",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c46-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c47",
    "officialMatchNumber": 47,
    "chronologicalIndex": 47,
    "date": "June 14, 2002",
    "kickoffOrder": 47,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Tunisia",
    "awayTeam": "Japan",
    "venue": "Nagai Stadium, Osaka",
    "replaySources": [
      {
        "id": "korea-japan-2002-c47-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tkzdm",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match",
        "officialSource": false
      }
    ],
    "preferredSourceId": "korea-japan-2002-c47-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c48",
    "officialMatchNumber": 48,
    "chronologicalIndex": 48,
    "date": "June 14, 2002",
    "kickoffOrder": 48,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Belgium",
    "awayTeam": "Russia",
    "venue": "Shizuoka Stadium Ecopa, Fukuroi",
    "replaySources": [
      {
        "id": "korea-japan-2002-c48-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/WvhQebcNN60CKq8iUrK5I",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c48-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tkzdo",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c48-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    }
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c49",
    "officialMatchNumber": 49,
    "chronologicalIndex": 49,
    "date": "June 15, 2002",
    "kickoffOrder": 49,
    "stage": "Round of 16" as const,
    "homeTeam": "Germany",
    "awayTeam": "Paraguay",
    "venue": "Jeju World Cup Stadium, Seogwipo",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-21",
      "journeySlot": 21
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c49-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/56Xm3gPPyi4ZgRTbE5A9Nc",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c49-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-paraguay-round-of-16-2002-fifa-world-cup-korea-japan-full-match-replay/6494856d-5180-44f7-99f8-8e9b9a5793d8",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c49-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c49-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3LXJydL3jSlJ5qf1xsvmDY",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c49-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c50",
    "officialMatchNumber": 50,
    "chronologicalIndex": 50,
    "date": "June 15, 2002",
    "kickoffOrder": 50,
    "stage": "Round of 16" as const,
    "homeTeam": "Denmark",
    "awayTeam": "England",
    "venue": "Niigata Stadium Big Swan, Niigata",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-22",
      "journeySlot": 22
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c50-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7MmrEoV3T0uMzjGee7yrzb",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c50-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/denmark-v-england-round-of-16-2002-fifa-world-cup-korea-japan-full-match-replay/b4ecdf79-8e85-48aa-ae9f-be6d8ad81cbe",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c50-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c50-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1NYYfh9o9AEyCrs3t3FDiR",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c50-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c51",
    "officialMatchNumber": 51,
    "chronologicalIndex": 51,
    "date": "June 16, 2002",
    "kickoffOrder": 51,
    "stage": "Round of 16" as const,
    "homeTeam": "Sweden",
    "awayTeam": "Senegal",
    "venue": "Ōita Stadium, Ōita",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-23",
      "journeySlot": 23
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c51-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/36HaieT6v2mazyBTHMjpOa",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c51-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tpcz8",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c51-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c51-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3ydrZpAFrtkkWrcBORVcz5",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c51-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c52",
    "officialMatchNumber": 52,
    "chronologicalIndex": 52,
    "date": "June 16, 2002",
    "kickoffOrder": 52,
    "stage": "Round of 16" as const,
    "homeTeam": "Spain",
    "awayTeam": "Republic of Ireland",
    "venue": "Suwon World Cup Stadium, Suwon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-24",
      "journeySlot": 24
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c52-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/JO7B0D6NHU4EyqOqCUNMH",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c52-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tpwha",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c52-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c52-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/69mfZhVvz2xN11gk7uaclH",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c52-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c53",
    "officialMatchNumber": 53,
    "chronologicalIndex": 53,
    "date": "June 17, 2002",
    "kickoffOrder": 53,
    "stage": "Round of 16" as const,
    "homeTeam": "Mexico",
    "awayTeam": "United States",
    "venue": "Jeonju World Cup Stadium, Jeonju",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-25",
      "journeySlot": 25
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c53-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/QoixmsLb9WHynRWJmuliC",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c53-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tt1jg",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c53-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c53-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6fYxrAaL2ceE3kwgoOa3TV",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c53-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c54",
    "officialMatchNumber": 54,
    "chronologicalIndex": 54,
    "date": "June 17, 2002",
    "kickoffOrder": 54,
    "stage": "Round of 16" as const,
    "homeTeam": "Brazil",
    "awayTeam": "Belgium",
    "venue": "Kobe Wing Stadium, Kobe",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-26",
      "journeySlot": 26
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c54-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1IWpc9gHbkjgUAGxe17dLF",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c54-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9tt1je",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c54-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c54-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1OFSxqeyK05xM6BBWMuNiA",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c54-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c55",
    "officialMatchNumber": 55,
    "chronologicalIndex": 55,
    "date": "June 18, 2002",
    "kickoffOrder": 55,
    "stage": "Round of 16" as const,
    "homeTeam": "Japan",
    "awayTeam": "Turkey",
    "venue": "Miyagi Stadium, Rifu",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-27",
      "journeySlot": 27
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c55-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7mNR0e3KJGMPlkmQXDcfom",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c55-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9twel4",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c55-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c55-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4qelFbks06aujS9Y64MnOi",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c55-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c56",
    "officialMatchNumber": 56,
    "chronologicalIndex": 56,
    "date": "June 18, 2002",
    "kickoffOrder": 56,
    "stage": "Round of 16" as const,
    "homeTeam": "Korea Republic",
    "awayTeam": "Italy",
    "venue": "Daejeon World Cup Stadium, Daejeon",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-28",
      "journeySlot": 28
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c56-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/dM6C3d5oNWofPVa95jAmH",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c56-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9txcms",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c56-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c56-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3Ie3xqHN6It2iQg9NPCyZp",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Extended highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Extended highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c56-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c57",
    "officialMatchNumber": 57,
    "chronologicalIndex": 57,
    "date": "June 21, 2002",
    "kickoffOrder": 57,
    "stage": "Quarter-final" as const,
    "homeTeam": "England",
    "awayTeam": "Brazil",
    "venue": "Shizuoka Stadium Ecopa, Fukuroi",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-29",
      "journeySlot": 29
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c57-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4bjlpImpXFEgWf4q6sDjiJ",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c57-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c57-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7zLNWgf5PYwqwnQHmXtx0G",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c57-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c58",
    "officialMatchNumber": 58,
    "chronologicalIndex": 58,
    "date": "June 21, 2002",
    "kickoffOrder": 58,
    "stage": "Quarter-final" as const,
    "homeTeam": "Germany",
    "awayTeam": "United States",
    "venue": "Munsu Cup Stadium, Ulsan",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-30",
      "journeySlot": 30
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c58-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/a2hCq9TQIcynl79M1TxA3",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c58-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-usa-quarter-finals-2002-fifa-world-cup-korea-japantm-full-match-replay/0039dd74-366e-49a8-83f6-8fe880bb2e2e",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c58-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c58-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1rbgHn5tPS4DjDtp0wu6qP",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c58-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c59",
    "officialMatchNumber": 59,
    "chronologicalIndex": 59,
    "date": "June 22, 2002",
    "kickoffOrder": 59,
    "stage": "Quarter-final" as const,
    "homeTeam": "Spain",
    "awayTeam": "Korea Republic",
    "venue": "Gwangju World Cup Stadium, Gwangju",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-31",
      "journeySlot": 31
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c59-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/jyx3DXmgIlOs0dkYWki6e",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c59-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c59-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1wy510yzqXQQnfLGDIEuqM",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c59-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c60",
    "officialMatchNumber": 60,
    "chronologicalIndex": 60,
    "date": "June 22, 2002",
    "kickoffOrder": 60,
    "stage": "Quarter-final" as const,
    "homeTeam": "Senegal",
    "awayTeam": "Turkey",
    "venue": "Nagai Stadium, Osaka",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-32",
      "journeySlot": 32
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c60-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4PQn5Li60KiNxzMr3vY5go",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c60-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/senegal-v-turkey-quarter-finals-2002-fifa-world-cup-korea-japan-full-match-replay/f34f1bf8-901b-47d5-b3f2-9f04ff82eda6",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c60-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c60-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/iMFyvC9s0NfZBeo1DNyUR",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c60-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c61",
    "officialMatchNumber": 61,
    "chronologicalIndex": 61,
    "date": "June 25, 2002",
    "kickoffOrder": 61,
    "stage": "Semi-final" as const,
    "homeTeam": "Germany",
    "awayTeam": "Korea Republic",
    "venue": "Seoul World Cup Stadium, Seoul",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-33",
      "journeySlot": 33
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c61-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3aD2fq6v1PdpYng46gVw1q",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "korea-japan-2002-c61-src-1",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c61-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4nz68YFC1c6VSDcCz5ey7Y",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c61-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c62",
    "officialMatchNumber": 62,
    "chronologicalIndex": 62,
    "date": "June 26, 2002",
    "kickoffOrder": 62,
    "stage": "Semi-final" as const,
    "homeTeam": "Brazil",
    "awayTeam": "Turkey",
    "venue": "Saitama Stadium 2002, Saitama",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-34",
      "journeySlot": 34
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c62-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6CXSGSmU0SpkBdxCAUihzn",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c62-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/brazil-v-turkey-semi-finals-2002-fifa-world-cup-korea-japan-full-match-replay/4b837a2e-5fbf-49b4-965b-4ddbef3ddcb0",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c62-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c62-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4gNlpr5WAwNjTBuD6xNcTa",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c62-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c63",
    "officialMatchNumber": 63,
    "chronologicalIndex": 63,
    "date": "June 29, 2002",
    "kickoffOrder": 63,
    "stage": "Third-place play-off" as const,
    "homeTeam": "Korea Republic",
    "awayTeam": "Turkey",
    "venue": "Daegu World Cup Stadium, Daegu",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-35",
      "journeySlot": 35
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c63-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3Uat184CMK6BaaDK0kGElA",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c63-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9u6v46",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Human-verified Dailymotion full-match; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c63-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c63-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5v4IuPCfHf4xswGX3vSHZD",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c63-hl-1"
  },
  {
    "tournamentId": "korea-japan-2002",
    "canonicalMatchId": "korea-japan-2002-c64",
    "officialMatchNumber": 64,
    "chronologicalIndex": 64,
    "date": "June 30, 2002",
    "kickoffOrder": 64,
    "stage": "Final" as const,
    "homeTeam": "Germany",
    "awayTeam": "Brazil",
    "venue": "International Stadium Yokohama, Yokohama",
    "editorial": {
      "journeyEpisodeId": "korea-japan-2002-36",
      "journeySlot": 36
    },
    "replaySources": [
      {
        "id": "korea-japan-2002-c64-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/ktLWtLQTqnIfzU2unVBsx",
        "status": "active",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:15:13.587Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "korea-japan-2002-c64-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-brazil-final-2002-fifa-world-cup-korea-japan-full-match-replay/203e79a9-acf8-494c-a175-b0d2e00fd809",
        "status": "needs-review",
        "fullMatch": true,
        "officialSource": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-25",
          "reason": "Official FIFA full-match replay; browser-extracted manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-25T15:00:00.000Z",
          "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "korea-japan-2002-c64-src-2",
    "qaState": {
      "hasHumanVerifiedFullMatch": true,
      "productionReady": true
    },
    "highlightSources": [
      {
        "id": "korea-japan-2002-c64-hl-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2t5caS1C0fMww1ndh81gj",
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
          "verifiedAt": "2026-07-27T02:01:08.536Z",
          "notes": "Highlights (FIFA) (browser-extracted manual curation)"
        },
        "notes": "Highlights (FIFA)"
      }
    ],
    "preferredHighlightSourceId": "korea-japan-2002-c64-hl-1"
  }
];
