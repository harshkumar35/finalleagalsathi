import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { env } from "@/app/env"

// This endpoint is for development purposes only
// It should be disabled or removed in production
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "This endpoint is disabled in production" }, { status: 403 })
  }

  try {
    const { email, password, role = "client", fullName = "Test User" } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Create a Supabase admin client
    const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || "")

    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role,
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Insert user data into the legalsathi_users table
    const { error: userError } = await supabase.from("legalsathi_users").insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role,
      is_verified: true,
      is_active: true,
    })

    if (userError) {
      console.error("User insert error:", userError)
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    // If the user is a lawyer, create a lawyer profile
    if (role === "lawyer") {
      const { error: lawyerError } = await supabase.from("lawyer_profiles").insert({
        user_id: authData.user.id,
        bar_council_id: "TEST-" + Math.floor(Math.random() * 10000),
        specialization: "Test Specialization",
        years_of_experience: 5,
        average_rating: 4.5,
        total_cases: 0,
      })

      if (lawyerError) {
        console.error("Lawyer profile error:", lawyerError)
        return NextResponse.json({ error: lawyerError.message }, { status: 500 })
      }
    } else {
      // Create a client profile
      const { error: clientError } = await supabase.from("client_profiles").insert({
        user_id: authData.user.id,
      })

      if (clientError) {
        console.error("Client profile error:", clientError)
        return NextResponse.json({ error: clientError.message }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      user: {
        id: authData.user.id,
        email,
        fullName,
        role,
      },
    })
  } catch (error: any) {
    console.error("Create test user error:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
