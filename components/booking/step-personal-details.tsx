"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function StepPersonalDetails() {
  const { personalDetails, setPersonalDetails, setStep } = useBooking()

  const canProceed = personalDetails.name && personalDetails.email && personalDetails.phone && personalDetails.firstTime

  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name<span className="text-destructive">*</span></Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            value={personalDetails.name} 
            onChange={(e) => setPersonalDetails({ name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email<span className="text-destructive">*</span></Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com"
            value={personalDetails.email} 
            onChange={(e) => setPersonalDetails({ email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number<span className="text-destructive">*</span></Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+1 (555) 000-0000"
            value={personalDetails.phone} 
            onChange={(e) => setPersonalDetails({ phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Is this your first time receiving Botox?<span className="text-destructive">*</span></Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="firstTime" 
                value="Yes" 
                checked={personalDetails.firstTime === "Yes"}
                onChange={() => setPersonalDetails({ firstTime: "Yes" })}
                className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
              />
              <span className="text-sm font-medium">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="firstTime" 
                value="No" 
                checked={personalDetails.firstTime === "No"}
                onChange={() => setPersonalDetails({ firstTime: "No" })}
                className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
              />
              <span className="text-sm font-medium">No</span>
            </label>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label htmlFor="specialEvent">Are you preparing for a special event?</Label>
          <Input 
            id="specialEvent" 
            placeholder="e.g. Wedding, vacation..."
            value={personalDetails.specialEvent} 
            onChange={(e) => setPersonalDetails({ specialEvent: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Anything else you'd like us to know?</Label>
          <Input 
            id="notes" 
            placeholder="Any specific concerns or details"
            value={personalDetails.notes} 
            onChange={(e) => setPersonalDetails({ notes: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="h-12 flex-1 rounded-full border-foreground/20 text-base font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!canProceed}
          className="h-12 flex-[2] rounded-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          Continue to Schedule
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
