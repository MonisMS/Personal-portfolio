import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { CommandButton } from "./command-button";
import { SOCIAL_LINKS } from "./social-links";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site/config";
import { cn } from "@/lib/utils";

const chip =
  "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-[background-color,border-color,color,transform] duration-150 ease-snappy active:scale-[0.97] [&_svg]:size-3.5";

/** Key phrase inside a gray paragraph: bold white, not a colour. */
interface EmProps {
  children: React.ReactNode;
}

function Em({ children }: EmProps) {
  return <strong className="text-fg font-semibold">{children}</strong>;
}

export function Intro() {
  return (
    <header id="home" className="scroll-mt-24 pt-16 sm:pt-24">
      <div className="rise flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={site.avatar}
            alt={site.name}
            width={64}
            height={64}
            priority
            className="outline-line size-14 rounded-xl object-cover outline outline-1 -outline-offset-1 sm:size-16"
          />
          <div>
            <h1 className="font-display text-fg text-[1.9rem] leading-none tracking-[-0.01em] sm:text-[2.2rem]">
              {site.shortName}
            </h1>
            <p className="text-muted mt-1.5 text-sm">{site.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <CommandButton className="hidden sm:inline-flex" />
          <ThemeToggle />
        </div>
      </div>

      <div className="text-subtle mt-10 space-y-4 text-[0.9375rem] leading-[1.75] sm:text-base">
        <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          I&apos;m a <Em>full-stack engineer</Em> who enjoys the hard parts:{" "}
          <Em>data pipelines, AI agents</Em> and the backends that hold them
          together. Mostly <Em>TypeScript and Python</Em>, on Postgres.
        </p>
        <p className="rise" style={{ "--i": 2 } as React.CSSProperties}>
          Most of my projects start from{" "}
          <Em>a real problem, not a tutorial</Em>. Teachers losing evenings to
          lesson plans, airfares the official index samples only once a month,
          ten tabs open just to keep up. I dig into why the problem exists, then
          build the fix <Em>end to end</Em>.
        </p>
      </div>

      <div className="rise mt-8" style={{ "--i": 3 } as React.CSSProperties}>
        <p className="text-subtle text-sm">
          My <Em>social links</Em> if you wish to connect with me
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  chip,
                  "border-line-strong bg-surface text-muted hover:bg-surface-2 hover:text-fg hover:border-subtle"
                )}
              >
                <Icon aria-hidden />
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href={site.resumeUrl}
              className={cn(
                chip,
                "border-fg/40 bg-surface text-fg hover:border-fg/70 hover:bg-surface-2 font-medium"
              )}
            >
              <FileText aria-hidden />
              Résumé
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
