"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Eye, EyeOff, User, Mail, Lock, Briefcase, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  "Constitutional Law",
]

// Form schema
const formSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    barCouncilId: z.string().min(5, "Bar Council ID must be at least 5 characters"),
    specialization: z.string().min(1, "Please select a specialization"),
    yearsOfExperience: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Years of experience must be a valid number",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof formSchema>

interface LawyerRegistrationFormProps {
  setError: (error: string) => void
}

const LawyerRegistrationForm = ({ setError }: LawyerRegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      barCouncilId: "",
      specialization: "",
      yearsOfExperience: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setError("")

    try {
      // First, test if the API is working
      const testResponse = await fetch("/api/test")
      if (!testResponse.ok) {
        throw new Error("API test failed. Server might be down.")
      }

      // Prepare the registration data
      const registrationData = {
        fullName: data.fullName,
        email: data.email,
        barCouncilId: data.barCouncilId,
        specialization: data.specialization,
        yearsOfExperience: data.yearsOfExperience,
        password: data.password,
        role: "lawyer",
      }

      // Use XMLHttpRequest instead of fetch for better error handling
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/api/auth/signup-lawyer", true)
      xhr.setRequestHeader("Content-Type", "application/json")

      xhr.onload = () => {
        setIsLoading(false)

        if (xhr.status >= 200 && xhr.status < 300) {
          // Success
          try {
            const response = JSON.parse(xhr.responseText)
            console.log("Registration successful:", response)
            router.push("/login?registered=true")
          } catch (e) {
            console.error("Error parsing success response:", e)
            setError("Registration successful, but there was an error processing the response.")
            router.push("/login?registered=true")
          }
        } else {
          // Error
          try {
            const errorResponse = JSON.parse(xhr.responseText)
            setError(errorResponse.message || "Registration failed")
          } catch (e) {
            console.error("Error parsing error response:", e)
            console.log("Raw response:", xhr.responseText)
            setError("Registration failed: " + (xhr.responseText.substring(0, 100) || "Unknown error"))
          }
        }
      }

      xhr.onerror = () => {
        setIsLoading(false)
        console.error("Network error during registration")
        setError("Network error. Please check your connection and try again.")
      }

      // Send the request
      xhr.send(JSON.stringify(registrationData))
    } catch (err) {
      setIsLoading(false)
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during registration")
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input placeholder="John Doe" className="pl-10 bg-white/50" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input type="email" placeholder="name@example.com" className="pl-10 bg-white/50" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="barCouncilId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bar Council ID</FormLabel>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input placeholder="e.g., BCI/12345/2020" className="pl-10 bg-white/50" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEGAL_SPECIALIZATIONS.map((specialization) => (
                          <SelectItem key={specialization} value={specialization}>
                            {specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g., 5" className="pl-10 bg-white/50" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-white/50"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-white/50"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Registering...
                </div>
              ) : (
                "Register as Lawyer"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}

export default LawyerRegistrationForm
