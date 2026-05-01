# Gyanguard — Women's Health Cycle Tracker

> Static prototype · Mobile-first · No backend

A polished React/TypeScript demo app for the Gyanguard women's health product — menstrual cycle tracking with privacy-first design, daily logging, pattern insights, and an optional shared support feature.

---

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** — custom warm autumn design system
- **Lucide React** — icon library
- No backend, no API calls — all mock data

---

## Local development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# Opens at http://localhost:5173
```

## Build for production

```bash
npm run build
# Output: dist/

# Preview production build
npm run preview
```

## Docker (nginx static serve)

```bash
# Build image
docker build -t gyanguard-demo .

# Run on port 3000
docker run -p 3000:80 gyanguard-demo

# Open http://localhost:3000
```

---

## App screens

| Screen | Route/State | Description |
|--------|------------|-------------|
| Onboarding | Initial load | 4-slide walkthrough, skip option |
| Home | `home` | Dashboard — cycle arc, next period, energy, insights |
| Daily Log | `checkin` | 4-step flow: flow → mood → symptoms → notes |
| Calendar | `calendar` | Month view, predicted period/fertile window, stats |
| Insights | `insights` | Mood chart, symptom frequency, pattern cards |
| Shared Support | `partner` | Partner view settings + mock partner card preview |
| Profile | `profile` | Cycle settings, privacy controls, data export |

---

## Deployment

Intended to be served at: **gyna.apps.highpeak.co.za**

The Dockerfile builds and serves the `dist/` via nginx with SPA routing, gzip, and standard security headers.

---

## Notes

- All data is mock / in-memory — nothing is persisted
- Tailwind config includes full `warm`, `rust`, `sienna`, `sage` colour tokens
- Google Fonts (Inter + Playfair Display) loaded from CDN — works offline if fonts are cached
