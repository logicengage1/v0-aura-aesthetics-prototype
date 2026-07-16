"use client"

import { useBooking } from "@/lib/booking-context"
import { StepTreatment } from "./step-treatment"
import { StepDateTime } from "./step-datetime"
import { StepDetails } from "./step-details"
import { cn } from "@/lib/utils"
import { Calendar, X } from "lucide-react"

export function BookingModal() {
  const { isOpen, setIsOpen, currentStep, resetBooking } = useBooking()

  const handleClose = () => {
    resetBooking()
    setIsOpen(false)
  }

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center p-4 transition-all duration-700",
        isOpen
          ? "opacity-100 z-50 pointer-events-auto"
          : "opacity-[0.01] -z-50 pointer-events-none" 
      )}
      style={{ 
        visibility: "visible" 
      }}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-700",
          isOpen ? "opacity-100" : "opacity-0"
        )} 
        onClick={handleClose} 
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative bg-background max-h-[95vh] w-[95vw] rounded-[3rem] border-0 p-0 shadow-2xl overflow-hidden transition-all duration-700 sm:max-w-5xl",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        )}
      >
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 z-50 rounded-full bg-black/10 backdrop-blur-md p-2 text-foreground/70 hover:text-foreground transition-all hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
          {/* Left Panel: Context & Progress */}
          <div className="lg:w-1/3 bg-primary p-10 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

             <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md mb-8">
                   <Calendar className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-medium leading-tight mb-4">
                  Secure Your <br/>Session
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  You're just a few moments away from personalized radiance.
                </p>
             </div>

             <div className="relative z-10 space-y-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-4 group">
                     <div className={cn(
                       "h-8 w-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500",
                       step === currentStep
                         ? "bg-white text-primary border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                         : step < currentStep
                         ? "bg-white/20 border-white/20 text-white"
                         : "border-white/10 text-white/20"
                     )}>
                        {step < currentStep ? "✓" : step}
                     </div>
                     <div className="flex flex-col">
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-widest",
                          step === currentStep ? "text-accent" : "text-white/20"
                        )}>
                           Step {step}
                        </span>
                        <span className={cn(
                          "text-sm font-bold",
                          step === currentStep ? "text-white" : "text-white/20"
                        )}>
                           {step === 1 ? "Treatment Selection" : step === 2 ? "Date & Time" : "Confirmation"}
                        </span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Panel: Content Area */}
          <div className="lg:w-2/3 p-10 lg:p-14 bg-card/50 flex flex-col justify-center overflow-hidden relative">
             <div className="w-full max-w-lg mx-auto overflow-y-auto max-h-[80vh] hide-scrollbar py-2 relative">
               {currentStep === 1 && <StepTreatment />}
               {/* Always mounted while the modal is open so the Calendly iframe
                   loads in the background during treatment selection */}
               <StepDateTime active={currentStep === 2} />
               {currentStep === 3 && <StepDetails />}
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
