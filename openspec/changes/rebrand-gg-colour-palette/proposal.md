## Why

The app was built with a custom dark autumn palette unrelated to the real Gynaguard brand. Now that the correct CI has been sourced from gynaguard.co.za, the app must reflect the official colours and typography so it looks like a genuine Gynaguard product rather than a generic prototype.

## What Changes

- Replace the entire Tailwind colour token set (rust, amber, sienna, sage, cream, warm) with the official Gynaguard palette (GGPink, GGTurquoise, and supporting tones)
- Switch the dark `#1a1410` background to a light/white surface scheme matching the brand
- Replace Google Fonts Inter + Playfair Display with **Montserrat**
- Update all in-component hardcoded colour class references to use the new tokens
- Update `index.html` theme-color meta tag
- Update `tailwind.config.js` colour and font definitions

## Capabilities

### New Capabilities
- `brand-theme`: Official Gynaguard colour palette and Montserrat typography applied globally via Tailwind config and component class updates

### Modified Capabilities
<!-- none — no existing specs to delta -->

## Impact

- `tailwind.config.js` — full colour and font replacement
- `index.html` — theme-color meta, font import URL
- `src/**/*.tsx` — all components using old colour tokens updated to new tokens
- Visual appearance changes throughout (light brand palette replaces dark autumn palette)
- No API, routing, or data changes
