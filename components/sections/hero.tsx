"use client"

import { useEffect, useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Hero() {
  const { setIsOpen } = useBooking()
  const [scrollY, setScrollY] = useState(0)
  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Media & Parallax */}
      <div
        className="absolute inset-0 z-0 scale-110"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
          className="h-full w-full object-cover brightness-[0.85]"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/09/25/51159-464366601_large.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent transition-opacity duration-700"
          style={{ opacity: 0.5 + scrollY * 0.001 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:text-left lg:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="overflow-hidden">
            <p className="animate-fade-in-up mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent [animation-delay:0.2s]">
              Beverly Hills Premier Med Spa
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <span className="animate-fade-in-up block [animation-delay:0.4s]">Timeless Beauty,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-fade-in-up block [animation-delay:0.6s] gradient-text">Naturally Refined</span>
            </span>
          </h1>

          {/* Subheadline */}
          <div className="overflow-hidden">
            <p className="animate-fade-in-up mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl [animation-delay:0.8s]">
              Experience the art of subtle enhancement. Our signature Botox treatments
              reveal your most radiant self—naturally, effortlessly, beautifully.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up mt-12 flex flex-col items-center gap-6 sm:flex-row lg:items-start [animation-delay:1s]">
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="group relative h-16 overflow-hidden rounded-full bg-primary px-10 text-lg font-medium text-primary-foreground luxury-shadow transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Your Consultation
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-16 rounded-full border-foreground/10 bg-white/5 px-10 text-lg font-medium text-foreground backdrop-blur-sm transition-all hover:bg-white/10"
              asChild
            >
              <a href="#results" className="flex items-center gap-2">
                View Results
                <Play className="h-4 w-4 fill-current" />
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up mt-14 flex flex-col items-center gap-8 sm:flex-row lg:items-start [animation-delay:1.2s]">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-12 rounded-full border-2 border-background/50 bg-muted luxury-shadow overflow-hidden ring-2 ring-primary/10"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      alt="Client"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-foreground">2,500+</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">Happy Clients</p>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-border/50 sm:block" />
            <div className="text-center sm:text-left">
              <p className="text-base font-bold text-foreground">4.9/5 Rating</p>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">Independent Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <a href="#trust" className="group flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Explore</span>
          <div className="relative h-10 w-6 rounded-full border border-current transition-transform duration-300 group-hover:translate-y-1">
            <div className="absolute top-2 left-1/2 h-1.5 w-1 -translate-x-1/2 rounded-full bg-current animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  )
}
