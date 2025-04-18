import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { env } from "@/app/env"
import bcrypt from "bcryptjs"

// Initialize Supabase client
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 })
    }

    // Verify token
    const { data: tokenData, error: tokenError } = await supabase
      .from("password_reset_tokens")
      .select("user_id, expires_at")
      .eq("token", token)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ message: "Token has expired" }, { status: 400 })
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user's password in Supabase Auth
    const { error: updateError } = await supabase.auth.admin.updateUserById(tokenData.user_id, {
      password: hashedPassword,
    })

    if (updateError) {
      return NextResponse.json({ message: "Failed to update password" }, { status: 500 })
    }

    // Delete the used token
    await supabase.from("password_reset_tokens").delete().eq("token", token)

    return NextResponse.json({ message: "Password reset successfully" })
  } catch (error) {
    console.error("Error resetting password:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
