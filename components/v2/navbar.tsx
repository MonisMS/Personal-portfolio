import Link from "next/link";

import { Container } from "@/components/v2/container";
import { navItems } from "@/lib/v2/config/nav";
import { routes } from "@/lib/v2/config/routes";
import { site } from "@/lib/v2/config/site";

export function Navbar() {
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
