"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/animations/page-transition"
import { AnimatedBackground } from "@/components/background/animated-background"
import { createClient } from "@/lib/supabase/client"
import {
  User,
  MapPin,
  Phone,
  Mail,
  Award,
  Briefcase,
  Clock,
  Calendar,
  Star,
  MessageSquare,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react"

export default function LawyerProfilePage() {
  const params = useParams()
  const router = useRouter()
  const lawyerId = params.id as string
  const [lawyer, setLawyer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

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
              email,
              phone,
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
            email: data.legalsathi_users?.email || "",
            phone: data.legalsathi_users?.phone || "+91 9876543210",
            profileImage: data.legalsathi_users?.profile_image || "/placeholder.svg?height=200&width=200",
            barCouncilId: data.bar_council_id,
            specialization: data.specialization,
            experience: data.years_of_experience,
            hourlyRate: data.hourly_rate || 2000,
            bio: data.bio || "Experienced legal professional specializing in various aspects of law.",
            education: data.education || "LL.B., National Law University",
            location: data.location || "New Delhi, India",
            availability: data.availability || "Monday to Friday, 10 AM - 6 PM",
            languages: data.languages || ["English", "Hindi"],
            rating: data.average_rating || 4.8,
            totalCases: data.total_cases || 85,
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

  const handleHire = () => {
    // Implement hire functionality
    router.push(`/client/hire-lawyer/${lawyerId}`)
  }

  const handleChat = () => {
    router.push(`/client/messages?lawyerId=${lawyerId}`)
  }

  const handleSchedule = () => {
    router.push(`/client/schedule-call/${lawyerId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !lawyer) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="mb-8">{error || "The lawyer profile you're looking for doesn't exist or has been removed."}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
                <AvatarImage src={lawyer.profileImage || "/placeholder.svg"} />
              </Avatar>

              <h2 className="text-2xl font-bold">{lawyer.fullName}</h2>
              <p className="text-primary font-medium">{lawyer.specialization}</p>

              <div className="flex items-center justify-center mt-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 mr-1" />
                {lawyer.location}
              </div>

              <div className="flex items-center justify-center mt-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 font-medium">{lawyer.rating}</span>
                <span className="text-sm text-slate-500 ml-1">({lawyer.totalCases} cases)</span>
              </div>

              <div className="w-full border-t my-6"></div>

              <div className="w-full space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-slate-400 mr-3" />
                  <span>{lawyer.phone}</span>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-slate-400 mr-3" />
                  <span>{lawyer.email}</span>
                </div>

                <div className="flex items-center">
                  <Award className="h-5 w-5 text-slate-400 mr-3" />
                  <span>{lawyer.barCouncilId}</span>
                </div>

                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-slate-400 mr-3" />
                  <span>{lawyer.experience} years experience</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-slate-400 mr-3" />
                  <span>{lawyer.availability}</span>
                </div>
              </div>

              <div className="w-full border-t my-6"></div>

              <div className="w-full">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.languages.map((language: string) => (
                    <Badge key={language} variant="outline" className="bg-primary/5">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="w-full mt-6">
                <h3 className="font-semibold mb-2">Hourly Rate</h3>
                <p className="text-xl font-bold text-primary">₹{lawyer.hourlyRate}/hr</p>
              </div>

              <div className="w-full mt-6 space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleHire}>
                  Hire Lawyer
                </Button>
                <Button variant="outline" className="w-full" onClick={handleChat}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSchedule}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="cases">Cases</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{lawyer.bio}</p>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{lawyer.education}</p>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Case Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{lawyer.totalCases}</p>
                        <p className="text-sm text-slate-500">Cases Handled</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">85%</p>
                        <p className="text-sm text-slate-500">Success Rate</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{lawyer.experience}</p>
                        <p className="text-sm text-slate-500">Years Experience</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-2 border-primary/20 pl-4 ml-2">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-primary text-white">2020 - Present</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">Senior Partner</h3>
                        <p className="text-primary mb-1">Legal Solutions Firm, Delhi</p>
                        <p className="text-sm text-slate-600">
                          Leading a team of associates handling high-profile cases in {lawyer.specialization}.
                          Responsible for client acquisition, case strategy, and mentoring junior lawyers.
                        </p>
                      </div>

                      <div className="border-l-2 border-primary/20 pl-4 ml-2">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-primary text-white">2015 - 2020</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">Associate Lawyer</h3>
                        <p className="text-primary mb-1">Justice & Associates, Mumbai</p>
                        <p className="text-sm text-slate-600">
                          Specialized in {lawyer.specialization} cases, with focus on dispute resolution and client
                          representation in court proceedings.
                        </p>
                      </div>

                      <div className="border-l-2 border-primary/20 pl-4 ml-2">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-primary text-white">2012 - 2015</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">Junior Lawyer</h3>
                        <p className="text-primary mb-1">Legal Advisory Group, Bangalore</p>
                        <p className="text-sm text-slate-600">
                          Started career handling routine legal matters and assisting senior lawyers with research and
                          case preparation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>What clients are saying about {lawyer.fullName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                          </div>
                          <span className="text-sm text-slate-500">2 months ago</span>
                        </div>
                        <p className="mb-2">
                          "Extremely professional and knowledgeable. Helped me navigate a complex legal situation with
                          ease and confidence. Would highly recommend!"
                        </p>
                        <p className="text-sm font-medium">- Rahul Sharma, Property Dispute</p>
                      </div>

                      <div className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                          </div>
                          <span className="text-sm text-slate-500">4 months ago</span>
                        </div>
                        <p className="mb-2">
                          "Outstanding legal support during my divorce proceedings. Compassionate yet strong advocate
                          who truly had my best interests at heart."
                        </p>
                        <p className="text-sm font-medium">- Priya Patel, Family Law</p>
                      </div>

                      <div className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <Star className="h-4 w-4 text-slate-300" />
                          </div>
                          <span className="text-sm text-slate-500">6 months ago</span>
                        </div>
                        <p className="mb-2">
                          "Very thorough and strategic approach to my corporate legal needs. Excellent communication
                          throughout the entire process."
                        </p>
                        <p className="text-sm font-medium">- Vikram Mehta, Business Contract</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cases" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notable Cases</CardTitle>
                    <CardDescription>Significant legal matters handled by {lawyer.fullName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold">Singh vs. Mehta Property Dispute</h3>
                          <Badge>Resolved</Badge>
                        </div>
                        <p className="text-primary text-sm mb-2">Real Estate Law</p>
                        <p className="text-sm text-slate-600 mb-3">
                          Successfully represented client in a multi-property inheritance dispute involving complex
                          title verification and family settlement negotiations.
                        </p>
                        <div className="flex items-center text-sm text-slate-500">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>2022 • 8 months duration</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold">Sharma Family Trust Formation</h3>
                          <Badge>Completed</Badge>
                        </div>
                        <p className="text-primary text-sm mb-2">Family Law</p>
                        <p className="text-sm text-slate-600 mb-3">
                          Structured and executed a comprehensive family trust ensuring asset protection and smooth
                          succession planning for a high-net-worth family business.
                        </p>
                        <div className="flex items-center text-sm text-slate-500">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>2021 • 4 months duration</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold">TechStart vs. InnoGroup IP Case</h3>
                          <Badge>Won</Badge>
                        </div>
                        <p className="text-primary text-sm mb-2">Intellectual Property</p>
                        <p className="text-sm text-slate-600 mb-3">
                          Successfully defended a technology startup against IP infringement claims, preserving critical
                          business operations and establishing clear ownership rights.
                        </p>
                        <div className="flex items-center text-sm text-slate-500">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>2020 • 14 months duration</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
