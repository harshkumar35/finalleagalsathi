import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean }) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookie setting error
          console.error("Error setting cookie:", error)
        }
      },
      remove(name: string, options: { path?: string; domain?: string }) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch (error) {
          // Handle cookie removal error
          console.error("Error removing cookie:", error)
        }
      },
    },
  })
}
