"use client";

import { Github, Linkedin, Mail, Twitter, FileText, Send, Briefcase } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-bg-primary px-4 pt-28 pb-16 md:pt-36">
      <div className="grain" />
      
      <div className="mx-auto max-w-3xl">
        {/* Avatar */}
        <div className="mb-10">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-bg-card border-2 border-border overflow-hidden flex items-center justify-center">
              <span className="text-2xl font-bold text-text-primary">MS</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-[3px] border-bg-primary"></span>
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
          <span className="text-text-primary">Hi, I&apos;m Monis</span>
          <span className="text-text-primary"> — </span>
          <span className="text-text-secondary">I build modern full-stack web applications.</span>
        </h1>

        {/* Tech paragraph with inline badges */}
        <div className="space-y-1 mb-10 text-base sm:text-lg text-text-secondary leading-relaxed">
          <p className="flex flex-wrap items-center gap-1.5">
            <span>I work with</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-[#3178C6]/10 border border-[#3178C6]/20 text-[#3178C6]">
              <span className="text-xs font-bold">TS</span>
              TypeScript
            </span>
            <span>,</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-[#61DAFB]/10 border border-[#61DAFB]/20 text-[#61DAFB]">
              <span className="text-xs">⚛</span>
              React
            </span>
            <span>,</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-white/5 border border-white/10 text-text-primary">
              <span className="text-xs font-bold">N</span>
              Next.js
            </span>
            <span>,</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-[#339933]/10 border border-[#339933]/20 text-[#339933]">
              <span className="text-xs">⬢</span>
              Node.js
            </span>
            <span>, and</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-[#4169E1]/10 border border-[#4169E1]/20 text-[#4169E1]">
              <span className="text-xs">🐘</span>
              PostgreSQL
            </span>
            <span>, focusing on clean architecture, performance, and building systems that scale well in production.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
          <a
            href="/resume"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border bg-bg-card text-text-primary hover:border-emerald-500/50 hover:bg-bg-card/80 transition-all duration-300"
          >
            <FileText size={18} />
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Send size={18} />
            Get in touch
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-0.5 mb-12">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-text-muted hover:text-text-primary transition-colors" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-text-muted hover:text-text-primary transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/MonisMS" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-text-muted hover:text-text-primary transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="mailto:monissms16@gmail.com" className="p-2.5 rounded-lg text-text-muted hover:text-text-primary transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}