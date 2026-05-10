# Premium iPhone Rental Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a homepage-first premium iPhone rental website synchronized with the Figma mobile app design DNA while preserving existing routes.

**Architecture:** Keep the current React/Vite/Tailwind app and route structure. Refactor the homepage into focused reusable sections, update shared tokens/components, then make secondary routes reuse the same visual language without deleting navigation paths.

**Tech Stack:** React 18, Vite, Tailwind CSS v4, motion/react, lucide-react, react-router, shadcn/Radix UI accordion/card/button/tabs/carousel primitives, Magic MCP-inspired section patterns converted to local styling.

---

## File structure

- Modify: `src/styles/index.css` — global design tokens, typography, shadows, background, motion helpers.
- Modify: `src/app/components/Button.tsx` — brand-consistent variants and hover states.
- Modify: `src/app/components/Navbar.tsx` — premium sticky nav and mobile menu polish.
- Modify: `src/app/components/Footer.tsx` — branded footer consistency.
- Modify: `src/app/components/FAQAccordion.tsx` — shadcn accordion restyle.
- Modify: `src/app/components/PricingCard.tsx` — package card polish.
- Modify: `src/app/components/ProductCard.tsx` — product card polish for catalog/secondary use.
- Modify: `src/app/components/FeaturedProduct.tsx` — featured model block.
- Modify: `src/app/components/BenefitItem.tsx` — benefit item restyle.
- Modify: `src/app/components/StepItem.tsx` — how-it-works item restyle.
- Modify: `src/app/pages/Home.tsx` — primary homepage landing page sections.
- Modify: `src/app/pages/Katalog.tsx` — secondary route consistency.
- Modify: `src/app/pages/CaraSewa.tsx` — secondary route consistency.
- Modify: `src/app/pages/Benefit.tsx` — secondary route consistency.
- Modify: `src/app/pages/FAQ.tsx` — secondary route consistency.
- Modify: `src/app/data/products.ts` — product metadata if needed for showcase labels/prices.
- Modify: `src/app/data/faqs.ts` — rental-specific FAQ copy.

---

### Task 1: Strengthen global visual tokens

**Files:**
- Modify: `src/styles/index.css`

- [ ] **Step 1: Read current stylesheet**

Use `Read` on `src/styles/index.css` before editing.

- [ ] **Step 2: Update token block**

Ensure these CSS custom properties exist under `:root` and update existing duplicates rather than adding competing token names:

```css
:root {
  --rp-deep: #354d70;
  --rp-start: #396687;
  --rp-end: #31385c;
  --rp-bg: #f7f9fb;
  --rp-surface: #ffffff;
  --rp-text: #222222;
  --rp-muted: #8e9299;
  --rp-border: #e8ecf1;
  --rp-red: #db3022;
  --rp-green: #2f9d68;
  --rp-radius-button: 14px;
  --rp-radius-chip: 20px;
  --rp-radius-card: 28px;
  --rp-radius-hero: 36px;
  --rp-shadow-soft: 0 18px 50px rgba(53, 77, 112, 0.10);
  --rp-shadow-card: 0 22px 60px rgba(211, 209, 216, 0.24);
  --rp-shadow-product: 0 34px 90px rgba(49, 56, 92, 0.28);
}
```

- [ ] **Step 3: Add shared utility classes**

Add or update these utilities:

```css
.rp-grad-bg {
  background: linear-gradient(135deg, var(--rp-start) 22%, var(--rp-end) 86%);
}

.rp-card-shadow {
  box-shadow: var(--rp-shadow-card);
}

.rp-soft-panel {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(232, 236, 241, 0.78);
  box-shadow: var(--rp-shadow-soft);
  backdrop-filter: blur(18px);
}

.rp-section {
  padding-block: clamp(72px, 8vw, 128px);
}

.rp-floating {
  animation: rp-float 7s ease-in-out infinite;
}

@keyframes rp-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -10px, 0); }
}
```

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 2: Polish shared buttons and navigation

**Files:**
- Modify: `src/app/components/Button.tsx`
- Modify: `src/app/components/Navbar.tsx`
- Modify: `src/app/components/Footer.tsx`

- [ ] **Step 1: Read files**

Use `Read` on each file before editing.

- [ ] **Step 2: Update button variants**

Make primary buttons use deep-blue gradient, 14px radius, soft shadow, hover lift. Secondary buttons use white card surface with border and deep-blue text. Ghost buttons stay quiet.

Primary button class target:

```tsx
"rp-grad-bg text-white shadow-[0_14px_34px_rgba(53,77,112,0.28)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(53,77,112,0.34)]"
```

Secondary button class target:

```tsx
"bg-white text-[var(--rp-deep)] border border-[var(--rp-border)] shadow-[0_10px_26px_rgba(53,77,112,0.08)] hover:bg-[var(--rp-bg)] hover:-translate-y-0.5"
```

- [ ] **Step 3: Update navbar**

Keep `links` and routing. Adjust brand to feel rental-specific:

```tsx
<span className="font-heading text-[18px] tracking-tight" style={{ fontWeight: 700 }}>
  Sewa iPhone Riri
</span>
```

Use sticky glass header when scrolled, soft blue active nav pills, primary CTA text `Cek Paket Sewa`, secondary `Katalog` or `Masuk` only if already present.

- [ ] **Step 4: Update footer**

Footer should show brand info, nav links, contact, service area. Keep simple and aligned with tokens.

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 3: Refactor homepage hero

**Files:**
- Modify: `src/app/pages/Home.tsx`

- [ ] **Step 1: Read `Home.tsx`**

Use `Read` before editing.

- [ ] **Step 2: Replace generic hero copy**

Hero headline should clearly communicate iPhone rental:

```tsx
<h1 className="mt-8 font-heading text-[44px] sm:text-[58px] lg:text-[76px] leading-[0.98] tracking-[-0.055em] text-[var(--rp-text)]" style={{ fontWeight: 700 }}>
  Sewa iPhone premium tanpa beli unit baru.
</h1>
```

Hero subcopy:

```tsx
<p className="mt-6 max-w-xl text-[16px] sm:text-[18px] leading-[1.8] text-[var(--rp-muted)]">
  Pilih iPhone original siap pakai untuk event, konten, kerja, atau perjalanan. Durasi fleksibel, kondisi dicek, deposit jelas, respons cepat.
</p>
```

Primary CTA: `Mulai Sewa iPhone`. Secondary CTA: `Lihat Model Tersedia`.

- [ ] **Step 3: Add rental trust chips**

Add three hero chips near copy:

```tsx
{[
  "Unit original & dicek",
  "Deposit transparan",
  "Harian, mingguan, bulanan",
].map((item) => (
  <span key={item} className="rounded-full border border-[var(--rp-border)] bg-white/80 px-4 py-2 text-[13px] text-[var(--rp-deep)] shadow-[0_8px_24px_rgba(53,77,112,0.08)]">
    {item}
  </span>
))}
```

- [ ] **Step 4: Build hero visual composition**

Use existing `HERO_IMG` or Figma/product image constants already in file. Composition must include:
- deep-blue rounded hero panel,
- large iPhone/product image,
- floating availability card,
- floating featured model price card,
- subtle `rp-floating` class on image wrapper.

- [ ] **Step 5: Remove fake avatars**

Delete `i.pravatar.cc` avatar row. Replace with text metrics:

```tsx
{[
  ["4.9/5", "rating pelanggan"],
  ["24+", "unit aktif"],
  ["15 menit", "respon rata-rata"],
].map(([value, label]) => (...))}
```

- [ ] **Step 6: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 4: Replace product grid with editorial showcase

**Files:**
- Modify: `src/app/pages/Home.tsx`
- Modify: `src/app/components/ProductCard.tsx`
- Modify: `src/app/components/FeaturedProduct.tsx`

- [ ] **Step 1: Read files**

Use `Read` on all three files before editing.

- [ ] **Step 2: Create asymmetric showcase section inside `Home.tsx`**

Replace catalog preview grid on homepage with:
- left large feature panel using `products[0]`,
- right two stacked model cards using `products[1]` and `products[2]`,
- bottom horizontal chips for series/pricing.

Use section title:

```tsx
<SectionHeading
  eyebrow="Model tersedia"
  title="Pilih iPhone sesuai kebutuhan sewa"
  description="Dari flagship terbaru untuk konten hingga seri hemat untuk kebutuhan harian. Semua unit dicek sebelum dikirim."
/>
```

- [ ] **Step 3: Keep `ProductCard` for catalog routes**

Update `ProductCard` styling only; do not remove it. Make catalog cards softer and branded with red badge only when `product.badge` exists.

- [ ] **Step 4: Update `FeaturedProduct`**

Make featured product a premium editorial panel: deep-blue gradient side, image area, price/duration/deposit notes, CTA.

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 5: Redesign packages, benefits, how-it-works

**Files:**
- Modify: `src/app/components/PricingCard.tsx`
- Modify: `src/app/components/BenefitItem.tsx`
- Modify: `src/app/components/StepItem.tsx`
- Modify: `src/app/pages/Home.tsx`

- [ ] **Step 1: Read files**

Use `Read` on all files before editing.

- [ ] **Step 2: Polish package cards**

Package cards should have:
- daily/weekly/monthly labels,
- weekly recommended state,
- price per day,
- small deposit/support note,
- primary CTA.

Recommended card uses `rp-grad-bg`; non-recommended cards use white surface and border.

- [ ] **Step 3: Rework benefits section**

Use an editorial split:
- left: short trust copy and gradient mini-panel,
- right: 6 compact branded benefits in 2-column grid.

Benefit copy:
- Unit original,
- Kondisi bersih,
- Durasi fleksibel,
- Proses mudah,
- Respon cepat,
- Layanan terpercaya.

- [ ] **Step 4: Rework how-it-works**

Desktop: horizontal timeline/numbered cards. Mobile: stacked cards. Four steps:
1. Pilih model.
2. Tentukan durasi & deposit.
3. Konfirmasi pembayaran.
4. Ambil/antar, pakai, kembalikan.

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 6: Customize FAQ, testimonials, final CTA

**Files:**
- Modify: `src/app/components/FAQAccordion.tsx`
- Modify: `src/app/data/faqs.ts`
- Modify: `src/app/pages/Home.tsx`

- [ ] **Step 1: Read files**

Use `Read` on all files before editing.

- [ ] **Step 2: Update FAQ copy**

Include questions about:
- rental duration,
- deposit,
- requirements,
- damage,
- delivery/pickup,
- payment,
- late return.

- [ ] **Step 3: Restyle FAQ accordion**

Use shadcn accordion but customize wrapper/item trigger/content to soft cards, deep-blue active/hover, no default look.

- [ ] **Step 4: Add text-first testimonials**

Use no stock avatars. Add 3 cards with local-style copy, role/use case, rating text, soft borders.

- [ ] **Step 5: Update final CTA**

Final CTA: deep-blue gradient panel with product/deposit reassurance and CTA `Cek Paket Sewa` + secondary `Chat Admin`.

- [ ] **Step 6: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 7: Keep secondary routes visually consistent

**Files:**
- Modify: `src/app/pages/Katalog.tsx`
- Modify: `src/app/pages/CaraSewa.tsx`
- Modify: `src/app/pages/Benefit.tsx`
- Modify: `src/app/pages/FAQ.tsx`

- [ ] **Step 1: Read files**

Use `Read` on all route files before editing.

- [ ] **Step 2: Apply shared route hero treatment**

Each route should start with a soft blue/white title panel using same tokens, section spacing, and shared cards.

- [ ] **Step 3: Remove disconnected generic styling**

Replace any mismatched colors, random gradients, or default card styles with `rp-soft-panel`, `rp-card-shadow`, and shared token colors.

- [ ] **Step 4: Preserve route behavior**

Do not delete routes. Keep links and page exports unchanged.

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: Vite build succeeds.

---

### Task 8: Browser QA and final polish

**Files:**
- Modify only files that fail visual/functional checks.

- [ ] **Step 1: Start dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite reports local URL.

- [ ] **Step 2: Inspect desktop**

Open homepage at desktop width. Check:
- hero clearly says iPhone rental,
- hero image/product composition strong,
- no generic avatar/template visuals,
- product showcase asymmetric,
- blue brand dominant,
- motion subtle.

- [ ] **Step 3: Inspect tablet**

Check around 768–1024px. Ensure no overlapping hero cards, readable headings, usable nav/menu.

- [ ] **Step 4: Inspect mobile**

Check around 390px. Ensure page feels inspired by Figma mobile identity, not copied. Cards stack cleanly. CTA visible.

- [ ] **Step 5: Accessibility basics**

Check keyboard access for nav/mobile menu/FAQ. Ensure buttons have accessible labels where icon-only.

- [ ] **Step 6: Final build**

Run: `npm run build`

Expected: Vite build succeeds.

- [ ] **Step 7: Register edits**

Call `register_edit` for all modified files with `reindex: true`.

---

## Self-review

Spec coverage:
- Homepage-first premium editorial redesign: Tasks 3–6.
- Figma DNA tokens: Task 1.
- shadcn FAQ/card/button primitives customized: Tasks 2, 5, 6.
- Magic MCP inspiration converted, no defaults: Tasks 3–6.
- Product visual quality/asymmetric showcase: Tasks 3–4.
- Secondary routes preserved: Task 7.
- Browser QA/responsive/accessibility/build: Task 8.

Placeholder scan: no TBD/TODO/implement-later placeholders.

Type consistency: all named files and components exist in current repo index.
