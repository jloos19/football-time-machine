"use client";

import { useOptionalFeedback } from "./FeedbackContext";
import type { FeedbackPageContext } from "@/lib/feedback";

type SiteFooterProps = {
  /** Visual variant — home/our-story use the dark editorial footer. */
  variant?: "home" | "app";
  /** Optional match-page context when the footer opens feedback. */
  feedbackContext?: FeedbackPageContext | null;
  tagline?: string;
};

const DEFAULT_TAGLINE =
  "Where football history is experienced — not explained.";

/**
 * Shared site footer with a subtle Send Feedback control.
 */
export function SiteFooter({
  variant = "home",
  feedbackContext = null,
  tagline = DEFAULT_TAGLINE,
}: SiteFooterProps) {
  const feedback = useOptionalFeedback();

  return (
    <footer
      className={variant === "app" ? "app-footer site-footer" : "home-footer site-footer"}
      data-testid="site-footer"
    >
      <p>{tagline}</p>
      {feedback ? (
        <p className="site-footer__feedback">
          <button
            type="button"
            className="site-footer__feedback-link"
            onClick={() =>
              feedback.openFeedback(feedbackContext ?? undefined)
            }
          >
            Send Feedback
          </button>
        </p>
      ) : null}
    </footer>
  );
}
