"use client"

import { useState, useEffect } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Results", href: "#results" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const { setIsOpen } = useBooking()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
              Aura
            </span>
            <span className="hidden text-sm font-light text-muted-foreground sm:inline">
              Aesthetics & Wellness
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsOpen(true)}
              className="hidden h-10 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 sm:inline-flex"
            >
              Book Now
            </Button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
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
          "fixed inset-x-0 top-20 bg-background/98 backdrop-blur-lg transition-all duration-300 lg:hidden",
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        )}
      >
        <nav className="mx-auto max-w-7xl px-6 py-8">
          {/* Mobile CTA */}
          <Button
            onClick={() => {
              setIsOpen(true)
              setIsMobileMenuOpen(false)
            }}
            className="mb-6 h-14 w-full rounded-full bg-primary text-base font-medium text-primary-foreground"
          >
            Book Now
          </Button>
          
          {/* Mobile Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block rounded-lg py-3 text-lg font-medium text-foreground transition-colors hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">Questions?</p>
            <a
              href="tel:+13105551234"
              className="text-lg font-medium text-foreground hover:text-primary"
            >
              (310) 555-1234
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-[-1] bg-foreground/20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
