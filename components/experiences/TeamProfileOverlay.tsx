"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import type { TournamentId } from "@/lib/archive/types";
import { getTeamDossier } from "@/lib/editorial";
import { teamIdFromName, tournamentShortLabel } from "@/lib/experiences/membership";
import { teamProfileAriaLabel } from "@/lib/experiences/participants";
import { TeamDossier, TeamProfileContent } from "./TeamDossier";

export type TeamProfileSelection = {
  tournamentId: TournamentId;
  teamName: string;
};

type TeamProfileOverlayProps = {
  selection: TeamProfileSelection | null;
  onClose: () => void;
  /** Element that opened the overlay — focus restores here on close. */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Full Team Profile over a Match page (or other surface).
 * Does not push history; Journey campaign controls are never included.
 */
export function TeamProfileOverlay({
  selection,
  onClose,
  returnFocusRef,
}: TeamProfileOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const scrollLock = useRef<{
    bodyOverflow: string;
    matchScrollEl: HTMLElement | null;
    matchScrollTop: number;
  } | null>(null);

  const dossier =
    selection == null
      ? null
      : getTeamDossier(selection.tournamentId, teamIdFromName(selection.teamName));

  useLayoutEffect(() => {
    if (!selection || !dossier) return;

    previouslyFocused.current =
      (document.activeElement as HTMLElement | null) ??
      returnFocusRef?.current ??
      null;

    const matchScrollEl =
      document.querySelector<HTMLElement>(
        '[data-testid="match-experience-modal"]'
      ) ?? null;
    scrollLock.current = {
      bodyOverflow: document.body.style.overflow,
      matchScrollEl,
      matchScrollTop: matchScrollEl?.scrollTop ?? 0,
    };
    document.body.style.overflow = "hidden";
    if (matchScrollEl) matchScrollEl.style.overflow = "hidden";

    panelRef.current?.scrollTo(0, 0);
    closeBtnRef.current?.focus();

    return () => {
      const lock = scrollLock.current;
      if (lock) {
        document.body.style.overflow = lock.bodyOverflow;
        if (lock.matchScrollEl) {
          lock.matchScrollEl.style.overflow = "";
          lock.matchScrollEl.scrollTop = lock.matchScrollTop;
        }
      }
      scrollLock.current = null;
      const restore =
        returnFocusRef?.current ?? previouslyFocused.current ?? null;
      restore?.focus?.();
    };
  }, [selection, dossier, returnFocusRef]);

  useEffect(() => {
    if (!selection || !dossier) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      if (nodes.length === 0) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [selection, dossier, onClose]);

  if (!selection || !dossier) return null;

  return (
    <div
      className="team-profile-overlay__backdrop"
      data-testid="team-profile-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        className="team-profile-overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="team-profile-overlay__close"
          onClick={onClose}
          aria-label="Close Team Profile"
        >
          ×
        </button>
        <p id={titleId} className="visually-hidden">
          {selection.teamName} at {tournamentShortLabel(selection.tournamentId)}{" "}
          Team Profile
        </p>
        <TeamProfileContent dossier={dossier} teamName={selection.teamName} />
      </div>
    </div>
  );
}

type TeamProfileTriggerProps = {
  tournamentId: TournamentId;
  teamName: string;
  className?: string;
  children: ReactNode;
  onOpen: (selection: TeamProfileSelection) => void;
};

/** Accessible control that opens the shared Team Profile overlay. */
export function TeamProfileTrigger({
  tournamentId,
  teamName,
  className,
  children,
  onOpen,
}: TeamProfileTriggerProps) {
  return (
    <button
      type="button"
      className={className}
      data-testid="team-profile-trigger"
      data-team-name={teamName}
      aria-label={teamProfileAriaLabel(tournamentId, teamName)}
      onClick={() => onOpen({ tournamentId, teamName })}
    >
      {children}
    </button>
  );
}

/** Re-export canonical content component for tests and Journey pages. */
export { TeamDossier, TeamProfileContent };
