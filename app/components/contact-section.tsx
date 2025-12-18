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
    href: "https://www.linkedin.com/in/syed-monis-sarwar-sms47/",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} />,
    href: "https://x.com/SMSarwar47",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-text-primary">Let&apos;s talk</h2>
        <p className="mt-3 text-text-secondary">
          Have a project or opportunity? Reach out.
        </p>

        <a
          href="mailto:monissms16@gmail.com"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-primary hover:bg-accent-dark"
        >
          <Mail size={18} />
          monissms16@gmail.com
        </a>

        <div className="mt-8 flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted hover:border-accent hover:text-accent"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Monis Sarwar
          </p>
        </div>
      </div>
    </section>
  );
}
