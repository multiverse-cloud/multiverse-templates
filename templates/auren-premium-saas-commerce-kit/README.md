# Auren Premium Platform

Auren is a production-style MERN monorepo for a premium SaaS and digital commerce brand. It combines subscription billing, ecommerce flows, CMS controls, customer and admin dashboards, and chart-ready analytics in one root project.

## Structure

- `client/`: React + Vite frontend
- `server/`: Express + MongoDB backend
- `docs/`: architecture and operational notes

## Getting Started

1. Create `server/.env` from `server/.env.example`
2. Create `client/.env` from `client/.env.example`
3. Run `npm install`
4. Run `npm run seed`
5. Run `npm run dev`

## Product Modules

- Authentication, sessions, and RBAC
- SaaS plans and subscriptions
- Product catalog, cart, wishlist, orders, and reviews
- Stripe checkout, billing records, and webhook processing
- Admin CMS for banners, testimonials, FAQ, blog, SEO, and legal content
- Customer and admin analytics dashboards

