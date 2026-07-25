import type { CanonicalMatch } from "../types";

export const france1998Matches: CanonicalMatch[] = [
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c01",
    "officialMatchNumber": 1,
    "chronologicalIndex": 1,
    "date": "June 10, 1998",
    "kickoffOrder": 1,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Brazil",
    "awayTeam": "Scotland",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-01",
      "journeySlot": 1
    },
    "replaySources": [
      {
        "id": "france-1998-c01-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4RUVF7D8UD04p7QIGUe8H2",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c01-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/brazil-v-scotland-group-a-1998-fifa-world-cup-francetm-full-match-replay/27ae811e-3652-4cc9-a80a-b7976af5edf3",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c01-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9p4zji",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T11:55:06.765Z",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c01-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c02",
    "officialMatchNumber": 2,
    "chronologicalIndex": 2,
    "date": "June 10, 1998",
    "kickoffOrder": 2,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Morocco",
    "awayTeam": "Norway",
    "venue": "Stade de la Mosson, Montpellier",
    "editorial": {
      "journeyEpisodeId": "france-1998-02",
      "journeySlot": 2
    },
    "replaySources": [
      {
        "id": "france-1998-c02-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/59lNV8tJ1xPnOUGGvefNNx",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c02-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5a0",
        "status": "private",
        "fullMatch": true,
        "automatedCheck": {
          "status": "private",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned HTTP 401 — video is private or access-restricted",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "untested"
        },
        "notes": "Dailymotion returns a private-video page; excluded from replay options. (oEmbed returned HTTP 401 — video is private or access-restricted)"
      }
    ],
    "preferredSourceId": "france-1998-c02-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c03",
    "officialMatchNumber": 3,
    "chronologicalIndex": 3,
    "date": "June 11, 1998",
    "kickoffOrder": 3,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Italy",
    "awayTeam": "Chile",
    "venue": "Parc Lescure, Bordeaux",
    "replaySources": [
      {
        "id": "france-1998-c03-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3L33SlaJ1PzGG0G8LgvSiA",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c03-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5bc",
        "status": "dead",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Dailymotion replay deleted; ineligible for production."
        },
        "notes": "Dailymotion replay deleted; ineligible for production."
      },
      {
        "id": "france-1998-c03-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pewiw",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c03-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c04",
    "officialMatchNumber": 4,
    "chronologicalIndex": 4,
    "date": "June 11, 1998",
    "kickoffOrder": 4,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Cameroon",
    "awayTeam": "Austria",
    "venue": "Stade de Toulouse, Toulouse",
    "replaySources": [
      {
        "id": "france-1998-c04-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2YGNRNLyRHPjB8WSJG87Az",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c04-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5d4",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c04-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c05",
    "officialMatchNumber": 5,
    "chronologicalIndex": 5,
    "date": "June 12, 1998",
    "kickoffOrder": 5,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Paraguay",
    "awayTeam": "Bulgaria",
    "venue": "Stade de la Mosson, Montpellier",
    "replaySources": [
      {
        "id": "france-1998-c05-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/175EZCRtu2gQybIZGVNzUU",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c05-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5e8",
        "status": "wrong-match",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Dailymotion replay is the incorrect match; ineligible for production."
        },
        "notes": "Dailymotion replay is the incorrect match; ineligible for production."
      },
      {
        "id": "france-1998-c05-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ptcz8",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c05-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c06",
    "officialMatchNumber": 6,
    "chronologicalIndex": 6,
    "date": "June 12, 1998",
    "kickoffOrder": 6,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "France",
    "awayTeam": "South Africa",
    "venue": "Stade Vélodrome, Marseille",
    "replaySources": [
      {
        "id": "france-1998-c06-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4GT0NNKD7f3yVhAlwckPVH",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c06-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5r0",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      },
      {
        "id": "france-1998-c06-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pmglg",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c06-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c07",
    "officialMatchNumber": 7,
    "chronologicalIndex": 7,
    "date": "June 13, 1998",
    "kickoffOrder": 7,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "South Korea",
    "awayTeam": "Mexico",
    "venue": "Stade Vélodrome, Marseille",
    "replaySources": [
      {
        "id": "france-1998-c07-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/Z0QmgpPZeGY91nmQOlwhB",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c07-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5h6",
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
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c07-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9q0k0q",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c07-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c08",
    "officialMatchNumber": 8,
    "chronologicalIndex": 8,
    "date": "June 13, 1998",
    "kickoffOrder": 8,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Netherlands",
    "awayTeam": "Belgium",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c08-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/7lFaXa1aBy22zVdjTHW3yk",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c08-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5j0",
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
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c08-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9q0k0o",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Netherlands vs Belgium — Group E Dailymotion full-match curated for Journey rebalance."
      }
    ],
    "preferredSourceId": "france-1998-c08-src-3",
    "editorial": {
      "journeyEpisodeId": "france-1998-03",
      "journeySlot": 3
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c09",
    "officialMatchNumber": 9,
    "chronologicalIndex": 9,
    "date": "June 13, 1998",
    "kickoffOrder": 9,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Spain",
    "awayTeam": "Nigeria",
    "venue": "Stade de la Beaujoire, Nantes",
    "replaySources": [
      {
        "id": "france-1998-c09-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5yqsXahmn0hwVh1ugfH9Xl",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c09-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9ptcza",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Spain vs Nigeria — Group D Dailymotion full-match curated for Journey (FIFA catalog does not include this fixture).",
        "officialSource": false
      }
    ],
    "preferredSourceId": "france-1998-c09-src-2",
    "editorial": {
      "journeyEpisodeId": "france-1998-04",
      "journeySlot": 4
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c10",
    "officialMatchNumber": 10,
    "chronologicalIndex": 10,
    "date": "June 14, 1998",
    "kickoffOrder": 10,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Yugoslavia",
    "awayTeam": "Iran",
    "venue": "Stade Geoffroy-Guichard, Saint-Étienne",
    "replaySources": [
      {
        "id": "france-1998-c10-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4rUgTS9xVU3RGa7dg4disD",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c10-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5k4",
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
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c10-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9q8oc8",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c10-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c11",
    "officialMatchNumber": 11,
    "chronologicalIndex": 11,
    "date": "June 14, 1998",
    "kickoffOrder": 11,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Croatia",
    "awayTeam": "Jamaica",
    "venue": "Stade Félix-Bollaert, Lens",
    "editorial": {
      "journeyEpisodeId": "france-1998-05",
      "journeySlot": 5
    },
    "replaySources": [
      {
        "id": "france-1998-c11-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3ZpiU8Tfa1OmV3EAlG6S3D",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c11-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9quitu",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c11-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c12",
    "officialMatchNumber": 12,
    "chronologicalIndex": 12,
    "date": "June 14, 1998",
    "kickoffOrder": 12,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Argentina",
    "awayTeam": "Japan",
    "venue": "Stade de Toulouse, Toulouse",
    "replaySources": [
      {
        "id": "france-1998-c12-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2NoUOjQoOn4O7DQ37rIkqf",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c12-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5s4",
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
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c12-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9quitw",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c12-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c13",
    "officialMatchNumber": 13,
    "chronologicalIndex": 13,
    "date": "June 15, 1998",
    "kickoffOrder": 13,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Romania",
    "awayTeam": "Colombia",
    "venue": "Stade de Gerland, Lyon",
    "replaySources": [
      {
        "id": "france-1998-c13-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qk9a0",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c13-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c14",
    "officialMatchNumber": 14,
    "chronologicalIndex": 14,
    "date": "June 15, 1998",
    "kickoffOrder": 14,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "England",
    "awayTeam": "Tunisia",
    "venue": "Stade Vélodrome, Marseille",
    "replaySources": [
      {
        "id": "france-1998-c14-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4NkEe8toMjTJTQlmvYchfs",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay confirmed via stage archive curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c14-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5p6",
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
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c14-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qk9a2",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c14-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c15",
    "officialMatchNumber": 15,
    "chronologicalIndex": 15,
    "date": "June 15, 1998",
    "kickoffOrder": 15,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Germany",
    "awayTeam": "United States",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c15-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-usa-group-f-1998-fifa-world-cup-france-full-match-replay/59df21a1-8c73-4ea0-8b14-499e93c8bfe8",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c15-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9q8oca",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Germany vs United States — Group F Dailymotion full-match curated for Journey (FIFA catalog does not include this fixture).",
        "officialSource": false
      }
    ],
    "preferredSourceId": "france-1998-c15-src-1",
    "editorial": {
      "journeyEpisodeId": "france-1998-06",
      "journeySlot": 6
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c16",
    "officialMatchNumber": 16,
    "chronologicalIndex": 16,
    "date": "June 16, 1998",
    "kickoffOrder": 16,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Scotland",
    "awayTeam": "Norway",
    "venue": "Stade Félix-Bollaert, Lens",
    "replaySources": [
      {
        "id": "france-1998-c16-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6hoJwta10lKzNEgXGAiI7l",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "france-1998-c16-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c17",
    "officialMatchNumber": 17,
    "chronologicalIndex": 17,
    "date": "June 16, 1998",
    "kickoffOrder": 17,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Brazil",
    "awayTeam": "Morocco",
    "venue": "Stade de la Beaujoire, Nantes",
    "replaySources": [
      {
        "id": "france-1998-c17-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/brazil-v-morocco-group-a-1998-fifa-world-cup-france-full-match-replay/9636f802-cc45-43a9-9f2e-855473b09952",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c17-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9p5w4q",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c17-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c18",
    "officialMatchNumber": 18,
    "chronologicalIndex": 18,
    "date": "June 17, 1998",
    "kickoffOrder": 18,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Chile",
    "awayTeam": "Austria",
    "venue": "Stade Geoffroy-Guichard, Saint-Étienne",
    "replaySources": [
      {
        "id": "france-1998-c18-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/16JV1hWTJ88rPHujtzQ19t",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c18-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/chile-v-austria-group-b-1998-fifa-world-cup-france-full-match-replay/bc6096ce-ffdd-44b0-a763-8aa9d1891e2b",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay resolved from stage archive / content page",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c18-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c19",
    "officialMatchNumber": 19,
    "chronologicalIndex": 19,
    "date": "June 17, 1998",
    "kickoffOrder": 19,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Italy",
    "awayTeam": "Cameroon",
    "venue": "Stade de la Mosson, Montpellier",
    "replaySources": [
      {
        "id": "france-1998-c19-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/OnpgMwBE8IfvBhN4FD2ij",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c19-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/italy-v-cameroon-group-b-1998-fifa-world-cup-francetm-full-match-replay/0c6c58d1-0afd-4429-9cf1-dfd98ed8d501",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay resolved from stage archive / content page",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c19-src-2",
    "editorial": {
      "journeyEpisodeId": "france-1998-07",
      "journeySlot": 7
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c20",
    "officialMatchNumber": 20,
    "chronologicalIndex": 20,
    "date": "June 18, 1998",
    "kickoffOrder": 20,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "South Africa",
    "awayTeam": "Saudi Arabia",
    "venue": "Stade de France, Saint-Denis",
    "replaySources": [
      {
        "id": "france-1998-c20-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/45eQVR6TSIw3y73arjAQ4D",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c20-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/fr/content/afrique-du-sud-arabie-saoudite-groupe-c-coupe-du-monde-de-la-fifa-france-1998-match-complet/f0c7c8b9-3c96-4e99-b05e-b334e71dec6a",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay resolved from stage archive / content page",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c20-src-2",
    "editorial": {
      "journeyEpisodeId": "france-1998-08",
      "journeySlot": 8
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c21",
    "officialMatchNumber": 21,
    "chronologicalIndex": 21,
    "date": "June 18, 1998",
    "kickoffOrder": 21,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "France",
    "awayTeam": "Denmark",
    "venue": "Stade Félix-Bollaert, Lens",
    "editorial": {
      "journeyEpisodeId": "france-1998-09",
      "journeySlot": 9
    },
    "replaySources": [
      {
        "id": "france-1998-c21-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1wUVci179rFNW5g005r31j",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c21-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/france-v-denmark-group-c-1998-fifa-world-cup-francetm-full-match-replay/a0b78086-fd13-4c91-bcf1-d4b7981623d0",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c21-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq590",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c21-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c22",
    "officialMatchNumber": 22,
    "chronologicalIndex": 22,
    "date": "June 19, 1998",
    "kickoffOrder": 22,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Mexico",
    "awayTeam": "Belgium",
    "venue": "Parc Lescure, Bordeaux",
    "replaySources": [
      {
        "id": "france-1998-c22-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5Jl1o4mTJyaG2iQGC6h4H0",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      }
    ],
    "preferredSourceId": "france-1998-c22-src-1",
    "editorial": {
      "journeyEpisodeId": "france-1998-10",
      "journeySlot": 10
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c23",
    "officialMatchNumber": 23,
    "chronologicalIndex": 23,
    "date": "June 19, 1998",
    "kickoffOrder": 23,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Nigeria",
    "awayTeam": "Bulgaria",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c23-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/nigeria-v-bulgaria-group-d-1998-fifa-world-cup-france-full-match-replay/127bbb7d-476f-4c36-b57e-de8b8c2fa913",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c23-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9puhqs",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c23-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c24",
    "officialMatchNumber": 24,
    "chronologicalIndex": 24,
    "date": "June 20, 1998",
    "kickoffOrder": 24,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "South Korea",
    "awayTeam": "Netherlands",
    "venue": "Stade Félix-Bollaert, Lens",
    "replaySources": [
      {
        "id": "france-1998-c24-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4Edn6NBcKCsGaTMFIl3MWe",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c24-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/fr/content/pays-bas-republique-de-coree-groupe-e-coupe-du-monde-de-la-fifa-france-1998-match-complet/90812110-12ff-4dfc-9def-1b52dbeafed8",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c24-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c25",
    "officialMatchNumber": 25,
    "chronologicalIndex": 25,
    "date": "June 20, 1998",
    "kickoffOrder": 25,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Spain",
    "awayTeam": "Paraguay",
    "venue": "Stade Geoffroy-Guichard, Saint-Étienne",
    "replaySources": [
      {
        "id": "france-1998-c25-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9puhqu",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Spain vs Paraguay — Group D Dailymotion full-match curated for Journey rebalance."
      }
    ],
    "preferredSourceId": "france-1998-c25-src-1",
    "editorial": {
      "journeyEpisodeId": "france-1998-11",
      "journeySlot": 11
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c26",
    "officialMatchNumber": 26,
    "chronologicalIndex": 26,
    "date": "June 21, 1998",
    "kickoffOrder": 26,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Iran",
    "awayTeam": "United States",
    "venue": "Stade de Gerland, Lyon",
    "replaySources": [
      {
        "id": "france-1998-c26-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/usa-v-ir-iran-group-matches-1998-fifa-world-cup-france-full-match-replay/743dcc35-3f50-4454-9875-a07b0089d18d",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c26-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qayg4",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "United States vs Iran — Group F Dailymotion full-match curated for Journey rebalance."
      }
    ],
    "preferredSourceId": "france-1998-c26-src-2",
    "editorial": {
      "journeyEpisodeId": "france-1998-12",
      "journeySlot": 12
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c27",
    "officialMatchNumber": 27,
    "chronologicalIndex": 27,
    "date": "June 21, 1998",
    "kickoffOrder": 27,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Germany",
    "awayTeam": "Yugoslavia",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c27-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qayg6",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c27-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c28",
    "officialMatchNumber": 28,
    "chronologicalIndex": 28,
    "date": "June 21, 1998",
    "kickoffOrder": 28,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Japan",
    "awayTeam": "Jamaica",
    "venue": "Stade de Toulouse, Toulouse",
    "replaySources": [
      {
        "id": "france-1998-c28-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3u4zQnKwvKKAH2kN0qWGO8",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c28-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/fr/content/japon-jamaique-groupe-h-coupe-du-monde-de-la-fifa-france-1998-match-complet/47fd643c-b797-4ae4-8350-6f7546c96c5a",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c28-src-2",
    "editorial": {
      "journeyEpisodeId": "france-1998-13",
      "journeySlot": 13
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c29",
    "officialMatchNumber": 29,
    "chronologicalIndex": 29,
    "date": "June 21, 1998",
    "kickoffOrder": 29,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Argentina",
    "awayTeam": "Croatia",
    "venue": "Stade Chaban-Delmas, Bordeaux",
    "editorial": {
      "journeyEpisodeId": "france-1998-14",
      "journeySlot": 14
    },
    "replaySources": [
      {
        "id": "france-1998-c29-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6rKfoYVxQEGwoZXyNFRLAh",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c29-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5y6",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c29-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c30",
    "officialMatchNumber": 30,
    "chronologicalIndex": 30,
    "date": "June 22, 1998",
    "kickoffOrder": 30,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Colombia",
    "awayTeam": "Tunisia",
    "venue": "Stade de la Mosson, Montpellier",
    "replaySources": [
      {
        "id": "france-1998-c30-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qlig2",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c30-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c31",
    "officialMatchNumber": 31,
    "chronologicalIndex": 31,
    "date": "June 22, 1998",
    "kickoffOrder": 31,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Romania",
    "awayTeam": "England",
    "venue": "Stade Félix-Bollaert, Lens",
    "replaySources": [
      {
        "id": "france-1998-c31-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qlig4",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Romania vs England — Group G Dailymotion full-match curated for Journey rebalance."
      }
    ],
    "preferredSourceId": "france-1998-c31-src-1",
    "editorial": {
      "journeyEpisodeId": "france-1998-15",
      "journeySlot": 15
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c32",
    "officialMatchNumber": 32,
    "chronologicalIndex": 32,
    "date": "June 23, 1998",
    "kickoffOrder": 32,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Brazil",
    "awayTeam": "Norway",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-16",
      "journeySlot": 16
    },
    "replaySources": [
      {
        "id": "france-1998-c32-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5k0Xi6ils4gMkk5D0y43nl",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c32-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/brazil-v-norway-group-a-1998-fifa-world-cup-france-full-match-replay/54e0f958-88e0-4bda-9137-eddfad8f57db",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c32-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5u8",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c32-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c33",
    "officialMatchNumber": 33,
    "chronologicalIndex": 33,
    "date": "June 23, 1998",
    "kickoffOrder": 33,
    "stage": "Group Stage" as const,
    "group": "A",
    "homeTeam": "Scotland",
    "awayTeam": "Morocco",
    "venue": "Stade Geoffroy-Guichard, Saint-Étienne",
    "replaySources": [
      {
        "id": "france-1998-c33-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9p6s2q",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c33-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c34",
    "officialMatchNumber": 34,
    "chronologicalIndex": 34,
    "date": "June 23, 1998",
    "kickoffOrder": 34,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Italy",
    "awayTeam": "Austria",
    "venue": "Stade de France, Saint-Denis",
    "replaySources": [
      {
        "id": "france-1998-c34-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1J2DpipotxHPO3fysAIZfY",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      }
    ],
    "preferredSourceId": "france-1998-c34-src-1",
    "editorial": {
      "journeyEpisodeId": "france-1998-17",
      "journeySlot": 17
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c35",
    "officialMatchNumber": 35,
    "chronologicalIndex": 35,
    "date": "June 23, 1998",
    "kickoffOrder": 35,
    "stage": "Group Stage" as const,
    "group": "B",
    "homeTeam": "Chile",
    "awayTeam": "Cameroon",
    "venue": "Stade de la Beaujoire, Nantes",
    "replaySources": [
      {
        "id": "france-1998-c35-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5aJQ3zCbizQpVKWJ4ATs2B",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      }
    ],
    "preferredSourceId": "france-1998-c35-src-1",
    "editorial": {
      "journeyEpisodeId": "france-1998-18",
      "journeySlot": 18
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c36",
    "officialMatchNumber": 36,
    "chronologicalIndex": 36,
    "date": "June 24, 1998",
    "kickoffOrder": 36,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "France",
    "awayTeam": "Saudi Arabia",
    "venue": "Stade de la Beaujoire, Nantes",
    "replaySources": [
      {
        "id": "france-1998-c36-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1mEQyorSBLOgTtFsIpxvgM",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c36-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/france-v-saudi-arabia-group-c-1998-fifa-world-cup-france-full-match-replay/9f846ff3-636c-463c-9894-a9abbd22c837",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c36-src-2",
    "editorial": {
      "journeyEpisodeId": "france-1998-19",
      "journeySlot": 19
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c37",
    "officialMatchNumber": 37,
    "chronologicalIndex": 37,
    "date": "June 24, 1998",
    "kickoffOrder": 37,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "South Africa",
    "awayTeam": "Denmark",
    "venue": "Stade de Toulouse, Toulouse",
    "replaySources": [
      {
        "id": "france-1998-c37-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/DjpLRvdqJC4oU44vOnx7n",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "france-1998-c37-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c38",
    "officialMatchNumber": 38,
    "chronologicalIndex": 38,
    "date": "June 24, 1998",
    "kickoffOrder": 38,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Nigeria",
    "awayTeam": "Paraguay",
    "venue": "Stade de la Mosson, Montpellier",
    "replaySources": [
      {
        "id": "france-1998-c38-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/34fCbVnn91GaTuQOMHGsYG",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c38-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq5w2",
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
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c38-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pwea8",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c38-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c39",
    "officialMatchNumber": 39,
    "chronologicalIndex": 39,
    "date": "June 24, 1998",
    "kickoffOrder": 39,
    "stage": "Group Stage" as const,
    "group": "D",
    "homeTeam": "Spain",
    "awayTeam": "Bulgaria",
    "venue": "Stade Félix-Bollaert, Lens",
    "replaySources": [
      {
        "id": "france-1998-c39-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/spain-v-bulgaria-group-d-1998-fifa-world-cup-france-full-match-replay/a54ce115-7c77-4e9e-bb4d-e0fe010c6757",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay resolved from stage archive / content page",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c39-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pwea6",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c39-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c40",
    "officialMatchNumber": 40,
    "chronologicalIndex": 40,
    "date": "June 25, 1998",
    "kickoffOrder": 40,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Netherlands",
    "awayTeam": "Mexico",
    "venue": "Stade Geoffroy-Guichard, Saint-Étienne",
    "replaySources": [
      {
        "id": "france-1998-c40-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9q48be",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c40-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c41",
    "officialMatchNumber": 41,
    "chronologicalIndex": 41,
    "date": "June 25, 1998",
    "kickoffOrder": 41,
    "stage": "Group Stage" as const,
    "group": "E",
    "homeTeam": "Belgium",
    "awayTeam": "South Korea",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c41-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/belgium-v-korea-republic-group-e-1998-fifa-world-cup-france-full-match-replay/fa5367a7-e509-4e07-b022-ee18ac2a685c",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c41-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9q48bc",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c41-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c42",
    "officialMatchNumber": 42,
    "chronologicalIndex": 42,
    "date": "June 25, 1998",
    "kickoffOrder": 42,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "Germany",
    "awayTeam": "Iran",
    "venue": "Stade de la Mosson, Montpellier",
    "replaySources": [
      {
        "id": "france-1998-c42-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq600",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Dailymotion response was inconclusive — manual review required"
      },
      {
        "id": "france-1998-c42-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qdcq8",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c42-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c43",
    "officialMatchNumber": 43,
    "chronologicalIndex": 43,
    "date": "June 25, 1998",
    "kickoffOrder": 43,
    "stage": "Group Stage" as const,
    "group": "F",
    "homeTeam": "United States",
    "awayTeam": "Yugoslavia",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c43-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qdcqa",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c43-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c44",
    "officialMatchNumber": 44,
    "chronologicalIndex": 44,
    "date": "June 26, 1998",
    "kickoffOrder": 44,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Colombia",
    "awayTeam": "England",
    "venue": "Stade Félix-Bollaert, Lens",
    "replaySources": [
      {
        "id": "france-1998-c44-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3I7eTkvmjuRfrOLymQHjU4",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c44-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq614",
        "status": "wrong-match",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T11:59:44.521Z",
          "notes": "Marked as wrong match."
        },
        "notes": "oEmbed returned playable metadata with a title"
      },
      {
        "id": "france-1998-c44-src-3",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9qpz3c",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Colombia vs England — Group G Dailymotion full-match curated for Journey rebalance."
      }
    ],
    "preferredSourceId": "france-1998-c44-src-3",
    "editorial": {
      "journeyEpisodeId": "france-1998-20",
      "journeySlot": 20
    }
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c45",
    "officialMatchNumber": 45,
    "chronologicalIndex": 45,
    "date": "June 26, 1998",
    "kickoffOrder": 45,
    "stage": "Group Stage" as const,
    "group": "G",
    "homeTeam": "Romania",
    "awayTeam": "Tunisia",
    "venue": "Stade de la Beaujoire, Nantes",
    "replaySources": [
      {
        "id": "france-1998-c45-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/xlvUXa7KL0L87197omqDL",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c45-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/romania-v-tunisia-group-g-1998-fifa-world-cup-france-full-match-replay/e3b11af3-82ca-45d6-a906-81a8e37f1155",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by manually curated Complete Tournament full-match URL; not production-selectable."
        },
        "notes": "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only."
      }
    ],
    "preferredSourceId": "france-1998-c45-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c46",
    "officialMatchNumber": 46,
    "chronologicalIndex": 46,
    "date": "June 26, 1998",
    "kickoffOrder": 46,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Argentina",
    "awayTeam": "Jamaica",
    "venue": "Parc des Princes, Paris",
    "replaySources": [
      {
        "id": "france-1998-c46-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2a9bZOvDxGRVdh7b6ERJtG",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "france-1998-c46-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c47",
    "officialMatchNumber": 47,
    "chronologicalIndex": 47,
    "date": "June 26, 1998",
    "kickoffOrder": 47,
    "stage": "Group Stage" as const,
    "group": "H",
    "homeTeam": "Japan",
    "awayTeam": "Croatia",
    "venue": "Stade de la Beaujoire, Nantes",
    "replaySources": [
      {
        "id": "france-1998-c47-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/4ue6x6cbkn45E3Sk6dn5HS",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      }
    ],
    "preferredSourceId": "france-1998-c47-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c48",
    "officialMatchNumber": 49,
    "chronologicalIndex": 48,
    "date": "June 27, 1998",
    "kickoffOrder": 48,
    "stage": "Round of 16" as const,
    "homeTeam": "Italy",
    "awayTeam": "Norway",
    "venue": "Stade Vélodrome, Marseille",
    "editorial": {
      "journeyEpisodeId": "france-1998-21",
      "journeySlot": 21
    },
    "replaySources": [
      {
        "id": "france-1998-c48-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/1DYHMnH9VqAxKNELNLZcEq",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c48-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq628",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c48-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c49",
    "officialMatchNumber": 50,
    "chronologicalIndex": 49,
    "date": "June 27, 1998",
    "kickoffOrder": 49,
    "stage": "Round of 16" as const,
    "homeTeam": "Brazil",
    "awayTeam": "Chile",
    "venue": "Parc des Princes, Paris",
    "editorial": {
      "journeyEpisodeId": "france-1998-22",
      "journeySlot": 22
    },
    "replaySources": [
      {
        "id": "france-1998-c49-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6rBQuV3GbFJoBNDTfvVS3F",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c49-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq63c",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c49-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c50",
    "officialMatchNumber": 48,
    "chronologicalIndex": 50,
    "date": "June 28, 1998",
    "kickoffOrder": 50,
    "stage": "Group Stage" as const,
    "group": "C",
    "homeTeam": "Denmark",
    "awayTeam": "Saudi Arabia",
    "venue": "Stade Félix-Bollaert, Lens",
    "replaySources": [
      {
        "id": "france-1998-c50-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pmgfi",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Human-verified Dailymotion full-match (manual curation)"
        },
        "notes": "Curated Complete Tournament Dailymotion full-match"
      }
    ],
    "preferredSourceId": "france-1998-c50-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c51",
    "officialMatchNumber": 51,
    "chronologicalIndex": 51,
    "date": "June 28, 1998",
    "kickoffOrder": 51,
    "stage": "Round of 16" as const,
    "homeTeam": "France",
    "awayTeam": "Paraguay",
    "venue": "Stade Félix-Bollaert, Lens",
    "editorial": {
      "journeyEpisodeId": "france-1998-23",
      "journeySlot": 23
    },
    "replaySources": [
      {
        "id": "france-1998-c51-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3A0xomr21iD9hflEWfeURt",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c51-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq64g",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c51-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c52",
    "officialMatchNumber": 52,
    "chronologicalIndex": 52,
    "date": "June 28, 1998",
    "kickoffOrder": 52,
    "stage": "Round of 16" as const,
    "homeTeam": "Nigeria",
    "awayTeam": "Denmark",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-24",
      "journeySlot": 24
    },
    "replaySources": [
      {
        "id": "france-1998-c52-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/6Km4DpzMKPVVqYgvr3gE8u",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c52-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/nigeria-v-denmark-round-of-16-1998-fifa-world-cup-france-full-match-replay/37367a2f-8563-4058-b845-53d52106a55a",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c52-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq664",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T12:00:16.673Z"
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c52-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c53",
    "officialMatchNumber": 53,
    "chronologicalIndex": 53,
    "date": "June 29, 1998",
    "kickoffOrder": 53,
    "stage": "Round of 16" as const,
    "homeTeam": "Germany",
    "awayTeam": "Mexico",
    "venue": "Stade de la Mosson, Montpellier",
    "editorial": {
      "journeyEpisodeId": "france-1998-25",
      "journeySlot": 25
    },
    "replaySources": [
      {
        "id": "france-1998-c53-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2UiXCqJptcMsVwDkTg4jAj",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c53-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-mexico-round-of-16-1998-fifa-world-cup-france-full-match-replay/e2fcd93a-07a7-418b-a3ad-a33a4992f874",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c53-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq678",
        "status": "wrong-match",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T12:00:29.954Z",
          "notes": "Marked as wrong match."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c53-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c54",
    "officialMatchNumber": 54,
    "chronologicalIndex": 54,
    "date": "June 29, 1998",
    "kickoffOrder": 54,
    "stage": "Round of 16" as const,
    "homeTeam": "Netherlands",
    "awayTeam": "Yugoslavia",
    "venue": "Stade de Toulouse, Toulouse",
    "editorial": {
      "journeyEpisodeId": "france-1998-26",
      "journeySlot": 26
    },
    "replaySources": [
      {
        "id": "france-1998-c54-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/2N01CI1tixOVzWFb4Rlxus",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c54-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq68c",
        "status": "private",
        "fullMatch": true,
        "automatedCheck": {
          "status": "private",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned HTTP 401 — video is private or access-restricted",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "untested"
        },
        "notes": "Dailymotion returns a private-video page; excluded from replay options. (oEmbed returned HTTP 401 — video is private or access-restricted)"
      }
    ],
    "preferredSourceId": "france-1998-c54-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c55",
    "officialMatchNumber": 55,
    "chronologicalIndex": 55,
    "date": "June 30, 1998",
    "kickoffOrder": 55,
    "stage": "Round of 16" as const,
    "homeTeam": "Romania",
    "awayTeam": "Croatia",
    "venue": "Stade Chaban-Delmas, Bordeaux",
    "editorial": {
      "journeyEpisodeId": "france-1998-27",
      "journeySlot": 27
    },
    "replaySources": [
      {
        "id": "france-1998-c55-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3wjPh9efgiPyV8WwBIpLRi",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c55-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq69g",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c55-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c56",
    "officialMatchNumber": 56,
    "chronologicalIndex": 56,
    "date": "June 30, 1998",
    "kickoffOrder": 56,
    "stage": "Round of 16" as const,
    "homeTeam": "Argentina",
    "awayTeam": "England",
    "venue": "Stade Geoffroy-Guichard, Saint-Étienne",
    "editorial": {
      "journeyEpisodeId": "france-1998-28",
      "journeySlot": 28
    },
    "replaySources": [
      {
        "id": "france-1998-c56-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/3GI371qzcZMaWfckfvevpH",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c56-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6ak",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "needs-review",
          "lastChecked": "2026-07-22",
          "reason": "Continuation URL failed: Dailymotion response was inconclusive — manual review required"
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "Continuation URL failed: Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c56-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c57",
    "officialMatchNumber": 57,
    "chronologicalIndex": 57,
    "date": "July 3, 1998",
    "kickoffOrder": 57,
    "stage": "Quarter-final" as const,
    "homeTeam": "Italy",
    "awayTeam": "France",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-29",
      "journeySlot": 29
    },
    "replaySources": [
      {
        "id": "france-1998-c57-src-1",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/d9cmdDTQ1cjI5qkgLmMXs",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c57-src-2",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6c4",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "untested"
        },
        "notes": "Continuation URL failed: oEmbed returned HTTP 401 — video is private or access-restricted"
      }
    ],
    "preferredSourceId": "france-1998-c57-src-1"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c58",
    "officialMatchNumber": 58,
    "chronologicalIndex": 58,
    "date": "July 3, 1998",
    "kickoffOrder": 58,
    "stage": "Quarter-final" as const,
    "homeTeam": "Brazil",
    "awayTeam": "Denmark",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-30",
      "journeySlot": 30
    },
    "replaySources": [
      {
        "id": "france-1998-c58-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/71qGDOrBb3Uaip7stHN5iv",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c58-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/brazil-v-denmark-quarter-finals-1998-fifa-world-cup-france-full-match-replay/8661e612-cec4-4feb-b2df-d741c97792d3",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c58-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6ec",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c58-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c59",
    "officialMatchNumber": 59,
    "chronologicalIndex": 59,
    "date": "July 4, 1998",
    "kickoffOrder": 59,
    "stage": "Quarter-final" as const,
    "homeTeam": "Netherlands",
    "awayTeam": "Argentina",
    "venue": "Stade Vélodrome, Marseille",
    "editorial": {
      "journeyEpisodeId": "france-1998-31",
      "journeySlot": 31
    },
    "replaySources": [
      {
        "id": "france-1998-c59-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/F2WJFEcD7KAeRZMjeBzlR",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c59-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/netherlands-v-argentina-quarter-finals-1998-fifa-world-cup-france-full-match-replay/a2dea5fe-2fe3-4841-8e12-f75174ce75a2",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c59-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6fg",
        "status": "wrong-match",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T12:00:55.056Z",
          "notes": "Marked as wrong match."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c59-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c60",
    "officialMatchNumber": 60,
    "chronologicalIndex": 60,
    "date": "July 4, 1998",
    "kickoffOrder": 60,
    "stage": "Quarter-final" as const,
    "homeTeam": "Germany",
    "awayTeam": "Croatia",
    "venue": "Stade de Gerland, Lyon",
    "editorial": {
      "journeyEpisodeId": "france-1998-32",
      "journeySlot": 32
    },
    "replaySources": [
      {
        "id": "france-1998-c60-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/GF61Ogtlj4589D7l2gDlC",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c60-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/germany-v-croatia-quarter-finals-1998-fifa-world-cup-france-full-match-replay/dcf1f07c-8351-4fab-bcfd-e2241e852b7e",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c60-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6gk",
        "status": "wrong-match",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T12:01:03.676Z",
          "notes": "Marked as wrong match."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c60-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c61",
    "officialMatchNumber": 61,
    "chronologicalIndex": 61,
    "date": "July 7, 1998",
    "kickoffOrder": 61,
    "stage": "Semi-final" as const,
    "homeTeam": "Brazil",
    "awayTeam": "Netherlands",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-33",
      "journeySlot": 33
    },
    "replaySources": [
      {
        "id": "france-1998-c61-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/495Zo9RWtcADL0vvcw8AjL",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay",
        "officialSource": true
      },
      {
        "id": "france-1998-c61-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6ho",
        "status": "dead",
        "fullMatch": true,
        "automatedCheck": {
          "status": "dead",
          "lastChecked": "2026-07-24",
          "reason": "Superseded by official FIFA full-match replay; prior source failed human verification",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "manual-curation",
          "verifiedAt": "2026-07-24T03:11:52.201Z",
          "notes": "Failed historical Dailymotion source preserved; ineligible for production after FIFA repair"
        },
        "notes": "Continuation URL failed: Dailymotion response was inconclusive — manual review required"
      }
    ],
    "preferredSourceId": "france-1998-c61-src-2"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c62",
    "officialMatchNumber": 62,
    "chronologicalIndex": 62,
    "date": "July 8, 1998",
    "kickoffOrder": 62,
    "stage": "Semi-final" as const,
    "homeTeam": "France",
    "awayTeam": "Croatia",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-34",
      "journeySlot": 34
    },
    "replaySources": [
      {
        "id": "france-1998-c62-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/5DNg9CqGKSxGMYKb5mFG0K",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c62-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/france-v-croatia-semi-finals-1998-fifa-world-cup-francetm-full-match-replay/51718dd9-1b24-4c96-a7b4-7fe3d47d1411",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c62-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9rmkvm",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c62-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c63",
    "officialMatchNumber": 63,
    "chronologicalIndex": 63,
    "date": "July 11, 1998",
    "kickoffOrder": 63,
    "stage": "Third-place play-off" as const,
    "homeTeam": "Netherlands",
    "awayTeam": "Croatia",
    "venue": "Parc des Princes, Paris",
    "editorial": {
      "journeyEpisodeId": "france-1998-35",
      "journeySlot": 35
    },
    "replaySources": [
      {
        "id": "france-1998-c63-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/25dkYKAN7LWtFyzKQb3aRc",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c63-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/netherlands-v-croatia-play-off-for-third-place-1998-fifa-world-cup-francetm-full-match-replay/eff5dbe0-9c56-43ae-b6d8-1cc5ef287872",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c63-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9pq6k8",
        "status": "wrong-match",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "replay-qa-dashboard",
          "verifiedAt": "2026-07-23T12:01:46.012Z",
          "notes": "Marked as wrong match."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c63-src-3"
  },
  {
    "tournamentId": "france-1998",
    "canonicalMatchId": "france-1998-c64",
    "officialMatchNumber": 64,
    "chronologicalIndex": 64,
    "date": "July 12, 1998",
    "kickoffOrder": 64,
    "stage": "Final" as const,
    "homeTeam": "Brazil",
    "awayTeam": "France",
    "venue": "Stade de France, Saint-Denis",
    "editorial": {
      "journeyEpisodeId": "france-1998-36",
      "journeySlot": 36
    },
    "replaySources": [
      {
        "id": "france-1998-c64-src-3",
        "provider": "FIFA" as const,
        "url": "https://www.fifa.com/en/watch/8ZvjzOYODw13FFUp0D4Gv",
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
          "verifiedAt": "2026-07-24T18:08:42.846Z",
          "notes": "Official FIFA full-match replay (browser-extracted manual curation)"
        },
        "notes": "Official FIFA full-match replay"
      },
      {
        "id": "france-1998-c64-src-2",
        "provider": "FIFA" as const,
        "url": "https://www.plus.fifa.com/en/content/brazil-v-france-final-1998-fifa-world-cup-france-full-match-replay/2262d3ba-4bd2-4757-985c-cd163f148c25",
        "status": "needs-review",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-24",
          "reason": "Official FIFA full-match replay; manual curation",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "failed",
          "verifiedBy": "browser-extracted-manual-curation",
          "verifiedAt": "2026-07-24T03:31:03.344Z",
          "notes": "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable."
        },
        "notes": "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only."
      },
      {
        "id": "france-1998-c64-src-1",
        "provider": "Dailymotion" as const,
        "url": "https://www.dailymotion.com/video/x9rmp16",
        "status": "active",
        "fullMatch": true,
        "automatedCheck": {
          "status": "ok",
          "lastChecked": "2026-07-22",
          "reason": "oEmbed returned playable metadata with a title",
          "recheckRecommended": false
        },
        "humanVerification": {
          "status": "verified",
          "verifiedBy": "archive-migration",
          "verifiedAt": "2026-07-22",
          "notes": "Restored from replay audit report."
        },
        "notes": "oEmbed returned playable metadata with a title"
      }
    ],
    "preferredSourceId": "france-1998-c64-src-3"
  }
];
