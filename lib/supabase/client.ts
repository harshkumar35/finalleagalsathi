"use client"

import { createBrowserClient } from "@supabase/ssr"

// Create a singleton instance of the Supabase client
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!supabaseClient) {
    // Ensure environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase environment variables are missing!")
    }

    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseClient
}
