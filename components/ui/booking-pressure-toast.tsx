"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, BellRing, CalendarCheck } from "lucide-react"

const MESSAGES = [
  { text: "Someone in Beverly Hills just booked a Consultation", icon: BellRing },
  { text: "8 people are currently viewing dates", icon: Users },
  { text: "Only 3 appointments left for next week", icon: CalendarCheck },
  { text: "Someone just booked Jawline Contouring", icon: BellRing },
  { text: "12 people are looking at this treatment right now", icon: Users },
  { text: "Aura Assessment completed by a new client", icon: CalendarCheck }
]

export function BookingPressureToast() {
  const [activeMessage, setActiveMessage] = useState<typeof MESSAGES[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Listen for real bookings globally (can be triggered by Calendly iframe in any modal)
    const handleRealBooking = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return
      if (e.data?.event === "calendly.event_scheduled") {
        setActiveMessage({ text: "🎉 You just secured your session!", icon: CalendarCheck })
        setIsVisible(true)
        setTimeout(() => setIsVisible(false), 5000)
      }
    }
    window.addEventListener("message", handleRealBooking)
    return () => window.removeEventListener("message", handleRealBooking)
  }, [])

  useEffect(() => {
    // Random interval engine
    let timeoutId: NodeJS.Timeout

    const triggerRandomNotification = () => {
      // Pick a random message
      const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
      setActiveMessage(randomMsg)
      setIsVisible(true)

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false)
        // Schedule next one between 15s and 45s
        const nextInterval = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000)
        timeoutId = setTimeout(triggerRandomNotification, nextInterval)
      }, 4000)
    }

    // Initial delay before first popup (e.g. 10 seconds after load)
    timeoutId = setTimeout(triggerRandomNotification, 10000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && activeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[100] flex items-center gap-4 rounded-full bg-card/90 backdrop-blur-xl px-5 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/50 max-w-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <activeMessage.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-snug">
              {activeMessage.text}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
              Just now
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
