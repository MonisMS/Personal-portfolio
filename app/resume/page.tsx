import { Metadata } from 'next';
import { Download, ExternalLink, Calendar, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume | Monis Sarwar',
  description: 'View and download the resume of Monis Sarwar - Full Stack Back-end Developer',
};

async function getResumeMetadata() {
  try {
    const metadata = await import('@/lib/resume-metadata.json');
    return metadata.default;
  } catch {
    return {
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0',
      fileName: 'resume.pdf',
      fileSize: 'N/A'
    };
  }
}

export default async function ResumePage() {
  const metadata = await getResumeMetadata();
  const resumePath = '/resume/resume.pdf';

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
          <p className="text-text-secondary text-lg">
            Full Stack Back-end Developer
          </p>
        </div>

        {/* Metadata & Actions */}
        <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Metadata Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated: {new Date(metadata.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Size: {metadata.fileSize}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in New Tab</span>
              </a>
              <a
                href={resumePath}
                download="Monis_Sarwar_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden">
          <div className="relative w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
            <iframe
              src={`${resumePath}#view=FitH`}
              className="w-full h-full"
              title="Resume Preview"
            />
          </div>
        </div>

        {/* Mobile Fallback Message */}
        <div className="mt-4 text-center text-sm text-text-secondary md:hidden">
          <p>Having trouble viewing? Try opening in a new tab or downloading the PDF.</p>
        </div>
      </div>
    </div>
  );
}
