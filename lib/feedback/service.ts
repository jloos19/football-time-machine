import { createFormspreeProvider } from "./providers/formspree";
import { createResendProvider } from "./providers/resend";
import type { FeedbackService } from "./types";

export type FeedbackProviderName = "formspree" | "resend";

export type FeedbackEnv = {
  NODE_ENV?: string;
  FEEDBACK_PROVIDER?: string;
  FEEDBACK_FORMSPREE_ENDPOINT?: string;
  FEEDBACK_FORMSPREE_ID?: string;
  RESEND_API_KEY?: string;
  FEEDBACK_FROM_EMAIL?: string;
  FEEDBACK_TO_EMAIL?: string;
  [key: string]: string | undefined;
};

function readEnv(env: FeedbackEnv = process.env as FeedbackEnv): FeedbackEnv {
  return env;
}

function resolveFormspreeEndpoint(env: FeedbackEnv): string {
  const direct = env.FEEDBACK_FORMSPREE_ENDPOINT?.trim();
  if (direct) return direct.replace(/\/$/, "");
  const id = env.FEEDBACK_FORMSPREE_ID?.trim();
  if (id) return `https://formspree.io/f/${id}`;
  return "";
}

function hasResendCredentials(env: FeedbackEnv): boolean {
  return Boolean(
    env.RESEND_API_KEY?.trim() &&
      env.FEEDBACK_FROM_EMAIL?.trim() &&
      env.FEEDBACK_TO_EMAIL?.trim()
  );
}

function resolveProviderName(env: FeedbackEnv): FeedbackProviderName {
  const raw = env.FEEDBACK_PROVIDER?.trim().toLowerCase();
  if (raw === "resend") return "resend";
  if (raw === "formspree") return "formspree";
  // Prefer Resend when fully configured; otherwise default to Resend so
  // missing-config messaging points at the production provider.
  if (hasResendCredentials(env)) return "resend";
  if (resolveFormspreeEndpoint(env)) return "formspree";
  return "resend";
}

/**
 * Build the active FeedbackService from environment variables.
 * Production path: Resend via RESEND_API_KEY + FEEDBACK_FROM_EMAIL + FEEDBACK_TO_EMAIL.
 */
export function createFeedbackService(env?: FeedbackEnv): FeedbackService {
  const resolved = readEnv(env);
  const provider = resolveProviderName(resolved);

  if (provider === "resend") {
    return createResendProvider({
      apiKey: resolved.RESEND_API_KEY ?? "",
      fromEmail: resolved.FEEDBACK_FROM_EMAIL ?? "",
      toEmail: resolved.FEEDBACK_TO_EMAIL ?? "",
    });
  }

  return createFormspreeProvider({
    endpoint: resolveFormspreeEndpoint(resolved),
  });
}

/** True when the configured provider has the credentials it needs. */
export function isFeedbackServiceConfigured(env?: FeedbackEnv): boolean {
  return createFeedbackService(env).isConfigured();
}

/** Names of missing Resend env vars (for server-side logging only). */
export function missingFeedbackConfigKeys(env?: FeedbackEnv): string[] {
  const resolved = readEnv(env);
  const missing: string[] = [];
  if (!resolved.RESEND_API_KEY?.trim()) missing.push("RESEND_API_KEY");
  if (!resolved.FEEDBACK_FROM_EMAIL?.trim()) missing.push("FEEDBACK_FROM_EMAIL");
  if (!resolved.FEEDBACK_TO_EMAIL?.trim()) missing.push("FEEDBACK_TO_EMAIL");
  return missing;
}

export function feedbackConfigErrorMessage(env?: FeedbackEnv): string {
  const resolved = readEnv(env);
  const isProd = resolved.NODE_ENV === "production";
  if (isProd) {
    return "Feedback is temporarily unavailable. Please try again later.";
  }
  const missing = missingFeedbackConfigKeys(resolved);
  return missing.length
    ? `Feedback is not configured. Set ${missing.join(", ")} in your environment (see .env.example).`
    : "Feedback is not configured. Set RESEND_API_KEY, FEEDBACK_FROM_EMAIL, and FEEDBACK_TO_EMAIL.";
}
