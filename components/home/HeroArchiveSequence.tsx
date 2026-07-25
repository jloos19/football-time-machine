"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  HERO_ARCHIVE_CROSSFADE_MS,
  HERO_ARCHIVE_HOLD_MS,
  HERO_ARCHIVE_IMAGES,
} from "@/lib/home/hero-archive-images";

/**
 * Right-side hero archival image sequence.
 * Atmosphere only — no matchups, stages, scores, or outcomes.
 * Rotation starts after mount; SSR and first client paint share image 0.
 */
export function HeroArchiveSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return;
    }

    let cancelled = false;
    setAllowMotion(true);

    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let paused = document.visibilityState === "hidden";

    const clearHold = () => {
      if (holdTimer !== null) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    const scheduleAdvance = () => {
      clearHold();
      if (cancelled || paused) return;
      holdTimer = setTimeout(() => {
        if (cancelled || paused) return;
        setActiveIndex((current) => (current + 1) % HERO_ARCHIVE_IMAGES.length);
        scheduleAdvance();
      }, HERO_ARCHIVE_HOLD_MS);
    };

    const onVisibility = () => {
      paused = document.visibilityState === "hidden";
      if (paused) {
        clearHold();
        return;
      }
      scheduleAdvance();
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        paused = true;
        clearHold();
        setAllowMotion(false);
        setActiveIndex(0);
        return;
      }
      setAllowMotion(true);
      paused = document.visibilityState === "hidden";
      if (!paused) scheduleAdvance();
    };

    scheduleAdvance();
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      clearHold();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <aside
      className="hero-archive"
      aria-hidden="true"
      data-hero-archive=""
      data-active-index={activeIndex}
      data-motion={allowMotion ? "on" : "off"}
      style={
        {
          "--hero-archive-crossfade-ms": `${HERO_ARCHIVE_CROSSFADE_MS}ms`,
          "--hero-archive-hold-ms": `${HERO_ARCHIVE_HOLD_MS}ms`,
        } as CSSProperties
      }
    >
      <div className="hero-archive__glow" data-hero-archive-glow="" />
      <div className="hero-archive__stage">
        {HERO_ARCHIVE_IMAGES.map((image, index) => {
          const isActive = index === activeIndex;
          const isFirst = index === 0;
          return (
            <div
              key={image.id}
              className={
                isActive
                  ? "hero-archive__slide is-active"
                  : "hero-archive__slide"
              }
              data-archive-id={image.id}
            >
              {/* Decorative atmospheric imagery — empty alt, parent aria-hidden */}
              <img
                className={
                  allowMotion && isActive
                    ? "hero-archive__image hero-archive__image--drift"
                    : "hero-archive__image"
                }
                src={image.src}
                alt=""
                decoding="async"
                fetchPriority={isFirst ? "high" : "low"}
                loading={isFirst ? "eager" : "lazy"}
                draggable={false}
                style={{
                  objectPosition: image.focalPosition ?? "center center",
                }}
              />
            </div>
          );
        })}
        <div className="hero-archive__grain" />
      </div>
    </aside>
  );
}
