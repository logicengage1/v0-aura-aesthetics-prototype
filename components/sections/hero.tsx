"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const { setIsOpen } = useBooking()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:text-left lg:py-40">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Beverly Hills Premier Med Spa
          </p>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-balance">Timeless Beauty,</span>
            <span className="block text-balance">Naturally Refined</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Experience the art of subtle enhancement. Our signature Botox treatments 
            reveal your most radiant self—naturally, effortlessly, beautifully.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="cta-pulse h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Book Your Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-foreground/20 px-8 text-base font-medium text-foreground hover:bg-foreground/5"
              asChild
            >
              <a href="#results">View Results</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row lg:items-start">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-muted"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">2,500+</p>
                <p className="text-xs text-muted-foreground">Happy Clients</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-foreground">4.9/5 Rating</p>
              <p className="text-xs text-muted-foreground">Based on 500+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <a href="#trust" className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-5 rounded-full border-2 border-current p-1">
            <div className="h-2 w-1 rounded-full bg-current mx-auto animate-pulse" />
          </div>
        </a>
      </div>
    </section>
  )
}
