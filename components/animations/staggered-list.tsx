"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  delay?: number
  staggerDelay?: number
}

export function StaggeredList({ children, className = "", delay = 0.2, staggerDelay = 0.1 }: StaggeredListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="show">
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  )
}
