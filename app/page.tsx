"use client"

import { BookingProvider } from "@/lib/booking-context"
import { Header } from "@/components/navigation/header"
import { Hero } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { ResultsGallery } from "@/components/sections/results-gallery"
import { Benefits } from "@/components/sections/benefits"
import { Process } from "@/components/sections/process"
import { Pricing } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { Newsletter } from "@/components/sections/newsletter"
import { Footer } from "@/components/sections/footer"
import { BookingModal } from "@/components/booking/booking-modal"
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar"
import { SocialPulse } from "@/components/ui/social-pulse"
import { AnatomyOfArtistry } from "@/components/sections/anatomy-of-artistry"
import { TransformationTimeline } from "@/components/sections/transformation-timeline"
import { AuraAssessment } from "@/components/booking/aura-assessment"

export default function Home() {
  return (
    <BookingProvider>
      <div className="min-h-screen relative">
        {/* Navigation */}
        <Header />

        {/* Main Content */}
        <main>
          <Hero />
          <TrustBar />
          <ResultsGallery />
          <TransformationTimeline />
          <Benefits />
          <AnatomyOfArtistry />
          <Process />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />

        {/* UI Overlays */}
        <StickyBookingBar />
        <BookingModal />
        <SocialPulse />
      </div>
    </BookingProvider>
  )
}
