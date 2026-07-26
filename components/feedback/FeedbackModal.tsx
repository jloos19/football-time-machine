"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  FEEDBACK_TYPES,
  type FeedbackSubmission,
  type FeedbackType,
} from "@/lib/feedback";
import { useFeedback } from "./FeedbackContext";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FormState = "idle" | "submitting" | "success" | "error";

function collectClientMeta(): { browser?: string; viewport?: string } {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return {};
  }
  return {
    browser: navigator.userAgent?.slice(0, 400) || undefined,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  };
}

export function FeedbackModal() {
  const { open, closeFeedback, openContext } = useFeedback();
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const bodyOverflow = useRef("");
  const formOpenedAt = useRef<number>(0);

  const [type, setType] = useState<FeedbackType>("General Feedback");
  const [tournament, setTournament] = useState("");
  const [match, setMatch] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Seed editable fields + reset when opening.
  useLayoutEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    bodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    formOpenedAt.current = Date.now();

    setType("General Feedback");
    setTournament(openContext?.tournament?.trim() ?? "");
    setMatch(openContext?.match?.trim() ?? "");
    setMessage("");
    setEmail("");
    setHoneypot("");
    setFormState("idle");
    setErrorMessage(null);

    // Focus close control after paint for keyboard users.
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = bodyOverflow.current;
      previouslyFocused.current?.focus?.();
    };
  }, [open, openContext]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeFeedback();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (nodes.length === 0) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, closeFeedback]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formState === "submitting") return;

    // Prefer live form values so submission matches what the user sees.
    const fd = new FormData(event.currentTarget);
    const nextType = (String(fd.get("feedbackType") || type) ||
      "General Feedback") as FeedbackType;
    const nextTournament = String(fd.get("tournament") ?? "").trim();
    const nextMatch = String(fd.get("match") ?? "").trim();
    const trimmedMessage = String(fd.get("message") ?? "").trim();
    const nextEmail = String(fd.get("email") ?? "").trim();
    const nextHoneypot = String(fd.get("website") ?? "").trim();

    setType(nextType);
    setTournament(nextTournament);
    setMatch(nextMatch);
    setMessage(trimmedMessage);
    setEmail(nextEmail);
    setHoneypot(nextHoneypot);

    if (!trimmedMessage) {
      setFormState("error");
      setErrorMessage("A message is required.");
      return;
    }

    const experience =
      openContext?.experience?.trim() ||
      openContext?.journey?.trim() ||
      undefined;
    const currentRoute =
      openContext?.currentRoute?.trim() ||
      openContext?.route?.trim() ||
      undefined;
    const meta = collectClientMeta();

    const payload: FeedbackSubmission & {
      website: string;
      formOpenedAt: number;
    } = {
      feedbackType: nextType,
      message: trimmedMessage,
      tournament: nextTournament || undefined,
      match: nextMatch || undefined,
      email: nextEmail || undefined,
      experience,
      replayProvider: openContext?.replayProvider?.trim() || undefined,
      currentRoute,
      browser: meta.browser,
      viewport: meta.viewport,
      website: nextHoneypot,
      formOpenedAt: formOpenedAt.current || Date.now(),
    };

    setFormState("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setFormState("error");
        setErrorMessage(
          data?.error || "Could not send feedback. Please try again shortly."
        );
        return;
      }

      // Clear the form only after a successful send.
      setType("General Feedback");
      setTournament("");
      setMatch("");
      setMessage("");
      setEmail("");
      setHoneypot("");
      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage(
        "Could not reach the feedback service. Check your connection."
      );
    }
  }

  return (
    <div
      className="feedback-modal-backdrop"
      data-testid="feedback-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeFeedback();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        className="feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="feedback-modal__close"
          onClick={closeFeedback}
          aria-label="Close feedback form"
        >
          ×
        </button>

        {formState === "success" ? (
          <div
            className="feedback-modal__success"
            role="status"
            data-testid="feedback-success"
          >
            <p className="feedback-modal__eyebrow">Thank you</p>
            <h2 id={titleId} className="feedback-modal__title">
              Message received
            </h2>
            <p id={descId} className="feedback-modal__lede">
              Thanks for helping shape Football Time Machine. We’ll review your
              note and keep improving the archive.
            </p>
            <button
              type="button"
              className="feedback-modal__submit"
              onClick={closeFeedback}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="feedback-modal__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <p className="feedback-modal__eyebrow">Feedback</p>
            <h2 id={titleId} className="feedback-modal__title">
              Send Feedback
            </h2>
            <p id={descId} className="feedback-modal__lede">
              Bugs, broken replays, historical corrections, typos, and ideas —
              all welcome.
            </p>

            <label className="feedback-modal__field">
              <span className="feedback-modal__label">Feedback Type</span>
              <select
                className="feedback-modal__control"
                name="feedbackType"
                value={type}
                onChange={(e) => setType(e.target.value as FeedbackType)}
                disabled={formState === "submitting"}
                data-testid="feedback-type"
              >
                {FEEDBACK_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="feedback-modal__field">
              <span className="feedback-modal__label">Tournament</span>
              <input
                className="feedback-modal__control"
                type="text"
                name="tournament"
                value={tournament}
                onChange={(e) => setTournament(e.target.value)}
                placeholder="Optional"
                autoComplete="off"
                disabled={formState === "submitting"}
                data-testid="feedback-tournament"
              />
            </label>

            <label className="feedback-modal__field">
              <span className="feedback-modal__label">Match</span>
              <input
                className="feedback-modal__control"
                type="text"
                name="match"
                value={match}
                onChange={(e) => setMatch(e.target.value)}
                placeholder="Optional"
                autoComplete="off"
                disabled={formState === "submitting"}
                data-testid="feedback-match"
              />
            </label>

            <label className="feedback-modal__field">
              <span className="feedback-modal__label">
                Message{" "}
                <span className="feedback-modal__required">Required</span>
              </span>
              <textarea
                className="feedback-modal__control feedback-modal__control--area"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                disabled={formState === "submitting"}
                data-testid="feedback-message"
              />
            </label>

            <label className="feedback-modal__field">
              <span className="feedback-modal__label">Email</span>
              <input
                className="feedback-modal__control"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional — only if you’d like a reply"
                autoComplete="email"
                disabled={formState === "submitting"}
                data-testid="feedback-email"
              />
            </label>

            {/* Honeypot — hidden from humans; bots often fill it. */}
            <div className="feedback-modal__honeypot" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  data-testid="feedback-honeypot"
                />
              </label>
            </div>

            {openContext?.route ||
            openContext?.currentRoute ||
            openContext?.journey ||
            openContext?.experience ? (
              <p className="feedback-modal__context-note" aria-hidden="true">
                Page context will be included with your report.
              </p>
            ) : null}

            {formState === "error" && errorMessage ? (
              <p
                className="feedback-modal__error"
                role="alert"
                data-testid="feedback-error"
              >
                {errorMessage}
              </p>
            ) : null}

            <div className="feedback-modal__actions">
              <button
                type="button"
                className="feedback-modal__cancel"
                onClick={closeFeedback}
                disabled={formState === "submitting"}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="feedback-modal__submit"
                disabled={formState === "submitting"}
                data-testid="feedback-submit"
              >
                {formState === "submitting" ? "Sending…" : "Send Feedback"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
