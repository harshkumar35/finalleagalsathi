"use client"

import { motion } from "framer-motion"
import DocumentTemplates from "@/components/document-generator/document-templates"
import ParticleBackground from "@/components/particle-background"

export default function DocumentGeneratorPage() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <DocumentTemplates />
      </motion.div>
    </div>
  )
}
