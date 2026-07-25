/** DOM id for the homepage Men's World Cups shelf. */
export const MENS_WORLD_CUPS_SECTION_ID = "mens-world-cups";

/**
 * Set when a navigation to `/` should finish by scrolling to the Men's World Cups
 * shelf (e.g. WORLD CUPS from a tournament page, or a legacy `/world-cups` URL).
 * Consumed once by ScrollToTop after the homepage route commits.
 */
let pendingScrollToMensWorldCups = false;

export function requestScrollToMensWorldCups(): void {
  pendingScrollToMensWorldCups = true;
}

export function consumeScrollToMensWorldCups(): boolean {
  const pending = pendingScrollToMensWorldCups;
  pendingScrollToMensWorldCups = false;
  return pending;
}

export function peekScrollToMensWorldCups(): boolean {
  return pendingScrollToMensWorldCups;
}

/** Smooth-scroll to the Men's World Cups shelf (fixed nav offset via CSS scroll-margin). */
export function scrollToMensWorldCups(
  behavior: ScrollBehavior = "smooth"
): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(MENS_WORLD_CUPS_SECTION_ID);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}
