"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, FileText, ArrowRight, Twitter, Instagram } from "lucide-react";
import { SiTypescript, SiNodedotjs, SiNextdotjs, SiPostgresql, SiMedium } from "react-icons/si";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="grain" />
      
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center text-center gap-8">
        
        {/* Avatar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="group relative cursor-pointer">
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border border-border bg-bg-card p-1 shadow-2xl shadow-accent/10 transition-transform duration-500 group-hover:scale-105">
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
            <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2">
              <div className="h-4 w-4 rounded-full border-2 border-bg-card bg-emerald-600 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900/90 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                Available for opportunities
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary"
          >
            Hi, I&apos;m <span 
              className="text-accent cursor-pointer hover:text-accent-dark hover:underline underline-offset-4 transition-all"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Monis
            </span> <span className="text-text-secondary hidden sm:inline">—</span> <span className="block sm:inline text-text-secondary">a full-stack web developer.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto"
          >
            <p>
              I build scalable web applications using 
              <a 
                href="https://www.typescriptlang.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-0.5 mx-1 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 hover:-translate-y-px transition-all align-middle no-underline cursor-pointer"
              >
                <SiTypescript className="text-[#3178C6]" />
                TypeScript
              </a>
              ,
              <a 
                href="https://nodejs.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-0.5 mx-1 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 hover:-translate-y-px transition-all align-middle no-underline cursor-pointer"
              >
                <SiNodedotjs className="text-[#339933]" />
                Node.js
              </a>
              ,
              <a 
                href="https://nextjs.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-0.5 mx-1 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 hover:-translate-y-px transition-all align-middle no-underline cursor-pointer"
              >
                <SiNextdotjs className="text-white" />
                Next.js
              </a>
              , and
              <a 
                href="https://www.postgresql.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-0.5 mx-1 rounded-md text-sm font-medium bg-zinc-900/80 border border-dashed border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 hover:-translate-y-px transition-all align-middle no-underline cursor-pointer"
              >
                <SiPostgresql className="text-[#4169E1]" />
                PostgreSQL
              </a>
              , with a strong focus on <span className="text-text-primary font-medium">backend architecture</span> and <span className="text-text-primary font-medium">database design</span>. I care about <span className="text-text-primary font-medium">system performance</span> and building software that actually holds up in production.
            </p>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <a
            href="https://cal.com/monis-sarwar-vvbnfn"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Book a call
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/resume"
            className="group inline-flex h-10 items-center justify-center rounded-full border border-border bg-bg-card px-8 text-sm font-medium text-text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-bg-secondary hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <FileText className="mr-2 h-4 w-4" />
            Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-6 text-text-muted mt-2"
        >
          <SocialLink href="https://github.com/MonisMS" icon={<Github size={22} />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/syed-monis-sarwar-sms47/" icon={<Linkedin size={22} />} label="LinkedIn" />
          <SocialLink href="https://x.com/SMSarwar47" icon={<Twitter size={22} />} label="X (Twitter)" />
          <SocialLink href="https://www.instagram.com/monis_sarwar/" icon={<Instagram size={22} />} label="Instagram" />
          <SocialLink href="mailto:monissms16@gmail.com" icon={<Mail size={22} />} label="Email" />
        </motion.div>

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