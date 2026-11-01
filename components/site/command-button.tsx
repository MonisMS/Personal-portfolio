"use client";

import { useSyncExternalStore } from "react";
import { openCommandMenu } from "./command-menu";
import { cn } from "@/lib/utils";

interface CommandButtonProps {
  className?: string;
}

const subscribeNoop = () => () => {};

function useIsMac() {
  return useSyncExternalStore(
    subscribeNoop,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );
}

/** The platform's modifier key: ⌘ on Apple devices, Ctrl elsewhere. */
export function ModKey() {
  return useIsMac() ? "⌘" : "Ctrl";
}

export function CommandButton({ className }: CommandButtonProps) {
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={openCommandMenu}
      aria-label="Open command menu"
      className={cn(
        "border-line text-subtle hover:text-fg hover:border-line-strong inline-flex h-8 items-center gap-1 rounded-md border px-2 font-mono text-[0.6875rem] transition-[color,border-color,transform] duration-150 active:scale-[0.96]",
        className,
      )}
    >
      <kbd className="font-mono">{isMac ? "⌘" : "Ctrl"}</kbd>
      <kbd className="font-mono">K</kbd>
    </button>
  );
}
