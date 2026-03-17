"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Client Stories
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Voices of Confidence</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="mx-auto max-w-4xl overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="rounded-3xl bg-card p-8 text-center lg:p-12">
                    {/* Quote Icon */}
                    <Quote className="mx-auto h-10 w-10 text-primary/30" />

                    {/* Quote */}
                    <blockquote className="mt-6 font-serif text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Rating */}
                    <div className="mt-6 flex justify-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="h-5 w-5 fill-accent text-accent"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="mt-6">
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-card p-3 shadow-lg transition-all hover:bg-background hover:scale-110 lg:-left-4"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-card p-3 shadow-lg transition-all hover:bg-background hover:scale-110 lg:-right-4"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
