import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText, Mail } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { CommandButton } from "./command-button";
import { ThemeToggle } from "./theme-toggle";
import { site, socials } from "@/lib/site/config";

interface InlineLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

/** A link that sits inside a sentence, with a small leading icon. */
function InlineLink({ href, icon, children }: InlineLinkProps) {
  const external = href.startsWith("http");
  const className =
    "text-fg decoration-line-strong hover:decoration-fg inline-flex items-baseline gap-1 underline underline-offset-4 transition-[text-decoration-color] duration-150 [&_svg]:size-[0.85em] [&_svg]:translate-y-[0.1em] [&_svg]:self-center";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {icon}
      {children}
    </a>
  );
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

      <div className="text-muted mt-10 space-y-4 text-[15px] leading-[1.75] sm:text-base">
        <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          I&apos;m a full-stack engineer who enjoys the hard parts —{" "}
          <span className="text-fg">data pipelines, AI agents</span> and the
          backends that hold them together. Mostly TypeScript and Python, on
          Postgres.
        </p>
        <p className="rise" style={{ "--i": 2 } as React.CSSProperties}>
          Most of my projects start from{" "}
          <span className="text-fg">a real problem, not a tutorial</span> —
          teachers losing evenings to lesson plans, airfares the official index
          samples only once a month, ten tabs open just to keep up. I dig into
          why the problem exists, then build the fix{" "}
          <span className="text-fg">end to end</span>.
        </p>
        <p className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          Reach me by{" "}
          <InlineLink href={socials.email} icon={<Mail />}>
            email
          </InlineLink>{" "}
          or{" "}
          <InlineLink href={site.calUrl} icon={<Calendar />}>
            book a call
          </InlineLink>
          . Code on{" "}
          <InlineLink href={socials.github} icon={<SiGithub />}>
            GitHub
          </InlineLink>
          , me on{" "}
          <InlineLink href={socials.linkedin} icon={<SiLinkedin />}>
            LinkedIn
          </InlineLink>{" "}
          and{" "}
          <InlineLink href={socials.x} icon={<SiX />}>
            X
          </InlineLink>
          , or grab my{" "}
          <InlineLink href={site.resumeUrl} icon={<FileText />}>
            résumé
          </InlineLink>
          .
        </p>
      </div>

      <p
        className="rise text-muted mt-6 inline-flex items-center gap-2.5 text-sm"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <span aria-hidden className="relative inline-flex size-2">
          <span className="bg-positive absolute inline-flex size-full animate-ping rounded-full opacity-50 motion-reduce:hidden" />
          <span className="bg-positive relative inline-flex size-2 rounded-full" />
        </span>
        {site.openTo}
      </p>
    </header>
  );
}
