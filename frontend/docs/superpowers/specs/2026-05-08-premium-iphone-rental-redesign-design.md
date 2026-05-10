# Premium iPhone Rental Redesign Design

## Goal
Refactor the current website into a homepage-first premium iPhone rental landing page that is synchronized with the Figma mobile app identity without copying its mobile layout.

## Source of truth
Figma node `18:18508` is the visual identity source: deep blue gradient, clean white cards, soft gray surfaces, pill search, rounded category/product cards, subtle shadows, red `Terbaru` accent, product-first hierarchy, and approachable mobile-commerce mood.

## Existing website audit
- Current homepage has a better structure than the raw Figma export, but still reads as a generic SaaS/product landing page in places.
- Hero copy and trust avatars feel startup-template rather than iPhone-rental specific.
- Product section uses repeated equal cards, making the page feel like a catalog grid instead of an editorial premium showcase.
- Pricing cards and benefit cards are functional but too uniform.
- Social proof should be text-first and rental-specific; avoid fake-looking avatars.
- Secondary routes should remain functional and share the same visual system.

## Visual system
- Colors: deep blue `#354d70`, gradient `#396687 → #31385c`, background `#f7f9fb`, white surfaces, text `#222222`, muted `#8e9299`, border `#e8ecf1`, red accent `#db3022`.
- Typography: Poppins/Inter-like direction; stronger editorial headings on desktop, soft readable scale on mobile.
- Radius: 14px buttons, 20px chips/search, 28px cards, 36px hero/product panels.
- Shadows: soft gray-blue card shadow, stronger product/hero depth, no neon glow.
- Motion: scroll reveal, hover lift, subtle image floating, button micro-interactions only.

## Homepage architecture
- Navbar: branded sticky glass desktop nav with CTA; mobile menu preserved.
- Hero: iPhone-rental-specific message, visible available-model/deposit/condition proof, simple CTA, strong device/product visual composition.
- Product showcase: asymmetric editorial layout with one featured model, smaller support models, model chips, badges, prices, durations.
- Rental packages: daily, weekly, monthly cards; weekly highlighted as recommended.
- Why rent here: branded editorial benefits, not generic template icon grid.
- How it works: simple horizontal desktop flow; stacked mobile flow.
- Testimonials: text-first local rental proof, no generic avatars.
- FAQ: shadcn accordion customized to soft card/pill style.
- Final CTA/Footer: deep-blue branded close, clean contact/nav/footer.

## Components and libraries
- Preserve React/Vite/Tailwind setup and existing route structure.
- Use existing shadcn components (`accordion`, `card`, `button`, `carousel/tabs` patterns) where useful, but restyle them fully.
- Use Magic MCP output only as premium composition inspiration, converted into project tokens and style.
- Do not leave default shadcn or Magic styling visible.

## Assets
- Prefer existing Figma/product assets first.
- If imagery is weak, create/source clean device-like visual assets that support the brand and avoid fake Apple logos.
- Product visuals must feel premium, commercial, realistic, and uncluttered.

## Routing
- Preserve `/`, `/katalog`, `/cara-sewa`, `/benefit`, `/faq`.
- Homepage quality is the priority.
- Secondary routes should reuse shared design tokens/components and remain visually consistent enough.

## Quality checks
- Run build.
- Run local dev server.
- Inspect desktop, tablet, and mobile.
- Verify spacing, typography, card polish, button states, FAQ accessibility basics, and motion restraint.
- Register edited files for index freshness.
