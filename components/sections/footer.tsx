import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react"

const footerLinks = {
  treatments: [
    { label: "Botox", href: "#results" },
    { label: "Fillers", href: "#" },
    { label: "Skincare", href: "#" },
    { label: "Wellness", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#benefits" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#hero" className="inline-block">
              <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
                Aura
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Beverly Hills&apos; premier destination for natural, refined beauty. 
              Experience the art of subtle enhancement.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Treatments
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.treatments.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Company
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Legal
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Visit Us
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  123 Wellness Way<br />Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="tel:+13105551234"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  (310) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Mon–Sat, 9am–7pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Aura Aesthetics & Wellness. All rights reserved.
            </p>
            <p className="max-w-xl text-xs text-muted-foreground">
              Botox&reg; Cosmetic is a prescription medicine. Results may vary. 
              A medical consultation is required to determine eligibility. 
              Aura Aesthetics & Wellness is a licensed medical facility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
