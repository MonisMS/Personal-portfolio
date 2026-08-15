import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/v2/container";
import { routes } from "@/lib/v2/config/routes";

export default function NotFound() {
  return (
    <Container>
      <div className="v2-rise flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground font-mono text-sm">404</p>
        <h1 className="text-foreground font-display mt-4 text-[2.5rem] leading-none tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-[15px] leading-relaxed">
          That page could not be found — it may have moved, or the link is
          wrong.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href={routes.home}>Back home</Link>
        </Button>
      </div>
    </Container>
  );
}
