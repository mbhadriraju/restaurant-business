# Design System - YB Visuals

## Product Context
- **What this is:** Premium website for YB Visuals, a restaurant photography and creative media business.
- **Who it's for:** Restaurant owners, operators, hospitality teams, and marketing leads who need stronger visual presence.
- **Space/industry:** Restaurant photography, food photography, hospitality content, brand visuals, and creative media.
- **Project type:** Editorial marketing site with portfolio, contact, and payment flows.

## Aesthetic Direction
- **Direction:** Luxury editorial with Lo-Fi hospitality texture.
- **Decoration level:** Intentional. Photography, warm paper surfaces, brass rules, and contact-sheet rhythm carry the brand.
- **Mood:** Premium, confident, cinematic, and restaurant-aware. The site should feel like a high-end creative studio serving hospitality brands.

## Typography
- **Display/Hero:** Cormorant Garamond. Elegant, editorial, high-contrast, and distinctive enough to define the brand.
- **Body:** Manrope. Clean and modern without feeling like a generic SaaS default.
- **UI/Labels:** Manrope with wide tracking for restrained luxury labels.
- **Data/Tables:** Manrope with tabular numerics where needed.
- **Code:** System monospace for developer-facing snippets only.
- **Loading:** `next/font/google` self-hosted font optimization.
- **Scale:** Hero uses clamp-based editorial sizing; section titles use `clamp(3rem, 7vw, 7rem)`; body text uses 1rem to 1.25rem with generous line height.

## Color
- **Approach:** Restrained. Deep warm black and warm paper dominate; brass is rare and meaningful.
- **Primary:** `#0B0C0A` warm black for premium depth, nav, heroes, and section contrast.
- **Secondary:** `#BE9A5C` muted brass for calls to action, rules, and active states.
- **Neutrals:** `#EDE4CF` paper, `#D8CFBD` warm gray, `#20201C` charcoal.
- **Semantic:** success `#526344`, warning `#BE9A5C`, error `#9B4A31`, info `#20201C`.
- **Dark mode:** The site is intentionally directed rather than theme-switched. Dark sections use warm black; light sections use warm paper.

## Spacing
- **Base unit:** 4px.
- **Density:** Spacious.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64), with larger editorial section padding via `clamp(5rem, 10vw, 9rem)`.

## Layout
- **Approach:** Creative-editorial.
- **Grid:** Mobile single column; tablet two columns; desktop asymmetric editorial grids up to 4 columns.
- **Max content width:** 1500px.
- **Border radius:** Sharp. Default 0px. Rounded corners are avoided unless a future component has a strong usability reason.

## Motion
- **Approach:** Intentional cinematic motion.
- **Easing:** Custom cubic bezier `[0.22, 1, 0.36, 1]` for refined entrances and movement.
- **Duration:** micro(150-220ms), short(260-450ms), medium(550-780ms), long for hero word stagger and parallax.
- **Patterns:** Staggered hero text, scroll reveal, parallax image blocks, hover image zooms, cursor-follow portfolio labels, and animated lightbox transitions.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-25 | Initial design system created | Built for a premium restaurant creative media brand with image-forward editorial positioning. |
