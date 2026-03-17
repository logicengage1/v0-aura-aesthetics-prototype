# Aura Aesthetics & Wellness - Implementation Kickstart

## Project Overview

A high-conversion, luxury single-page landing site for a premium Botox clinic in Beverly Hills. The site features a seamless booking experience through a multi-step modal, elegant animations, and a clinical-luxury aesthetic.

---

## Design Token System

### Color Palette (5 Colors Total)

| Token Name | Hex Value | CSS Variable | Usage |
|------------|-----------|--------------|-------|
| Champagne (Primary BG) | `#F5F0E8` | `--background` | Page background, modal backgrounds |
| Soft White | `#FDFBF7` | `--card` | Card backgrounds, alternating sections |
| Sage Green (Accent) | `#98A993` | `--primary` | CTAs, highlights, success states |
| Deep Charcoal | `#2C2C2C` | `--foreground` | Headings, body text |
| Muted Gold | `#C9A96E` | `--accent` | Luxury accents, hover states, icons |

### Typography

| Role | Font Family | Weights | Usage |
|------|-------------|---------|-------|
| Headings | Playfair Display | 400, 500, 600, 700 | H1-H6, hero text, section titles |
| Body | Inter | 300, 400, 500, 600 | Paragraphs, buttons, labels, inputs |

### Spacing Scale (Tailwind Default)

- Section padding: `py-20` to `py-32`
- Component gaps: `gap-4` to `gap-8`
- Container max-width: `max-w-7xl`

### Border Radius

- Buttons: `rounded-full` (pill shape)
- Cards: `rounded-2xl`
- Inputs: `rounded-lg`
- Modal: `rounded-3xl`

---

## Architecture

### Single-Page Structure

```
/ (root)
├── #hero
├── #trust (As Seen In)
├── #results (Before/After Gallery)
├── #benefits (Why Choose Aura)
├── #process (3-Step Process)
├── #pricing
├── #testimonials
├── #faq
├── #newsletter (Inner Circle)
└── #footer
```

### Component Hierarchy

```
app/
├── page.tsx (Main orchestrator)
├── layout.tsx (Metadata, fonts)
├── globals.css (Design tokens)
└── components/
    ├── sections/
    │   ├── hero.tsx
    │   ├── trust-bar.tsx
    │   ├── results-gallery.tsx
    │   ├── benefits.tsx
    │   ├── process.tsx
    │   ├── pricing.tsx
    │   ├── testimonials.tsx
    │   ├── faq.tsx
    │   ├── newsletter.tsx
    │   └── footer.tsx
    ├── booking/
    │   ├── booking-modal.tsx (Dialog wrapper)
    │   ├── step-treatment.tsx (Step 1)
    │   ├── step-datetime.tsx (Step 2)
    │   ├── step-details.tsx (Step 3)
    │   └── step-success.tsx (Confirmation)
    ├── navigation/
    │   ├── header.tsx (Sticky nav)
    │   └── mobile-menu.tsx
    └── ui/
        └── (shadcn components)
```

---

## Feature Specifications

### 1. Multi-Step Booking Modal

**State Management:**
```typescript
type BookingState = {
  currentStep: 1 | 2 | 3 | 'success';
  selectedTreatments: string[];
  selectedDate: string | null;
  selectedTime: string | null;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  consentChecked: boolean;
  isSubmitting: boolean;
};
```

**Step 1 - Treatment Selection:**
- Checkbox grid for areas: Forehead, Crow's Feet, Frown Lines, Bunny Lines, Lip Flip, Neck Bands
- Minimum 1 selection required to proceed

**Step 2 - Date & Time:**
- Calendar placeholder (styled grid showing next 7-14 days)
- Time slots: 9:00 AM, 10:30 AM, 12:00 PM, 2:00 PM, 3:30 PM, 5:00 PM

**Step 3 - Contact Details:**
- Name (required)
- Email (required, real-time validation)
- Phone (required, format validation)
- Consent checkbox (required)

**Success State:**
- 1-second loading simulation
- "Your request has been received. Aura Aesthetics will contact you shortly to finalize your time."

### 2. Newsletter Signup

**Behavior:**
- Email input with validation
- On valid submission: Hide input, show success message
- Success: "Welcome to the Inner Circle. Check your inbox for your $50 credit."

### 3. Testimonials Carousel

**Content:**
1. Elena R.: "I just look like I've had a really great nap. No one knew I had Botox, they just said I looked glowing."
2. James L.: "Professional, clinical environment. The symmetry promise gave me total peace of mind."
3. Sarah M.: "Zero bruising and a completely natural look. I'm officially an Aura Insider."

**Behavior:**
- Auto-rotate: 5-second interval
- Manual: Left/right arrows + dot indicators
- Transition: Smooth horizontal slide

### 4. Mobile Navigation

**Behavior:**
- Sticky header on all viewports
- Hamburger icon morphs to X on open
- Full-screen overlay menu
- "BOOK NOW" CTA at top of menu

---

## Animation Specifications

### CTA Button Pulse

```css
/* Breathing glow effect */
animation: pulse 3s ease-in-out infinite;
transform: scale(1.02);
box-shadow: 0 0 20px rgba(152, 169, 147, 0.4);
```

### Scroll Reveal

- Trigger: 20% viewport entry
- Motion: `y: 20px` to `y: 0`, `opacity: 0` to `1`
- Duration: 0.6s
- Stagger: 0.1s between grid items

### Page Transitions

- Modal: Fade + scale from center
- Step transitions: Horizontal slide
- Success state: Fade in with subtle scale

---

## Content & Data

### Pricing

- Standard: **$14 / Unit**
- Membership: **$12 / Unit** (Aura Insiders annual plan)

### Location

- Address: 123 Wellness Way, Beverly Hills
- Hours: Mon–Sat, 9am–7pm

### Trust Badges (Placeholder Text)

- VOGUE
- BAZAAR
- ELLE
- ALLURE

### Medical Disclaimer

> "Botox® Cosmetic is a prescription medicine. Results may vary. A medical consultation is required to determine eligibility. Aura Aesthetics & Wellness is a licensed medical facility."

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

- [ ] 4.5:1 minimum contrast ratio
- [ ] Semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`)
- [ ] Descriptive `aria-label` on all CTAs
- [ ] Focus trapping in modal
- [ ] Keyboard navigation (Tab, Escape)
- [ ] `useReducedMotion` checks for animations
- [ ] `aria-live="polite"` for form errors
- [ ] Visible labels on all form inputs

### Browser Support

- Chrome (latest)
- Safari (latest + iOS)
- Firefox (latest)
- Edge (latest)
- NO IE11 support

---

## SEO & Metadata

### Meta Tags

```typescript
export const metadata: Metadata = {
  title: 'Aura Aesthetics | Premium Botox in Beverly Hills',
  description: 'Experience natural, refined beauty with our signature Botox treatments.',
};
```

### JSON-LD (LocalBusiness)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aura Aesthetics & Wellness",
  "address": "123 Wellness Way, Beverly Hills",
  "priceRange": "$$",
  "openingHours": "Mo-Sa 09:00-19:00"
}
```

---

## Implementation Phases

### Phase 1: Foundation
1. Configure design tokens in `globals.css`
2. Set up fonts in `layout.tsx`
3. Create base component structure

### Phase 2: Core Sections
4. Build Hero section with CTA
5. Build Trust bar (As Seen In)
6. Build Results gallery (Before/After)
7. Build Benefits section
8. Build Process section
9. Build Pricing section

### Phase 3: Interactive Components
10. Build Testimonials carousel
11. Build FAQ accordion
12. Build Newsletter signup with validation

### Phase 4: Booking System
13. Build Booking Modal container
14. Build Step 1: Treatment Selection
15. Build Step 2: Date/Time Selection
16. Build Step 3: Contact Details + Consent
17. Build Success state

### Phase 5: Navigation & Polish
18. Build sticky Header with mobile menu
19. Build Footer with legal links
20. Add scroll-reveal animations
21. Add CTA pulse animations
22. Final accessibility audit

---

## Dependencies

### Required Packages

```json
{
  "framer-motion": "^11.x",
  "lucide-react": "^0.x",
  "@radix-ui/react-dialog": "^1.x",
  "@radix-ui/react-accordion": "^1.x"
}
```

### Fonts (Google Fonts via next/font)

- Playfair Display
- Inter

---

## File Checklist

- [ ] `app/globals.css` - Design tokens
- [ ] `app/layout.tsx` - Fonts + metadata
- [ ] `app/page.tsx` - Main page
- [ ] `components/sections/hero.tsx`
- [ ] `components/sections/trust-bar.tsx`
- [ ] `components/sections/results-gallery.tsx`
- [ ] `components/sections/benefits.tsx`
- [ ] `components/sections/process.tsx`
- [ ] `components/sections/pricing.tsx`
- [ ] `components/sections/testimonials.tsx`
- [ ] `components/sections/faq.tsx`
- [ ] `components/sections/newsletter.tsx`
- [ ] `components/sections/footer.tsx`
- [ ] `components/navigation/header.tsx`
- [ ] `components/navigation/mobile-menu.tsx`
- [ ] `components/booking/booking-modal.tsx`
- [ ] `components/booking/step-treatment.tsx`
- [ ] `components/booking/step-datetime.tsx`
- [ ] `components/booking/step-details.tsx`
- [ ] `components/booking/step-success.tsx`
- [ ] `lib/booking-context.tsx` - Booking state context

---

## Notes

- All images use `next/image` with Unsplash placeholders
- Newsletter and booking forms are frontend-only simulations
- No external API integrations required
- Single theme (light mode only)
- Desktop-first design (1440px), fully responsive
