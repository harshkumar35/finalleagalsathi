"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Check for success messages from redirect params
    const registered = searchParams.get("registered")
    const reset = searchParams.get("reset")

    if (registered === "true") {
      setSuccess("Registration successful! Please log in with your credentials.")
    } else if (reset === "true") {
      setSuccess("Password reset successful! Please log in with your new password.")
    }

    // GSAP animations
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(
      formRef.current,
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )

    // Create animated background bubbles
    if (containerRef.current) {
      for (let i = 0; i < 15; i++) {
        createBubble(containerRef.current)
      }
    }
  }, [searchParams])

  const createBubble = (parent: HTMLDivElement) => {
    const bubble = document.createElement("div")
    bubble.className = "bubble"

    const size = Math.random() * 100 + 50
    const position = Math.random() * 100
    const delay = Math.random() * 15
    const duration = Math.random() * 15 + 10

    bubble.style.width = `${size}px`
    bubble.style.height = `${size}px`
    bubble.style.left = `${position}%`
    bubble.style.animationDelay = `${delay}s`
    bubble.style.animationDuration = `${duration}s`
    bubble.style.opacity = `${Math.random() * 0.3}`

    parent.appendChild(bubble)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Redirect based on user role
      if (data.user.role === "client") {
        router.push("/client/dashboard")
      } else if (data.user.role === "lawyer") {
        router.push("/lawyer/dashboard")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" ref={containerRef}>
      {/* Animated background */}
      <style jsx global>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
          bottom: -100px;
          animation: rise linear infinite;
          z-index: -1;
        }

        @keyframes rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1
            ref={titleRef}
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            Welcome to LegalSathi
          </h1>
          <p className="mt-2 text-gray-600">Your trusted legal companion</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8"
        >
          <AnimatePresence mode="wait">
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-lg bg-green-50/80 text-green-800 border border-green-200/50"
              >
                <AlertDescription>{success}</AlertDescription>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-lg bg-red-50/80 text-red-800 border border-red-200/50"
              >
                <AlertDescription>{error}</AlertDescription>
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-gray-800">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-800">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                Register
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
