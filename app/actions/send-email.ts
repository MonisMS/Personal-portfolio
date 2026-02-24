"use server"

import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export interface SendEmailResponse {
  success: boolean
  message: string
}

export async function sendEmail(
  data: ContactFormData
): Promise<SendEmailResponse> {
  try {
    const validatedData = contactFormSchema.parse(data)

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return {
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      }
    }

    const senderName = validatedData.name?.trim() || "Anonymous"

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "monissms16@gmail.com",
      replyTo: validatedData.email,
      subject: `New message from ${senderName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
              .container { max-width: 560px; margin: 24px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
              .header { padding: 24px 28px 16px; border-bottom: 1px solid #eee; }
              .header h2 { margin: 0; font-size: 18px; font-weight: 600; color: #111; }
              .header p { margin: 4px 0 0; font-size: 13px; color: #888; }
              .body { padding: 20px 28px 28px; }
              .field { margin-bottom: 16px; }
              .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999; margin-bottom: 4px; }
              .value { font-size: 15px; color: #222; }
              .value a { color: #DC2626; text-decoration: none; }
              .message-box { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 16px; margin-top: 4px; white-space: pre-wrap; font-size: 15px; color: #222; line-height: 1.7; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Message</h2>
                <p>From your portfolio website</p>
              </div>
              <div class="body">
                ${validatedData.name?.trim() ? `
                <div class="field">
                  <div class="label">Name / Phone</div>
                  <div class="value">${validatedData.name.trim()}</div>
                </div>
                ` : ""}
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${validatedData.message}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend API error:", error)
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Message sent! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error sending email:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
