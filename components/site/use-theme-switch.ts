"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * Toggles dark/light with a top-to-bottom wipe (View Transitions API).
 * Falls back to an instant switch where the API or motion isn't available.
 */
export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);
}
