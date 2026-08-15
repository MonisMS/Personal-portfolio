import { site } from "./site";

export const contact = {
  // TODO(monis): rewrite in your voice. One line on what you want to hear about.
  blurb:
    "Open to roles, freelance work, or just a conversation about something you're building.",

  email: site.email,
  calUrl: site.calUrl,

  form: {
    emailLabel: "Your email",
    emailPlaceholder: "you@company.com",
    messageLabel: "Message",
    messagePlaceholder: "What's on your mind?",
    submitLabel: "Send message",
    pendingLabel: "Sending…",
  },
} as const;
