import {
  isFeedbackType,
  type FeedbackPageContext,
  type FeedbackSubmission,
} from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 5000;
const MAX_FIELD = 200;
const MAX_BROWSER = 400;
const MAX_ROUTE = 500;
/** Reject implausibly fast automated submissions. */
export const FEEDBACK_MIN_SUBMIT_MS = 1200;

export type FeedbackValidationResult =
  | { ok: true; value: FeedbackSubmission; discard?: boolean }
  | { ok: false; error: string };

function cleanOptional(value: unknown, max = MAX_FIELD): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed || undefined;
}

function readContext(raw: unknown): FeedbackPageContext | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const obj = raw as Record<string, unknown>;
  return {
    tournament: cleanOptional(obj.tournament),
    journey: cleanOptional(obj.journey),
    experience: cleanOptional(obj.experience),
    match: cleanOptional(obj.match),
    route: cleanOptional(obj.route, MAX_ROUTE),
    currentRoute: cleanOptional(obj.currentRoute, MAX_ROUTE),
    replayProvider: cleanOptional(obj.replayProvider),
  };
}

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

/** Validate email for reply-to use without rejecting the whole submission. */
export function isReplyToEmail(value: string | undefined): value is string {
  return Boolean(value && isValidEmail(value));
}

/**
 * Validate and normalize an untrusted feedback POST body.
 * Client-supplied sender/recipient fields are ignored.
 */
export function validateFeedbackSubmission(
  body: unknown,
  options?: { now?: number }
): FeedbackValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid feedback payload." };
  }

  const data = body as Record<string, unknown>;
  const now = options?.now ?? Date.now();

  // Honeypot — bots fill hidden fields; discard quietly.
  const honeypot = cleanOptional(data.website ?? data.company ?? data.url);
  if (honeypot) {
    return {
      ok: true,
      discard: true,
      value: {
        feedbackType: "General Feedback",
        message: "discarded",
      },
    };
  }

  const feedbackTypeRaw = data.feedbackType ?? data.type;
  if (!isFeedbackType(feedbackTypeRaw)) {
    return { ok: false, error: "Choose a valid feedback type." };
  }
  const feedbackType = feedbackTypeRaw;

  if (typeof data.message !== "string" || !data.message.trim()) {
    return { ok: false, error: "A message is required." };
  }

  const message = data.message.trim().slice(0, MAX_MESSAGE);
  if (!message) {
    return { ok: false, error: "A message is required." };
  }

  const email = cleanOptional(data.email);
  if (email && !isValidEmail(email)) {
    return {
      ok: false,
      error: "Enter a valid email address, or leave it blank.",
    };
  }

  const openedAtRaw = data.formOpenedAt ?? data.openedAt;
  if (typeof openedAtRaw === "number" && Number.isFinite(openedAtRaw)) {
    const elapsed = now - openedAtRaw;
    if (elapsed >= 0 && elapsed < FEEDBACK_MIN_SUBMIT_MS) {
      return { ok: false, error: "Please wait a moment and try again." };
    }
  }

  const context = readContext(data.context);

  const tournament =
    cleanOptional(data.tournament) ?? context?.tournament;
  const experience =
    cleanOptional(data.experience) ??
    cleanOptional(data.journey) ??
    context?.experience ??
    context?.journey;
  const match = cleanOptional(data.match) ?? context?.match;
  const replayProvider =
    cleanOptional(data.replayProvider) ?? context?.replayProvider;
  const currentRoute =
    cleanOptional(data.currentRoute, MAX_ROUTE) ??
    cleanOptional(data.route, MAX_ROUTE) ??
    context?.currentRoute ??
    context?.route;
  const browser = cleanOptional(data.browser, MAX_BROWSER);
  const viewport = cleanOptional(data.viewport ?? data.device, MAX_FIELD);

  return {
    ok: true,
    value: {
      feedbackType,
      message,
      email,
      tournament,
      experience,
      match,
      replayProvider,
      currentRoute,
      browser,
      viewport,
    },
  };
}
