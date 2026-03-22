# Implementation Plan: Hero Section Readability Enhancement

This document outlines the strategy for improving text legibility in the Hero section of the Aura Aesthetics prototype. The goal is to ensure all key messaging is clear and readable over a dynamic video background without compromising the premium luxury aesthetic.

---

## 🎨 Design Strategy
- **Contrast**: Use a sophisticated gradient scrim (overlay) to anchor text against the video.
- **Depth**: Apply multi-layer soft shadows to lift text off the moving background.
- **Isolation**: Use subtle backdrop blurs (glassmorphism) behind content blocks.
- **Refinement**: Adjust font weights and letter spacing for maximum clarity on all devices.

---

## ✅ Implementation Checklist

### 1. Background Contrast Improvements
- [x] Implement a **Dynamic Gradient Scrim** (e.g., `from-black/80 via-black/40 to-transparent`) behind the text content.
- [x] Increase the video's default **brightness reduction** (e.g., `brightness-[0.7]`) to provide a consistent base for light text.
- [x] Add a global **Subtle Backdrop Blur** layer (`backdrop-blur-[1px]`) to the video container to "quiet" high-detail frames.

### 2. Eyebrow Tag ("Beverly Hills Premier Med Spa")
- [x] Increase **Letter Spacing** to `tracking-[0.5em]` and make it `font-bold` for easier visual parsing.
- [x] Add a soft **Drop Shadow** (`drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]`).
- [x] Change text color to a brighter, higher-contrast shade and add a glassmorphism badge.

### 3. Main Headline ("Timeless Beauty...")
- [x] Implement a **Multi-layer Text Shadow** for the serif font to prevent "washout" on light frames.
- [x] Boost the **Gradient Text** brightness level and saturation to ensure it pops on mobile.

### 4. Subheadline ("Experience the art...")
- [x] Increase **Font Weight** to `font-semibold`.
- [x] Add a diffused **Drop Shadow** (`drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]`).
- [x] Adjust **Text Color** to a brighter shade (`text-white/95`) for maximum contrast.

### 5. Call to Action (CTA) & Interaction
- [x] Increase **Button Contrast** relative to the darker background.
- [x] Apply `backdrop-blur-xl` to the secondary button for better separation.

### 6. Trust Indicators
- [x] Increase **Avatar Border Contrast** (e.g., `border-white/50`).
- [x] Ensure the **Star Rating** and stats use high-contrast white/light-gray tones with additional glow effects.

---

## 📈 Roadmap

| Phase | Focus | Complexity |
| :--- | :--- | :--- |
| **I: Contrast** | Scrims, Brightness, Overlays | Low |
| **II: Text Layers** | Shadows, Weights, Spacing | Medium |
| **III: UI Refinement** | Buttons, Trust Badges, Final Polish | Medium |

---

> [!IMPORTANT]
> All changes should use GPU-accelerated properties (`opacity`, `transform`, `filter`) to maintain 60FPS performance on mobile devices.

> [!TIP]
> Test legibility on both high-brightness and low-brightness video frames to ensure consistency.
