"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Info, CheckCircle2, MoreHorizontal } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const timelineDays = [
  {
    day: 0,
    title: "Appointment Day",
    feelings: "Excitement & mild anticipation. A series of tiny pinches (like a mosquito bite).",
    whatToExpect: "No noticeable changes. Mild redness at injection sites, which typically fades within 30 minutes.",
    results: "Natural state",
    intensity: 1, // Visual intensity of 'lines'
  },
  {
    day: 3,
    title: "Initial Softening",
    feelings: "You might begin to feel a slight resistance when frowning or raising your brows.",
    whatToExpect: "The muscle activity starts to quiet. The results are beginning to emerge naturally.",
    results: "Gentle relaxation",
    intensity: 0.7,
  },
  {
    day: 7,
    title: "Visible Radiance",
    feelings: "A smooth, rested feeling. Fine lines appear noticeably softer in static photos.",
    whatToExpect: "Real transformation is taking shape. Friends might ask if you've been sleeping better.",
    results: "Noticeable smoothing",
    intensity: 0.3,
  },
  {
    day: 14,
    title: "Peak Elegance",
    feelings: "Maximum relaxation of targeted muscles. You look refreshed, not 'frozen'.",
    whatToExpect: "Full effect achieved. This state of perfection will typically last for 3-4 months.",
    results: "Full result",
    intensity: 0.05,
  },
]

export function TransformationTimeline() {
  const [activeDay, setActiveDay] = useState(0)
  useScrollReveal()

  return (
    <section id="timeline" className="bg-background py-24 lg:py-40 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-20 animate-on-scroll">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Storyboarding Results
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="text-balance">The 14-Day Transformation</span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Watch the progressive journey from your first appointment to your most radiant self.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 items-start h-full">
          {/* Left: Progress Interaction (Desktop: Vertical, Mobile: Horizontal) */}
          <div className="lg:col-span-1 flex lg:flex-col items-center justify-between lg:justify-center gap-4 lg:h-[400px] animate-on-scroll">
            {timelineDays.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`group relative flex flex-col items-center transition-all duration-500 ${activeDay === index ? 'scale-110' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
              >
                <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center font-serif text-lg transition-all duration-500 ${activeDay === index ? 'bg-primary border-primary text-primary-foreground luxury-shadow' : 'border-primary/20 bg-background text-primary'}`}>
                  {step.day}
                </div>
                <span className={`mt-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap lg:absolute lg:left-16 transition-all duration-500 ${activeDay === index ? 'text-primary' : 'text-muted-foreground'}`}>
                  Day {step.day}
                </span>
                
                {/* Vertical Connector line */}
                {index < timelineDays.length - 1 && (
                  <div className="absolute top-14 h-12 w-[2px] bg-primary/10 hidden lg:block" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Detailed Content & Visual Simulation */}
          <div className="lg:col-span-11 grid lg:grid-cols-2 gap-12 bg-muted/50 rounded-[3rem] p-8 lg:p-14 glass animate-on-scroll [transition-delay:200ms]">
            
            {/* Simulation Pane: High-Res Macro-Skin Reveal */}
            <div className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden luxury-shadow group">
              {/* Natural/Initial State Image */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200"
                  alt="Natural Skin State"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover brightness-[0.95]"
                />
              </div>
              
              {/* Smooth/Treated State Image (Cross-fade) */}
              <motion.div 
                className="absolute inset-0"
                initial={false}
                animate={{ 
                  opacity: 1 - timelineDays[activeDay].intensity,
                  scale: 1 + (1 - timelineDays[activeDay].intensity) * 0.05 // Subtle zoom as it smoothes
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200"
                  alt="Smooth Skin State"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                
                {/* Golden Hour Radiance Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-white/10 mix-blend-overlay"
                  animate={{ opacity: (1 - timelineDays[activeDay].intensity) * 0.5 }}
                />
              </motion.div>

              {/* Day Badge Overlay */}
              <div className="absolute top-8 left-8 z-20">
                <div className="bg-black/60 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 flex flex-col items-start shadow-2xl">
                   <div className="flex items-center gap-3 mb-1">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em]">Timeline Insight</span>
                   </div>
                   <p className="text-2xl font-serif font-medium text-white">Day {timelineDays[activeDay].day}</p>
                </div>
              </div>

              {/* Status Badge Overlay */}
              <div className="absolute bottom-10 right-10 z-20">
                <motion.div 
                   key={activeDay}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="bg-white/95 backdrop-blur-md px-8 py-5 rounded-[2rem] border border-primary/10 shadow-lg text-right"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Transformation Phase</p>
                  <p className="text-xl font-serif font-medium text-foreground tracking-tight">{timelineDays[activeDay].results}</p>
                </motion.div>
              </div>

              {/* Subtle Noise for realism */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* Info Pane */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-serif text-3xl font-medium text-foreground mb-8">
                    {timelineDays[activeDay].title}
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Info className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">What You'll Feel</h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed pl-11 group-hover:text-foreground transition-colors duration-300">
                        {timelineDays[activeDay].feelings}
                      </p>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">What to Expect</h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed pl-11 group-hover:text-foreground transition-colors duration-300">
                        {timelineDays[activeDay].whatToExpect}
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 border-t border-primary/10 pt-10">
                     <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Safety First</span>
                     <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Expert Care</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
