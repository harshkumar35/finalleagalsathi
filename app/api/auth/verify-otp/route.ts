import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { env } from "@/app/env"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

// Initialize Supabase client
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// JWT secret for password reset tokens
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const { email, otp, type = "signup" } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 })
    }

    // Get stored OTP
    const { data: otpData, error: otpError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("email", email)
      .eq("code", otp)
      .eq("type", type)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (otpError || !otpData) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 })
    }

    // Check if OTP is expired
    if (new Date(otpData.expires_at) < new Date()) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 })
    }

    // Delete used OTP
    await supabase.from("otp_codes").delete().eq("id", otpData.id)

    // Handle different verification types
    if (type === "signup") {
      // Mark user as verified
      const { data: userData, error: userError } = await supabase
        .from("legalsathi_users")
        .select("id")
        .eq("email", email)
        .single()

      if (userError || !userData) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      const { error: updateError } = await supabase
        .from("legalsathi_users")
        .update({ is_verified: true })
        .eq("id", userData.id)

      if (updateError) {
        return NextResponse.json({ message: "Failed to verify user" }, { status: 500 })
      }

      // Set a cookie to indicate successful registration
      cookies().set("registration_success", "true", {
        maxAge: 60 * 5, // 5 minutes
        path: "/",
      })

      return NextResponse.json({ message: "User verified successfully" })
    } else if (type === "login") {
      // Get user data
      const { data: userData, error: userError } = await supabase
        .from("legalsathi_users")
        .select("*")
        .eq("email", email)
        .single()

      if (userError || !userData) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      // Generate JWT token
      const token = jwt.sign({ id: userData.id, email: userData.email, role: userData.role }, JWT_SECRET, {
        expiresIn: "1d",
      })

      // Set auth cookie
      cookies().set("auth_token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
      })

      return NextResponse.json({
        message: "Login successful",
        user: {
          id: userData.id,
          email: userData.email,
          fullName: userData.full_name,
          role: userData.role,
        },
      })
    } else if (type === "reset") {
      // Get user data
      const { data: userData, error: userError } = await supabase
        .from("legalsathi_users")
        .select("id")
        .eq("email", email)
        .single()

      if (userError || !userData) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      // Generate reset token
      const resetToken = uuidv4()
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1) // Token valid for 1 hour

      // Store reset token
      const { error: tokenError } = await supabase.from("password_reset_tokens").insert({
        token: resetToken,
        user_id: userData.id,
        expires_at: expiresAt.toISOString(),
      })

      if (tokenError) {
        return NextResponse.json({ message: "Failed to generate reset token" }, { status: 500 })
      }

      return NextResponse.json({
        message: "OTP verified successfully",
        token: resetToken,
      })
    }

    return NextResponse.json({ message: "OTP verified successfully" })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
