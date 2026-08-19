import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * macOS Photo Booth-style frame for the hero portrait.
 *
 * The window chrome (title, toolbar, shutter) is decorative and `aria-hidden`;
 * the only real content is a genuine photo of Monis. The thumbnail strip reuses
 * that same photo under CSS filters to evoke Photo Booth's effects row — it
 * misrepresents nothing, it's the one image styled four ways.
 */

const FILTERS = [
  "grayscale(1) contrast(1.05)",
  "sepia(0.55) saturate(1.2)",
  "contrast(1.35) brightness(1.05)",
  "saturate(1.45) hue-rotate(-12deg)",
  "grayscale(1) brightness(1.12) contrast(0.95)",
  "sepia(0.3) contrast(1.15) brightness(1.05)",
] as const;

export function PhotoBooth({
  src,
  alt,
  shots,
  className,
}: {
  src: string;
  alt: string;
  /** Real photos to cycle through the effects strip. Defaults to just `src`. */
  shots?: readonly string[];
  className?: string;
}) {
  const sources = shots && shots.length > 0 ? shots : [src];
  return (
    <figure
      className={cn(
        "border-border/70 bg-card w-full max-w-[340px] overflow-hidden rounded-2xl border shadow-2xl shadow-black/40",
        className,
      )}
    >
      {/* Main viewfinder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="340px"
          className="object-cover"
        />

        <span
          aria-hidden
          className="text-foreground/85 absolute top-2.5 left-3 font-mono text-[11px] tracking-wide"
        >
          Photo Booth
        </span>

        {/* Soft vignette so the chrome reads over any photo */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30"
        />
      </div>

      {/* Toolbar */}
      <figcaption
        aria-hidden
        className="border-border/60 bg-background/60 flex items-center gap-3 border-t px-3 py-2.5"
      >
        <ul className="flex items-center gap-1.5">
          {FILTERS.map((filter, i) => (
            <li
              key={filter}
              className="border-border/60 relative size-7 overflow-hidden rounded-md border sm:size-8"
            >
              {/* Decorative effect swatches — the whole figcaption is aria-hidden,
                  so the strip carries alt="" and the real alt lives on the main
                  photo above. `loading="lazy"` keeps them off the hero's LCP path. */}
              <Image
                src={sources[i % sources.length]}
                alt=""
                fill
                loading="lazy"
                sizes="32px"
                className="object-cover"
                style={{ filter }}
              />
            </li>
          ))}
        </ul>

        <span className="ml-auto inline-flex size-8 items-center justify-center rounded-full border border-white/25 bg-white/10">
          <span className="size-4 rounded-full bg-white/85" />
        </span>
      </figcaption>
    </figure>
  );
}
