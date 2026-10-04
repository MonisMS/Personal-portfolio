import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommandButton } from "./command-button";
import { ThemeToggle } from "./theme-toggle";

interface PageHeaderProps {
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({ backHref = "/", backLabel = "Home" }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-8 sm:pt-12">
      <Link
        href={backHref}
        className="group text-muted hover:text-fg inline-flex items-center gap-1.5 text-sm transition-colors duration-150"
      >
        <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        {backLabel}
      </Link>
      <div className="flex items-center gap-1.5">
        <CommandButton className="hidden sm:inline-flex" />
        <ThemeToggle />
      </div>
    </div>
  );
}
