"use client";

import type { ButtonHTMLAttributes } from "react";
import type { FeedbackPageContext } from "@/lib/feedback";
import { useOptionalFeedback } from "./FeedbackContext";

type SendFeedbackButtonProps = {
  className?: string;
  context?: FeedbackPageContext | null;
  children?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "children">;

/**
 * Opens the shared feedback modal. Renders nothing outside FeedbackProvider
 * (e.g. isolated unit tests that only SSR markup).
 */
export function SendFeedbackButton({
  className,
  context = null,
  children = "Send Feedback",
  ...rest
}: SendFeedbackButtonProps) {
  const feedback = useOptionalFeedback();

  if (!feedback) {
    return (
      <button
        type="button"
        className={className}
        disabled
        aria-disabled="true"
        title="Feedback unavailable"
        data-feedback="unset"
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      data-feedback="modal"
      onClick={() => feedback.openFeedback(context ?? undefined)}
      {...rest}
    >
      {children}
    </button>
  );
}
