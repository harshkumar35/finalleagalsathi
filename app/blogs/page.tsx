"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageTransition } from "@/components/animations/page-transition"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Search, Calendar, ArrowRight, User, ThumbsUp, MessageSquare } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample blog data
const BLOG_ITEMS = [
  {
    id: "1",
    title: "Understanding the Basics of Property Law in India",
    category: "Property Law",
    date: "January 10, 2023",
    excerpt:
      "Property law in India is a complex subject with various statutes and regulations. This article provides a comprehensive overview of the basic principles and important considerations for property transactions.",
    image: "/placeholder.svg?height=250&width=500",
    author: {
      name: "Adv. Priya Sharma",
      image: "/placeholder.svg?height=40&width=40",
      role: "Property Law Specialist",
    },
    likes: 124,
    comments: 32,
  },
  {
    id: "2",
    title: "The Evolution of Divorce Laws: A Comparative Analysis",
    category: "Family Law",
    date: "February 15, 2023",
    excerpt:
      "Divorce laws have evolved significantly over the years. This article examines the historical development of divorce laws and compares the current legal frameworks across different jurisdictions.",
    image: "/placeholder.svg?height=250&width=500",
    author: {
      name: "Adv. Rajesh Kumar",
      image: "/placeholder.svg?height=40&width=40",
      role: "Family Law Expert",
    },
    likes: 98,
    comments: 45,
  },
  {
    id: "3",
    title: "Intellectual Property Rights in the Digital Age",
    category: "Intellectual Property",
    date: "March 22, 2023",
    excerpt:
      "The digital age has brought new challenges to intellectual property protection. This article discusses the current issues and legal remedies available for protecting intellectual property in the digital environment.",
    image: "/placeholder.svg?height=250&width=500",
    author: {
      name: "Adv. Ananya Patel",
      image: "/placeholder.svg?height=40&width=40",
      role: "IP Law Specialist",
    },
    likes: 156,
    comments: 28,
  },
  {
    id: "4",
    title: "Corporate Governance: Best Practices for Indian Companies",
    category: "Corporate Law",
    date: "April 5, 2023",
    excerpt:
      "Good corporate governance is essential for the sustainable growth of companies. This article outlines the best practices for corporate governance in the Indian context and discusses recent regulatory developments.",
    image: "/placeholder.svg?height=250&width=500",
    author: {
      name: "Adv. Vikram Singh",
      image: "/placeholder.svg?height=40&width=40",
      role: "Corporate Law Expert",
    },
    likes: 112,
    comments: 19,
  },
]

export default function BlogsPage() {
  const blogsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (blogsRef.current) {
      const blogItems = blogsRef.current.querySelectorAll(".blog-item")

      gsap.fromTo(
        blogItems,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: blogsRef.current,
            start: "top 70%",
          },
        },
      )
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Legal Blogs & Articles</h1>
            <p className="text-lg text-slate-600 mb-8">
              Insights, analysis, and expert opinions on various legal topics
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search blog articles..." className="pl-9" />
              </div>
              <AnimatedButton className="bg-blue-500 hover:bg-blue-600">Search</AnimatedButton>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Topics</TabsTrigger>
                <TabsTrigger value="property">Property Law</TabsTrigger>
                <TabsTrigger value="family">Family Law</TabsTrigger>
                <TabsTrigger value="corporate">Corporate Law</TabsTrigger>
                <TabsTrigger value="ip">Intellectual Property</TabsTrigger>
              </TabsList>
            </Tabs>

            <Link href="/blogs/write">
              <AnimatedButton className="bg-blue-500 hover:bg-blue-600">Write Article</AnimatedButton>
            </Link>
          </div>

          <div ref={blogsRef} className="space-y-8">
            {BLOG_ITEMS.map((blog) => (
              <AnimatedCard key={blog.id} className="blog-item overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <CardHeader className="p-0 pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {blog.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl md:text-2xl">{blog.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 py-2">
                      <CardDescription className="text-sm text-slate-600 line-clamp-3">{blog.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-0 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={blog.author.image} alt={blog.author.name} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{blog.author.name}</p>
                          <p className="text-xs text-slate-500">{blog.author.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-slate-500 text-sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {blog.likes}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {blog.comments}
                        </div>
                        <Link href={`/blogs/${blog.id}`}>
                          <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <AnimatedButton variant="outline" className="border-blue-200">
              Load More Articles
            </AnimatedButton>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
