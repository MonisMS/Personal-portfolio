import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[44rem] flex-col px-4 sm:px-6">
      <PageHeader />
      <main className="flex flex-1 flex-col justify-center pb-24">
        <p className="rise text-subtle font-mono text-xs">404</p>
        <h1
          className="rise font-display text-fg mt-3 text-[2.6rem] leading-none tracking-[-0.01em] sm:text-[3rem]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Nothing lives here.
        </h1>
        <p
          className="rise text-muted mt-4 max-w-prose text-[15px] leading-relaxed"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          The page moved or never existed. Head back home, or press{" "}
          <kbd className="border-line-strong text-fg rounded border px-1.5 py-0.5 font-mono text-xs">
            Ctrl K
          </kbd>{" "}
          to find what you were after.
        </p>
        <Link
          href="/"
          className="rise border-line-strong text-fg hover:bg-surface-2 mt-8 inline-flex h-9 w-fit items-center gap-2 rounded-md border px-3.5 text-sm transition-[background-color,transform] duration-150 active:scale-[0.97]"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </main>
    </div>
  );
}
