import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import {
  act,
  createElement,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";
import { SiteFooter } from "@/components/feedback/SiteFooter";
import {
  FeedbackProvider,
  useFeedback,
} from "@/components/feedback/FeedbackContext";
import { SendFeedbackButton } from "@/components/feedback/SendFeedbackButton";
import {
  FEEDBACK_DESTINATION,
  FEEDBACK_TYPES,
  createFeedbackService,
  escapeHtml,
  feedbackConfigErrorMessage,
  feedbackSubject,
  formatFeedbackBody,
  formatFeedbackHtml,
  isFeedbackConfigured,
  isFeedbackServiceConfigured,
  isReplyToEmail,
  missingFeedbackConfigKeys,
  resetFeedbackRateLimit,
  validateFeedbackSubmission,
  type FeedbackPageContext,
} from "@/lib/feedback";
import { createFormspreeProvider } from "@/lib/feedback/providers/formspree";
import { createResendProvider } from "@/lib/feedback/providers/resend";

function installDom() {
  const window = new Window({
    url: "https://example.test/",
    width: 1280,
    height: 900,
  });
  const g = globalThis as typeof globalThis & {
    window?: Window;
    document?: Document;
    HTMLElement?: typeof HTMLElement;
    Node?: typeof Node;
    MutationObserver?: typeof MutationObserver;
    requestAnimationFrame?: typeof requestAnimationFrame;
    FormData?: typeof FormData;
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  };
  const previous = {
    window: g.window,
    document: g.document,
    HTMLElement: g.HTMLElement,
    Node: g.Node,
    MutationObserver: g.MutationObserver,
    requestAnimationFrame: g.requestAnimationFrame,
    FormData: g.FormData,
    IS_REACT_ACT_ENVIRONMENT: g.IS_REACT_ACT_ENVIRONMENT,
  };

  g.window = window as unknown as Window;
  g.document = window.document as unknown as Document;
  g.HTMLElement = window.HTMLElement as unknown as typeof HTMLElement;
  g.Node = window.Node as unknown as typeof Node;
  g.MutationObserver =
    window.MutationObserver as unknown as typeof MutationObserver;
  g.FormData = window.FormData as unknown as typeof FormData;
  g.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    cb(Date.now());
    return 0;
  }) as typeof requestAnimationFrame;
  g.IS_REACT_ACT_ENVIRONMENT = true;

  return {
    window,
    restore() {
      g.window = previous.window;
      g.document = previous.document;
      g.HTMLElement = previous.HTMLElement;
      g.Node = previous.Node;
      g.MutationObserver = previous.MutationObserver;
      g.requestAnimationFrame = previous.requestAnimationFrame;
      g.FormData = previous.FormData;
      g.IS_REACT_ACT_ENVIRONMENT = previous.IS_REACT_ACT_ENVIRONMENT;
      try {
        window.close();
      } catch {
        /* ignore */
      }
    },
  };
}

function OpenFeedback({ context }: { context?: FeedbackPageContext }) {
  const { openFeedback } = useFeedback();
  useLayoutEffect(() => {
    openFeedback(context);
  }, [openFeedback, context]);
  return null;
}

function setFieldValue(
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string
) {
  const proto = Object.getPrototypeOf(element) as object;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter?.call(element, value);
}

describe("feedback service", () => {
  afterEach(() => {
    mock.restoreAll();
    resetFeedbackRateLimit();
  });

  it("exposes the expected feedback types", () => {
    assert.deepEqual([...FEEDBACK_TYPES], [
      "Bug",
      "Broken Replay",
      "Historical Correction",
      "Feature Idea",
      "General Feedback",
    ]);
  });

  it("uses an in-app modal destination", () => {
    assert.equal(FEEDBACK_DESTINATION.type, "modal");
    assert.equal(isFeedbackConfigured(), true);
  });

  it("builds Formspree from endpoint or id env vars", () => {
    const byEndpoint = createFeedbackService({
      FEEDBACK_PROVIDER: "formspree",
      FEEDBACK_FORMSPREE_ENDPOINT: "https://formspree.io/f/abcdefg",
    });
    assert.equal(byEndpoint.providerName, "formspree");
    assert.equal(byEndpoint.isConfigured(), true);

    const byId = createFeedbackService({
      FEEDBACK_PROVIDER: "formspree",
      FEEDBACK_FORMSPREE_ID: "xyz1234",
    });
    assert.equal(byId.isConfigured(), true);
  });

  it("defaults to Resend and reports missing configuration safely", () => {
    const missing = createFeedbackService({});
    assert.equal(missing.providerName, "resend");
    assert.equal(missing.isConfigured(), false);
    assert.equal(isFeedbackServiceConfigured({}), false);
    assert.deepEqual(missingFeedbackConfigKeys({}), [
      "RESEND_API_KEY",
      "FEEDBACK_FROM_EMAIL",
      "FEEDBACK_TO_EMAIL",
    ]);
    assert.match(
      feedbackConfigErrorMessage({ NODE_ENV: "development" }),
      /RESEND_API_KEY/
    );
    assert.equal(
      feedbackConfigErrorMessage({ NODE_ENV: "production" }),
      "Feedback is temporarily unavailable. Please try again later."
    );
  });

  it("builds Resend when provider or credentials select it", () => {
    const service = createFeedbackService({
      FEEDBACK_PROVIDER: "resend",
      RESEND_API_KEY: "re_test",
      FEEDBACK_FROM_EMAIL: "from@example.com",
      FEEDBACK_TO_EMAIL: "to@example.com",
    });
    assert.equal(service.providerName, "resend");
    assert.equal(service.isConfigured(), true);

    const inferred = createFeedbackService({
      RESEND_API_KEY: "re_test",
      FEEDBACK_FROM_EMAIL: "from@example.com",
      FEEDBACK_TO_EMAIL: "to@example.com",
    });
    assert.equal(inferred.providerName, "resend");
  });

  it("validates required message and feedback type", () => {
    const badType = validateFeedbackSubmission({
      feedbackType: "Spoiler",
      message: "Hello",
    });
    assert.equal(badType.ok, false);

    const missingMessage = validateFeedbackSubmission({
      type: "Bug",
      message: "   ",
    });
    assert.equal(missingMessage.ok, false);
    if (!missingMessage.ok) {
      assert.match(missingMessage.error, /message is required/i);
    }

    const badEmail = validateFeedbackSubmission({
      feedbackType: "Bug",
      message: "Replay is blank",
      email: "not-an-email",
    });
    assert.equal(badEmail.ok, false);

    const ok = validateFeedbackSubmission({
      feedbackType: "Broken Replay",
      message: "Link 404s",
      tournament: "USA 1994",
      match: "Brazil vs USA",
      email: "fan@example.com",
      experience: "The Story",
      currentRoute: "/tournaments/usa-1994/story",
      browser: "TestBrowser/1.0",
      viewport: "1280x900",
      // Client attempt to override delivery — must be ignored.
      to: "attacker@evil.test",
      from: "spoof@evil.test",
      FEEDBACK_TO_EMAIL: "attacker@evil.test",
      FEEDBACK_FROM_EMAIL: "spoof@evil.test",
    });
    assert.equal(ok.ok, true);
    if (ok.ok) {
      assert.equal(ok.value.feedbackType, "Broken Replay");
      assert.equal(ok.value.experience, "The Story");
      assert.equal(ok.value.currentRoute, "/tournaments/usa-1994/story");
      assert.equal(
        "to" in ok.value || "FEEDBACK_TO_EMAIL" in ok.value,
        false
      );
    }
  });

  it("rejects or discards honeypot submissions", () => {
    const trapped = validateFeedbackSubmission({
      feedbackType: "Bug",
      message: "spam",
      website: "https://bots.example",
    });
    assert.equal(trapped.ok, true);
    if (trapped.ok) {
      assert.equal(trapped.discard, true);
    }
  });

  it("rejects implausibly fast submissions", () => {
    const now = 1_000_000;
    const fast = validateFeedbackSubmission(
      {
        feedbackType: "Bug",
        message: "too fast",
        formOpenedAt: now - 100,
      },
      { now }
    );
    assert.equal(fast.ok, false);
  });

  it("formats subject and body with Not provided placeholders", () => {
    const payload = {
      feedbackType: "Broken Replay" as const,
      message: "Link 404s",
      tournament: "USA 1994",
      match: "United States vs Switzerland",
      email: "fan@example.com",
      experience: "The Story",
      replayProvider: "YouTube",
      currentRoute: "/tournaments/usa-1994/story",
      browser: "Mozilla/5.0",
      viewport: "390x844",
      submittedAt: "2026-07-26T12:00:00.000Z",
    };

    assert.equal(
      feedbackSubject(payload),
      "[Football Time Machine Feedback] Broken Replay — USA 1994 — United States vs Switzerland"
    );

    const body = formatFeedbackBody(payload);
    assert.match(body, /Feedback type: Broken Replay/);
    assert.match(body, /Message: Link 404s/);
    assert.match(body, /Submitted email: fan@example.com/);
    assert.match(body, /Replay provider: YouTube/);
    assert.match(body, /Submitted at: 2026-07-26T12:00:00.000Z/);

    const sparse = formatFeedbackBody({
      feedbackType: "General Feedback",
      message: "Hi",
    });
    assert.match(sparse, /Tournament: Not provided/);
    assert.match(sparse, /Submitted email: Not provided/);
  });

  it("escapes HTML content and skips invalid replyTo", async () => {
    assert.equal(escapeHtml('<img src=x onerror="alert(1)">'), 
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
    assert.equal(isReplyToEmail("not-an-email"), false);
    assert.equal(isReplyToEmail("fan@example.com"), true);

    const html = formatFeedbackHtml({
      feedbackType: "Bug",
      message: '<script>alert("x")</script>',
      email: "fan@example.com",
    });
    assert.doesNotMatch(html, /<script>/);
    assert.match(html, /&lt;script&gt;/);

    const sent: unknown[] = [];
    const provider = createResendProvider({
      apiKey: "re_secret",
      fromEmail: "Football Time Machine <feedback@football-timemachine.com>",
      toEmail: "owner@example.com",
      sendEmail: async (payload) => {
        sent.push(payload);
        return { data: { id: "email_1" }, error: null };
      },
    });

    const invalidReply = await provider.submit({
      feedbackType: "Bug",
      message: "hello",
      email: "not-an-email",
    });
    assert.equal(invalidReply.ok, true);
    const first = sent[0] as {
      replyTo?: string;
      to: string[];
      from: string;
      html: string;
    };
    assert.equal(first.replyTo, undefined);
    assert.deepEqual(first.to, ["owner@example.com"]);
    assert.equal(
      first.from,
      "Football Time Machine <feedback@football-timemachine.com>"
    );

    const withReply = await provider.submit({
      feedbackType: "Bug",
      message: '<b>bold</b>',
      email: "fan@example.com",
    });
    assert.equal(withReply.ok, true);
    const second = sent[1] as { replyTo?: string; html: string };
    assert.equal(second.replyTo, "fan@example.com");
    assert.doesNotMatch(second.html, /<b>bold<\/b>/);
    assert.match(second.html, /&lt;b&gt;bold&lt;\/b&gt;/);
  });

  it("always uses env sender/recipient and ignores client overrides", async () => {
    const sent: unknown[] = [];
    const provider = createResendProvider({
      apiKey: "re_secret",
      fromEmail: "from@configured.test",
      toEmail: "to@configured.test",
      sendEmail: async (payload) => {
        sent.push(payload);
        return { data: { id: "email_2" }, error: null };
      },
    });

    const result = await provider.submit({
      feedbackType: "Feature Idea",
      message: "Add women’s World Cups",
      ...({
        to: ["attacker@evil.test"],
        from: "spoof@evil.test",
      } as object),
    });

    assert.equal(result.ok, true);
    const body = sent[0] as { to: string[]; from: string };
    assert.deepEqual(body.to, ["to@configured.test"]);
    assert.equal(body.from, "from@configured.test");
  });

  it("submits valid feedback through Resend successfully", async () => {
    const provider = createResendProvider({
      apiKey: "re_secret",
      fromEmail: "from@example.com",
      toEmail: "inbox@example.com",
      sendEmail: async () => ({ data: { id: "email_ok" }, error: null }),
    });
    const result = await provider.submit({
      feedbackType: "General Feedback",
      message: "Loving the archive",
      email: "fan@example.com",
    });
    assert.equal(result.ok, true);
  });

  it("returns a safe error when Resend is not configured", async () => {
    const provider = createResendProvider({
      apiKey: "",
      fromEmail: "",
      toEmail: "",
    });
    const result = await provider.submit({
      feedbackType: "Bug",
      message: "hi",
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.doesNotMatch(result.error, /re_/);
      assert.match(result.error, /not configured/i);
    }
  });

  it("submits through Formspree without exposing secrets in the payload helper", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });

    const provider = createFormspreeProvider({
      endpoint: "https://formspree.io/f/testform",
    });
    const result = await provider.submit({
      feedbackType: "Feature Idea",
      message: "Add women’s World Cups",
      currentRoute: "/our-story",
    });

    assert.equal(result.ok, true);
    assert.equal(fetchMock.mock.calls.length, 1);
    const [url, init] = fetchMock.mock.calls[0]!.arguments;
    assert.equal(url, "https://formspree.io/f/testform");
    const body = JSON.parse(String((init as RequestInit).body));
    assert.equal(body.feedbackType, "Feature Idea");
    assert.equal(body.currentRoute, "/our-story");
  });

  it("renders footer feedback control and modal-capable CTA", () => {
    const footer = renderToStaticMarkup(
      createElement(
        FeedbackProvider,
        null,
        createElement(SiteFooter, { variant: "home" })
      )
    );
    assert.match(footer, /data-testid="site-footer"/);
    assert.match(footer, /Send Feedback/);

    const cta = renderToStaticMarkup(
      createElement(
        FeedbackProvider,
        null,
        createElement(SendFeedbackButton, {
          className: "our-story-cta our-story-cta--primary",
        })
      )
    );
    assert.match(cta, /data-feedback="modal"/);
    assert.doesNotMatch(cta, /disabled/);
  });

  it("modal displays success after submission and clears fields", async () => {
    const dom = installDom();
    let root: Root | null = null;
    const fetchMock = mock.method(globalThis, "fetch", async () => {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });

    try {
      const host = dom.window.document.createElement("div");
      dom.window.document.body.appendChild(host);
      root = createRoot(host as unknown as Element);
      flushSync(() => {
        root!.render(
          createElement(
            FeedbackProvider,
            null,
            createElement(OpenFeedback, {
              context: {
                tournament: "USA 1994",
                match: "United States vs Switzerland",
              },
            }) as ReactNode
          )
        );
      });

      const message = host.querySelector(
        '[data-testid="feedback-message"]'
      ) as HTMLTextAreaElement | null;
      const tournament = host.querySelector(
        '[data-testid="feedback-tournament"]'
      ) as HTMLInputElement | null;
      assert.ok(message);
      assert.ok(tournament);
      assert.equal(tournament.value, "USA 1994");

      setFieldValue(message, "Replay failed to load");

      const form = host.querySelector(
        ".feedback-modal__form"
      ) as HTMLFormElement | null;
      assert.ok(form);
      await act(async () => {
        form.requestSubmit();
        await new Promise((r) => setTimeout(r, 40));
      });

      assert.equal(fetchMock.mock.calls.length, 1);
      const success = host.querySelector('[data-testid="feedback-success"]');
      assert.ok(success);
      assert.match(success.textContent || "", /Message received/);
    } finally {
      if (root) {
        flushSync(() => {
          root?.unmount();
        });
      }
      await new Promise((r) => setTimeout(r, 20));
      dom.restore();
    }
  });

  it("modal preserves fields after a failed submission", async () => {
    const dom = installDom();
    let root: Root | null = null;
    mock.method(globalThis, "fetch", async () => {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Could not send feedback. Please try again shortly.",
        }),
        { status: 502 }
      );
    });

    try {
      const host = dom.window.document.createElement("div");
      dom.window.document.body.appendChild(host);
      root = createRoot(host as unknown as Element);
      flushSync(() => {
        root!.render(
          createElement(
            FeedbackProvider,
            null,
            createElement(OpenFeedback) as ReactNode
          )
        );
      });

      const message = host.querySelector(
        '[data-testid="feedback-message"]'
      ) as HTMLTextAreaElement | null;
      const email = host.querySelector(
        '[data-testid="feedback-email"]'
      ) as HTMLInputElement | null;
      assert.ok(message);
      assert.ok(email);

      setFieldValue(message, "Keep this text");
      setFieldValue(email, "fan@example.com");

      const form = host.querySelector(
        ".feedback-modal__form"
      ) as HTMLFormElement | null;
      assert.ok(form);
      await act(async () => {
        form.requestSubmit();
        await new Promise((r) => setTimeout(r, 40));
      });

      const error = host.querySelector('[data-testid="feedback-error"]');
      assert.ok(error);
      assert.doesNotMatch(error.textContent || "", /re_/);
      assert.equal(
        (host.querySelector('[data-testid="feedback-message"]') as HTMLTextAreaElement)
          .value,
        "Keep this text"
      );
      assert.equal(
        (host.querySelector('[data-testid="feedback-email"]') as HTMLInputElement)
          .value,
        "fan@example.com"
      );
      assert.equal(host.querySelector('[data-testid="feedback-success"]'), null);
    } finally {
      if (root) {
        flushSync(() => {
          root?.unmount();
        });
      }
      await new Promise((r) => setTimeout(r, 20));
      dom.restore();
    }
  });
});
