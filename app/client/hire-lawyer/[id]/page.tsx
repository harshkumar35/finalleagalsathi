"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageTransition } from "@/components/animations/page-transition"
import { AnimatedBackground } from "@/components/background/animated-background"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react"

// Case types
const CASE_TYPES = [
  "Family Dispute",
  "Criminal Defense",
  "Property Matter",
  "Corporate Issue",
  "Intellectual Property",
  "Civil Litigation",
  "Immigration",
  "Tax Matter",
  "Labor Dispute",
  "Other",
]

export default function HireLawyerPage() {
  const params = useParams()
  const router = useRouter()
  const lawyerId = params.id as string
  const [lawyer, setLawyer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    caseTitle: "",
    caseType: "",
    caseDescription: "",
    budget: "",
    deadline: "",
    attachments: null as File[] | null,
    termsAccepted: false,
  })

  useEffect(() => {
    async function fetchLawyerProfile() {
      try {
        const { data, error } = await supabase
          .from("lawyer_profiles")
          .select(`
            *,
            legalsathi_users (
              id,
              full_name,
              profile_image
            )
          `)
          .eq("id", lawyerId)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          setLawyer({
            id: data.id,
            userId: data.user_id,
            fullName: data.legalsathi_users?.full_name || "Unknown",
            profileImage: data.legalsathi_users?.profile_image || "/placeholder.svg?height=100&width=100",
            specialization: data.specialization,
            hourlyRate: data.hourly_rate || 2000,
          })
        }
      } catch (error: any) {
        console.error("Error fetching lawyer profile:", error)
        setError(error.message || "Failed to load lawyer profile")
      } finally {
        setLoading(false)
      }
    }

    if (lawyerId) {
      fetchLawyerProfile()
    }
  }, [lawyerId, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, attachments: Array.from(e.target.files as FileList) }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, termsAccepted: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.caseTitle.trim()) {
      setError("Case title is required")
      return
    }

    if (!formData.caseType) {
      setError("Please select a case type")
      return
    }

    if (!formData.caseDescription.trim()) {
      setError("Case description is required")
      return
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      // Create a legal case
      const { data: caseData, error: caseError } = await supabase
        .from("legal_cases")
        .insert({
          title: formData.caseTitle,
          description: formData.caseDescription,
          case_type: formData.caseType,
          client_id: user.id,
          lawyer_id: lawyer.userId,
          status: "open",
          budget: formData.budget ? Number.parseFloat(formData.budget) : null,
          deadline: formData.deadline || null,
          is_confidential: false,
        })
        .select()

      if (caseError) {
        throw caseError
      }

      // Handle file uploads if present
      if (formData.attachments && formData.attachments.length > 0) {
        // In a real app, you would upload files to Supabase storage
        console.log("Would upload attachments:", formData.attachments)
      }

      // Set success state
      setSuccess(true)

      // Redirect to the case page after a delay
      setTimeout(() => {
        router.push("/client/my-cases")
      }, 3000)
    } catch (error: any) {
      console.error("Error submitting case:", error)
      setError(error.message || "Failed to submit your case. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-xl text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">Case Submitted Successfully!</h1>
        <p className="mb-8 text-slate-600">
          Your case has been submitted to {lawyer?.fullName}. You'll be redirected to your cases page shortly.
        </p>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/client/my-cases")}>
          View My Cases
        </Button>
      </div>
    )
  }

  if (error && !lawyer) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Lawyer Not Found</h1>
        <p className="mb-8">{error}</p>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/client/find-lawyer")}>
          Return to Find Lawyers
        </Button>
      </div>
    )
  }

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-primary hover:bg-primary/5"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Hire Lawyer</h1>
          <p className="text-slate-600 mb-6">
            You're about to hire <span className="font-medium text-primary">{lawyer?.fullName}</span> for your legal
            case
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
              <CardDescription>
                Provide details about your legal matter to help the lawyer understand your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="caseTitle">Case Title</Label>
                  <Input
                    id="caseTitle"
                    name="caseTitle"
                    placeholder="e.g., Property Dispute Resolution"
                    value={formData.caseTitle}
                    onChange={handleInputChange}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select
                    value={formData.caseType}
                    onValueChange={(value) => handleSelectChange("caseType", value)}
                    disabled={submitting}
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
                  <Label htmlFor="caseDescription">Case Description</Label>
                  <Textarea
                    id="caseDescription"
                    name="caseDescription"
                    placeholder="Describe your legal issue in detail..."
                    value={formData.caseDescription}
                    onChange={handleInputChange}
                    rows={5}
                    disabled={submitting}
                    required
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
                      onChange={handleInputChange}
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Expected Timeline</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <Input
                    id="attachments"
                    type="file"
                    multiple
                    onChange={handleAttachmentChange}
                    disabled={submitting}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-slate-500">Upload relevant documents (Max 5 files, 10MB each)</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="terms">
                    <AccordionTrigger>Terms and Conditions</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-slate-600 space-y-2">
                        <p>By hiring a lawyer through LegalSathi, you agree to the following terms:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>All information provided is accurate and complete to the best of your knowledge.</li>
                          <li>You authorize the lawyer to represent you in the specified legal matter.</li>
                          <li>Fees and payment terms will be agreed upon directly with the lawyer.</li>
                          <li>
                            LegalSathi serves as a platform to connect clients and lawyers but is not responsible for
                            the legal advice provided.
                          </li>
                          <li>All communication between you and the lawyer is confidential.</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={handleCheckboxChange}
                    disabled={submitting}
                  />
                  <Label htmlFor="termsAccepted" className="text-sm font-normal">
                    I agree to the terms and conditions
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Case"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
