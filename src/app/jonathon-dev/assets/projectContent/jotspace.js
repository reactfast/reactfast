export const jotSpace = {
  slug: 'jot-space',
  content: `# Jot.Space

More than just a digital business card.

Jot.Space is a full-featured digital networking and e-commerce platform designed for creators, professionals, and teams who want to share, sell, and connect — all from one mobile-first landing page.

---

## Overview

Jot.Space started as a modern alternative to paper business cards — but quickly evolved into a powerful digital hub.  
Users can share contact details, social links, files, payment links, or booking forms, all while maintaining a consistent, branded experience that feels more like a personal app than a static page.

Whether you’re a barber, a jewelry designer, or a full sales team — Jot.Space lets you **build a mobile landing page that works as hard as you do.**

---

## Highlights

- 🌐 **Mobile-only optimized experience** — designed entirely for handheld interaction  
- ⚡ **Live editing and instant updates** — see every change reflected immediately  
- 🧱 **Drag-and-drop page builder** with blocks for text, files, media, and payment links  
- 💳 **E-commerce integrated** — Stripe checkout, tipping, and digital downloads  
- 🧩 **Dynamic forms system** (the precursor to [NovaForms]) for bookings and lead capture  
- 🔗 **QR & NFC ready** — share your digital card instantly, no app required  

---

## Technical Stack

- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Supabase (auth, storage, and data)  
- **Payments:** Stripe (subscriptions, checkout, and tips)  
- **Infra:** Deployed on Vercel  

This stack represents my preferred combination of **speed, simplicity, and full control** over the data layer.  
Every component — from profile builders to checkout pages — was custom-coded to maintain performance parity across mobile browsers.

---

## Dynamic Forms Engine → NovaForms

One of the largest architectural features of Jot.Space was the **dynamic form engine** built to power user input across the platform — for profile creation, payment forms, and client intake.

It allowed developers to define forms using a simple **JSON schema** that automatically generated React-controlled form components styled to the brand theme.  
It supported reactive mutations (e.g., one field controlling another), validation, and server-side schema enforcement.

This subsystem was later extracted and developed into a standalone library: **[NovaForms]**, which now powers multiple projects in my ecosystem.

---

## The Build

Jot.Space was one of my largest solo projects — a fully custom SaaS + e-commerce platform built end-to-end:

- Multi-tenant Supabase architecture  
- Serverless Stripe integration  
- Modular builder system for drag-and-drop UI blocks  
- Optimized image and file uploads via Supabase Storage  
- Reusable React component primitives for all UI patterns  
- Marketing site, builder, and shop — all from a single Next.js monorepo  

Every screen, from onboarding to checkout, was crafted to feel **native on mobile** while remaining **pixel-sharp on desktop**.

---

## Results

Jot.Space now serves as a full digital card and team networking solution — used by independent creators, small teams, and field sales organizations to **replace paper business cards entirely**.

It set the foundation for a growing ecosystem of products built on the same technical principles:
- Reusable modular front-ends
- Headless backends with real-time sync
- Design consistency powered by schema-driven UI

---

> _“Jot.Space has streamlined the way I handle leads and payments.  
> It’s like having a digital business assistant in my pocket.”_  
> — John McClendon, early user and tester

---

### Related Projects
- [NovaForms] — Dynamic React form engine extracted from Jot.Space  
- [Rowdy.Shop] — Small e-commerce platform built using Jot’s payment modules  

---

**Stack Summary**

Next.js · Supabase · Stripe · Tailwind · NovaForms

---

[Learn more at Jot.Space →](https://jot.space)`,
}
