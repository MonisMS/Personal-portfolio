"use client";

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center bg-bg-primary px-4">
      {/* Grain overlay */}
      <div className="grain" />
      
      <div className="flex flex-col items-center gap-8 text-center max-w-3xl animate-fade-up">
        {/* Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary">
            Monis <span className="text-accent">Sarwar</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-text-secondary max-w-2xl mx-auto">
            20, I break things, learn fast, and make things happen. Deep into code
            and CS; anything that pushes the limits. Still chasing mastery.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-200">
          <a
            href="#contact"
            className="group px-8 py-3.5 text-sm font-medium rounded-full bg-accent text-text-primary transition-all duration-300 hover:bg-accent-dark"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="px-8 py-3.5 text-sm font-medium rounded-full border border-border text-text-primary transition-all duration-300 hover:border-accent hover:text-accent"
          >
            View work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up animation-delay-500">
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-linear-to-b from-text-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}