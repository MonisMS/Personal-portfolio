"use client";

import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  {
    name: "Email",
    icon: <Mail size={20} />,
    href: "mailto:monissms16@gmail.com",
  },
  {
    name: "GitHub",
    icon: <Github size={20} />,
    href: "https://github.com/MonisMS",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} />,
    href: "https://linkedin.com/in/",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} />,
    href: "https://twitter.com/",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg-primary px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-widest text-accent mb-3">Contact</p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-text-primary">
          Get in Touch
        </h2>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Got a project in mind, want to collaborate, or just say hi?
          <br className="hidden sm:block" />
          My inbox is always open.
        </p>

        {/* Email CTA */}
        <a
          href="mailto:monissms16@gmail.com"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-accent-dark"
        >
          <Mail size={18} />
          Say Hello
        </a>

        {/* Socials */}
        <div className="mt-10 flex justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-card text-text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:bg-bg-hover"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-border pt-8">
          <p className="text-sm text-text-muted">
            Built with Next.js & Tailwind CSS
          </p>
          <p className="mt-1 text-sm text-text-muted/60">
            © {new Date().getFullYear()} Monis Sarwar. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
