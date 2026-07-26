import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_OG_IMAGE_PATH,
  SITE_ORIGIN,
  absoluteUrl,
} from "@/lib/site";
import { OUR_STORY_PATH } from "./timeline";

export const OUR_STORY_TITLE = `Our Story | ${SITE_NAME}`;

export const OUR_STORY_DESCRIPTION =
  "Discover why Football Time Machine was built and how its spoiler-free journeys let supporters experience football history one match at a time.";

export function buildOurStoryMetadata(): Metadata {
  const url = absoluteUrl(OUR_STORY_PATH);
  const image = absoluteUrl(SITE_OG_IMAGE_PATH);

  return {
    title: OUR_STORY_TITLE,
    description: OUR_STORY_DESCRIPTION,
    alternates: {
      canonical: OUR_STORY_PATH,
    },
    openGraph: {
      title: OUR_STORY_TITLE,
      description: OUR_STORY_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          alt: "Rows of empty stadium seats before spectators arrive",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: OUR_STORY_TITLE,
      description: OUR_STORY_DESCRIPTION,
      images: [image],
    },
    other: {
      "og:site_name": SITE_NAME,
    },
  };
}

export { SITE_ORIGIN };
