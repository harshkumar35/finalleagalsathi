import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()
    const { fullName, email, password, role, barCouncilId, specialization, yearsOfExperience } = body

    // Validate input
    if (!fullName || !email || !password || !role || !barCouncilId || !specialization || !yearsOfExperience) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // For now, just return success to test if the API route is working
    return NextResponse.json(
      {
        success: true,
        message: "Lawyer registration request received successfully",
        user: {
          fullName,
          email,
          role,
          barCouncilId,
          specialization,
          yearsOfExperience,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error in signup-lawyer route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
