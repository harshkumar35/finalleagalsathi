import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query, tableExists } from "@/lib/db"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  try {
    // Parse request body safely
    let body
    try {
      body = await request.json()
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json(
        {
          message: "Invalid request body",
        },
        { status: 400 },
      )
    }

    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Check if the users table exists
    const usersTableExists = await tableExists("legalsathi_users")
    if (!usersTableExists) {
      return NextResponse.json(
        {
          message: "Database setup incomplete. Please contact support.",
        },
        { status: 500 },
      )
    }

    try {
      // Find user by email
      const result = await query("SELECT * FROM legalsathi_users WHERE email = $1", [email])

      if (result.rows.length === 0) {
        return NextResponse.json(
          {
            message: "Invalid credentials",
          },
          { status: 401 },
        )
      }

      const user = result.rows[0]

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          {
            message: "Invalid credentials",
          },
          { status: 401 },
        )
      }

      // Generate JWT token
      const token = await new SignJWT({
        id: user.id,
        email: user.email,
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret-for-development-only"))

      // Set token as cookie
      const response = NextResponse.json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
        },
        token,
      })

      // Set cookie
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return response
    } catch (error) {
      console.error("Error during login:", error)
      return NextResponse.json(
        {
          message: "Login failed",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Unhandled error in login:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
