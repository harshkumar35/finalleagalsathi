import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { fullName, email, password, barCouncilId, specialization, yearsOfExperience } = await request.json()

    // Validate input
    if (!fullName || !email || !password || !barCouncilId || !specialization || yearsOfExperience === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = createClient()

    // Check if user already exists
    const { data: existingUser, error: checkUserError } = await supabase
      .from("legalsathi_users")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkUserError) {
      console.error("Error checking existing user:", checkUserError)
      return NextResponse.json({ message: "Error checking user existence" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Check if Bar Council ID is already registered
    const { data: existingBarId, error: checkBarIdError } = await supabase
      .from("lawyer_profiles")
      .select("id")
      .eq("bar_council_id", barCouncilId)
      .maybeSingle()

    if (checkBarIdError) {
      console.error("Error checking existing Bar ID:", checkBarIdError)
      return NextResponse.json({ message: "Error checking Bar Council ID" }, { status: 500 })
    }

    if (existingBarId) {
      return NextResponse.json({ message: "Bar Council ID is already registered" }, { status: 409 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "lawyer",
        },
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ message: authError.message }, { status: 500 })
    }

    if (!authData.user) {
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 })
    }

    // Insert user into legalsathi_users table
    const { error: userError } = await supabase.from("legalsathi_users").insert({
      id: authData.user.id,
      email,
      password: hashedPassword,
      full_name: fullName,
      role: "lawyer",
      is_verified: false, // Lawyers need verification
      is_active: true,
    })

    if (userError) {
      console.error("Error creating user:", userError)
      return NextResponse.json({ message: "Failed to create user profile" }, { status: 500 })
    }

    // Create lawyer profile
    const { error: profileError } = await supabase.from("lawyer_profiles").insert({
      user_id: authData.user.id,
      bar_council_id: barCouncilId,
      specialization,
      years_of_experience: Number(yearsOfExperience),
      average_rating: 0,
      total_cases: 0,
    })

    if (profileError) {
      console.error("Error creating lawyer profile:", profileError)
      // We should delete the user if profile creation fails
      await supabase.from("legalsathi_users").delete().eq("id", authData.user.id)
      return NextResponse.json({ message: "Failed to create lawyer profile" }, { status: 500 })
    }

    return NextResponse.json(
      { message: "Lawyer registered successfully. Your account is pending verification.", userId: authData.user.id },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering lawyer:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
