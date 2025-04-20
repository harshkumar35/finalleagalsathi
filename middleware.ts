import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import type { NextRequest } from "next/server"

// Paths that don't require authentication
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/about",
  "/contact",
  "/lawyers",
  "/blog",
  "/api/auth/login",
  "/api/auth/signup-client",
  "/api/auth/signup-lawyer",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    return NextResponse.next()
  }

  // Check for API routes that don't need authentication
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value

  // If no token, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Verify token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    // Check role-based access
    if (pathname.startsWith("/client/") && payload.role !== "client") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (pathname.startsWith("/lawyer/") && payload.role !== "lawyer") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // Token is invalid or expired
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
