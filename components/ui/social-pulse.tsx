"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Calendar, Sparkles, TrendingUp } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "booking",
    text: "New booking in Beverly Hills",
    subtext: "Just now",
    icon: Calendar,
  },
  {
    id: 2,
    type: "waitlist",
    text: "Only 3 slots remaining",
    subtext: "For next week",
    icon: TrendingUp,
  },
  {
    id: 3,
    type: "activity",
    text: "5 people viewing Jawline Contouring",
    subtext: "Currently",
    icon: Users,
  },
  {
    id: 4,
    type: "booking",
    text: "Radiance Plan started",
    subtext: "15 minutes ago",
    icon: Sparkles,
  },
]

export function SocialPulse() {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Initial delay before showing the first notification
    const initialTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length)
        setIsVisible(true)
      }, 1000)
    }, 20000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const activity = activities[currentActivity]

  return (
    <div className="fixed bottom-8 left-8 z-[60] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.6
            }}
            className="pointer-events-auto"
          >
            <div className="relative overflow-hidden rounded-2xl bg-card p-4 pr-10 luxury-shadow border border-border group">
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 opacity-50" />
              
              <div className="relative flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <activity.icon className="h-5 w-5" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-foreground">
                    {activity.text}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                    {activity.subtext}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 19, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[2px] bg-primary/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
