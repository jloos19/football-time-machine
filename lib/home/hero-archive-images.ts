/**
 * Spoiler-safe homepage hero archive imagery.
 * Fragments of football history — never tournament poster artwork or outcomes.
 */

export type HeroArchiveImage = {
  id: string;
  src: string;
  /** Scene description for docs / non-decorative use. Must never mention outcomes. */
  alt: string;
  focalPosition?: string;
};

/** Hold duration before advancing (ms). Crossfade overlaps the end of this window. */
export const HERO_ARCHIVE_HOLD_MS = 17_000;

/** Crossfade duration (ms). Outgoing 1→0 and incoming 0→1 over this window. */
export const HERO_ARCHIVE_CROSSFADE_MS = 2_000;

/**
 * Deterministic sequence. Index 0 is always the SSR / initial client image.
 * Prefer wide archival fragments: empty stands, tunnels, crowds at distance,
 * vintage equipment, stadium architecture. Do not reorder casually — tests
 * assert the first src.
 */
export const HERO_ARCHIVE_IMAGES: readonly HeroArchiveImage[] = [
  {
    id: "empty-stands",
    src: "/hero-archive/empty-stands.jpg",
    alt: "Rows of empty stadium seats before spectators arrive",
    focalPosition: "center 42%",
  },
  {
    id: "supporters-entry",
    src: "/hero-archive/supporters-entry.jpg",
    alt: "Supporters approaching a stadium on spiral ramps before kickoff",
    focalPosition: "center 48%",
  },
  {
    id: "kickoff-tunnel",
    src: "/hero-archive/kickoff-tunnel.jpg",
    alt: "A dark players' tunnel opening onto an empty pitch",
    focalPosition: "center 55%",
  },
  {
    id: "archive-camera",
    src: "/hero-archive/archive-camera.jpg",
    alt: "A vintage television camera on a wheeled tripod",
    focalPosition: "center 45%",
  },
  {
    id: "match-ball",
    src: "/hero-archive/match-ball.jpg",
    alt: "A classic black-and-white Adidas World Cup match ball",
    focalPosition: "center center",
  },
  {
    id: "venue-exterior",
    src: "/hero-archive/venue-exterior.jpg",
    alt: "Exterior stadium architecture under a twilight sky",
    focalPosition: "62% 40%",
  },
  {
    id: "floodlights",
    src: "/hero-archive/floodlights.jpg",
    alt: "A tall bank of stadium floodlights against the sky",
    focalPosition: "center 40%",
  },
  {
    id: "packed-stands",
    src: "/hero-archive/packed-stands.jpg",
    alt: "A dense crowd filling stadium stands, seen from above",
    focalPosition: "center 55%",
  },
] as const;

export const HERO_ARCHIVE_FIRST = HERO_ARCHIVE_IMAGES[0];

export function getHeroArchiveImageCount(): number {
  return HERO_ARCHIVE_IMAGES.length;
}
