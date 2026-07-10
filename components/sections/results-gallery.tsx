"use client"

import { useState, useRef, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface BeforeAfterItem {
  id: number
  area: string
  beforeImage: string
  afterImage: string
}

const results: BeforeAfterItem[] = [
  {
    id: 1,
    area: "Forehead Lines",
    beforeImage: "/images/results/forehead-before.jpg",
    afterImage: "/images/results/forehead-after.jpg",
  },
  {
    id: 2,
    area: "Crow's Feet",
    beforeImage: "/images/results/crows-feet-before.jpg",
    afterImage: "/images/results/crows-feet-after.jpg",
  },
  {
    id: 3,
    area: "Frown Lines",
    beforeImage: "/images/results/frown-lines-before.jpg",
    afterImage: "/images/results/frown-lines-after.jpg",
  },
]

function ComparisonSlider({ item }: { item: BeforeAfterItem }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX : e.clientX
    const relativeX = x - rect.left
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100))
    
    setSliderPos(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleMove)
      window.addEventListener("touchend", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div 
      className="animate-on-scroll group relative aspect-[4/5] overflow-hidden rounded-3xl bg-card luxury-shadow cursor-col-resize select-none"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Base) */}
      <img
        src={item.afterImage}
        alt="After treatment"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* Before Image (Top Layer) */}
      <div 
        className="absolute inset-0 h-full w-full overflow-hidden border-r-2 border-white/50"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={item.beforeImage}
          alt="Before treatment"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-[100%] w-[auto] max-w-none object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%", height: "100%" }}
        />
        {/* Before Label */}
        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          Before
        </div>
      </div>

      {/* After Label */}
      <div className="absolute right-4 top-4 rounded-full bg-primary/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
        After
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute bottom-0 top-0 z-20 w-1 flex items-center justify-center -translate-x-1/2"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center ring-4 ring-black/5">
          <div className="flex gap-0.5">
            <div className="h-4 w-0.5 bg-foreground/20 rounded-full" />
            <div className="h-4 w-0.5 bg-foreground/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-serif text-xl font-medium text-white">{item.area}</p>
        <p className="text-xs text-white/70 uppercase tracking-widest mt-1">Slide to compare results</p>
      </div>
    </div>
  )
}

export function ResultsGallery() {
  useScrollReveal()

  return (
    <section id="results" className="bg-background py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-on-scroll">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Visual Proof
            </p>
          </div>
          <div className="animate-on-scroll [transition-delay:100ms]">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">Remarkable Transformations</span>
            </h2>
          </div>
          <div className="animate-on-scroll [transition-delay:200ms]">
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Real results from our patients in Beverly Hills. Experience the 
              art of subtle refinement and natural symmetry.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => (
            <div key={item.id} style={{ transitionDelay: `${(index + 3) * 150}ms` }} className="animate-on-scroll">
              <ComparisonSlider item={item} />
            </div>
          ))}
        </div>

        {/* Symmetry Promise */}
        <div className="animate-on-scroll mt-24 overflow-hidden rounded-[3rem] bg-card p-12 lg:p-20 relative">
          {/* Decorative Circle */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          
          <div className="relative z-10 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-accent">
              The Aura Commitment
            </p>
            <p className="mt-8 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-5xl max-w-4xl mx-auto italic">
              &ldquo;We guarantee natural symmetry. If it&apos;s not perfect, we refine it—at no cost to you.&rdquo;
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="h-[1px] w-12 bg-accent/30" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                Licensed Practitioners &middot; Premium FDA Product
              </p>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
