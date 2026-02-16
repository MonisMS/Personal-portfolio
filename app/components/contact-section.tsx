"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Calendar, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail, type ContactFormData } from "@/app/actions/send-email";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

type FormErrors = {
  name?: string;
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

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (name.length < 2) {
      return "Name must be at least 2 characters";
    }
    return undefined;
  };

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

  // Handle field blur validation
  const handleBlur = (field: keyof ContactFormData) => {
    let error: string | undefined;

    switch (field) {
      case "name":
        error = validateName(formData.name);
        break;
      case "email":
        error = validateEmail(formData.email);
        break;
      case "message":
        error = validateMessage(formData.message);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (nameError || emailError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        message: messageError,
      });
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

        // Auto-dismiss success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setResponseMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setResponseMessage(response.message);
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-bg-primary px-4 py-20">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-text-primary">Let&apos;s talk</h2>
          <p className="mt-3 text-text-secondary">
            Have a project or opportunity? Reach out.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  onBlur={() => handleBlur("name")}
                  error={!!errors.name}
                  disabled={status === "submitting"}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
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
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" required>
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or inquiry..."
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
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-text-primary hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Success/Error Messages */}
              {status === "success" && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                >
                  <CheckCircle2 className="text-green-600 dark:text-green-500" size={20} />
                  <p className="text-sm text-green-800 dark:text-green-300">
                    {responseMessage}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                >
                  <AlertCircle className="text-red-600 dark:text-red-500" size={20} />
                  <p className="text-sm text-red-800 dark:text-red-300">
                    {responseMessage}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:monissms16@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-primary hover:bg-accent-dark transition-colors"
          >
            <Mail size={18} />
            monissms16@gmail.com
          </a>
          <a
            href="https://cal.com/monis-sarwar-vvbnfn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-text-primary text-bg-primary px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Calendar size={18} />
            Book a call
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted hover:border-accent hover:text-accent transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Monis Sarwar
          </p>
        </div>
      </div>
    </section>
  );
}
