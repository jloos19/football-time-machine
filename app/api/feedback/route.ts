import { NextResponse } from "next/server";
import {
  checkFeedbackRateLimit,
  createFeedbackService,
  feedbackConfigErrorMessage,
  missingFeedbackConfigKeys,
  validateFeedbackSubmission,
} from "@/lib/feedback";

export const runtime = "nodejs";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "anonymous";
  }
  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const rate = checkFeedbackRateLimit(clientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many feedback submissions. Please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      }
    );
  }

  const parsed = validateFeedbackSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: parsed.error },
      { status: 400 }
    );
  }

  // Honeypot / silent discard — pretend success without sending mail.
  if (parsed.discard) {
    return NextResponse.json({ ok: true });
  }

  const service = createFeedbackService();
  if (!service.isConfigured()) {
    const missing = missingFeedbackConfigKeys();
    console.error(
      "[feedback] Missing configuration (server-only):",
      missing.join(", ") || "(unknown)"
    );
    return NextResponse.json(
      {
        ok: false,
        error: feedbackConfigErrorMessage(),
      },
      { status: 503 }
    );
  }

  const result = await service.submit(parsed.value);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
