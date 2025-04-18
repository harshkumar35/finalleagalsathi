"use server"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { env } from "@/app/env"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const role = formData.get("role") as "client" | "lawyer"

  if (!email || !password || !fullName || !role) {
    return { error: "All fields are required", success: false }
  }

  const cookieStore = cookies()
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  try {
    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { error: authError.message, success: false }
    }

    if (!authData.user) {
      return { error: "Failed to create user", success: false }
    }

    // Insert user data into the legalsathi_users table
    const { error: userError } = await supabase.from("legalsathi_users").insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role,
      is_verified: false,
      is_active: true,
    })

    if (userError) {
      console.error("User insert error:", userError)
      return { error: userError.message, success: false }
    }

    // If the user is a lawyer, create a lawyer profile
    if (role === "lawyer") {
      const barCouncilId = formData.get("barCouncilId") as string
      const specialization = formData.get("specialization") as string
      const yearsOfExperience = Number.parseInt(formData.get("yearsOfExperience") as string) || 0

      if (!barCouncilId || !specialization) {
        return { error: "Lawyer profile information is required", success: false }
      }

      const { error: lawyerError } = await supabase.from("lawyer_profiles").insert({
        user_id: authData.user.id,
        bar_council_id: barCouncilId,
        specialization,
        years_of_experience: yearsOfExperience,
        average_rating: 0,
        total_cases: 0,
      })

      if (lawyerError) {
        console.error("Lawyer profile error:", lawyerError)
        return { error: lawyerError.message, success: false }
      }
    } else {
      // Create a client profile
      const { error: clientError } = await supabase.from("client_profiles").insert({
        user_id: authData.user.id,
      })

      if (clientError) {
        console.error("Client profile error:", clientError)
        return { error: clientError.message, success: false }
      }
    }

    // Set a cookie to indicate successful registration
    cookies().set("registration_success", "true", {
      maxAge: 60 * 5, // 5 minutes
      path: "/",
    })

    return { success: true, user: { id: authData.user.id, email, fullName, role } }
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "An unexpected error occurred", success: false }
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required", success: false }
  }

  const cookieStore = cookies()
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      return { error: error.message, success: false }
    }

    if (!data.user) {
      return { error: "Invalid credentials", success: false }
    }

    // Get user data from the legalsathi_users table
    const { data: userData, error: userError } = await supabase
      .from("legalsathi_users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (userError || !userData) {
      console.error("User data error:", userError)
      return { error: "User data not found", success: false }
    }

    // Set a cookie to indicate successful login
    cookies().set("login_success", "true", {
      maxAge: 60 * 5, // 5 minutes
      path: "/",
    })

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: userData.full_name,
        role: userData.role,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred", success: false }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  await supabase.auth.signOut()
  revalidatePath("/")
  redirect("/")
}

export async function getSession() {
  const cookieStore = cookies()
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getUserProfile() {
  const session = await getSession()
  if (!session) return null

  const cookieStore = cookies()
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  const { data: userData, error } = await supabase
    .from("legalsathi_users")
    .select("*")
    .eq("id", session.user.id)
    .single()

  if (error || !userData) return null

  return userData
}
