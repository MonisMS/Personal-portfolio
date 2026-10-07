"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeSwitch } from "./use-theme-switch";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

/** Press D anywhere to flip the theme. Mounted once, in the root layout. */
export function ThemeShortcut() {
  const toggle = useThemeSwitch();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "d") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target)) return;
      if (document.querySelector("[data-command-menu]")) return;
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return null;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const toggle = useThemeSwitch();

  return (
    <button
      type="button"
      onClick={toggle}
      title="Toggle theme (D)"
      className={cn(
        "text-muted hover:text-fg hover:bg-surface-2 inline-flex size-8 items-center justify-center rounded-md transition-[color,background-color,transform] duration-150 active:scale-[0.94]",
        className,
      )}
    >
      <Moon aria-hidden className="hidden size-4 dark:block" />
      <Sun aria-hidden className="size-4 dark:hidden" />
      {/* Label follows the theme via CSS, so it never mismatches on hydration. */}
      <span className="sr-only hidden dark:block">Switch to light theme</span>
      <span className="sr-only dark:hidden">Switch to dark theme</span>
    </button>
  );
}
