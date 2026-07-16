# Calendly Integration Plan

## A) Recommended Embed Approach

**Recommendation**: Use the official [`react-calendly`](https://www.npmjs.com/package/react-calendly) package (Advanced JS Embed wrapped for React).

**Reasoning**: 
- **Next.js & SSR Compatibility**: The `react-calendly` library is designed to work safely with React and SSR (Next.js). It handles injecting the external Calendly scripts into the DOM without causing hydration mismatches or layout shifts.
- **Component Lifecycle Management**: It automatically handles cleanup when the component unmounts, preventing memory leaks and duplicate script tags.
- **Multiple Embed Types**: It provides out-of-the-box components for both `InlineWidget` (for the primary on-page booking) and `PopupButton` or `PopupWidget` (for the modal/popup flow).
- **Event Listeners**: It provides `useCalendlyEventListener` to easily track when a user books an event, useful for analytics later.

## B) Step-by-Step Tasks List

- [ ] **1. Install Dependencies**: Run `npm install react-calendly`
- [ ] **2. Configure Environment Variables**: Add `NEXT_PUBLIC_CALENDLY_URL` to `.env.local` and `.env.example`.
- [ ] **3. Create Config File**: Create a centralized config file (e.g., `lib/calendly-config.ts`) to store branding settings (colors) mapped from our Tailwind theme.
- [ ] **4. Build Inline Component**: Create `components/booking/calendly-inline-widget.tsx` using `InlineWidget` from `react-calendly`.
- [ ] **5. Build Popup Component**: Create `components/booking/calendly-popup-button.tsx` using `PopupButton` or `useCalendlyEventListener` for modal flows.
- [ ] **6. Integrate Inline Widget**: Add the `CalendlyInlineWidget` to the primary booking section or page (e.g., `app/page.tsx` or a new `app/book/page.tsx`).
- [ ] **7. Integrate Popup Button**: Update global CTAs (e.g., in `components/navigation/navbar.tsx`) to use the `CalendlyPopupButton`.
- [ ] **8. Test & Verify**: Run through the QA checklist (see Section E).

## C) Files/Components to Add or Modify

- **[NEW] `lib/calendly-config.ts`**:
  To store the base URL and brand customization parameters (text color, primary color, background color).
- **[NEW] `components/booking/calendly-inline-widget.tsx`**:
  A reusable wrapper around `InlineWidget`. It will read the branding config and handle loading states.
- **[NEW] `components/booking/calendly-popup-button.tsx`**:
  A wrapper component for the modal booking flow, allowing us to style the trigger button with our Shadcn/Tailwind classes.
- **[MODIFY] `.env.local` & `.env.example`**:
  Add `NEXT_PUBLIC_CALENDLY_URL`.
- **[MODIFY] `components/sections/hero.tsx` (or similar relevant sections)**:
  Update main CTA buttons to trigger the Popup or navigate to the Inline widget.
- **[MODIFY] `components/navigation/...`**:
  Update header/footer CTAs to trigger the modal.

## D) Environment & Configuration Needed

1. **Environment Variable**: 
   ```env
   NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-username/event-type"
   ```
2. **Branding Settings (Passed via Props)**:
   Calendly allows customizing specific hex colors. These should match the brand theme. We will configure these in our wrapper component:
   - `primaryColor`: For buttons and links inside the embed.
   - `textColor`: For the main text.
   - `backgroundColor`: To match the surrounding section (e.g., dark or light mode).
   - `hideGdprBanner`: Set to `true` (if we handle GDPR on the parent site).
   - `hideEventTypeDetails`: Optional, to keep the UI cleaner if context is already provided on the page.

*Limitation Note*: Calendly does not allow injecting custom CSS. We are limited to these specific color parameters.

## E) QA Checklist

- [ ] **Desktop & Mobile Layout**: Ensure the iframe resizes correctly and doesn't cause horizontal scrolling on mobile devices.
- [ ] **Theme Consistency**: Verify that the customized colors match the site's dark/light mode appropriately.
- [ ] **No Layout Shifts (CLS)**: Ensure the container for the `InlineWidget` has a min-height so the page doesn't jump when the iframe loads.
- [ ] **Cookie Banner/GDPR**: Verify that passing `hideGdprBanner: true` works and relies on the site's primary cookie consent.
- [ ] **Safari/Chrome/Firefox**: Test across major browsers to ensure third-party iframe cookie restrictions don't block the widget.
- [ ] **Adblockers**: Ensure the widget still loads when uBlock Origin or Brave Shields are active.
- [ ] **Timezone Detection**: Confirm the widget accurately detects the local timezone of the browser.

## F) Rollout Plan

1. **Development & Staging**: Implement the components on a branch and deploy to a Vercel preview URL.
2. **Internal Verification**: Test the booking flow completely on the preview URL to ensure no errors or layout issues.
3. **Fallback Mechanism**: Add an error boundary or a simple `<a href="...">` fallback inside the component in case the `react-calendly` script fails to load (e.g., due to aggressive network blocking).
4. **Production Deploy**: Merge to main. Monitor Vercel analytics/logs for any client-side errors post-launch.

## G) Future Upgrades

- **Pre-filling User Data**: If a user is logged in or fills out a preliminary lead form on our site, we can pass `prefill={{ name: 'John Doe', email: 'john@example.com' }}` to skip a step in Calendly.
- **UTM Tracking**: We can pass `utm={{ utmCampaign: '...', utmSource: '...' }}` to track conversions from specific marketing campaigns directly into Calendly.
- **Analytics Integration**: Use `useCalendlyEventListener` to listen for the `onProfilePageViewed` and `onEventScheduled` events, pushing these to Google Analytics, PostHog, or Meta Pixel.
- **Webhooks**: (Requires Calendly premium) Set up a backend endpoint (e.g., `app/api/webhooks/calendly/route.ts`) to receive scheduling payloads, update our database, or trigger custom email automations.

## H) Security & Privacy

- **Data Subject (PII)**: The embed passes user data (name, email, responses to invitee questions) directly to Calendly. We do not store this data on our servers unless we explicitly implement Webhooks (see Future Upgrades). This means Calendly acts as a Data Processor for our site.
- **Cookies & Consent**: 
  - Calendly relies on third-party cookies to manage sessions, analytics, and performance within the embedded iframe. 
  - Since we plan to pass `hideGdprBanner: true` to match our branding, we MUST ensure our site's own cookie consent manager (e.g., OneTrust, Cookiebot) controls the rendering of the `CalendlyInlineWidget` or `CalendlyPopupButton`. The widget should only mount if the user has consented to "Functional" or "Third-Party" cookies.
- **Content Security Policy (CSP)**:
  - To ensure the embed is not blocked by our site's security headers, we must update the CSP (e.g., in `next.config.mjs` or `middleware.ts`).
  - Required directives to add:
    - `frame-src 'self' https://calendly.com;`
    - `script-src 'self' 'unsafe-inline' https://assets.calendly.com;`
    - `style-src 'self' 'unsafe-inline' https://assets.calendly.com;`
