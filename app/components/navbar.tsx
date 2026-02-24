"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Command } from "lucide-react";
import { CommandMenu } from "./command-menu";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, id: string, href: string) => {
    // If we are on the home page and clicking a hash link, scroll smoothly
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      
      setActiveSection(id);
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      } else if (targetId === "home" || href === "/") {
         window.scrollTo({ top: 0, behavior: "smooth" });
         window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 px-4 md:px-12 lg:px-20 py-3 transition-all mt-2",
        scrolled && "py-2 bg-bg-primary/50 backdrop-blur-md"
      )}>
        <div className="relative flex items-center justify-center md:justify-between">

          {/* Logo - Desktop */}
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, "home", "/#home")}
            className="hidden md:block text-lg font-semibold text-text-primary tracking-tight"
          >
            MS
          </Link>

          {/* Mobile: Logo pill - Opens command menu */}
          <button 
            onClick={() => setCommandOpen(true)}
            className="md:hidden flex items-center rounded-[20px] border border-border bg-bg-secondary/50 backdrop-blur-xl px-5 py-2.5 cursor-pointer"
          >
            <span className="text-base font-bold text-text-primary tracking-tight">MS</span>
            <span className="mx-5 w-px h-5 bg-border" />
            <span className="text-base text-text-muted">monis</span>
          </button>

          {/* Center: Nav Pill - Hidden on mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <div className="flex items-center gap-0.5 rounded-full border border-border bg-bg-secondary/50 backdrop-blur-xl px-1.5 py-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === "/" 
                  ? activeSection === item.id 
                  : pathname === item.href || pathname?.startsWith(item.href + "/");
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.id, item.href)}
                    className={cn(
                      "relative px-4 py-1.5 text-sm cursor-pointer rounded-full transition-colors",
                      isActive 
                        ? "text-text-primary font-medium" 
                        : "text-text-muted hover:text-text-primary"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-text-primary/5 dark:bg-white/10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* CTA */}
              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, "contact", "/#contact")}
                className="relative ml-1 px-4 py-1.5 text-sm font-medium rounded-full bg-text-primary/10 text-text-primary hover:bg-text-primary/15 cursor-pointer transition-all"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          {/* Right side - Desktop only */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-muted border border-border rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary hover:text-text-primary hover:border-border cursor-pointer transition-all group"
            >
              <Command size={14} className="text-text-muted group-hover:text-text-primary" />
              <span className="font-medium tracking-wide">Ctrl K</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}