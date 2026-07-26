import { feedbackSubject, formatFeedbackBody } from "../format";
import type {
  FeedbackService,
  FeedbackSubmission,
  FeedbackSubmitResult,
} from "../types";

export type FormspreeConfig = {
  endpoint: string;
};

export function createFormspreeProvider(
  config: FormspreeConfig
): FeedbackService {
  const endpoint = config.endpoint.trim();

  return {
    providerName: "formspree",
    isConfigured() {
      return /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/.test(endpoint);
    },
    async submit(payload: FeedbackSubmission): Promise<FeedbackSubmitResult> {
      if (!this.isConfigured()) {
        return {
          ok: false,
          error: "Feedback is not configured. Set FEEDBACK_FORMSPREE_ENDPOINT.",
        };
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: feedbackSubject(payload),
            feedbackType: payload.feedbackType,
            type: payload.feedbackType,
            tournament: payload.tournament?.trim() || "",
            experience: payload.experience?.trim() || "",
            match: payload.match?.trim() || "",
            message: payload.message.trim(),
            email: payload.email?.trim() || "",
            _replyto: payload.email?.trim() || undefined,
            replayProvider: payload.replayProvider?.trim() || "",
            currentRoute: payload.currentRoute?.trim() || "",
            browser: payload.browser?.trim() || "",
            viewport: payload.viewport?.trim() || "",
            body: formatFeedbackBody(payload),
          }),
        });

        if (!response.ok) {
          return {
            ok: false,
            error: "Could not send feedback. Please try again shortly.",
          };
        }

        return { ok: true };
      } catch {
        return {
          ok: false,
          error: "Could not reach the feedback service. Check your connection.",
        };
      }
    },
  };
}
