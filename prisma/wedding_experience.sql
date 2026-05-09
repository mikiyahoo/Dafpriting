-- ============================================================
-- SAMPLE WEDDING INVITATION DATA
-- ============================================================
-- This creates sample data for the wedding invitation system
-- Run this after the main schema and booking data is in place
-- ============================================================

-- Sample Wedding Invitations
INSERT INTO "WeddingInvitation" (
  "id",
  "bookingId",
  "brideName",
  "groomName",
  "slug",
  "weddingDate",
  "weddingTime",
  "venueName",
  "venueAddress",
  "dressCode",
  "mapUrl",
  "story",
  "coverImage",
  "galleryImages",
  "theme",
  "primaryColor",
  "secondaryColor",
  "customMessage",
  "isPublished",
  "pdfUrl",
  "createdAt",
  "updatedAt"
) VALUES
  (
    'inv-001',
    'booking-001',
    'Sarah',
    'David',
    'sarah-and-david',
    '2026-08-15 14:00:00+03',
    '2:00 PM',
    'Radiance Gardens',
    'Westlands, Nairobi, Kenya',
    'Cocktail Attire',
    'https://maps.google.com/?q=Radiance+Gardens+Nairobi',
    'Sarah and David met during their university days and fell in love amidst the vibrant chaos of Nairobi''s coffee shops. After years of building their dreams together, they''re ready to celebrate their forever. Join us as we embark on this beautiful journey surrounded by the people who mean the most to us.',
    '/images/weddings/sarah-david-cover.jpg',
    ARRAY[
      '/images/weddings/sarah-david-1.jpg',
      '/images/weddings/sarah-david-2.jpg',
      '/images/weddings/sarah-david-3.jpg',
      '/images/weddings/sarah-david-4.jpg'
    ],
    'FLORAL_LUXURY',
    '#D4AF37',
    '#F5F5DC',
    'We can''t wait to celebrate with you! Please RSVP by July 15th.',
    true,
    '/pdfs/invitations/sarah-and-david.pdf',
    '2026-05-01 10:30:00+03',
    '2026-05-09 14:00:00+03'
  ),
  (
    'inv-002',
    'booking-003',
    'Mary',
    'Peter',
    'mary-and-peter-25th',
    '2026-07-10 18:00:00+03',
    '6:00 PM',
    'Radiance Rooftop Venue',
    'Koinange Street, Nairobi CBD, Kenya',
    'Semi-Formal',
    'https://maps.google.com/?q=Radiance+Rooftop+Nairobi',
    'Twenty-five years ago, Mary and Peter said "I do" in a small ceremony surrounded by family. Now, as they celebrate this incredible milestone, they want to share their joy with all of you who have been part of their journey. From raising children to building a home filled with love, their story is one of commitment, laughter, and unwavering support.',
    '/images/weddings/mary-peter-cover.jpg',
    ARRAY[
      '/images/weddings/mary-peter-1.jpg',
      '/images/weddings/mary-peter-2.jpg',
      '/images/weddings/mary-peter-3.jpg'
    ],
    'ROYAL_GOLD',
    '#FFD700',
    '#800080',
    'Celebrating 25 wonderful years of love, laughter, and forever. Join us!',
    true,
    '/pdfs/invitations/mary-and-peter.pdf',
    '2026-04-15 09:00:00+03',
    '2026-05-08 16:30:00+03'
  ),
  (
    'inv-003',
    'booking-006',
    'Grace',
    'Michael',
    'grace-and-michael',
    '2026-09-12 17:00:00+03',
    '5:00 PM',
    'Radiance Garden Terrace',
    'Karen, Nairobi, Kenya',
    'Garden Party Chic',
    'https://maps.google.com/?q=Radiance+Garden+Terrace+Karen',
    'What started as a chance meeting at a mutual friend''s barbecue has blossomed into the most beautiful love story. Grace and Michael share a passion for adventure, good food, and making memories. As they prepare to say "I do," they''re filled with gratitude for the love and support that surrounds them.',
    '/images/weddings/grace-michael-cover.jpg',
    ARRAY[
      '/images/weddings/grace-michael-1.jpg',
      '/images/weddings/grace-michael-2.jpg'
    ],
    'MODERN_MINIMAL',
    '#FFFFFF',
    '#2C3E50',
    'Love is not about how many days you''ve been together, but how much you love each other every day.',
    false,
    NULL,
    '2026-05-03 16:45:00+03',
    '2026-05-03 16:45:00+03'
  );

-- Sample RSVPs
INSERT INTO "RSVP" (
  "id",
  "invitationId",
  "guestName",
  "guestPhone",
  "attendance",
  "message",
  "createdAt"
) VALUES
  (
    'rsvp-001',
    'inv-001',
    'John & Mary Smith',
    '+254 712 345 678',
    'ATTENDING',
    'Congratulations! We''re so happy for you both. Looking forward to the celebration!',
    '2026-05-02 10:00:00+03'
  ),
  (
    'rsvp-002',
    'inv-001',
    'David Johnson',
    '+254 723 456 789',
    'ATTENDING',
    NULL,
    '2026-05-03 14:30:00+03'
  ),
  (
    'rsvp-003',
    'inv-001',
    'Sarah''s Aunt Margaret',
    '+254 734 567 890',
    'NOT_ATTENDING',
    'So sorry I can''t make it, but sending you both lots of love and congratulations!',
    '2026-05-04 09:15:00+03'
  ),
  (
    'rsvp-004',
    'inv-002',
    'Family Friends',
    '+254 745 678 901',
    'ATTENDING',
    '25 years! What a beautiful milestone. We wouldn''t miss it for the world.',
    '2026-04-20 16:00:00+03'
  ),
  (
    'rsvp-005',
    'inv-002',
    'Work Colleagues',
    '+254 756 789 012',
    'MAYBE',
    'We''re trying to make it work with our schedule. Will confirm soon!',
    '2026-04-25 11:30:00+03'
  );

-- Sample Gift Registry
INSERT INTO "GiftRegistry" (
  "id",
  "invitationId",
  "giftName",
  "description",
  "imageUrl",
  "priority",
  "isReserved",
  "reservedBy",
  "createdAt"
) VALUES
  (
    'gift-001',
    'inv-001',
    'Stand Mixer',
    'KitchenAid 5-quart stand mixer in matte black - perfect for Sarah''s baking adventures',
    '/images/gifts/kitchenaid-mixer.jpg',
    1,
    false,
    NULL,
    '2026-05-01 12:00:00+03'
  ),
  (
    'gift-002',
    'inv-001',
    'Coffee Table',
    'Modern walnut coffee table - to complete our living room furniture set',
    '/images/gifts/coffee-table.jpg',
    2,
    true,
    'John & Mary Smith',
    '2026-05-01 12:00:00+03'
  ),
  (
    'gift-003',
    'inv-001',
    'Weekend Getaway',
    'Romantic weekend at a luxury lodge - for our honeymoon',
    '/images/gifts/weekend-getaway.jpg',
    1,
    false,
    NULL,
    '2026-05-01 12:00:00+03'
  ),
  (
    'gift-004',
    'inv-002',
    'Silver Picture Frame',
    'Elegant 8x10 silver picture frame - to display our 25th anniversary photo',
    '/images/gifts/silver-frame.jpg',
    3,
    false,
    NULL,
    '2026-04-15 10:00:00+03'
  ),
  (
    'gift-005',
    'inv-002',
    'Garden Bench',
    'Beautiful wrought iron garden bench - for our backyard sanctuary',
    '/images/gifts/garden-bench.jpg',
    2,
    true,
    'Family Friends',
    '2026-04-15 10:00:00+03'
  );

-- Sample Design Assets
INSERT INTO "DesignAsset" (
  "id",
  "name",
  "imageUrl",
  "category",
  "createdAt"
) VALUES
  (
    'asset-001',
    'Floral Border Frame',
    '/images/design-assets/floral-border.png',
    'FRAME',
    '2026-01-01 00:00:00+03'
  ),
  (
    'asset-002',
    'Gold Ornament',
    '/images/design-assets/gold-ornament.png',
    'ORNAMENT',
    '2026-01-01 00:00:00+03'
  ),
  (
    'asset-003',
    'Rose Petal Texture',
    '/images/design-assets/rose-texture.jpg',
    'TEXTURE',
    '2026-01-01 00:00:00+03'
  ),
  (
    'asset-004',
    'Elegant Frame',
    '/images/design-assets/elegant-frame.png',
    'FRAME',
    '2026-01-01 00:00:00+03'
  ),
  (
    'asset-005',
    'Watercolor Florals',
    '/images/design-assets/watercolor-florals.png',
    'FLORAL',
    '2026-01-01 00:00:00+03'
  );