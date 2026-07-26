"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FeedbackPageContext } from "@/lib/feedback";
import { FeedbackModal } from "./FeedbackModal";

type FeedbackContextValue = {
  open: boolean;
  /** Open the feedback modal. Pass match-page context when available. */
  openFeedback: (context?: FeedbackPageContext) => void;
  closeFeedback: () => void;
  /** Context captured when the modal was opened (for hidden metadata). */
  openContext: FeedbackPageContext | null;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [openContext, setOpenContext] = useState<FeedbackPageContext | null>(
    null
  );

  const openFeedback = useCallback((context?: FeedbackPageContext) => {
    setOpenContext(context && hasAnyContext(context) ? context : null);
    setOpen(true);
  }, []);

  const closeFeedback = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      openFeedback,
      closeFeedback,
      openContext,
    }),
    [open, openFeedback, closeFeedback, openContext]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <FeedbackModal />
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }
  return ctx;
}

/** Safe hook for optional surfaces that may render outside the provider in tests. */
export function useOptionalFeedback(): FeedbackContextValue | null {
  return useContext(FeedbackContext);
}

function hasAnyContext(context: FeedbackPageContext): boolean {
  return Boolean(
    context.tournament?.trim() ||
      context.journey?.trim() ||
      context.experience?.trim() ||
      context.match?.trim() ||
      context.route?.trim() ||
      context.currentRoute?.trim() ||
      context.replayProvider?.trim()
  );
}
