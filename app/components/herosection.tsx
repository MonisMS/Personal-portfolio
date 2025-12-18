"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, FileText, ArrowRight, Twitter, Instagram } from "lucide-react";
import { SiTypescript, SiNodedotjs, SiNextdotjs, SiPostgresql, SiMedium } from "react-icons/si";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      <div className="grain" />
      
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center text-center gap-8">
        
        {/* Avatar */}
        <div className="relative">
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border border-border bg-bg-card p-1 shadow-2xl shadow-emerald-500/10">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image 
                src="/profile-pic.jpg" 
                alt="Monis" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-[3px] border-bg-primary bg-emerald-500">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Hi, I&apos;m Monis <span className="text-text-secondary hidden sm:inline">—</span> <span className="block sm:inline text-text-secondary">a full-stack web developer.</span>
          </h1>
          
          <div className="text-lg md:text-xl text-text-muted leading-relaxed">
            <p className="inline leading-loose">
              I build scalable web applications using 
              <a 
                href="https://www.typescriptlang.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2.5 py-1 mx-1.5 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all align-middle no-underline"
              >
                <SiTypescript className="text-[#3178C6]" />
                TypeScript
              </a>
              ,
              <a 
                href="https://nodejs.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2.5 py-1 mx-1.5 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all align-middle no-underline"
              >
                <SiNodedotjs className="text-[#339933]" />
                Node.js
              </a>
              ,
              <a 
                href="https://nextjs.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2.5 py-1 mx-1.5 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all align-middle no-underline"
              >
                <SiNextdotjs className="text-white" />
                Next.js
              </a>
              , and
              <a 
                href="https://www.postgresql.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2.5 py-1 mx-1.5 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all align-middle no-underline"
              >
                <SiPostgresql className="text-[#4169E1]" />
                PostgreSQL
              </a>
              , with a strong focus on <span className="text-text-primary font-semibold">backend architecture</span> and <span className="text-text-primary font-semibold">database design</span>. I care about <span className="text-text-primary font-semibold">system performance</span> and building software that actually holds up in production.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <a
            href="#contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black shadow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Let&apos;s Talk
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/resume"
            className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-bg-card px-8 text-sm font-medium text-text-primary shadow-sm transition-colors hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <FileText className="mr-2 h-4 w-4" />
            Resume
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6 text-text-muted mt-2">
          <SocialLink href="https://github.com/MonisMS" icon={<Github size={22} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/" icon={<Linkedin size={22} />} label="LinkedIn" />
          <SocialLink href="https://twitter.com/" icon={<Twitter size={22} />} label="X (Twitter)" />
          <SocialLink href="https://instagram.com/" icon={<Instagram size={22} />} label="Instagram" />
          <SocialLink href="https://medium.com/" icon={<SiMedium size={22} />} label="Medium" />
          <SocialLink href="mailto:monissms16@gmail.com" icon={<Mail size={22} />} label="Email" />
        </div>

      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-text-primary transition-colors hover:scale-110 transform duration-200"
    >
      {icon}
    </a>
  );
}