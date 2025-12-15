"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { 
  Home, 
  Briefcase, 
  FileText, 
  FolderOpen, 
  Download, 
  Wrench, 
  Mail,
  Github,
  Linkedin,
  Twitter,
  X
} from "lucide-react";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigationItems = [
  { 
    icon: <Home size={18} />, 
    label: "Go to Home", 
    description: "Navigate to the homepage",
    shortcut: "H",
    action: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
  },
  { 
    icon: <Briefcase size={18} />, 
    label: "Go to Experience", 
    description: "View work experience and history",
    shortcut: "W",
    action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  },
  { 
    icon: <FileText size={18} />, 
    label: "Go to Blog", 
    description: "Browse all blog posts",
    shortcut: "B",
    action: () => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })
  },
  { 
    icon: <FolderOpen size={18} />, 
    label: "Go to Projects", 
    description: "View all projects and portfolio work",
    shortcut: "P",
    action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  },
  { 
    icon: <Download size={18} />, 
    label: "Go to Resume", 
    description: "View and download resume",
    shortcut: "R",
    action: () => window.open("/resume.pdf", "_blank")
  },
  { 
    icon: <Wrench size={18} />, 
    label: "Go to Skills", 
    description: "View tech stack and skills",
    shortcut: "S",
    action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
  },
  { 
    icon: <Mail size={18} />, 
    label: "Go to Contact", 
    description: "Get in touch",
    shortcut: "C",
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  },
];

const socialItems = [
  {
    icon: <Github size={18} />,
    label: "GitHub",
    description: "View GitHub profile",
    shortcut: "G",
    action: () => window.open("https://github.com/MonisMS", "_blank")
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    description: "Connect on LinkedIn",
    shortcut: "L",
    action: () => window.open("https://linkedin.com/in/", "_blank")
  },
  {
    icon: <Twitter size={18} />,
    label: "Twitter",
    description: "Follow on Twitter",
    shortcut: "T",
    action: () => window.open("https://twitter.com/", "_blank")
  },
  {
    icon: <Mail size={18} />,
    label: "Send Email",
    description: "monissms16@gmail.com",
    shortcut: "E",
    action: () => window.open("mailto:monissms16@gmail.com")
  },
];

const allItems = [...navigationItems, ...socialItems];

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Open/close with Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
        return;
      }
      
      // Close with Escape
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Skip if typing in input
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      // Handle shortcut keys when menu is open
      if (open && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const key = e.key.toUpperCase();
        const item = allItems.find(i => i.shortcut === key);
        if (item) {
          e.preventDefault();
          setOpen(false);
          item.action();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (action: () => void) => {
    setOpen(false);
    action();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />
      
      {/* Command Dialog - Responsive */}
      <div className="fixed left-1/2 top-[10%] md:top-[20%] -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl mx-auto">
        <Command className="rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b border-white/10 px-4">
            <svg 
              className="mr-3 text-text-muted shrink-0" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <Command.Input 
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent py-4 text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-white/10 text-text-muted"
            >
              <X size={16} />
            </button>
          </div>

          <Command.List className="max-h-[60vh] md:max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
            <Command.Empty className="py-6 text-center text-sm text-text-muted">
              No results found.
            </Command.Empty>

            {/* Navigation */}
            <Command.Group heading="Navigation" className="mb-2">
              <p className="px-3 py-2 text-xs text-text-muted">Navigation</p>
              {navigationItems.map((item) => (
                <Command.Item
                  key={item.label}
                  onSelect={() => runCommand(item.action)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-text-secondary hover:bg-white/5 hover:text-text-primary data-[selected=true]:bg-white/5 data-[selected=true]:text-text-primary"
                >
                  <span className="text-text-muted shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className="text-xs text-text-muted truncate">{item.description}</p>
                  </div>
                  <kbd className="hidden sm:block px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-text-muted">
                    {item.shortcut}
                  </kbd>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Socials */}
            <Command.Group heading="Socials">
              <p className="px-3 py-2 text-xs text-text-muted">Socials</p>
              {socialItems.map((item) => (
                <Command.Item
                  key={item.label}
                  onSelect={() => runCommand(item.action)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-text-secondary hover:bg-white/5 hover:text-text-primary data-[selected=true]:bg-white/5 data-[selected=true]:text-text-primary"
                >
                  <span className="text-text-muted shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className="text-xs text-text-muted truncate">{item.description}</p>
                  </div>
                  <kbd className="hidden sm:block px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-text-muted">
                    {item.shortcut}
                  </kbd>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}
