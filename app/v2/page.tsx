import { Container } from "@/components/v2/container";
import { ContactSection } from "@/components/v2/contact-section";
import { GithubHeatmap } from "@/components/v2/github-heatmap";
import { Hero } from "@/components/v2/hero";
import { OpenSourceSection } from "@/components/v2/open-source-section";
import { WorkSection } from "@/components/v2/work-section";

/** hero ✓ → activity ✓ → work ✓ → open source ✓ → contact ✓ */
export default function V2Page() {
  return (
    <Container>
      <Hero />
      <GithubHeatmap />
      <WorkSection />
      <OpenSourceSection />
      <ContactSection />
    </Container>
  );
}
