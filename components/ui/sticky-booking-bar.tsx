"use client"

import { useState, useEffect } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Sparkle, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function StickyBookingBar() {
  const { setIsOpen } = useBooking()
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show bar after scrolling down 600px
      if (currentScrollY > 600) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Shrink on scroll down, expand on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 700) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-700 ease-luxury",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <div 
        className={cn(
          "glass rounded-full border border-white/40 luxury-shadow flex items-center transition-all duration-500 bg-white/60 px-2 py-2",
          isExpanded ? "gap-6 px-6" : "gap-2 px-2"
        )}
      >
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </div>
          {isExpanded && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 whitespace-nowrap">
              Available Now
            </span>
          )}
        </div>

        {/* Info Items (Desktop Only) */}
        {isExpanded && (
          <div className="hidden lg:flex items-center gap-6 border-l border-border/50 pl-6 mr-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground/80 tracking-tight">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground/80 tracking-tight">VIP Only</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "rounded-full bg-primary font-bold transition-all hover:scale-105 active:scale-95 group overflow-hidden",
            isExpanded ? "px-8 py-6 text-sm" : "h-12 w-12 p-0 flex items-center justify-center"
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isExpanded ? (
              <>
                Reserve Session
                <Sparkle className="h-4 w-4 fill-current group-hover:rotate-12 transition-transform" />
              </>
            ) : (
              <Calendar className="h-5 w-5" />
            )}
          </span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
        </Button>
      </div>
    </div>
  )
}
