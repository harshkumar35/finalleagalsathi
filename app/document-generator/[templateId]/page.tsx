"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DocumentForm from "@/components/document-generator/document-form"
import DocumentPreview from "@/components/document-generator/document-preview"
import type { Template } from "@/components/document-generator/document-templates"
import ParticleBackground from "@/components/particle-background"

// Import templates data
const templates = {
  nda: {
    id: "nda",
    name: "Non-Disclosure Agreement (NDA)",
    description: "Protect your confidential information when sharing with other parties.",
    template: (formData: Record<string, string>): string => {
      return `
        NON-DISCLOSURE AGREEMENT

        THIS AGREEMENT is made and entered into on ${formData.effectiveDate || "_________"}(Date)

        BETWEEN:

        1. ${formData.party1 || "_________"} (hereinafter referred to as "Party 1")

        AND

        2. ${formData.party2 || "_________"} (hereinafter referred to as "Party 2")

        (Party 1 and Party 2 are hereinafter referred to individually as a "Party" and collectively as the "Parties".)

        WHEREAS:
        Party 1 engages in ${formData.party1Engages || "_________"};
        Party 2 engages in ${formData.party2Engages || "_________"};

        The Parties wish to explore ${formData.purpose || "_________"} (hereinafter referred to as the "Proposed Transaction");

        IN CONNECTION WITH THE ABOVE, THE PARTIES HEREBY AGREE AS FOLLOWS:
        
        1. Confidential Information shall mean any information disclosed by one Party to the other.
        2. The Receiving Party shall maintain the confidentiality of the Confidential Information.
        3. This agreement shall be governed by the laws of ${formData.jurisdiction || "_________"}.
      `
    },
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "party1", label: "Party 1 Name", type: "text" },
      { name: "party2", label: "Party 2 Name", type: "text" },
      { name: "party1Engages", label: "Party 1 Business", type: "text" },
      { name: "party2Engages", label: "Party 2 Business", type: "text" },
      { name: "purpose", label: "Purpose of Agreement", type: "text" },
      { name: "confidentialityDuration", label: "Confidentiality Duration (years)", type: "number" },
      { name: "jurisdiction", label: "Jurisdiction", type: "text" },
    ],
  },
  employment: {
    id: "employment",
    name: "Employment Agreement",
    description: "Formalize employment relationships with clear terms and conditions.",
    template: (formData: Record<string, string>): string => {
      return `
        EMPLOYMENT AGREEMENT

        THIS EMPLOYMENT AGREEMENT is made and entered into on ${formData.effectiveDate || "_________"}

        BETWEEN:

        ${formData.employerName || "_________"}, having its registered office at ${formData.employerAddress || "_________"} (hereinafter referred to as the "Employer"),

        AND

        ${formData.employeeName || "_________"}, residing at ${formData.employeeAddress || "_________"} (hereinafter referred to as the "Employee").

        TERMS AND CONDITIONS:
        
        1. The Employee shall be employed as ${formData.designation || "_________"}.
        2. The Employee shall receive a monthly salary of INR ${formData.monthlySalary || "_________"}.
        3. This agreement shall be governed by the laws of ${formData.jurisdiction || "_________"}.
      `
    },
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "employerName", label: "Employer Name", type: "text" },
      { name: "employerAddress", label: "Employer Address", type: "text" },
      { name: "employeeName", label: "Employee Name", type: "text" },
      { name: "employeeAddress", label: "Employee Address", type: "text" },
      { name: "designation", label: "Designation", type: "text" },
      { name: "monthlySalary", label: "Monthly Salary (INR)", type: "number" },
      { name: "jurisdiction", label: "Jurisdiction", type: "text" },
    ],
  },
  rental: {
    id: "rental",
    name: "Rental Agreement",
    description: "Document rental terms between landlord and tenant.",
    template: (formData: Record<string, string>): string => {
      return `
        RENTAL AGREEMENT

        THIS RENTAL AGREEMENT is made and entered into on ${formData.effectiveDate || "_________"}

        BETWEEN:

        ${formData.landlordName || "_________"}, residing at ${formData.landlordAddress || "_________"} (hereinafter referred to as the "Landlord"),

        AND

        ${formData.tenantName || "_________"}, residing at ${formData.tenantAddress || "_________"} (hereinafter referred to as the "Tenant").

        TERMS AND CONDITIONS:
        
        1. The Landlord agrees to rent the property located at ${formData.propertyAddress || "_________"}.
        2. The monthly rent shall be INR ${formData.monthlyRent || "_________"}.
        3. This agreement shall be governed by the laws of ${formData.jurisdiction || "_________"}.
      `
    },
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "landlordName", label: "Landlord Name", type: "text" },
      { name: "landlordAddress", label: "Landlord Address", type: "text" },
      { name: "tenantName", label: "Tenant Name", type: "text" },
      { name: "tenantAddress", label: "Tenant Address", type: "text" },
      { name: "propertyAddress", label: "Property Address", type: "text" },
      { name: "monthlyRent", label: "Monthly Rent (INR)", type: "number" },
      { name: "jurisdiction", label: "Jurisdiction", type: "text" },
    ],
  },
}

export default function TemplateFormPage() {
  const params = useParams()
  const router = useRouter()
  const [template, setTemplate] = useState<Template | null>(null)
  const [documentContent, setDocumentContent] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const templateId = params.templateId as string
    const selectedTemplate = templates[templateId as keyof typeof templates]

    if (selectedTemplate) {
      setTemplate(selectedTemplate as unknown as Template)
    } else {
      router.push("/document-generator")
    }
  }, [params.templateId, router])

  const handleFormSubmit = (formData: Record<string, string>) => {
    if (!template) return

    const content = template.template(formData)
    setDocumentContent(content)
    setShowPreview(true)
  }

  const handleBackToForm = () => {
    setShowPreview(false)
  }

  if (!template) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="container mx-auto py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {!showPreview ? (
            <DocumentForm template={template} onSubmit={handleFormSubmit} />
          ) : (
            <DocumentPreview title={template.name} content={documentContent} onBack={handleBackToForm} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
