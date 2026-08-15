"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/v2/container";
import { navItems } from "@/lib/v2/config/nav";
import { routes } from "@/lib/v2/config/routes";
import { site } from "@/lib/v2/config/site";
import { cn } from "@/lib/utils";

const sectionId = (href: string) => href.split("#")[1] ?? "";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  // Underline the nav item whose section is currently in view. No-ops on pages
  // without these sections (e.g. case studies), leaving nothing active.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(sectionId(item.href)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        {/* Terminal-flavored mark — the "$whoami" is the one bit of shell in the
            whole site (see DESIGN.md §7). Screen readers get a plain name. */}
        <Link
          href={routes.home}
          aria-label={`${site.shortName} — home`}
          className="group font-mono text-sm tracking-tight"
        >
          <span aria-hidden className="text-muted-foreground/70">
            ${" "}
          </span>
          <span
            aria-hidden
            className="text-foreground group-hover:text-muted-foreground transition-colors"
          >
            whoami
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          {navItems.map((item) => {
            const isActive = active === sectionId(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "text-sm underline-offset-4 transition-colors",
                  isActive
                    ? "text-foreground underline"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
