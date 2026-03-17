export function TrustBar() {
  const publications = [
    { name: "VOGUE", width: "w-20" },
    { name: "BAZAAR", width: "w-24" },
    { name: "ELLE", width: "w-16" },
    { name: "ALLURE", width: "w-20" },
  ]

  return (
    <section
      id="trust"
      className="border-y border-border/50 bg-card py-12"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          As Seen In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {publications.map((pub) => (
            <div
              key={pub.name}
              className={`${pub.width} text-center font-serif text-xl font-medium tracking-wider text-foreground/70 transition-colors hover:text-foreground`}
            >
              {pub.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
