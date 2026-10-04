"use client";

import { useEffect, useState } from "react";
import { SiClaude, SiGooglegemini, SiOpenai, SiPerplexity } from "react-icons/si";
import { site } from "@/lib/site/config";

const QUESTION = `Who is ${site.name} (${site.url.replace("https://", "")}) and what has he built?`;
const q = encodeURIComponent(QUESTION);

const ASSISTANTS = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${q}`, icon: SiOpenai },
  { name: "Claude", href: `https://claude.ai/new?q=${q}`, icon: SiClaude },
  { name: "Gemini", href: `https://gemini.google.com/app?q=${q}`, icon: SiGooglegemini },
  { name: "Perplexity", href: `https://www.perplexity.ai/?q=${q}`, icon: SiPerplexity },
];

function useClock(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    const first = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      window.clearInterval(id);
    };
  }, [timeZone]);

  return time;
}

export function Footer() {
  const time = useClock(site.timeZone);

  return (
    <footer className="border-line mt-16 border-t pb-32 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-subtle text-sm">Ask an AI about me</p>
        <ul className="flex gap-1.5">
          {ASSISTANTS.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${name} about ${site.shortName}`}
                title={`Ask ${name}`}
                className="border-line text-muted hover:text-fg hover:border-line-strong inline-flex size-8 items-center justify-center rounded-md border transition-[color,border-color,transform] duration-150 active:scale-[0.94]"
              >
                <Icon className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-subtle mt-8 flex flex-wrap items-end justify-between gap-4 text-xs">
        <p>
          Designed &amp; built by <span className="text-muted">{site.shortName}</span>
          <br />© {new Date().getFullYear()}
        </p>
        <p className="text-right font-mono tabular-nums">
          Lucknow, India · {time ?? "--:--:--"} IST
        </p>
      </div>
    </footer>
  );
}
