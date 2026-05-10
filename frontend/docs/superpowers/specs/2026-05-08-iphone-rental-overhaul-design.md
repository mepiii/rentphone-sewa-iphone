# iPhone Rental Frontend Overhaul Design

## Purpose

Reset the site from generic SaaS/card-heavy UI into a premium iPhone rental product website. The experience should make the iPhone/rental offer feel refined, trustworthy, and easy to act on.

## References

- `design.md`: Apple web design philosophy — product-first layout, quiet UI, tight typography, restrained motion, open full-bleed section rhythm.
- Figma reference `vO0JRIopQyOHq4LynuIe11`, node `18:18508`: brand palette, blue gradient identity, rental product mood, red `Terbaru` status usage.

## Audience

Mixed local rental audience:

1. Students/content creators who care about budget, speed, and trust.
2. Event/travel renters who care about reliability and deposit clarity.
3. Business/professional renters who care about status, camera quality, and clear process.

The homepage should not become catalog-first. It should sell trust, present the product beautifully, explain rental clarity, then push contact.

## Primary Conversion

Priority order:

1. WhatsApp/admin contact fast.
2. Compare packages/prices.
3. Learn rental process/trust.
4. Browse catalog.

Main CTA: `Chat Admin`.
Secondary CTA: `Lihat Paket`.
Use a placeholder WhatsApp link/number that the user can replace later.

## Brand Direction

Tone: luxury calm.

The interface should feel:

- Premium.
- Quiet.
- Trustworthy.
- Product-led.
- Local-service clear, not cheap.

Avoid:

- Cute rental UI.
- Generic SaaS templates.
- Card spam.
- Decorative badge/pill clutter.
- Heavy shadows.
- Default shadcn/Magic look.
- Apple cloning or Apple branding.

## Visual System

### Color Tokens

Use these as the project identity:

- `--rp-deep: #354d70`
- `--rp-start: #396687`
- `--rp-end: #31385c`
- `--rp-bg: #f7f9fb`
- `--rp-surface: #ffffff`
- `--rp-text: #222222`
- `--rp-muted: #8e9299`
- `--rp-border: #e8ecf1`
- `--rp-red: #db3022`
- `--rp-offwhite: #f5f5f7`
- `--rp-dark-tile: #252a35`
- `--rp-dark-tile-2: #30385c`

Use blue gradient only for major brand surfaces or primary CTA emphasis. Red appears only for real `Terbaru`/urgent labels. No extra accent colors.

### Typography

Apple-like behavior, adapted to available fonts.

- Display headings: clean sans, weight 600, tight negative tracking.
- Body: around 17px, weight 400, comfortable line-height.
- Buttons/captions: 14–17px.
- Avoid 800/900-weight hero headings.
- Avoid inconsistent heading sizes.
- Avoid weak small SaaS typography.

Preferred pairing: Poppins for display if already used and polished; otherwise Inter/system for body if project stack already depends on it. Final implementation should choose what renders best in the current app without adding unnecessary font dependencies.

### Shape

- Full-bleed sections: no radius.
- Action buttons: pill radius.
- Pricing/catalog cards only: 16–20px radius.
- Avoid huge 28–36px rounded containers.
- No hero product inside rounded card.

### Shadow

- Remove shadows from navbar, buttons, benefit blocks, and most cards.
- Product imagery may use one soft product shadow.
- Depth comes from spacing, section contrast, and product composition.

### Motion

Use subtle premium motion only:

- Hero product opacity/translate reveal.
- Section reveal with small translate and opacity.
- CTA active press scale.
- No bounce.
- No excessive floating badges.
- Respect reduced motion.

## Homepage Design

### 1. Minimal Premium Navbar

Thin, quiet, translucent if useful. It should not use a pill-island nav or heavy shadow. Logo stays small. Navigation stays secondary. `Chat Admin` is the only strong nav action.

### 2. Product-First Hero

Headline:

> Sewa iPhone premium, tanpa ribet.

Subcopy should explain rental clarity in one calm line: unit original, package clear, admin responsive, deposit explained.

Hero requirements:

- Large iPhone/device visual as main focus.
- Product not trapped inside a card.
- No decorative badges like `Unit iPhone siap disewa hari ini`.
- No placeholder text-as-image.
- Primary CTA: `Chat Admin`.
- Secondary: `Lihat Paket`.
- Background: soft off-white or very subtle brand-tinted light surface.

### 3. Full-Bleed Product/Rental Showcase

Use open storytelling instead of a boring grid.

Possible structure:

- Deep blue full-bleed section.
- Oversized device visuals.
- Short copy blocks for flagship model, daily rental, content/event use.
- Use surface changes as dividers.
- Avoid repeated cards.

### 4. Package/Pricing Section

Cards are allowed here because comparison is functional.

Rules:

- 3 refined cards max.
- Clear daily/weekly/event package options.
- Quiet border, minimal shadow or none.
- Highlight recommended option with subtle border or brand surface, not loud badge clutter.
- CTA per package can route to `Chat Admin` placeholder.

### 5. Trust/Process Section

Use editorial rows or timeline-style layout, not icon-card spam.

Must cover:

- Choose iPhone/package.
- Confirm availability with admin.
- Deposit/ID/process clarity.
- Pickup/delivery.
- Return/check unit.

### 6. Testimonials/Social Proof

Restrained and believable. If content is weak, use compact quote rows rather than big cards.

### 7. FAQ

Customized minimal accordion. No heavy card shadows. Questions should reduce hesitation around deposit, pickup, duration, condition, cancellation, payment.

### 8. Final CTA

Deep blue or gradient brand surface. One headline, one calm subcopy, one `Chat Admin` CTA. No extra clutter.

## Other Routes

### Katalog

Secondary route. Should feel like premium product catalog, not generic ecommerce grid. Product cards allowed only for catalog function. Keep product images dominant and metadata quiet.

### Cara Sewa

Process-focused route. Use clear editorial steps, wide whitespace, and trust copy. Avoid cartoonish step cards.

### Benefit

Text-led trust and quality story. Avoid repetitive icon card grid. Use fewer stronger sections.

### FAQ

Consistent with homepage FAQ. Minimal, readable, conversion-supporting.

## Components To Redesign

- Global tokens/CSS.
- `Navbar`.
- `Footer`.
- `Button`.
- `SectionHeading`.
- `ProductCard`.
- `PricingCard`.
- `FAQAccordion`.
- `BenefitItem` or replacement editorial component.
- Home sections.
- Catalog layout.
- Process/trust sections.

## Current Violations To Remove

Observed issues in current code:

- Rounded/shadow-heavy benefit cards.
- Button shadows and hover lift.
- FAQ cards with heavy shadows.
- Featured product trapped in rounded gradient card.
- Navbar pill island and active pill styling.
- Logo blocks with shadow.
- Too many badges/pills.
- Hero/product sections still generic SaaS instead of product-first.

## Asset Strategy

Use existing Figma/product assets where suitable. Product imagery must look like actual device presentation, not placeholder UI. If assets are insufficient, create clean reusable image composition using available product photos/renders, with transparent/off-white presentation and soft product shadow only.

Do not misuse Apple logos or Apple branding.

## Accessibility

- Keep CTA contrast WCAG AA.
- Preserve semantic headings and links.
- Keyboard focus visible.
- Accordion accessible.
- Motion respects `prefers-reduced-motion`.
- Mobile touch targets at least 44px.

## Performance

- Avoid unnecessary animation libraries if current stack can handle motion.
- Lazy-load below-fold product imagery where possible.
- Avoid huge unoptimized remote assets.
- Keep CSS token-driven and reusable.

## Acceptance Criteria

Redesign succeeds only if:

- Site no longer looks generic SaaS/template UI.
- Cards are no longer everywhere.
- Pills/chips are only meaningful actions/status.
- Typography feels premium and Apple-like.
- Product visuals are main focus.
- Hero feels like a real iPhone/product website.
- Layout feels open, clean, calm, and elegant.
- Figma palette and blue gradient identity are preserved.
- Existing routes remain functional.
- Desktop, tablet, and mobile are visually consistent.
- Build passes.
- Browser testing verifies homepage and routes after implementation.
