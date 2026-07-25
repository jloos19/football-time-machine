"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PosterTheme } from "@/data/worldCupPosters";

type PosterProps = {
  src: string;
  alt: string;
  theme: PosterTheme;
  className?: string;
  decorative?: boolean;
  children?: React.ReactNode;
};

export function Poster({
  src,
  alt,
  theme,
  className = "",
  decorative = false,
  children,
}: PosterProps) {
  const [useFallback, setUseFallback] = useState(!src);

  useEffect(() => {
    setUseFallback(!src);
  }, [src]);

  return (
    <div
      className={`poster ${useFallback ? `poster--fallback poster--${theme}` : ""} ${className}`.trim()}
      aria-hidden={decorative ? true : undefined}
    >
      {!useFallback && src && (
        <Image
          src={src}
          alt={decorative ? "" : alt}
          fill
          sizes="(max-width: 768px) 78vw, 336px"
          className="poster__image"
          onError={() => setUseFallback(true)}
        />
      )}
      <div className="poster__overlay" aria-hidden="true" />
      {children}
    </div>
  );
}
