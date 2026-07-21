import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Football Time Machine",
  description: "Experience football history as it happened, one match at a time.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
