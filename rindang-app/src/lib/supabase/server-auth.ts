// src/lib/supabase/server-auth.ts

import { createServerClient } from "@supabase/ssr";
import { cookies as nextCookies } from "next/headers";

export function createSupabaseServerClient() {
  const cookieStore = nextCookies() as any;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Akses metode get() yang sudah pasti ada
          return cookieStore.get(name)?.value;
        },
        // No-op untuk Server Component
        set: () => {
          /* no-op */
        },
        remove: () => {
          /* no-op */
        },
      },
    }
  );
}
