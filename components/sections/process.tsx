"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Begin with a complimentary consultation where we discuss your goals, assess your facial anatomy, and create a personalized treatment plan.",
    duration: "15 min",
  },
  {
    number: "02",
    title: "Treatment",
    description: "Using precise micro-injection techniques, we administer Botox to targeted areas. Most clients describe the sensation as a small pinch.",
    duration: "20 min",
  },
  {
    number: "03",
    title: "Results",
    description: "Within 3-7 days, watch your results emerge naturally. Full effects are visible at 14 days, lasting 3-4 months.",
    duration: "3-7 days",
  },
]

export function Process() {
  const { setIsOpen } = useBooking()

  return (
    <section id="process" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Your Journey
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Three Simple Steps to Radiance</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A seamless experience from consultation to beautiful results.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-16 left-full hidden h-px w-full -translate-x-1/2 bg-gradient-to-r from-border to-transparent lg:block" />
              )}
              
              <div className="rounded-2xl bg-card p-8 lg:p-10">
                {/* Step Number */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-serif text-5xl font-medium text-primary/30">
                    {step.number}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {step.duration}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="mb-3 font-serif text-2xl font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="cta-pulse h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
