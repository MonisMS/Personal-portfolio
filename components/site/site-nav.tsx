import Link from "next/link";
import { CommandButton } from "./command-button";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site/config";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link href="/" className="site-wordmark" aria-label={`${site.shortName}, home`}>Monis</Link>
      <div className="site-nav-links">
        <Link href="/projects">Work</Link>
        <Link href="/#contact">Contact</Link>
        <Link href={site.resumeUrl}>Résumé</Link>
        <CommandButton className="hidden sm:inline-flex" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
