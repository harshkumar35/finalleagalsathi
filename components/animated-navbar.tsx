"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ChevronDown, Menu, X } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useAuth } from "@/lib/auth/auth-context"

type NavItem = {
  label: string
  href: string
  dropdown?: NavItem[]
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "#",
    dropdown: [
      { label: "AI Law Bot", href: "/client/ai-assistant" },
      { label: "Agreement Generator", href: "/lawyer/documents" },
      { label: "Find Lawyer", href: "/client/find-lawyer" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Legal News", href: "/news" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
]

export function AnimatedNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current.querySelectorAll(".nav-item"), {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      })
    }

    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16" ref={navRef}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary animated-text">Legal</span>
              <span className="text-xl font-bold text-gray-800">Sathi</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group nav-item">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors ${
                        activeDropdown === item.label
                          ? "text-primary bg-primary/5"
                          : "text-gray-700 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
                        >
                          <div className="py-1">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-gray-700 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <motion.div
            className="hidden md:flex items-center space-x-4 nav-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href={user.role === "client" ? "/client/dashboard" : "/lawyer/dashboard"}>
                      <AnimatedButton variant="outline" className="text-primary border-primary hover:bg-primary/5">
                        Dashboard
                      </AnimatedButton>
                    </Link>
                    <AnimatedButton className="bg-primary hover:bg-primary/90 text-white" onClick={handleLogout}>
                      Log Out
                    </AnimatedButton>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <AnimatedButton variant="outline" className="text-primary border-primary hover:bg-primary/5">
                        Log In
                      </AnimatedButton>
                    </Link>
                    <Link href="/register">
                      <AnimatedButton className="bg-primary hover:bg-primary/90 text-white">Sign Up</AnimatedButton>
                    </Link>
                  </>
                )}
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 flex flex-col space-y-1 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="py-1">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center justify-between text-sm font-medium ${
                          activeDropdown === item.label
                            ? "text-primary bg-primary/5"
                            : "text-gray-700 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-1 border-l-2 border-primary/20 pl-4"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md"
                                onClick={() => {
                                  setActiveDropdown(null)
                                  setIsMenuOpen(false)
                                }}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? "text-primary bg-primary/5"
                          : "text-gray-700 hover:text-primary hover:bg-primary/5"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-2 space-y-2">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Link
                          href={user.role === "client" ? "/client/dashboard" : "/lawyer/dashboard"}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <AnimatedButton
                            variant="outline"
                            className="w-full justify-center text-primary border-primary"
                          >
                            Dashboard
                          </AnimatedButton>
                        </Link>
                        <AnimatedButton
                          className="w-full justify-center bg-primary hover:bg-primary/90 text-white"
                          onClick={() => {
                            handleLogout()
                            setIsMenuOpen(false)
                          }}
                        >
                          Log Out
                        </AnimatedButton>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                          <AnimatedButton
                            variant="outline"
                            className="w-full justify-center text-primary border-primary"
                          >
                            Log In
                          </AnimatedButton>
                        </Link>
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                          <AnimatedButton className="w-full justify-center bg-primary hover:bg-primary/90 text-white">
                            Sign Up
                          </AnimatedButton>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
