"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Check, Calendar, Clock, MapPin } from "lucide-react"

export function StepSuccess() {
  const { selectedDate, selectedTime, contactInfo, resetBooking } = useBooking()

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="flex flex-col items-center text-center">
      {/* Success Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
        <Check className="h-10 w-10 text-primary-foreground" />
      </div>

      {/* Header */}
      <h3 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
        Request Received
      </h3>
      <p className="mt-3 max-w-sm text-muted-foreground">
        Thank you, {contactInfo.name.split(" ")[0]}! Your consultation request has been submitted. 
        We&apos;ll contact you shortly to confirm your appointment.
      </p>

      {/* Appointment Details */}
      <div className="mt-8 w-full rounded-2xl bg-muted/50 p-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Requested Appointment
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-foreground">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-foreground">{selectedTime}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-foreground">123 Wellness Way, Beverly Hills</span>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="mt-8 text-left w-full">
        <p className="text-sm font-medium text-foreground mb-3">What happens next:</p>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              1
            </span>
            You&apos;ll receive a confirmation email within 24 hours
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              2
            </span>
            Our team will call to finalize your appointment time
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              3
            </span>
            Complete intake forms sent via email before your visit
          </li>
        </ol>
      </div>

      {/* Close Button */}
      <Button
        onClick={resetBooking}
        className="mt-8 h-12 w-full rounded-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90"
      >
        Done
      </Button>
    </div>
  )
}
