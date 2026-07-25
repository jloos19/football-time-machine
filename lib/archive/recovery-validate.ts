import type { ReplayProvider } from "@/lib/replays/types";
import {
  detectProviderFromUrl,
  isOfficialSourceProvider,
  looksLikeHighlightsTitle,
} from "./recovery";
import type { RecoveryCandidateValidation } from "./recovery-types";
import { isFifaReplayUrl } from "./fifa-url";

const FETCH_TIMEOUT_MS = 20_000;
const USER_AGENT =
  "FootballTimeMachine-RecoveryValidate/1.0 (+https://github.com/football-time-machine)";

const MIN_FULL_MATCH_SECONDS = 75 * 60;

export type CandidateValidationResult = {
  provider: ReplayProvider;
  officialSource: boolean;
  title?: string;
  uploader?: string;
  durationSeconds?: number;
  publicAvailability?: string;
  embeddable?: boolean;
  candidateStatus: "metadata-valid" | "needs-human-review" | "rejected";
  rejectionReason?: string;
  validation: RecoveryCandidateValidation;
};

async function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        ...(init.headers ?? {}),
      },
      redirect: "follow",
    });
  } finally {
    clearTimeout(timeout);
  }
}

function parseJsonSafe(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function parseIso8601Duration(duration: string): number | undefined {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;
  const hours = Number.parseInt(match[1] ?? "0", 10);
  const minutes = Number.parseInt(match[2] ?? "0", 10);
  const seconds = Number.parseInt(match[3] ?? "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop() ?? null;
    }
  } catch {
    return null;
  }
  return null;
}

export function extractDailymotionVideoId(url: string): string | null {
  const match = url.match(/dailymotion\.com\/video\/([^/?#]+)/i);
  return match?.[1] ?? null;
}

function isFifaWatchUrl(url: string): boolean {
  return isFifaReplayUrl(url);
}

function buildValidationBase(
  rejectionReasons: string[],
  partial: Partial<RecoveryCandidateValidation> = {}
): RecoveryCandidateValidation {
  return {
    validatedAt: new Date().toISOString(),
    domainOk: partial.domainOk ?? false,
    pageResponded: partial.pageResponded ?? false,
    rejectionReasons,
    requiresHumanPlayback: true,
    ...partial,
  };
}

async function validateFifaUrl(url: string): Promise<CandidateValidationResult> {
  const provider: ReplayProvider = "FIFA";
  const rejectionReasons: string[] = [];
  const originallyFifa = isFifaWatchUrl(url);

  try {
    const response = await fetchWithTimeout(url);
    const finalUrl = response.url;
    const body = await response.text();
    const domainOk = originallyFifa || isFifaWatchUrl(finalUrl);
    const pageResponded = response.ok;

    if (!domainOk) {
      rejectionReasons.push("URL is not a FIFA watch or FIFA+ content page");
    } else if (!originallyFifa && isFifaWatchUrl(finalUrl)) {
      /* redirected to a recognized FIFA replay URL */
    } else if (originallyFifa && !isFifaWatchUrl(finalUrl)) {
      rejectionReasons.push(
        "FIFA page redirected away from the submitted watch/content URL — verify manually"
      );
    }

    if (!response.ok) {
      rejectionReasons.push(`FIFA page returned HTTP ${response.status}`);
    }

    const lower = body.toLowerCase();
    if (
      lower.includes("page not found") ||
      lower.includes("content unavailable") ||
      lower.includes("no longer available")
    ) {
      rejectionReasons.push("FIFA page suggests content is unavailable");
    }

    const validation = buildValidationBase(rejectionReasons, {
      domainOk,
      pageResponded,
      availability: response.ok ? "page-responded" : `http-${response.status}`,
    });

    const hardFailures = rejectionReasons.filter(
      (reason) =>
        reason.includes("not a FIFA watch") ||
        reason.includes("content is unavailable") ||
        reason.startsWith("FIFA page returned HTTP 404")
    );

    if (hardFailures.length > 0) {
      return {
        provider,
        officialSource: true,
        publicAvailability: validation.availability,
        candidateStatus: "rejected",
        rejectionReason: rejectionReasons.join("; "),
        validation,
      };
    }

    return {
      provider,
      officialSource: true,
      publicAvailability: validation.availability,
      candidateStatus: "needs-human-review",
      rejectionReason: rejectionReasons.length > 0 ? rejectionReasons.join("; ") : undefined,
      validation,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "FIFA validation failed";
    return {
      provider,
      officialSource: originallyFifa,
      candidateStatus: originallyFifa ? "needs-human-review" : "rejected",
      rejectionReason: message,
      validation: buildValidationBase([message], { domainOk: originallyFifa }),
    };
  }
}

async function validateYouTubeUrl(url: string): Promise<CandidateValidationResult> {
  const provider: ReplayProvider = "YouTube";
  const videoId = extractYouTubeVideoId(url);
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (apiKey && videoId) {
    try {
      const apiUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
      apiUrl.searchParams.set("part", "snippet,contentDetails,status");
      apiUrl.searchParams.set("id", videoId);
      apiUrl.searchParams.set("key", apiKey);

      const response = await fetchWithTimeout(apiUrl.toString());
      const payload = parseJsonSafe(await response.text());
      const items = (payload?.items as Record<string, unknown>[] | undefined) ?? [];

      if (items.length === 0) {
        return {
          provider,
          officialSource: false,
          candidateStatus: "rejected",
          rejectionReason: "YouTube video not found or deleted",
          validation: buildValidationBase(["Video not found in YouTube Data API"], {
            domainOk: true,
            pageResponded: false,
          }),
        };
      }

      const item = items[0]!;
      const snippet = item.snippet as Record<string, unknown> | undefined;
      const contentDetails = item.contentDetails as Record<string, unknown> | undefined;
      const status = item.status as Record<string, unknown> | undefined;

      const title = typeof snippet?.title === "string" ? snippet.title : undefined;
      const channelTitle =
        typeof snippet?.channelTitle === "string" ? snippet.channelTitle : undefined;
      const privacyStatus =
        typeof status?.privacyStatus === "string" ? status.privacyStatus : undefined;
      const embeddable = status?.embeddable === true;
      const uploadStatus =
        typeof status?.uploadStatus === "string" ? status.uploadStatus : undefined;
      const durationSeconds = parseIso8601Duration(
        typeof contentDetails?.duration === "string" ? contentDetails.duration : ""
      );

      const rejectionReasons: string[] = [];
      if (privacyStatus === "private") rejectionReasons.push("Video is private");
      if (uploadStatus === "deleted" || uploadStatus === "rejected") {
        rejectionReasons.push(`Upload status: ${uploadStatus}`);
      }
      if (embeddable === false) rejectionReasons.push("Video is not embeddable");
      if (looksLikeHighlightsTitle(title)) {
        rejectionReasons.push("Title suggests highlights, not full match");
      }
      if (
        durationSeconds !== undefined &&
        durationSeconds < MIN_FULL_MATCH_SECONDS
      ) {
        rejectionReasons.push(
          `Duration ${Math.round(durationSeconds / 60)} min is below plausible full-match minimum`
        );
      }

      const validation = buildValidationBase(rejectionReasons, {
        domainOk: true,
        pageResponded: true,
        privacyStatus,
        embeddable,
        uploadStatus,
        durationSeconds,
        availability: privacyStatus ?? "unknown",
      });

      if (rejectionReasons.length > 0) {
        return {
          provider,
          officialSource: false,
          title,
          uploader: channelTitle,
          durationSeconds,
          publicAvailability: privacyStatus,
          embeddable,
          candidateStatus: "rejected",
          rejectionReason: rejectionReasons.join("; "),
          validation,
        };
      }

      return {
        provider,
        officialSource: false,
        title,
        uploader: channelTitle,
        durationSeconds,
        publicAvailability: privacyStatus,
        embeddable,
        candidateStatus: "needs-human-review",
        validation,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "YouTube API validation failed";
      return {
        provider,
        officialSource: false,
        candidateStatus: "needs-human-review",
        rejectionReason: message,
        validation: buildValidationBase([message], { domainOk: true }),
      };
    }
  }

  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  try {
    const response = await fetchWithTimeout(oembedUrl);
    const text = await response.text();
    const payload = parseJsonSafe(text);
    const rejectionReasons: string[] = [];

    if (response.status === 404) {
      rejectionReasons.push("YouTube oEmbed returned 404");
    } else if (!response.ok) {
      rejectionReasons.push(`YouTube oEmbed HTTP ${response.status}`);
    }

    const title = typeof payload?.title === "string" ? payload.title : undefined;
    const uploader = typeof payload?.author_name === "string" ? payload.author_name : undefined;

    if (looksLikeHighlightsTitle(title)) {
      rejectionReasons.push("Title suggests highlights, not full match");
    }

    const validation = buildValidationBase(rejectionReasons, {
      domainOk: !!videoId,
      pageResponded: response.ok,
    });

    if (rejectionReasons.some((r) => r.includes("404"))) {
      return {
        provider,
        officialSource: false,
        title,
        uploader,
        candidateStatus: "rejected",
        rejectionReason: rejectionReasons.join("; "),
        validation,
      };
    }

    return {
      provider,
      officialSource: false,
      title,
      uploader,
      candidateStatus: rejectionReasons.length > 0 ? "rejected" : "needs-human-review",
      rejectionReason: rejectionReasons.length > 0 ? rejectionReasons.join("; ") : undefined,
      validation,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "YouTube oEmbed failed";
    return {
      provider,
      officialSource: false,
      candidateStatus: "needs-human-review",
      validation: buildValidationBase([message]),
    };
  }
}

async function validateDailymotionUrl(url: string): Promise<CandidateValidationResult> {
  const provider: ReplayProvider = "Dailymotion";
  const videoId = extractDailymotionVideoId(url);
  const rejectionReasons: string[] = [];

  if (!videoId) {
    return {
      provider,
      officialSource: false,
      candidateStatus: "rejected",
      rejectionReason: "Could not extract Dailymotion video ID",
      validation: buildValidationBase(["Invalid Dailymotion URL"]),
    };
  }

  const oembedUrl = `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(url)}&format=json`;

  let title: string | undefined;
  let uploader: string | undefined;
  let durationSeconds: number | undefined;
  let pageResponded = false;

  try {
    const oembedResponse = await fetchWithTimeout(oembedUrl);
    const oembedText = await oembedResponse.text();
    const oembedPayload = parseJsonSafe(oembedText);
    pageResponded = oembedResponse.ok;

    if (oembedResponse.status === 404) {
      rejectionReasons.push("Dailymotion oEmbed returned 404");
    } else if (oembedResponse.status === 401 || oembedResponse.status === 403) {
      rejectionReasons.push("Dailymotion oEmbed indicates private or restricted video");
    }

    title = typeof oembedPayload?.title === "string" ? oembedPayload.title : undefined;
    uploader =
      typeof oembedPayload?.author_name === "string" ? oembedPayload.author_name : undefined;

    if (looksLikeHighlightsTitle(title)) {
      rejectionReasons.push("Title suggests highlights, not full match");
    }

    const metaUrl = `https://www.dailymotion.com/video/${videoId}?fields=title,duration,private,published,geoblocking,status`;
    try {
      const metaResponse = await fetchWithTimeout(metaUrl, {
        headers: { Accept: "application/json" },
      });
      const metaPayload = parseJsonSafe(await metaResponse.text());
      if (metaPayload) {
        if (typeof metaPayload.duration === "number") {
          durationSeconds = metaPayload.duration;
        }
        if (metaPayload.private === true) {
          rejectionReasons.push("Dailymotion metadata marks video as private");
        }
        if (typeof metaPayload.geoblocking === "string" && metaPayload.geoblocking !== "none") {
          rejectionReasons.push(`Geoblocking: ${metaPayload.geoblocking}`);
        }
        if (typeof metaPayload.status === "string" && metaPayload.status !== "ready") {
          rejectionReasons.push(`Video status: ${metaPayload.status}`);
        }
        if (typeof metaPayload.title === "string" && !title) {
          title = metaPayload.title;
        }
      }
    } catch {
      /* metadata API optional */
    }

    if (
      durationSeconds !== undefined &&
      durationSeconds < MIN_FULL_MATCH_SECONDS
    ) {
      rejectionReasons.push(
        `Duration ${Math.round(durationSeconds / 60)} min is below plausible full-match minimum`
      );
    }

    const validation = buildValidationBase(rejectionReasons, {
      domainOk: true,
      pageResponded,
      durationSeconds,
      private: rejectionReasons.some((r) => r.includes("private")),
      published: pageResponded,
      availability: pageResponded ? "oembed-ok" : "unknown",
      geoblocking: rejectionReasons.find((r) => r.startsWith("Geoblocking:"))?.replace(
        "Geoblocking: ",
        ""
      ),
    });

    if (rejectionReasons.some((r) => r.includes("404") || r.includes("private"))) {
      return {
        provider,
        officialSource: false,
        title,
        uploader,
        durationSeconds,
        candidateStatus: "rejected",
        rejectionReason: rejectionReasons.join("; "),
        validation,
      };
    }

    return {
      provider,
      officialSource: false,
      title,
      uploader,
      durationSeconds,
      publicAvailability: validation.availability,
      candidateStatus: rejectionReasons.length > 0 ? "rejected" : "needs-human-review",
      rejectionReason: rejectionReasons.length > 0 ? rejectionReasons.join("; ") : undefined,
      validation,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Dailymotion validation failed";
    return {
      provider,
      officialSource: false,
      candidateStatus: "needs-human-review",
      validation: buildValidationBase([message], { domainOk: true }),
    };
  }
}

async function validateGenericUrl(url: string, provider: ReplayProvider): Promise<CandidateValidationResult> {
  const rejectionReasons: string[] = [];
  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      rejectionReasons.push(`URL returned HTTP ${response.status}`);
    }
    const validation = buildValidationBase(rejectionReasons, {
      domainOk: true,
      pageResponded: response.ok,
      availability: response.ok ? "page-responded" : `http-${response.status}`,
    });
    return {
      provider,
      officialSource: isOfficialSourceProvider(provider),
      publicAvailability: validation.availability,
      candidateStatus: rejectionReasons.length > 0 ? "rejected" : "needs-human-review",
      rejectionReason: rejectionReasons.length > 0 ? rejectionReasons.join("; ") : undefined,
      validation,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "URL validation failed";
    return {
      provider,
      officialSource: isOfficialSourceProvider(provider),
      candidateStatus: "needs-human-review",
      validation: buildValidationBase([message]),
    };
  }
}

export async function validateRecoveryCandidateUrl(
  url: string,
  providerOverride?: ReplayProvider
): Promise<CandidateValidationResult> {
  const provider = providerOverride ?? detectProviderFromUrl(url);

  switch (provider) {
    case "FIFA":
      return validateFifaUrl(url);
    case "YouTube":
      return validateYouTubeUrl(url);
    case "Dailymotion":
      return validateDailymotionUrl(url);
    default:
      return validateGenericUrl(url, provider);
  }
}
