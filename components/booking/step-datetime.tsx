"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

const CALENDLY_URL = "https://calendly.com/aura-aesthetics/booking"

// Off-screen (but still PAINTED) position used while Step 2 is inactive.
// Critical: we must NOT use `display:none` — browsers refuse to load/boot an
// iframe inside a display:none subtree, which would defeat the whole point of
// pre-mounting. Positioning it off-screen keeps it in the render tree so the
// Calendly SPA fully loads while the user is still on Step 1.
const OFFSCREEN_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: -1,
  opacity: 0.01,
  pointerEvents: "none",
}

export function StepDateTime({ active }: { active: boolean }) {
  const { setStep, source, selectedTreatments } = useBooking()
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Calendly embed styling params (hex, no #) to match the site's palette.
  // embed_domain is required for Calendly to postMessage scheduling events to the parent.
  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      background_color: "fdfbf7",
      text_color: "2c2c2c",
      primary_color: "98a993",
      hide_gdpr_banner: "1",
      embed_domain: window.location.hostname,
      embed_type: "Inline",
    })

    if (source === "assessment") {
      params.append("utm_source", "aura_assessment")
    } else {
      params.append("utm_source", "website_direct")
    }

    // Intentionally omitting selectedTreatments prefill so the URL is 100% static on mount
    return `${CALENDLY_URL}?${params.toString()}`
  }, [source])

  useEffect(() => {
    function handleCalendlyMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return
      if (e.data?.event === "calendly.event_scheduled") {
        setStep(3)
      }
    }
    window.addEventListener("message", handleCalendlyMessage)
    return () => window.removeEventListener("message", handleCalendlyMessage)
  }, [setStep])

  return (
    <div className="flex flex-col" style={active ? undefined : OFFSCREEN_STYLE} aria-hidden={!active}>
      <p className="mb-3 text-sm font-medium text-foreground">Pick a time that works for you</p>
      <div className="relative overflow-hidden rounded-2xl border border-border" style={{ height: 480 }}>
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <CalendarDays className="h-7 w-7 animate-pulse text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Preparing your calendar…</p>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-border">
              <div className="h-full w-1/3 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-primary/60" />
            </div>
          </div>
        )}
        <iframe
          src={embedUrl}
          title="Schedule your appointment"
          onLoad={() => setIframeLoaded(true)}
          style={{
             // Hack: Try to shift Calendly's default blue to something resembling our Sage Green
             // Note: if the user upgrades to Calendly Pro, this filter will shift our ALREADY CORRECT hex codes, 
             // so they should remove this style block once upgraded.
             filter: "hue-rotate(220deg) saturate(0.6) brightness(1.05)",
          }}
          className={cn("h-full w-full border-0 transition-opacity duration-500", iframeLoaded ? "opacity-100" : "opacity-0")}
        />
      </div>

      {/* Navigation */}
      <div className="mt-6 flex gap-3">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="h-12 flex-1 rounded-full border-foreground/20 text-base font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </div>
    </div>
  )
}
