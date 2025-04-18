"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, User, MapPin, Phone, Mail, Award, Briefcase, Clock, Star } from "lucide-react"

// Sample data for specializations
const SPECIALIZATIONS = [
  "Family Law",
  "Criminal Law",
  "Corporate Law",
  "Intellectual Property",
  "Real Estate",
  "Tax Law",
  "Immigration",
  "Labor and Employment",
  "Civil Litigation",
  "Environmental Law",
]

// Sample data for languages
const LANGUAGES = [
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Punjabi",
]

export default function LawyerProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Adv. Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 9876543210",
    barCouncilId: "BCI/12345/2010",
    specialization: "Criminal Law",
    yearsOfExperience: "12",
    location: "Delhi, NCR",
    bio: "Experienced criminal lawyer with over 12 years of practice in Delhi High Court and Supreme Court. Specializing in criminal defense, white-collar crimes, and constitutional matters.",
    education: "LL.B, Delhi University (2008)\nLL.M, National Law School of India University (2010)",
    languages: ["English", "Hindi"],
    hourlyRate: "3000",
    availability: "Weekdays 10 AM - 6 PM",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLanguageChange = (value: string[]) => {
    setProfileData((prev) => ({ ...prev, languages: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs defaultValue="view" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        {/* View Profile Tab */}
        <TabsContent value="view">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <Card className="md:col-span-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarFallback>
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                </Avatar>

                <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                <p className="text-emerald-600 font-medium">{profileData.specialization}</p>

                <div className="flex items-center justify-center mt-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profileData.location}
                </div>

                <div className="flex items-center justify-center mt-4">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-2 font-medium">4.9</span>
                  <span className="text-sm text-slate-500 ml-1">(210 reviews)</span>
                </div>

                <div className="w-full border-t my-6"></div>

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{profileData.phone}</span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{profileData.email}</span>
                  </div>

                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{profileData.barCouncilId}</span>
                  </div>

                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{profileData.yearsOfExperience} years experience</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{profileData.availability}</span>
                  </div>
                </div>

                <div className="w-full border-t my-6"></div>

                <div className="w-full">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((language) => (
                      <span key={language} className="px-2 py-1 bg-slate-100 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full mt-6">
                  <h3 className="font-semibold mb-2">Hourly Rate</h3>
                  <p className="text-xl font-bold text-emerald-600">₹{profileData.hourlyRate}/hr</p>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{profileData.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{profileData.education}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-600">210</p>
                      <p className="text-sm text-slate-500">Cases Handled</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-600">85%</p>
                      <p className="text-sm text-slate-500">Success Rate</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-600">12</p>
                      <p className="text-sm text-slate-500">Years Experience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Edit Profile Tab */}
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your professional information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarFallback>
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barCouncilId">Bar Council ID</Label>
                    <Input
                      id="barCouncilId"
                      name="barCouncilId"
                      value={profileData.barCouncilId}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select
                      value={profileData.specialization}
                      onValueChange={(value) => handleSelectChange("specialization", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="specialization">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPECIALIZATIONS.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      value={profileData.yearsOfExperience}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      value={profileData.hourlyRate}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={profileData.availability}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="languages">Languages</Label>
                    <Select
                      value={profileData.languages[0]}
                      onValueChange={(value) => handleLanguageChange([value, ...profileData.languages.slice(1)])}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="languages">
                        <SelectValue placeholder="Select languages" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.languages.map((language) => (
                        <span key={language} className="px-2 py-1 bg-slate-100 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows={5}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="education">Education</Label>
                    <Textarea
                      id="education"
                      name="education"
                      value={profileData.education}
                      onChange={handleChange}
                      rows={3}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
