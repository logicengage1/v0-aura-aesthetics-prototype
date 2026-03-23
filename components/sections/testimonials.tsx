"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const testimonials = [
  {
    id: 1,
    name: "Elena R.",
    location: "Beverly Hills",
    quote: "I just look like I've had a really great nap. No one knew I had Botox, they just said I looked glowing.",
    rating: 5,
  },
  {
    id: 2,
    name: "James L.",
    location: "Santa Monica",
    quote: "Professional, clinical environment. The symmetry promise gave me total peace of mind.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah M.",
    location: "West Hollywood",
    quote: "Zero bruising and a completely natural look. I'm officially an Aura Insider.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  useScrollReveal()

  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      handleNext()
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, currentIndex])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <section id="testimonials" className="bg-background py-24 lg:py-40 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-on-scroll">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Testimonials
            </p>
          </div>
          <div className="animate-on-scroll [transition-delay:100ms]">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">Voices of Confidence</span>
            </h2>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="relative mt-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="mx-auto max-w-5xl overflow-visible">
            <div className="relative h-[480px] sm:h-[400px] lg:h-[420px]">
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentIndex
                const isPrevious = index === (currentIndex - 1 + testimonials.length) % testimonials.length
                const isNext = index === (currentIndex + 1) % testimonials.length

                const monogram = testimonial.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()

                return (
                  <div
                    key={testimonial.id}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-luxury py-4",
                      isActive ? "z-20 opacity-100 scale-100 rotate-0" : 
                      isPrevious ? "z-10 opacity-0 -translate-x-full scale-90 -rotate-6" :
                      isNext ? "z-10 opacity-0 translate-x-full scale-90 rotate-6" :
                      "z-0 opacity-0 scale-75"
                    )}
                  >
                    <div className="h-full rounded-[3rem] bg-card/50 glass p-8 text-center lg:p-16 luxury-shadow border border-white/40 flex flex-col justify-center items-center">
                      {/* Quote Icon */}
                      <div className="relative mb-8">
                        <Quote className="h-12 w-12 text-primary/20 transition-transform duration-700 group-hover:rotate-12" />
                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/5 [animation-duration:3s]" />
                      </div>

                      {/* Quote */}
                      <blockquote className="font-serif text-2xl font-medium leading-relaxed text-foreground sm:text-3xl lg:text-4xl italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Rating */}
                      <div className="mt-10 flex justify-center gap-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5 transition-all duration-500",
                              i < testimonial.rating ? "fill-accent text-accent" : "text-muted-foreground/30",
                              isActive && "animate-fade-scale-in"
                            )}
                            style={{ animationDelay: `${800 + i * 100}ms` }}
                          />
                        ))}
                      </div>

                      {/* Author */}
                      <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:text-left transition-all duration-500">
                        <div className="relative h-20 w-20 rounded-full border-[3px] border-accent/40 bg-card luxury-shadow flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                          <span className="text-2xl font-serif font-bold text-accent tracking-tighter">
                            {monogram}
                          </span>
                          <div className="absolute -inset-2 rounded-full border border-accent/10 animate-spin-slow opacity-50" />
                        </div>
                        <div className="flex flex-col items-center sm:items-start group/verified">
                          <div className="flex items-center gap-2 mb-1.5">
                             <p className="font-bold text-xl text-foreground tracking-tight">{testimonial.name}</p>
                             <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                <CheckCircle2 className="h-3 w-3 text-accent" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Verified Member</span>
                             </div>
                          </div>
                          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/80">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-4 lg:-px-8">
            <button
              onClick={handlePrevious}
              className="pointer-events-auto h-14 w-14 rounded-full bg-white/40 glass shadow-2xl flex items-center justify-center transition-all hover:bg-white hover:scale-110 active:scale-95 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-foreground transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto h-14 w-14 rounded-full bg-white/40 glass shadow-2xl flex items-center justify-center transition-all hover:bg-white hover:scale-110 active:scale-95 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500",
                index === currentIndex
                  ? "w-10 bg-primary"
                  : "w-2.5 bg-border hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
