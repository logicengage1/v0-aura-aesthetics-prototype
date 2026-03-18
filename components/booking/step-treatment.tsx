"use client"

import { useBooking, type TreatmentArea } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const treatments: { id: TreatmentArea; label: string; description: string }[] = [
  {
    id: "forehead",
    label: "Forehead Lines",
    description: "Horizontal lines across the forehead",
  },
  {
    id: "crows-feet",
    label: "Crow's Feet",
    description: "Fine lines around the outer corners of eyes",
  },
  {
    id: "frown-lines",
    label: "Frown Lines",
    description: "Vertical lines between the eyebrows (11 lines)",
  },
  {
    id: "bunny-lines",
    label: "Bunny Lines",
    description: "Lines on the sides of the nose",
  },
  {
    id: "lip-flip",
    label: "Lip Flip",
    description: "Subtle enhancement to the upper lip",
  },
  {
    id: "neck-bands",
    label: "Neck Bands",
    description: "Vertical bands on the neck",
  },
]

export function StepTreatment() {
  const { selectedTreatments, toggleTreatment, setStep } = useBooking()

  const canProceed = selectedTreatments.length > 0

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Step 1 of 3
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium text-foreground">
          Select Treatment Areas
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose one or more areas you&apos;d like to treat
        </p>
      </div>

      {/* Treatment Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {treatments.map((treatment) => {
          const isSelected = selectedTreatments.includes(treatment.id)
          return (
            <div
              key={treatment.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => toggleTreatment(treatment.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleTreatment(treatment.id)
                }
              }}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background"
                )}
              >
                {isSelected && (
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{treatment.label}</p>
                <p className="text-xs text-muted-foreground">{treatment.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Count */}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {selectedTreatments.length} area{selectedTreatments.length !== 1 ? "s" : ""} selected
      </p>

      {/* Continue Button */}
      <Button
        onClick={() => setStep(2)}
        disabled={!canProceed}
        className="mt-6 h-12 w-full rounded-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
      >
        Continue to Scheduling
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
