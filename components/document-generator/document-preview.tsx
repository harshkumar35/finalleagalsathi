"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Download, ArrowLeft, Printer } from "lucide-react"

interface DocumentPreviewProps {
  title: string
  content: string
  onBack: () => void
}

const DocumentPreview = ({ title, content, onBack }: DocumentPreviewProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const documentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDownloadPDF = async () => {
    if (!documentRef.current) return

    setIsGenerating(true)

    try {
      const canvas = await html2canvas(documentRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`${title.replace(/\s+/g, "_").toLowerCase()}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  // Format the content with proper line breaks
  const formattedContent = content.split("\n").map((line, index) => (
    <p key={index} className={line.trim() === "" ? "h-4" : "mb-2"}>
      {line}
    </p>
  ))

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Form
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer size={16} />
              Print
            </Button>

            <Button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 flex items-center gap-2"
            >
              <Download size={16} />
              {isGenerating ? "Generating PDF..." : "Download PDF"}
            </Button>
          </div>
        </div>

        <Card className="border shadow-lg print:shadow-none print:border-none">
          <CardHeader className="border-b print:hidden">
            <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <div ref={documentRef} className="document-content font-serif text-black leading-relaxed">
              {formattedContent}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default DocumentPreview
