import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "./social-links";
import { site } from "@/lib/site/config";

export function Intro() {
  return (
    <header id="home" className="intro">
      <div className="intro-heading">
        <div>
          <h1>{site.shortName}</h1>
          <p className="intro-role">{site.role}</p>
        </div>
        <Image src={site.avatar} alt={site.name} width={112} height={112} priority className="intro-portrait" />
      </div>
      <div className="intro-actions">
        <Link href={site.resumeUrl} className="site-button site-button-primary">View résumé</Link>
        <a href="#contact" className="site-button">Get in touch</a>
      </div>
      <ul className="intro-socials" aria-label="Social links">
        {SOCIAL_LINKS.map(({ label, href }) => (
          <li key={label}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>
        ))}
      </ul>
    </header>
  );
}

export function IntroDetails() {
  return (
      <div className="intro-detail">
        <p>I&apos;m a full-stack engineer who enjoys the hard parts: data pipelines, AI agents and the backends that hold them together. Mostly TypeScript and Python, on Postgres.</p>
        <p>Most of my projects start from a real problem, not a tutorial. Teachers losing evenings to lesson plans, airfares the official index samples only once a month, ten tabs open just to keep up. I dig into why the problem exists, then build the fix end to end.</p>
      </div>
  );
}
