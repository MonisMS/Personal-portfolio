import { ContactForm } from "@/components/v2/contact-form";
import { Section, SectionHeading } from "@/components/v2/section";
import { contact } from "@/lib/v2/config/contact";

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading title="Contact" />

      <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed">
        {contact.blurb}
      </p>

      <ContactForm />

      <p className="text-muted-foreground mt-6 text-sm">
        Or email{" "}
        <a
          href={`mailto:${contact.email}`}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {contact.email}
        </a>{" "}
        &middot;{" "}
        <a
          href={contact.calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          book a call
        </a>
      </p>
    </Section>
  );
}
