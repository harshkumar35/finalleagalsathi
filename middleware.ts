import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

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
  ]

  const isPublicApiRoute = publicApiRoutes.some((route) => url === route || url.startsWith(`${route}/`))

  // If no session and trying to access protected routes
  if (!session) {
    // Allow access to public routes and API routes
    if (isPublicRoute || isPublicApiRoute) {
      return res
    }

    // Check if the route is protected
    if (url.startsWith("/client/") || url.startsWith("/lawyer/") || url.startsWith("/admin/")) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // If session exists, check role-based access
  if (session) {
    // Allow access to public routes and API routes
    if (isPublicRoute || isPublicApiRoute) {
      return res
    }

    const { data: userData, error } = await supabase
      .from("legalsathi_users")
      .select("role")
      .eq("id", session.user.id)
      .single()

    if (error || !userData) {
      // If we can't get the user role, sign them out
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Check role-based access
    if (url.startsWith("/client/") && userData.role !== "client") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (url.startsWith("/lawyer/") && userData.role !== "lawyer") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (url.startsWith("/admin/") && userData.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
