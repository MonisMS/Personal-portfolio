"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Command, Mail, Linkedin, Twitter, Calendar, Copy, Check, ExternalLink } from "lucide-react";
import { CommandMenu } from "./command-menu";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

function HireMeButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("monissms16@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      label: "Email",
      value: "monissms16@gmail.com",
      action: copyEmail,
      icon: <Mail size={18} />,
      trailing: copied
        ? <Check size={15} className="text-emerald-400" />
        : <Copy size={15} className="text-text-muted" />,
    },
    {
      label: "LinkedIn",
      value: "syed-monis-sarwar",
      href: "https://www.linkedin.com/in/syed-monis-sarwar-sms47/",
      icon: <Linkedin size={18} />,
      trailing: <ExternalLink size={15} className="text-text-muted" />,
    },
    {
      label: "X (Twitter)",
      value: "@SMSarwar47",
      href: "https://x.com/SMSarwar47",
      icon: <Twitter size={18} />,
      trailing: <ExternalLink size={15} className="text-text-muted" />,
    },
    {
      label: "Cal.com",
      value: "Book a meeting",
      href: "https://cal.com/monis-sarwar-vvbnfn",
      icon: <Calendar size={18} />,
      trailing: <ExternalLink size={15} className="text-text-muted" />,
    },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        className={cn(
          "flex items-center gap-3 rounded-full border px-5 py-3 transition-all duration-300 cursor-pointer",
          "bg-bg-card/80 backdrop-blur-md shadow-lg",
          open
            ? "border-emerald-500/60 shadow-emerald-500/20 shadow-xl"
            : "border-emerald-500/40 hover:border-emerald-500/70 hover:shadow-emerald-500/15 hover:shadow-xl"
        )}
      >
        {/* Blinking dot */}
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        {/* Two-line label */}
        <span className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-400 mb-0.5">
            Open to Work
          </span>
          <span className="text-sm font-bold text-text-primary tracking-wide">
            Hire Me
          </span>
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="absolute top-full right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-bg-card/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-border/40">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-0.5">Available for hire</p>
              <p className="text-base font-semibold text-text-primary">Let&apos;s work together</p>
              <p className="text-xs text-text-muted mt-1">Reach out through any channel below</p>
            </div>

            {/* Items */}
            <div className="p-2">
              {links.map((item) => {
                const inner = (
                  <div className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group/row">
                    <span className="w-10 h-10 rounded-xl bg-bg-secondary border border-border/50 flex items-center justify-center text-text-muted group-hover/row:text-text-primary group-hover/row:border-border transition-colors flex-shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted leading-none mb-1.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-text-primary truncate">
                        {item.value}
                      </p>
                    </div>
                    <span className="flex-shrink-0 opacity-50 group-hover/row:opacity-100 transition-opacity">
                      {item.trailing}
                    </span>
                  </div>
                );

                if (item.href) {
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                      {inner}
                    </a>
                  );
                }
                return (
                  <button key={item.label} onClick={item.action} className="block w-full text-left">
                    {inner}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

          {/* Left: ThemeToggle + CtrlK - Desktop only */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <button
              onClick={() => setCommandOpen(true)}
              className="inline-flex items-center gap-2 h-9 px-3 text-xs text-text-muted border border-border rounded-lg bg-bg-secondary/50 hover:bg-bg-secondary hover:text-text-primary hover:border-border cursor-pointer transition-all group"
            >
              <Command size={14} className="text-text-muted group-hover:text-text-primary" />
              <span className="font-medium tracking-wide">Ctrl K</span>
            </button>
          </div>

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

          {/* Right: Hire Me CTA - Desktop only */}
          <div className="hidden md:block">
            <HireMeButton />
          </div>
        </div>
      </nav>

      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}
