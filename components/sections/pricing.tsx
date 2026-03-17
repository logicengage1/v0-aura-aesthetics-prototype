"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Standard",
    price: "$14",
    unit: "/ Unit",
    description: "Perfect for first-time clients exploring Botox treatments.",
    features: [
      "FDA-approved Botox Cosmetic",
      "Board-certified injector",
      "Complimentary consultation",
      "Touch-up at 2 weeks",
      "Aftercare instructions",
    ],
    highlighted: false,
    cta: "Book Now",
  },
  {
    name: "Aura Insider",
    price: "$12",
    unit: "/ Unit",
    description: "Our exclusive membership for those committed to lasting beauty.",
    features: [
      "Everything in Standard",
      "Priority scheduling",
      "15% off all treatments",
      "Exclusive member events",
      "Annual skincare consultation",
      "Birthday bonus units",
    ],
    highlighted: true,
    cta: "Become an Insider",
    badge: "Most Popular",
  },
]

export function Pricing() {
  const { setIsOpen } = useBooking()

  return (
    <section id="pricing" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Investment
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Transparent Pricing</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            No hidden fees. No surprises. Just beautiful results at fair prices.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-3xl p-8 lg:p-10",
                plan.highlighted
                  ? "bg-foreground text-background"
                  : "bg-background"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={cn(
                "font-serif text-xl font-medium",
                plan.highlighted ? "text-background" : "text-foreground"
              )}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className={cn(
                  "font-serif text-5xl font-medium",
                  plan.highlighted ? "text-background" : "text-foreground"
                )}>
                  {plan.price}
                </span>
                <span className={cn(
                  "text-sm",
                  plan.highlighted ? "text-background/70" : "text-muted-foreground"
                )}>
                  {plan.unit}
                </span>
              </div>

              {/* Description */}
              <p className={cn(
                "mt-4 text-sm",
                plan.highlighted ? "text-background/80" : "text-muted-foreground"
              )}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={cn(
                      "mt-0.5 h-5 w-5 shrink-0",
                      plan.highlighted ? "text-primary" : "text-primary"
                    )} />
                    <span className={cn(
                      "text-sm",
                      plan.highlighted ? "text-background/90" : "text-foreground"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                  "mt-8 w-full h-12 rounded-full text-base font-medium transition-all hover:scale-[1.02]",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Average treatment uses 20-40 units depending on areas treated. 
          <br className="hidden sm:block" />
          Exact pricing provided during your complimentary consultation.
        </p>
      </div>
    </section>
  )
}
