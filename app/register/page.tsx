"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ClientRegistrationForm from "@/components/auth/client-registration-form"
import LawyerRegistrationForm from "@/components/auth/lawyer-registration-form"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("client")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get role from URL if present
    const role = searchParams.get("role")
    if (role === "lawyer" || role === "client") {
      setActiveTab(role)
    }

    // GSAP animations
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(
      tabsRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )

    // Create animated background
    if (containerRef.current) {
      createAnimatedBackground(containerRef.current)
    }
  }, [searchParams])

  const createAnimatedBackground = (container: HTMLDivElement) => {
    const colors = ["#e6f2ff", "#cce5ff", "#b3d9ff", "#99ccff", "#80bfff"]

    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 80 + 20
      const circle = document.createElement("div")

      circle.style.position = "absolute"
      circle.style.width = `${size}px`
      circle.style.height = `${size}px`
      circle.style.borderRadius = "50%"
      circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      circle.style.opacity = (Math.random() * 0.3 + 0.1).toString()
      circle.style.top = `${Math.random() * 100}%`
      circle.style.left = `${Math.random() * 100}%`
      circle.style.filter = "blur(8px)"
      circle.style.zIndex = "-1"

      container.appendChild(circle)

      // Animate the circle
      gsap.to(circle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" ref={containerRef}>
      <div className="w-full max-w-4xl z-10">
        <div className="text-center mb-6">
          <h1
            ref={titleRef}
            className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent"
          >
            Join LegalSathi
          </h1>
          <p className="mt-2 text-gray-600">Create an account to get started with our legal services</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-blue-100 p-8">
            {error && (
              <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div ref={tabsRef}>
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-blue-50 p-1 rounded-lg">
                  <TabsTrigger
                    value="client"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-md py-2"
                  >
                    I Need Legal Help
                  </TabsTrigger>
                  <TabsTrigger
                    value="lawyer"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-md py-2"
                  >
                    I'm a Lawyer
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="client" className="mt-6">
                  <ClientRegistrationForm setError={setError} />
                </TabsContent>

                <TabsContent value="lawyer" className="mt-6">
                  <LawyerRegistrationForm setError={setError} />
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
