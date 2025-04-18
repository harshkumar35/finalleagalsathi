"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Video, BookOpen, Star, FileText, User } from "lucide-react"
import { PageTransition } from "@/components/animations/page-transition"
import { StaggeredList } from "@/components/animations/staggered-list"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

export default function LawyerDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient()

      // Get the current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        // Get user details from our custom table
        const { data, error } = await supabase
          .from("legalsathi_users")
          .select(`
            *,
            lawyer_profiles(*)
          `)
          .eq("id", authUser.id)
          .single()

        if (data && !error) {
          setUser(data)
        }
      }

      setLoading(false)
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view your dashboard.</div>
  }

  const dashboardItems = [
    {
      title: "My Profile",
      description: "Update your professional profile and credentials",
      icon: User,
      href: "/lawyer/profile",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Available Cases",
      description: "Browse and apply to open legal cases from clients",
      icon: Briefcase,
      href: "/lawyer/available-cases",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "My Cases",
      description: "Manage your active and past legal cases",
      icon: FileText,
      href: "/lawyer/my-cases",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Messages",
      description: "Chat with your clients and legal teams",
      icon: MessageSquare,
      href: "/lawyer/messages",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Video Consultations",
      description: "Schedule and join video calls with your clients",
      icon: Video,
      href: "/lawyer/video-calls",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Document Generator",
      description: "Create legal documents from templates",
      icon: FileText,
      href: "/lawyer/documents",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Legal Blogs",
      description: "Write and publish articles about legal topics",
      icon: BookOpen,
      href: "/lawyer/blogs",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "My Reviews",
      description: "View client reviews and ratings for your services",
      icon: Star,
      href: "/lawyer/reviews",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.full_name}</h1>
          <p className="text-slate-600 mt-2">Your Lawyer Dashboard</p>
        </MotionWrapper>

        <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => (
            <Card key={item.title} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center mr-3`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={item.href}>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    {item.title === "My Profile"
                      ? "Edit Profile"
                      : item.title === "Available Cases"
                        ? "Browse Cases"
                        : item.title === "My Cases"
                          ? "View My Cases"
                          : item.title === "Messages"
                            ? "Open Messages"
                            : item.title === "Video Consultations"
                              ? "Manage Calls"
                              : item.title === "Document Generator"
                                ? "Generate Documents"
                                : item.title === "Legal Blogs"
                                  ? "Manage Blogs"
                                  : "View Reviews"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </StaggeredList>
      </div>
    </PageTransition>
  )
}
