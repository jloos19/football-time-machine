import type { Metadata } from "next";
import { buildOurStoryMetadata } from "@/lib/our-story";

export const metadata: Metadata = buildOurStoryMetadata();

/** Shell owns the UI; this page exists for the `/our-story` route segment. */
export default function OurStoryRoute() {
  return null;
}
