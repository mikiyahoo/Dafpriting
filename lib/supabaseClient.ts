import { createClient } from "@supabase/supabase-js";
import { BookingRecord } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }

  return clientInstance;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return getSupabaseClient()[prop as keyof ReturnType<typeof createClient>];
  },
});

export async function insertBooking(
  data: Omit<BookingRecord, "id" | "created_at">
) {
  const client = getSupabaseClient();
  const { data: result, error } = await client
    .from("bookings")
    .insert(data as any)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return result as BookingRecord;
}
