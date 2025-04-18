"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/animations/page-transition"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Search, Calendar, ArrowRight, Loader2 } from "lucide-react"

// Define the News interface
interface NewsItem {
  title: string
  description: string
  content: string
  pubDate: string
  image_url: string | null
  source_id: string
  category: string[]
  creator: string[] | null
  link: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true)
      try {
        const response = await fetch("/api/news")
        const data = await response.json()

        if (data.results) {
          setNews(data.results)
          setFilteredNews(data.results)
        } else {
          setError("Failed to fetch news")
        }
      } catch (error) {
        console.error("Error fetching news:", error)
        setError("An error occurred while fetching news")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Filter news based on search term and active category
  useEffect(() => {
    let results = news

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter((item) => item.category && item.category.includes(activeCategory))
    }

    setFilteredNews(results)
  }, [searchTerm, activeCategory, news])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is already handled by the useEffect
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Extract unique categories from news
  const categories = ["all", ...Array.from(new Set(news.flatMap((item) => item.category || [])))].slice(0, 6)

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Legal News & Updates</h1>
            <p className="text-lg text-slate-600 mb-8">
              Stay informed with the latest legal news, case updates, and legislative changes
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search news articles..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <AnimatedButton type="submit" className="bg-primary hover:bg-primary/90">
                Search
              </AnimatedButton>
            </form>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory}>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-lg text-red-500">{error}</p>
                  <p className="text-slate-500 mt-2">Please try again later</p>
                </div>
              ) : filteredNews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-slate-700">No news found matching your criteria</p>
                  <p className="text-slate-500 mt-2">Try adjusting your search or filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((item, index) => (
                    <AnimatedCard
                      key={`${item.title}-${index}`}
                      className="news-item overflow-hidden h-full flex flex-col"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={item.image_url || "/placeholder.svg?height=200&width=400"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0 flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                            {item.source_id || "Legal News"}
                          </span>
                          <div className="flex items-center text-xs text-slate-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(item.pubDate)}
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <CardDescription className="line-clamp-3">{item.description || item.content}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 mt-auto">
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </a>
                      </CardFooter>
                    </AnimatedCard>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {filteredNews.length > 0 && (
            <div className="flex justify-center mt-8">
              <AnimatedButton variant="outline" className="border-primary/20">
                Load More News
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
