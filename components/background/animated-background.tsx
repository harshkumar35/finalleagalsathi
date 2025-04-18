"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

const floatingBubbles = Array(20)
  .fill(0)
  .map((_, i) => ({
    id: i,
    size: Math.random() * 70 + 20, // 20px to 90px
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10, // 10s to 30s
    direction: Math.random() > 0.5 ? 1 : -1,
  }))

export function AnimatedBackground() {
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    controls.start("animate")
  }, [controls])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-80"></div>
      {floatingBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: bubble.size,
            height: bubble.size,
            background: `linear-gradient(135deg, rgba(30, 64, 175, 0.3), rgba(59, 130, 246, 0.2))`,
            left: `${bubble.initialX}%`,
            top: `${bubble.initialY}%`,
            boxShadow: "0 0 20px 0 rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.1)",
          }}
          animate={{
            x: [0, bubble.direction * Math.random() * 150, bubble.direction * -Math.random() * 150, 0],
            y: [0, Math.random() * -100, Math.random() * 100, 0],
            scale: [1, 1.1, 0.9, 1],
            rotateZ: [0, 10, -10, 0],
          }}
          transition={{
            duration: bubble.duration,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}
