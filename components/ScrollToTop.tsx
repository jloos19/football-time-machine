"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  consumeScrollToMensWorldCups,
  scrollToMensWorldCups,
} from "@/lib/home";

/**
 * Single source of truth for route scroll: every pathname change opens at the top,
 * unless a pending WORLD CUPS → Men's World Cups scroll was requested.
 * Disables the browser's history scroll restoration so back/forward match the same rule.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Legacy collection URLs redirect to `/` with a pending shelf scroll — skip the top jump.
    if (pathname === "/world-cups" || pathname === "/collection") {
      return;
    }

    if (consumeScrollToMensWorldCups()) {
      scrollToMensWorldCups("smooth");
      return;
    }

    // Instant jump — options-form `behavior: "auto"` can still follow CSS `scroll-behavior`.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
