"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Phone, MessageSquare, Sparkles } from "lucide-react"

const faqs = [
  {
    question: "What is Botox and how does it work?",
    answer: "Botox is an FDA-approved injectable that temporarily relaxes facial muscles to smooth fine lines and wrinkles. It works by blocking nerve signals to targeted muscles, preventing them from contracting and creating wrinkles. Results are subtle and natural-looking when administered by our skilled practitioners.",
  },
  {
    question: "Does Botox hurt?",
    answer: "Most clients describe the sensation as a small pinch or mosquito bite. We use ultra-fine needles and can apply topical numbing cream if desired. The entire treatment takes only 15-20 minutes, and any discomfort is brief and minimal.",
  },
  {
    question: "How long do results last?",
    answer: "Results typically last 3-4 months for first-time clients. With regular treatments, many clients find their results lasting longer as the muscles become trained. We recommend scheduling maintenance treatments every 3-4 months for optimal results.",
  },
  {
    question: "When will I see results?",
    answer: "Initial results begin to appear within 3-5 days, with full results visible at 14 days. We schedule a complimentary follow-up at 2 weeks to assess your results and make any necessary touch-ups included in your treatment price.",
  },
  {
    question: "Are there any side effects?",
    answer: "Side effects are rare and typically mild when administered by experienced professionals. Some clients experience minor redness or slight bruising at injection sites, which resolves within a day or two. We provide detailed aftercare instructions to minimize any potential side effects.",
  },
  {
    question: "Who is a good candidate for Botox?",
    answer: "Most adults aged 18 and older who want to reduce the appearance of fine lines and wrinkles are good candidates. During your complimentary consultation, we'll assess your facial anatomy, discuss your goals, and determine if Botox is right for you. Pregnant or nursing women should postpone treatment.",
  },
]

export function FAQ() {
  useScrollReveal()

  return (
    <section id="faq" className="bg-card py-24 lg:py-40 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-32">
          {/* Section Header */}
          <div>
            <div className="animate-on-scroll">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
                Informed Choices
              </p>
            </div>
            <div className="animate-on-scroll [transition-delay:100ms]">
              <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="text-balance">Knowledge is Beautiful</span>
              </h2>
            </div>
            <div className="animate-on-scroll [transition-delay:200ms]">
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We believe in complete transparency. Our practitioners are here to guide you through every choice.
              </p>
            </div>

            <div className="animate-on-scroll mt-12 rounded-[2rem] bg-background/50 glass p-8 border border-white/40 luxury-shadow [transition-delay:300ms]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Still curious?
              </p>
              <p className="mt-4 text-xl font-serif text-foreground">
                Our specialists are available for immediate consultation.
              </p>
              <a 
                href="tel:+13105551234" 
                className="mt-6 inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                <Phone className="h-4 w-4" />
                (310) 555-1234
              </a>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-10 lg:mt-0">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="animate-on-scroll" 
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border-none bg-background/30 rounded-2xl px-6 transition-all duration-300 hover:bg-background/60 hover:shadow-lg overflow-hidden"
                  >
                    <AccordionTrigger className="py-6 text-left font-serif text-xl font-medium text-foreground hover:text-primary hover:no-underline gap-4">
                      <span className="flex-1">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground leading-relaxed text-base italic pr-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
