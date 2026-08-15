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

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
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
              className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
