import type { NavItem } from "../types";
import { routes } from "./routes";

export const navItems: NavItem[] = [
  { label: "Projects", href: routes.anchor("work") },
  { label: "Open source", href: routes.anchor("open-source") },
  { label: "Contact", href: routes.anchor("contact") },
];
