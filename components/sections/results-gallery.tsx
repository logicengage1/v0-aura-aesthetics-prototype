"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

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

function BeforeAfterCard({ item }: { item: BeforeAfterItem }) {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={showAfter ? item.afterImage : item.beforeImage}
          alt={`${item.area} ${showAfter ? "after" : "before"} treatment`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 pt-20">
        <p className="mb-3 text-lg font-serif font-medium text-white">{item.area}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAfter(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-all",
              !showAfter
                ? "bg-white text-foreground"
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-all",
              showAfter
                ? "bg-white text-foreground"
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            After
          </button>
        </div>
      </div>
    </div>
  )
}

export function ResultsGallery() {
  return (
    <section id="results" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Real Results
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">See the Difference</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Subtle transformations that enhance your natural beauty. 
            Every result is tailored to preserve what makes you, you.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>

        {/* Symmetry Promise */}
        <div className="mt-16 rounded-2xl bg-card p-8 text-center lg:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            The Aura Promise
          </p>
          <p className="mt-4 font-serif text-2xl font-medium text-foreground sm:text-3xl">
            &ldquo;Perfect symmetry or we refine it—complimentary.&rdquo;
          </p>
          <p className="mt-4 text-muted-foreground">
            Our commitment to your satisfaction is absolute.
          </p>
        </div>
      </div>
    </section>
  )
}
