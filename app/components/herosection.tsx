"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section id="home" className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4">
            <div className="flex flex-col items-center gap-8 text-center max-w-3xl">
                {/* Avatar */}
                <div className="h-28 w-28 rounded-full overflow-hidden bg-linear-to-br from-orange-500 via-red-500 to-indigo-700 shadow-lg" />

                {/* Heading */}
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                        Hi, I&apos;m Monis Sarwar
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-neutral-200 max-w-2xl">
                        20, I break things, learn fast, and make things happen. Deep into code
                        and CS; anything that pushes the limits. Still chasing mastery.
                        If you&apos;re working on something real, let&apos;s talk.
                    </p>
                </div>

                {/* CTAs */}
                <div className="mt-2 flex flex-col sm:flex-row gap-4">
                    <Button className="px-6 py-5 text-base font-medium rounded-full">
                        Book a meet
                    </Button>
                    <Button
                        variant="outline"
                        className="px-6 py-5 text-base font-medium rounded-full bg-white text-black hover:bg-neutral-100 border-transparent"
                    >
                        Get in touch
                    </Button>
                </div>
            </div>
        </section>
    );
}