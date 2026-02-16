"use server"

import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
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
    // Validate input
    const validatedData = contactFormSchema.parse(data)

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return {
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      }
    }

    // Send email
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "monissms16@gmail.com",
      replyTo: validatedData.email,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f4f4f4; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #555; }
              .value { margin-top: 5px; padding: 10px; background: #f9f9f9; border-radius: 4px; }
              .message { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${validatedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value message">${validatedData.message}</div>
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
      message: "Thank you for reaching out! I'll get back to you soon.",
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
