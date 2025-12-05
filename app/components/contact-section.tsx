"use client";

import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  {
    name: "Email",
    icon: <Mail size={20} />,
    href: "mailto:monissms16@gmail.com",
    label: "monissms16@gmail.com",
  },
  {
    name: "GitHub",
    icon: <Github size={20} />,
    href: "https://github.com/MonisMS",
    label: "MonisMS",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} />,
    href: "https://linkedin.com/in/",
    label: "LinkedIn",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} />,
    href: "https://twitter.com/",
    label: "Twitter",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-black px-4 py-24 text-white">
      <div className="mx-auto max-w-2xl text-center">
        {/* Header */}
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-neutral-400 leading-relaxed">
          Got a project in mind, want to collaborate, or just say hi?
          <br className="hidden sm:block" />
          My inbox is always open.
        </p>

        {/* Email CTA */}
        <a
          href="mailto:monissms16@gmail.com"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-neutral-200"
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:text-white"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-neutral-800 pt-8">
          <p className="text-sm text-neutral-500">
            Built with Next.js & Tailwind CSS
          </p>
          <p className="mt-1 text-sm text-neutral-600">
            © {new Date().getFullYear()} Monis Sarwar. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
