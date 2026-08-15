import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Emphasis } from "@/components/v2/emphasis";
import { PhotoBooth } from "@/components/v2/photo-booth";
import { Section } from "@/components/v2/section";
import { SocialLinks } from "@/components/v2/social-links";
import { hero } from "@/lib/v2/config/hero";
import { site } from "@/lib/v2/config/site";

const { primary, secondary } = hero.actions;

export function Hero() {
  return (
    <Section id="home" className="pt-10 md:pt-16">
      <div className="v2-rise grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-12">
        {/* Left — the words */}
        <div className="order-2 md:order-1">
          {site.availability ? (
            <p className="text-muted-foreground mb-5 flex items-center gap-2 text-sm">
              <span
                aria-hidden
                className="bg-positive size-1.5 shrink-0 rounded-full"
              />
              {site.availability}
            </p>
          ) : null}

          <h1 className="text-foreground font-display text-[2.75rem] leading-[1.02] tracking-tight sm:text-[3.25rem]">
            {site.name}
          </h1>

          <p className="text-muted-foreground mt-3 text-lg">
            {hero.tagline}
            {site.location ? (
              <>
                <span aria-hidden className="px-2 opacity-50">
                  &middot;
                </span>
                {site.location}
              </>
            ) : null}
          </p>

          <div className="mt-6 max-w-prose space-y-3.5">
            {hero.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground text-[15px] leading-relaxed"
              >
                <Emphasis text={paragraph} />
              </p>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-1.5 text-[15px]">
            <span
              aria-hidden
              className="bg-positive mr-1 inline-block size-1.5 shrink-0 rounded-full"
            />
            <span className="text-foreground font-medium">
              {hero.openToWork.label}
            </span>
            <span>{hero.openToWork.detail}</span>
            <Link
              href={hero.openToWork.cta.href}
              className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              {hero.openToWork.cta.label}
            </Link>
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <a href={secondary.href} target="_blank" rel="noopener noreferrer">
                {secondary.label}
              </a>
            </Button>
          </div>

          <SocialLinks className="mt-7 -ml-2" />
        </div>

        {/* Right — the face */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <PhotoBooth src={hero.avatar.src} alt={hero.avatar.alt} />
        </div>
      </div>
    </Section>
  );
}
