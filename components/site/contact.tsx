"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Copy,
  Loader2,
  Send,
} from "lucide-react";
import { SOCIAL_LINKS } from "./social-links";
import { sendEmail } from "@/app/actions/send-email";
import { site, socials } from "@/lib/site/config";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Crossfade between two pieces of content. The blur makes the old and new
 * states read as one object changing rather than two swapping places.
 */
interface SwapProps {
  /** Changing this key plays the crossfade. */
  swapKey: string;
  children: React.ReactNode;
}

function Swap({ swapKey, children }: SwapProps) {
  const reduceMotion = useReducedMotion();
  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.6, filter: "blur(4px)" };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={swapKey}
        initial={hidden}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={hidden}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.assign(socials.email);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy email address ${site.email}`}
      className="group border-line hover:border-line-strong hover:bg-surface flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-[background-color,border-color,transform] duration-200 active:scale-[0.99]"
    >
      <span className="min-w-0">
        <span className="text-subtle block text-xs">Email · click to copy</span>
        <span className="text-fg mt-1 block truncate text-sm">
          {site.email}
        </span>
      </span>
      <span
        aria-hidden
        className={cn(
          "border-line flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border transition-colors duration-200",
          copied
            ? "text-positive border-positive/40"
            : "text-muted group-hover:text-fg",
        )}
      >
        <Swap swapKey={copied ? "check" : "copy"}>
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Swap>
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

const fieldClass =
  "bg-surface border-line text-fg placeholder:text-subtle focus-visible:border-line-strong focus-visible:ring-fg/10 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus-visible:ring-4";

function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus(null);
    startTransition(async () => {
      let result;
      try {
        result = await sendEmail({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          botField: String(data.get("bot-field") ?? ""),
        });
      } catch (error) {
        console.error("Error sending message:", error);
        setStatus({
          ok: false,
          message: `Couldn't reach the server. Email me at ${site.email} instead.`,
        });
        return;
      }
      setStatus({ ok: result.success, message: result.message });
      if (result.success) formRef.current?.reset();
    });
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-subtle mb-1.5 block text-xs">
            Name (optional)
          </span>
          <input
            name="name"
            autoComplete="name"
            maxLength={100}
            placeholder="Your name…"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-subtle mb-1.5 block text-xs">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            autoCapitalize="off"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </label>
      </div>
      <label className="block">
        <span className="text-subtle mb-1.5 block text-xs">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What are you working on…"
          className={cn(fieldClass, "resize-none")}
        />
      </label>

      {/* Honeypot: off-screen for people, tempting for bots. */}
      <input
        name="bot-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="bg-fg text-bg inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
        >
          <Swap swapKey={pending ? "sending" : "idle"}>
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-3.5" />
            )}
            {pending ? "Sending…" : "Send message"}
          </Swap>
        </button>
        <p
          aria-live="polite"
          className={cn("text-sm", status?.ok ? "text-positive" : "text-muted")}
        >
          {status && (
            <motion.span
              key={status.message}
              initial={{ opacity: 0, transform: "translateY(4px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="inline-block"
            >
              {status.message}
            </motion.span>
          )}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <div className="grid gap-8 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-10">
      <div className="space-y-4">
        <p className="text-muted text-[0.9375rem] leading-relaxed">
          Have a role, a project or a problem worth solving? Send a note, I read
          every one.
        </p>
        <CopyEmail />
        <a
          href={site.calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-line hover:border-line-strong hover:bg-surface flex items-center justify-between gap-3 rounded-xl border p-4 transition-[background-color,border-color,transform] duration-200 ease-snappy active:scale-[0.99]"
        >
          <span className="flex items-center gap-3">
            <Calendar className="text-muted size-4" />
            <span className="text-fg text-sm">Book a call</span>
          </span>
          <ArrowUpRight className="text-subtle group-hover:text-fg size-4 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <div className="flex items-center justify-between gap-3 pt-1">
          <ul className="flex flex-wrap gap-1.5">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-line text-muted hover:text-fg hover:border-line-strong inline-flex size-9 items-center justify-center rounded-md border transition-[color,border-color,transform] duration-150 active:scale-[0.94]"
                >
                  <Icon className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <span className="text-muted inline-flex items-center gap-2 text-xs">
            <span aria-hidden className="bg-positive size-1.5 rounded-full" />
            {site.openTo}
          </span>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
