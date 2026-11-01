import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { site } from "@/lib/site/config";
import { pageMetadata } from "@/lib/site/seo";

export const metadata: Metadata = pageMetadata({
  title: "Résumé",
  description:
    "Résumé of Syed Monis Sarwar, full-stack engineer building AI agents. View or download the PDF.",
  path: "/resume",
});

async function getResumeMetadata() {
  try {
    const metadata = await import("@/lib/resume-metadata.json");
    return metadata.default;
  } catch {
    return {
      lastUpdated: new Date().toISOString().split("T")[0],
      version: "1.0",
      fileName: "resume.pdf",
      fileSize: "N/A",
    };
  }
}

export default async function ResumePage() {
  const metadata = await getResumeMetadata();
  const resumePath = "/resume/resume.pdf";
  const updated = new Date(`${metadata.lastUpdated}T00:00:00`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <div className="site-container">
      <PageHeader />
      <main id="main">
        <header className="page-intro">
          <h1 className="page-title">Résumé</h1>
          <p className="page-lead">{site.role}.</p>
        </header>

        <div className="border-line flex flex-col gap-6 border-y py-6 sm:flex-row sm:items-center sm:justify-between">
          <dl className="text-muted flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-subtle">Updated</dt>
              <dd className="text-fg mt-1">
                <time dateTime={metadata.lastUpdated}>{updated}</time>
              </dd>
            </div>
            <div>
              <dt className="text-subtle">PDF size</dt>
              <dd className="text-fg mt-1">{metadata.fileSize}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button"
            >
              Open in new tab
              <ExternalLink aria-hidden className="size-4" />
            </a>
            <a
              href={resumePath}
              download="Monis_Sarwar_Resume.pdf"
              className="site-button site-button-primary"
            >
              Download PDF
              <Download aria-hidden className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-8">
          <iframe
            src={`${resumePath}#view=FitH`}
            tabIndex={-1}
            className="resume-preview bg-surface h-[80vh] min-h-[32rem] w-full rounded-sm border-0"
            title="Résumé PDF preview"
          />
          <p className="text-muted mt-4 text-sm leading-relaxed md:hidden">
            Having trouble viewing? Open the PDF in a new tab or download it
            using the links above.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
