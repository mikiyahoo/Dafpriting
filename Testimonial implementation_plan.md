# Implementation Plan: Dynamic Testimonials Section & Complete Mock Seeding

The goal is to replace the "Fast Turnaround" CTA section on the homepage with an interactive, floating testimonials section. We will update the database, build CRUD endpoints, support image uploads to Cloudinary, enable selection of Discord-style illustration avatars, and seed a rich set of complete test data for all main admin lists.

---

## User Review Required

Please review the revised three-tiered avatar logic and database seeding approach.

> [!IMPORTANT]
> - **Three-tiered Avatar Logic:** 
>   1. **Custom Upload:** Admin uploads a custom picture which gets saved to Cloudinary.
>   2. **Clipart Avatar:** If no upload, admin can choose from 8 pre-configured Discord-style clipart/mascots (using illustrated seeds: Fun Emojis, Bottts, and Adventurers).
>   3. **Letter Fallback:** If no image is uploaded AND no clipart is selected, the public homepage will dynamically render a sleek, colored circle showing the user's initials.
> - **Database Seeding Expansion:** We will purge and seed rich, complete mock datasets for **Quick Orders** (`QuickRequest`), **Quotes** (`QuoteRequest`), **Partnerships** (`PartnershipRequest`), and **Testimonials** (`Testimonial`).

---

## Exact Sample Seeding Data

Below is the exact complete mock data we will programmatically push to the PostgreSQL database via `prisma/seed.ts`:

### 1. Testimonials (`Testimonial` Model)
We will seed 6 detailed, high-quality testimonials, demonstrating each avatar tier:

| Customer Name | Company | Review | Rating | Approved | Featured | Avatar Type | Avatar URL |
|---|---|---|---|---|---|---|---|
| **Sarah Jenkins** | Vertex Agency | "Daf Printing delivered exceptional quality flyers and banners for our brand launch. Absolute lifesavers with their quick turnaround!" | 5 | Yes | Yes | `upload` | `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150` (Custom Unsplash Photo) |
| **Ethan Chan** | ShopEase | "Great quality products and helpful customer support. Highly recommended for any e-commerce businesses needing fast prints." | 5 | Yes | Yes | `upload` | `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150` (Custom Unsplash Photo) |
| **Michael K.** | PixelLabs | "The spot UV business cards we ordered turned out incredibly sleek. Outstanding quality and professional feedback." | 5 | Yes | Yes | `clipart` | `https://api.dicebear.com/7.x/bottts/svg?seed=Michael` (Discord-style Robot Mascot) |
| **Jane Doe** | Creative Studio | "Their laser-cut wedding invitation suite was absolutely stunning! Our guests loved the texture and premium feel." | 5 | Yes | Yes | `clipart` | `https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jane` (Discord-style Cute Emoji Mascot) |
| **David Mwangi** | Mwangi Media Group | "Very reliable printer for commercial requirements. Business cards and banners were exactly as specified." | 4 | Yes | No | `none` | `null` (Falls back to dynamic initials: "DM" in orange background) |
| **Elizabeth Nyambura** | Self-Publisher | "Excellent customer service and highly professional binding. Finally found a reliable printer for self-publishing our novel runs." | 5 | Yes | Yes | `none` | `null` (Falls back to dynamic initials: "EN" in purple background) |

---

### 2. Quick Orders (`QuickRequest` Model)
We will seed 5 complete records representing quick requests from categories or landing pages:

1. **Record 1 (Pending):**
   - **Customer:** John Kamau (Apex Solutions)
   - **Contact:** `+254 712 111 222` | `john.k@apexsolutions.com`
   - **Product:** "Corporate Annual Report (A4, 64 pages)"
   - **Quantity:** 500 copies
   - **Read Status:** Unread (Pending review)
2. **Record 2 (Read):**
   - **Customer:** Alice Wanjiku (DesignCo Kenya)
   - **Contact:** `+254 722 333 444` | `alice.w@designco.co.ke`
   - **Product:** "Bi-Monthly Fashion Magazine (A5, 48 pages)"
   - **Quantity:** 2,500 copies
   - **Read Status:** Read
3. **Record 3 (Pending):**
   - **Customer:** Peter Maina (Nairobi Academy)
   - **Contact:** `+254 733 555 666` | `peter.m@nairobiacademy.ac.ke`
   - **Product:** "High-School Yearbook (A4, Hardcover)"
   - **Quantity:** 350 copies
   - **Read Status:** Unread (Pending review)
4. **Record 4 (Read):**
   - **Customer:** Mercy Chebet (Greenhouse Organics)
   - **Contact:** `+254 705 999 888` | `mercy@greenhouse.co.ke`
   - **Product:** "Artisanal Product Labels (Custom Die-Cut)"
   - **Quantity:** 10,000 copies
   - **Read Status:** Read
5. **Record 5 (Pending):**
   - **Customer:** Samuel L. (Nairobi Film Festival)
   - **Contact:** `+254 799 444 333` | `samuel@filmfest.ke`
   - **Product:** "Glossy Event Program Booklet (A5, 12 pages)"
   - **Quantity:** 1,200 copies
   - **Read Status:** Unread

---

### 3. Partnership Requests (`PartnershipRequest` Model)
We will seed 5 comprehensive partnership applications from corporate and creative agencies:

1. **Record 1 (Pending):**
   - **Contact:** Sarah Kimani
   - **Phone:** `+254 722 888 999`
   - **Company:** Elite Marketing Agency
   - **Services Needed:** "Flyer Printing, Large Format Vinyl Banners, Roll-up Banners, Promotional Merchandise"
   - **Read Status:** Unread
2. **Record 2 (Read):**
   - **Contact:** Otieno Odhiambo
   - **Phone:** `+254 733 444 555`
   - **Company:** Nairobi Tech Hub
   - **Services Needed:** "Event Badge Printing, Corporate Branded Stationery, Custom Team Tees"
   - **Read Status:** Read
3. **Record 3 (Pending):**
   - **Contact:** Emily Chebet
   - **Phone:** `+254 711 222 333`
   - **Company:** Chebet Weddings & Events
   - **Services Needed:** "Luxury Textured Wedding Stationery, Gold Foil Invitation Suites, Letterpress Escort Cards"
   - **Read Status:** Unread
4. **Record 4 (Read):**
   - **Contact:** Dennis Murimi
   - **Phone:** `+254 701 555 666`
   - **Company:** Murimi Real Estate
   - **Services Needed:** "Outdoor Corrugated Yard Signs, High-Gloss Property Listing Brochures"
   - **Read Status:** Read
5. **Record 5 (Pending):**
   - **Contact:** Anita Patel
   - **Phone:** `+254 755 222 111`
   - **Company:** Patel Retail Chains
   - **Services Needed:** "Custom Cardboard Counter Displays, Embossed Product Boxes, UV-coated Product Labels"
   - **Read Status:** Unread

---

### 4. Quote Requests (`QuoteRequest` Model)
We will keep and enrich 10 comprehensive quotation requests detailing custom sizes, materials, prices, assigned staff, and status timelines (see [seed.ts](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/prisma/seed.ts) lines 130-231).

---

## Proposed Technical Changes

### Component 1: Database Updates
We need to support storing custom picture URLs or chosen clipart identifiers. We will update the Prisma schema.

#### [MODIFY] [schema.prisma](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/prisma/schema.prisma)
- Add `avatarUrl String?` and `avatarType String?` to the `Testimonial` model.

---

### Component 2: Complete Mock Seeding
We will update the seed script to wipe and generate complete, beautiful sample records.

#### [MODIFY] [seed.ts](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/prisma/seed.ts)
- Add `prisma.partnershipRequest.deleteMany()` and `prisma.quickRequest.deleteMany()` at the start to ensure clean seeding.
- Push the exact tables detailed in the "Exact Sample Seeding Data" section above.

---

### Component 3: API Layer
We will define endpoints for image uploads and testimonials CRUD.

#### [NEW] [route.ts (Upload API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/upload/route.ts)
- Implement `POST /api/upload` to securely upload files to Cloudinary using the existing credentials in `.env.local`.
- Restrict file uploads to authenticated admin users using `requireAdmin()`.

#### [NEW] [route.ts (Testimonials CRUD API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/testimonials/route.ts)
- `GET /api/testimonials`: Public route to fetch testimonials.
- `POST /api/testimonials`: Admin route to create a testimonial (handles `customerName`, `company`, `review`, `rating`, `avatarUrl`, `avatarType`).

#### [NEW] [[id]/route.ts (Testimonials Detail API)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/api/testimonials/%5Bid%5D/route.ts)
- `PUT /api/testimonials/[id]`: Admin route to update testimonial details.
- `DELETE /api/testimonials/[id]`: Admin route to delete a testimonial.

---

### Component 4: Types, Schemas, & API Utilities
We will extend existing testimonial features to support our three-tiered avatar logic.

#### [MODIFY] [types.ts](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/features/testimonials/types.ts)
- Add `avatarUrl: string | null` and `avatarType: string | null` to the `TestimonialRecord` interface.

#### [MODIFY] [schema.ts](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/features/testimonials/schema.ts)
- Add `avatarUrl: z.string().optional().nullable()` and `avatarType: z.string().optional().nullable()` to the validation schemas.

#### [MODIFY] [api.ts](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/features/testimonials/api.ts)
- Update CRM helpers to process `avatarUrl` and `avatarType` in creations/updates.

---

### Component 5: Admin Dashboard View
We will build a rich admin panel allowing full control of testimonials and avatars.

#### [MODIFY] [page.tsx (Admin Testimonials page)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/admin/testimonials/page.tsx)
- Rebuild the page into a complete client component supporting full CRUD.
- **Avatar Configuration Selector:**
  - **Upload Tab:** Drag-and-drop file uploader that pushes custom photos to Cloudinary.
  - **Clipart Tab:** Shows a grid of 8 Discord-like illustrated avatars (cute monsters, robots, fun faces, game controllers).
  - **Initials Tab:** Standard fallback.
- Integrate CRUD alerts and actions.

---

### Component 6: Homepage Frontend Integration
We will remove the old CTA section and add a stunning floating testimonials widget.

#### [MODIFY] [page.tsx (Homepage)](file:///c:/Users/LEGION/Documents/My%20Project/Daf%20Printing/app/page.tsx)
- Remove the "Fast Turnaround Available" CTA section.
- Build a custom interactive Testimonials slider section using Tailwind CSS.
- **Design Features:**
  - **Scatter/Grid bubble map:** Place multiple floating bubbles containing customer photos scattered dynamically around a central main bubble, matching the visual inspiration.
  - **Autoplay/Automatic rotation:** Cycles the active testimonial every 4 seconds, magnifying the active customer bubble and updating the active quote text at the bottom.
  - **Stroke Highlight:** The active bubble has a glowing peach/orange stroke border.
  - **Hover Micro-animations:** Bubbles float/move on hover using Tailwind transitions and subtle translate classes.
  - **Initials Fallback:** If the testimonial has no custom uploaded image and no clipart mascot, render a beautiful circular badge with initials and a custom glassmorphism color palette.

---

## Verification Plan

### Automated / Command-line Verification
- Run database migrations: `npx prisma db push` followed by `npx prisma generate`.
- Seed database to check default settings: `npm run dev` and seed verify.
- Run build command `npm run build` or `npx tsc` to verify TypeScript builds correctly.

### Manual Verification
1. **Admin Panel Test:**
   - Log into `/admin/testimonials`. Verify CRUD operations.
   - Verify selecting a Discord Clipart avatar saves and displays in the admin list.
   - Verify uploading a picture pushes to Cloudinary and saves.
2. **Homepage Frontend Test:**
   - Scroll down to the bottom of the homepage. Verify the CTA section is gone.
   - Inspect the new Testimonials section. Verify that:
     - The layout resembles the provided design with floating circular customer bubbles.
     - The active testimonial automatically switches, highlighting the active circle with an orange border.
     - Hovering on other circles triggers a floating motion.
     - Fallback initials or clipart mascots render beautifully.
