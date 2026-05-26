# Codebase Quality and Architecture Audit — Daf Printing

An in-depth audit of the **Daf Printing** Next.js platform was conducted to identify potential security vulnerabilities, structural defects, discrepancy items in the development checklist, and alignment between database schemas and TypeScript definitions.

---

## 1. Critical Security Vulnerability: Unprotected Administrative APIs
While standard admin pages under `/admin` are protected by a middleware router (`middleware.ts`), **none of the administrative API endpoints under `/api` verify user sessions or roles**.

> [!CAUTION]
> **Severity: High**
> A malicious actor or external client can directly access administrative endpoints using tools like Postman, `curl`, or custom scripts to execute arbitrary changes.

### Vulnerable Endpoints
- **Category CRUD:**
  - `POST /api/categories` — Create category carousel items
  - `PUT /api/categories/[id]` — Edit category details / toggle activity
  - `DELETE /api/categories/[id]` — Delete a category
- **Banner Ads CRUD:**
  - `POST /api/banners` — Add new banner assets
  - `PUT /api/banners/[id]` & `DELETE /api/banners/[id]`
- **Services CRUD:**
  - `POST /api/services`
- **Database Seeding Router:**
  - `POST /api/admin/seed` — Allows anyone to seed default users (`admin@dafprinting.com` with `Admin@2026`) and wipe/reset existing records.

### Recommendation
Import the `auth` method from `@/lib/auth` inside each admin API route handler. Verify that the session is active and that `session.user.role` matches the required privileges (e.g., `SUPER_ADMIN` or `ADMIN`).

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ... proceed with database operations
}
```

---

## 2. Checklist vs. Codebase Discrepancy ("Package Management System")
The file [TASK_PROGRESS.md](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/TASK_PROGRESS.md) lists an extensive checklist for a **Package Management System** under "Infrastructure (Already Complete ✓)", marking the following items as done:
- `[x]` Prisma schema (`PackageCategory`, `Package` models)
- `[x]` API routes for admin packages CRUD
- `[x]` Public `/packages` page with `PackageExplorer`
- `[x]` FeaturedPackages homepage section

> [!WARNING]
> **Discrepancy Found:**
> In reality, **none of these files or models exist in the current project.**
> - `prisma/schema.prisma` contains no models for `Package` or `PackageCategory`.
> - The `/api/admin/packages` routes are missing from the file system.
> - The admin sidebar (`components/admin/Sidebar.tsx`) does not link to packages.

### Recommendation
Either implement the package management system from scratch as detailed in the checklist, or update `TASK_PROGRESS.md` to accurately reflect that the Package Infrastructure is still **pending development**.

---

## 3. Database Schema and TypeScript Definition Mismatches
The application types file [types/index.ts](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/types/index.ts) defines numerous interfaces for features that do not have corresponding models in `prisma/schema.prisma`:

| TypeScript Interface | Prisma DB Model Status |
| :--- | :--- |
| `BookingRecord` | ❌ Missing from `schema.prisma` |
| `WeddingInvitationRecord` | ❌ Missing from `schema.prisma` |
| `GiftRegistryItem` | ❌ Missing from `schema.prisma` |
| `RSVPRecord` | ❌ Missing from `schema.prisma` |
| `ProposalRecord` | ❌ Missing from `schema.prisma` |
| `ProposalItemRecord` | ❌ Missing from `schema.prisma` |

These mismatches stem from the codebase's history as the legacy **"Radiance Platform"** (an event/wedding coordination app), which is currently transitioning to the **"Daf Printing"** custom package/commercial print shop service.

### Recommendation
- **Clean up Legacy Code:** Prune the legacy schemas, validation checks, and unused types from `types/index.ts` and `lib/validations.ts` if they are not planned for future printing workflows.
- **Synchronize Database:** If custom client portals (RSVPs, bookings) are going to be used for print orders, the database models should be expanded to match the defined TypeScript types.

---

## 4. Prisma Client custom Output and Git Pollution
In the Prisma configuration [schema.prisma](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/prisma/schema.prisma), the client generator uses a custom output target:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```

This generates the Prisma JS bundle and compiled architecture-specific engine binaries directly inside the `/generated` directory of the workspace, rather than standard `node_modules`.

> [!IMPORTANT]
> Because this generated output directory is tracked and committed in Git:
> 1. It pollutes commits with thousands of lines of machine-generated JS code.
> 2. It forces architecture-specific binaries (like `query_engine-windows.dll.node`) into version control, creating potential runtime clashes when deployed on Linux-based environments (like Vercel).

### Recommendation
Add `/generated` to your `.gitignore` file, or restore the standard client generator settings:
```prisma
generator client {
  provider = "prisma-client-js"
}
```
If using the default target, the client will compile directly to `node_modules/@prisma/client` and load correctly during Next.js builds.

---

## 5. Summary of Recommended Actions

1. **Implement API Route Security:** Add session and admin role authorization checks inside all `app/api` administrative routes.
2. **Correct the Task Checklist:** Reset the completion checkmarks in `TASK_PROGRESS.md` to properly map packages under "Missing Features to Add".
3. **Legacy Clean Up:** Remove unused schemas (`rsvpSchema`, `bookingFormSchema`) from `lib/validations.ts` to improve bundle weight.
4. **Fix Git Ignores:** Ignore machine-generated databases and engines in Git to avoid cross-platform deployment errors.
