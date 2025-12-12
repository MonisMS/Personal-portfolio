"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "about" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={cn(
      "fixed top-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-300",
      scrolled && "top-4"
    )}>
      <div className={cn(
        "flex items-center gap-1 rounded-full border px-3 py-2 transition-all duration-300",
        scrolled 
          ? "border-border bg-bg-primary/90 backdrop-blur-md" 
          : "border-border bg-bg-primary/60 backdrop-blur-sm"
      )}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium cursor-pointer",
                isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 bg-accent",
                isActive ? "w-4" : "w-0"
              )} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
