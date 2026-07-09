# Implementation Plan: AI Assistant Overhaul, Pressure Popup Fixes & Mobile/Tablet Optimization

Status: **PLANNING — not yet approved for implementation.** No code will be touched until this plan is confirmed.

---

## ⚠️ Security note (found during investigation, not requested but flagging immediately)

`components/ui/chat-widget.tsx` currently hardcodes a **live Airtable Personal Access Token** (`CONFIG.AIRTABLE_TOKEN`) directly in a `"use client"` component. That means the token is bundled into the JS shipped to every visitor's browser — anyone can open devtools → Sources (or just view the network request to `api.airtable.com`) and read it out, then use it to read/write your Airtable base.

- The file is currently **untracked** (never committed/pushed to GitHub), so it hasn't leaked publicly yet.
- It **is** already exposed on `localhost:3000` right now, in the running dev server.
- Part of this plan (Section B) moves the Airtable call server-side and out of client code. **Recommend rotating this token in Airtable regardless**, since it's already been sitting in a client bundle.

---

## 🩹 A. Bug fixes (small, isolated, do first)

*Goal: fix concrete defects independent of the larger AI/mobile work.*

- [ ] **Hydration mismatch** — `chat-widget.tsx:269` renders `<style>{`...`}</style>` as a JSX text child. React HTML-escapes the apostrophes in `font-family: 'Inter'` server-side (`&#x27;`), but `<style>` is a raw-text HTML element so the browser doesn't decode that entity back — client and server text disagree and React throws. **Fix:** switch to `<style dangerouslySetInnerHTML={{ __html: cssString }} />`, which bypasses JSX text-escaping entirely.
- [ ] **Duplicate `<ChatWidget />` mount** — `app/page.tsx` renders `<ChatWidget />` twice (once inside the main wrapper `<div>`, once again right after it, both inside `BookingProvider`). Two independent widget instances are mounted (two sets of state, two style tags, two Airtable calls per message in the old code). Remove the second instance.

---

## 🤖 B. AI Assistant overhaul (chat-widget.tsx → real conversational assistant)

*Goal: replace the current keyword-matched, dead-ending chatbot with an LLM-backed assistant that carries context, has a warm/compassionate personality, answers real questions from the knowledge base, and naturally offers to book when the user signals intent — no more canned loops or hardcoded dead ends.*

### Why the current one feels like "a chatbot, not an assistant"
- `isBookingIntent()` / `isPricingIntent()` keyword-match short-circuit the LLM entirely and return **one hardcoded string**, always the same, regardless of context. Clicking "Tell me about Insider membership" re-triggers `isPricingIntent()` (matches "membership") and returns the *same generic pricing blurb* again — nothing new, no forward motion.
- The real LLM path (`isBookingIntent`/`isPricingIntent` both false) calls `fetch('/api/chat', ...)` — **but no `app/api` directory exists in this project at all.** Every non-booking, non-pricing message 404s, hits the `catch`, and shows "We're having a moment." This is why "What treatments do you offer?" fails — it's not a flaky LLM call, the endpoint has never existed.
- The Calendly link (`CONFIG.CALENDLY_URL`) 404s ("Page not found") — confirmed in your screenshot.

### B1. Backend: real API route
- [ ] Create `app/api/chat/route.ts` (Next.js App Router Route Handler, Node or Edge runtime) that:
  - Accepts `{ messages, treatmentContext? }` from the client.
  - Calls the Anthropic API server-side using `ANTHROPIC_API_KEY` (env var — **you'll need to provide this key before implementation**, e.g. in `.env.local`, and configure it in Netlify's env settings for deploys since this repo deploys via `netlify.toml`).
  - Uses a current model id — the existing code references `claude-sonnet-4-6`, which is not a valid model. Use `claude-sonnet-5`.
  - Streams the response (or returns non-streaming JSON — recommend streaming for a more "assistant-like" typing feel, matches the existing typing-dots UI).
  - Runs the Airtable lead-logging call **server-side**, using `AIRTABLE_TOKEN` as a server-only env var (never shipped to the client). Closes the security hole in the note above.

### B2. Assistant personality & behavior (system prompt rework)
- [ ] Rewrite the system prompt (currently in `chat-widget.tsx`'s `SYSTEM_PROMPT`) to lean further into: warmth, compassion, genuinely conversational tone (not FAQ-lookup phrasing), remembering what's been said earlier in the conversation, and asking natural follow-ups — closer to a Voiceflow-style AI concierge than a scripted bot.
- [ ] Remove the hardcoded `isBookingIntent` / `isPricingIntent` short-circuits. All messages go to the LLM, which has the full knowledge base (treatments, pricing, process, FAQs — already written into `KNOWLEDGE_BASE`) and answers naturally and specifically to what was asked, not a fixed blurb.
- [ ] Keep the *initial* quick-reply suggestions (first message only) as optional conversation starters — but once the user is chatting, replies come from the LLM, not from more canned quick-reply loops.
- [ ] Give the assistant a lightweight "tool"/signal it can emit when it detects genuine booking intent (e.g. a structured marker in its response, or a simple client-side intent classifier on the LLM's reply) so the UI can surface a **"Book Now"** button inline in the conversation at the moment the assistant offers it — not a rigid keyword trigger that fires on the word "available" mid-sentence.

### B3. Booking handoff (per your decision: in-app modal → Calendly)
- [ ] When the assistant surfaces the "Book Now" moment (or the user clicks it), open the app's existing `BookingModal` via `useBooking().setIsOpen(true)` — reusing the real, already-styled treatment-selection flow (Step 1) instead of a separate ad hoc UI in the chat widget.
  - If the assistant has already inferred a treatment area from the conversation, pre-select it via `toggleTreatment()` so the user doesn't re-enter what they already told the assistant.
- [ ] Replace the **fake** date/time picker in `components/booking/step-datetime.tsx` (currently hardcoded next-14-days + 6 fixed time slots, no real availability) with a real **Calendly inline embed** for actual scheduling, using a corrected, working Calendly URL.
  - **Confirmed Calendly URL:** `https://calendly.com/aura-aesthetics/booking`
- [ ] `components/booking/step-details.tsx` (Step 3, currently a simulated `submitBooking()` with no real backend) will likely become redundant once Calendly collects name/email/phone itself — proposed default: simplify Step 3 into a lightweight confirmation ("You're booked — check your email for details") rather than re-asking for contact info Calendly already captured. Flagging as a default assumption, open to adjustment at implementation time.
- [ ] Style the Calendly embed to better match the site's look where Calendly's embed API allows it (background/text/primary color params), since you asked for visual customization.

### B4. Chat UI polish
- [ ] Confirm typing-indicator and message-streaming UX still reads naturally once responses stream token-by-token instead of arriving all at once.
- [ ] Remove/replace the pricing-specific and booking-specific quick-reply arrays that currently loop; quick replies going forward should be generated contextually (e.g. suggested by the assistant's own response) rather than hardcoded per intent.

---

## 🔔 C. Pressure/social-proof popup (`components/ui/social-pulse.tsx`)

*Goal: slower cadence, readable in every scroll position.*

- [ ] **Timing** — currently: 5s initial delay, then a new activity every 10s (1s hidden + 9s visible). Change the interval to **20s** between appearances (confirmed).
- [ ] **Contrast fix** — the card uses `.glass` (`background: rgba(255,255,255,0.4)` + blur) with `text-foreground` (`#2C2C2C`, dark charcoal) and `text-muted-foreground` (`#5C5C5C`). Over the light champagne page background (`#F5F0E8`) this reads fine; over the dark Hero section, a 40%-white translucent panel sitting on a dark photo stays dark, so dark charcoal text on it is nearly invisible — matches what you're seeing.
  - Fix approach: make the popup's background solid/opaque enough (not scroll-position-dependent) so contrast is guaranteed regardless of what's behind it — e.g. a solid dark panel (`bg-foreground` / near-black) with light text (`text-background` / off-white), or a solid light card with a stronger opacity (not 40%) plus a subtle shadow/border so it never inherits the page behind it. Will pick the option that best matches the existing card styling used elsewhere (e.g. `.card-dark`-equivalent or the existing `card` token) rather than inventing a new visual style.

---

## 📱 D. Mobile & tablet responsive optimization

*Goal: full landing page usable and visually correct at mobile (375–428px) and tablet (768–1024px) widths.*

Findings from the audit pass:
- `Header` already has a working hamburger mobile menu (`isMobileMenuOpen` state) — needs verification pass, not a rebuild.
- `Hero`, `Header`, `StickyBookingBar` have some `sm:`/`md:`/`lg:` coverage already but it's thin (16, 4, and 1 responsive-class usages respectively) — needs a real audit, not assumed to be complete.
- **`ChatWidget` is the clearest confirmed mobile-breaking component**: it's positioned with hardcoded inline pixel values (`width:392, bottom:100, right:24`) and zero responsive breakpoints. On a 375px-wide phone, a 392px-wide fixed panel will overflow off the right edge of the screen entirely.
- `BookingModal` / `AuraAssessment` use `max-w-4xl` / `max-w-5xl` container caps, which is fine on desktop, but need verification that inner padding/typography scale down properly on small screens (13" laptop issues were already called out in a prior implementation doc — mobile phone widths are narrower still and untested).

Checklist:
- [ ] **ChatWidget**: make the panel width responsive — e.g. `width: min(392px, calc(100vw - 32px))`, and consider a full-height bottom sheet behavior on small screens instead of a floating card, so it doesn't overlap unreachable content.
- [ ] **Header**: verify hamburger menu, logo sizing, and CTA button don't overflow/collide at 375px and 768px.
- [ ] **Hero**: verify heading/subhead font scaling, CTA button stacking, and image/gallery strip (visible in your screenshots) don't overflow or crop awkwardly on mobile.
- [ ] **TrustBar / ResultsGallery / TransformationTimeline**: verify horizontal scroll/carousel behavior works with touch on mobile, and grid layouts collapse to single/double column appropriately.
- [ ] **Benefits / Process / Pricing / Testimonials / FAQ / Newsletter / Footer**: pass over each for column-collapse, font scaling, and spacing at tablet + mobile widths.
- [ ] **StickyBookingBar**: verify it doesn't overlap the `SocialPulse` popup or the `ChatWidget` launcher button on small screens (all three are `position: fixed` near the bottom of the viewport).
- [ ] **BookingModal / AuraAssessment**: verify padding, font sizes, and the horizontal date-scroller (soon to be replaced by Calendly per Section B) work at mobile widths.
- [ ] **BackToTop**: verify it doesn't collide with the other fixed-position bottom elements on mobile.
- [ ] General pass: confirm no horizontal scroll/overflow anywhere on the page at 375px, 428px, and 768px viewport widths.

---

## ❓ Open inputs needed from you before implementation

1. ~~Corrected Calendly URL~~ — **confirmed:** `https://calendly.com/aura-aesthetics/booking`
2. ~~SocialPulse interval~~ — **confirmed:** 20s
3. ~~Anthropic API key~~ — **confirmed:** key received and staged in `.env.local` (git-ignored, not in source). **Pending on your end:** account is on the $0.00 "Evaluation access" plan — add $5–10 in Credits → Add funds in the Claude Console so the assistant is actually callable once built.
4. ~~Airtable token rotation~~ — **confirmed:** old token revoked, new token received and staged in `.env.local` as a server-only var (`AIRTABLE_TOKEN`), not client code.

**All inputs resolved. Ready to implement — waiting on your "implement"/"confirmed."**

---

## ✅ Progress checklist

- [x] A1. Fix `<style>` hydration mismatch in ChatWidget — switched to `dangerouslySetInnerHTML`
- [x] A2. Remove duplicate `<ChatWidget />` mount in `app/page.tsx`
- [x] B1. Create `app/api/chat/route.ts` server-side LLM endpoint
- [x] B2. Rewrite system prompt for warmth/compassion/real conversation — `lib/chat-prompt.ts`
- [x] B3. Remove hardcoded keyword-intent short-circuits
- [x] B4. Move Airtable logging server-side; remove client-exposed token
- [x] B5. Wire "Book Now" moment to open `BookingModal` with pre-filled treatment context — `[[BOOK_NOW:slug]]` marker protocol
- [x] B6. Replace fake date/time picker with real Calendly embed (corrected URL, auto-advances on `calendly.event_scheduled`)
- [x] B7. Simplify Step 3 into a review/confirm screen (treatment summary + consent) — removed redundant name/email/phone re-entry, updated `StepSuccess` and `BookingContext` accordingly
- [x] B8. Style Calendly embed to match site look via embed color params
- [x] C1. Increase SocialPulse popup interval to 20s
- [x] C2. Fix SocialPulse contrast — swapped 40%-opacity glass for opaque `bg-card`/`border-border`
- [x] D1. ChatWidget responsive width/positioning for mobile
- [x] D2. Header — already had solid mobile coverage, verified, no changes needed
- [x] D3. Hero — fixed CTA button overflow (`px-12 text-lg` + `whitespace-nowrap` was overflowing narrow viewports)
- [x] D4. TrustBar/ResultsGallery/TransformationTimeline — verified, already using correct responsive grid idioms
- [x] D5. Benefits/Process/Pricing/Testimonials/FAQ/Newsletter/Footer — verified grids; fixed same CTA-button overflow bug in Process
- [x] D6. Fixed-position element check — BackToTop/ChatWidget launcher/StickyBookingBar/SocialPulse spacing verified by reading layout math; no code-provable collision found
- [x] D7. BookingModal/AuraAssessment — fixed 3 more button-overflow instances + 2 forced `grid-cols-2` layouts that could cramp at 375px
- [x] D8. No horizontal-overflow issues found via code audit (fixed all identified causes); recommend a quick visual pass in your browser's device toolbar to confirm

---

## 🔎 What was found during implementation (beyond the original plan)

- **Claude Sonnet 5 returns extended-thinking blocks by default** — `content[0]` was a `thinking` block, not the reply text, so every response silently came back empty. Fixed by passing `thinking: { type: "disabled" }` and reading the first `text`-type block instead of assuming index 0. This also cut output-token cost roughly in half per message (thinking tokens were ~60% of output in testing).
- **Same button-overflow bug repeated 4 times**: `whitespace-nowrap` (baked into the base `Button` component) combined with `px-12`/`px-16` + `text-lg font-bold` on long copy ("Start Your Transformation", "Book Your Session") would overflow narrow viewports. Fixed in Hero (×2), Process, and AuraAssessment by scaling padding/font size down at the base breakpoint and back up at `sm:`.
- **`selectedDate`/`selectedTime`/`contactInfo` became dead state** once Calendly took over scheduling — removed from `BookingContext` rather than leaving unused fields around.

---

## ✅ Verification performed

- `npx tsc --noEmit` — clean
- `npm run build` — clean production build, `/api/chat` registered as a dynamic route
- Live end-to-end test of `/api/chat`: informational question (grounded, correct), the exact repro of the reported "Insider membership" loop bug (now gives a distinct, specific answer), and an explicit booking-intent message (correctly emits `[[BOOK_NOW:frown-lines]]`)
- Dev server running at `http://localhost:3000` — ready for you to click through in a real browser

Note: this session's browser-preview sandbox is scoped to a different project directory, so the mobile/tablet fixes above were verified by reading the actual rendered constraints (padding, font size, container width) in code rather than visually in a device emulator. Recommend a quick pass in your browser's responsive/device toolbar to confirm, especially around the fixed-position bottom elements (D6).
