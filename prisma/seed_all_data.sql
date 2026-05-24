-- ============================================================
-- DAF PRINTING - COMPLETE SEED SCRIPT (Run in Supabase SQL Editor)
-- ============================================================
-- HOW TO USE:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project
-- 3. Open "SQL Editor"
-- 4. Paste and RUN this entire script
-- ============================================================

-- ============================================================
-- STEP 1: SYNC SCHEMA - Add missing columns (if they don't exist)
-- ============================================================

-- QuoteRequest table - ensure all columns exist
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "customerName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "customerEmail" TEXT NOT NULL DEFAULT '';
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "customerPhone" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "customerCompany" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "serviceId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "quantity" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "size" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "material" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "notes" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PENDING';
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "assignedTo" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "quotedPrice" DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "validUntil" TIMESTAMP(3);

-- QuickRequest table - ensure all columns exist
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "phone" TEXT NOT NULL DEFAULT '';
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "company" TEXT;
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "firstName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "magazineType" TEXT NOT NULL DEFAULT '';
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "quantity" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "QuickRequest" ADD COLUMN IF NOT EXISTS "isRead" BOOLEAN NOT NULL DEFAULT false;

-- PartnershipRequest table - ensure all columns exist
ALTER TABLE "PartnershipRequest" ADD COLUMN IF NOT EXISTS "contactName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "PartnershipRequest" ADD COLUMN IF NOT EXISTS "phone" TEXT NOT NULL DEFAULT '';
ALTER TABLE "PartnershipRequest" ADD COLUMN IF NOT EXISTS "company" TEXT NOT NULL DEFAULT '';
ALTER TABLE "PartnershipRequest" ADD COLUMN IF NOT EXISTS "services" TEXT NOT NULL DEFAULT '';
ALTER TABLE "PartnershipRequest" ADD COLUMN IF NOT EXISTS "isRead" BOOLEAN NOT NULL DEFAULT false;

-- ============================================================
-- STEP 2: SEED DATA
-- ============================================================

-- -------------------------------------------------------
-- QUICK ORDERS (QuickRequest) - 6 records
-- -------------------------------------------------------
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, '+254 712 111 222', 'john.k@apexsolutions.com', 'Apex Solutions', 'John', 'Corporate Annual Report (A4, 64 pages)', 500, false, '2026-05-12 06:00:00+00', now()),
  (gen_random_uuid()::text, '+254 722 333 444', 'alice.w@designco.co.ke', 'DesignCo Kenya', 'Alice', 'Bi-Monthly Fashion Magazine (A5, 48 pages)', 2500, true, '2026-05-10 08:00:00+00', now()),
  (gen_random_uuid()::text, '+254 733 555 666', 'peter.m@nairobiacademy.ac.ke', 'Nairobi Academy', 'Peter', 'High-School Yearbook (A4, Hardcover)', 350, false, '2026-05-08 11:00:00+00', now()),
  (gen_random_uuid()::text, '+254 705 999 888', 'mercy@greenhouse.co.ke', 'Greenhouse Organics', 'Mercy', 'Artisanal Product Labels (Custom Die-Cut)', 10000, true, '2026-05-05 07:00:00+00', now()),
  (gen_random_uuid()::text, '+254 799 444 333', 'samuel@filmfest.ke', 'Nairobi Film Festival', 'Samuel', 'Glossy Event Program Booklet (A5, 12 pages)', 1200, false, '2026-05-03 13:00:00+00', now()),
  (gen_random_uuid()::text, '+254 745 678 901', 'jane@printshop.co.ke', 'PrintShop Kenya', 'Jane', 'Product Catalog (A4, 32 pages, Saddle-Stitched)', 3000, true, '2026-04-28 09:00:00+00', now());

-- -------------------------------------------------------
-- PARTNERSHIPS (PartnershipRequest) - 5 records
-- -------------------------------------------------------
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Sarah Kimani', '+254 722 888 999', 'Elite Marketing Agency', 'Flyer Printing, Large Format Vinyl Banners, Roll-up Banners, Promotional Merchandise', false, '2026-05-11 06:00:00+00', now()),
  (gen_random_uuid()::text, 'Otieno Odhiambo', '+254 733 444 555', 'Nairobi Tech Hub', 'Event Badge Printing, Corporate Branded Stationery, Custom Team Tees', true, '2026-05-09 08:00:00+00', now()),
  (gen_random_uuid()::text, 'Emily Chebet', '+254 711 222 333', 'Chebet Weddings & Events', 'Luxury Textured Wedding Stationery, Gold Foil Invitation Suites, Letterpress Escort Cards', false, '2026-05-07 11:00:00+00', now()),
  (gen_random_uuid()::text, 'Dennis Murimi', '+254 701 555 666', 'Murimi Real Estate', 'Outdoor Corrugated Yard Signs, High-Gloss Property Listing Brochures', true, '2026-05-04 07:00:00+00', now()),
  (gen_random_uuid()::text, 'Anita Patel', '+254 755 222 111', 'Patel Retail Chains', 'Custom Cardboard Counter Displays, Embossed Product Boxes, UV-coated Product Labels', false, '2026-05-02 13:00:00+00', now());

-- -------------------------------------------------------
-- QUOTES (QuoteRequest) - 10 records
-- Requires: Service IDs and User IDs (get existing ones)
-- -------------------------------------------------------

-- First, make sure we have services and users
-- If you already have them, this grabs their IDs
-- If not, we seed them first

-- Get or create services
INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Flyer Printing', 'flyer-printing', 'High-quality flyer printing for events, promotions, and business marketing.', '/assets/flyer-printing.jpg', true, 1, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'flyer-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Brochure & Catalog Printing', 'brochure-catalog-printing', 'Professional brochure and catalog printing for businesses.', '/assets/brochure-printing.jpg', true, 2, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'brochure-catalog-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Business Card Printing', 'business-card-printing', 'Premium business card printing on high-quality card stock.', '/assets/business-cards.jpg', true, 3, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'business-card-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Book & Magazine Printing', 'book-magazine-printing', 'Complete book and magazine printing services.', '/assets/book-printing.jpg', true, 4, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'book-magazine-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Large Format Printing', 'large-format-printing', 'Banners, posters, signage, and outdoor displays.', '/assets/large-format.jpg', true, 5, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'large-format-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Packaging & Label Printing', 'packaging-label-printing', 'Custom packaging and label printing.', '/assets/packaging.jpg', true, 6, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'packaging-label-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Wedding Stationery', 'wedding-stationery', 'Elegant wedding stationery including invitation cards.', '/assets/wedding-stationery.jpg', true, 7, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'wedding-stationery');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Promotional Merchandise', 'promotional-merchandise', 'Custom branded merchandise.', '/assets/promotional.jpg', true, 8, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'promotional-merchandise');

-- Insert Quotes (requires service IDs and user IDs to exist)
-- If no users exist, create admin user first
INSERT INTO "User" (id, name, email, password, role, "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Daf Printing Admin', 'admin@dafprinting.com', '$2b$10$placeholder', 'SUPER_ADMIN', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'admin@dafprinting.com');

-- Now insert quotes (uses subqueries to get the correct IDs)
INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT
  gen_random_uuid()::text, v.*
FROM (VALUES
  ('Q-2026-0001', 'Wanjiku Kariuki', 'wanjiku.k@email.com', '+254 712 345 678', 'Kariuki Enterprises', (SELECT id FROM "Service" WHERE slug = 'flyer-printing' LIMIT 1), 5000, 'A5 (148mm x 210mm)', '150gsm Gloss Paper', 'Need flyers for a product launch event. Full color both sides.', 'QUOTED', (SELECT id FROM "User" WHERE email = 'grace@dafprinting.com' LIMIT 1), 25000, '2026-06-15 00:00:00+00', '2026-05-01 07:30:00+00'),
  ('Q-2026-0002', 'James Ochieng', 'james.o@email.com', '+254 723 456 789', 'Ochieng Solutions Ltd', (SELECT id FROM "Service" WHERE slug = 'brochure-catalog-printing' LIMIT 1), 1000, 'A4 (210mm x 297mm)', '200gsm Matte Paper with Fold', 'Corporate brochure for annual report. Tri-fold design.', 'REVIEWING', (SELECT id FROM "User" WHERE email = 'grace@dafprinting.com' LIMIT 1), NULL, NULL, '2026-05-03 11:00:00+00'),
  ('Q-2026-0003', 'Mary Kamau', 'mary.kamau@email.com', '+254 734 567 890', NULL, (SELECT id FROM "Service" WHERE slug = 'wedding-stationery' LIMIT 1), 100, 'Custom (5x7 inches)', '300gsm Premium Cardstock', 'Wedding invitation suites with laser-cut details and gold foil.', 'ACCEPTED', (SELECT id FROM "User" WHERE email = 'john@dafprinting.com' LIMIT 1), 45000, '2026-07-01 00:00:00+00', '2026-04-28 06:00:00+00'),
  ('Q-2026-0004', 'TechConnect Africa', 'events@techconnect.africa', '+254 745 678 901', 'TechConnect Africa', (SELECT id FROM "Service" WHERE slug = 'large-format-printing' LIMIT 1), 50, '3m x 2m Banner', 'Premium Vinyl Banner', 'Conference banners for TechConnect Summit 2026.', 'PENDING', NULL, NULL, NULL, '2026-05-05 08:00:00+00'),
  ('Q-2026-0005', 'Achieng Family', 'family.achieng@email.com', '+254 756 789 012', NULL, (SELECT id FROM "Service" WHERE slug = 'flyer-printing' LIMIT 1), 200, 'A6 (105mm x 148mm)', '170gsm Satin Paper', 'Church anniversary invitation flyers.', 'DECLINED', (SELECT id FROM "User" WHERE email = 'john@dafprinting.com' LIMIT 1), 8500, '2026-05-20 00:00:00+00', '2026-04-20 05:30:00+00'),
  ('Q-2026-0006', 'David Mwangi', 'david.mwangi@email.com', '+254 767 890 123', 'Mwangi Media Group', (SELECT id FROM "Service" WHERE slug = 'business-card-printing' LIMIT 1), 500, 'Standard (85mm x 55mm)', '350gsm Premium Card with Spot UV', 'Business cards for media company. Need 5 variations.', 'QUOTED', (SELECT id FROM "User" WHERE email = 'grace@dafprinting.com' LIMIT 1), 12000, '2026-06-30 00:00:00+00', '2026-05-02 13:00:00+00'),
  ('Q-2026-0007', 'Nairobi Design Collective', 'info@nairobidesign.co.ke', '+254 778 901 234', 'Nairobi Design Collective', (SELECT id FROM "Service" WHERE slug = 'packaging-label-printing' LIMIT 1), 10000, 'Custom Box (30cm x 20cm x 10cm)', 'Kraft Cardboard', 'Custom packaging boxes for artisanal products.', 'REVIEWING', NULL, NULL, NULL, '2026-05-04 10:00:00+00'),
  ('Q-2026-0008', 'Elizabeth Nyambura', 'eliz.nyambura@email.com', '+254 789 012 345', NULL, (SELECT id FROM "Service" WHERE slug = 'book-magazine-printing' LIMIT 1), 200, 'A5 (148mm x 210mm)', '80gsm Book Paper, Softcover', 'Poetry book for self-publishing. 120 pages.', 'PENDING', NULL, NULL, NULL, '2026-05-06 06:15:00+00'),
  ('Q-2026-0009', 'Peter & Grace Waweru', 'waweru.wedding@email.com', '+254 790 123 456', NULL, (SELECT id FROM "Service" WHERE slug = 'wedding-stationery' LIMIT 1), 150, 'Custom (6x8 inches)', '300gsm Textured Cardstock', 'Complete wedding stationery set. Rustic theme.', 'QUOTED', (SELECT id FROM "User" WHERE email = 'john@dafprinting.com' LIMIT 1), 65000, '2026-07-15 00:00:00+00', '2026-05-01 08:00:00+00'),
  ('Q-2026-0010', 'Nakuru County Government', 'procurement@nakuru.go.ke', '+254 701 234 567', 'Nakuru County Government', (SELECT id FROM "Service" WHERE slug = 'large-format-printing' LIMIT 1), 100, '1.2m x 0.8m Poster', 'Weatherproof Vinyl', 'Government health awareness campaign posters.', 'QUOTED', NULL, 180000, '2026-06-01 00:00:00+00', '2026-04-25 07:00:00+00')
) AS v("quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt");

-- ============================================================
-- SUMMARY
-- ============================================================
SELECT '✅ QUICK ORDERS seeded' AS result;
SELECT COUNT(*) AS quick_orders_count FROM "QuickRequest";
SELECT '✅ PARTNERSHIPS seeded' AS result;
SELECT COUNT(*) AS partnerships_count FROM "PartnershipRequest";
SELECT '✅ QUOTES seeded' AS result;
SELECT COUNT(*) AS quotes_count FROM "QuoteRequest";