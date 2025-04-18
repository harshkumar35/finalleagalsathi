"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Upload, ImageIcon, Save, Send } from "lucide-react"

// Sample categories
const CATEGORIES = [
  "Property Law",
  "Family Law",
  "Criminal Law",
  "Corporate Law",
  "Intellectual Property",
  "Tax Law",
  "Immigration Law",
  "Labor Law",
  "Environmental Law",
  "Constitutional Law",
]

export default function WriteBlogPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null as File | null,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, image: file }))

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would upload the image and submit the form data to your API
      console.log("Submitting blog:", { ...formData, isDraft })

      // Redirect to blogs page
      router.push("/blogs")
    } catch (error) {
      console.error("Error submitting blog:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-8">
          <h1 className="text-3xl font-bold">Write a Legal Article</h1>
        </MotionWrapper>

        <AnimatedCard className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Share Your Legal Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive title for your article"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger id="category" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select a legal category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setPreviewUrl(null)
                          setFormData((prev) => ({ ...prev, image: null }))
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-blue-300 mb-2" />
                        <p className="text-sm text-slate-600">Drag and drop an image here, or click to select a file</p>
                        <p className="text-xs text-slate-500 mt-1">Recommended size: 1200 x 800 pixels (16:9 ratio)</p>
                      </div>
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("image")?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Article Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your article content here..."
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={15}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-4">
                <AnimatedButton
                  type="button"
                  variant="outline"
                  className="border-blue-200"
                  onClick={(e) => handleSubmit(e, true)}
                  isLoading={isLoading}
                  loadingText="Saving..."
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </AnimatedButton>
                <AnimatedButton
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                  isLoading={isLoading}
                  loadingText="Publishing..."
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Article
                </AnimatedButton>
              </div>
            </form>
          </CardContent>
        </AnimatedCard>
      </div>
    </PageTransition>
  )
}
