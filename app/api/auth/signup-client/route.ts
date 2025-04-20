import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query, tableExists } from "@/lib/db"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  try {
    const { fullName, email, password, role } = await request.json()

    // Validate input
    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if the users table exists
    const usersTableExists = await tableExists("legalsathi_users")
    if (!usersTableExists) {
      return NextResponse.json({ message: "Database setup incomplete. Please contact support." }, { status: 500 })
    }

    // Check if user already exists
    try {
      const existingUser = await query("SELECT * FROM legalsathi_users WHERE email = $1", [email])

      if (existingUser.rows.length > 0) {
        return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
      }
    } catch (error) {
      console.error("Error checking existing user:", error)
      return NextResponse.json({ message: "Error checking user existence" }, { status: 500 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await query(
      "INSERT INTO legalsathi_users (email, password, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, role",
      [email, hashedPassword, fullName, role],
    )

    const user = newUser.rows[0]

    // Create client profile
    await query("INSERT INTO client_profiles (user_id) VALUES ($1)", [user.id])

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

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
        },
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in signup:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
