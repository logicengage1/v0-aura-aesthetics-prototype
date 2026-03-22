"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Syringe, Sparkle, Search } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "The Vision",
    icon: Search,
    description: "Begin with a complimentary consultation where we discuss your goals, assess your facial anatomy, and create a personalized treatment plan.",
    duration: "15 min",
  },
  {
    number: "02",
    title: "The Artistry",
    icon: Syringe,
    description: "Using precise micro-injection techniques, we administer Botox to targeted areas. Most clients describe the sensation as a small pinch.",
    duration: "20 min",
  },
  {
    number: "03",
    title: "The Radiance",
    icon: Sparkles,
    description: "Within 3-7 days, watch your results emerge naturally. Full effects are visible at 14 days, lasting 3-4 months.",
    duration: "3-7 days",
  },
]

export function Process() {
  const { setIsOpen } = useBooking()
  useScrollReveal()

  return (
    <section id="process" className="bg-background py-24 lg:py-40 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
        <span className="font-serif text-[40vw] font-bold leading-none">AURA</span>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-on-scroll">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Your Journey
            </p>
          </div>
          <div className="animate-on-scroll [transition-delay:100ms]">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">Three Steps to Radiance</span>
            </h2>
          </div>
          <div className="animate-on-scroll [transition-delay:200ms]">
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A seamless, luxurious experience from consultation to your final glowing results.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mt-24 grid gap-12 lg:grid-cols-3 relative">
          {/* Animated Connecting SVG Line (Desktop Only) */}
          <div className="absolute top-24 left-0 w-full px-20 hidden lg:block opacity-20">
            <svg width="100%" height="2" viewBox="0 0 800 2" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 1H800" stroke="url(#paint0_linear)" strokeWidth="2" strokeDasharray="8 8" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="1" x2="800" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="currentColor" stopOpacity="0" />
                  <stop offset="0.5" stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="animate-on-scroll relative group" 
              style={{ transitionDelay: `${(index + 3) * 150}ms` }}
            >
              <div className="relative rounded-[3rem] bg-card/40 glass p-10 lg:p-14 luxury-shadow transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:bg-white/60">
                {/* Step Icon & Number */}
                <div className="mb-10 flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/10 [animation-duration:4s]" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <step.icon className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-6xl font-medium text-primary/10 transition-colors group-hover:text-primary/20">
                      {step.number}
                    </span>
                    <div className="mt-2 block rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                      {step.duration}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="mb-4 font-serif text-3xl font-medium text-foreground transition-all duration-500 group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg transition-opacity group-hover:text-foreground/80">
                  {step.description}
                </p>

                {/* Arrow hint for mobile */}
                <div className="mt-8 flex items-center gap-2 text-primary opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Mobile Connector */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-6 lg:hidden">
                  <div className="h-12 w-[1px] bg-gradient-to-b from-primary via-accent to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="animate-on-scroll mt-24 text-center [transition-delay:800ms]">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur group-hover:opacity-40 transition-opacity" />
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="relative h-18 rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground luxury-shadow transition-all hover:scale-105 active:scale-95 group/btn overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Transformation
                <Sparkle className="h-5 w-5 fill-current transition-transform duration-700 group-hover/btn:rotate-[360deg]" />
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full transition-transform duration-1000 group-hover/btn:translate-x-full" />
            </Button>
          </div>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground/60">
            Beverly Hills &middot; Santa Monica &middot; West Hollywood
          </p>
        </div>
      </div>
    </section>
  )
}
