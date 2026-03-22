"use client"

import { useEffect, useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

export function Hero() {
  const { setIsOpen, setIsAssessmentOpen } = useBooking()
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
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
          className="h-full w-full object-cover brightness-[0.7] contrast-[1.1]"
        >
          <source 
            src="https://cdn.pixabay.com/video/2020/09/25/51159-464366601_large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Dynamic Multi-layered Scrim */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent transition-opacity duration-700"
          style={{ opacity: 0.6 + scrollY * 0.001 }}
        />
        
        {/* Submarine-style backdrop blur to quiet high-detail video frames */}
        <div className="absolute inset-x-0 bottom-0 top-0 backdrop-blur-[1px] opacity-40 pointer-events-none" />
      </div>

      {/* Content Container with Isolation Blur */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:text-left lg:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow: Highly legible uppercase badge */}
          <div className="overflow-hidden">
            <p className="animate-fade-in-up mb-6 inline-block rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-[0.5em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] [animation-delay:0.2s]">
              Beverly Hills Premier Med Spa
            </p>
          </div>

          {/* Main Headline with multi-layer deep shadow */}
          <h1 className="font-serif text-5xl font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <span className="animate-fade-in-up block [animation-delay:0.4s]">Timeless Beauty,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-fade-in-up block [animation-delay:0.6s] gradient-text brightness-125 saturate-[1.2]">Naturally Refined</span>
            </span>
          </h1>

          {/* Subheadline: Increased weight and contrast shadow */}
          <div className="overflow-hidden">
            <p className="animate-fade-in-up mt-10 max-w-xl text-lg leading-relaxed font-semibold text-white/95 drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)] sm:text-xl md:text-2xl [animation-delay:0.8s]">
              Experience the art of subtle enhancement. Our signature Botox treatments 
              reveal your most radiant self—naturally, effortlessly, beautifully.
            </p>
          </div>

          {/* CTA Buttons with enhanced separation */}
          <div className="animate-fade-in-up mt-16 flex flex-col items-center gap-6 sm:flex-row lg:items-start [animation-delay:1s]">
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="group relative h-18 overflow-hidden rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground luxury-shadow transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                Book Your Consultation
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
            </Button>
            
            <div className="flex flex-col items-center sm:items-start gap-4">
              <Button
                variant="outline"
                size="lg"
                className="h-18 rounded-full border-white/30 bg-white/10 px-12 text-lg font-bold text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:border-white/50"
                onClick={() => setIsAssessmentOpen(true)}
              >
                <span className="flex items-center gap-3">
                  Aura Assessment
                  <Sparkles className="h-5 w-5 fill-current text-accent animate-pulse" />
                </span>
              </Button>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 ml-4 hidden sm:block">
                Start your personalized plan
              </p>
            </div>
          </div>

          {/* Trust Indicators with high-contrast styling */}
          <div className="animate-fade-in-up mt-16 flex flex-col items-center gap-12 sm:flex-row lg:items-start [animation-delay:1.2s]">
            <div className="flex items-center gap-6 group">
              <div className="flex -space-x-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-14 w-14 rounded-full border-2 border-white/50 bg-muted luxury-shadow ring-4 ring-black/40 transition-transform group-hover:translate-y-[-6px]"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 22}`} 
                      alt="Client" 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-2xl font-serif font-medium text-white drop-shadow-md leading-none">2,500+</p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">Pristine Results</p>
              </div>
            </div>
            
            <div className="hidden h-14 w-px bg-white/30 sm:block" />
            
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                ))}
              </div>
              <p className="text-2xl font-serif font-medium text-white drop-shadow-md leading-none">4.9/5 Rating</p>
              <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">Client Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-transparent z-10 opacity-70" />

      {/* Scroll Indicator: Higher contrast to survive background variety */}
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
        <a href="#trust" className="group flex flex-col items-center gap-4 text-white/80 transition-all hover:text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] drop-shadow-md">Explore</span>
          <div className="relative h-14 w-7 rounded-full border-2 border-white/40 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-2 group-hover:border-white/80">
            <div className="absolute top-2 left-1/2 h-2.5 w-1 -translate-x-1/2 rounded-full bg-white animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  )
}
