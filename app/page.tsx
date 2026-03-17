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

export default function Home() {
  return (
    <BookingProvider>
      <div className="min-h-screen">
        {/* Navigation */}
        <Header />

        {/* Main Content */}
        <main>
          <Hero />
          <TrustBar />
          <ResultsGallery />
          <Benefits />
          <Process />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Booking Modal */}
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
