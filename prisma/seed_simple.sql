-- ============================================================
-- DAF PRINTING - SIMPLE SEED (one file, paste & run)
-- ============================================================
-- STEP 1: Run this to enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- TESTIMONIALS (6 records)
-- ============================================================
DELETE FROM "Testimonial";
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Sarah Jenkins', 'Vertex Agency', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'upload', 'Daf Printing delivered exceptional quality flyers and banners for our brand launch. Absolute lifesavers with their quick turnaround!', 5, true, true, now() - interval '15 days', now());
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Ethan Chan', 'ShopEase', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'upload', 'Great quality products and helpful customer support.', 5, true, true, now() - interval '17 days', now());
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Michael K.', 'PixelLabs', 'https://api.dicebear.com/7.x/bottts/svg?seed=Michael', 'clipart', 'The spot UV business cards turned out incredibly sleek.', 5, true, true, now() - interval '20 days', now());
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Jane Doe', 'Creative Studio', 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jane', 'clipart', 'Their laser-cut wedding invitation suite was absolutely stunning!', 5, true, true, now() - interval '27 days', now());
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'David Mwangi', 'Mwangi Media Group', NULL, 'none', 'Very reliable printer for commercial requirements.', 4, true, false, now() - interval '35 days', now());
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Elizabeth Nyambura', 'Self-Publisher', NULL, 'none', 'Excellent customer service and highly professional binding.', 5, true, true, now() - interval '40 days', now());

-- ============================================================
-- QUICK ORDERS (5 records)
-- ============================================================
DELETE FROM "QuickRequest";
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, '+254 712 111 222', 'john.k@apexsolutions.com', 'Apex Solutions', 'John', 'Corporate Annual Report (A4, 64 pages)', 500, false, now() - interval '13 days', now());
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, '+254 722 333 444', 'alice.w@designco.co.ke', 'DesignCo Kenya', 'Alice', 'Bi-Monthly Fashion Magazine (A5, 48 pages)', 2500, true, now() - interval '15 days', now());
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, '+254 733 555 666', 'peter.m@nairobiacademy.ac.ke', 'Nairobi Academy', 'Peter', 'High-School Yearbook (A4, Hardcover)', 350, false, now() - interval '17 days', now());
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, '+254 705 999 888', 'mercy@greenhouse.co.ke', 'Greenhouse Organics', 'Mercy', 'Artisanal Product Labels (Custom Die-Cut)', 10000, true, now() - interval '20 days', now());
INSERT INTO "QuickRequest" (id, phone, email, company, "firstName", "magazineType", quantity, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, '+254 799 444 333', 'samuel@filmfest.ke', 'Nairobi Film Festival', 'Samuel', 'Glossy Event Program Booklet (A5, 12 pages)', 1200, false, now() - interval '22 days', now());

-- ============================================================
-- PARTNERSHIP REQUESTS (5 records)
-- ============================================================
DELETE FROM "PartnershipRequest";
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 'Sarah Kimani', '+254 722 888 999', 'Elite Marketing Agency', 'Flyer Printing, Large Format Vinyl Banners, Roll-up Banners, Promotional Merchandise', false, now() - interval '14 days', now());
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 'Otieno Odhiambo', '+254 733 444 555', 'Nairobi Tech Hub', 'Event Badge Printing, Corporate Branded Stationery, Custom Team Tees', true, now() - interval '16 days', now());
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 'Emily Chebet', '+254 711 222 333', 'Chebet Weddings & Events', 'Luxury Textured Wedding Stationery, Gold Foil Invitation Suites, Letterpress Escort Cards', false, now() - interval '18 days', now());
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 'Dennis Murimi', '+254 701 555 666', 'Murimi Real Estate', 'Outdoor Corrugated Yard Signs, High-Gloss Property Listing Brochures', true, now() - interval '21 days', now());
INSERT INTO "PartnershipRequest" (id, "contactName", phone, company, services, "isRead", "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 'Anita Patel', '+254 755 222 111', 'Patel Retail Chains', 'Custom Cardboard Counter Displays, Embossed Product Boxes, UV-coated Product Labels', false, now() - interval '23 days', now());

-- ============================================================
-- QUOTES (10 records - requires Service & User tables)
-- ============================================================
-- Insert services first (skip if already exist)
INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Flyer Printing', 'flyer-printing', 'High-quality flyer printing.', '/assets/flyer-printing.jpg', true, 1, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'flyer-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Wedding Stationery', 'wedding-stationery', 'Elegant wedding stationery.', '/assets/wedding-stationery.jpg', true, 7, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'wedding-stationery');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Large Format Printing', 'large-format-printing', 'Banners, posters, signage.', '/assets/large-format.jpg', true, 5, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'large-format-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Brochure & Catalog Printing', 'brochure-catalog-printing', 'Professional brochures.', '/assets/brochure-printing.jpg', true, 2, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'brochure-catalog-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Business Card Printing', 'business-card-printing', 'Premium business cards.', '/assets/business-cards.jpg', true, 3, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'business-card-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Packaging & Label Printing', 'packaging-label-printing', 'Custom packaging.', '/assets/packaging.jpg', true, 6, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'packaging-label-printing');

INSERT INTO "Service" (id, title, slug, description, image, "isActive", "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Book & Magazine Printing', 'book-magazine-printing', 'Book printing services.', '/assets/book-printing.jpg', true, 4, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Service" WHERE slug = 'book-magazine-printing');

-- Insert users (skip if already exist)
INSERT INTO "User" (id, name, email, password, role, "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Daf Printing Admin', 'admin@dafprinting.com', '$2b$10$wJvGmOfOYIwY8H8pMq1p8uG3Vq4VN3TJUkZdLbML1Won5HNJKZnWe', 'SUPER_ADMIN', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'admin@dafprinting.com');

INSERT INTO "User" (id, name, email, password, role, "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Grace Mwangi', 'grace@dafprinting.com', '$2b$10$yHlw0BVqGjd8mJ8FpHY1IOWR4H8aNYDV2N1GJkPTjsPxJOdCuBV4q', 'ADMIN', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'grace@dafprinting.com');

INSERT INTO "User" (id, name, email, password, role, "isActive", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'John Kamau', 'john@dafprinting.com', '$2b$10$yHlw0BVqGjd8mJ8FpHY1IOWR4H8aNYDV2N1GJkPTjsPxJOdCuBV4q', 'STAFF', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'john@dafprinting.com');

-- Insert quotes (use TEXT for status, not enum)
DELETE FROM "QuoteRequest";
INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0001', 'Wanjiku Kariuki', 'wanjiku.k@email.com', '+254 712 345 678', 'Kariuki Enterprises', s.id, 5000, 'A5 (148mm x 210mm)', '150gsm Gloss Paper', 'Need flyers for product launch.', 'QUOTED', u.id, 25000, now() + interval '21 days', now() - interval '24 days', now()
FROM "Service" s, "User" u WHERE s.slug = 'flyer-printing' AND u.email = 'grace@dafprinting.com';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0002', 'James Ochieng', 'james.o@email.com', '+254 723 456 789', 'Ochieng Solutions Ltd', s.id, 1000, 'A4 (210mm x 297mm)', '200gsm Matte Paper with Fold', 'Corporate brochure tri-fold.', 'REVIEWING', u.id, NULL, NULL, now() - interval '22 days', now()
FROM "Service" s, "User" u WHERE s.slug = 'brochure-catalog-printing' AND u.email = 'grace@dafprinting.com';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0003', 'Mary Kamau', 'mary.kamau@email.com', '+254 734 567 890', NULL, s.id, 100, 'Custom (5x7 inches)', '300gsm Premium Cardstock', 'Wedding invites gold foil.', 'ACCEPTED', u.id, 45000, now() + interval '36 days', now() - interval '27 days', now()
FROM "Service" s, "User" u WHERE s.slug = 'wedding-stationery' AND u.email = 'john@dafprinting.com';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0004', 'TechConnect Africa', 'events@techconnect.africa', '+254 745 678 901', 'TechConnect Africa', s.id, 50, '3m x 2m Banner', 'Premium Vinyl Banner', 'Conference banners.', 'PENDING', NULL, NULL, NULL, now() - interval '20 days', now()
FROM "Service" s WHERE s.slug = 'large-format-printing';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0005', 'Achieng Family', 'family.achieng@email.com', '+254 756 789 012', NULL, s.id, 200, 'A6 (105mm x 148mm)', '170gsm Satin Paper', 'Church flyers.', 'DECLINED', u.id, 8500, now() - interval '5 days', now() - interval '35 days', now()
FROM "Service" s, "User" u WHERE s.slug = 'flyer-printing' AND u.email = 'john@dafprinting.com';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0006', 'David Mwangi', 'david.mwangi@email.com', '+254 767 890 123', 'Mwangi Media Group', s.id, 500, 'Standard (85mm x 55mm)', '350gsm Premium Card with Spot UV', 'Business cards 5 variations.', 'QUOTED', u.id, 12000, now() + interval '36 days', now() - interval '23 days', now()
FROM "Service" s, "User" u WHERE s.slug = 'business-card-printing' AND u.email = 'grace@dafprinting.com';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0007', 'Nairobi Design Collective', 'info@nairobidesign.co.ke', '+254 778 901 234', 'Nairobi Design Collective', s.id, 10000, 'Custom Box (30x20x10cm)', 'Kraft Cardboard', 'Custom packaging.', 'REVIEWING', NULL, NULL, NULL, now() - interval '21 days', now()
FROM "Service" s WHERE s.slug = 'packaging-label-printing';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0008', 'Elizabeth Nyambura', 'eliz.nyambura@email.com', '+254 789 012 345', NULL, s.id, 200, 'A5 (148mm x 210mm)', '80gsm Book Paper, Softcover', 'Poetry book 120 pages.', 'PENDING', NULL, NULL, NULL, now() - interval '19 days', now()
FROM "Service" s WHERE s.slug = 'book-magazine-printing';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0009', 'Peter & Grace Waweru', 'waweru.wedding@email.com', '+254 790 123 456', NULL, s.id, 150, 'Custom (6x8 inches)', '300gsm Textured Cardstock', 'Wedding rustic theme.', 'QUOTED', u.id, 65000, now() + interval '51 days', now() - interval '24 days', now()
FROM "Service" s, "User" u WHERE s.slug = 'wedding-stationery' AND u.email = 'john@dafprinting.com';

INSERT INTO "QuoteRequest" (id, "quoteNumber", "customerName", "customerEmail", "customerPhone", "customerCompany", "serviceId", quantity, size, material, notes, status, "assignedTo", "quotedPrice", "validUntil", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'Q-2026-0010', 'Nakuru County Government', 'procurement@nakuru.go.ke', '+254 701 234 567', 'Nakuru County Government', s.id, 100, '1.2m x 0.8m Poster', 'Weatherproof Vinyl', 'Health campaign posters.', 'QUOTED', NULL, 180000, now() + interval '7 days', now() - interval '30 days', now()
FROM "Service" s WHERE s.slug = 'large-format-printing';

-- ============================================================
-- FINAL COUNT SUMMARY
-- ============================================================
SELECT 'TESTIMONIALS: ' || COUNT(*) FROM "Testimonial"
UNION ALL SELECT 'QUICK ORDERS: ' || COUNT(*) FROM "QuickRequest"
UNION ALL SELECT 'PARTNERSHIPS: ' || COUNT(*) FROM "PartnershipRequest"
UNION ALL SELECT 'QUOTES: ' || COUNT(*) FROM "QuoteRequest";