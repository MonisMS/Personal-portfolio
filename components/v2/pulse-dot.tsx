import { cn } from "@/lib/utils";

/**
 * The "open to work" status dot. A solid green core with a slow ping ring so it
 * reads as *live* rather than a static bullet. The ping is the one bit of idle
 * motion on the page — it stops entirely under `prefers-reduced-motion`.
 */
export function PulseDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex size-1.5 shrink-0", className)}
    >
      <span className="bg-positive absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
      <span className="bg-positive relative inline-flex size-1.5 rounded-full" />
    </span>
  );
}
