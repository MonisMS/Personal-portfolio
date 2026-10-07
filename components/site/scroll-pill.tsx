"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { openCommandMenu } from "./command-menu";

const RADIUS = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface SectionLink {
  id: string;
  label: string;
}

/**
 * Floating pill that names the section you're reading, with a ring for page
 * progress. Tapping it opens the command menu.
 */
export function ScrollPill() {
  const [sections, setSections] = useState<SectionLink[]>([]);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    const links = [
      { id: "home", label: "Home" },
      ...elements.map((el) => ({ id: el.id, label: el.dataset.section ?? el.id })),
    ];

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      // Active = the last section whose top has passed 40% of the viewport.
      const line = window.innerHeight * 0.4;
      let current = "home";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Read the DOM after paint; the section list never changes afterwards.
    const init = requestAnimationFrame(() => {
      setSections(links);
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(init);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeLabel = sections.find((s) => s.id === active)?.label ?? "Home";

  return (
    <>
      {/* Content fades out under the pill instead of colliding with it. */}
      <div
        aria-hidden
        className="from-bg pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 bg-gradient-to-t to-transparent"
      />

      {/* Full-width flex row keeps the pill centred while its width animates. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-50 flex justify-center px-4">
        <div className="pointer-events-auto">
          <motion.button
            type="button"
            onClick={openCommandMenu}
            aria-label={`Current section: ${activeLabel}. Open command menu`}
            layout={!reduceMotion}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            whileTap={{ scale: 0.96 }}
            className="border-line-strong bg-surface/80 text-fg flex h-10 items-center gap-2.5 overflow-hidden rounded-full border pl-3 pr-4 text-[0.8125rem] shadow-lg shadow-black/20 backdrop-blur-md"
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
                key={activeLabel}
                initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap"
              >
                {activeLabel}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </>
  );
}
