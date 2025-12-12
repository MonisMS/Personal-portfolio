"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Command } from "lucide-react";
import { CommandMenu } from "./command-menu";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Blog", id: "blog" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 px-4 md:px-12 lg:px-20 py-3 transition-all mt-2",
        scrolled && "py-2 bg-bg-primary/50 backdrop-blur-md"
      )}>
        <div className="relative flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="text-lg font-semibold text-text-primary tracking-tight">
            MS
          </a>

          {/* Center: Nav Pill */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-1.5 py-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className={cn(
                      "relative px-4 py-1.5 text-sm cursor-pointer rounded-full transition-all",
                      isActive 
                        ? "text-white font-medium bg-white/1" 
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {item.label}
                    {/* Active glow indicator */}
                    {isActive && (
                      <>
                        <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-accent" />
                        <span className="absolute -top-[8px] left-1/2 -translate-x-1/2 h-4 w-8 rounded-full bg-accent/30 blur-md" />
                      </>
                    )}
                  </button>
                );
              })}
              
              {/* CTA */}
              <button
                onClick={() => handleClick("contact")}
                className="relative ml-1 px-4 py-1.5 text-sm font-medium rounded-full bg-white/12 text-white hover:bg-white/18 cursor-pointer transition-all group"
              >
                <span className="relative z-10">Let&apos;s Talk</span>
                {/* Subtle bottom glow */}
                  <span className="absolute inset-x-2 -bottom-px h-px bg-linera-to-r from-transparent via-white/50 to-transparent" />
                </button>
            </div>
          </div>

          {/* Right: Command palette trigger - interactive, not decorative */}
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-white/40 border border-white/[0.08] rounded-lg bg-white/[0.03] hover:bg-white/[0.06] hover:text-white/60 hover:border-white/[0.12] cursor-pointer transition-all group"
          >
            <Command size={14} className="text-white/30 group-hover:text-white/50" />
            <span className="font-medium tracking-wide">Ctrl K</span>
          </button>

        </div>
      </nav>

      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}