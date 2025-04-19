import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const url = req.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/about",
    "/contact",
    "/blogs",
    "/news",
    "/services",
    "/case-studies",
  ]

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some((route) => url === route || url.startsWith(`${route}/`))

  // API routes that don't require authentication
  const publicApiRoutes = [
    "/api/auth/login",
    "/api/auth/signup-client",
    "/api/auth/signup-lawyer",
    "/api/auth/send-otp",
    "/api/auth/verify-otp",
    "/api/auth/reset-password",
    "/api/news",
    "/api/auth/me",
    "/api/auth/logout",
  ]

  const isPublicApiRoute = publicApiRoutes.some((route) => url === route || url.startsWith(`${route}/`))

  // Allow access to public routes and API routes
  if (isPublicRoute || isPublicApiRoute) {
    return res
  }

  // Get auth token from cookie
  const authToken = req.cookies.get("auth_token")?.value

  // If no token and trying to access protected routes
  if (!authToken) {
    // Check if the route is protected
    if (url.startsWith("/client/") || url.startsWith("/lawyer/") || url.startsWith("/admin/")) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", url)
      return NextResponse.redirect(redirectUrl)
    }
    return res
  }

  // For now, we'll just check if the token exists and not verify it in the middleware
  // The actual verification will happen in the API routes
  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
