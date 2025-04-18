"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Check for success messages from redirect params
    const registered = searchParams.get("registered")
    const reset = searchParams.get("reset")

    if (registered === "true") {
      setSuccessMessage("Registration successful! Please log in with your credentials.")
    } else if (reset === "true") {
      setSuccessMessage("Password reset successful! Please log in with your new password.")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setDebugInfo(null)

    try {
      console.log("Attempting login with:", { email, password: "***" })

      // For development purposes, let's log the Supabase URL to ensure it's correctly set
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

      // Sign in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error("Supabase sign-in error:", signInError)
        setDebugInfo(`Auth error: ${signInError.message}`)
        throw signInError
      }

      if (!data.user) {
        setDebugInfo("No user returned from auth")
        throw new Error("Login failed. Please check your credentials.")
      }

      console.log("Auth successful, user ID:", data.user.id)

      // Get user data to determine role
      const { data: userData, error: userError } = await supabase
        .from("legalsathi_users")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (userError) {
        console.error("Error fetching user data:", userError)
        setDebugInfo(`User data error: ${userError.message}`)
        throw new Error("Failed to fetch user data")
      }

      console.log("User role:", userData?.role)

      // Redirect based on role
      if (userData?.role === "client") {
        router.push("/client/dashboard")
      } else if (userData?.role === "lawyer") {
        router.push("/lawyer/dashboard")
      } else {
        router.push("/")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to login. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  // For development purposes only - create a test user
  const createTestUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/create-test-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
          role: "client",
          fullName: "Test User",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create test user")
      }

      setSuccessMessage("Test user created! Email: test@example.com, Password: password123")
      setEmail("test@example.com")
      setPassword("password123")
    } catch (error: any) {
      console.error("Error creating test user:", error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <MotionWrapper type="slideDown">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Log in to your LegalSathi account</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {debugInfo && process.env.NODE_ENV !== "production" && (
                <Alert className="mb-6 bg-yellow-50 text-yellow-800 border-yellow-200">
                  <AlertDescription className="font-mono text-xs">{debugInfo}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>

              {process.env.NODE_ENV !== "production" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Development Tools</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={createTestUser}
                    disabled={isLoading}
                  >
                    Create Test User
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  )
}
