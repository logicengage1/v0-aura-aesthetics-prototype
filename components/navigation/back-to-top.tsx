"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled down more than 50% of the viewport height
      // or specifically after the hero section (roughly 800px)
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(212,175,55,0.3)" 
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-24 right-6 z-50",
            "h-12 w-12 rounded-full",
            "bg-white/10 backdrop-blur-md border border-accent/30",
            "flex items-center justify-center text-accent",
            "transition-colors duration-300 hover:bg-white/20 hover:border-accent/50",
            "luxury-shadow cursor-pointer group"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          
          {/* Magnetic Aura effect */}
          <div className="absolute inset-0 rounded-full border border-accent/10 animate-pulse-slow" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
