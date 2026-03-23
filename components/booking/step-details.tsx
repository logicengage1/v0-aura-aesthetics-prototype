"use client"

import { useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function StepDetails() {
  const { 
    contactInfo, 
    updateContactInfo, 
    consentChecked, 
    setConsentChecked, 
    setStep,
    submitBooking,
    isSubmitting
  } = useBooking()

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    return /^[\d\s\-\(\)]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10
  }

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {}

    if (!contactInfo.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!contactInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(contactInfo.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!contactInfo.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!validatePhone(contactInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!consentChecked) {
      newErrors.consent = "You must agree to continue"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      await submitBooking()
    }
  }

  return (
    <div className="flex flex-col">
      {/* Form */}

      {/* Form */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={contactInfo.name}
            onChange={(e) => {
              updateContactInfo({ name: e.target.value })
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }))
            }}
            className={cn(
              "mt-1.5 h-12 rounded-lg",
              errors.name && "border-destructive"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            value={contactInfo.email}
            onChange={(e) => {
              updateContactInfo({ email: e.target.value })
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
            }}
            className={cn(
              "mt-1.5 h-12 rounded-lg",
              errors.email && "border-destructive"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(310) 555-1234"
            value={contactInfo.phone}
            onChange={(e) => {
              updateContactInfo({ phone: e.target.value })
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }))
            }}
            className={cn(
              "mt-1.5 h-12 rounded-lg",
              errors.phone && "border-destructive"
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Consent */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={consentChecked}
              onCheckedChange={(checked) => {
                setConsentChecked(checked === true)
                if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }))
              }}
              className="mt-0.5"
            />
            <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I understand that this is a consultation request and that a member of the Aura team will contact me to finalize my appointment. I consent to receive communications regarding my booking.
            </Label>
          </div>
          {errors.consent && (
            <p className="mt-2 text-xs text-destructive">{errors.consent}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex gap-3">
        <Button
          onClick={() => setStep(2)}
          variant="outline"
          disabled={isSubmitting}
          className="h-12 flex-1 rounded-full border-foreground/20 text-base font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="h-12 flex-1 rounded-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request Appointment"
          )}
        </Button>
      </div>
    </div>
  )
}
