# Radiance Platform — Development Guide

## 1. Purpose

This guide defines how the Radiance platform must be built, structured, and maintained.

All developers and AI systems must follow this guide strictly to ensure:

- Consistency
- Scalability
- Clean architecture
- Production readiness

## 2. Project Overview

Radiance is an Event Management Platform that includes:

- Public website
- Booking system
- Admin dashboard
- Gallery system
- Payment tracking
- Client communication log

Phase 1 focuses on:

- Booking management
- Admin workflow
- Gallery system
- Service packages

## 3. Core Principles

### 3.1 Clean Architecture
- Separate UI, logic, and data
- No business logic inside components
- API handles all database operations

### 3.2 Type Safety
- Use TypeScript everywhere
- No `any` types unless unavoidable
- Use Prisma types for DB models

### 3.3 API-First Design
- All data interactions go through `/api/*`
- Never call database directly from frontend

### 3.4 Reusable Components
- Components must be modular and reusable
- No duplicated UI logic

### 3.5 Mobile-First Design
- Design for mobile first
- Then scale to tablet and desktop

### 3.6 Security Rules
- All admin routes must be protected
- All admin APIs must verify session
- Never expose secrets to frontend

## 4. Naming Conventions

### Files & Folders
- `kebab-case` for folders
- `PascalCase` for components
- `camelCase` for variables/functions

### Examples:
- `booking-form.tsx`
- `BookingTable.tsx`
- `getBookings()`

## 5. Code Structure Rules

### Components
- `/components/public` → public UI
- `/components/admin` → admin UI

### Logic
- `/lib` → utilities, integrations
- `/api` → server logic

## 6. UI/UX Standards

- Use Radiance color system (gold, black, off-white)
- No default browser styles
- Consistent spacing (Tailwind spacing scale)
- Smooth transitions (Framer Motion)

## 7. Data Handling Rules

- Always validate inputs using Zod
- Never trust frontend data
- Handle errors gracefully

## 8. Performance Rules

- Use Next.js Image for all images
- Lazy load heavy components
- Avoid unnecessary re-renders

## 9. Error Handling

- Use `try/catch` in all API routes
- Return structured error responses:
  ```json
  { "error": "Message" }
  ```

## 10. Logging

- Use structured logs:
  ```ts
  console.error("BOOKING_CREATE_ERROR", error)
  ```

## 11. Development Workflow

1. Build API
2. Test API (Postman or browser)
3. Build UI
4. Connect UI to API
5. Test end-to-end

## 12. Do NOT Do

- ❌ Do not hardcode data that belongs in DB
- ❌ Do not skip validation
- ❌ Do not bypass API layer
- ❌ Do not mix admin and public logic

## 13. Definition of Done

A feature is complete when:

- UI works on mobile & desktop
- API is tested
- No console errors
- Data is stored correctly
- Edge cases handled

## 14. Phase System

### Phase 1:
- Booking system
- Admin dashboard
- Gallery
- Packages

### Phase 2:
- Invitations
- RSVP

### Phase 3:
- Gift registry
- Payments

---

*End of Guide*