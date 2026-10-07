"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Copy,
  FileText,
  FolderGit2,
  GitPullRequest,
  Github,
  Home,
  Linkedin,
  Mail,
  Send,
  SunMoon,
  Twitter,
} from "lucide-react";
import { useThemeSwitch } from "./use-theme-switch";
import { projects } from "@/lib/site/projects";
import { site, socials } from "@/lib/site/config";

const OPEN_EVENT = "command-menu:open";

/** Open the menu from anywhere (e.g. the floating pill). */
export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  hint?: string;
  keywords?: string[];
  external?: boolean;
  run: () => void;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toggleTheme = useThemeSwitch();
  const [notice, setNotice] = useState<string | null>(null);
  // Opened from the keyboard: no animation, it should feel instant.
  const [instant, setInstant] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Closing the menu puts focus back where it was before it opened.
  useEffect(() => {
    if (open) return;
    returnFocus.current?.focus({ preventScroll: true });
    returnFocus.current = null;
  }, [open]);

  // Feedback toast for actions that close the menu (e.g. copy email).
  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 2000);
    return () => window.clearTimeout(id);
  }, [notice]);

  useEffect(() => {
    // Record focus before opening; the search input grabs it on mount.
    const rememberFocus = () => {
      if (document.querySelector("[data-command-menu]")) return;
      if (document.activeElement instanceof HTMLElement) {
        returnFocus.current = document.activeElement;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        rememberFocus();
        setInstant(true);
        setOpen((value) => !value);
      }
    };
    const onOpen = () => {
      rememberFocus();
      setInstant(false);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const goToSection = useCallback(
    (id: string) => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/#${id}`);
      }
    },
    [pathname, router],
  );

  const openUrl = (url: string) => window.open(url, "_blank", "noopener");

  const groups: { heading: string; items: MenuItem[] }[] = [
    {
      heading: "Navigate",
      items: [
        { label: "Home", icon: <Home />, run: () => goToSection("home") },
        {
          label: "Projects",
          icon: <FolderGit2 />,
          run: () => router.push("/projects"),
        },
        {
          label: "Open source",
          icon: <GitPullRequest />,
          run: () => goToSection("open-source"),
        },
        {
          label: "Contact",
          icon: <Send />,
          keywords: ["hire", "message"],
          run: () => goToSection("contact"),
        },
        {
          label: "Résumé",
          icon: <FileText />,
          keywords: ["resume", "cv"],
          run: () => router.push(site.resumeUrl),
        },
      ],
    },
    {
      heading: "Projects",
      items: projects.map((project) => ({
        label: project.title,
        hint: project.tagline,
        icon: <ArrowUpRight />,
        run: () => router.push(`/projects/${project.slug}`),
      })),
    },
    {
      heading: "Contact",
      items: [
        {
          label: "Copy email",
          hint: site.email,
          icon: <Copy />,
          run: () =>
            navigator.clipboard
              ?.writeText(site.email)
              .then(() => setNotice("Email copied"))
              .catch(() => window.location.assign(socials.email)),
        },
        {
          label: "Send email",
          icon: <Mail />,
          run: () => window.location.assign(socials.email),
        },
        {
          label: "Book a call",
          icon: <Calendar />,
          external: true,
          run: () => openUrl(site.calUrl),
        },
        {
          label: "GitHub",
          icon: <Github />,
          external: true,
          run: () => openUrl(socials.github),
        },
        {
          label: "LinkedIn",
          icon: <Linkedin />,
          external: true,
          run: () => openUrl(socials.linkedin),
        },
        {
          label: "X",
          icon: <Twitter />,
          keywords: ["twitter"],
          external: true,
          run: () => openUrl(socials.x),
        },
      ],
    },
    {
      heading: "Preferences",
      items: [
        {
          label: "Toggle theme",
          hint: "D",
          icon: <SunMoon />,
          keywords: ["dark", "light"],
          run: toggleTheme,
        },
      ],
    },
  ];

  const select = (item: MenuItem) => {
    setOpen(false);
    // Let the dialog unmount before scrolling or flipping the theme.
    requestAnimationFrame(item.run);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div
            data-command-menu
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="fixed inset-0 z-[60]"
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-[0.125rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={instant ? { duration: 0 } : { duration: 0.15 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute left-1/2 top-[14vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.97, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={
                instant
                  ? { duration: 0 }
                  : { duration: 0.16, ease: [0.23, 1, 0.32, 1] }
              }
            >
              <Command
                label="Command menu"
                loop
                onKeyDown={(event) => {
                  if (event.key === "Escape") setOpen(false);
                  // The input is the only stop; keep Tab from leaving the dialog.
                  if (event.key === "Tab") event.preventDefault();
                }}
                className="border-line-strong bg-surface overflow-hidden rounded-xl border shadow-2xl shadow-black/40"
              >
                <Command.Input
                  autoFocus
                  placeholder="Search or jump to…"
                  className="border-line text-fg placeholder:text-subtle w-full border-b bg-transparent px-4 py-3.5 text-[0.9375rem] outline-none"
                />
                <Command.List className="max-h-[min(60vh,380px)] overflow-y-auto overscroll-contain p-1.5">
                  <Command.Empty className="text-subtle py-8 text-center text-sm">
                    Nothing matches.
                  </Command.Empty>
                  {groups.map((group) => (
                    <Command.Group
                      key={group.heading}
                      heading={group.heading}
                      className="[&_[cmdk-group-heading]]:text-subtle mb-1 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-xs"
                    >
                      {group.items.map((item) => (
                        <Command.Item
                          key={`${group.heading}-${item.label}`}
                          value={`${item.label} ${item.hint ?? ""}`}
                          keywords={item.keywords}
                          onSelect={() => select(item)}
                          className="text-muted data-[selected=true]:bg-surface-2 data-[selected=true]:text-fg flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-sm [&_svg]:size-4 [&_svg]:shrink-0"
                        >
                          {item.icon}
                          <span className="text-fg">{item.label}</span>
                          {item.hint && (
                            <span className="text-subtle ml-auto truncate text-xs">
                              {item.hint}
                            </span>
                          )}
                          {item.external && !item.hint && (
                            <ArrowUpRight className="text-subtle ml-auto" />
                          )}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>
                <div className="border-line text-subtle flex items-center justify-between border-t px-3 py-2 font-mono text-[0.6875rem]">
                  <span>↑↓ to move · ↵ to open</span>
                  <span>esc</span>
                </div>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-6 z-[60] flex justify-center px-4"
      >
        <AnimatePresence>
          {notice && (
            <motion.p
              key={notice}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="border-line-strong bg-surface text-fg rounded-full border px-4 py-2 text-sm shadow-lg shadow-black/20"
            >
              {notice}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
