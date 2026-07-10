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
    title: "Concern",
    subtitle: "Which areas would you like to refine?",
    options: [
      { id: "forehead", label: "Upper Forehead", icon: Target },
      { id: "frown-lines", label: "Between Brows", icon: Zap },
      { id: "crows-feet", label: "Outer Eyes", icon: Sparkles },
      { id: "jawline", label: "Jawline / Masseter", icon: User },
    ],
  },
  {
    id: "goal",
    title: "Aesthetic Goal",
    subtitle: "How would you describe your ideal result?",
    options: [
      { id: "natural", label: "Subtle Softening", description: "Maintain full expression while softening fine lines." },
      { id: "smooth", label: "Maximum Smoothness", description: "Achieve a sleek, airbrushed finish." },
    ],
  },
  {
    id: "timeline",
    title: "Timeline & Readiness",
    subtitle: "When would you like to see these results?",
    options: [
      { id: "first-time", label: "First-time Explorer", description: "I'm new to Botox and want to learn more about the process." },
      { id: "event", label: "Event-Driven", description: "I have a wedding or event coming up (ideal: 2-4 weeks prior)." },
      { id: "maintenance", label: "Ongoing Maintenance", description: "I'm looking for a regular provider for my 3-4 month refresh." },
    ],
  },
]

export function AuraAssessment() {
  const { isAssessmentOpen, setIsAssessmentOpen, setIsOpen, toggleTreatment, selectedTreatments } = useBooking()
  const [currentStep, setCurrentStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selections, setSelections] = useState<{
    areas: string[]
    goal: string | null
    timeline: string | null
  }>({
    areas: [],
    goal: null,
    timeline: null,
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
      setShowResult(true)
    }
  }

  const handleBookNow = () => {
    // Sync with booking context and open booking modal
    selections.areas.forEach(area => {
      if (!selectedTreatments.includes(area as TreatmentArea)) {
        toggleTreatment(area as TreatmentArea)
      }
    })
    setIsAssessmentOpen(false)
    setIsOpen(true)
  }

  const progress = showResult ? 100 : ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 mb-12">
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
        {/* Progress Bar (Glass) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted/30 z-20">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>

        <button
          onClick={() => setIsAssessmentOpen(false)}
          className="absolute right-6 top-6 z-30 rounded-full bg-muted/50 backdrop-blur-md p-2 text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-12 h-full min-h-[580px]">
          {/* Left Panel: Context */}
          <div className={cn(
            "lg:col-span-4 bg-primary p-10 text-primary-foreground flex flex-col justify-between overflow-hidden relative transition-all duration-500",
            showResult && "lg:col-span-3 lg:p-8"
          )}>
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 group cursor-default">
                 <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5 text-accent" />
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/80">Aura Assessment</span>
              </div>
              <h2 className="font-serif text-3xl font-medium leading-[1.15] mb-6">
                Your Journey <br/>to Personalized <br/><span className="text-accent italic">Radiance</span>
              </h2>
              <p className="text-white/70 leading-relaxed font-medium text-base">
                 Define your aesthetic goals and let us curate your perfect treatment protocol. 
              </p>
            </div>

            {!showResult && (
              <div className="relative z-10 space-y-5">
                {steps.map((s, idx) => (
                  <div key={s.id} className="flex items-center gap-4">
                     <div className={cn(
                       "h-8 w-8 rounded-xl border-2 flex items-center justify-center text-xs font-bold transition-all duration-700",
                       idx <= currentStep 
                         ? "bg-white text-primary border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                         : "border-white/10 text-white/30"
                     )}>
                       {idx + 1}
                     </div>
                     <div className="flex flex-col">
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-[0.2em]",
                          idx <= currentStep ? "text-accent" : "text-white/20"
                        )}>
                          Phase {idx + 1}
                        </span>
                        <span className={cn(
                          "text-xs font-bold tracking-wide",
                          idx <= currentStep ? "text-white" : "text-white/30"
                        )}>
                          {s.title}
                        </span>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Interactive Selection */}
          <div className={cn(
            "lg:col-span-8 p-10 lg:p-14 flex flex-col justify-center bg-card/50",
            showResult && "lg:col-span-9 lg:p-20"
          )}>
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 25
                  }}
                  className="w-full max-w-xl mx-auto"
                >
                  <div className="mb-10">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-3">
                       Selection {currentStep + 1} of {steps.length}
                     </h3>
                     <h2 className="font-serif text-3xl font-medium text-foreground tracking-tight mb-5">
                       {steps[currentStep].subtitle}
                     </h2>
                     <div className="h-1 w-16 bg-primary/20 rounded-full" />
                  </div>

                  {/* Step Content */}
                  <div className="min-h-[280px]">
                    {currentStep === 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {steps[0].options.map((opt) => {
                          const Icon = (opt as any).icon
                          const isSelected = selections.areas.includes(opt.id)
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleAreaToggle(opt.id)}
                              className={cn(
                                "group relative p-6 rounded-[1.5rem] border-2 text-left transition-all duration-500",
                                isSelected
                                  ? "bg-primary/5 border-primary shadow-2xl scale-[1.02]"
                                  : "bg-white border-border hover:border-primary/40 hover:scale-[1.01]"
                              )}
                            >
                              <div className={cn(
                                "h-12 w-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-500",
                                isSelected ? "bg-primary text-white rotate-6 shadow-xl" : "bg-muted text-primary group-hover:bg-primary/10"
                              )}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <span className="block font-bold text-base text-foreground transition-colors group-hover:text-primary">
                                {opt.label}
                              </span>
                              {isSelected && (
                                <motion.div 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-5 right-5 h-6 w-6 bg-primary rounded-full flex items-center justify-center"
                                >
                                  <Check className="h-3 w-3 text-white" />
                                </motion.div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {currentStep === 1 && (
                       <div className="space-y-3">
                        {steps[1].options.map((opt) => {
                          const isSelected = selections.goal === opt.id
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelections(prev => ({ ...prev, goal: opt.id }))}
                              className={cn(
                                "w-full group relative p-6 rounded-[1.5rem] border-2 text-left transition-all duration-500",
                                isSelected
                                  ? "bg-primary/5 border-primary shadow-2xl"
                                  : "bg-white border-border hover:border-primary/40"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                 <div className="flex-1">
                                    <span className={cn(
                                      "block font-bold text-lg mb-1 transition-colors",
                                      isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                                    )}>
                                      {opt.label}
                                    </span>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{(opt as any).description}</p>
                                 </div>
                                 <div className={cn(
                                   "ml-5 h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                                   isSelected ? "bg-primary border-primary rotate-0" : "border-border -rotate-45"
                                 )}>
                                   {isSelected && <Check className="h-4 w-4 text-white" />}
                                 </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-3">
                        {steps[2].options.map((opt) => {
                          const isSelected = selections.timeline === opt.id
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelections(prev => ({ ...prev, timeline: opt.id }))}
                              className={cn(
                                "w-full group relative p-6 rounded-[1.5rem] border-2 text-left transition-all duration-500",
                                isSelected
                                  ? "bg-primary/5 border-primary shadow-2xl"
                                  : "bg-white border-border hover:border-primary/40"
                              )}
                            >
                               <div className="flex items-center justify-between">
                                 <div className="flex-1">
                                    <span className={cn(
                                      "block font-bold text-lg mb-1 transition-colors",
                                      isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                                    )}>
                                      {opt.label}
                                    </span>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{(opt as any).description}</p>
                                 </div>
                                 <div className={cn(
                                   "ml-5 p-2 rounded-xl transition-all duration-500",
                                   isSelected ? "bg-primary/10 text-primary" : "text-muted-foreground/30"
                                 )}>
                                    <ArrowRight className="h-5 w-5" />
                                 </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-14 flex items-center justify-between pt-6 border-t border-border/50">
                    {currentStep > 0 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
                      >
                        <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    
                    <div className="flex items-center gap-6">
                      <div className="flex gap-1.5">
                         {steps.map((_, i) => (
                           <div 
                             key={i} 
                             className={cn(
                               "h-1 rounded-full transition-all duration-500",
                               i === currentStep ? "w-6 bg-primary" : "w-1 bg-border"
                             )} 
                           />
                         ))}
                      </div>
                      
                      <Button
                        onClick={handleNext}
                        disabled={
                          (currentStep === 0 && selections.areas.length === 0) ||
                          (currentStep === 1 && !selections.goal) ||
                          (currentStep === 2 && !selections.timeline)
                        }
                        size="lg"
                        className="h-14 rounded-full px-6 sm:px-10 text-sm sm:text-base font-bold group/btn shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.4)]"
                      >
                        <span className="flex items-center gap-3">
                           {currentStep === steps.length - 1 ? "Calculate Aura Path" : "Next Step"}
                           <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="w-full max-w-2xl mx-auto text-center"
                >
                  <div className="mb-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Sparkles className="h-10 w-10 animate-pulse" />
                  </div>
                  
                  <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-accent mb-4">
                    Assessment Complete
                  </h3>
                  <h2 className="font-serif text-4xl lg:text-5xl font-medium text-foreground tracking-tight mb-8">
                    Your Aura Path <br/>is Ready
                  </h2>
                  
                  <div className="bg-white rounded-[2.5rem] border border-border/50 p-8 lg:p-10 mb-12 luxury-shadow">
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {selections.areas.map(areaId => {
                        const area = steps[0].options.find(o => o.id === areaId)
                        return (
                          <span key={areaId} className="px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            {area?.label}
                          </span>
                        )
                      })}
                    </div>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      Based on your {selections.goal === 'natural' ? 'natural' : 'smooth'} aesthetic preference, we recommend a 
                      <span className="text-foreground font-bold"> Precision Micro-Dosing protocol</span> tailored for your focus areas. 
                      {selections.timeline === 'event' && " Given your upcoming event, we'll schedule your session to ensure perfect settling time."}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left border-t border-border/30 pt-8">
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Recommended Professional</p>
                          <p className="text-foreground font-serif text-lg">Aura Signature specialist</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Estimated Duration</p>
                          <p className="text-foreground font-serif text-lg">30-45 Minute Session</p>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                      onClick={() => setShowResult(false)}
                      className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all order-2 sm:order-1"
                    >
                      Start Over
                    </button>
                    <Button
                      onClick={handleBookNow}
                      size="lg"
                      className="h-16 rounded-full px-8 sm:px-16 text-base sm:text-lg font-bold group/btn shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.4)] order-1 sm:order-2"
                    >
                      <span className="flex items-center gap-3">
                        Book Your Session
                        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
