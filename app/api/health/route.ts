import { NextResponse } from "next/server"
import { query, tableExists } from "@/lib/db"

export async function GET() {
  try {
    // Check database connection
    const result = await query("SELECT NOW()")

    // Check if tables exist
    const usersTableExists = await tableExists("legalsathi_users")
    const clientProfilesTableExists = await tableExists("client_profiles")
    const lawyerProfilesTableExists = await tableExists("lawyer_profiles")

    return NextResponse.json({
      status: "ok",
      timestamp: result.rows[0].now,
      tables: {
        legalsathi_users: usersTableExists,
        client_profiles: clientProfilesTableExists,
        lawyer_profiles: lawyerProfilesTableExists,
      },
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
