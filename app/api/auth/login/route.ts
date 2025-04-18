import { NextResponse } from "next/server"
import { createClient } from "redis"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

// This is a mock implementation. In a real app, you would use proper environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Connect to Redis
    const client = createClient({ url: REDIS_URL })
    await client.connect()

    // Get user by email
    const userRef = await client.json.get(`user:email:${email}`)
    if (!userRef) {
      await client.disconnect()
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Get full user data
    const user = await client.json.get(`user:${(userRef as any).id}`)
    if (!user) {
      await client.disconnect()
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if lawyer is verified
    if ((user as any).role === "lawyer" && !(user as any).isVerified) {
      await client.disconnect()
      return NextResponse.json(
        { message: "Your account is pending verification. Please wait for admin approval." },
        { status: 403 },
      )
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, (user as any).password)
    if (!isMatch) {
      await client.disconnect()
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Disconnect from Redis
    await client.disconnect()

    // Create sanitized user object (without password)
    const sanitizedUser = {
      id: (user as any).id,
      fullName: (user as any).fullName,
      email: (user as any).email,
      role: (user as any).role,
    }

    // Generate JWT token
    const token = jwt.sign({ id: sanitizedUser.id, email: sanitizedUser.email, role: sanitizedUser.role }, JWT_SECRET, {
      expiresIn: "1d",
    })

    // Set cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return NextResponse.json({
      message: "Login successful",
      user: sanitizedUser,
      token,
    })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
