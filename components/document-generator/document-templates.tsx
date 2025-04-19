"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

// Template types and interfaces
export interface TemplateField {
  name: string
  label: string
  type: "text" | "date" | "number" | "textarea"
}

export interface Template {
  id: string
  name: string
  description: string
  fields: TemplateField[]
  template: (formData: Record<string, string>) => string
}

// Template generation functions
function generateNDATemplate(formData: Record<string, string>): string {
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
}

function generateEmploymentTemplate(formData: Record<string, string>): string {
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
}

function generateRentalTemplate(formData: Record<string, string>): string {
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
}

// Templates data
const templates: Template[] = [
  {
    id: "nda",
    name: "Non-Disclosure Agreement (NDA)",
    description: "Protect your confidential information when sharing with other parties.",
    template: generateNDATemplate,
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
  {
    id: "employment",
    name: "Employment Agreement",
    description: "Formalize employment relationships with clear terms and conditions.",
    template: generateEmploymentTemplate,
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
  {
    id: "rental",
    name: "Rental Agreement",
    description: "Document rental terms between landlord and tenant.",
    template: generateRentalTemplate,
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
]

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const DocumentTemplates = () => {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/document-generator/${templateId}`)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Document Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create professional legal documents in minutes. Select a template below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            onMouseEnter={() => setHoveredCard(template.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Card
              className={`h-full border-2 transition-all duration-300 ${
                hoveredCard === template.id ? "border-purple-500 shadow-lg" : "border-gray-200"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{template.fields.length} fields to complete</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSelectTemplate(template.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  Select Template
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DocumentTemplates
