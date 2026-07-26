"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isAppShellPath } from "@/lib/experiences/app-routes";
import { FeedbackProvider } from "./feedback/FeedbackContext";
import { FootballTimeMachine } from "./FootballTimeMachine";
import { ScrollToTop } from "./ScrollToTop";

/**
 * Mounts the experience shell once for all app routes so client state
 * (open match modal, progress, return targets) survives soft navigations.
 * Dev tools and unknown routes render page children instead.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";

  return (
    <FeedbackProvider>
      <ScrollToTop />
      {isAppShellPath(pathname) ? <FootballTimeMachine /> : children}
    </FeedbackProvider>
  );
}
