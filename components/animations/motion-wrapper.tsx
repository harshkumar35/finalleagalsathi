"use client"

import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  type?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight"
}

export function MotionWrapper({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  type = "fadeIn",
}: MotionWrapperProps) {
  const getAnimationVariants = () => {
    switch (type) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "slideUp":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "slideDown":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "slideLeft":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "slideRight":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={getAnimationVariants()}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
