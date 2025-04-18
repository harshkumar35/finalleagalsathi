"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Home,
  Search,
  FileText,
  MessageSquare,
  Video,
  BookOpen,
  Star,
  User,
  Briefcase,
  LogOut,
  Settings,
} from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<"client" | "lawyer" | null>(null)

  useEffect(() => {
    // In a real app, you would get this from the auth context or API
    if (pathname.startsWith("/client")) {
      setUserRole("client")
    } else if (pathname.startsWith("/lawyer")) {
      setUserRole("lawyer")
    }
  }, [pathname])

  const clientMenuItems = [
    { icon: Home, label: "Dashboard", href: "/client/dashboard" },
    { icon: Search, label: "Find Lawyers", href: "/client/find-lawyer" },
    { icon: FileText, label: "Post a Case", href: "/client/post-case" },
    { icon: MessageSquare, label: "AI Assistant", href: "/client/ai-assistant" },
    { icon: FileText, label: "My Cases", href: "/client/my-cases" },
    { icon: MessageSquare, label: "Messages", href: "/client/messages" },
    { icon: Video, label: "Video Calls", href: "/client/video-calls" },
    { icon: BookOpen, label: "Legal Blogs", href: "/client/blogs" },
    { icon: Star, label: "My Reviews", href: "/client/reviews" },
    { icon: Settings, label: "Settings", href: "/client/settings" },
  ]

  const lawyerMenuItems = [
    { icon: Home, label: "Dashboard", href: "/lawyer/dashboard" },
    { icon: User, label: "My Profile", href: "/lawyer/profile" },
    { icon: Briefcase, label: "Available Cases", href: "/lawyer/available-cases" },
    { icon: FileText, label: "My Cases", href: "/lawyer/my-cases" },
    { icon: MessageSquare, label: "Messages", href: "/lawyer/messages" },
    { icon: Video, label: "Video Calls", href: "/lawyer/video-calls" },
    { icon: FileText, label: "Documents", href: "/lawyer/documents" },
    { icon: BookOpen, label: "Legal Blogs", href: "/lawyer/blogs" },
    { icon: Star, label: "My Reviews", href: "/lawyer/reviews" },
    { icon: Settings, label: "Settings", href: "/lawyer/settings" },
  ]

  const menuItems = userRole === "client" ? clientMenuItems : lawyerMenuItems

  const handleLogout = async () => {
    // In a real app, you would call the logout API
    // For demo purposes, just redirect to home
    window.location.href = "/"
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="border-r border-slate-200">
        <SidebarHeader className="flex items-center justify-center py-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Legal</span>
              <span className="text-xl font-bold">Sathi</span>
            </Link>
          </motion.div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <AnimatedButton variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </AnimatedButton>
          </motion.div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b border-slate-200 px-6">
          <SidebarTrigger />
          <motion.div
            className="ml-auto flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              {userRole === "client" ? "Client" : "Lawyer"} Profile
            </Button>
          </motion.div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
