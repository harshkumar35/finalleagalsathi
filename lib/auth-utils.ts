"use client"

import { createClient } from "@/lib/supabase/client"

// Helper function to check if user is logged in
export async function isUserLoggedIn() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()
  return !!data.session
}

// Helper function to get current user
export async function getCurrentUser() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()

  if (!data.session) return null

  try {
    const { data: userData, error } = await supabase
      .from("legalsathi_users")
      .select("*")
      .eq("id", data.session.user.id)
      .single()

    if (error) {
      console.error("Error fetching user data:", error)
      return null
    }

    return userData
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error)
    return null
  }
}

// Helper function to get user role
export async function getUserRole() {
  const user = await getCurrentUser()
  return user?.role || null
}

// Function to update navbar state based on auth
export async function updateNavbarState(setUser: (user: any) => void, setLoading: (loading: boolean) => void) {
  setLoading(true)
  try {
    const user = await getCurrentUser()
    setUser(user)
    return user
  } catch (error) {
    console.error("Error updating navbar state:", error)
    return null
  } finally {
    setLoading(false)
  }
}
