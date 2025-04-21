import { Pool } from "pg"

// Create a PostgreSQL connection pool
let pool: Pool

try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
} catch (error) {
  console.error("Failed to create database pool:", error)
  throw error
}

// Helper function to execute SQL queries
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error executing query", error)
    throw error
  }
}

// Helper function to check if a table exists
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const res = await query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )`,
      [tableName],
    )
    return res.rows[0].exists
  } catch (error) {
    console.error("Error checking if table exists:", error)
    return false
  }
}
