"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "./navbar";

/**
 * Temporary: /v2 ships its own shell, so the v1 navbar must not render there.
 * Delete this file when v2 replaces v1.
 */
export function NavbarGate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/v2")) return null;
  return <Navbar />;
}
