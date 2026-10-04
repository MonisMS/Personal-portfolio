"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { openCommandMenu } from "./command-menu";

const RADIUS = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating pill that names the section you're reading, with a ring for page
 * progress. Tapping it opens the command menu.
 */
export function ScrollPill() {
  const [label, setLabel] = useState("Home");
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      // The active section is the last one whose top has passed 40% of the viewport.
      const line = window.innerHeight * 0.4;
      let current = "Home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.dataset.section ?? current;
        }
      }
      setLabel(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Content fades out under the pill instead of colliding with it. */}
      <div
        aria-hidden
        className="from-bg pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 bg-gradient-to-t to-transparent"
      />
      <motion.button
        type="button"
        onClick={openCommandMenu}
        aria-label={`Current section: ${label}. Open command menu`}
        layout={!reduceMotion}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className="border-line-strong bg-surface/80 text-fg fixed bottom-6 left-1/2 z-50 flex h-10 items-center gap-2.5 overflow-hidden rounded-full border pl-3 pr-4 text-[13px] shadow-lg shadow-black/20 backdrop-blur-md"
        style={{ x: "-50%" }}
        whileTap={{ scale: 0.96 }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="-rotate-90">
          <circle cx="9" cy="9" r={RADIUS} fill="none" stroke="var(--line-strong)" strokeWidth="2" />
          <circle
            cx="9"
            cy="9"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={label}
            initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
