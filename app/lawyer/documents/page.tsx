"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { ArrowLeft } from "lucide-react"
import { jsPDF } from "jspdf"
import DocumentTemplates from "@/components/document-generator/document-templates"
import DocumentForm from "@/components/document-generator/document-form"
import DocumentPreview from "@/components/document-generator/document-preview"

// Available template types
export type TemplateType = "nda" | "employment" | "rental" | ""

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<"select" | "fill" | "preview">("select")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [previewDocument, setPreviewDocument] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [editableDocument, setEditableDocument] = useState("")
  const previewRef = useRef<HTMLDivElement>(null)

  const handleSelectTemplate = (templateKey: TemplateType) => {
    setSelectedTemplate(templateKey)
    setFormData({})
    setActiveTab("fill")
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const generatePreview = () => {
    if (!selectedTemplate) return

    // This will be replaced with our actual template generation logic
    const filledTemplate = DocumentTemplates.generateDocument(selectedTemplate, formData)

    setPreviewDocument(filledTemplate)
    setEditableDocument(filledTemplate)
    setActiveTab("preview")
  }

  const handleEditDocument = () => {
    setIsEditMode(true)
  }

  const handleSaveEdit = () => {
    setPreviewDocument(editableDocument)
    setIsEditMode(false)
  }

  const downloadAsPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    })

    const margin = 40
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin
    const content = previewDocument

    const splitText = doc.splitTextToSize(content, pageWidth)
    doc.setFontSize(10)

    let y = margin
    const lineHeight = 12

    // Add text to PDF
    splitText.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage()
        y = margin
      }
      doc.text(line, margin, y)
      y += lineHeight
    })

    // Download PDF
    const templateName = selectedTemplate || "document"
    doc.save(`${templateName.toLowerCase().replace(/\s+/g, "-")}.pdf`)
  }

  const handleBackToEdit = () => {
    setActiveTab("fill")
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-8">
          <h1 className="text-3xl font-bold">Document Generator</h1>
          <p className="text-slate-600 mt-2">Create legal documents quickly and easily</p>
        </MotionWrapper>

        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Agreement Generator</CardTitle>
            <CardDescription>Select a template, fill in the details, and generate your legal document</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="select" disabled={activeTab === "preview" && !isEditMode}>
                  1. Select Template
                </TabsTrigger>
                <TabsTrigger value="fill" disabled={!selectedTemplate || (activeTab === "preview" && !isEditMode)}>
                  2. Fill Details
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={activeTab !== "preview"}>
                  3. Preview & Download
                </TabsTrigger>
              </TabsList>

              <TabsContent value="select" className="py-4">
                <DocumentTemplates onSelectTemplate={handleSelectTemplate} selectedTemplate={selectedTemplate} />
              </TabsContent>

              <TabsContent value="fill" className="py-4">
                {selectedTemplate && (
                  <>
                    <div className="mb-4 flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          setSelectedTemplate("")
                          setActiveTab("select")
                        }}
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Templates
                      </Button>
                      <h3 className="text-lg font-medium">{DocumentTemplates.getTemplateName(selectedTemplate)}</h3>
                    </div>

                    <DocumentForm
                      selectedTemplate={selectedTemplate}
                      formData={formData}
                      onChange={handleInputChange}
                      onSubmit={generatePreview}
                    />
                  </>
                )}
              </TabsContent>

              <TabsContent value="preview" className="py-4">
                <DocumentPreview
                  previewDocument={previewDocument}
                  editableDocument={editableDocument}
                  isEditMode={isEditMode}
                  setEditableDocument={setEditableDocument}
                  onBackToEdit={handleBackToEdit}
                  onEditDocument={handleEditDocument}
                  onSaveEdit={handleSaveEdit}
                  onDownload={downloadAsPDF}
                  previewRef={previewRef}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
