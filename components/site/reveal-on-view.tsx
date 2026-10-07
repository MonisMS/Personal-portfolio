"use client";

import { useEffect, useRef, useState } from "react";

interface RevealOnViewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Flips `data-reveal` to "shown" the first time this scrolls into view.
 * The actual motion lives in CSS (see `.heat-col` in globals.css).
 */
export function RevealOnView({ children, className }: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={shown ? "shown" : "hidden"} className={className}>
      {children}
    </div>
  );
}
