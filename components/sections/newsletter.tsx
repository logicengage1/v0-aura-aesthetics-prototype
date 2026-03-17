"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setStatus("success")
  }

  return (
    <section id="newsletter" className="bg-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Section Header */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Exclusive Offer</span>
          </div>
          
          <h2 className="font-serif text-3xl font-medium tracking-tight text-background sm:text-4xl md:text-5xl">
            <span className="text-balance">Join the Inner Circle</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-background/70">
            Subscribe for exclusive access to member-only events, early booking, 
            and a $50 credit toward your first treatment.
          </p>

          {/* Form */}
          <div className="mt-10">
            {status === "success" ? (
              <div className="rounded-2xl bg-primary/20 p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <Check className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-medium text-background">
                  Welcome to the Inner Circle
                </h3>
                <p className="mt-2 text-background/70">
                  Check your inbox for your $50 credit and exclusive member benefits.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === "error") setStatus("idle")
                      }}
                      className={cn(
                        "h-14 rounded-full border-background/20 bg-background/10 px-6 text-background placeholder:text-background/50 focus:border-primary focus:ring-primary",
                        status === "error" && "border-destructive"
                      )}
                      disabled={status === "loading"}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      "Joining..."
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
                {status === "error" && (
                  <p className="mt-3 text-sm text-destructive" role="alert" aria-live="polite">
                    {errorMessage}
                  </p>
                )}
                <p className="mt-4 text-xs text-background/50">
                  By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
