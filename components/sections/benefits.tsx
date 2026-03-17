import { Shield, Award, Clock, Heart } from "lucide-react"

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
  return (
    <section id="benefits" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Why Choose Aura
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Excellence in Every Detail</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            At Aura Aesthetics, we believe in the transformative power of subtle refinement.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-background p-8 transition-all hover:shadow-lg"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-medium text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
