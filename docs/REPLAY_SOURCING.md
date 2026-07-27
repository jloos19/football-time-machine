# Replay sourcing standards

Editorial and technical standards for **Full Match** and **Highlights** sources in the Football Time Machine archive.

Do not move or refactor existing replay data solely to satisfy documentation. Catalogs and apply scripts remain the source of truth for imported URLs.

---

## Source priority

When choosing a production source for a match, prefer in this order:

1. Official extended highlights
2. Official FIFA or competition-owner highlights
3. Official federation or broadcaster
4. Verified YouTube source
5. Verified Dailymotion source

Source quality, completeness, geographic availability, and reliability may justify exceptions. Prefer a verified, geographically reliable source over a higher-ranked source that is incomplete, geo-blocked, or unstable.

Full Match selection remains independent of Highlights selection. Highlights never overwrite Full Match `replaySources` or `preferredSourceId`.

---

## Duplicates

- One **canonical Highlight** per match.
- When two otherwise equivalent official sources exist for the same match, prefer **Extended Highlights** over standard Highlights.
- Do not present multiple nearly identical Highlight options to users.
- Preserve alternate-source information only if the current data model explicitly supports internal backups (non-production / superseded notes). Do not invent parallel user-facing Highlight CTAs.

Example (Korea/Japan 2002 — Portugal vs Korea Republic): the Extended Highlights URL is canonical; the shorter standard Highlights URL is rejected as a duplicate.

---

## User-facing labels

Use only:

- **Full Match**
- **Highlights**

Do not expose technical subtype names (`Extended Highlights`, provider brand strings, “Official FIFA Highlights”) in the main CTA. Provider and package subtype stay in metadata (`provider`, `packageKind`, notes).

When Highlights are unavailable for a match, do not render a dead or disabled viewing button.

---

## Metadata

Retain where supported:

- provider
- media type / package kind (`highlights` | `extended-highlights`)
- subtype / notes distinguishing standard vs extended packages
- official status (`officialSource`) where known
- URL
- canonical match ID
- verification status (human + automated) where supported
- last-checked date where supported

Canonical Highlight resolution must be identical across journeys (The Story, The Essentials, Follow a Team, Every Match).

---

## Spoiler safety

- Do not surface source titles containing scores.
- Do not expose spoiler-heavy thumbnails where avoidable.
- Do not reveal outcomes through button labels, metadata, alt text, or accessibility labels.
- Opening Full Match or Highlights must not automatically mark the match complete.

---

## Validation

Apply catalogs and CI/tests should enforce:

- Every imported URL maps to exactly one canonical match.
- Highlights never overwrite Full Match sources.
- Duplicate URLs are rejected within a tournament highlights catalog.
- Unsupported matches do not display dead Highlights buttons.
- The same canonical media appears across every journey.
- Provider-specific advisories (for example Dailymotion recommendations) remain driven by Full Match provider metadata and stay correct after Highlights imports.

Coverage is tracked in `reports/highlights-coverage.md`.
