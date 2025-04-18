"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Loader2, ArrowLeft } from "lucide-react"

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const type = searchParams.get("type") || "signup" // signup, login, or reset

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    if (!email) {
      router.push("/login")
      return
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Call the verify-otp API route
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, type }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP")
      }

      setSuccess("OTP verified successfully!")

      // Redirect based on type
      setTimeout(() => {
        if (type === "reset") {
          router.push(`/reset-password?token=${data.token}`)
        } else if (type === "signup") {
          router.push("/login?registered=true")
        } else {
          router.push(data.user?.role === "client" ? "/client/dashboard" : "/lawyer/dashboard")
        }
      }, 1500)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Call the send-otp API route
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, type }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP")
      }

      setTimeLeft(300) // Reset timer
      setSuccess("OTP resent successfully!")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
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
              <CardTitle className="text-2xl">Verify OTP</CardTitle>
              <CardDescription>
                Enter the verification code sent to <span className="font-medium">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">6-Digit Verification Code</Label>
                  <Input
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    required
                    disabled={isLoading}
                    className="text-center text-lg tracking-widest border-primary/20 focus:border-primary"
                  />
                  <p className="text-sm text-center text-slate-500">
                    Code expires in <span className="font-medium">{formatTime(timeLeft)}</span>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading || timeLeft === 0}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                <div className="flex justify-between items-center pt-2">
                  <Link
                    href={type === "reset" ? "/forgot-password" : "/login"}
                    className="text-sm text-primary hover:underline"
                  >
                    <span className="flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </span>
                  </Link>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleResendOTP}
                    disabled={isLoading || timeLeft > 0}
                    className="text-sm text-primary hover:underline"
                  >
                    {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend Code"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  )
}
