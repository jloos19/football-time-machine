/**
 * Site-wide identity and absolute URL helpers for metadata.
 * Override the origin with NEXT_PUBLIC_SITE_URL when the deployed host is known.
 */
export const SITE_NAME = "Football Time Machine";

/** Production origin used for canonical URLs and Open Graph. */
export const SITE_ORIGIN =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  "https://football-time-machine.vercel.app";

/** Spoiler-safe default social image (archival atmosphere, no outcomes). */
export const SITE_OG_IMAGE_PATH = "/hero-archive/empty-stands.jpg";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
