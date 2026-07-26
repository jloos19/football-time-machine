import { Resend } from "resend";
import {
  feedbackSubject,
  formatFeedbackBody,
  formatFeedbackHtml,
} from "../format";
import { isReplyToEmail } from "../validate";
import type {
  FeedbackService,
  FeedbackSubmission,
  FeedbackSubmitResult,
} from "../types";

export type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type ResendSendResult = {
  data: { id: string } | null;
  error: { message: string } | null;
};

export type ResendConfig = {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  /** Test seam — defaults to the official Resend SDK (server-side only). */
  sendEmail?: (payload: ResendEmailPayload) => Promise<ResendSendResult>;
};

async function sendWithSdk(
  apiKey: string,
  payload: ResendEmailPayload
): Promise<ResendSendResult> {
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(payload);
  return {
    data: data ? { id: data.id } : null,
    error: error ? { message: error.message } : null,
  };
}

export function createResendProvider(config: ResendConfig): FeedbackService {
  const apiKey = config.apiKey.trim();
  const fromEmail = config.fromEmail.trim();
  const toEmail = config.toEmail.trim();
  const sendEmail =
    config.sendEmail ?? ((payload) => sendWithSdk(apiKey, payload));

  return {
    providerName: "resend",
    isConfigured() {
      return Boolean(apiKey && fromEmail && toEmail);
    },
    async submit(payload: FeedbackSubmission): Promise<FeedbackSubmitResult> {
      if (!this.isConfigured()) {
        return {
          ok: false,
          error:
            "Feedback is not configured. Set RESEND_API_KEY, FEEDBACK_FROM_EMAIL, and FEEDBACK_TO_EMAIL.",
        };
      }

      const withTimestamp: FeedbackSubmission = {
        ...payload,
        submittedAt: payload.submittedAt ?? new Date().toISOString(),
      };

      try {
        const replyTo = isReplyToEmail(payload.email)
          ? payload.email.trim()
          : undefined;

        const result = await sendEmail({
          from: fromEmail,
          to: [toEmail],
          subject: feedbackSubject(withTimestamp),
          text: formatFeedbackBody(withTimestamp),
          html: formatFeedbackHtml(withTimestamp),
          ...(replyTo ? { replyTo } : {}),
        });

        if (result.error) {
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
