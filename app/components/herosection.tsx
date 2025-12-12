"use client";

import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-bg-primary px-4 pt-28 pb-16 md:pt-32">
      <div className="grain" />
      
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="flex-1 space-y-5">
            <div>
              <p className="text-text-secondary text-lg mb-2">
                Hey, I&apos;m Monis —
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                Full Stack <span className="text-accent">Developer</span>
              </h1>
            </div>

            <p className="text-text-secondary leading-relaxed max-w-lg">
              I build web apps with{" "}
              <a href="https://typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent underline decoration-border hover:decoration-accent underline-offset-2">TypeScript</a>,{" "}
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent underline decoration-border hover:decoration-accent underline-offset-2">React</a>,{" "}
              <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent underline decoration-border hover:decoration-accent underline-offset-2">Next.js</a>, and{" "}
              <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent underline decoration-border hover:decoration-accent underline-offset-2">Node</a>.
              Currently looking for full-time opportunities.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-text-primary hover:border-accent hover:text-accent"
              >
                <FileText size={16} />
                Resume
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-text-primary hover:bg-accent-dark"
              >
                Contact
              </a>
            </div>

            <div className="flex gap-2 pt-1">
              <a href="https://github.com/MonisMS" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="mailto:monissms16@gmail.com" className="p-2.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div className="lg:w-64">
            <div className="rounded-xl border border-border bg-bg-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-text-secondary">Open to work</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-bg-hover p-3 text-center">
                  <div className="text-lg font-bold text-accent">3+</div>
                  <div className="text-xs text-text-muted">Projects</div>
                </div>
                <div className="rounded-lg bg-bg-hover p-3 text-center">
                  <div className="text-lg font-bold text-accent">1yr</div>
                  <div className="text-xs text-text-muted">Experience</div>
                </div>
              </div>

              <p className="text-sm text-text-muted">Based in India</p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-text-muted">Recent work</span>
            <a href="#projects" className="text-xs text-accent hover:underline">All projects →</a>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="#projects" className="group rounded-lg border border-border bg-bg-card p-4 hover:border-accent/50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text-primary group-hover:text-accent">AskAI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">Live</span>
              </div>
              <p className="text-xs text-text-muted">AI meeting assistant</p>
            </a>
            <a href="#projects" className="group rounded-lg border border-border bg-bg-card p-4 hover:border-accent/50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text-primary group-hover:text-accent">Folder Organizer</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">WIP</span>
              </div>
              <p className="text-xs text-text-muted">File automation tool</p>
            </a>
            <a href="#projects" className="group rounded-lg border border-border bg-bg-card p-4 hover:border-accent/50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text-primary group-hover:text-accent">Tunes Generator</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">Live</span>
              </div>
              <p className="text-xs text-text-muted">Music player</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}