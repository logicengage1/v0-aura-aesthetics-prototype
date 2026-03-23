"use client"

import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Generate next 14 days
function getNextDays(count: number) {
  const days = []
  const today = new Date()
  
  for (let i = 1; i <= count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip Sundays
    if (date.getDay() === 0) continue
    
    days.push({
      date: date.toISOString().split("T")[0],
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: date.getDate(),
      monthName: date.toLocaleDateString("en-US", { month: "short" }),
    })
  }
  
  return days.slice(0, count)
}

const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
]

export function StepDateTime() {
  const { selectedDate, selectedTime, setSelectedDate, setSelectedTime, setStep } = useBooking()
  
  const days = getNextDays(14)
  const canProceed = selectedDate && selectedTime

  return (
    <div className="flex flex-col">
      {/* Date Selection */}

      {/* Date Selection */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-foreground">Select a Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={cn(
                "flex flex-col items-center rounded-xl border px-4 py-3 transition-all shrink-0",
                selectedDate === day.date
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50"
              )}
            >
              <span className={cn(
                "text-xs",
                selectedDate === day.date ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {day.dayName}
              </span>
              <span className="text-lg font-semibold">{day.dayNumber}</span>
              <span className={cn(
                "text-xs",
                selectedDate === day.date ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {day.monthName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-foreground">Select a Time</p>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={cn(
                "rounded-lg border py-3 text-sm font-medium transition-all",
                selectedTime === time
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
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
          className="h-12 flex-1 rounded-full bg-primary text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
