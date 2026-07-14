# Implementation Plan: Strip Pricing Cards to Hover-Lift + Icon Effect Only

Status: **PLANNING — not yet approved.** No code will be touched until you confirm.

Scope: the two pricing cards in [`components/sections/pricing.tsx`](components/sections/pricing.tsx) (Standard Experience + Aura Insider). Nothing else on the page.

**Your intent:** keep only (a) a slight "pop"/lift when hovering a card, and (b) the existing hover effect on the top-left icon. Remove every other effect, shadow, and glow on the cards.

---

## Inventory of every effect currently on the pricing cards

| # | Effect | Where | Decision |
|---|--------|-------|----------|
| 1 | `luxury-shadow` box-shadow (soft drop shadow) | card wrapper, both cards (`pricing.tsx:141`) | **REMOVE** |
| 2 | `hover:-translate-y-2` — the lift/"pop" on hover | card wrapper, light card only (`:144`) | **KEEP** — and extend it to the dark card too, so both pop |
| 3 | `hover:shadow-2xl` — extra shadow on hover | card wrapper, light card only (`:144`) | **REMOVE** |
| 4 | `group-hover:scale-110` on the top-left icon | icon (`:162`) | **KEEP** (this is the icon effect you want) |
| 5 | `rotate-3` / `-rotate-3` — static tilt of the icon | icon (`:163`) | **KEEP** (part of the icon's look) |
| 6 | Feature rows `hover:translate-x-2` — each line slides right on hover | feature `<li>` (`:215`) | **REMOVE** (extra hover effect) |
| 7 | CTA button shimmer sweep (`via-white/10` gradient that animates across on hover) | button (`:242`) | **REMOVE** (a glow effect) |
| 8 | CTA button `luxury-shadow` | button (`:235`) | **REMOVE** (a shadow) |
| 9 | "Most Popular" badge `shadow-xl` | badge (`:151`) | **REMOVE** (a shadow) |

---

## Three items that are a judgment call — my recommendation, but tell me if you disagree

| # | Effect | What it does | My recommendation |
|---|--------|--------------|-------------------|
| A | `scale-105` on the Aura Insider card (`:143`) | Makes the featured card **permanently ~5% bigger** than the other — always on, not a hover thing | **Recommend REMOVE** so both cards are the same size and only "pop" on hover. (If you like the featured card standing out bigger, say keep.) |
| B | `animate-on-scroll` (`:141`) | The card **fades/slides in once** as you scroll it into view (entrance animation, same as every other section on the site) | **Recommend KEEP** — it's a one-time entrance, not a shadow/glow, and matches the rest of the page. (Say remove if you want the cards to just appear instantly.) |
| C | Price number `scale-105 text-primary` (`:180`) | The big price briefly enlarges + turns green **when you flip the Single-Visit / Member-Rate or ROI toggle** — feedback for that toggle, not a card hover effect | **Recommend KEEP** — it's functional feedback for the pricing toggle, unrelated to the card glow. (Say remove if you want the price static.) |

---

## CTA buttons — add a subtle premium hover (new, per your request)

You asked for a slight glow-up **or** pop on each card's CTA button, my call on which reads more premium.

**My choice: a "pop," not a glow.** For a quiet-luxury aesthetic, a soft ambient glow tends to read as flashy/tech-y, whereas a small, well-eased lift feels tactile and refined — the button gently rising to meet the cursor. Concretely:

- On hover: `translateY(-2px)` lift **+** a very subtle `scale(1.02)`, on a smooth ~300ms luxury ease.
- Paired with a **soft, tasteful shadow that appears only on hover** (e.g. `0 12px 24px -12px` at low opacity, tinted to the button's own color) so the lift has depth — this is a *hover-only* micro-shadow, not the always-on `luxury-shadow` glow we're removing from the cards.
- No color/brightness flash, no halo, no shimmer.

This replaces removals #7 and #8: the button loses the shimmer sweep and its always-on shadow, and gains this restrained hover-pop instead. Applies to **both** cards' CTAs.

---

## What the card will do after this (assuming my recommendations)

- Rest state: flat card, no shadow, no glow, no size difference between the two.
- Hover a card: it lifts slightly (the "pop") and its top-left icon scales up — nothing else.
- Hover a CTA button: it gently lifts + subtly scales with a soft hover-only shadow (the premium "pop").
- Badge: flat, no shadow.

## Implementation notes (so nothing breaks)

- `luxury-shadow` is a **shared utility class** used elsewhere on the page (the pricing toggle pill, the bottom info bar, other sections). I will only remove the `luxury-shadow` **class name from the two card wrappers and the CTA button** — I will **not** delete the class from `globals.css`, so everything else keeps its shadow.
- Removing #7 also lets me delete the now-unused shimmer `<div>` and the `overflow-hidden`/`group/btn` plumbing that only existed to support it.

---

## ✅ Proposed checklist

- [ ] Remove `luxury-shadow` from both card wrappers (#1)
- [ ] Extend the hover-lift to the dark card so both "pop" equally; keep `hover:-translate-y-2` (#2)
- [ ] Remove `hover:shadow-2xl` (#3)
- [ ] Keep icon `group-hover:scale-110` + tilt (#4, #5) — no change
- [ ] Remove feature-row `hover:translate-x-2` (#6)
- [ ] Remove CTA shimmer sweep div + its `overflow-hidden`/`group/btn` plumbing (#7)
- [ ] Remove CTA button always-on `luxury-shadow` (#8)
- [ ] Add subtle premium hover-pop to both CTA buttons (lift + slight scale + soft hover-only shadow)
- [ ] Remove badge `shadow-xl` (#9)
- [ ] (Per your answers) A: remove featured `scale-105`? · B: keep scroll reveal? · C: keep price-toggle emphasis?
- [ ] Verify on the dev server (hard refresh), confirm only card-lift + icon-hover remain

---

## ❓ Before I implement, confirm the three judgment calls

- **A — featured card size:** remove the permanent `scale-105` so both cards match (recommended), or keep it bigger?
- **B — scroll-in entrance:** keep the fade/slide-in (recommended), or remove it too?
- **C — price toggle emphasis:** keep the price enlarging/greening when you flip the toggle (recommended), or make it static?

> Reply with your answers (or just "confirm" to accept all three recommendations) and I'll implement.
