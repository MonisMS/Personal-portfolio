import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CommandMenu } from "@/components/site/command-menu";
import { ThemeProvider } from "./components/theme-provider";
import { site, socials } from "@/lib/site/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Headings only. One weight; never faux-bold.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.meta.title,
    template: `%s | ${site.shortName}`,
  },
  description: site.meta.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Syed Monis Sarwar",
    "Monis Sarwar",
    "full-stack engineer",
    "AI agents engineer",
    "backend developer",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Next.js",
    "AI agents",
    "data pipelines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.meta.title,
    description: site.meta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // The site is dark by default regardless of the OS setting.
  themeColor: "#0a0a0a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  image: `${site.url}${site.avatar}`,
  jobTitle: "Full-stack Engineer",
  email: `mailto:${site.email}`,
  sameAs: Object.values(socials).filter((url) => url.startsWith("https://")),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="bg-fg text-bg sr-only z-[70] rounded-md px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <CommandMenu />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
