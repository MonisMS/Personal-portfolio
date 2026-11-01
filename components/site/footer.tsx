"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site/config";

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
      <div className="text-subtle flex flex-wrap items-end justify-between gap-4 text-xs">
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
