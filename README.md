# YB Visuals

Premium Next.js website for YB Visuals, a restaurant photography and creative media business.

## Features

- Editorial home page with service, process, featured work, visual strategy, and contact sections.
- Interactive portfolio with filters, hover details, animated modal lightbox, and motion effects.
- About page with Henry Yim and Madhava Bhadriraju headshots from `public/photos`.
- Payments page with Stripe Checkout and Venmo alternate payment option.
- Contact API route using SMTP/Nodemailer and sending to:
  - `madhbhad@gmail.com`
  - `henryyimbusiness@gmail.com`

## Setup

Install dependencies:

```bash
npm install
```

Copy environment examples:

```bash
cp .env.example .env.local
```

Set real values in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_replace_me
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=replace@example.com
SMTP_PASS=replace-with-app-password
SMTP_FROM="YB Visuals <replace@example.com>"
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes

- Never commit `.env.local` or private API keys.
- Stripe is handled in `app/api/stripe/checkout/route.ts`.
- Contact email is handled in `app/api/contact/route.ts`.
- Visual rules live in `DESIGN.md`.
