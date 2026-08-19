import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/v2/section";
import { routes } from "@/lib/v2/config/routes";
import { site } from "@/lib/v2/config/site";

/**
 * Home-page résumé block — replaces the old contact section. Points at the
 * standalone `/resume` route and the PDF. Reaching out lives in the footer.
 */
export function ResumeSection() {
  return (
    <Section id="resume">
      <SectionHeading title="Resume" />

      <p className="text-muted-foreground max-w-prose text-[15px] leading-relaxed">
        The short version of the work — roles, projects, and the stack behind
        them. Read it in the browser or grab the PDF.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <Link href={routes.resume}>
            View résumé
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>

        <Button asChild size="lg" variant="outline">
          <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
            <Download className="size-4" />
            Download PDF
          </a>
        </Button>
      </div>
    </Section>
  );
}
