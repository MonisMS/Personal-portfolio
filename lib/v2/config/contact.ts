import { site } from "./site";

export const contact = {
  heading: "Get in Touch",
  // Rendered with the email appended as a link, so it ends "...via email at <email>".
  blurb:
    "If you have any inquiries, please feel free to reach out. You can contact me via email at",

  email: site.email,
  calUrl: site.calUrl,

  form: {
    nameLabel: "Full Name",
    namePlaceholder: "Full Name",
    phoneLabel: "Phone No",
    phonePlaceholder: "Phone No",
    emailLabel: "Email",
    emailPlaceholder: "Email",
    messageLabel: "Message",
    messagePlaceholder: "Message",
    submitLabel: "Submit",
    pendingLabel: "Sending…",
  },
} as const;
