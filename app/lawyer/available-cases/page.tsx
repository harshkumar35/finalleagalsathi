"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Calendar, MapPin, DollarSign, Clock, Search, Filter } from "lucide-react"

export default function AvailableCases() {
  const [cases, setCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [caseTypeFilter, setCaseTypeFilter] = useState("All")

  useEffect(() => {
    const fetchCases = async () => {
      const supabase = createClient()

      // Get open cases
      const { data, error } = await supabase
        .from("legal_cases")
        .select(`
          *,
          legalsathi_users!legal_cases_client_id_fkey(full_name)
        `)
        .eq("status", "open")
        .order("created_at", { ascending: false })

      if (data && !error) {
        setCases(data)
      }

      setLoading(false)
    }

    fetchCases()
  }, [])

  // Filter cases based on search term and case type
  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.location?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCaseType = caseTypeFilter === "All" || caseItem.case_type === caseTypeFilter

    return matchesSearch && matchesCaseType
  })

  // Get unique case types for filter
  const caseTypes = ["All", ...new Set(cases.map((caseItem) => caseItem.case_type))]

  const handleApply = async (caseId: string) => {
    // In a real app, this would send an application or message to the client
    alert(`Applied to case ${caseId}. In a real app, this would send an application to the client.`)
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading available cases...</div>
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-8">
          <h1 className="text-3xl font-bold">Available Cases</h1>
          <p className="text-slate-600 mt-2">Browse and apply to open legal cases from clients</p>
        </MotionWrapper>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search cases by title, description or location"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-64">
            <Select value={caseTypeFilter} onValueChange={setCaseTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-slate-400" />
                  <span>{caseTypeFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredCases.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-700">No cases found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem) => (
              <Card key={caseItem.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {caseItem.case_type}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      New
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{caseItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 line-clamp-3">{caseItem.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                      {caseItem.location || "Location not specified"}
                    </div>

                    {caseItem.budget && (
                      <div className="flex items-center text-sm text-slate-500">
                        <DollarSign className="h-4 w-4 mr-2 text-slate-400" />
                        Budget: ₹{caseItem.budget.toLocaleString()}
                      </div>
                    )}

                    {caseItem.deadline && (
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                        Deadline: {new Date(caseItem.deadline).toLocaleDateString()}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="h-4 w-4 mr-2 text-slate-400" />
                      Posted: {new Date(caseItem.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => handleApply(caseItem.id)}>
                    Apply for Case
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
