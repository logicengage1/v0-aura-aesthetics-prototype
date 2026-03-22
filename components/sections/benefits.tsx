"use client"

import { Shield, Award, Clock, Heart } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const benefits = [
  {
    icon: Shield,
    title: "Board-Certified Experts",
    description: "Our team consists exclusively of board-certified physicians with advanced training in facial aesthetics and injection techniques.",
  },
  {
    icon: Award,
    title: "Premium Products Only",
    description: "We use only FDA-approved Botox Cosmetic from Allergan—never diluted, never substituted, always authentic.",
  },
  {
    icon: Clock,
    title: "Zero Downtime",
    description: "Return to your day immediately. Our precise micro-injection technique minimizes bruising and discomfort.",
  },
  {
    icon: Heart,
    title: "Natural Results",
    description: "We enhance, never freeze. Our philosophy centers on preserving your natural expressions while softening lines.",
  },
]

export function Benefits() {
  useScrollReveal()

  return (
    <section id="benefits" className="bg-card py-24 lg:py-40 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-on-scroll">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              The Aura Advantage
            </p>
          </div>
          <div className="animate-on-scroll [transition-delay:100ms]">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">Excellence in Every Detail</span>
            </h2>
          </div>
          <div className="animate-on-scroll [transition-delay:200ms]">
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              At Aura Aesthetics, we believe in the transformative power of subtle refinement. 
              Our commitment to safety and artistry ensures results that resonate.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="animate-on-scroll group relative rounded-3xl bg-background p-10 luxury-shadow transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Card Hover Border Effect */}
              <div className="absolute inset-0 rounded-3xl border border-transparent transition-colors group-hover:border-primary/20" />
              
              <div className="relative z-10">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[360deg]">
                  <benefit.icon className="h-8 w-8" />
                </div>
                
                <h3 className="mb-4 font-serif text-2xl font-medium text-foreground transition-colors group-hover:text-primary">
                  {benefit.title}
                </h3>
                
                <p className="text-base leading-relaxed text-muted-foreground transition-opacity group-hover:opacity-90">
                  {benefit.description}
                </p>

                {/* Subtle Accent Line */}
                <div className="mt-8 h-1 w-0 bg-accent/30 transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
