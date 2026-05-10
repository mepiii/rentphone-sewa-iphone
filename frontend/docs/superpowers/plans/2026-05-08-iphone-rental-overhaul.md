# iPhone Rental Frontend Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the React/Vite frontend into a premium Apple-inspired, product-first iPhone rental website using the approved Figma palette and WhatsApp-first conversion model.

**Architecture:** Keep existing routes and data. Replace visual language across shared components, global CSS, and all route pages. Use open full-bleed sections, restrained components, token-driven styling, real product imagery, and browser QA polish.

**Tech Stack:** React 18, Vite, Tailwind v4 CSS, React Router 7, Radix Accordion, motion/react, lucide-react.

---

## Strict execution rules

- Do not present more rough visual option cards.
- Do not make homepage look like a component demo.
- Rebuild typography seriously: large 600-weight display, negative tracking, 17px body.
- Hero product visual must use real product imagery/composition; no `iPhone` placeholder text box; no hero product card.
- Aggressively remove unnecessary pills, badges, cards, rounded wrappers, shadows, hover lift.
- Apple-inspired, not Apple clone; Figma palette remains identity.
- Preserve routes: `/`, `/katalog`, `/cara-sewa`, `/benefit`, `/faq`.
- Run build, dev server, desktop/tablet/mobile browser QA, then visual polish.

## File map

- Modify `src/styles/index.css`: tokens, typography base, shadows, motion utilities, product visual helpers.
- Modify `src/app/components/Button.tsx`: quiet CTA styles, no shadow/lift.
- Modify `src/app/components/Navbar.tsx`: minimal translucent nav, WhatsApp CTA placeholder.
- Modify `src/app/components/Footer.tsx`: minimal premium footer.
- Modify `src/app/components/SectionHeading.tsx`: stronger type scale.
- Modify `src/app/components/MotionSection.tsx`: subtle reduced-motion-safe reveal.
- Modify `src/app/components/ProductCard.tsx`: refined catalog cards only.
- Modify `src/app/components/PricingCard.tsx`: functional pricing cards only.
- Modify `src/app/components/FAQAccordion.tsx`: minimal accordion.
- Modify `src/app/components/BenefitItem.tsx`: convert to editorial row/block style or reduce card visual weight.
- Modify `src/app/components/StepItem.tsx`: editorial process rows.
- Modify `src/app/pages/Home.tsx`: full product-first homepage overhaul.
- Modify `src/app/pages/Katalog.tsx`: premium catalog route.
- Modify `src/app/pages/CaraSewa.tsx`: process/trust route.
- Modify `src/app/pages/Benefit.tsx`: text-led benefit route.
- Modify `src/app/pages/FAQ.tsx`: minimal FAQ route.

## Task 1: Global design tokens and shared primitives

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/app/components/Button.tsx`
- Modify: `src/app/components/SectionHeading.tsx`
- Modify: `src/app/components/MotionSection.tsx`

- [ ] Set approved `--rp-*` tokens, remove gradient text utility, remove card shadow utilities as default design crutch.
- [ ] Add typography defaults: body 17px/1.55, display negative tracking, Poppins display + Roboto body if already available.
- [ ] Add `.rp-product-shadow`, `.rp-device-visual`, `.rp-section-pad`, `.rp-reveal-safe` utilities.
- [ ] Rebuild `Button` variants: primary gradient/deep blue, secondary quiet outline/text, dark outline; no hover lift/shadow.
- [ ] Rebuild `SectionHeading` with 600-weight headings, tighter tracking, calmer eyebrow.
- [ ] Keep `MotionSection` subtle, reduced-motion compatible.

## Task 2: Minimal nav and footer

**Files:**
- Modify: `src/app/components/Navbar.tsx`
- Modify: `src/app/components/Footer.tsx`

- [ ] Remove nav pill island, active gradient pill, logo shadow block.
- [ ] Add thin translucent nav with text links and `Chat Admin` placeholder CTA.
- [ ] Mobile menu stays functional, minimal, no rounded-card look.
- [ ] Rebuild footer as quiet off-white information area with minimal columns and contact.

## Task 3: Functional components reset

**Files:**
- Modify: `src/app/components/ProductCard.tsx`
- Modify: `src/app/components/PricingCard.tsx`
- Modify: `src/app/components/FAQAccordion.tsx`
- Modify: `src/app/components/BenefitItem.tsx`
- Modify: `src/app/components/StepItem.tsx`

- [ ] Product cards: catalog-only, product image dominant, no favorite clutter unless needed, red only for `Terbaru`.
- [ ] Pricing cards: 3 options max, quiet borders, one recommended emphasis, no heavy shadow/lift.
- [ ] FAQ: minimal rows/accordion, no shadow cards.
- [ ] Benefit: editorial info blocks, no icon-card spam.
- [ ] Step: timeline/editorial process rows, no cartoon card stack.

## Task 4: Homepage overhaul

**Files:**
- Modify: `src/app/pages/Home.tsx`

- [ ] Replace current hero with product-first full viewport-ish section.
- [ ] Use headline `Sewa iPhone premium, tanpa ribet.`.
- [ ] Primary CTA `Chat Admin`, secondary `Lihat Paket`.
- [ ] Create large real product image composition using current product image URLs, not placeholder box.
- [ ] Add full-bleed dark blue product showcase.
- [ ] Add refined pricing section.
- [ ] Add editorial trust/process section.
- [ ] Add restrained testimonials, FAQ, final CTA.
- [ ] Remove badges/pill clusters except real CTA/status.

## Task 5: Route overhauls

**Files:**
- Modify: `src/app/pages/Katalog.tsx`
- Modify: `src/app/pages/CaraSewa.tsx`
- Modify: `src/app/pages/Benefit.tsx`
- Modify: `src/app/pages/FAQ.tsx`

- [ ] Katalog: premium catalog, product-led, calm filters, not ecommerce clutter.
- [ ] Cara Sewa: clear process + requirements, editorial layout, WhatsApp CTA.
- [ ] Benefit: text-led trust story with a few strong sections, no card grid spam.
- [ ] FAQ: full FAQ with quiet help CTA.

## Task 6: Build and browser QA

**Files:**
- No code files unless QA finds visual issues.

- [ ] Run `npm run build`; fix errors.
- [ ] Run dev server.
- [ ] Inspect desktop width.
- [ ] Inspect tablet width.
- [ ] Inspect mobile width.
- [ ] Check nav, CTAs, FAQ, all routes.
- [ ] Polish after browser inspection.
- [ ] Re-run build.

## Self-review

Spec coverage: all sections mapped to tasks.
Placeholder scan: no TBD/TODO placeholders.
Type consistency: existing component names/routes preserved.
