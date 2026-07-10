"use client"

import dynamic from "next/dynamic"
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
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar"
import { SocialPulse } from "@/components/ui/social-pulse"
import { BackToTop } from "@/components/navigation/back-to-top"

// Below-the-fold / interaction-only pieces: code-split out of the initial
// bundle and rendered client-side so they don't weigh down first paint.
const TransformationTimeline = dynamic(
  () => import("@/components/sections/transformation-timeline").then((m) => m.TransformationTimeline),
  { ssr: false, loading: () => <div className="min-h-screen" aria-hidden /> },
)
const BookingModal = dynamic(
  () => import("@/components/booking/booking-modal").then((m) => m.BookingModal),
  { ssr: false },
)
const AuraAssessment = dynamic(
  () => import("@/components/booking/aura-assessment").then((m) => m.AuraAssessment),
  { ssr: false },
)
const ChatWidget = dynamic(
  () => import("@/components/ui/chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
)

export default function Home() {
  return (
    <BookingProvider>
      <div className="min-h-screen relative">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <ResultsGallery />
          <TransformationTimeline />
          <Benefits />
          <Process />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Newsletter />
        </main>
        <Footer />
        <StickyBookingBar />
        <BookingModal />
        <AuraAssessment />
        <BackToTop />
        <SocialPulse />
        <ChatWidget />
      </div>
    </BookingProvider>
  )
}
