import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/v2/contact-form";
import { Section } from "@/components/v2/section";
import { SocialLinks } from "@/components/v2/social-links";
import { contact } from "@/lib/v2/config/contact";

export function ContactSection() {
  return (
    <Section id="contact">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
        {/* Left — the invitation */}
        <div>
          <h2 className="text-foreground font-display text-[1.75rem] leading-none tracking-tight">
            {contact.heading}
          </h2>

          <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
            {contact.blurb}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
          </p>

          <Button asChild variant="outline" className="mt-6">
            <a href={contact.calUrl} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </Button>

          <div className="mt-8">
            <p className="text-foreground mb-3 text-sm font-medium">Follow me</p>
            <SocialLinks boxed className="-ml-px" />
          </div>
        </div>

        {/* Right — the form */}
        <ContactForm />
      </div>
    </Section>
  );
}
