-- =====================================================
-- SEED CATEGORIES FOR DAF PRINTING
-- Run this in your Supabase SQL Editor or psql
-- =====================================================

INSERT INTO "Category" (id, name, slug, description, image, "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES
(
  gen_random_uuid(),
  'Magazines & Books',
  'magazines-books',
  'Full-color magazine and book printing services including perfect binding, saddle stitching, hardcover, and softcover options for publishers, authors, and businesses.',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
  1,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Advertisement Banners',
  'advertisement-banners',
  'High-impact banner printing for outdoor and indoor advertising. Includes vinyl banners, mesh banners, retractable banners, and feather flags in various sizes.',
  'https://images.unsplash.com/photo-1603912699214-92627f304eb6?w=400&h=400&fit=crop',
  2,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'T-shirt/Cap (Apparel)',
  'tshirt-cap-apparel',
  'Custom printed apparel including T-shirts, caps, polo shirts, and hoodies. Perfect for corporate branding, events, and promotional merchandise using screen printing or DTG.',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
  3,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Office Stationery',
  'office-stationery',
  'Professional office stationery printing including letterheads, compliment slips, envelopes, notepads, diaries, and branded office supplies for your business.',
  'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400&h=400&fit=crop',
  4,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Light Box',
  'light-box',
  'Illuminated light box signage for retail stores, restaurants, and businesses. Available in various sizes with LED lighting for eye-catching displays.',
  'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400&h=400&fit=crop',
  5,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Bill & Receipt',
  'bill-receipt',
  'Custom printed bills, receipts, invoices, and voucher books for businesses. Includes NCR carbonless sets, thermal rolls, and customized receipt books.',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop',
  6,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Flyers & Brochures',
  'flyers-brochures',
  'Eye-catching flyer and brochure printing for marketing campaigns, events, and promotions. Choose from multiple sizes, folds, and paper finishes.',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop',
  7,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Corporate Gifts',
  'corporate-gifts',
  'Custom branded corporate gifts including custom mugs, pens, notebooks, USB drives, keychains, and promotional items perfect for client appreciation and events.',
  'https://images.unsplash.com/photo-1593510987181-0795ff0ed385?w=400&h=400&fit=crop',
  8,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Exhibition & Display',
  'exhibition-display',
  'Complete exhibition and display printing solutions including roll-up banners, pop-up displays, exhibition stands, backdrop banners, and trade show materials.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
  9,
  true,
  NOW(),
  NOW()
);

-- =====================================================
-- SEED BANNER ADS (3 sample slides)
-- =====================================================
INSERT INTO "Banner" (id, title, "imageUrl", "linkUrl", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES
(
  gen_random_uuid(),
  'High-Impact Print Campaigns',
  'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=600&fit=crop',
  '/request-quote',
  0,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Fast Turnaround for Every Order',
  'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=1200&h=600&fit=crop',
  '/services',
  1,
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Custom Packaging & Stationery',
  'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=1200&h=600&fit=crop',
  '/request-quote',
  2,
  true,
  NOW(),
  NOW()
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- SELECT id, name, slug, image FROM "Category" ORDER BY "sortOrder";
-- SELECT id, title, "imageUrl" FROM "Banner" ORDER BY "sortOrder";