# Implementation Plan: Booking Widget Optimization

## 1. Performance & Loading Speed 🚀

**The Problem**:
Currently, the Calendly iframe is remounting and reloading from scratch right when the user reaches the "Date & Time" step. This happens because the iframe's `src` URL depends on the `personalDetails` (Name, Email, etc.) for prefilling. Since these details are collected in Step 2, the URL changes at the last moment, destroying the off-screen pre-loaded iframe and forcing a fresh 1-2 second load.

**The Solution**:
To achieve an *instant* load, we have two architectural choices:

* **Option A (Recommended for Speed)**: Revert to Calendly's native flow. We load the Calendly iframe immediately in the background during Step 1 (Treatment Selection). The user selects a time, and then fills out their details *inside* the Calendly widget. We remove our custom "Personal Details" step. This guarantees 0ms load time when transitioning to the calendar.
* **Option B (Recommended for Custom UI)**: Keep our custom "Personal Details" step, but accept a 1-2 second loading screen when transitioning to the calendar. We can improve the perceived speed by showing a beautiful skeleton loader or transition animation while the iframe boots up with the prefilled URL.

*Implementation Action*: We will remove the custom `StepPersonalDetails` and let the iframe pre-load offscreen with a static URL. The user will enter their details natively inside Calendly after picking a time.

## 2. Tracking the "Aura Assessment" Path 📊

**The Problem**: 
The backend/Calendly needs to know if a booking originated from the "Aura Assessment" quiz or just a standard "Book Now" button.

**The Solution**:
We will utilize Calendly's built-in UTM tracking parameters. 
1. We will update the `BookingContext` to accept an optional `utmSource` string.
2. When the user clicks "Book Now" at the end of the Aura Assessment, we set `utmSource = 'aura_assessment'`.
3. When they click a regular CTA, we set `utmSource = 'website_direct'`.
4. We append these to the Calendly `embedUrl` (e.g., `&utm_source=aura_assessment`).
5. This data will be visible inside the Calendly dashboard under the event details, and in any backend webhook payloads.

## 3. Branding & Styling Consistency 🎨

**The Problem**:
The widget is currently showing Calendly's default blue and white theme, which clashes with Aura's luxury Champagne and Sage Green aesthetic.

**The Solution**:
Calendly allows URL-based color customization (Note: This requires a paid Calendly Professional/Teams plan). We will map the site's CSS variables directly into the iframe URL parameters:
- `background_color=FDFBF7` (Our `--card` / Soft White)
- `text_color=2C2C2C` (Our `--foreground` / Deep Charcoal)
- `primary_color=98A993` (Our `--primary` / Sage Green)
- `hide_gdpr_banner=1` (To keep it clean)

*Implementation Action*: We will ensure these URL parameters are correctly appended to the base Calendly URL. 

---

### Step-by-Step Execution Plan

1. **Modify Context**: Add `source: 'assessment' | 'direct'` to `lib/booking-context.tsx`.
2. **Update Assessment Hook**: Pass `source: 'assessment'` when opening the modal from `components/booking/aura-assessment.tsx`.
3. **Revert Modal Flow**: Remove `StepPersonalDetails` from `booking-modal.tsx` to restore the 3-step flow (Treatment -> Date/Time -> Success).
4. **Optimize iframe URL**: Update `step-datetime.tsx` to construct a static `embedUrl` (only dependent on the `source` and selected treatments, which are known immediately in Step 1). 
5. **Apply Branding**: Inject the exact hex codes into the Calendly URL parameters.
6. **Verify Preloading**: Ensure the iframe renders off-screen the moment the modal opens, guaranteeing an instant transition.

## Open Questions for You:
1. Are you okay with removing the custom "Personal Details" form and letting users fill their details natively inside Calendly (after they pick a time) in order to achieve the instant loading speed?
2. Do you have a paid Calendly plan? (Color customization requires the Professional tier or higher).
