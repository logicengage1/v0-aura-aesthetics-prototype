# Implementation Plan: Final Touch — Calendly Load, Page Performance, Booking Conclusion, Bouncing Badge

Status: **IMPLEMENTED — verified with typecheck + production build. Awaiting user confirmation in browser.**

---

## 1. 🗓 Calendly slow to open inside the booking modal

**What's happening:** the Calendly iframe only starts loading the moment Step 2 mounts — a cold, third-party page load (Calendly's whole app) right when the user is watching. Your screenshot shows the blank grey box it leaves behind while loading. We can't make Calendly's servers faster, but we can hide the wait almost entirely:

- [ ] **Preconnect early** — add `<link rel="preconnect">` hints for `https://calendly.com` and `https://assets.calendly.com` in `app/layout.tsx`, so DNS/TLS handshakes are already done before the iframe ever mounts.
- [ ] **Pre-mount the iframe at Step 1** — when the booking modal opens, render the Calendly iframe immediately but invisibly (kept mounted, `visibility: hidden` off-layout) so it loads in the background while the user is still picking treatments. By the time they reach Step 2, it's typically already rendered. (Kept inside the modal only — not on page load — so the homepage doesn't pay for it.)
- [ ] **Loading skeleton** — while the iframe hasn't fired its `load` event, show a branded shimmer/skeleton with a short line ("Preparing your calendar…") instead of the blank grey void, for the cases where it's still not ready.

## 2. 🐢 General landing-page slowness

Found four concrete, measurable causes in the code (not guesses):

- [ ] **Hero re-renders on every scrolled pixel** — `hero.tsx` stores `scrollY` in React state and updates it on every scroll event for the parallax effect. That re-renders the entire Hero (video, scrim layers, buttons, avatars) potentially 60×/second while scrolling. Fix: drive the parallax by mutating the element's `style.transform` directly via a `ref` + `requestAnimationFrame`, no state/re-render at all. Same class of fix for `sticky-booking-bar.tsx`, which also sets state on every scroll event.
- [ ] **Full-viewport `backdrop-blur` over the hero video** — `hero.tsx` layers a `backdrop-blur-[1px]` div across the entire viewport on top of a playing video; backdrop filters over moving video are among the most expensive things a browser can composite. Fix: remove it (its stated purpose — quieting video detail — is already 90% covered by the `brightness/contrast` filter and the gradient scrim) or replace with a cheap semi-transparent overlay.
- [ ] **Unoptimized images** — `next.config.mjs` has `images.unoptimized: true` and all sections use plain `<img>` tags loading full-size Unsplash/pravatar assets. Fix: add explicit `width`/`height` + `loading="lazy"` + `decoding="async"` to below-the-fold `<img>`s, and request appropriately-sized Unsplash variants (`&w=`) instead of full-res. (Full `next/image` migration is possible but heavier; flagging as optional since the site deploys to Netlify where the built-in loader needs extra setup.)
- [ ] **Hero background video weight** — the Pixabay MP4 is a large file that starts downloading immediately with `autoPlay`. Fix: add `preload="metadata"` and keep the poster image doing the first-paint work, so the video streams in without blocking initial interactivity.

Not causes worth touching: the header/back-to-top scroll listeners (they only flip a boolean past a threshold — cheap), and the framer-motion usage (scoped, event-driven).

## 3. ✅ Conclude the booking inside the modal after Calendly completes

**Current behavior:** when Calendly fires its `event_scheduled` message, the modal advances to Step 3 — which is a "review + consent checkbox + Confirm button" screen. That's asking the user to do more work *after* they've already booked, and nothing celebrates the completed booking. Your instinct is right — the booking is already done at that point.

- [ ] **Make Step 3 the warm conclusion, not a form.** On `calendly.event_scheduled`, advance directly to a celebratory confirmation screen: warm headline ("You're booked — we can't wait to see you ✨"), the treatment areas they selected, the clinic address, and the existing "what happens next" list (Calendly email confirmation, team follow-up, intake forms). One "Done" button closes the modal.
- [ ] **Drop the consent checkbox + fake submit** — the current Step 3's consent gate and simulated 1.5s `submitBooking()` delay no longer guard anything real (Calendly already captured the booking). Remove them and the now-dead `consentChecked`/`isSubmitting` state from `BookingContext`.
- [ ] **Harden the Calendly event listener** — add the `embed_domain` param to the iframe URL (required for Calendly to postMessage reliably from plain iframes) and verify `event.origin` is `https://calendly.com` before trusting the message.
- [ ] **Rename sidebar Step 3** from "Confirm" to "Confirmation" so the progress rail matches the new flow (Treatment → Date & Time → Confirmation).

## 4. 🫨 Bouncing white blob on the pricing section

**Root cause found:** the "Most Popular" badge on the Aura Insider card ([pricing.tsx:156](components/sections/pricing.tsx)) has an **infinite `animate-bounce`** (3s loop) combined with `shadow-xl`. Against the dark Insider card it reads as exactly what you described — a white smear bouncing forever at the top of the card.

- [ ] Remove `animate-bounce [animation-duration:3s]` from the badge. It stays as a static gold "Most Popular" pill (with its star icon and shadow) — attention-grabbing without the perpetual motion.

---

## ✅ Progress checklist

- [x] 1a. Preconnect hints for calendly.com / assets.calendly.com in layout
- [x] 1b. Pre-mount Calendly iframe (hidden) when modal opens at Step 1
- [x] 1c. Loading skeleton until the iframe's `load` event fires
- [x] 2a. Hero parallax → ref + rAF (no per-scroll re-render); same for StickyBookingBar
- [x] 2b. Remove full-viewport backdrop-blur layer over the hero video
- [x] 2c. Lazy-load below-the-fold images (results gallery ×2, transformation timeline ×2)
- [x] 2d. `preload="metadata"` on hero video
- [x] 3a. Step 3 becomes warm booked-confirmation screen (no consent form, no fake submit)
- [x] 3b. Remove dead `consentChecked`/`isSubmitting` from BookingContext (step-success.tsx deleted too)
- [x] 3c. `embed_domain` param + origin check on the Calendly message listener
- [x] 3d. Rename sidebar step label to "Confirmation"
- [x] 4a. Remove infinite bounce from the "Most Popular" pricing badge
- [x] Verify: typecheck clean, production build clean (homepage bundle 96.5 → 94.4 kB)

---

> Waiting on your **"confirm"** / **"implement"** before any code changes begin.
