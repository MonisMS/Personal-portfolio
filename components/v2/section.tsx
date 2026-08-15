import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-[var(--section-y)]", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-4">
      <h2 className="text-foreground font-display text-[1.75rem] leading-none tracking-tight">
        {title}
      </h2>
      {action}
    </div>
  );
}
