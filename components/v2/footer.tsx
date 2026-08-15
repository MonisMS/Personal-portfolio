import { Container } from "@/components/v2/container";
import { SocialLinks } from "@/components/v2/social-links";
import { site } from "@/lib/v2/config/site";

export function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <Container className="flex h-16 items-center justify-between">
        <p className="text-muted-foreground text-sm">{site.name}</p>
        <SocialLinks className="-mr-2" />
      </Container>
    </footer>
  );
}
