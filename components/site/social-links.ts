import { SiGithub, SiInstagram, SiLeetcode, SiLinkedin, SiX } from "react-icons/si";
import { socials } from "@/lib/site/config";
import type { IconType } from "react-icons";

interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

/** Every social profile, in display order. Empty URLs are left out. */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: socials.github, icon: SiGithub },
  { label: "LinkedIn", href: socials.linkedin, icon: SiLinkedin },
  { label: "X", href: socials.x, icon: SiX },
  { label: "LeetCode", href: socials.leetcode, icon: SiLeetcode },
  { label: "Instagram", href: socials.instagram, icon: SiInstagram },
].filter((link) => link.href);
