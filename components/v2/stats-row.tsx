import { stats } from "@/lib/v2/config/stats";

/**
 * A slim band of real numbers between the hero and the work. Deliberately
 * understated — serif figures, muted labels, hairline rules — so it reads as
 * quiet proof, not a brag wall. Every value is verifiable (see `config/stats`).
 */
export function StatsRow() {
  return (
    <dl className="v2-rise border-border/60 my-8 grid grid-cols-3 gap-4 border-y py-6 sm:gap-8 md:my-12">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-foreground font-display text-3xl leading-none tracking-tight sm:text-4xl">
            {stat.value}
          </dd>
          <p
            aria-hidden
            className="text-muted-foreground mt-2 text-xs leading-snug sm:text-[13px]"
          >
            {stat.label}
          </p>
        </div>
      ))}
    </dl>
  );
}
