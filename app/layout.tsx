import { Cormorant_Garamond, Inter } from "next/font/google";
import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { SITE_NAME, SITE_OG_IMAGE_PATH, SITE_ORIGIN, absoluteUrl } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: SITE_NAME,
  description: "Experience football history as it happened, one match at a time.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: absoluteUrl(SITE_OG_IMAGE_PATH),
        alt: "Rows of empty stadium seats before spectators arrive",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
