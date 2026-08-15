# DESIGN.md — Portfolio v2 Design System

> Single source of truth for the `/v2` rebuild. When code and this file disagree, this file
> wins — or we change this file first, then the code. Nothing ships that this document doesn't
> justify.

---

## 0. The one-sentence brief

**An editorial, near-black portfolio where high-contrast serif headings meet plain sans body —
restrained in color, generous in whitespace, carrying its personality in three real widgets
(a Photo Booth webcam, a live GitHub contribution heatmap, a terminal-flavored nav) rather than
in decoration.**

Reference DNA: [ayushworks.com](https://ayushworks.com) (Shydev). We steal its *structure and
type system*, not its voice, not its copy, not its numbers.

Audience: **recruiters and hiring managers.** Every choice answers "does this help someone
decide to interview Monis?" If it only looks cool, it's suspect.

---

## 1. Non-negotiable principles

1. **Substance before decoration.** No animation, gradient, glow, or widget exists unless it
   carries real information. The old site read "vibe coded" because motion and badges were
   applied uniformly regardless of whether the content underneath was real. Never again.
2. **No hallucinated content, ever.** No invented company names, dates, metrics, follower
   counts, or claims. Where real data is missing, a visible `TODO` placeholder shows in dev and
   is **filtered out of production** — half-filled config can never ship as blank truth.
   (`showPlaceholders = process.env.NODE_ENV !== "production"`.)
3. **Color is a scalpel, not a bucket.** The palette is black / white / gray. Emphasis is a few
   **bold-white** words inside gray paragraphs — not a highlight color. `--brand` (red) and
   `--positive` (green) exist but are reserved for deliberate, rare use (open-to-work status).
4. **One entrance, then stillness.** A single, quiet rise-in on load (`v2-rise` keyframe),
   guarded by `prefers-reduced-motion`. No scroll-jacking, no per-element stagger, no parallax.
5. **Real data or no widget.** The heatmap pulls real GitHub contributions. The Photo Booth uses
   a real photo of Monis. If the data isn't there, the widget doesn't render.

---

## 2. Type system — the whole aesthetic

The serif-vs-sans tension on black *is* the design. Get this right and 80% of the work is done.

| Role | Family | Usage |
|------|--------|-------|
| **Display / headings** | **Instrument Serif** (Google Fonts, via `next/font`) | H1 name, section headings ("Featured Projects", "Get in Touch"), project titles, blog titles. Thin, high-contrast, editorial. Used at large sizes; never for anything below ~20px. |
| **Body / UI** | **Geist Sans** (already in project; Inter-equivalent) | Paragraphs, nav labels, buttons, form fields, all small text. |
| **Mono** | **Geist Mono** (already in project) | Tech stacks (`Next.js / Tailwind CSS`), the `$whoami` nav mark, code, dates/read-time metadata. |

**Rules**
- Instrument Serif ships one weight (400) + italic. Do **not** fake bold — use size and color
  for hierarchy. Its italic is beautiful; use it for accents sparingly.
- Headings sit tight: `leading-[1.05]`, slight negative letter-spacing on the largest sizes.
- Body: Inter at `15px`, `leading-relaxed`, muted-gray color. Emphasis = `font-medium` +
  foreground white on a few words only.
- The `$whoami` nav item and tech-stack strings are mono — this is the "terminal-flavored"
  signal. Keep it to those two places; don't mono-soup the whole site.

**Type scale** (fluid, clamp-based; these are the anchors)
- H1 (name): ~`clamp(2.5rem, 6vw, 4rem)`, serif
- Section heading: ~`clamp(1.5rem, 3vw, 2rem)`, serif
- Project / blog title: ~`1.5rem`, serif
- Body: `15px` / `0.9375rem`, sans
- Meta (date, read-time, tech): `13px`, mono, muted

---

## 3. Color tokens

Near-black canvas, layered surfaces, near-white ink. All scoped under `.v2` (do not touch v1
`:root`). Dark is canonical; a light variant is maintained but secondary.

```
Surfaces (dark, canonical)
--bg-base        near-black page background      (~oklch(0.12 0 0) / #0a0a0a)
--bg-subtle      slightly raised (cards, wells)
--bg-elevated    widget frames, popovers
--bg-overlay     modals / floating panels

Ink
--fg             near-white primary text         (~oklch(0.97 0 0))
--fg-muted       gray secondary text             (~oklch(0.72 0 0))
--fg-subtle      faint tertiary (meta, borders-as-text)

Lines
--border         hairline dividers               (low-alpha white)
--border-strong  input borders, focus baseline

Reserved accents (rare, deliberate)
--brand          red    — used almost never; a single deliberate accent at most
--positive       green  — open-to-work status dot ONLY
--ring           focus ring (visible, accessible)
```

- Contrast floor: body text ≥ 4.5:1 on its background; large headings ≥ 3:1. Verify with
  Playwright screenshots, not by eye.
- Emphasis inside paragraphs = `--fg` (white) against `--fg-muted` (gray) body. That contrast
  step *is* the highlight. No colored highlight.

---

## 4. Layout & spacing

- **Content width:** `--content-max` ≈ `44rem` (narrow, editorial column). Hero and heatmap may
  break wider; project grid is 2-up on desktop, 1-up on mobile.
- **Section rhythm:** `--section-y` = `4rem` mobile / `6rem` desktop between sections.
- **Horizontal padding:** `px-5 sm:px-6`.
- **Dividers over boxes:** sections and list items separate with hairline rules and space, not
  boxed cards. Projects are hairline-divided entries, not floating cards.
- **8px spacing grid.** Stick to multiples; no magic numbers.

---

## 5. Page structure (top → bottom)

1. **Nav** — sticky, backdrop-blur, near-black. Left: `$whoami` mono mark (or shortName). Right:
   Work · Experience · About · Contact + Resume. Active link underlined. Terminal flavor lives
   here.
2. **Hero** — two columns on desktop:
   - Left: name as H1 (serif, no "Hi, I'm"), one-line role, a strong 2–3 sentence intro
     paragraph (sans, gray, with 3–4 bold-white emphasis words). Open-to-work line with green
     dot. Primary "Resume" + secondary "Book a call". Social icons row.
   - Right: **Photo Booth webcam widget** — a macOS-Photo-Booth-framed real photo of Monis with
     a thumbnail strip. Playful, personal, real. Degrades to a plain framed photo if the widget
     is overkill on mobile.
   - **No stat-brag line.** (Decided: no "15+ hackathons / 42K followers".) Proof-of-work comes
     from the heatmap and real projects, not self-reported numbers.
3. **GitHub contribution heatmap** — full-column, real data ("N contributions in <year>"). This
   is the proof-of-work centerpiece. Never fabricated; if the API fails, it doesn't render.
4. **Featured Projects** — 2-up grid. Each: browser-framed screenshot, serif title, mono
   tech-stack line, one-sentence summary, real Live / Repo links. Only real, shipped work.
5. **Experience** — role · org · period list; org links out when real. Education as a separate
   sub-list. Incomplete entries hidden in production.
6. **About** — 3–4 sentences in Monis's own voice + one line only he would write.
7. **Contact** — serif "Get in Touch", short blurb, form (email + message), email + book-a-call
   fallback, social icons.
8. **Footer** — quiet: "© <year> · Monis", small links (RSS/Sitemap optional).

---

## 6. Motion

- **One** entrance: `v2-rise` (subtle translateY + fade) on first paint, short duration, ease-out.
- Hover states: opacity/underline transitions only, ≤150ms.
- Everything wrapped by `@media (prefers-reduced-motion: reduce)` → no transform, instant.
- **Banned:** scroll-triggered staggers, parallax, marquees, typewriter effects, cursor
  followers, framer-motion-on-everything (the original "vibe coded" tell).

---

## 7. The three personality widgets — data contracts

These are the distinctive elements. Each has a **real-data-or-nothing** rule.

- **Photo Booth (hero):** real photo(s) of Monis in `public/`. Frame is CSS chrome; the content
  is a genuine image. No stock, no AI face.
- **Contribution heatmap:** fetched from GitHub (public contributions for username `MonisMS`).
  Server-side fetch, cached. Shows real count + real cells. On fetch failure → render nothing,
  never a fake grid.
- **Terminal nav (`$whoami`):** purely a type/label treatment (mono `$whoami`). No fake shell.

---

## 8. Accessibility floor

- All interactive elements are real `<a>`/`<button>` with visible focus rings (`--ring`), ≥40px
  hit targets, `aria-label` on icon-only controls.
- Images have real `alt`. Decorative frames are `aria-hidden`.
- Color never the sole signal (open-to-work dot is paired with text).
- Keyboard-navigable end to end; verify tab order matches visual order.

---

## 9. Scaffolding & cutover

- Everything lives under `/v2` (route) and `.v2` (CSS scope) during the rebuild so v1 keeps
  working. `NavbarGate` hides the v1 navbar on `/v2`.
- Base path is a **single constant** — `/v2` is never hardcoded in nav/config so cutover is a
  one-line change.
- **Cutover** = move `components/v2/*` → `components/*`, `app/v2/page.tsx` → `app/page.tsx`,
  delete v1 sections + `navbar-gate`, move `.v2` scope to `<body>`, drop `/v2` from all URLs.
  Final URLs: `m0nis.com/`, `m0nis.com/projects/<slug>`. Only code touchpoints for the domain:
  `site.url` + `metadataBase`.

---

## 10. Definition of done (per section)

A section is done when: (1) it renders correct in dark **and** light via Playwright screenshot,
(2) it holds only real or `TODO`-guarded content, (3) it passes tsc + eslint, (4) keyboard +
reduced-motion verified, (5) it looks like it belongs to the same system as every other section.
