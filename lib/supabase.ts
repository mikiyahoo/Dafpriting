import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase server environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const GALLERY_BUCKET = "radiance-gallery";

export function getGalleryStoragePath(publicUrl: string) {
  const marker = `/storage/v1/object/public/${GALLERY_BUCKET}/`;
  const [, path] = publicUrl.split(marker);

  return path ? decodeURIComponent(path) : null;
}
