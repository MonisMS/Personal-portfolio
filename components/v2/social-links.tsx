import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";
import { socials } from "@/lib/v2/config/social";
import type { SocialLink } from "@/lib/v2/types";

const icons: Record<
  SocialLink["icon"],
  React.ComponentType<{ className?: string }>
> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

export function SocialLinks({
  className,
  boxed = false,
}: {
  className?: string;
  /** Renders each icon in a bordered square (used in the contact section). */
  boxed?: boolean;
}) {
  return (
    <ul className={cn("flex items-center", boxed ? "gap-3" : "gap-2", className)}>
      {socials.map((social) => {
        const Icon = icons[social.icon];
        const isMail = social.href.startsWith("mailto:");

        return (
          <li key={social.label}>
            <a
              href={social.href}
              {...(isMail
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              aria-label={social.label}
              className={cn(
                "text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none",
                boxed
                  ? "border-border hover:bg-accent size-11 rounded-lg border"
                  : "hover:bg-accent size-9 rounded-md",
              )}
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
