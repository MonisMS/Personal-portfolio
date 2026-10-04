import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  /** Short line under the title. */
  description?: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  description,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-section={title}
      aria-labelledby={`${id}-title`}
      className={cn("border-line scroll-mt-12 border-t pt-12 sm:pt-14", className)}
    >
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2
            id={`${id}-title`}
            className="font-display text-fg text-[1.75rem] leading-none tracking-[-0.01em]"
          >
            {title}
          </h2>
          {description && (
            <p className="text-subtle mt-2.5 text-sm">{description}</p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="group text-muted hover:text-fg inline-flex shrink-0 items-center gap-1.5 text-sm transition-colors duration-150"
          >
            {action.label}
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
