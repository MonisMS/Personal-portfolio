"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/v2/container";
import { navItems } from "@/lib/v2/config/nav";
import { cn } from "@/lib/utils";

/** Anchor items (href contains "#") are jump links, never route-active. */
const isAnchor = (href: string) => href.includes("#");

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    !isAnchor(href) &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      {/* Nav sits at the top-right, above the hero photo. */}
      <Container className="flex h-14 items-center justify-end">
        <nav className="flex items-center gap-6 sm:gap-8">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-foreground text-sm font-semibold underline-offset-[6px] transition-colors",
                  active
                    ? "underline decoration-2"
                    : "hover:text-muted-foreground",
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
