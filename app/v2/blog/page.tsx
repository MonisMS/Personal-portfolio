import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/v2/container";
import { Section, SectionHeading } from "@/components/v2/section";
import { routes } from "@/lib/v2/config/routes";

export const metadata: Metadata = {
  title: "Blog",
  description: "Build breakdowns and notes on backend engineering — coming soon.",
  alternates: { canonical: routes.blog },
};

export default function BlogPage() {
  return (
    <Container>
      <Section>
        <SectionHeading title="Blog" />

        {/* No posts yet — real-data-or-nothing, so no filler entries. This is an
            honest empty state, not a fake list. */}
        <div className="border-border/60 rounded-xl border border-dashed px-6 py-14 text-center">
          <p className="text-foreground font-display text-xl tracking-tight">
            Nothing published yet.
          </p>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md text-[15px] leading-relaxed">
            I&apos;m writing up build breakdowns from the projects — how the
            ingestion pipeline holds under load, what the autonomous escalation
            agent actually does. They&apos;ll land here.
          </p>
          <div className="mt-6 flex items-center justify-center gap-5 text-sm">
            <Link
              href={routes.projects}
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              See the projects
            </Link>
            <Link
              href={routes.home}
              className="text-muted-foreground hover:text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Back home
            </Link>
          </div>
        </div>
      </Section>
    </Container>
  );
}
