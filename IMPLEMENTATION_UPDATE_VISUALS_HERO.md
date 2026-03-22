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
- [ ] Implement a **Dynamic Gradient Scrim** (e.g., `from-black/80 via-black/40 to-transparent`) behind the text content.
- [ ] Increase the video's default **brightness reduction** (e.g., `brightness-[0.7]`) to provide a consistent base for light text.
- [ ] Add a global **Subtle Backdrop Blur** layer (`backdrop-blur-[2px]`) to the video container to "quiet" high-detail frames.

### 2. Eyebrow Tag ("Beverly Hills Premier Med Spa")
- [ ] Increase **Letter Spacing** to `tracking-[0.5em]` and make it `font-bold` for easier visual parsing.
- [ ] Add a soft **Drop Shadow** (`drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`).
- [ ] Change text color to a brighter, higher-contrast shade.

### 3. Main Headline ("Timeless Beauty...")
- [ ] Implement a **Multi-layer Text Shadow** for the serif font to prevent "washout" on light frames.
- [ ] Boost the **Gradient Text** brightness level to ensure it pops on mobile.

### 4. Subheadline ("Experience the art...")
- [ ] Increase **Font Weight** to `font-medium` or `font-semibold`.
- [ ] Add a diffused **Drop Shadow** (`drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]`).
- [ ] Adjust **Text Color** to a brighter shade (`text-white/95`) for maximum contrast.

### 5. Call to Action (CTA) & Interaction
- [ ] Increase **Button Contrast** relative to the darker background.
- [ ] Apply `backdrop-blur-md` to the secondary button for better separation.

### 6. Trust Indicators
- [ ] Increase **Avatar Border Contrast** (e.g., `border-white/30`).
- [ ] Ensure the **Star Rating** and stats use high-contrast white/light-gray tones.

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
