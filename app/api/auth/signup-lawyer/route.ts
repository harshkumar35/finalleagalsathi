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
    const { fullName, email, password, barCouncilId, specialization, yearsOfExperience, role } = await request.json()

    // Validate input
    if (
      !fullName ||
      !email ||
      !password ||
      !barCouncilId ||
      !specialization ||
      yearsOfExperience === undefined ||
      role !== "lawyer"
    ) {
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

    // Check if Bar Council ID is already registered
    const existingBarId = await client.json.get(`lawyer:barId:${barCouncilId}`)
    if (existingBarId) {
      await client.disconnect()
      return NextResponse.json({ message: "Bar Council ID is already registered" }, { status: 409 })
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
      barCouncilId,
      specialization,
      yearsOfExperience,
      role: "lawyer",
      isVerified: false, // Lawyers need verification
      createdAt: new Date().toISOString(),
    }

    // Store user in Redis
    await client.json.set(`user:${userId}`, "$", user)
    await client.json.set(`user:email:${email}`, "$", { id: userId })
    await client.json.set(`lawyer:barId:${barCouncilId}`, "$", { id: userId })

    // Add to lawyers list
    await client.sAdd("lawyers", userId)

    // Disconnect from Redis
    await client.disconnect()

    // Generate JWT token (not returning it for registration)
    const token = jwt.sign({ id: userId, email, role: "lawyer" }, JWT_SECRET, { expiresIn: "1d" })

    return NextResponse.json(
      { message: "Lawyer registered successfully. Your account is pending verification.", userId },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering lawyer:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
