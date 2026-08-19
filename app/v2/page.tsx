import { Container } from "@/components/v2/container";
import { GithubHeatmap } from "@/components/v2/github-heatmap";
import { Hero } from "@/components/v2/hero";
import { OpenSourceSection } from "@/components/v2/open-source-section";
import { ResumeSection } from "@/components/v2/resume-section";
import { StatsRow } from "@/components/v2/stats-row";
import { WorkSection } from "@/components/v2/work-section";

/** hero → stats → activity → work → open source → resume */
export default function V2Page() {
  return (
    <Container>
      <Hero />
      <StatsRow />
      <GithubHeatmap />
      <WorkSection />
      <OpenSourceSection />
      <ResumeSection />
    </Container>
  );
}
