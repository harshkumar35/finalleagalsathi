"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Legal</span>
              <span className="text-xl font-bold">Sathi</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/lawyers" className="text-slate-600 hover:text-blue-600 transition-colors">
              Find Lawyers
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </motion.nav>

          {/* Auth Buttons - Desktop */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <AnimatedButton className="bg-blue-500 hover:bg-blue-600">Sign Up</AnimatedButton>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-slate-200 py-4"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/lawyers"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find Lawyers
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col space-y-2 pt-2 border-t border-slate-200">
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Sign Up</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
