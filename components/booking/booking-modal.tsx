"use client"

import { useBooking } from "@/lib/booking-context"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { StepTreatment } from "./step-treatment"
import { StepDateTime } from "./step-datetime"
import { StepDetails } from "./step-details"
import { StepSuccess } from "./step-success"
import { cn } from "@/lib/utils"

export function BookingModal() {
  const { isOpen, setIsOpen, currentStep, resetBooking } = useBooking()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset when closing if not on success
      if (currentStep !== "success") {
        resetBooking()
      }
    }
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={cn(
          "max-h-[90vh] overflow-y-auto rounded-3xl border-0 bg-card p-6 shadow-2xl sm:max-w-lg sm:p-8",
          currentStep === "success" && "sm:max-w-md"
        )}
        showCloseButton={currentStep !== "success"}
      >
        <DialogTitle className="sr-only">
          Book Your Consultation
        </DialogTitle>
        
        {/* Step Progress (not shown on success) */}
        {currentStep !== "success" && (
          <div className="mb-6 flex justify-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  step === currentStep
                    ? "w-8 bg-primary"
                    : step < (currentStep as number)
                    ? "w-8 bg-primary/50"
                    : "w-4 bg-border"
                )}
              />
            ))}
          </div>
        )}

        {/* Step Content */}
        {currentStep === 1 && <StepTreatment />}
        {currentStep === 2 && <StepDateTime />}
        {currentStep === 3 && <StepDetails />}
        {currentStep === "success" && <StepSuccess />}
      </DialogContent>
    </Dialog>
  )
}
