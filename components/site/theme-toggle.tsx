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

export function ThemeToggle({ className }: ThemeToggleProps) {
  const toggle = useThemeSwitch();

  // Press D anywhere to flip the theme.
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

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme (D)"
      className={cn(
        "text-muted hover:text-fg hover:bg-surface-2 inline-flex size-8 items-center justify-center rounded-md transition-[color,background-color,transform] duration-150 active:scale-[0.94]",
        className,
      )}
    >
      <Moon className="hidden size-4 dark:block" />
      <Sun className="size-4 dark:hidden" />
    </button>
  );
}
