import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

const actionClass =
  "group text-muted hover:text-fg inline-flex shrink-0 items-center gap-1.5 text-sm transition-[color,transform] duration-150 ease-snappy active:scale-[0.97]";

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
        {action &&
          (action.href.startsWith("http") ? (
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              {action.label}
              <ArrowUpRight className="size-3.5 transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <Link href={action.href} className={actionClass}>
              {action.label}
              <ArrowRight className="size-3.5 transition-transform duration-200 ease-snappy group-hover:translate-x-0.5" />
            </Link>
          ))}
      </div>
      {children}
    </section>
  );
}
