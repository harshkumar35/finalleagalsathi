import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = "pub_778092f75ef1d8139a2255a4f61fca69cf027"
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=legal%20and%20justice&country=in&language=en,hi&category=business,crime,politics,technology,top`

    const response = await fetch(url, { next: { revalidate: 3600 } }) // Revalidate every hour
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
