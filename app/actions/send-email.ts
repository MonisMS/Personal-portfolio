"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site/config";

const contactSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message is too long."),
  /**
   * Honeypot: hidden from people, filled in by bots. The name is deliberately
   * meaningless so browser autofill never fills it for a real visitor.
   */
  botField: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;

export interface ContactResult {
  success: boolean;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend it worked.
    if (parsed.error.issues.some((issue) => issue.path[0] === "botField")) {
      return { success: true, message: "Message sent! I'll get back to you soon." };
    }
    return { success: false, message: parsed.error.issues[0].message };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return {
      success: false,
      message: `The form is down right now. Email me at ${site.email} instead.`,
    };
  }

  const { name, email, message } = parsed.data;
  const sender = name || "Someone";

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `New message from ${sender} via m0nis.com`,
      text: `${sender} <${email}> wrote:\n\n${message}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:24px auto;color:#171717;line-height:1.6">
          <p style="margin:0 0 4px;font-size:13px;color:#737373">New message from m0nis.com</p>
          <p style="margin:0 0 20px;font-size:16px"><strong>${escapeHtml(sender)}</strong> &lt;<a href="mailto:${escapeHtml(email)}" style="color:#171717">${escapeHtml(email)}</a>&gt;</p>
          <div style="white-space:pre-wrap;background:#f6f6f6;border:1px solid #e5e5e5;border-radius:8px;padding:16px;font-size:15px">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { success: false, message: "Couldn't send that. Please try again in a minute." };
    }

    return { success: true, message: "Message sent! I'll get back to you soon." };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Couldn't send that. Please try again in a minute." };
  }
}
