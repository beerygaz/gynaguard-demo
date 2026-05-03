## 1. Tailwind Config & Fonts

- [x] 1.1 Replace all custom colour tokens in `tailwind.config.js` with the `gg` namespace (GGPink, GGPinkDark, GGPinkMid, GGBlush, GGPaleBlush, GGTurquoise, GGTealLight, GGGrey) per `docs/brand.md`
- [x] 1.2 Replace `fontFamily.sans` (Inter) and `fontFamily.display` (Playfair Display) with Montserrat in `tailwind.config.js`
- [x] 1.3 Update Google Fonts link in `index.html` to load Montserrat weights 300–700 only
- [x] 1.4 Update `<meta name="theme-color">` in `index.html` to `#e9608a`

## 2. Global Styles & Utilities

- [x] 2.1 Replace the `gradient-rust` custom utility (in `src/index.css` or equivalent) with a `gradient-gg-pink` utility (`from-gg-pink to-gg-pink-dark`)
- [x] 2.2 Update the root `body` background class to `bg-gg-pale-blush` and default text to `text-gg-grey`

## 3. Component Token Replacement

- [x] 3.1 Update `OnboardingScreen.tsx` — replace all `warm-*`, `rust-*`, `sienna-*`, `sage-*`, `amber-*` classes with GG equivalents
- [x] 3.2 Update `HomeScreen.tsx` — replace all legacy colour tokens
- [x] 3.3 Update `DailyLogScreen.tsx` (or checkin screen) — replace all legacy colour tokens
- [x] 3.4 Update `CalendarScreen.tsx` — replace all legacy colour tokens
- [x] 3.5 Update `InsightsScreen.tsx` — replace all legacy colour tokens
- [x] 3.6 Update `PartnerScreen.tsx` (shared support screen) — replace all legacy colour tokens
- [x] 3.7 Update `ProfileScreen.tsx` — replace all legacy colour tokens
- [x] 3.8 Update any shared/layout components (nav bar, tab bar, cards) — replace all legacy colour tokens

## 4. Verification

- [x] 4.1 Search codebase for residual `warm-`, `rust-`, `sienna-`, `sage-`, `cream-`, `amber-` class references and confirm zero matches
- [x] 4.2 Run `npm run build` and confirm no errors
- [x] 4.3 Visually review each screen in the browser and confirm light pink/teal brand appearance
