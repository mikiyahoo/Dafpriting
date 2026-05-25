-- ============================================================
-- SEED: Testimonials (6 items)
-- Run in Supabase SQL Editor
-- ============================================================

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clean existing
DELETE FROM "Testimonial";

-- Insert
INSERT INTO "Testimonial" (id, "customerName", company, "avatarUrl", "avatarType", review, rating, "isApproved", "isFeatured", "createdAt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Sarah Jenkins', 'Vertex Agency', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'upload', 'Daf Printing delivered exceptional quality flyers and banners for our brand launch. Absolute lifesavers with their quick turnaround!', 5, true, true, '2026-05-10 07:00:00+00', now()),
  (gen_random_uuid()::text, 'Ethan Chan', 'ShopEase', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'upload', 'Great quality products and helpful customer support. Highly recommended for any e-commerce businesses needing fast prints.', 5, true, true, '2026-05-08 11:00:00+00', now()),
  (gen_random_uuid()::text, 'Michael K.', 'PixelLabs', 'https://api.dicebear.com/7.x/bottts/svg?seed=Michael', 'clipart', 'The spot UV business cards we ordered turned out incredibly sleek. Outstanding quality and professional feedback.', 5, true, true, '2026-05-05 06:00:00+00', now()),
  (gen_random_uuid()::text, 'Jane Doe', 'Creative Studio', 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jane', 'clipart', 'Their laser-cut wedding invitation suite was absolutely stunning! Our guests loved the texture and premium feel.', 5, true, true, '2026-04-28 08:00:00+00', now()),
  (gen_random_uuid()::text, 'David Mwangi', 'Mwangi Media Group', NULL, 'none', 'Very reliable printer for commercial requirements. Business cards and banners were exactly as specified.', 4, true, false, '2026-04-20 12:00:00+00', now()),
  (gen_random_uuid()::text, 'Elizabeth Nyambura', 'Self-Publisher', NULL, 'none', 'Excellent customer service and highly professional binding. Finally found a reliable printer for self-publishing our novel runs.', 5, true, true, '2026-04-15 05:00:00+00', now());

SELECT '✅ Testimonials seeded: ' || COUNT(*) FROM "Testimonial";