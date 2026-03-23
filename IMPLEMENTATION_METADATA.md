# Implementation Plan: Metadata & Social Media Previews

## Goal
The goal is to elevate the "Aura Aesthetics" brand by implementing a complete and professional metadata system that includes rich social media previews (Open Graph/Twitter Cards) using a high-fidelity brand snapshot of the Hero section as the preview image.

## Phase 1: Brand Asset Generation (Hero Snapshot)
- [x] **Capture Hero Snapshot**: Use a browser subagent to take a high-fidelity 1200x630 snapshot of the live Hero section at `http://localhost:61609/` to ensure the preview matches the actual site experience.
- [x] **Optimization**: Ensure the snapshot captures the premium typography and luxury branding of the "Aura Aesthetics" Hero section.
- [x] **Optimizing for Ratios**: Ensure the image works well for both 1.91:1 (OG) and 2:1 (Twitter) aspect ratios (approx 1200x630px).

## Phase 2: Metadata Infrastructure
- [x] **Define Global Metadata**: Build a robust `Metadata` object in `app/layout.tsx` with:
    - `title` with brand suffix ("Aura Aesthetics | Premium Botox in Beverly Hills").
    - `description` that is SEO-tuned for conversion.
    - `keywords` for local SEO (Beverly Hills, Botox, Lip Fillers, Aura Aesthetics).
    - `canonical` URL to prevent duplicate content issues.
- [x] **Open Graph (OG) Integration**:
    - `og:title`, `og:description`, `og:url`, `og:siteName`, `og:locale`, `og:type: "website"`.
    - Reference the newly generated `og-image.png`.
- [x] **Twitter Card Integration**:
    - `twitter:card: "summary_large_image"`.
    - `twitter:title`, `twitter:description`, `twitter:image`.

## Phase 3: Technical SEO & Discoverability
- [x] **Add Static SEO files**:
    - Create `app/robots.txt` to guide search engine crawlers.
    - Create `app/sitemap.ts` for dynamic sitemap generation.
- [x] **Enhance Favicons/UI Icons**: Ensure `apple-touch-icon` and standard favicons are correctly integrated for a premium OS-level experience.
- [x] **Theme Color & Manifest**: Update the `theme-color` for mobile browser chrome integration.

## Phase 4: Social Validation
- [ ] **Preview Testing**: Guidelines for testing using `metatags.io` or `opengraph.xyz`.
- [ ] **Dynamic Title Support**: Readying the structure for future sub-pages (e.g., Services, About).

## Next Steps
1. [x] Use the browser subagent to snapshot the Hero section of the live site.
2. [x] Update the `layout.tsx` file with the final metadata structure.
3. [ ] Verify social previews using `metatags.io`.
