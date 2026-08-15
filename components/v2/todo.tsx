/**
 * Development-only authoring markers.
 *
 * Anything gated on `showPlaceholders` is visible while building the site and
 * removed from production output, so half-written config can never ship as a
 * blank line on a recruiter-facing page.
 */
export const showPlaceholders = process.env.NODE_ENV !== "production";

export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-brand/40 text-brand/90 inline-block rounded border border-dashed px-1.5 py-0.5 font-mono text-xs">
      TODO: {children}
    </span>
  );
}
