"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedButton } from "@/components/ui/animated-button"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

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

enum RegistrationStep {
  DETAILS = 0,
  OTP_VERIFICATION = 1,
}

export function LawyerRegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.DETAILS)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    barCouncilId: "",
    specialization: "",
    yearsOfExperience: "",
  })
  const [otp, setOtp] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)

    // Clear error when user types
    if (errors.otp) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.otp
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.barCouncilId.trim()) {
      newErrors.barCouncilId = "Bar Council ID is required"
    }

    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required"
    }

    if (!formData.yearsOfExperience.trim()) {
      newErrors.yearsOfExperience = "Years of experience is required"
    } else if (isNaN(Number(formData.yearsOfExperience)) || Number(formData.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = "Please enter a valid number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOtp = () => {
    const newErrors: Record<string, string> = {}

    if (!otp.trim()) {
      newErrors.otp = "OTP is required"
    } else if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      newErrors.otp = "OTP must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // For preview/demo purposes, use a timeout instead of actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Move to OTP verification step
      setStep(RegistrationStep.OTP_VERIFICATION)
    } catch (error) {
      console.error("Error sending OTP:", error)
      setErrors((prev) => ({
        ...prev,
        form: error instanceof Error ? error.message : "Failed to send OTP. Please try again.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateOtp()) {
      return
    }

    setIsLoading(true)

    try {
      // For preview/demo purposes, use a timeout instead of actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate API call for demo
      // In a real app, you would verify the OTP and create the user account

      // Redirect to login with success message
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setErrors((prev) => ({
        ...prev,
        otp: "Invalid OTP. Please try again.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {step === RegistrationStep.DETAILS && (
        <MotionWrapper>
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-500"
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
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
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-500"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="barCouncilId">Bar Council ID</Label>
              <Input
                id="barCouncilId"
                name="barCouncilId"
                placeholder="e.g., BCI/12345/2020"
                value={formData.barCouncilId}
                onChange={handleChange}
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-500"
              />
              {errors.barCouncilId && <p className="text-sm text-red-500">{errors.barCouncilId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => handleSelectChange("specialization", value)}
                disabled={isLoading}
              >
                <SelectTrigger id="specialization" className="border-blue-200 focus:border-blue-500">
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
              {errors.specialization && <p className="text-sm text-red-500">{errors.specialization}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min="0"
                placeholder="e.g., 5"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-500"
              />
              {errors.yearsOfExperience && <p className="text-sm text-red-500">{errors.yearsOfExperience}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-500"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="border-blue-200 focus:border-blue-500"
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {errors.form && (
              <div className="bg-red-50 p-3 rounded-md">
                <p className="text-sm text-red-500">{errors.form}</p>
              </div>
            )}

            <AnimatedButton
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              isLoading={isLoading}
              loadingText="Sending OTP..."
            >
              Continue
            </AnimatedButton>
          </form>
        </MotionWrapper>
      )}

      {step === RegistrationStep.OTP_VERIFICATION && (
        <MotionWrapper>
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-slate-600">
                We've sent a verification code to <span className="font-medium">{formData.email}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">Enter 6-digit OTP</Label>
              <Input
                id="otp"
                name="otp"
                placeholder="123456"
                value={otp}
                onChange={handleOtpChange}
                disabled={isLoading}
                maxLength={6}
                className="text-center text-lg tracking-widest border-blue-200 focus:border-blue-500"
              />
              {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(RegistrationStep.DETAILS)}
                className="text-sm text-blue-600 hover:underline"
                disabled={isLoading}
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => {
                  // In a real app, you would resend the OTP
                  alert("OTP resent successfully!")
                }}
                className="text-sm text-blue-600 hover:underline"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </div>

            <AnimatedButton
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              isLoading={isLoading}
              loadingText="Verifying..."
            >
              Create Account
            </AnimatedButton>
          </form>
        </MotionWrapper>
      )}
    </>
  )
}

export default LawyerRegistrationForm
