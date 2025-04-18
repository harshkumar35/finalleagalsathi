"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"
import { env } from "@/app/env"

// Sample legal specializations
const LEGAL_SPECIALIZATIONS = [
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

export default function RegisterPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"client" | "lawyer">("client")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [lawyerFields, setLawyerFields] = useState({
    barCouncilId: "",
    specialization: "",
    yearsOfExperience: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLawyerFieldChange = (field: string, value: string) => {
    setLawyerFields((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    // Basic validation
    if (!formData.fullName.trim()) {
      setError("Full name is required")
      return false
    }

    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email is invalid")
      return false
    }

    if (!formData.password) {
      setError("Password is required")
      return false
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (selectedRole === "lawyer") {
      if (!lawyerFields.barCouncilId.trim()) {
        setError("Bar Council ID is required")
        return false
      }

      if (!lawyerFields.specialization) {
        setError("Specialization is required")
        return false
      }

      if (!lawyerFields.yearsOfExperience.trim()) {
        setError("Years of experience is required")
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Check if Supabase environment variables are available
    if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Supabase configuration is missing. Please check your environment variables.")
      setIsLoading(false)
      return
    }

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      console.log("Starting registration with Supabase...")

      // 1. Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: selectedRole,
          },
        },
      })

      if (authError) {
        console.error("Auth error:", authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error("Failed to create user")
      }

      console.log("User created in Auth, now creating profile...")

      // 2. Insert user into legalsathi_users table
      const { error: userError } = await supabase.from("legalsathi_users").insert({
        id: authData.user.id,
        email: formData.email,
        full_name: formData.fullName,
        role: selectedRole,
        is_verified: false,
        is_active: true,
      })

      if (userError) {
        console.error("User profile error:", userError)
        throw userError
      }

      // 3. If role is lawyer, create lawyer profile
      if (selectedRole === "lawyer") {
        const { error: lawyerError } = await supabase.from("lawyer_profiles").insert({
          user_id: authData.user.id,
          bar_council_id: lawyerFields.barCouncilId,
          specialization: lawyerFields.specialization,
          years_of_experience: Number.parseInt(lawyerFields.yearsOfExperience) || 0,
          average_rating: 0,
          total_cases: 0,
        })

        if (lawyerError) {
          console.error("Lawyer profile error:", lawyerError)
          throw lawyerError
        }
      } else {
        // 4. If role is client, create client profile
        const { error: clientError } = await supabase.from("client_profiles").insert({
          user_id: authData.user.id,
        })

        if (clientError) {
          console.error("Client profile error:", clientError)
          throw clientError
        }
      }

      setSuccess("Registration successful! Redirecting to login page...")

      // 5. Redirect to login with success message
      setTimeout(() => {
        router.push("/login?registered=true")
      }, 2000)
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "An unexpected error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <MotionWrapper type="slideDown">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Join LegalSathi to connect with legal professionals or offer your services
              </CardDescription>
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

              <Tabs defaultValue="client" onValueChange={(value) => setSelectedRole(value as "client" | "lawyer")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="client">I Need Legal Help</TabsTrigger>
                  <TabsTrigger value="lawyer">I'm a Lawyer</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                  <TabsContent value="client" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="lawyer" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lawyerFullName">Full Name</Label>
                      <Input
                        id="lawyerFullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lawyerEmail">Email</Label>
                      <Input
                        id="lawyerEmail"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barCouncilId">Bar Council ID</Label>
                      <Input
                        id="barCouncilId"
                        value={lawyerFields.barCouncilId}
                        onChange={(e) => handleLawyerFieldChange("barCouncilId", e.target.value)}
                        placeholder="e.g., BCI/12345/2020"
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={lawyerFields.specialization}
                        onValueChange={(value) => handleLawyerFieldChange("specialization", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="specialization" className="border-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {LEGAL_SPECIALIZATIONS.map((specialization) => (
                            <SelectItem key={specialization} value={specialization}>
                              {specialization}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        value={lawyerFields.yearsOfExperience}
                        onChange={(e) => handleLawyerFieldChange("yearsOfExperience", e.target.value)}
                        min="0"
                        placeholder="e.g., 5"
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lawyerPassword">Password</Label>
                      <Input
                        id="lawyerPassword"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lawyerConfirmPassword">Confirm Password</Label>
                      <Input
                        id="lawyerConfirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </TabsContent>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-slate-600">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  )
}
