## ADDED Requirements

### Requirement: Tailwind config uses official GG colour tokens
The Tailwind config SHALL define a `gg` colour namespace with the exact hex values from `docs/brand.md`, replacing all previous custom colour tokens (rust, amber, sienna, sage, cream, warm).

#### Scenario: GG colour tokens are available
- **WHEN** a developer references `gg-pink`, `gg-teal`, `gg-pale-blush`, etc. in a component
- **THEN** Tailwind generates the correct utility classes matching the brand hex values

#### Scenario: Old tokens are removed
- **WHEN** the Tailwind config is loaded
- **THEN** no `rust`, `amber` (custom), `sienna`, `sage`, `cream`, or `warm` colour tokens exist

### Requirement: App uses Montserrat as its sole typeface
The app SHALL load Montserrat (weights 300–700) from Google Fonts and configure it as both the `sans` and `display` font families in Tailwind, replacing Inter and Playfair Display.

#### Scenario: Font loads correctly
- **WHEN** the app is opened in a browser
- **THEN** all text renders in Montserrat

#### Scenario: Old fonts are removed
- **WHEN** `index.html` is inspected
- **THEN** no Google Fonts link for Inter or Playfair Display exists

### Requirement: App uses a light background scheme
The page background SHALL use `gg-pale-blush` (`#f1ecee`) and card surfaces SHALL use white (`#ffffff`), replacing the previous dark backgrounds.

#### Scenario: Page background is light
- **WHEN** any screen is rendered
- **THEN** the root background colour is `#f1ecee` or white, not a dark colour

#### Scenario: Text is legible on light backgrounds
- **WHEN** body text is rendered
- **THEN** text colour uses `gg-grey` (`#7d7d7d`) or darker to maintain contrast on light surfaces

### Requirement: All components use GG colour tokens
Every component in `src/` SHALL use only `gg-*` Tailwind classes for colour (backgrounds, text, borders, icons). No references to old token classes (e.g. `bg-warm-bg`, `text-rust-*`, `border-sienna-*`) SHALL remain.

#### Scenario: No legacy colour classes remain
- **WHEN** the source files are searched for old token class names
- **THEN** no matches are found for `warm-`, `rust-`, `sienna-`, `sage-`, `cream-`, `amber-` colour utilities

#### Scenario: Primary actions use GGPink
- **WHEN** a primary button or CTA is rendered
- **THEN** it uses `bg-gg-pink` or `text-gg-pink` as appropriate

#### Scenario: Accents use GGTurquoise
- **WHEN** an icon, badge, or highlight element is rendered
- **THEN** teal accents use `text-gg-teal` or `bg-gg-teal`

### Requirement: theme-color meta reflects the brand
The `<meta name="theme-color">` in `index.html` SHALL be updated to `#e9608a` (GGPink).

#### Scenario: Browser chrome matches brand colour on mobile
- **WHEN** the app is opened on a mobile browser
- **THEN** the browser chrome / address bar displays `#e9608a`
