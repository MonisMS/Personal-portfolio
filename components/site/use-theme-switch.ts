"use client";

import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

/**
 * Toggles dark/light with a top-to-bottom wipe (View Transitions API).
 * Falls back to an instant switch where the API or motion isn't available.
 */
export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] },
        {
          duration: 650,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, [resolvedTheme, setTheme]);
}
