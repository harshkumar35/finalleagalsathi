// This is a simplified version for the demo
// In a production environment, you would use a proper PDF/DOCX generation library

export async function generateAgreementPDF(formData: any, agreementType: string) {
  // In a real implementation, you would use a library like jsPDF or call a server endpoint
  // that uses a more robust PDF generation library

  // For demo purposes, we'll create a simple HTML and convert it to a Blob
  const htmlContent = generateHtmlContent(formData, agreementType)

  // Create a Blob from the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" })

  // Create a download link and trigger it
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${formData.title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  return true
}

export async function generateAgreementDocx(formData: any, agreementType: string) {
  // Similar to PDF generation, but with DOCX format
  // In a real implementation, you would use a library like docx

  const htmlContent = generateHtmlContent(formData, agreementType)

  // Create a Blob from the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" })

  // Create a download link and trigger it
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${formData.title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.docx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  return true
}

function generateHtmlContent(formData: any, agreementType: string) {
  // Generate HTML content based on the form data and agreement type
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${formData.title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { text-align: center; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .signature { margin-top: 50px; display: flex; justify-content: space-between; }
        .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 50px; }
        .signature-name { margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${formData.title}</h1>
        <p>This agreement is made on ${formData.effectiveDate} between <strong>${formData.partyOne}</strong> ("Party One") and <strong>${formData.partyTwo}</strong> ("Party Two").</p>
      </div>
      
      <div class="section">
        <h2>1. Duration</h2>
        <p>This agreement shall remain in effect for ${formData.duration} from the effective date.</p>
      </div>
      
      <div class="section">
        <h2>2. Scope</h2>
        <p>${formData.scope}</p>
      </div>
      
      <div class="section">
        <h2>3. Terms and Conditions</h2>
        <p>${formData.terms}</p>
      </div>
      
      ${
        formData.additionalClauses
          ? `
      <div class="section">
        <h2>4. Additional Clauses</h2>
        <p>${formData.additionalClauses}</p>
      </div>
      `
          : ""
      }
      
      <div class="section">
        <h2>${formData.additionalClauses ? "5" : "4"}. Signatures</h2>
        <div class="signature">
          <div>
            <div class="signature-line"></div>
            <div class="signature-name">${formData.partyOne}</div>
            <div>Date: ________________</div>
          </div>
          <div>
            <div class="signature-line"></div>
            <div class="signature-name">${formData.partyTwo}</div>
            <div>Date: ________________</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
