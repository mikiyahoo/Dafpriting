# Implementation Plan — Security, Checklist, and Git Improvements

This plan outlines the steps required to address the architectural, security, and git-tracking issues identified in the Daf Printing codebase audit.

## User Review Required

Please review the proposed security wrapper approach and the git-untracking steps.

> [!IMPORTANT]
> - **API Route Protection:** This plan will add `session` verification checks using NextAuth's `auth()` helper to all admin-facing endpoints in `app/api/...`. Valid sessions will be required for mutation requests (`POST`/`PUT`/`PATCH`/`DELETE`) and admin statistics/list endpoints (`GET`).
> - **Git Untracking:** We will run `git rm -r --cached generated/ generated_backup/` to clean the Git tree from compiled binaries and machine-generated files, and add them to `.gitignore`. No local files will be deleted.

---

## Proposed Changes

### Component: API Route Security (Authentication wrappers)

We will modify each administrative API route to verify that the user is logged in before proceeding.

#### [MODIFY] [route.ts (Categories API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/categories/route.ts)
- Add `auth()` import from `@/lib/auth`.
- Secure `POST` endpoint using `auth()`.

#### [MODIFY] [[id]/route.ts (Categories Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/categories/%5Bid%5D/route.ts)
- Secure `PUT` and `DELETE` endpoints using `auth()`.

#### [MODIFY] [route.ts (Banners API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/banners/route.ts)
- Secure `POST` endpoint using `auth()`.

#### [MODIFY] [[id]/route.ts (Banners Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/banners/%5Bid%5D/route.ts)
- Secure `PUT` and `DELETE` endpoints using `auth()`.

#### [MODIFY] [route.ts (Services API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/services/route.ts)
- Secure `POST` endpoint using `auth()`.

#### [MODIFY] [route.ts (Collections API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/collections/route.ts)
- Secure `POST` endpoint using `auth()`.

#### [MODIFY] [[id]/route.ts (Collections Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/collections/%5Bid%5D/route.ts)
- Secure `PUT` and `DELETE` endpoints using `auth()`.

#### [MODIFY] [route.ts (Partnerships API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/partnerships/route.ts)
- Secure `GET` endpoint using `auth()`. Keep `POST` public.

#### [MODIFY] [[id]/route.ts (Partnerships Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/partnerships/%5Bid%5D/route.ts)
- Secure `PUT` and `DELETE` endpoints using `auth()`.

#### [MODIFY] [route.ts (Quick Requests API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/quick-requests/route.ts)
- Secure `GET` endpoint using `auth()`. Keep `POST` public.

#### [MODIFY] [unread-count/route.ts (Quick Requests Unread Count)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/quick-requests/unread-count/route.ts)
- Secure `GET` endpoint using `auth()`.

#### [MODIFY] [[id]/route.ts (Quick Requests Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/quick-requests/%5Bid%5D/route.ts)
- Secure `PUT` and `DELETE` endpoints using `auth()`.

#### [MODIFY] [route.ts (Quotes API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/quotes/route.ts)
- Secure `GET` endpoint using `auth()`. Keep `POST` public.

#### [MODIFY] [[id]/route.ts (Quotes Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/quotes/%5Bid%5D/route.ts)
- Secure `GET`, `PATCH`, and `DELETE` endpoints using `auth()`.

#### [MODIFY] [route.ts (Database Seeding API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/admin/seed/route.ts)
- Secure `GET` and `POST` endpoints using `auth()`.

---

### Component: Version Control and Tracking

We will prevent machine-generated assets from polluting the version control workspace.

#### [MODIFY] [.gitignore](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/.gitignore)
- Add `/generated/` and `/generated_backup/` to prevent tracking compile outputs.
- Add `*.node` to ignore compiled system-level binaries (like compiled DLL engines).

#### [EXECUTE] Remove tracked cache of generated folders
We will run:
```powershell
git rm -r --cached generated/
git rm -r --cached generated_backup/
```
*(This tells git to stop tracking these folders, but leaves your local files intact.)*

---

### Component: Project Checklist Alignment

We will align the checklist to match actual project status.

#### [MODIFY] [TASK_PROGRESS.md](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/TASK_PROGRESS.md)
- Rearrange the checklist sections to correctly group the unimplemented package tasks as "Missing Features to Add" (since models, API routes, sidebar entries, and views do not yet exist), leaving only validation schemas and typescript types as completed.

---

## Verification Plan

### Automated/Manual Tests
- We will verify that requests without session headers to secured `/api` routes correctly return `401 Unauthorized` responses.
- We will run `git status` to verify that generated files are properly ignored and no longer tracked in the index.
- We will verify that the checklist in `TASK_PROGRESS.md` is correctly formatted and aligned.
