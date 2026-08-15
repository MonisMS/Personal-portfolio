import Image from "next/image";

/**
 * Raw project screenshot in a rounded frame — no browser chrome. The image
 * carries the real `alt`; the frame is a hairline border and rounded corners,
 * nothing more (ayushworks DNA).
 */
export function ProjectImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="border-border/50 bg-card relative aspect-[16/10] w-full overflow-hidden rounded-xl border">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-cover object-top"
      />
    </div>
  );
}
