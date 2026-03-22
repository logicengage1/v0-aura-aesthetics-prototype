"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBooking, type TreatmentArea } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, Check, Sparkles, User, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "focus",
    title: "Project Your Vision",
    subtitle: "Select the areas where you'd like to see the most refinement.",
    options: [
      { id: "forehead", label: "Upper Forehead", icon: Target },
      { id: "frown-lines", label: "Between Brows", icon: Zap },
      { id: "crows-feet", label: "Outer Eyes", icon: Sparkles },
      { id: "jawline", label: "Jawline / Masseter", icon: User },
    ],
  },
  {
    id: "goal",
    title: "Define Your Result",
    subtitle: "What is your primary aesthetic objective?",
    options: [
      { id: "natural", label: "Subtle Softening", description: "Maintain full expression while softening fine lines." },
      { id: "smooth", label: "Maximum Smoothness", description: "Achieve a sleek, airbrushed finish." },
      { id: "prevent", label: "Proactive Prevention", description: "Stop lines before they become permanent." },
    ],
  },
]

export function AuraAssessment() {
  const { isAssessmentOpen, setIsAssessmentOpen, setIsOpen, toggleTreatment, selectedTreatments } = useBooking()
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<{
    areas: string[]
    goal: string | null
  }>({
    areas: [],
    goal: null,
  })

  if (!isAssessmentOpen) return null

  const handleAreaToggle = (areaId: string) => {
    setSelections(prev => ({
      ...prev,
      areas: prev.areas.includes(areaId)
        ? prev.areas.filter(a => a !== areaId)
        : [...prev.areas, areaId]
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Finalize: Sync with booking context and open booking modal
      selections.areas.forEach(area => {
        if (!selectedTreatments.includes(area as TreatmentArea)) {
           toggleTreatment(area as TreatmentArea)
        }
      })
      setIsAssessmentOpen(false)
      setIsOpen(true)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAssessmentOpen(false)}
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-[3rem] bg-card luxury-shadow border border-white/20"
      >
        <button
          onClick={() => setIsAssessmentOpen(false)}
          className="absolute right-8 top-8 z-10 rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid lg:grid-cols-5 h-full min-h-[600px]">
          {/* Left Panel: Progress Indicator */}
          <div className="lg:col-span-2 bg-primary p-12 text-primary-foreground flex flex-col justify-between overflow-hidden relative">
            {/* Animated background shape */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
               className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-[4rem] blur-2xl"
            />

            <div>
              <div className="flex items-center gap-2 mb-8">
                 <Sparkles className="h-6 w-6" />
                 <span className="text-xs font-bold uppercase tracking-[0.3em]">Aura Assessment</span>
              </div>
              <h2 className="font-serif text-4xl font-medium leading-tight mb-6">
                Your Journey to <br/>Personalized Radiance
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed font-medium">
                 A few expert questions to curate your perfect treatment protocol.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-4">
                   <div className={cn(
                     "h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500",
                     idx <= currentStep ? "bg-white text-primary border-white" : "border-white/20 text-white/40"
                   )}>
                     {idx + 1}
                   </div>
                   <span className={cn(
                     "text-sm font-bold uppercase tracking-widest",
                     idx <= currentStep ? "text-white" : "text-white/40"
                   )}>
                     {s.title}
                   </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Content */}
          <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">
                  Step {currentStep + 1}
                </h3>
                <h2 className="font-serif text-4xl font-medium text-foreground tracking-tight mb-4">
                  {steps[currentStep].title}
                </h2>
                <p className="text-muted-foreground text-lg mb-12">
                  {steps[currentStep].subtitle}
                </p>

                {/* Option Grids */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {steps[0].options.map((opt) => {
                      const Icon = (opt as any).icon
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAreaToggle(opt.id)}
                          className={cn(
                            "group relative p-6 rounded-3xl border-2 text-left transition-all duration-500",
                            selections.areas.includes(opt.id)
                              ? "bg-primary/5 border-primary shadow-lg"
                              : "bg-background border-border hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-2xl mb-4 flex items-center justify-center transition-all",
                            selections.areas.includes(opt.id) ? "bg-primary text-white" : "bg-muted text-primary"
                          )}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="block font-bold text-foreground transition-colors group-hover:text-primary">
                            {opt.label}
                          </span>
                          {selections.areas.includes(opt.id) && (
                            <div className="absolute top-4 right-4 h-6 w-6 bg-primary rounded-full flex items-center justify-center animate-in zoom-in">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}

                {currentStep === 1 && (
                   <div className="space-y-4">
                    {steps[1].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelections(prev => ({ ...prev, goal: opt.id }))}
                        className={cn(
                          "w-full group relative p-6 rounded-3xl border-2 text-left transition-all duration-500",
                          selections.goal === opt.id
                            ? "bg-primary/5 border-primary shadow-lg"
                            : "bg-background border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                           <div>
                              <span className="block font-bold text-foreground text-lg mb-1">{opt.label}</span>
                              <p className="text-sm text-muted-foreground">{(opt as any).description}</p>
                           </div>
                           {selections.goal === opt.id && (
                              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center animate-in zoom-in">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                           )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-16 flex items-center justify-between">
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Go Back
                    </button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === 0 ? selections.areas.length === 0 : !selections.goal}
                    size="lg"
                    className="ml-auto h-16 rounded-full px-10 text-lg font-bold group/btn"
                  >
                    <span className="flex items-center gap-2">
                       {currentStep === steps.length - 1 ? "Get My Plan" : "Continue"}
                       <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
