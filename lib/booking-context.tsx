"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type BookingStep = 1 | 2 | 3 | "success"

export type TreatmentArea = 
  | "forehead"
  | "crows-feet"
  | "frown-lines"
  | "bunny-lines"
  | "lip-flip"
  | "neck-bands"

export interface ContactInfo {
  name: string
  email: string
  phone: string
}

export interface BookingState {
  currentStep: BookingStep
  selectedTreatments: TreatmentArea[]
  selectedDate: string | null
  selectedTime: string | null
  contactInfo: ContactInfo
  consentChecked: boolean
  isSubmitting: boolean
}

interface BookingContextType extends BookingState {
  setStep: (step: BookingStep) => void
  toggleTreatment: (treatment: TreatmentArea) => void
  setSelectedDate: (date: string | null) => void
  setSelectedTime: (time: string | null) => void
  updateContactInfo: (info: Partial<ContactInfo>) => void
  setConsentChecked: (checked: boolean) => void
  submitBooking: () => Promise<void>
  resetBooking: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isAssessmentOpen: boolean
  setIsAssessmentOpen: (open: boolean) => void
}

const initialState: BookingState = {
  currentStep: 1,
  selectedTreatments: [],
  selectedDate: null,
  selectedTime: null,
  contactInfo: {
    name: "",
    email: "",
    phone: "",
  },
  consentChecked: false,
  isSubmitting: false,
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

  const setSelectedDate = (date: string | null) => {
    setState((prev) => ({ ...prev, selectedDate: date }))
  }

  const setSelectedTime = (time: string | null) => {
    setState((prev) => ({ ...prev, selectedTime: time }))
  }

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    setState((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...info },
    }))
  }

  const setConsentChecked = (checked: boolean) => {
    setState((prev) => ({ ...prev, consentChecked: checked }))
  }

  const submitBooking = async () => {
    setState((prev) => ({ ...prev, isSubmitting: true }))
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setState((prev) => ({ ...prev, isSubmitting: false, currentStep: "success" }))
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
        setSelectedDate,
        setSelectedTime,
        updateContactInfo,
        setConsentChecked,
        submitBooking,
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
