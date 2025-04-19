import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { fullName, email, password, phone, address, city, state } = await request.json()

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = createClient()

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("legalsathi_users")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      return NextResponse.json({ message: "Error checking user existence" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
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
          role: "client",
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
      role: "client",
      is_verified: true,
      is_active: true,
    })

    if (userError) {
      console.error("Error creating user:", userError)
      return NextResponse.json({ message: "Failed to create user profile" }, { status: 500 })
    }

    // Create client profile
    const { error: profileError } = await supabase.from("client_profiles").insert({
      user_id: authData.user.id,
      phone: phone || null,
      address: address || null,
      city: city || null,
      state: state || null,
    })

    if (profileError) {
      console.error("Error creating client profile:", profileError)
      // We should delete the user if profile creation fails
      await supabase.from("legalsathi_users").delete().eq("id", authData.user.id)
      return NextResponse.json({ message: "Failed to create client profile" }, { status: 500 })
    }

    return NextResponse.json({ message: "User registered successfully", userId: authData.user.id }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
