"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, FileText, ArrowRight, Twitter, Instagram } from "lucide-react";
import { SiTypescript, SiNodedotjs, SiNextdotjs, SiPostgresql } from "react-icons/si";
import { motion } from "framer-motion";

const TECH_BADGES = [
  { href: "https://www.typescriptlang.org/", icon: <SiTypescript className="text-[#3178C6]" />, label: "TypeScript" },
  { href: "https://nodejs.org/", icon: <SiNodedotjs className="text-[#339933]" />, label: "Node.js" },
  { href: "https://nextjs.org/", icon: <SiNextdotjs className="text-text-primary" />, label: "Next.js" },
  { href: "https://www.postgresql.org/", icon: <SiPostgresql className="text-[#4169E1]" />, label: "PostgreSQL" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[100svh] md:min-h-[80vh] flex items-center justify-center pt-24 md:pt-20 pb-12"
    >
      <div className="grain" />

      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center text-center gap-10 md:gap-8">

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Radial spotlight glow */}
          <div
            className="absolute w-56 h-56 md:w-[420px] md:h-[420px] rounded-full -z-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle at center, rgba(220,38,38,0.15), transparent 65%)" }}
          />
          <div className="relative h-[112px] w-[112px] md:h-40 md:w-40 rounded-full border border-border bg-bg-card p-1 shadow-2xl shadow-accent/10">
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
        </motion.div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-5 md:gap-6 max-w-xs sm:max-w-lg md:max-w-2xl">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-[2rem] leading-[1.15] md:text-5xl md:leading-tight font-bold tracking-tight text-text-primary"
          >
            Hi, I&apos;m{" "}
            <span
              className="text-accent cursor-pointer hover:text-accent-dark hover:underline underline-offset-4 transition-all"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Monis
            </span>
            {" "}<span className="text-text-secondary">—</span>{" "}
            <span className="text-text-secondary">a full-stack web developer.</span>
          </motion.h1>

          {/* Description — two short blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-3 text-sm md:text-lg text-text-secondary dark:text-[#aaaaaa] leading-relaxed"
          >
            <p>
              I build scalable web applications with a strong focus on{" "}
              <span className="text-text-primary font-medium">backend architecture</span>{" "}
              and{" "}
              <span className="text-text-primary font-medium">database design</span>.
            </p>
            <p>
              I care about{" "}
              <span className="text-text-primary font-medium">system performance</span>{" "}
              and building software that actually holds up in production.
            </p>
          </motion.div>

          {/* Tech badges — flex-wrap row, no commas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2"
          >
            {TECH_BADGES.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs md:text-sm font-medium bg-bg-secondary/80 border border-dashed border-text-muted/30 text-text-secondary hover:bg-bg-secondary hover:text-text-primary hover:border-white/20 hover:-translate-y-0.5 hover:scale-105 hover:shadow-sm transition-all no-underline cursor-pointer"
              >
                {icon}
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <a
            href="https://cal.com/monis-sarwar-vvbnfn"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-bg-primary shadow transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Book a call
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/resume"
            className="group inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-full border border-border bg-bg-card px-8 text-sm font-medium text-text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-bg-secondary hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
          className="flex items-center gap-5 md:gap-6 text-text-muted"
        >
          <SocialLink href="https://github.com/MonisMS" icon={<Github size={20} />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/syed-monis-sarwar-sms47/" icon={<Linkedin size={20} />} label="LinkedIn" />
          <SocialLink href="https://x.com/SMSarwar47" icon={<Twitter size={20} />} label="X (Twitter)" />
          <SocialLink href="https://www.instagram.com/monis_sarwar/" icon={<Instagram size={20} />} label="Instagram" />
          <SocialLink href="mailto:monissms16@gmail.com" icon={<Mail size={20} />} label="Email" />
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
