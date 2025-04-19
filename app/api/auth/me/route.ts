import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

// JWT secret for token verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET() {
  try {
    // Get auth token from cookie
    const authToken = cookies().get("auth_token")?.value

    if (!authToken) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify JWT token
    const { payload } = await jwtVerify(authToken, JWT_SECRET)

    // Return user data
    return NextResponse.json({
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        fullName: payload.fullName || "User", // Fallback if not in token
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
