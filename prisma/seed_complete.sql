-- ============================================================
-- DAF PRINTING - COMPLETE SEED DATABASE SCRIPT
-- Run this in Supabase SQL Editor
-- ============================================================
-- INSTRUCTIONS:
-- 1. Go to https://supabase.com/dashboard/project/dmztzbupkvdfsabwurmy
-- 2. Click "Reactivate" if paused
-- 3. Go to SQL Editor
-- 4. Paste and RUN this entire script
-- ============================================================

-- ============================================================
-- STEP 1: CREATE ENUMS (if they don't exist)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'STAFF');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'DECLINED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- STEP 2: SYNC SCHEMA - Ensure all tables & columns exist
-- ============================================================

-- Services table
CREATE TABLE IF NOT EXISTS "Service" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS "Category" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Banners table
CREATE TABLE IF NOT EXISTS "Banner" (
    id TEXT PRIMARY KEY,
    title TEXT,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Collections table
CREATE TABLE IF NOT EXISTS "Collection" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    "linkUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role "UserRole" NOT NULL DEFAULT 'STAFF',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- QuoteRequest table
CREATE TABLE IF NOT EXISTS "QuoteRequest" (
    id TEXT PRIMARY KEY,
    "quoteNumber" TEXT NOT NULL UNIQUE,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerCompany" TEXT,
    "serviceId" TEXT NOT NULL REFERENCES "Service"(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    size TEXT,
    material TEXT,
    notes TEXT,
    status "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "assignedTo" TEXT REFERENCES "User"(id),
    "quotedPrice" DOUBLE PRECISION,
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- QuoteFile table
CREATE TABLE IF NOT EXISTS "QuoteFile" (
    id TEXT PRIMARY KEY,
    "quoteRequestId" TEXT NOT NULL REFERENCES "QuoteRequest"(id) ON DELETE CASCADE,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- QuickRequest table
CREATE TABLE IF NOT EXISTS "QuickRequest" (
    id TEXT PRIMARY KEY,
    phone TEXT NOT NULL,
    email TEXT,
    company TEXT,
    "firstName" TEXT NOT NULL,
    "magazineType" TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PartnershipRequest table
CREATE TABLE IF NOT EXISTS "PartnershipRequest" (
    id TEXT PRIMARY KEY,
    "contactName" TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT NOT NULL,
    services TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PortfolioItem table
CREATE TABLE IF NOT EXISTS "PortfolioItem" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    "coverImage" TEXT,
    category TEXT NOT NULL DEFAULT '',
    "itemType" TEXT NOT NULL DEFAULT '',
    "clientName" TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PortfolioImage table
CREATE TABLE IF NOT EXISTS "PortfolioImage" (
    id TEXT PRIMARY KEY,
    "portfolioItemId" TEXT NOT NULL REFERENCES "PortfolioItem"(id) ON DELETE CASCADE,
    "imageUrl" TEXT NOT NULL,
    caption TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Testimonial table
CREATE TABLE IF NOT EXISTS "Testimonial" (
    id TEXT PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    company TEXT,
    "avatarUrl" TEXT,
    "avatarType" TEXT DEFAULT 'none',
    review TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add any missing columns for existing tables
DO $$ BEGIN
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING';
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- ============================================================
-- STEP 3: CLEAN EXISTING DATA (order matters for FK constraints)
-- ============================================================
DELETE FROM "QuoteFile";
DELETE FROM "QuoteRequest";
DELETE FROM "PortfolioImage";
DELETE FROM "PortfolioItem";
DELETE FROM "PartnershipRequest";
DELETE FROM "QuickRequest";
DELETE FROM "Testimonial";
DELETE FROM "Collection";
DELETE FROM "Banner";
DELETE FROM "Category";
DELETE FROM "Service";
DELETE FROM "User";

-- ============================================================
-- STEP 4: SEED DATA
-- ============================================================

-- ─────────── SERVICES ───────────
INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Flyer Printing', 'flyer-printing', 'High-quality flyer printing for events, promotions, and business marketing.', '/assets/flyer-printing.jpg', true, 1, now(), now()),
  (gen_random_uuid()::text, 'Brochure & Catalog Printing', 'brochure-catalog-printing', 'Professional brochure and catalog printing for businesses.', '/assets/brochure-printing.jpg', true, 2, now(), now()),
  (gen_random_uuid()::text, 'Business Card Printing', 'business-card-printing', 'Premium business card printing on high-quality card stock.', '/assets/business-cards.jpg', true, 3, now(), now()),
  (gen_random_uuid()::text, 'Book & Magazine Printing', 'book-magazine-printing', 'Complete book and magazine printing services.', '/assets/book-printing.jpg', true, 4, now(), now()),
  (gen_random_uuid()::text, 'Large Format Printing', 'large-format-printing', 'Banners, posters, signage, and outdoor displays.', '/assets/large-format.jpg', true, 5, now(), now()),
  (gen_random_uuid()::text, 'Packaging & Label Printing', 'packaging-label-printing', 'Custom packaging and label printing.', '/assets/packaging.jpg', true, 6, now(), now()),
  (gen_random_uuid()::text, 'Wedding Stationery', 'wedding-stationery', 'Elegant wedding stationery including invitation cards.', '/assets/wedding-stationery.jpg', true, 7, now(), now()),
  (gen_random_uuid()::text, 'Promotional Merchandise', 'promotional-merchandise', 'Custom branded merchandise.', '/assets/promotional.jpg', true, 8, now(), now());

-- ─────────── CATEGORIES ───────────
INSERT INTO "Category" (id, name, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Business Cards', 'business-cards', 'Premium business cards.', '/assets/categories/business-cards.jpg', true, 1, now(), now()),
  (gen_random_uuid()::text, 'Banners & Posters', 'banners-posters', 'Large-format banners and posters.', '/assets/categories/banners-posters.jpg', true, 2, now(), now()),
  (gen_random_uuid()::text, 'Labels & Stickers', 'labels-stickers', 'Custom stickers and product labels.', '/assets/categories/labels-stickers.jpg', true, 3, now(), now()),
  (gen_random_uuid()::text, 'Apparel & Tees', 'apparel-tees', 'Custom apparel printing.', '/assets/categories/apparel-tees.jpg', true, 4, now(), now()),
  (gen_random_uuid()::text, 'Packaging', 'packaging', 'Custom boxes and packaging solutions.', '/assets/categories/packaging.jpg', true, 5, now(), now()),
  (gen_random_uuid()::text, 'Stationery', 'stationery', 'Letterheads, envelopes, and stationery suites.', '/assets/categories/stationery.jpg', true, 6, now(), now()),
  (gen_random_uuid()::text, 'Wedding & Events', 'wedding-events', 'Invitations and wedding stationery.', '/assets/categories/wedding-events.jpg', true, 7, now(), now()),
  (gen_random_uuid()::text, 'Promotional Merch', 'promotional-merch', 'Branded merchandise.', '/assets/categories/promotional-merch.jpg', true, 8, now(), now()),
  (gen_random_uuid()::text, 'Books & Catalogs', 'books-catalogs', 'Perfect bound books and catalogs.', '/assets/categories/books-catalogs.jpg', true, 9, now(), now());

-- ─────────── BANNERS ───────────
INSERT INTO "Banner" (id, title, "imageUrl", "linkUrl", "isActive", "sortOrder", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Spring banners', '/assets/banners/banner-1.jpg', '/services', true, 1, now(), now()),
  (gen_random_uuid()::text, 'Free design review', '/assets/banners/banner-2.jpg', '/request-quote', true, 2, now(), now()),
  (gen_random_uuid()::text, 'Same-day proofs', '/assets/banners/banner-3.jpg', '/services', true, 3, now(), now());

-- ─────────── COLLECTIONS ───────────
INSERT INTO "Collection" (id, name, slug, description, image, "linkUrl", "isFeatured", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Wedding Collection', 'wedding-collection', 'Elegant wedding invitation suites and stationery.', '/assets/collections/wedding.jpg', '/categories/wedding-events', true, 1, true, now(), now()),
  (gen_random_uuid()::text, 'Business Suite', 'business-suite', 'Complete corporate identity packages.', '/assets/collections/business.jpg', '/categories/stationery', true, 2, true, now(), now()),
  (gen_random_uuid()::text, 'Event Essentials', 'event-essentials', 'Banners, flyers, and signage for any event.', '/assets/collections/events.jpg', '/categories/banners-posters', true, 3, true, now(), now());

-- ─────────── USERS ───────────
-- Note: Passwords are bcrypt hashes.
-- Admin@2026 = $2b$10$wJvGmOfOYIwY8H8pMq1p8uG3Vq4VN3TJUkZdLbML1Won5HNJKZnWe
-- Staff@2026 = $2b$10$yHlw0BVqGjd8mJ8FpHY1IOWR4H8aNYDV2N1GJkPTjsPxJOdCuBV4q
INSERT INTO "User" (id, name, email, password, role, "isActive", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Daf Printing Admin', 'admin@dafprinting.com', '$2b$10$wJvGmOfOYIwY8H8pMq1p8uG3Vq4VN3TJUkZdLbML1Won5HNJKZnWe', 'SUPER_ADMIN', true, now(), now()),
  (gen_random_uuid()::text, 'Grace Mwangi', 'grace@dafprinting.com', '$2b$10$yHlw0BVqGjd8mJ8FpHY1IOWR4H8aNYDV2N1GJkPTjsPxJOdCuBV4q', 'ADMIN', true, now(), now()),
  (gen_random_uuid()::text, 'John Kamau', 'john@dafprinting.com', '$2b$10$yHlw0BVqGjd8mJ8FpHY1IOWR4H8aNYDV2N1GJkPTjsPxJOdCuBV4q', 'STAFF', true, now(), now()),
  (gen_random_uuid()::text, 'Sarah Wanjiku', 'sarah@dafprinting.com', '$2b$10$yHlw0BVqGjd8mJ8FpHY1IOWR4H8aNYDV2N1GJkPTjsPxJOdCuBV4q', 'STAFF', true, now(), now());

-- ─────────── TESTIMONIALS (6 records) ───────────
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Sarah Jenkins', 'Vertex Agency', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'upload', 'Daf Printing delivered exceptional quality flyers and banners for our brand launch. Absolute lifesavers with their quick turnaround!', 5, true, true, '2026-05-10 07:00:00+00', now()),
  (gen_random_uuid()::text, 'Ethan Chan', 'ShopEase', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'upload', 'Great quality products and helpful customer support. Highly recommended for any e-commerce businesses needing fast prints.', 5, true, true, '2026-05-08 11:00:00+00', now()),
  (gen_random_uuid()::text, 'Michael K.', 'PixelLabs', 'https://api.dicebear.com/7.x/bottts/svg?seed=Michael', 'clipart', 'The spot UV business cards we ordered turned out incredibly sleek. Outstanding quality and professional feedback.', 5, true, true, '2026-05-05 06:00:00+00', now()),
  (gen_random_uuid()::text, 'Jane Doe', 'Creative Studio', 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jane', 'clipart', 'Their laser-cut wedding invitation suite was absolutely stunning! Our guests loved the texture and premium feel.', 5, true, true, '2026-04-28 08:00:00+00', now()),
  (gen_random_uuid()::text, 'David Mwangi', 'Mwangi Media Group', NULL, 'none', 'Very reliable printer for commercial requirements. Business cards and banners were exactly as specified.', 4, true, false, '2026-04-20 12:00:00+00', now()),
  (gen_random_uuid()::text, 'Elizabeth Nyambura', 'Self-Publisher', NULL, 'none', 'Excellent customer service and highly professional binding. Finally found a reliable printer for self-publishing our novel runs.', 5, true, true, '2026-04-15 05:00:00+00', now());

-- ─────────── PORTFOLIO WORKS (62 items from seed-works.mjs) ───────────
INSERT INTO "PortfolioItem" (id, title, "coverImage", category, "itemType", "clientName", featured, "sortOrder", "isActive", "createdAt", "updatedAt") VALUES
  -- Promotional Material
  (gen_random_uuid()::text, '"Coming Soon" Outdoor Restaurant Banner', '/assets/Works/Banner.jpg', 'promo', 'Posters', 'Le Basilic', false, 1, true, now(), now()),
  (gen_random_uuid()::text, '"12.12 Campaign" Real Estate Billboard/Banner', '/assets/Works/Banner_2.jpg', 'promo', 'Posters', 'Metropolitan Real Estate', false, 2, true, now(), now()),
  (gen_random_uuid()::text, 'Promotional Marketing Flyer (Healthcare/Insurance)', '/assets/Works/Flyer.jpg', 'promo', 'Flyers', 'ICAS Ethiopia', false, 3, true, now(), now()),
  (gen_random_uuid()::text, 'Tri-Fold Printed Restaurant Menu', '/assets/Works/Menu.jpg', 'promo', 'Menu Cards', 'Sky Steak House (at Grand Eliana Hotel)', false, 4, true, now(), now()),
  (gen_random_uuid()::text, 'Tri-Fold Printed Restaurant Menu (Beverage/Dessert Page)', '/assets/Works/Menu_2.jpg', 'promo', 'Menu Cards', 'Sky Steak House (at Grand Eliana Hotel)', false, 5, true, now(), now()),
  (gen_random_uuid()::text, 'Leather-Bound Premium Restaurant Menu Book', '/assets/Works/Menu_3.jpg', 'promo', 'Menu Cards', 'Grand Eliana Hotel', false, 6, true, now(), now()),
  (gen_random_uuid()::text, 'Branded Promotional Ceramic Mug', '/assets/Works/Mug.jpg', 'promo', 'Paper Handbags', 'Horizon Addis Tyres Share Company', false, 7, true, now(), now()),
  (gen_random_uuid()::text, 'Branded Promotional Ceramic Mug', '/assets/Works/Mug_2.jpg', 'promo', 'Paper Handbags', 'National Blood Bank Service', false, 8, true, now(), now()),
  (gen_random_uuid()::text, 'Branded Gift Set (Ceramic Mug & Stainless Steel Water Bottle)', '/assets/Works/Mug & Water Bottle.jpg', 'promo', 'Paper Handbags', 'Oromia LLRP-II (Lowlands Livelihood Resilience Project)', false, 9, true, now(), now()),
  (gen_random_uuid()::text, 'Custom Stainless Steel Sports Water Bottle', '/assets/Works/Water Bottle.jpg', 'promo', 'Paper Handbags', 'National Blood Bank Service', false, 10, true, now(), now()),
  (gen_random_uuid()::text, 'Stack of Promotional Plastic Click Pens', '/assets/Works/Pen.jpg', 'promo', 'Greeting Cards', 'Oromia LLRP-II (Lowlands Livelihood Resilience Project)', false, 11, true, now(), now()),
  (gen_random_uuid()::text, 'Round Die-Cut Logo Vinyl Stickers', '/assets/Works/Sticker.jpg', 'promo', 'Catalogues', 'Horizon Addis Tyres Share Company', false, 12, true, now(), now()),
  (gen_random_uuid()::text, 'Round Die-Cut Logo Vinyl Stickers', '/assets/Works/Sticker_2.jpg', 'promo', 'Catalogues', 'National Blood Bank Service', false, 13, true, now(), now()),
  (gen_random_uuid()::text, 'Square Branded Promotional Stickers', '/assets/Works/Sticker_3.jpg', 'promo', 'Catalogues', 'Oromia LLRP-II (Lowlands Livelihood Resilience Project)', false, 14, true, now(), now()),
  (gen_random_uuid()::text, 'Printed Corrugated Box Packaging (Tire Tubes)', '/assets/Works/Packaging.jpg', 'promo', 'Leaflets', 'Horizon Addis Tyres Share Company', false, 15, true, now(), now()),
  (gen_random_uuid()::text, 'Large Printed Corrugated Shipping Box', '/assets/Works/Packaging_2.jpg', 'promo', 'Leaflets', 'Horizon Addis Tyres Share Company', false, 16, true, now(), now()),
  (gen_random_uuid()::text, 'Custom Glass/Acrylic Award Trophy', '/assets/Works/Trophy.jpg', 'promo', 'Magazines', 'National Blood Bank Service', false, 17, true, now(), now()),
  -- Corporate Stationery
  (gen_random_uuid()::text, 'Stack of Tour & Travel Business Cards', '/assets/Works/Business Card.jpg', 'corp', 'Business Cards', 'Pilgrim Ethiopia Tour & Travel', false, 18, true, now(), now()),
  (gen_random_uuid()::text, 'Building & Electrical Materials Business Cards', '/assets/Works/Business Card_PVC.jpg', 'corp', 'Business Cards', 'Chapter Three Building & Electrical Materials Trade', false, 19, true, now(), now()),
  (gen_random_uuid()::text, 'Branded Corporate Mailing Envelopes', '/assets/Works/Envelope.jpg', 'corp', 'Envelopes', 'National Blood Bank Service', false, 20, true, now(), now()),
  (gen_random_uuid()::text, 'Corporate Employee ID Card with Lanyard', '/assets/Works/ID Card.jpg', 'corp', 'Personal Stationery', 'National Blood Bank Service', false, 21, true, now(), now()),
  (gen_random_uuid()::text, 'Corporate Employee ID Card with Lanyard', '/assets/Works/ID Card 2.jpg', 'corp', 'Personal Stationery', 'Horizon Addis Tyres Share Company', false, 22, true, now(), now()),
  (gen_random_uuid()::text, 'Printed Certificate Awards', '/assets/Works/Certificate.jpg', 'corp', 'Letterhead', 'National Blood Bank Service', false, 23, true, now(), now()),
  -- Books & Documents
  (gen_random_uuid()::text, 'Promotional Mesh Caps & Covered Agendas/Notebooks', '/assets/Works/Agenda & Cap.jpg', 'books', 'Booklets', 'GW Trading PLC', false, 24, true, now(), now()),
  -- Signage & Displays
  (gen_random_uuid()::text, 'Pull-Up/Roll-Up Promotional Banner', '/assets/Works/Rollup Banner.jpg', 'signs', 'Roll Up Banners', 'Horizon Addis Tyres Share Company', false, 25, true, now(), now()),
  (gen_random_uuid()::text, 'Pull-Up/Roll-Up Awareness & Informational Banner', '/assets/Works/Rollup Bannner_2.jpg', 'signs', 'Roll Up Banners', 'National Blood Bank Service', false, 26, true, now(), now()),
  (gen_random_uuid()::text, 'Promotional Desktop Miniature Flags', '/assets/Works/Flag.jpg', 'signs', 'Shelf Talkers', 'National Blood Bank Service', false, 27, true, now(), now()),
  (gen_random_uuid()::text, 'Acrylic/Mica Office Door Sign with Metallic Stand-offs', '/assets/Works/Mica Sign.jpg', 'signs', 'Labels', 'Horizon Addis Tyres Share Company', false, 28, true, now(), now()),
  (gen_random_uuid()::text, 'Acrylic/Mica Office Directional Sign', '/assets/Works/Mica Sign_2.jpg', 'signs', 'Labels', 'National Blood Bank Service', false, 29, true, now(), now()),
  (gen_random_uuid()::text, 'Acrylic/Mica Room Identification Sign', '/assets/Works/Mica Sign_3.jpg', 'signs', 'Labels', 'Horizon Addis Tyres Share Company', false, 30, true, now(), now()),
  (gen_random_uuid()::text, 'Commercial Delivery Truck Vehicle Wrap / Branding', '/assets/Works/Car Branding.jpg', 'signs', 'Shelf Strips', 'Tsehay Paints (Beherant Trading)', false, 31, true, now(), now()),
  (gen_random_uuid()::text, 'Commercial Van Vehicle Wrap / Branding', '/assets/Works/Car Branding_2.jpg', 'signs', 'Shelf Strips', 'Geosynthetics Industrial Works PLC (GIW)', false, 32, true, now(), now()),
  -- Events & Seasonal
  (gen_random_uuid()::text, 'Branded Round-Neck Promotional T-shirt', '/assets/Works/T-shirt.jpg', 'events', 'Branded Clothing', 'National Blood Bank Service', false, 33, true, now(), now()),
  (gen_random_uuid()::text, 'Embroidered Corporate Polo T-shirt', '/assets/Works/T-shirt_2.jpg', 'events', 'Branded Clothing', 'Horizon Addis Tyres Share Company', false, 34, true, now(), now()),
  (gen_random_uuid()::text, 'Branded Promotional Gift Set (Polo Shirt, Mesh Cap, and Mug)', '/assets/Works/T-shirt & Cap, Mug.jpg', 'events', 'Branded Clothing', 'Horizon Addis Tyres Share Company', false, 35, true, now(), now()),
  (gen_random_uuid()::text, 'Branded Staff Polo T-shirt & Leather Bill Presenter', '/assets/Works/T-shirt & Bill Holder.jpg', 'events', 'Branded Clothing', 'Grand Eliana Hotel / Sky Steak House', false, 36, true, now(), now()),
  (gen_random_uuid()::text, 'Embroidered Outdoor Sun Hats / Safari Hats', '/assets/Works/Cap.jpg', 'events', 'Branded Clothing', 'Oromia LLRP-II (Lowlands Livelihood Resilience Project)', false, 37, true, now(), now()),
  (gen_random_uuid()::text, 'Promotional Set (Cap, Notebook, and Pen)', '/assets/Works/Cap_2.jpg', 'events', 'Branded Clothing', 'GW Trading PLC', false, 38, true, now(), now()),
  (gen_random_uuid()::text, 'High-Visibility Reflective Safety Vests', '/assets/Works/Safety Vests.jpg', 'events', 'Branded Clothing', 'Oromia LLRP-II (Lowlands Livelihood Resilience Project)', false, 39, true, now(), now()),
  (gen_random_uuid()::text, 'High-Visibility Reflective Safety Vests', '/assets/Works/Safety Vests_2.jpg', 'events', 'Branded Clothing', 'GW Trading PLC', false, 40, true, now(), now()),
  (gen_random_uuid()::text, 'High-Visibility Reflective Safety Vests', '/assets/Works/Safety Vests_3.jpg', 'events', 'Branded Clothing', 'GW Trading PLC', false, 41, true, now(), now()),
  (gen_random_uuid()::text, 'Stack of High-Visibility Reflective Safety Vests', '/assets/Works/Safety Vests_4.jpg', 'events', 'Branded Clothing', 'Chapter Three Building & Electrical Materials Trade', false, 42, true, now(), now()),
  (gen_random_uuid()::text, 'Branded High-Visibility Safety Vests & Hard Hat', '/assets/Works/Safety Vests & Helmet.jpg', 'events', 'Branded Clothing', 'Oromia LLRP-II (Lowlands Livelihood Resilience Project)', false, 43, true, now(), now()),
  (gen_random_uuid()::text, 'Custom Laser-Cut Floral Wedding Invitation Card', '/assets/Works/Weeding Card.jpg', 'events', 'Invitations', 'Personal / Private Event', false, 44, true, now(), now()),
  -- Creative & Finishing
  (gen_random_uuid()::text, 'Laser-Engraved Wooden Decorative Panel / Wall Art', '/assets/Works/Engrave.jpg', 'creative', 'Graphic Design', 'Grand Eliana Hotel', false, 45, true, now(), now());

-- ─────────── QUICK REQUESTS (Quick Orders - 5 records) ───────────
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, '+254 712 111 222', 'john.k@apexsolutions.com', 'Apex Solutions', 'John', 'Corporate Annual Report (A4, 64 pages)', 500, false, '2026-05-12 06:00:00+00', now()),
  (gen_random_uuid()::text, '+254 722 333 444', 'alice.w@designco.co.ke', 'DesignCo Kenya', 'Alice', 'Bi-Monthly Fashion Magazine (A5, 48 pages)', 2500, true, '2026-05-10 08:00:00+00', now()),
  (gen_random_uuid()::text, '+254 733 555 666', 'peter.m@nairobiacademy.ac.ke', 'Nairobi Academy', 'Peter', 'High-School Yearbook (A4, Hardcover)', 350, false, '2026-05-08 11:00:00+00', now()),
  (gen_random_uuid()::text, '+254 705 999 888', 'mercy@greenhouse.co.ke', 'Greenhouse Organics', 'Mercy', 'Artisanal Product Labels (Custom Die-Cut)', 10000, true, '2026-05-05 07:00:00+00', now()),
  (gen_random_uuid()::text, '+254 799 444 333', 'samuel@filmfest.ke', 'Nairobi Film Festival', 'Samuel', 'Glossy Event Program Booklet (A5, 12 pages)', 1200, false, '2026-05-03 13:00:00+00', now());

-- ─────────── PARTNERSHIP REQUESTS (5 records) ───────────
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Sarah Kimani', '+254 722 888 999', 'Elite Marketing Agency', 'Flyer Printing, Large Format Vinyl Banners, Roll-up Banners, Promotional Merchandise', false, '2026-05-11 06:00:00+00', now()),
  (gen_random_uuid()::text, 'Otieno Odhiambo', '+254 733 444 555', 'Nairobi Tech Hub', 'Event Badge Printing, Corporate Branded Stationery, Custom Team Tees', true, '2026-05-09 08:00:00+00', now()),
  (gen_random_uuid()::text, 'Emily Chebet', '+254 711 222 333', 'Chebet Weddings & Events', 'Luxury Textured Wedding Stationery, Gold Foil Invitation Suites, Letterpress Escort Cards', false, '2026-05-07 11:00:00+00', now()),
  (gen_random_uuid()::text, 'Dennis Murimi', '+254 701 555 666', 'Murimi Real Estate', 'Outdoor Corrugated Yard Signs, High-Gloss Property Listing Brochures', true, '2026-05-04 07:00:00+00', now()),
  (gen_random_uuid()::text, 'Anita Patel', '+254 755 222 111', 'Patel Retail Chains', 'Custom Cardboard Counter Displays, Embossed Product Boxes, UV-coated Product Labels', false, '2026-05-02 13:00:00+00', now());

-- ─────────── QUOTE REQUESTS (10 records) ───────────
-- Get service and user IDs (these will be the first ones we inserted above)
WITH svc AS (
  SELECT id, slug FROM "Service"
), usr AS (
  SELECT id, email FROM "User"
)
INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT
  gen_random_uuid()::text, v.*
FROM (VALUES
  ('Q-2026-0001', 'Wanjiku Kariuki', 'wanjiku.k@email.com', '+254 712 345 678', 'Kariuki Enterprises', (SELECT id FROM svc WHERE slug = 'flyer-printing' LIMIT 1), 5000, 'A5 (148mm x 210mm)', '150gsm Gloss Paper', 'Need flyers for a product launch event. Full color both sides.', 'QUOTED'::"QuoteStatus", (SELECT id FROM usr WHERE email = 'grace@dafprinting.com' LIMIT 1), 25000, '2026-06-15 00:00:00+00', '2026-05-01 07:30:00+00'),
  ('Q-2026-0002', 'James Ochieng', 'james.o@email.com', '+254 723 456 789', 'Ochieng Solutions Ltd', (SELECT id FROM svc WHERE slug = 'brochure-catalog-printing' LIMIT 1), 1000, 'A4 (210mm x 297mm)', '200gsm Matte Paper with Fold', 'Corporate brochure for annual report. Tri-fold design.', 'REVIEWING'::"QuoteStatus", (SELECT id FROM usr WHERE email = 'grace@dafprinting.com' LIMIT 1), NULL, NULL, '2026-05-03 11:00:00+00'),
  ('Q-2026-0003', 'Mary Kamau', 'mary.kamau@email.com', '+254 734 567 890', NULL, (SELECT id FROM svc WHERE slug = 'wedding-stationery' LIMIT 1), 100, 'Custom (5x7 inches)', '300gsm Premium Cardstock', 'Wedding invitation suites with laser-cut details and gold foil.', 'ACCEPTED'::"QuoteStatus", (SELECT id FROM usr WHERE email = 'john@dafprinting.com' LIMIT 1), 45000, '2026-07-01 00:00:00+00', '2026-04-28 06:00:00+00'),
  ('Q-2026-0004', 'TechConnect Africa', 'events@techconnect.africa', '+254 745 678 901', 'TechConnect Africa', (SELECT id FROM svc WHERE slug = 'large-format-printing' LIMIT 1), 50, '3m x 2m Banner', 'Premium Vinyl Banner', 'Conference banners for TechConnect Summit 2026.', 'PENDING'::"QuoteStatus", NULL, NULL, NULL, '2026-05-05 08:00:00+00'),
  ('Q-2026-0005', 'Achieng Family', 'family.achieng@email.com', '+254 756 789 012', NULL, (SELECT id FROM svc WHERE slug = 'flyer-printing' LIMIT 1), 200, 'A6 (105mm x 148mm)', '170gsm Satin Paper', 'Church anniversary invitation flyers.', 'DECLINED'::"QuoteStatus", (SELECT id FROM usr WHERE email = 'john@dafprinting.com' LIMIT 1), 8500, '2026-05-20 00:00:00+00', '2026-04-20 05:30:00+00'),
  ('Q-2026-0006', 'David Mwangi', 'david.mwangi@email.com', '+254 767 890 123', 'Mwangi Media Group', (SELECT id FROM svc WHERE slug = 'business-card-printing' LIMIT 1), 500, 'Standard (85mm x 55mm)', '350gsm Premium Card with Spot UV', 'Business cards for media company. Need 5 variations.', 'QUOTED'::"QuoteStatus", (SELECT id FROM usr WHERE email = 'grace@dafprinting.com' LIMIT 1), 12000, '2026-06-30 00:00:00+00', '2026-05-02 13:00:00+00'),
  ('Q-2026-0007', 'Nairobi Design Collective', 'info@nairobidesign.co.ke', '+254 778 901 234', 'Nairobi Design Collective', (SELECT id FROM svc WHERE slug = 'packaging-label-printing' LIMIT 1), 10000, 'Custom Box (30cm x 20cm x 10cm)', 'Kraft Cardboard', 'Custom packaging boxes for artisanal products.', 'REVIEWING'::"QuoteStatus", NULL, NULL, NULL, '2026-05-04 10:00:00+00'),
  ('Q-2026-0008', 'Elizabeth Nyambura', 'eliz.nyambura@email.com', '+254 789 012 345', NULL, (SELECT id FROM svc WHERE slug = 'book-magazine-printing' LIMIT 1), 200, 'A5 (148mm x 210mm)', '80gsm Book Paper, Softcover', 'Poetry book for self-publishing. 120 pages.', 'PENDING'::"QuoteStatus", NULL, NULL, NULL, '2026-05-06 06:15:00+00'),
  ('Q-2026-0009', 'Peter & Grace Waweru', 'waweru.wedding@email.com', '+254 790 123 456', NULL, (SELECT id FROM svc WHERE slug = 'wedding-stationery' LIMIT 1), 150, 'Custom (6x8 inches)', '300gsm Textured Cardstock', 'Complete wedding stationery set. Rustic theme.', 'QUOTED'::"QuoteStatus", (SELECT id FROM usr WHERE email = 'john@dafprinting.com' LIMIT 1), 65000, '2026-07-15 00:00:00+00', '2026-05-01 08:00:00+00'),
  ('Q-2026-0010', 'Nakuru County Government', 'procurement@nakuru.go.ke', '+254 701 234 567', 'Nakuru County Government', (SELECT id FROM svc WHERE slug = 'large-format-printing' LIMIT 1), 100, '1.2m x 0.8m Poster', 'Weatherproof Vinyl', 'Government health awareness campaign posters.', 'QUOTED'::"QuoteStatus", NULL, 180000, '2026-06-01 00:00:00+00', '2026-04-25 07:00:00+00')
) AS v("quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt");

-- ============================================================
-- FINAL SUMMARY
-- ============================================================
SELECT '✅ DATABASE FULLY SEEDED!' AS result;

SELECT COUNT(*) || ' Services' AS "Summary" FROM "Service"
UNION ALL
SELECT COUNT(*) || ' Categories' FROM "Category"
UNION ALL
SELECT COUNT(*) || ' Banners' FROM "Banner"
UNION ALL
SELECT COUNT(*) || ' Collections' FROM "Collection"
UNION ALL
SELECT COUNT(*) || ' Users' FROM "User"
UNION ALL
SELECT COUNT(*) || ' Testimonials' FROM "Testimonial"
UNION ALL
SELECT COUNT(*) || ' Portfolio Items' FROM "PortfolioItem"
UNION ALL
SELECT COUNT(*) || ' Quick Orders' FROM "QuickRequest"
UNION ALL
SELECT COUNT(*) || ' Partnership Requests' FROM "PartnershipRequest"
UNION ALL
SELECT COUNT(*) || ' Quote Requests' FROM "QuoteRequest"
ORDER BY 1;