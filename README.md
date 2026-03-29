# SlipMint Signals Starter

A clean starter codebase for a premium trading education and signals platform built with Next.js App Router, Prisma, Paystack, and the OpenAI Responses API.

## What is included

- Marketing homepage and pricing-ready structure
- Protected app shell for members
- Starter pages for dashboard, academy, signals, tools, referrals, account, and admin
- Prisma schema for users, subscriptions, lessons, signals, referrals, and journal entries
- Paystack payment initialization route
- Paystack callback + webhook routes to activate or deactivate premium access
- OpenAI academy assistant route using the Responses API

## Stack

- Next.js App Router
- React + TypeScript
- Prisma + PostgreSQL
- Paystack payments + webhooks
- OpenAI Responses API

## Quick start

1. Copy `.env.example` to `.env.local`
2. Install packages
   ```bash
   npm install
   ```
3. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
4. Run migrations after editing your database URL
   ```bash
   npm run prisma:migrate
   ```
5. Start dev server
   ```bash
   npm run dev
   ```

## Recommended next steps

- Add real authentication with Clerk or NextAuth
- Replace the placeholder `getCurrentUser` helper with a real session-based user lookup
- Add your Paystack public and secret keys
- Protect premium routes with actual membership checks
- Add your real academy lessons and signals in the database
- Move demo content into seeded Prisma data

## Deployment notes

You can deploy this on Vercel or a VPS. If you use Hostinger, the best fit is a VPS for the app itself instead of the drag-and-drop builder.


## Paystack setup

Add these environment variables in `.env.local` and Vercel:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PAYSTACK_PUBLIC_KEY="pk_test_xxx"
PAYSTACK_SECRET_KEY="sk_test_xxx"
PAYSTACK_PREMIUM_AMOUNT_KOBO="250000"
```

Then add your webhook URL in Paystack Dashboard:

`https://your-domain-or-vercel-url/api/paystack/webhook`

The Premium button now initializes a Paystack transaction, sends the customer to Paystack checkout, then verifies the payment on the server before upgrading the user.
