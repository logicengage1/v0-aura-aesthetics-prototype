"use client"

import { useState, useEffect } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkle } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Results", href: "#results" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const { setIsOpen } = useBooking()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury",
        isScrolled
          ? "py-3 bg-white/70 glass border-b border-white/40 shadow-xl"
          : "py-6 bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-500 group-hover:rotate-12 group-hover:scale-110",
              isScrolled ? "h-9 w-9" : "h-11 w-11"
            )}>
              <Sparkle className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-serif font-bold tracking-tight transition-all duration-500",
                isScrolled ? "text-xl text-foreground" : "text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              )}>
                Aura
              </span>
              {!isScrolled && (
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent drop-shadow-sm animate-fade-in">
                  Aesthetics & Wellness
                </span>
              )}
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  isScrolled 
                    ? "text-foreground/70 hover:text-foreground" 
                    : "text-white/90 hover:text-white drop-shadow-sm"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1.5 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
                  isScrolled ? "bg-primary" : "bg-accent"
                )} />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsOpen(true)}
              className={cn(
                "hidden rounded-full font-bold transition-all hover:scale-105 active:scale-95 group overflow-hidden sm:inline-flex",
                isScrolled 
                  ? "bg-primary h-10 px-6 text-xs text-primary-foreground" 
                  : "bg-white text-black h-12 px-8 text-sm hover:bg-accent hover:text-white"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isScrolled ? "Book Now" : "Schedule Session"}
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
            </Button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-all lg:hidden",
                isMobileMenuOpen 
                  ? "bg-foreground border-foreground text-background rotate-90" 
                  : isScrolled 
                    ? "bg-background border-border text-foreground"
                    : "bg-white/10 border-white/30 text-white backdrop-blur-md"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-0 -z-10 h-screen w-full bg-background/95 backdrop-blur-2xl transition-all duration-700 ease-luxury lg:hidden",
          isMobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 px-6 pt-20">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-3xl font-serif font-medium text-foreground transition-all duration-500 hover:text-primary hover:tracking-widest",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          
          <div className="mt-12 w-full max-w-xs space-y-6">
            <Button
              onClick={() => {
                setIsOpen(true)
                setIsMobileMenuOpen(false)
              }}
              className="h-16 w-full rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-2xl"
            >
              Book Your Experience
            </Button>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Or call us</p>
              <a href="tel:+13105551234" className="text-2xl font-serif font-medium text-foreground">(310) 555-1234</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
