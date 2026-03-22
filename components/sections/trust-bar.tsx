import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function TrustBar() {
  const publications = [
    { name: "VOGUE", width: "w-20" },
    { name: "BAZAAR", width: "w-24" },
    { name: "ELLE", width: "w-16" },
    { name: "ALLURE", width: "w-20" },
    { name: "VANITY FAIR", width: "w-32" },
    { name: "GQ", width: "w-12" },
    { name: "WWD", width: "w-16" },
  ]
  useScrollReveal()

  return (
    <section
      id="trust"
      className="border-y border-white/20 bg-card/30 glass py-12 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="animate-on-scroll">
          <p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
            Endorsed by the Industry&apos;s Finest
          </p>
        </div>
        
        {/* Infinite Marquee Container */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-16 md:gap-32 whitespace-nowrap py-4">
            {[...publications, ...publications].map((pub, index) => (
              <div
                key={`${pub.name}-${index}`}
                className="text-center font-serif text-2xl font-serif font-medium tracking-[0.2em] text-foreground/40 transition-all duration-500 hover:text-primary hover:scale-110 cursor-default select-none group relative"
              >
                {pub.name}
                <div className="absolute -inset-2 bg-primary/5 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
