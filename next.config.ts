import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js deployment (Vercel Functions). Do not use `output: "export"` —
  // static export omits App Router API routes such as `/api/feedback`.
  images: { unoptimized: true },
};

export default nextConfig;
