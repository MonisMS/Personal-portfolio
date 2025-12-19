"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, FileText, ArrowRight, Twitter, Instagram } from "lucide-react";
import { SiTypescript, SiNodedotjs, SiNextdotjs, SiPostgresql, SiMedium } from "react-icons/si";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="grain" />
      
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center text-center gap-8">
        
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border border-border bg-bg-card p-1 shadow-2xl shadow-accent/10">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image 
                  src="/profile-pic-1.jpeg" 
                  alt="Monis" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Status Indicator */}
            <div className="group absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 cursor-pointer">
              <div className="h-4 w-4 rounded-full border-2 border-bg-card bg-emerald-600" />
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900/90 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                Available for opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Hi, I&apos;m <span className="text-accent">Monis</span> <span className="text-text-secondary hidden sm:inline">—</span> <span className="block sm:inline text-text-secondary">a full-stack web developer.</span>
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
            href="https://cal.com/monis-sarwar-vvbnfn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white shadow transition-transform hover:scale-105 hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Book a call
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/resume"
            className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-bg-card px-8 text-sm font-medium text-text-primary shadow-sm transition-colors hover:bg-bg-secondary hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <FileText className="mr-2 h-4 w-4" />
            Resume
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6 text-text-muted mt-2">
          <SocialLink href="https://github.com/MonisMS" icon={<Github size={22} />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/syed-monis-sarwar-sms47/" icon={<Linkedin size={22} />} label="LinkedIn" />
          <SocialLink href="https://x.com/SMSarwar47" icon={<Twitter size={22} />} label="X (Twitter)" />
          <SocialLink href="https://www.instagram.com/monis_sarwar/" icon={<Instagram size={22} />} label="Instagram" />
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
      className="hover:text-accent transition-colors hover:scale-110 transform duration-200"
    >
      {icon}
    </a>
  );
}