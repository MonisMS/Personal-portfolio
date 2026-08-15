"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { sendEmail, type SendEmailResponse } from "@/app/actions/send-email";
import { contact } from "@/lib/v2/config/contact";
import { cn } from "@/lib/utils";

const fieldClass = cn(
  "border-border bg-background text-foreground placeholder:text-muted-foreground/70",
  "w-full rounded-lg border px-4 py-3 text-[15px] transition-colors",
  "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
  "disabled:opacity-60",
);

const { form } = contact;

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<SendEmailResponse | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captured before the await — `currentTarget` is null by the time the
    // transition resolves.
    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setResult(null);

    startTransition(async () => {
      const response = await sendEmail(payload);
      setResult(response);
      if (response.success) formEl.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            {form.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={pending}
            placeholder={form.namePlaceholder}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="sr-only">
            {form.phoneLabel}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={pending}
            placeholder={form.phonePlaceholder}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          {form.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          autoCapitalize="none"
          disabled={pending}
          placeholder={form.emailPlaceholder}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          disabled={pending}
          placeholder={form.messagePlaceholder}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? form.pendingLabel : form.submitLabel}
      </Button>

      {result?.message ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            result.success ? "text-positive" : "text-destructive",
          )}
        >
          {result.message}
        </p>
      ) : (
        <p role="status" aria-live="polite" className="sr-only" />
      )}
    </form>
  );
}
