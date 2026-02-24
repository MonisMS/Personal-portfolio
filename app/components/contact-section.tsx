"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Calendar, Loader2, CheckCircle2, AlertCircle, ArrowRight, Send, Copy, Check } from "lucide-react";
import { sendEmail, type ContactFormData } from "@/app/actions/send-email";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const socials = [
  {
    name: "GitHub",
    icon: <Github size={18} />,
    href: "https://github.com/MonisMS",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={18} />,
    href: "https://www.linkedin.com/in/syed-monis-sarwar-sms47/",
  },
  {
    name: "Twitter",
    icon: <Twitter size={18} />,
    href: "https://x.com/SMSarwar47",
  },
];

type FormErrors = {
  email?: string;
  message?: string;
};

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (message.length < 10) {
      return "Message must be at least 10 characters";
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormErrors) => {
    let error: string | undefined;
    switch (field) {
      case "email":
        error = validateEmail(formData.email);
        break;
      case "message":
        error = validateMessage(formData.message);
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (emailError || messageError) {
      setErrors({ email: emailError, message: messageError });
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await sendEmail(formData);

      if (response.success) {
        setStatus("success");
        setResponseMessage(response.message);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setResponseMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setResponseMessage(response.message);
      }
    } catch {
      setStatus("error");
      setResponseMessage("An unexpected error occurred. Please try again.");
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("monissms16@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Let&apos;s Talk
          </h2>
          <p className="mt-3 text-text-secondary max-w-lg">
            Have a project, question, or just want to connect? Drop me a message and I&apos;ll get back to you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left Column - Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name / Phone (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name or Phone
                  <span className="ml-2 text-xs font-normal text-text-muted">optional</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe or +1 234 567 890"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  disabled={status === "submitting"}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  onBlur={() => handleBlur("email")}
                  error={!!errors.email}
                  disabled={status === "submitting"}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" required>
                  What&apos;s on your mind?
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project, idea, or question..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  onBlur={() => handleBlur("message")}
                  error={!!errors.message}
                  disabled={status === "submitting"}
                  rows={5}
                  required
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent-dark transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                  <p className="text-sm text-emerald-400">{responseMessage}</p>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="text-red-500 shrink-0" size={18} />
                  <p className="text-sm text-red-400">{responseMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Email Card */}
            <div className="rounded-xl border border-border bg-bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Email me directly</p>
                  <p className="text-xs text-text-muted">I usually respond within a day</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:monissms16@gmail.com"
                  className="flex-1 truncate text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  monissms16@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-text-muted/50 transition-colors cursor-pointer"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Book a Meeting */}
            <a
              href="https://cal.com/monis-sarwar-vvbnfn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-bg-card p-5 hover:border-accent/50 transition-all"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-text-primary/5 text-text-primary">
                <Calendar size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">Book a Meeting</p>
                <p className="text-xs text-text-muted">Pick a time that works for you</p>
              </div>
              <ArrowRight size={16} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* Socials Card */}
            <div className="rounded-xl border border-border bg-bg-card p-5">
              <p className="text-sm font-medium text-text-primary mb-3">Find me elsewhere</p>
              <div className="flex gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-muted hover:border-accent/50 hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Note */}
            <div className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-bg-card/50 p-4">
              <div className="mt-0.5 relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Currently available for freelance projects and full-time opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Monis Sarwar
          </p>
        </div>
      </div>
    </section>
  );
}
