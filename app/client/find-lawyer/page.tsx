"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, Filter, Star, MapPin, Briefcase } from "lucide-react"
import { PageTransition } from "@/components/animations/page-transition"
import { createClient } from "@/lib/supabase/client"
import { AnimatedBackground } from "@/components/background/animated-background"

// Sample data for specializations
const SPECIALIZATIONS = [
  "All Specializations",
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

type Lawyer = {
  id: string
  name: string
  specialization: string
  location: string
  experience: number
  rating: number
  cases: number
  hourlyRate: number
  image: string
}

export default function FindLawyer() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("All Specializations")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [experienceRange, setExperienceRange] = useState([0, 20])
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function fetchLawyers() {
      setIsLoading(true)
      try {
        // Fetch lawyers from Supabase
        const { data: lawyerProfiles, error } = await supabase
          .from("lawyer_profiles")
          .select(`
            id,
            user_id,
            bar_council_id,
            specialization,
            years_of_experience,
            hourly_rate,
            location,
            average_rating,
            total_cases,
            legalsathi_users (
              id,
              full_name,
              profile_image
            )
          `)
          .eq("legalsathi_users.is_active", true)

        if (error) {
          console.error("Error fetching lawyers:", error)
          return
        }

        // Transform the data
        const transformedLawyers = lawyerProfiles.map((profile: any) => ({
          id: profile.id,
          name: profile.legalsathi_users?.full_name || "Unknown",
          specialization: profile.specialization,
          location: profile.location || "India",
          experience: profile.years_of_experience || 0,
          rating: profile.average_rating || 4.5,
          cases: profile.total_cases || 0,
          hourlyRate: profile.hourly_rate || 2000,
          image: profile.legalsathi_users?.profile_image || "/placeholder.svg?height=100&width=100",
        }))

        setLawyers(transformedLawyers)
        setFilteredLawyers(transformedLawyers)
      } catch (error) {
        console.error("Error in fetchLawyers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLawyers()
  }, [supabase])

  useEffect(() => {
    let results = lawyers

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by specialization
    if (specialization !== "All Specializations") {
      results = results.filter((lawyer) => lawyer.specialization === specialization)
    }

    // Filter by price range
    results = results.filter((lawyer) => lawyer.hourlyRate >= priceRange[0] && lawyer.hourlyRate <= priceRange[1])

    // Filter by experience range
    results = results.filter(
      (lawyer) => lawyer.experience >= experienceRange[0] && lawyer.experience <= experienceRange[1],
    )

    setFilteredLawyers(results)
  }, [searchTerm, specialization, priceRange, experienceRange, lawyers])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtering is already handled by the useEffect
  }

  const handleViewProfile = (lawyerId: string) => {
    router.push(`/client/lawyer-profile/${lawyerId}`)
  }

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 animated-text-subtle">Find a Lawyer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Filter className="mr-2 h-5 w-5 text-primary" />
                  Filters
                </h2>

                <form onSubmit={handleSearch} className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="search"
                        placeholder="Name or location"
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select value={specialization} onValueChange={setSpecialization}>
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

                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Hourly Rate (₹)</Label>
                      <span className="text-sm text-slate-500">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 5000]}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>

                  {/* Experience Range */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Experience (Years)</Label>
                      <span className="text-sm text-slate-500">
                        {experienceRange[0]} - {experienceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 20]}
                      max={20}
                      step={1}
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Apply Filters
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Lawyers List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLawyers.length > 0 ? (
                  filteredLawyers.map((lawyer) => (
                    <Card key={lawyer.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex p-6">
                          <div className="mr-4">
                            <img
                              src={lawyer.image || "/placeholder.svg"}
                              alt={lawyer.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{lawyer.name}</h3>
                            <p className="text-primary font-medium">{lawyer.specialization}</p>
                            <div className="flex items-center mt-1 text-sm text-slate-500">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {lawyer.location}
                            </div>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="font-medium">{lawyer.rating}</span>
                              <span className="text-sm text-slate-500 ml-1">({lawyer.cases} cases)</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Briefcase className="h-4 w-4 text-slate-400 mr-1" />
                              <span className="text-sm">{lawyer.experience} years experience</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-sky-50 p-4 border-t">
                          <div className="font-semibold">₹{lawyer.hourlyRate}/hr</div>
                          <Button
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleViewProfile(lawyer.id)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-slate-500">No lawyers found matching your criteria.</p>
                    <p className="text-slate-400">Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
