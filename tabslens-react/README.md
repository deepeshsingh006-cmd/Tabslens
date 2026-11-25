# Tabslens (React + Vite)

Medicine price comparison app — minor project.

## Run
    npm install
    npm run dev

## Features
- Search by medicine name or salt; category filters
- Price comparison ranked cheapest-first, with "save up to ₹X" summary
- Generic alternatives (same salt) with savings
- Medicines page: search, category filter, price sort, favorites filter
- Mock login; favorites saved per user (localStorage)
- Recently viewed searches
- Data in `src/medicines.json` — edit it by hand to add medicines
  (keys: name, salt, cat, pack, prices; cat = Tablets | Capsules | Syrups | Injections)

## Deploy
Push to GitHub, import the repo in Vercel (Vite is auto-detected).
