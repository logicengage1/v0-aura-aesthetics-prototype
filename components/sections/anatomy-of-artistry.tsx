"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, ShieldCheck, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const muscleZones = [
  {
    id: "forehead",
    name: "Frontalis Muscle",
    region: "Higher Forehead",
    description: "The forehead's primary elevator muscle. We target precise micro-injection points to soften horizontal lines while maintaining natural expression.",
    benefit: "Softens horizontal wrinkles",
    icon: Sparkles,
    x: "50%",
    y: "15%",
  },
  {
    id: "glabella",
    name: "Corrugator Muscle",
    region: "Between Brows",
    description: "Responsible for those 'frown lines' or '11s'. Relaxing this zone opens the eye area and creates a more rested, approachable appearance.",
    benefit: "Smooths frown lines",
    icon: ShieldCheck,
    x: "50%",
    y: "28%",
  },
  {
    id: "eyes",
    name: "Orbicularis Oculi",
    region: "Outer Eyes",
    description: "The muscle responsible for 'Crow's Feet'. Our precision technique gently relaxes the corners without affecting your smile's authenticity.",
    benefit: "Softens Crow's Feet",
    icon: Activity,
    x: "82%",
    y: "35%",
  },
  {
    id: "jawline",
    name: "Masseter Muscle",
    region: "Lower Jaw",
    description: "Reducing activity here can slim the lower face while also providing relief from clenching or grinding (bruxism).",
    benefit: "Slims the face & jaw",
    icon: Sparkles,
    x: "75%",
    y: "75%",
  },
]

export function AnatomyOfArtistry() {
  const [activeZone, setActiveZone] = useState<string | null>(null)
  useScrollReveal()

  return (
    <section id="anatomy" className="bg-muted py-24 lg:py-40 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: Scientific Narrative */}
          <div className="animate-on-scroll">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Expert Authority
            </p>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">Anatomy of Artistry</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Beyond simple treatment, Aura Aesthetics is rooted in medical science. Each injection is a calculated artistic decision, ensuring results that enhance your natural structure rather than masking it.
            </p>

            <div className="mt-12 space-y-8">
              <AnimatePresence mode="wait">
                {activeZone ? (
                  <motion.div
                    key={activeZone}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-8 rounded-3xl bg-white/60 glass luxury-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        {(() => {
                          const zone = muscleZones.find(z => z.id === activeZone);
                          const Icon = zone?.icon || Sparkles;
                          return <Icon className="h-6 w-6" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-medium text-foreground">
                          {muscleZones.find(z => z.id === activeZone)?.name}
                        </h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent">
                          {muscleZones.find(z => z.id === activeZone)?.region}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {muscleZones.find(z => z.id === activeZone)?.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <ShieldCheck className="h-5 w-5" />
                      <span>{muscleZones.find(z => z.id === activeZone)?.benefit}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-3xl bg-white/40 glass border border-dashed border-primary/20 flex flex-col items-center text-center justify-center min-h-[300px]"
                  >
                    <div className="h-16 w-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                      <Activity className="h-8 w-8 text-primary/40" />
                    </div>
                    <p className="text-muted-foreground italic max-w-sm">
                      Select a muscle zone on the map to explore our scientific approach to facial rejuvenation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Interactive SVG Map */}
          <div className="animate-on-scroll [transition-delay:300ms] relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto luxury-shadow rounded-[4rem] bg-white p-8 group overflow-hidden">
              {/* The Head Silhouette (Simplified for MVP, artistic minimalist) */}
              <svg 
                viewBox="0 0 400 500" 
                className="w-full h-full text-muted-foreground/20 fill-current transition-colors group-hover:text-muted-foreground/30"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified Face Silhouette */}
                <path d="M200 50 C120 50 60 120 60 220 C60 280 80 340 100 380 C120 420 160 450 200 450 C240 450 280 420 300 380 C320 340 340 280 340 220 C340 120 280 50 200 50 Z" />
                
                {/* Hairline region focus */}
                <path d="M80 180 Q200 130 320 180" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                
                {/* Brow region */}
                <path d="M120 240 Q160 220 200 220 Q240 220 280 240" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                
                {/* Jaw region highlight */}
                <path d="M110 395 Q200 435 290 395" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
              </svg>

              {/* Hotspots */}
              {muscleZones.map((zone) => (
                <div
                  key={zone.id}
                  className="absolute"
                  style={{ left: zone.x, top: zone.y }}
                >
                  <button
                    onMouseEnter={() => setActiveZone(zone.id)}
                    className="relative flex items-center justify-center group/btn"
                  >
                    <span className="absolute h-8 w-8 rounded-full bg-primary/20 blur-sm group-hover/btn:scale-150 transition-transform duration-500" />
                    <span className={`relative h-3 w-3 rounded-full border-2 transition-all duration-300 ${activeZone === zone.id ? 'bg-primary border-white scale-150' : 'bg-white border-primary group-hover/btn:bg-primary/40'}`} />
                    
                    {/* Ring animation */}
                    <span className="absolute h-12 w-12 rounded-full border border-primary/20 animate-ping [animation-duration:3s]" />
                    
                    {/* Label (Desktop Only) */}
                    <span className={`absolute left-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeZone === zone.id ? 'opacity-100 translate-x-2 text-primary' : 'opacity-0 translate-x-0'}`}>
                      {zone.name}
                    </span>
                  </button>
                </div>
              ))}

              {/* Decorative Scan Lines overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="w-full h-[1px] bg-foreground absolute top-[20%] animate-scan-slow" />
                <div className="w-full h-[1px] bg-foreground absolute top-[50%] opacity-50" />
                <div className="w-full h-[1px] bg-foreground absolute top-[80%] opacity-30" />
              </div>
            </div>
            
            {/* Legend/Info Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-card p-6 rounded-3xl luxury-shadow glass border border-white/40 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                  Precision Protocol
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Treatment is tailored to your unique muscular anatomy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
