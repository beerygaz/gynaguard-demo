## Context

The app was prototyped with a bespoke dark autumn theme (warm browns, rust, sienna). The official Gynaguard brand uses a light, pink-primary palette with a teal accent and Montserrat as its sole typeface. All colour tokens and font references live in `tailwind.config.js` and `index.html`; components consume them via Tailwind utility classes. The rebrand is purely visual — no logic, routing, or data changes.

Reference: `docs/brand.md`

## Goals / Non-Goals

**Goals:**
- Replace all Tailwind colour tokens with the official GG palette
- Switch from dark to light background scheme
- Replace Inter + Playfair Display with Montserrat
- Update every component that references old tokens so the UI is visually coherent

**Non-Goals:**
- Redesigning layout, navigation, or UX flows
- Adding or removing app features
- Changing any mock data or business logic
- Pixel-perfect recreation of the official website — this is a demo app

## Decisions

**1. Token naming — use `gg-*` namespace in Tailwind**
Keeps brand tokens clearly distinct from Tailwind defaults. Avoids collisions with built-ins like `pink-500`.  
Alternative considered: reuse Tailwind's `pink`/`teal` scales — rejected because custom hex values don't map cleanly to the default scale and would cause confusion.

**2. Light background scheme**
Official site is white/pale-blush background with dark text. The app's current dark scheme (`#1a1410`) is replaced with `gg-pale-blush` (`#f1ecee`) as the page background and white for card surfaces.  
Alternative: keep dark mode, apply brand colours on top — rejected because it misrepresents the brand identity.

**3. Single font: Montserrat**
Replace both Inter (body) and Playfair Display (display/headings) with Montserrat at varying weights. Montserrat's geometric forms work for both roles.  
Alternative: add a serif pairing — no evidence of a secondary font on the official site.

**4. Incremental token replacement**
Update `tailwind.config.js` first, then systematically update component class names. This makes the diff reviewable and rollback straightforward.

## Risks / Trade-offs

- **Colour contrast on light backgrounds** → Some existing text uses light-coloured classes that will disappear on a white background. Mitigation: audit each screen and ensure body text uses `gg-grey` (`#7d7d7d`) or darker.
- **Gradient utilities** → Current code uses a custom `gradient-rust` utility. This will need to be replaced with a `gradient-gg-pink` equivalent. Mitigation: define a new utility in Tailwind config or inline the gradient.
- **Playfair Display removal** → Headings currently use `font-display` (Playfair). With Montserrat only, typographic hierarchy depends on weight alone. Mitigation: use `font-bold` / `font-semibold` contrast to maintain visual hierarchy.
