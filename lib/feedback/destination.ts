/**
 * Feedback entry is in-app (modal). Provider credentials live server-side
 * via createFeedbackService() — never hardcode secrets here.
 */
export type FeedbackDestination =
  | { type: "modal" }
  | { type: "unset" };

/** In-app modal is the product feedback surface. */
export const FEEDBACK_DESTINATION: FeedbackDestination = { type: "modal" };

/** @deprecated External href destinations are unused; feedback opens a modal. */
export function resolveFeedbackHref(): string | null {
  return null;
}

/** True when the UI should offer Send Feedback (always, via modal). */
export function isFeedbackConfigured(): boolean {
  return FEEDBACK_DESTINATION.type === "modal";
}
