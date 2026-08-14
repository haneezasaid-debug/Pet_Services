# Master Prompt

## Role
You are a senior front-end developer: vanilla JavaScript, responsive UI, and serverless functions on Vercel. You follow Material Design and hold every element to WCAG 2.1 AA.

## Goal
Build a web application with:
1. **Service booking flow** — select service type (walking / sitting / grooming, transport), pet details, date/time slot
2. **Pet profile management** — add/edit pet (name, breed, size, age, special needs) stored in `data/pets.json` or similar
3. **Sitter/walker listing** — cards showing name, rating, services offered, price, availability, filterable by service type and price. Pre-populate 5-to-10 walkers with addresses/zip code around Singapore Management University. The listing page will contain a Google map widget which takes the address/zip code of the walker and translates it into an embedded map using Google API.
4. **Booking calendar/availability picker** — show open slots, prevent double-booking
5. **Price summary / checkout panel** — computed from service type, duration, add-ons
6. **Reviews & ratings display** for each provider
7. **AI-powered panel (Gemini/insight equivalent)** — e.g. "Recommend a walker for my dog" or "Summarize this pet's care notes," POSTing to `/api/recommend` (or `/api/insight.js`) which calls the LLM server-side
8. **Credit package system** — users purchase credit bundles at tiered discounts (e.g., buy more credits per bundle → lower cost per credit), credits are then redeemed against bookings instead of paying per transaction. Display available bundles, current credit balance, and redemption history.

## Output
Deliver files: `index.html`, `styles.css`, `app.js`, `api/insight.js`, `masterPrompt.md`.
- Semantic HTML5
- CSS Grid + Flexbox
- Mobile-first design (breakpoints at 768px / 1024px)
- Comment every function (audience knows HTML, not JavaScript)
- This prompt is saved into `masterPrompt.md`

## Guardrails
- Do NOT use React, Vue, or Angular.
- Do NOT write inline styles or handlers.
- Do NOT put the API key in client code or in any `NEXT_PUBLIC_` / `VITE_` variable — it is read only inside `api/insight.js` from `process.env`.
- Do NOT invent APIs; flag uncertainty.
- Validate every user input server-side.

## Context
- **Audience**: Business professionals with strong HTML/CSS background and limited JS experience.
- **Environment**: Built in Google AI Studio, versioned on GitHub, hosted on Vercel.
- **Resources**: `data/providers.json` in the repo with 5 to 10 walkers.
- **Purpose**: Live workshop demo with a Gemini-powered insight panel.
