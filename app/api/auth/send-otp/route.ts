import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { env } from "@/app/env"
import { generateOTP, sendOTPEmail } from "@/lib/otp-utils"

// Initialize Supabase client
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function POST(request: Request) {
  try {
    const { email, type = "signup" } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Check if user exists for login/reset flows
    if (type === "login" || type === "reset") {
      const { data: userData, error: userError } = await supabase
        .from("legalsathi_users")
        .select("id")
        .eq("email", email)
        .single()

      if (userError || !userData) {
        return NextResponse.json({ message: "User with this email does not exist" }, { status: 404 })
      }
    }

    // Generate OTP
    const otp = generateOTP()

    // Store OTP in database with 10-minute expiration
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    const { error: otpError } = await supabase.from("otp_codes").insert({
      email,
      code: otp,
      type,
      expires_at: expiresAt.toISOString(),
    })

    if (otpError) {
      console.error("Error storing OTP:", otpError)
      return NextResponse.json({ message: "Failed to generate OTP" }, { status: 500 })
    }

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otp)

    if (!emailSent) {
      return NextResponse.json({ message: "Failed to send OTP email" }, { status: 500 })
    }

    return NextResponse.json({
      message: "OTP sent successfully",
    })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
