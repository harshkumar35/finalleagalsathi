import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = createClient()

    // Get user by email
    const { data: userData, error: userError } = await supabase
      .from("legalsathi_users")
      .select("*")
      .eq("email", email)
      .single()

    if (userError) {
      console.error("Error fetching user:", userError)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    if (!userData) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, userData.password)
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Create sanitized user object (without password)
    const sanitizedUser = {
      id: userData.id,
      fullName: userData.full_name,
      email: userData.email,
      role: userData.role,
    }

    // Set session cookie
    const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (sessionError) {
      console.error("Session error:", sessionError)
      return NextResponse.json({ message: "Authentication failed" }, { status: 500 })
    }

    // Set cookie with session token
    cookies().set({
      name: "supabase-auth-token",
      value: sessionData.session?.access_token || "",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return NextResponse.json({
      message: "Login successful",
      user: sanitizedUser,
    })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
