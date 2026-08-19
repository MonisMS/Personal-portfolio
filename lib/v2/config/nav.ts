import type { NavItem } from "../types";
import { routes } from "./routes";

/**
 * Top nav — right-aligned, above the hero photo (see reference). `$whoami` is
 * the home/about link; Projects and Resume are their own routes; Open source is
 * a section on the home page, so it stays an anchor.
 */
export const navItems: NavItem[] = [
  { label: "$whoami", href: routes.home },
  { label: "Projects", href: routes.projects },
  { label: "Open source", href: routes.anchor("open-source") },
  { label: "Resume", href: routes.resume },
];
