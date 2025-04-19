import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Clear auth cookie
    cookies().set({
      name: "auth_token",
      value: "",
      expires: new Date(0),
      path: "/",
    })

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Error logging out" }, { status: 500 })
  }
}
