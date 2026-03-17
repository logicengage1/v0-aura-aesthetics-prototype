"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  return (
    <section id="faq" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Section Header */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Questions & Answers
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
              <span className="text-balance">Everything You Need to Know</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We believe in complete transparency. Here are answers to our most frequently asked questions.
            </p>
            <div className="mt-8 rounded-2xl bg-background p-6">
              <p className="text-sm text-muted-foreground">
                Have a question we haven&apos;t answered?
              </p>
              <p className="mt-2 font-medium text-foreground">
                Call us at{" "}
                <a href="tel:+13105551234" className="text-primary hover:underline">
                  (310) 555-1234
                </a>
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="py-5 text-left font-serif text-lg font-medium text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
