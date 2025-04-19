"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import type { Template } from "./document-templates"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DocumentFormProps {
  template: Template
  onSubmit: (formData: Record<string, string>) => void
}

const DocumentForm = ({ template, onSubmit }: DocumentFormProps) => {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    template.fields.forEach((field) => {
      if (!formData[field.name] || formData[field.name].trim() === "") {
        newErrors[field.name] = `${field.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleCancel = () => {
    router.back()
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
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {template.fields.map((field, index) => (
              <motion.div key={field.name} variants={itemVariants} className="space-y-2">
                <Label htmlFor={field.name} className="font-medium">
                  {field.label}
                </Label>

                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={errors[field.name] ? "border-red-500" : ""}
                  />
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={errors[field.name] ? "border-red-500" : ""}
                  />
                )}

                {errors[field.name] && <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>}
              </motion.div>
            ))}
          </div>

          <motion.div className="flex justify-between pt-4" variants={itemVariants}>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              Generate Document
            </Button>
          </motion.div>
        </motion.form>
      </CardContent>
    </Card>
  )
}

export default DocumentForm
