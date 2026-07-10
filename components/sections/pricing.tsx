"use client"

import { useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Check, Star, Info, Crown, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const plans = [
  {
    name: "Standard Experience",
    singlePrice: "$14",
    memberPrice: "$13",
    unit: "/ Unit",
    description: "Premium care for one-time results that speak for themselves.",
    features: [
      "FDA-approved Botox Cosmetic",
      "Board-certified injector",
      "Symmetry refinement guarantee",
      "Touch-up at 2 weeks",
      "Aftercare luxury kit",
    ],
    highlighted: false,
    cta: "Book Now",
    icon: Zap,
  },
  {
    name: "Aura Insider",
    singlePrice: "$12",
    memberPrice: "$11",
    unit: "/ Unit",
    description: "Our signature membership for those committed to lasting beauty.",
    features: [
      "Everything in Standard",
      "Priority VIP scheduling",
      "15% off all skin treatments",
      "Exclusive seasonal events",
      "Annual holistic skincare plan",
      "Complimentary birthday units",
    ],
    highlighted: true,
    cta: "Become an Insider",
    badge: "Most Popular",
    icon: Crown,
  },
]

export function Pricing() {
  const { setIsOpen } = useBooking()
  const [isAnnual, setIsAnnual] = useState(false)
  const [showROI, setShowROI] = useState(false)
  useScrollReveal()

  const calculateDaily = (price: string) => {
    const num = parseInt(price.replace("$", ""))
    // Logic: Average 32 units for full face results / 90 day cycle
    return ((num * 32) / 90).toFixed(2)
  }

  return (
    <section id="pricing" className="bg-card py-24 lg:py-40 relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-on-scroll">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Investment
            </p>
          </div>
          <div className="animate-on-scroll [transition-delay:100ms]">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">Transparent Pricing</span>
            </h2>
          </div>
          <div className="animate-on-scroll [transition-delay:200ms]">
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              No hidden fees. Just beautiful, predictable results. Choose the path that fits your lifestyle.
            </p>
          </div>

          {/* Pricing Toggle & ROI Calculator */}
          <div className="animate-on-scroll mt-12 flex flex-col items-center gap-6 [transition-delay:300ms]">
            <div className="relative flex items-center rounded-full bg-background p-1 luxury-shadow border border-border/50">
              <button
                onClick={() => setIsAnnual(false)}
                className={cn(
                  "relative z-10 rounded-full px-6 py-2 text-sm font-bold transition-all duration-500",
                  !isAnnual ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Single Visit
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={cn(
                  "relative z-10 rounded-full px-6 py-2 text-sm font-bold transition-all duration-500",
                  isAnnual ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Member Rate
              </button>
              <div 
                className={cn(
                  "absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-primary shadow-lg transition-all duration-500 ease-luxury",
                  isAnnual ? "left-[calc(50%+2px)]" : "left-1"
                )}
              />
            </div>

            {/* ROI Toggle */}
            <div className="flex items-center gap-4">
               <span className={cn("text-xs font-bold uppercase tracking-widest transition-opacity", !showROI ? "text-primary" : "text-muted-foreground opacity-50")}>Per Unit</span>
               <button 
                 onClick={() => setShowROI(!showROI)}
                 className="relative w-12 h-6 rounded-full bg-muted border border-border transition-colors group"
               >
                 <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-primary transition-all duration-300", showROI ? "left-7" : "left-1")} />
               </button>
               <span className={cn("text-xs font-bold uppercase tracking-widest transition-opacity", showROI ? "text-primary" : "text-muted-foreground opacity-50")}>ROI View (Daily Cost)</span>
            </div>
            
            {showROI && (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent animate-in fade-in slide-in-from-bottom-2 duration-500">
                Investment framed as daily confidence based on a 90-day cycle
              </p>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "animate-on-scroll group relative rounded-[3rem] p-10 lg:p-14 transition-all duration-700 luxury-shadow",
                plan.highlighted
                  ? "bg-foreground text-background scale-105 z-10"
                  : "bg-background hover:-translate-y-2 hover:shadow-2xl z-0"
              )}
              style={{ transitionDelay: `${(index + 4) * 150}ms` }}
            >
              {/* Highlight Glow for Featured Card */}
              {plan.highlighted && (
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-accent-foreground shadow-xl">
                    <Star className="h-4 w-4 fill-current" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Plan Icon & Name */}
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl mb-8 transition-transform group-hover:scale-110",
                    plan.highlighted ? "bg-primary text-primary-foreground rotate-3" : "bg-card text-primary -rotate-3"
                  )}>
                    <plan.icon className="h-8 w-8" />
                  </div>
                  <h3 className={cn(
                    "font-serif text-2xl font-medium",
                    plan.highlighted ? "text-background" : "text-foreground"
                  )}>
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className={cn(
                    "font-serif text-7xl font-medium tracking-tighter transition-all duration-500",
                    plan.highlighted ? "text-background" : "text-foreground",
                    (isAnnual || showROI) && "scale-105 text-primary"
                  )}>
                    {showROI ? `$${calculateDaily(isAnnual ? plan.memberPrice : plan.singlePrice)}` : (isAnnual ? plan.memberPrice : plan.singlePrice)}
                  </span>
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-sm font-bold uppercase tracking-widest",
                      plan.highlighted ? "text-background/60" : "text-muted-foreground"
                    )}>
                      {showROI ? "/ Day" : plan.unit}
                    </span>
                    {(isAnnual || showROI) && (
                      <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">
                        {showROI ? "Confidence Investment" : "Member Rate"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className={cn(
                  "mt-6 text-base leading-relaxed",
                  plan.highlighted ? "text-background/80" : "text-muted-foreground"
                )}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mt-10 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-start gap-4 transition-all duration-300 hover:translate-x-2"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <div className={cn(
                        "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.highlighted ? "bg-primary/20" : "bg-primary/10"
                      )}>
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        plan.highlighted ? "text-background/90" : "text-foreground/80"
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
                    "mt-12 w-full h-16 rounded-full text-lg font-bold transition-all luxury-shadow overflow-hidden group/btn",
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full transition-transform duration-1000 group-hover/btn:translate-x-full" />
                </Button>

                {/* Tooltip Link */}
                <div className="mt-6 flex justify-center">
                  <button className={cn(
                    "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-100",
                    plan.highlighted ? "text-background/40 opacity-60" : "text-muted-foreground opacity-60"
                  )}>
                    <Info className="h-3 w-3" />
                    Fine Print & Benefits
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="animate-on-scroll mt-20 text-center [transition-delay:800ms]">
          <div className="inline-flex flex-col items-center gap-2 sm:flex-row sm:gap-6 rounded-full bg-background px-8 py-4 luxury-shadow border border-border/50">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Typical treatment: 20-40 units
            </p>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <p className="text-sm font-bold text-foreground">
              Complimentary Refinement included with all sessions
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
