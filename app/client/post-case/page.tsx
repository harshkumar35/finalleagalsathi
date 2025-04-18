"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

// Sample data for case types
const CASE_TYPES = [
  "Family Dispute",
  "Criminal Defense",
  "Corporate Matter",
  "Intellectual Property",
  "Real Estate",
  "Tax Issue",
  "Immigration",
  "Labor Dispute",
  "Civil Litigation",
  "Environmental Issue",
  "Other",
]

export default function PostCase() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    caseType: "",
    description: "",
    budget: "",
    deadline: "",
    location: "",
    isConfidential: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isConfidential: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to post a case")
        setIsLoading(false)
        return
      }

      // Insert the case into the database
      const { data, error } = await supabase
        .from("legal_cases")
        .insert({
          title: formData.title,
          description: formData.description,
          case_type: formData.caseType,
          client_id: user.id,
          status: "open",
          budget: formData.budget ? Number.parseFloat(formData.budget) : null,
          deadline: formData.deadline || null,
          location: formData.location,
          is_confidential: formData.isConfidential,
        })
        .select()

      if (error) {
        throw error
      }

      setSuccess("Your case has been posted successfully!")

      // Reset form
      setFormData({
        title: "",
        caseType: "",
        description: "",
        budget: "",
        deadline: "",
        location: "",
        isConfidential: false,
      })

      // Redirect to cases page after a delay
      setTimeout(() => {
        router.push("/client/my-cases")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "An error occurred while posting your case")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-8">
          <h1 className="text-3xl font-bold">Post a Legal Case</h1>
        </MotionWrapper>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Case Details</CardTitle>
            <CardDescription>Provide details about your legal case to find the right lawyer</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Case Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Need help with property dispute"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseType">Case Type</Label>
                <Select
                  value={formData.caseType}
                  onValueChange={(value) => handleSelectChange("caseType", value)}
                  disabled={isLoading}
                  required
                >
                  <SelectTrigger id="caseType">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CASE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Case Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your legal issue in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="e.g., 25000"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Expected Timeline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Mumbai, Maharashtra"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isConfidential"
                  checked={formData.isConfidential}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <Label htmlFor="isConfidential" className="text-sm font-normal">
                  Keep my identity confidential from lawyers until I select one
                </Label>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting Case...
                  </>
                ) : (
                  "Post Case"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
