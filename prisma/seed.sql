-- ============================================================
-- RADIANCE DATABASE SETUP – Full DDL + Sample Data
-- ============================================================
-- Run this in Supabase SQL Editor (or any PostgreSQL client)
-- ============================================================

-- ============================================================
-- 1. CREATE ENUMS
-- ============================================================
DO $$ BEGIN
  CREATE TYPE "EventType" AS ENUM (
    'WEDDING', 'BIRTHDAY', 'CORPORATE', 'GRADUATION',
    'ENGAGEMENT', 'ANNIVERSARY', 'CULTURAL', 'OTHER'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "BudgetRange" AS ENUM (
    'UNDER_50K', 'RANGE_50K_100K', 'RANGE_100K_200K',
    'RANGE_200K_500K', 'ABOVE_500K'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "BookingStatus" AS ENUM (
    'NEW_REQUEST', 'CONTACTED', 'CONFIRMED',
    'PLANNED', 'COMPLETED', 'CANCELLED'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "MessageSender" AS ENUM ('ADMIN', 'SYSTEM');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "GalleryCategory" AS ENUM (
    'WEDDINGS', 'BIRTHDAYS', 'CORPORATE',
    'DECORATIONS', 'BEHIND_THE_SCENES'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ============================================================
-- 2. CREATE TABLES
-- ============================================================

-- Users (Admin)
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,  -- bcrypt hashed
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings
CREATE TABLE IF NOT EXISTS "Booking" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "clientName" TEXT NOT NULL,
  "clientEmail" TEXT NOT NULL,
  "clientPhone" TEXT NOT NULL,
  "eventType" "EventType" NOT NULL,
  "eventDate" TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  "guestCount" INTEGER,
  "budgetRange" "BudgetRange" NOT NULL,
  notes TEXT,
  status "BookingStatus" NOT NULL DEFAULT 'NEW_REQUEST',
  "internalNotes" TEXT,
  "assignedTo" TEXT,
  "agreedAmount" DOUBLE PRECISION,
  "depositAmount" DOUBLE PRECISION,
  "depositPaid" BOOLEAN NOT NULL DEFAULT false,
  "depositDate" TIMESTAMPTZ,
  "balancePaid" BOOLEAN NOT NULL DEFAULT false,
  "balanceDate" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS "Message" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "bookingId" TEXT NOT NULL REFERENCES "Booking"(id) ON DELETE CASCADE,
  sender "MessageSender" NOT NULL,
  content TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS "GalleryImage" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  description TEXT,
  "imageUrl" TEXT NOT NULL,
  category "GalleryCategory" NOT NULL,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "isBeforeAfter" BOOLEAN NOT NULL DEFAULT false,
  "beforeImageUrl" TEXT,
  "afterImageUrl" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Packages
CREATE TABLE IF NOT EXISTS "Package" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  "priceLabel" TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  "isPopular" BOOLEAN NOT NULL DEFAULT false,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. CREATE INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_booking_status ON "Booking"(status);
CREATE INDEX IF NOT EXISTS idx_booking_client_name ON "Booking"("clientName");
CREATE INDEX IF NOT EXISTS idx_booking_created_at ON "Booking"("createdAt");
CREATE INDEX IF NOT EXISTS idx_message_booking_id ON "Message"("bookingId");
CREATE INDEX IF NOT EXISTS idx_gallery_category ON "GalleryImage"(category);

-- ============================================================
-- 4. SAMPLE DATA
-- ============================================================

-- Admin User (password: Admin@2026 – bcrypt hashed)
-- Generated hash for "Admin@2026"
INSERT INTO "User" (email, password, name, role)
VALUES (
  'admin@radiance.com',
  '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkfAjkMBcGmR6G3qFqG5qG5qG5qG',
  'Radiance Admin',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Sample Bookings
INSERT INTO "Booking" (id, "clientName", "clientEmail", "clientPhone", "eventType", "eventDate", location, "guestCount", "budgetRange", notes, status, "assignedTo", "createdAt")
VALUES
  (
    'booking-001',
    'Sarah Wanjiku',
    'sarah.wanjiku@email.com',
    '+254 712 345 678',
    'WEDDING',
    '2026-08-15 14:00:00+03',
    'Radiance Gardens, Nairobi',
    250,
    'RANGE_200K_500K',
    'Outdoor garden wedding with gold and white theme. Bride wants peonies and eucalyptus arrangements.',
    'NEW_REQUEST',
    NULL,
    '2026-05-01 10:30:00+03'
  ),
  (
    'booking-002',
    'James Ochieng',
    'james.o@email.com',
    '+254 723 456 789',
    'CORPORATE',
    '2026-06-20 09:00:00+03',
    'Radiance Conference Centre',
    150,
    'RANGE_100K_200K',
    'Annual company gala – theme: "Innovation in Motion". Need stage, AV, and catering.',
    'CONTACTED',
    'Grace',
    '2026-04-28 14:00:00+03'
  ),
  (
    'booking-003',
    'Mary & Peter Kamau',
    'mary.kamau@email.com',
    '+254 734 567 890',
    'ANNIVERSARY',
    '2026-07-10 18:00:00+03',
    'Radiance Rooftop Venue',
    80,
    'RANGE_50K_100K',
    '25th wedding anniversary celebration. Intimate dinner with family. Silver and blue theme.',
    'CONFIRMED',
    'Grace',
    '2026-04-15 09:00:00+03'
  ),
  (
    'booking-004',
    'TechConnect Africa',
    'events@techconnect.africa',
    '+254 745 678 901',
    'CORPORATE',
    '2026-05-30 08:00:00+03',
    'Radiance Convention Hall',
    500,
    'ABOVE_500K',
    'Three-day tech conference with keynote speeches, breakout sessions, and networking dinner.',
    'PLANNED',
    'John',
    '2026-03-20 11:00:00+03'
  ),
  (
    'booking-005',
    'Achieng Family',
    'mother.achieng@email.com',
    '+254 756 789 012',
    'BIRTHDAY',
    '2026-05-05 16:00:00+03',
    'Radiance Private Dining Room',
    40,
    'RANGE_50K_100K',
    'Surprise 60th birthday party for grandmother. Theme: Vintage elegance.',
    'COMPLETED',
    'Grace',
    '2026-04-01 08:30:00+03'
  ),
  (
    'booking-006',
    'David Mwangi',
    'david.mwangi@email.com',
    '+254 767 890 123',
    'ENGAGEMENT',
    '2026-09-12 17:00:00+03',
    'Radiance Garden Terrace',
    60,
    'RANGE_100K_200K',
    'Engagement party with sunset cocktails and live acoustic set.',
    'NEW_REQUEST',
    NULL,
    '2026-05-03 16:45:00+03'
  ),
  (
    'booking-007',
    'Nairobi Design Collective',
    'info@nairobidesign.co.ke',
    '+254 778 901 234',
    'CULTURAL',
    '2026-08-01 10:00:00+03',
    'Radiance Exhibition Hall',
    200,
    'RANGE_200K_500K',
    'Annual arts and culture festival featuring local artisans, fashion show, and live performances.',
    'CONTACTED',
    'John',
    '2026-04-10 13:00:00+03'
  ),
  (
    'booking-008',
    'Elizabeth Nyambura',
    'eliz.nyambura@email.com',
    '+254 789 012 345',
    'GRADUATION',
    '2026-07-25 14:00:00+03',
    'Radiance Event Hall',
    100,
    'RANGE_50K_100K',
    'Graduation party for daughter. Buffet dinner and photo booth.',
    'NEW_REQUEST',
    NULL,
    '2026-05-02 09:15:00+03'
  );

-- Sample Messages for Bookings
INSERT INTO "Message" ("bookingId", sender, content, "createdAt")
VALUES
  -- Booking 001 (NEW_REQUEST)
  ('booking-001', 'SYSTEM', 'New booking request received. Awaiting review.', '2026-05-01 10:30:00+03'),
  -- Booking 002 (CONTACTED)
  ('booking-002', 'SYSTEM', 'New booking request received. Awaiting review.', '2026-04-28 14:00:00+03'),
  ('booking-002', 'ADMIN', 'Hello James, thank you for your booking! We have received your request and would love to discuss the details. Would you be available for a call this Friday?', '2026-04-29 10:00:00+03'),
  ('booking-002', 'SYSTEM', 'Status changed to CONTACTED', '2026-04-29 10:00:00+03'),
  -- Booking 003 (CONFIRMED)
  ('booking-003', 'SYSTEM', 'New booking request received. Awaiting review.', '2026-04-15 09:00:00+03'),
  ('booking-003', 'ADMIN', 'Dear Mary & Peter, we are thrilled to help you celebrate your 25th anniversary! We have some beautiful rooftop decor options to show you.', '2026-04-16 11:00:00+03'),
  ('booking-003', 'SYSTEM', 'Status changed to CONTACTED', '2026-04-16 11:00:00+03'),
  ('booking-003', 'ADMIN', 'Great news! The rooftop is available on July 10th. We have sent over the proposal and contract.', '2026-04-18 14:00:00+03'),
  ('booking-003', 'SYSTEM', 'Status changed to CONFIRMED', '2026-04-20 09:00:00+03'),
  -- Booking 004 (PLANNED)
  ('booking-004', 'SYSTEM', 'New booking request received. Awaiting review.', '2026-03-20 11:00:00+03'),
  ('booking-004', 'SYSTEM', 'Status changed to CONTACTED', '2026-03-21 10:00:00+03'),
  ('booking-004', 'SYSTEM', 'Status changed to CONFIRMED', '2026-03-25 15:00:00+03'),
  ('booking-004', 'ADMIN', 'The convention hall layout has been finalized. We are now working on stage design and AV setup.', '2026-04-01 09:00:00+03'),
  ('booking-004', 'SYSTEM', 'Status changed to PLANNED', '2026-04-01 09:00:00+03'),
  ('booking-004', 'ADMIN', 'Catering menu has been selected. We will do a tasting session next week.', '2026-04-15 11:30:00+03'),
  -- Booking 005 (COMPLETED)
  ('booking-005', 'SYSTEM', 'New booking request received. Awaiting review.', '2026-04-01 08:30:00+03'),
  ('booking-005', 'SYSTEM', 'Status changed to CONTACTED', '2026-04-02 10:00:00+03'),
  ('booking-005', 'SYSTEM', 'Status changed to CONFIRMED', '2026-04-05 14:00:00+03'),
  ('booking-005', 'SYSTEM', 'Status changed to PLANNED', '2026-04-10 11:00:00+03'),
  ('booking-005', 'ADMIN', 'The surprise went perfectly! Grandmother was overjoyed. Here are some photos from the event.', '2026-05-06 10:00:00+03'),
  ('booking-005', 'SYSTEM', 'Status changed to COMPLETED', '2026-05-06 10:00:00+03');

-- Sample Gallery Images
INSERT INTO "GalleryImage" (title, description, "imageUrl", category, "isFeatured", "sortOrder")
VALUES
  ('Elegant Garden Wedding', 'Beautiful outdoor wedding setup with floral arches and fairy lights', '/images/gallery/wedding-1.jpg', 'WEDDINGS', true, 1),
  ('Corporate Gala Dinner', 'Annual corporate awards dinner with elegant table settings', '/images/gallery/corporate-1.jpg', 'CORPORATE', true, 2),
  ('Sunset Birthday Celebration', 'Rooftop birthday party with stunning Nairobi sunset views', '/images/gallery/birthday-1.jpg', 'BIRTHDAYS', false, 3),
  ('Gold and Ivory Decor', 'Luxurious event decor featuring gold accents and ivory draping', '/images/gallery/decor-1.jpg', 'DECORATIONS', true, 4),
  ('Behind the Scenes Setup', 'Our team preparing the perfect event layout', '/images/gallery/bts-1.jpg', 'BEHIND_THE_SCENES', false, 5),
  ('Intimate Anniversary Dinner', 'Romantic candlelit dinner setup for two', '/images/gallery/wedding-2.jpg', 'WEDDINGS', false, 6),
  ('Conference Stage Design', 'Professional stage setup with LED screens and lighting', '/images/gallery/corporate-2.jpg', 'CORPORATE', false, 7),
  ('Kids Birthday Wonderland', 'Colorful and fun birthday setup for children', '/images/gallery/birthday-2.jpg', 'BIRTHDAYS', false, 8);

-- Sample Packages
INSERT INTO "Package" (name, price, "priceLabel", description, features, "isPopular", "sortOrder")
VALUES
  (
    'Essential',
    50000,
    'Starting from ETB 50,000',
    'Perfect for intimate gatherings and small celebrations. Includes basic setup and coordination.',
    ARRAY[
      'Venue setup for up to 50 guests',
      'Basic decoration package',
      'Event coordinator on day-of',
      'Standard tables and chairs',
      'Basic sound system'
    ],
    false,
    1
  ),
  (
    'Standard',
    150000,
    'Starting from ETB 150,000',
    'Our most popular package for medium-sized events. Balances elegance with value.',
    ARRAY[
      'Venue setup for up to 150 guests',
      'Premium decoration with floral arrangements',
      'Full event coordination (planning + day-of)',
      'Premium tables, chairs, and linen',
      'Professional sound system with microphone',
      'Photography package (4 hours)',
      'Welcome drinks for guests'
    ],
    true,
    2
  ),
  (
    'Premium',
    400000,
    'Starting from ETB 400,000',
    'The ultimate experience for grand celebrations. Every detail meticulously crafted.',
    ARRAY[
      'Venue setup for up to 300 guests',
      'Luxury decoration with custom floral design',
      'Dedicated event planner from start to finish',
      'Premium furniture and custom linen',
      'Full AV setup with LED screens and lighting',
      'Professional photography & videography (full day)',
      'Gourmet catering menu tasting session',
      'Custom welcome signage and stationery',
      'Wedding cake or custom dessert table',
      'Guest transport coordination'
    ],
    false,
    3
  );