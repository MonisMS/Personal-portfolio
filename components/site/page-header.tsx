import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "./site-nav";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function PageHeader({ backHref = "/", backLabel = "Home", className }: PageHeaderProps) {
  return (
    <header className={cn("page-header", className)}>
      <SiteNav />
      <Link href={backHref} className="back-link"><ArrowLeft size={16} aria-hidden />{backLabel}</Link>
    </header>
  );
}
