"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const RADIUS = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface SectionLink {
  id: string;
  label: string;
}

/**
 * Floating pill that names the section you're reading, with a ring for page
 * progress. Tapping it opens a small menu to jump between sections.
 */
export function ScrollPill() {
  const [sections, setSections] = useState<SectionLink[]>([]);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
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

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const jumpTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const activeLabel = sections.find((s) => s.id === active)?.label ?? "Home";
  const label = open ? "Jump to" : activeLabel;

  return (
    <>
      {/* Content fades out under the pill instead of colliding with it. */}
      <div
        aria-hidden
        className="from-bg pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 bg-gradient-to-t to-transparent"
      />

      {/* Full-width flex row keeps the pill centred while its width animates. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <div ref={rootRef} className="pointer-events-auto relative flex flex-col items-center">
          <AnimatePresence>
            {open && (
              <motion.ul
                id="section-menu"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "bottom center" }}
                className="border-line-strong bg-surface/90 absolute bottom-full mb-2 w-48 rounded-xl border p-1 shadow-lg shadow-black/30 backdrop-blur-md"
              >
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(section.id)}
                      aria-current={section.id === active ? "location" : undefined}
                      className={cn(
                        "hover:bg-surface-2 hover:text-fg flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-colors duration-150",
                        section.id === active ? "text-fg" : "text-muted",
                      )}
                    >
                      {section.label}
                      {section.id === active && (
                        <span aria-hidden className="bg-fg size-1.5 rounded-full" />
                      )}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="section-menu"
            aria-label={open ? "Close section menu" : `Current section: ${activeLabel}. Jump to a section`}
            layout={!reduceMotion}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            whileTap={{ scale: 0.96 }}
            className="border-line-strong bg-surface/80 text-fg flex h-10 items-center gap-2.5 overflow-hidden rounded-full border pl-3 pr-4 text-[13px] shadow-lg shadow-black/20 backdrop-blur-md"
          >
            {open ? (
              <X aria-hidden className="size-[18px]" />
            ) : (
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
            )}
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
        </div>
      </div>
    </>
  );
}
