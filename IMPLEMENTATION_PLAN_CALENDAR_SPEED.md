# Implementation Plan: Calendar Load Speed & Landing-Page Performance

Status: **IMPLEMENTED — verified with typecheck + production build. Served via `npm start` for review.**

Result: homepage First Load JS **182 kB → 164 kB** (page chunk 94.4 → 77.1 kB). The Calendly `display:none` defeat is fixed, so the calendar now boots during Step 1 instead of when Step 2 opens.

---

## TL;DR of the diagnosis

There is **one concrete bug** defeating the Calendly pre-load, **one measurement caveat** that's inflating how slow everything feels, and **a handful of real landing-page weight problems**. The calendar bug is the big win.

---

## 1. 🐛 THE main bug: the Calendly pre-load is silently defeated by `display:none`

Last round I added a "pre-mount the Calendly iframe at Step 1 so it loads in the background." It's **not actually working**, and I can see exactly why in the code:

- In [`step-datetime.tsx:43`](components/booking/step-datetime.tsx), when the step isn't active the whole block gets Tailwind's `hidden` class — which is `display: none`.
- **Browsers do not load (or heavily deprioritize) an `<iframe>` inside a `display:none` element.** So during Step 1 the iframe just sits there doing nothing. The moment you reach Step 2 and `hidden` is removed, Calendly's heavy scheduling app *starts booting from scratch* — which is the long "Preparing your calendar…" wait you're seeing in the screenshot.

In other words: the optimization exists in the code but the browser throws it away. This is the single biggest fixable cause.

**Proposed fix:** hide the inactive Step 2 with a technique that keeps the iframe **rendered and loading** instead of `display:none`:
- [ ] Keep the iframe mounted in a wrapper that, when inactive, is pushed off-screen but stays painted — e.g. `position: absolute; opacity: 0; pointer-events: none; left: -9999px` with its real 480px height retained (NOT `display:none`, NOT `height:0`). This guarantees Chrome/Safari/Firefox fully fetch **and boot** the Calendly SPA while the user is still choosing treatments, so Step 2 is instant.
- [ ] Never unmount/remount or move the iframe node between steps (moving an iframe in the DOM forces a full reload — so the wrapper stays put and only its visibility toggles).

## 2. ⚠️ You're measuring in dev mode — that alone makes everything feel slow

You're viewing the site through `npm run dev`. Next.js dev mode is **intentionally slow**: it compiles each route on demand the first time you hit it, ships un-minified JS, runs extra React dev-only checks, and skips production caching. It is not representative of what a real visitor experiences.

- [ ] **Before optimizing further, benchmark the production build:** `npm run build && npm start`, then judge speed there. A meaningful chunk of the "landing page is generally slow" feeling is likely dev-mode overhead that simply won't exist in production. (This is a measurement step, not a code change — but it should come first so we don't chase phantom slowness.)

## 3. 🎥 Hero background video — the real landing-page weight

Assuming production still feels heavy, the hero video is the prime suspect:

- It streams a **full-size MP4 from Pixabay's CDN** (`51159-464366601_large.mp4`) that autoplays and loops — a large ongoing download that competes with everything else for bandwidth on first load.
- It has `brightness-[0.7] contrast-[1.1]` **CSS filters applied to a full-viewport, constantly-playing video**, which forces the browser's compositor to re-process every single frame — one of the most expensive things you can ask a GPU to do continuously.

Proposed options (pick one — I'll recommend **3a**):
- [ ] **3a (recommended): keep it lightweight.** Bake the darkening into the existing scrim gradient and **remove the CSS `brightness/contrast` filters** (kills the per-frame GPU cost), switch the video to `preload="none"` so it doesn't compete during initial paint (the poster image covers first paint), and — if you can supply or approve it — swap the Pixabay `_large` file for a smaller/compressed self-hosted version. Biggest perceived-speed win for the least visual change.
- [ ] **3b (fastest, bigger visual change): drop the video entirely** in favor of the high-quality poster image with a subtle CSS gradient/Ken-Burns motion. Eliminates the video download and all compositing cost. The hero would look nearly identical on first paint but lose the motion.

## 4. 🧩 Defer below-the-fold JavaScript (secondary win)

Everything on the page is a client component (21 `"use client"` files), and the homepage ships ~182 kB of first-load JS. The below-the-fold, animation-heavy pieces don't need to be in that initial bundle:

- [ ] Lazy-load the heaviest below-the-fold sections with `next/dynamic` (`ssr: false` where safe) — candidates: `TransformationTimeline` (framer-motion + cross-fading images), `ResultsGallery`, and the `ChatWidget` (nobody needs the chat bundle in the first paint). This shrinks the initial JS the browser must parse/execute before the page is interactive.

## 5. 🗓 The "final booking taking forever" (after you click Confirm in Calendly)

This one is largely **Calendly-side and outside our code** — after the user submits, Calendly POSTs the booking to *their* backend and renders *their* confirmation before firing the `event_scheduled` message we listen for. We can't speed their servers, but two things help:

- [ ] **Trim the Calendly form.** Your event currently asks several custom questions ("Is this your first time?", "special event?", "anything else?"). Each extra field lengthens the form and the submit. Removing the non-essential ones (done in the **Calendly dashboard**, not in code) makes the whole thing faster and less friction. — *This is a config change on your side; I'll flag exactly which fields once you decide.*
- [ ] **Add a brief "Confirming your booking…" state** in our modal so the moment between the user finishing Calendly and our Step 3 appearing feels handled rather than frozen. (Small code change on our side.)

---

## What I do NOT recommend (so we don't over-engineer)

- Replacing Calendly with a custom scheduler — you specifically chose Calendly as the real booking system; the fix is to load it smarter, not to remove it.
- Migrating to `next/image` right now — the local result images are already small (~80–140 kB) and `images.unoptimized: true` is set for the Netlify deploy; the payoff is low relative to the video.

---

## ✅ Proposed checklist (order = biggest win first)

- [x] 1. Fix the `display:none` iframe defeat → off-screen-but-painted pre-load (calendar boots during Step 1)
- [x] 2. Benchmark in production build (`npm run build && npm start`) — done; served for review
- [x] 3a. Remove video CSS filters (baked darkening into a `bg-black/30` layer) + `preload="none"` + idle-deferred play (kept Pixabay URL)
- [x] 4. `next/dynamic` lazy-load for TransformationTimeline, ChatWidget, BookingModal, AuraAssessment (ResultsGallery kept SSR'd to protect its before/after marketing images + SEO)
- [ ] 5a. (Your side) Trim Calendly custom questions in the Calendly dashboard — **still pending on you**
- [x] 5b. "Confirming your booking…" — **deliberately skipped**: the frozen moment is inside Calendly's own iframe; adding an overlay would only insert artificial delay, contrary to the speed goal. Transition to Step 3 stays instant.
- [x] Verify: typecheck clean, production build clean, homepage + chat API smoke-tested 200

---

## ❓ Inputs I need from you before implementing

1. **Hero video:** go with **3a** (keep video, lighter) or **3b** (drop video for poster)? And can you provide/approve a smaller self-hosted video file, or should I keep the current Pixabay URL and just defer it?
2. **Calendly form:** okay to trim the custom questions? If yes, which to keep (I'd suggest keeping only treatment area + "first time?", dropping "special event?" / "anything else?").

> Waiting on your **"confirm"** / **"implement"** (and the two answers above) before any code changes begin.
