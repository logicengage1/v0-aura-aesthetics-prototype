"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type BookingStep = 1 | 2 | 3

export type TreatmentArea =
  | "forehead"
  | "crows-feet"
  | "frown-lines"
  | "bunny-lines"
  | "lip-flip"
  | "neck-bands"

export type BookingSource = "assessment" | "direct" | null

export interface BookingState {
  currentStep: BookingStep
  selectedTreatments: TreatmentArea[]
  source: BookingSource
}

interface BookingContextType extends BookingState {
  setStep: (step: BookingStep) => void
  toggleTreatment: (treatment: TreatmentArea) => void
  setSource: (source: BookingSource) => void
  resetBooking: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isAssessmentOpen: boolean
  setIsAssessmentOpen: (open: boolean) => void
}

const initialState: BookingState = {
  currentStep: 1,
  selectedTreatments: [],
  source: null,
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState)
  const [isOpen, setIsOpen] = useState(false)
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)

  const setStep = (step: BookingStep) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }

  const toggleTreatment = (treatment: TreatmentArea) => {
    setState((prev) => ({
      ...prev,
      selectedTreatments: prev.selectedTreatments.includes(treatment)
        ? prev.selectedTreatments.filter((t) => t !== treatment)
        : [...prev.selectedTreatments, treatment],
    }))
  }

  const setSource = (source: BookingSource) => {
    setState((prev) => ({ ...prev, source }))
  }

  const resetBooking = () => {
    setState(initialState)
    setIsOpen(false)
    setIsAssessmentOpen(false)
  }

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setStep,
        toggleTreatment,
        setSource,
        resetBooking,
        isOpen,
        setIsOpen,
        isAssessmentOpen,
        setIsAssessmentOpen,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
