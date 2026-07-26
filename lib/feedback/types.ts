/** Visitor-facing feedback categories. */
export const FEEDBACK_TYPES = [
  "Bug",
  "Broken Replay",
  "Historical Correction",
  "Feature Idea",
  "General Feedback",
] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

/** Hidden / auto context captured when feedback opens from a Match page. */
export type FeedbackPageContext = {
  tournament?: string;
  /** @deprecated Prefer `experience`. Kept for existing call sites. */
  journey?: string;
  experience?: string;
  match?: string;
  /** @deprecated Prefer `currentRoute`. */
  route?: string;
  currentRoute?: string;
  replayProvider?: string;
};

export type FeedbackSubmission = {
  feedbackType: FeedbackType;
  message: string;
  email?: string;
  tournament?: string;
  experience?: string;
  match?: string;
  replayProvider?: string;
  currentRoute?: string;
  browser?: string;
  viewport?: string;
  /** Set server-side at send time (ISO-8601). */
  submittedAt?: string;
};

export type FeedbackSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export interface FeedbackService {
  readonly providerName: string;
  isConfigured(): boolean;
  submit(payload: FeedbackSubmission): Promise<FeedbackSubmitResult>;
}

export function isFeedbackType(value: unknown): value is FeedbackType {
  return (
    typeof value === "string" &&
    (FEEDBACK_TYPES as readonly string[]).includes(value)
  );
}
