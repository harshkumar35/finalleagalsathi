import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query, tableExists } from "@/lib/db"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Check if the users table exists
    const usersTableExists = await tableExists("legalsathi_users")
    if (!usersTableExists) {
      return NextResponse.json({ message: "Database setup incomplete. Please contact support." }, { status: 500 })
    }

    // Find user by email
    const result = await query("SELECT * FROM legalsathi_users WHERE email = $1", [email])

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const user = result.rows[0]

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
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
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Error in login:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
