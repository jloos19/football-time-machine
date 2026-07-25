export type ParsedFifaUrl = {
  canonicalUrl: string;
  host: "fifa.com" | "plus.fifa.com";
  locale: string;
  fifaContentId?: string;
  uuid?: string;
  slug?: string;
};

const FIFA_HOSTS = new Set(["fifa.com", "www.fifa.com", "plus.fifa.com", "www.plus.fifa.com"]);

export function isFifaHost(hostname: string): boolean {
  return FIFA_HOSTS.has(hostname.toLowerCase());
}

export function parseFifaUrl(rawUrl: string): ParsedFifaUrl | null {
  try {
    const parsed = new URL(rawUrl);
    if (!isFifaHost(parsed.hostname)) return null;

    const host = parsed.hostname.includes("plus.") ? "plus.fifa.com" : "fifa.com";
    const segments = parsed.pathname.split("/").filter(Boolean);
    const locale = segments[0] ?? "en";

    if (host === "fifa.com" && segments[1] === "watch" && segments[2]) {
      return {
        canonicalUrl: normalizeFifaUrl(parsed.toString()),
        host,
        locale,
        fifaContentId: segments[2],
      };
    }

    if (host === "plus.fifa.com" && segments[1] === "content" && segments[2] && segments[3]) {
      return {
        canonicalUrl: normalizeFifaUrl(parsed.toString()),
        host,
        locale,
        slug: segments[2],
        uuid: segments[3],
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function normalizeFifaUrl(rawUrl: string): string {
  const parsed = parseFifaUrl(rawUrl);
  if (!parsed) return rawUrl;
  if (parsed.fifaContentId) {
    return `https://www.fifa.com/${parsed.locale}/watch/${parsed.fifaContentId}`;
  }
  if (parsed.uuid && parsed.slug) {
    return `https://www.plus.fifa.com/${parsed.locale}/content/${parsed.slug}/${parsed.uuid}`;
  }
  return rawUrl;
}

export function isFifaReplayUrl(url: string): boolean {
  return parseFifaUrl(url) !== null;
}

export function titleFromFifaSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => {
      if (word === "v") return "v";
      if (word === "vs") return "v";
      if (word === "tm") return "™";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace(/ v /g, " v ")
    .replace(/ ™/g, "™");
}
