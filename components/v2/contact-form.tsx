"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { sendEmail, type SendEmailResponse } from "@/app/actions/send-email";
import { contact } from "@/lib/v2/config/contact";
import { cn } from "@/lib/utils";

const fieldClass = cn(
  "border-border bg-background text-foreground placeholder:text-muted-foreground/70",
  "w-full rounded-md border px-3 py-2 text-[15px] transition-colors",
  "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
  "disabled:opacity-60",
);

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<SendEmailResponse | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captured before the await — `currentTarget` is null by the time the
    // transition resolves.
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setResult(null);

    startTransition(async () => {
      const response = await sendEmail(payload);
      setResult(response);
      if (response.success) form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="contact-email"
          className="text-foreground block text-sm font-medium"
        >
          {contact.form.emailLabel}
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
          placeholder={contact.form.emailPlaceholder}
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="text-foreground block text-sm font-medium"
        >
          {contact.form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          disabled={pending}
          placeholder={contact.form.messagePlaceholder}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? contact.form.pendingLabel : contact.form.submitLabel}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            result?.success ? "text-positive" : "text-destructive",
          )}
        >
          {result?.message}
        </p>
      </div>
    </form>
  );
}
