"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedButton } from "@/components/ui/animated-button"

type AgreementFormProps = {}

export default function AgreementForm({}: AgreementFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    effectiveDate: "",
    partyOne: "",
    partyTwo: "",
    duration: "",
    scope: "",
    terms: "",
    additionalClauses: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Agreement</CardTitle>
        <CardDescription>Fill in the details to generate your agreement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input
                type="date"
                id="effectiveDate"
                name="effectiveDate"
                value={formData.effectiveDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="partyOne">Party One</Label>
              <Input id="partyOne" name="partyOne" value={formData.partyOne} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="partyTwo">Party Two</Label>
              <Input id="partyTwo" name="partyTwo" value={formData.partyTwo} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="scope">Scope</Label>
            <Textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="terms">Terms and Conditions</Label>
            <Textarea id="terms" name="terms" value={formData.terms} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="additionalClauses">Additional Clauses</Label>
            <Textarea
              id="additionalClauses"
              name="additionalClauses"
              value={formData.additionalClauses}
              onChange={handleChange}
            />
          </div>
          <AnimatedButton>Generate Agreement</AnimatedButton>
        </div>
      </CardContent>
    </Card>
  )
}
