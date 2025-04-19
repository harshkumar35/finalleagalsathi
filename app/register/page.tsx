"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDescription } from "@/components/ui/alert"
import ClientRegistrationForm from "@/components/auth/client-registration-form"
import LawyerRegistrationForm from "@/components/auth/lawyer-registration-form"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("client")
  const [error, setError] = useState("")
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(
      tabsRef.current,
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
  }, [])

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

      <div className="w-full max-w-4xl z-10">
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
            Join LegalSathi
          </h1>
          <p className="mt-2 text-gray-600">Create an account to get started with our legal services</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8"
        >
          <AnimatePresence mode="wait">
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

          <div ref={tabsRef}>
            <Tabs defaultValue="client" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 p-1 rounded-lg">
                <TabsTrigger
                  value="client"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-md py-2"
                >
                  I Need Legal Help
                </TabsTrigger>
                <TabsTrigger
                  value="lawyer"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-md py-2"
                >
                  I'm a Lawyer
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="client" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ClientRegistrationForm setError={setError} />
                  </motion.div>
                </TabsContent>

                <TabsContent value="lawyer" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LawyerRegistrationForm setError={setError} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-700">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Login
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
