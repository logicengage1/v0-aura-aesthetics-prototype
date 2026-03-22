# Implementation Plan: Refinement, Trust & Polish

This document outlines the strategy for the next phase of the Aura Aesthetics prototype. The focus is on tactile luxury, seamless UX, and psychologically-driven conversion triggers.

---

## 🏗️ Phase I: Fluid Navigation & Visual Consistency
*Goal: Remove friction and ensure a "White Glove" first impression.*

### 1. Header & Navigation Legibility
- [ ] Implement a dynamic glassmorphism background for the `Header`.
- [ ] Adjust menu item colors to ensure high contrast against the `Hero` video.
- [ ] Add a "Go to Top" floating button with a spring-loaded entrance after 800px scroll.

### 2. Social Pulse (Adaptive Theme)
- [ ] Add a `dark-background` detection to the `SocialPulse` component.
- [ ] Implementation: Switch to "Pearl White" glass when on the `Hero` or `Footer`.
- [ ] Switch to "Sage/Gold" glass when on the `Results` or `Anatomy` sections.

### 3. Testimonial Calibration
- [ ] Audit the `Testimonials` data to ensure name/avatar gender consistency.
- [ ] Standardize avatar photo styles (Editorial/High-fashion look).

---

## 🚀 Phase II: High-Intent Conversion Triggers
*Goal: Turn passive browsing into active commitment.*

### 4. The "Latte" ROI Pricing
- [ ] Update `Pricing` component to explicitly frame costs relative to lifestyle.
- [ ] Add a "Daily Investment" micro-copy: "The cost of your morning latte, invested in your confidence."
- [ ] Add symbolic icons (Coffee, Martini, etc.) next to the daily ROI price.

### 5. Aura Assessment (The 3-Step Loop)
- [ ] Refactor `AuraAssessment` into a strict 3-question flow:
    - **Step 1: Concern** (What part of your face feels 'tired'?)
    - **Step 2: Vibe** (Subtle Softening vs. Airbrushed Perfect?)
    - **Step 3: Timeline** (Special event coming up or long-term maintenance?)
- [ ] Final Step: "Your Curated Aura Plan" with a direct link to book.

### 6. Modal UX (Fluid Containers)
- [ ] Refactor `BookingModal` step containers to use `max-h-[90vh]` and responsive flexbox.
- [ ] Ensure step 2 (DateTime selection) is fully visible without a scrollbar on standard laptop/tablet screens.

---

## 💎 Phase III: High-Fidelity "Medical Artistry"
*Goal: Use realism to cement deep user trust.*

### 7. Storyboard: The Macro-Skin Series
- [ ] Replace the abstract SVG lines with high-resolution macro-skin textures.
- [ ] Use `framer-motion` to create a "Skin Softening" transition from Day 0 to Day 14.
- [ ] Close-up focus: Forehead/Brows or Crow's Feet.

### 8. Anatomy: The editorial Face
- [ ] Replace the facial sketch with a high-end editorial model portrait.
- [ ] Design custom glowing SVG overlays that track the muscular structure on the photo.
- [ ] Interactive hotspots: Focus on "Scientific Perfection" through anatomical realism.

---

## ✅ Implementation Roadmap

| Priority | Feature | Category |
| :--- | :--- | :--- |
| **P0 (Immediate)** | Testimonial Fix & Header Legibility | Consistency |
| **P1 (High)** | Aura Assessment (3-Step) & ROI "Latte" | Conversion |
| **P2 (Polish)** | Macro-Skin Storyboard & Real Face Anatomy | Authority |
| **P3 (Utility)** | Go to Top & Modal Refactor | UX/Accessibility |

---

> [!IMPORTANT]
> **Luxury Check**: Every transition between "ROI Mode" and "Standard Mode" in pricing must have a 500ms ease-in-out duration to feel expensive, not snappy.
