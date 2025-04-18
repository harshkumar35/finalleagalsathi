import { NextResponse } from "next/server"
import { createClient } from "redis"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// This is a mock implementation. In a real app, you would use proper environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

export async function POST(request: Request) {
  try {
    const { fullName, email, password, role } = await request.json()

    // Validate input
    if (!fullName || !email || !password || role !== "client") {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Connect to Redis
    const client = createClient({ url: REDIS_URL })
    await client.connect()

    // Check if user already exists
    const existingUser = await client.json.get(`user:email:${email}`)
    if (existingUser) {
      await client.disconnect()
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user object
    const userId = uuidv4()
    const user = {
      id: userId,
      fullName,
      email,
      password: hashedPassword,
      role: "client",
      createdAt: new Date().toISOString(),
    }

    // Store user in Redis
    await client.json.set(`user:${userId}`, "$", user)
    await client.json.set(`user:email:${email}`, "$", { id: userId })

    // Disconnect from Redis
    await client.disconnect()

    // Generate JWT token (not returning it for registration)
    const token = jwt.sign({ id: userId, email, role: "client" }, JWT_SECRET, { expiresIn: "1d" })

    return NextResponse.json({ message: "User registered successfully", userId }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
