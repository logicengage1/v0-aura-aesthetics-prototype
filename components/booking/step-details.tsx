"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Check, Mail, MapPin, Sparkles } from "lucide-react"
import { treatments } from "./step-treatment"

// Step 3: warm conclusion shown after Calendly confirms the booking.
// The appointment is already secured at this point — nothing left to submit.
export function StepDetails() {
  const { selectedTreatments, resetBooking } = useBooking()

  const selectedLabels = treatments.filter((t) => selectedTreatments.includes(t.id))

  return (
    <div className="flex flex-col items-center text-center">
      {/* Celebration Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
        <Sparkles className="h-10 w-10 text-primary-foreground" />
      </div>

      <h3 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
        You&apos;re Booked — We Can&apos;t Wait to See You
      </h3>
      <p className="mt-3 max-w-sm text-muted-foreground">
        Your session is confirmed. Take a breath — your most radiant self is officially on the calendar.
      </p>

      {/* Booking Summary */}
      <div className="mt-8 w-full rounded-2xl bg-muted/50 p-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Your Session
        </p>
        <div className="space-y-3">
          {selectedLabels.map((t) => (
            <div key={t.id} className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-foreground">{t.label}</span>
            </div>
          ))}
          <div className="flex items-center justify-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-foreground">123 Wellness Way, Beverly Hills</span>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="mt-8 w-full text-left">
        <p className="mb-3 text-sm font-medium text-foreground">What happens next:</p>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              <Mail className="h-3 w-3" />
            </span>
            A confirmation email with your appointment details is on its way
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              1
            </span>
            Our team will reach out if anything needs to be confirmed
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              2
            </span>
            Complete intake forms sent via email before your visit
          </li>
        </ol>
      </div>

      <Button
        onClick={resetBooking}
        className="mt-8 h-12 w-full rounded-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90"
      >
        Done
      </Button>
    </div>
  )
}
