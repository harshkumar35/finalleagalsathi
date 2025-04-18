import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"
import { env } from "@/app/env"

export function createServerClient() {
  const cookieStore = cookies()

  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}
