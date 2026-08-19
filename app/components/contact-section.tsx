"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { sendEmail, type ContactFormData } from "@/app/actions/send-email";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EMAIL = "monissms16@gmail.com";
const CAL_URL = "https://cal.com/monis-sarwar-vvbnfn";

const socials = [
  { name: "GitHub", icon: <Github size={18} />, href: "https://github.com/MonisMS" },
  {
    name: "LinkedIn",
    icon: <Linkedin size={18} />,
    href: "https://www.linkedin.com/in/syed-monis-sarwar-sms47/",
  },
  { name: "X (Twitter)", icon: <Twitter size={18} />, href: "https://x.com/SMSarwar47" },
  {
    name: "Instagram",
    icon: <Instagram size={18} />,
    href: "https://www.instagram.com/monis_sarwar/",
  },
];

type FormErrors = { email?: string; message?: string };
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const validateEmail = (email: string): string | undefined =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? undefined
      : "Please enter a valid email address";

  const validateMessage = (message: string): string | undefined =>
    message.length < 10 ? "Message must be at least 10 characters" : undefined;

  const handleBlur = (field: keyof FormErrors) => {
    const error =
      field === "email"
        ? validateEmail(formData.email)
        : validateMessage(formData.message);
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
        setFormData({ name: "", phone: "", email: "", message: "" });
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

  return (
    <section id="contact" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Left — intro + socials */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-text-secondary">
              If you have any inquiries, please feel free to reach out. You can
              contact me via email at{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {EMAIL}
              </a>
              .
            </p>

            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-6 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Calendar size={16} />
              Book a call
            </a>

            <p className="mt-9 text-sm font-semibold text-text-primary">
              Follow me
            </p>
            <div className="mt-3 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex size-11 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    disabled={status === "submitting"}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone No
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone No"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    disabled={status === "submitting"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
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
                  <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  onBlur={() => handleBlur("message")}
                  error={!!errors.message}
                  disabled={status === "submitting"}
                  rows={6}
                  required
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-text-primary py-3.5 text-sm font-semibold text-bg-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                  <CheckCircle2 className="shrink-0 text-emerald-500" size={18} />
                  <p className="text-sm text-emerald-400">{responseMessage}</p>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                  <AlertCircle className="shrink-0 text-red-500" size={18} />
                  <p className="text-sm text-red-400">{responseMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Monis Sarwar
          </p>
          <div className="flex items-center gap-4 text-xs font-medium tracking-wide text-text-muted">
            <a
              href="/feed.xml"
              className="uppercase transition-colors hover:text-accent"
            >
              RSS Feed
            </a>
            <span aria-hidden className="opacity-40">
              /
            </span>
            <a
              href="/sitemap.xml"
              className="uppercase transition-colors hover:text-accent"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
