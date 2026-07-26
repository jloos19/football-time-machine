import { escapeHtml } from "./escape";
import type { FeedbackSubmission } from "./types";

const MISSING = "Not provided";

function field(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : MISSING;
}

function browserDevice(payload: FeedbackSubmission): string {
  const browser = payload.browser?.trim();
  const viewport = payload.viewport?.trim();
  if (browser && viewport) return `${browser} · ${viewport}`;
  if (browser) return browser;
  if (viewport) return viewport;
  return MISSING;
}

/** Build a plain-text body suitable for email. */
export function formatFeedbackBody(payload: FeedbackSubmission): string {
  return [
    `Feedback type: ${payload.feedbackType}`,
    `Message: ${payload.message.trim()}`,
    `Submitted email: ${field(payload.email)}`,
    `Tournament: ${field(payload.tournament)}`,
    `Experience: ${field(payload.experience)}`,
    `Match: ${field(payload.match)}`,
    `Replay provider: ${field(payload.replayProvider)}`,
    `Current route: ${field(payload.currentRoute)}`,
    `Browser/device: ${browserDevice(payload)}`,
    `Submitted at: ${field(payload.submittedAt)}`,
  ].join("\n");
}

/** Restrained HTML alternate for clients that prefer it. */
export function formatFeedbackHtml(payload: FeedbackSubmission): string {
  const rows: Array<[string, string]> = [
    ["Feedback type", payload.feedbackType],
    ["Message", payload.message.trim()],
    ["Submitted email", field(payload.email)],
    ["Tournament", field(payload.tournament)],
    ["Experience", field(payload.experience)],
    ["Match", field(payload.match)],
    ["Replay provider", field(payload.replayProvider)],
    ["Current route", field(payload.currentRoute)],
    ["Browser/device", browserDevice(payload)],
    ["Submitted at", field(payload.submittedAt)],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top;color:#555;">${escapeHtml(label)}</th><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;font-size:15px;line-height:1.45;color:#111;"><h1 style="font-size:18px;font-weight:normal;">Football Time Machine feedback</h1><table style="border-collapse:collapse;">${body}</table></body></html>`;
}

export function feedbackSubject(payload: FeedbackSubmission): string {
  const parts = [
    payload.feedbackType,
    payload.tournament?.trim(),
    payload.match?.trim(),
  ].filter((part): part is string => Boolean(part));

  return `[Football Time Machine Feedback] ${parts.join(" — ")}`;
}
