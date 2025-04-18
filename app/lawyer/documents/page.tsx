"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FileText, Eye, Download, Edit2, Save, ArrowLeft } from "lucide-react"
import { jsPDF } from "jspdf"

// Agreement templates
const ndaTemplate = `
                                                         NON-DISCLOSURE AGREEMENT

                                                         

THIS AGREEMENT is made and entered into on {{effectiveDate}}(Date)

                                     BETWEEN:

1. {{party1}} (hereinafter referred to as "Party 1")

                                     AND

2. {{party2}} (hereinafter referred to as "Party 2")

 (Party 1 and Party 2 are hereinafter referred to individually as a "Party"and collectively as the "Parties". The Party disclosing confidential information shall be referred to as the "Disclosing Party" and the Party receiving the confidential information shall be referred to as the "Receiving Party".)

                                    WHEREAS:

 Party 1 engages in {{party1Engages}};
 Party 2 engages in {{party2Engages}};
 
The Parties wish to explore {{purpose}} (hereinafter referred to as the "Proposed Transaction");

 IN CONNECTION WITH THE ABOVE, THE PARTIES HEREBY AGREE AS FOLLOWS:

1.	"Confidential and or proprietary Information" shall mean and include any information disclosed by one Party (Disclosing Party) to the other (Receiving Party) either directly or indirectly, in writing, orally, by inspection of tangible objects (including, without limitation, documents, prototypes, samples, media, documentation, discs and code). Confidential information shall include, without limitation, any materials, trade secrets, network information, configurations, trademarks, brand name, know-how, business and marketing plans, financial and operational information, and all other non-public information, material or data relating to the current and/ or future business and operations of the Disclosing Party and analysis, compilations, studies, summaries, extracts or other documentation prepared by the Disclosing Party. Confidential Information may also include information disclosed to the Receiving Party by third parties on behalf of the Disclosing Party. 

2.	The Receiving Party shall refrain from disclosing, reproducing, summarising and/or distributing Confidential Information and confidential materials of the Disclosing Party except in connection with the Proposed Transaction.

3.	The Parties shall protect the confidentiality of each other's Confidential Information in the same manner as they protect the confidentiality of their own proprietary and confidential information of similar nature. Each Party, while acknowledging the confidential and proprietary nature of the Confidential Information agrees to take all reasonable measures at its own expense to restrain its representatives from prohibited or unauthorised disclosure or use of the Confidential Information.

4.	Confidential Information shall at all times remain the property of the Disclosing Party and may not be copied or reproduced by the Receiving Party without the Disclosing Party's prior written consent.   

5.	Within seven (7) days of a written request by the Disclosing Party, the Receiving Party shall return/destroy (as may be requested in writing by the Disclosing Party or upon expiry and or earlier termination) all originals, copies, reproductions and summaries of Confidential Information provided to the Receiving Party as Confidential Information.  The Receiving Party shall certify to the Disclosing Party in writing that it has satisfied its obligations under this paragraph.  

6.	The Receiving Party may disclose the Confidential Information only to the Receiving Party's employees and consultants on a need-to-know basis.  The Receiving Party shall have executed or shall execute appropriate written agreements with third parties, in a form and manner sufficient to enable the Receiving Party to enforce all the provisions of this Agreement.

7.	Confidential Information, however, shall not include any information which the Receiving Party can show: 

i)	is in or comes into the public domain otherwise than through a breach of this Agreement or the fault of the Receiving Party; or

ii)	was already in its possession free of any such restriction prior to receipt from the Disclosing Party; or

iii)	was independently developed by the Receiving Party without making use of the Confidential Information; or

iv)	has been approved for release or use (in either case without restriction) by written authorisation of the Disclosing Party.

8.	In the event either Party receives a summons or other validly issued administrative or judicial process requiring the disclosure of Confidential Information of the other Party, the Receiving Party shall promptly notify the Disclosing Party.  The Receiving Party may disclose Confidential Information to the extent such disclosure is required by law, rule, regulation or legal process; provided however, that, to the extent practicable, the Receiving Party shall give prompt written notice of any such request for such information to the Disclosing Party,  and agrees to co-operate with the Disclosing Party, at the Disclosing Party's expense, to the extent permissible and practicable, to challenge the request or limit the scope there of, as the Disclosing Party may reasonably deem appropriate.

9.	Neither Party shall use the other's name, trademarks, proprietary words or symbols or disclose under this Agreement in any publication, press release, marketing material, or otherwise without the prior written approval of the other.

10.	Each Party agrees that the conditions in this Agreement and the Confidential Information disclosed pursuant to this Agreement are of a special, unique, and extraordinary character and that an impending or existing violation of any provision of this Agreement would cause the other Party irreparable injury for which it would have no adequate remedy at law and further agrees that the other Party shall be entitled to obtain immediately injunctive relief prohibiting such violation, in addition to any other rights and remedies available to it at law or in equity.

11.	The Receiving Party shall indemnify the Disclosing Party for all costs, expenses or damages that Disclosing Party incurs as a result of any violation of any provisions of this Agreement. This obligation shall include court, litigation expenses, and actual, reasonable attorney's fees. The Parties acknowledge that as damages may not be a sufficient remedy for any breach under this Agreement, the non-breaching party is entitled to seek specific performance or injunctive relief (as appropriate) as a remedy for any breach or threatened breach, in addition to any other remedies at law or in equity.

12. 	Neither Party shall be liable for any special, consequential, incidental or exemplary damages or loss (or any lost profits, savings or business opportunity) regardless of whether a Party was advised of the possibility of the damage or loss asserted.

13.  	Both the Parties agree that by virtue of the Parties entering into this Agreement neither Party is obligated to disclose all or any of the Confidential Information to the other as stated in this Agreement. The Parties reserve the right to disclose only such information at its discretion and which it thinks, is necessary to disclose in relation to the Proposed Transaction.

14. 	Both the Parties agree that this Agreement will be effective from the date of execution of this Agreement by both Parties and shall continue to be effective till the Proposed Transaction is terminated by either Party by giving a thirty (30)days notice, in case either Party foresees that the Proposed Transaction would not be achieved. 

Notwithstanding anything contained herein, the provisions of this Agreement shall survive and continue after expiration or termination of this Agreement for a further period of five year(s) from the date of expiration.

It being further clarified that notwithstanding anything contained herein, in case a binding agreement is executed between the Parties in furtherance of the Proposed Transaction, the terms and conditions of this Agreement shall become effective and form a part of that binding agreement and be co-terminus with such binding agreement and shall be in effect till the term of such binding agreement and shall after its expiry and or early termination shall continue to be in force in the following manner: 

i.	{{confidentialityDuration}} years after the expiry of the binding agreement 

(whichever is earlier)

15. 	Each Party warrants that it has the authority to enter into this Agreement.

16. 	If any provision of this agreement is held to be invalid or unenforceable to any extent, the remainder of this Agreement shall not be affected and each provision hereof shall be valid and enforceable to the fullest extent permitted by law.  Any invalid or unenforceable provision of this Agreement shall be replaced with a provision that is valid and enforceable and most nearly reflects the original intent of the unenforceable provision.

17. 	This Agreement may be executed in two counterparts, each of which will be deemed to be an original, and all of which, when taken together, shall be deemed to constitute one and the same agreement.

18.  	The relationship between both the Parties to this Agreement shall be on a principal-to-principal basis and nothing in this agreement shall be deemed to have created a relationship of an agent or partner between the Parties and none of the employees of COMPANY shall be considered as employees of PARTY 1.

19. 	This Agreement shall be governed by the laws of {{jurisdiction}}. Both parties irrevocably submit to the exclusive jurisdiction of the Courts in Bangalore, for any action or proceeding regarding this Agreement. Any dispute or claim arising out of or in connection herewith, or the breach, termination or invalidity thereof, shall be settled by arbitration in accordance with the provisions of Procedure of the Indian Arbitration & Conciliation Act, 1996, including any amendments thereof. The arbitration tribunal shall be composed of a sole arbitrator, and such arbitrator shall be appointed mutually by the Parties. The place of arbitration shall be Bangalore, India and the arbitration proceedings shall take place in the English language.

20. 	Additional oral agreements do not exist. All modifications and amendments to this Agreement must be made in writing.

21. 	The Agreement and/or any rights arising from it cannot be assigned or otherwise transferred either wholly or in part, without the written consent of the other Party.


                            

            For Party 1:                                                  For Party 2:

            _______________________                                       _______________________
            Signature                                                     Signature

            Name: ___________________                                     Name: ___________________
            Designation: _____________                                    Designation: _____________
            Date: ___________________                                     Date: ___________________
`

const employmentTemplate = `
                                      EMPLOYMENT AGREEMENT

THIS EMPLOYMENT AGREEMENT (the "Agreement") is made and entered into on {{effectiveDate}} (the "Effective Date"),

                                         BETWEEN:

{{employerName}}, a company incorporated under the laws of India, having its registered office at {{employerAddress}} (hereinafter referred to as the "Employer"),

                                           AND

{{employeeName}}, residing at {{employeeAddress}}, (hereinafter referred to as the "Employee").

The Employer and the Employee are hereinafter referred to individually as a "Party" and collectively as the "Parties".

WHEREAS:

A. The Employer is engaged in the business of {{businessDescription}}.

B. The Employer wishes to employ the Employee as {{designation}} and the Employee wishes to accept such employment with the Employer, on the terms and conditions set forth in this Agreement.

NOW THEREFORE, in consideration of the mutual covenants and agreements herein contained, the Parties hereto agree as follows:

1. EMPLOYMENT AND DUTIES

1.1 Position: The Employer hereby employs the Employee, and the Employee hereby accepts employment with the Employer, as {{designation}} reporting to {{reportingTo}}.

1.2 Duties: The Employee shall perform such duties and responsibilities as are assigned to him/her from time to time by the Employer, consistent with the Employee's position with the Employer.

1.3 Work Schedule: The Employee shall work during the Employer's normal business hours, as notified by the Employer from time to time, and such additional hours as may be necessary for the proper performance of his/her duties.

1.4 Location: The Employee shall primarily perform his/her duties at the Employer's office located at {{workLocation}}, or at such other place as the Employer may reasonably require.

2. TERM OF EMPLOYMENT

2.1 Commencement: The Employee's employment under this Agreement shall commence on {{startDate}} ("Commencement Date").

2.2 Term: The employment of the Employee shall be for a period of {{employmentTerm}} years from the Commencement Date ("Initial Term") and shall automatically renew for successive periods of one (1) year each, unless terminated earlier in accordance with Clause 8 of this Agreement.

3. REMUNERATION AND BENEFITS

3.1 Salary: The Employer shall pay the Employee a gross monthly salary of INR {{monthlySalary}} (Indian Rupees {{monthlySalaryInWords}} only), payable in arrears on or before the last working day of each calendar month.

3.2 Benefits: The Employee shall be entitled to the following benefits:
    (a) Provident Fund and Gratuity as per applicable laws;
    (b) Health Insurance as per the Employer's policies;
    (c) {{additionalBenefits}}.

3.3 Leave: The Employee shall be entitled to paid leaves as per the Employer's policies.

3.4 Expenses: The Employer shall reimburse the Employee for all reasonable and necessary expenses incurred by the Employee in the performance of his/her duties, in accordance with the Employer's expense reimbursement policies.

4. PROBATION PERIOD

4.1 The Employee shall be on probation for a period of {{probationPeriod}} months from the Commencement Date.

4.2 During the probation period, either Party may terminate this Agreement by giving {{probationNoticePeriod}} days' notice in writing to the other Party, or salary in lieu thereof.

4.3 Upon successful completion of the probation period, the Employee shall be deemed to be confirmed in his/her position.

5. CONFIDENTIALITY

5.1 The Employee acknowledges that, in the course of his/her employment with the Employer, he/she will have access to Confidential Information. The Employee agrees to maintain the confidentiality of all such Confidential Information during the term of his/her employment and at all times thereafter.

5.2 For the purposes of this Agreement, "Confidential Information" means all information, whether in written, oral, electronic or other form, relating to the business, products, services, customers, suppliers, operations, processes, research, development, trade secrets, know-how, or other proprietary information of the Employer that is not generally known to the public.

6. INTELLECTUAL PROPERTY

6.1 The Employee agrees that all inventions, designs, improvements, works of authorship, and other intellectual property created, conceived, or developed by the Employee, either alone or in conjunction with others, during the term of his/her employment with the Employer, that relate to the business of the Employer ("Intellectual Property"), shall be the sole and exclusive property of the Employer.

7. NON-COMPETITION AND NON-SOLICITATION

7.1 During the term of his/her employment with the Employer and for a period of {{nonCompetePeriod}} months thereafter, the Employee shall not, directly or indirectly, engage in any business that competes with the business of the Employer.

7.2 During the term of his/her employment with the Employer and for a period of {{nonSolicitPeriod}} months thereafter, the Employee shall not, directly or indirectly, solicit any employee, consultant, customer, or supplier of the Employer to terminate his/her relationship with the Employer.

8. TERMINATION

8.1 Termination by Either Party: After the probation period, either Party may terminate this Agreement by giving {{noticePeriod}} months' notice in writing to the other Party, or salary in lieu thereof.

8.2 Termination for Cause: The Employer may terminate this Agreement immediately without notice or payment in lieu of notice in the event of:
    (a) the Employee's willful misconduct, dishonesty, or breach of trust;
    (b) the Employee's material breach of any provision of this Agreement;
    (c) the Employee's conviction of a criminal offense; or
    (d) any other act or omission that constitutes "just cause" for dismissal under applicable law.

9. GOVERNING LAW AND JURISDICTION

9.1 This Agreement shall be governed by and construed in accordance with the laws of India.

9.2 Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts in {{jurisdiction}}.

10. MISCELLANEOUS

10.1 Entire Agreement: This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior discussions, agreements, and understandings between them.

10.2 Amendment: No amendment, modification, or waiver of any provision of this Agreement shall be effective unless in writing and signed by both Parties.

10.3 Severability: If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable.

10.4 Waiver: The failure of either Party to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision.

10.5 Assignment: The Employee shall not assign or transfer any of his/her rights or obligations under this Agreement. The Employer may assign this Agreement to any successor or affiliated entity.

IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date first above written.

            For Employer:                                              For Employee:

            _______________________                                   _______________________
            Signature                                                 Signature

            Name: ___________________                                 Name: ___________________
            Designation: _____________                                Date: ___________________
            Date: ___________________
`

const rentalAgreementTemplate = `
                                    RENTAL AGREEMENT

THIS RENTAL AGREEMENT (the "Agreement") is made and entered into on {{effectiveDate}} (the "Effective Date"),

                                        BETWEEN:

{{landlordName}}, residing at {{landlordAddress}} (hereinafter referred to as the "Landlord"),

                                          AND

{{tenantName}}, residing at {{tenantAddress}} (hereinafter referred to as the "Tenant").

The Landlord and the Tenant are hereinafter referred to individually as a "Party" and collectively as the "Parties".

WHEREAS:

A. The Landlord is the owner of the property located at {{propertyAddress}} (hereinafter referred to as the "Premises").

B. The Landlord desires to lease the Premises to the Tenant, and the Tenant desires to lease the Premises from the Landlord, on the terms and conditions set forth in this Agreement.

NOW THEREFORE, in consideration of the mutual covenants and agreements herein contained, the Parties hereto agree as follows:

1. PREMISES

1.1 The Landlord hereby leases to the Tenant, and the Tenant hereby leases from the Landlord, the Premises consisting of {{premisesDescription}}.

2. TERM

2.1 The term of this Agreement shall be for a period of {{leaseTerm}} months, commencing on {{leaseStartDate}} and ending on {{leaseEndDate}} (the "Term").

2.2 This Agreement may be renewed for a further period as mutually agreed by the Parties in writing.

3. RENT AND SECURITY DEPOSIT

3.1 Rent: The Tenant shall pay to the Landlord a monthly rent of INR {{monthlyRent}} (Indian Rupees {{monthlyRentInWords}} only), payable in advance on or before the {{rentDueDate}} day of each calendar month.

3.2 Security Deposit: The Tenant has paid to the Landlord a security deposit of INR {{securityDeposit}} (Indian Rupees {{securityDepositInWords}} only), which shall be refunded to the Tenant upon the expiration or termination of this Agreement, subject to deductions for any amounts due to the Landlord under this Agreement.

3.3 The security deposit shall not bear any interest.

4. UTILITIES AND MAINTENANCE

4.1 The Tenant shall be responsible for payment of all utilities, including but not limited to electricity, water, gas, telephone, internet, and cable TV charges.

4.2 The Landlord shall be responsible for structural repairs and maintenance of the Premises, except for damages caused by the Tenant's negligence or willful misconduct.

4.3 The Tenant shall maintain the Premises in good and clean condition and shall be responsible for routine maintenance and minor repairs.

5. USE OF PREMISES

5.1 The Tenant shall use the Premises solely for residential purposes and shall not use the Premises for any illegal, immoral, or commercial purposes.

5.2 The Tenant shall not make any structural alterations or additions to the Premises without the prior written consent of the Landlord.

5.3 The Tenant shall not sublet or assign this Agreement or any part thereof without the prior written consent of the Landlord.

6. LANDLORD'S REPRESENTATIONS AND WARRANTIES

6.1 The Landlord represents and warrants that:
    (a) The Landlord is the legal owner of the Premises and has the right to lease the Premises to the Tenant.
    (b) The Premises is in good condition and fit for residential use.
    (c) The Landlord shall not interfere with the Tenant's peaceful possession and enjoyment of the Premises during the Term.

7. TENANT'S REPRESENTATIONS AND WARRANTIES

7.1 The Tenant represents and warrants that:
    (a) The Tenant shall use the Premises only for the purpose specified in this Agreement.
    (b) The Tenant shall not create any nuisance or disturbance to neighbors.
    (c) The Tenant shall comply with all applicable laws, rules, and regulations.

8. ENTRY BY LANDLORD

8.1 The Landlord may enter the Premises at reasonable times with prior notice to the Tenant for the purpose of inspection, repairs, or showing the Premises to prospective tenants or purchasers.

8.2 In case of emergency, the Landlord may enter the Premises without prior notice.

9. TERMINATION

9.1 Either Party may terminate this Agreement by giving {{noticePeriod}} months' written notice to the other Party.

9.2 The Landlord may terminate this Agreement immediately if the Tenant:
    (a) Fails to pay the rent for two consecutive months;
    (b) Violates any material term or condition of this Agreement;
    (c) Uses the Premises for illegal purposes; or
    (d) Causes substantial damage to the Premises.

10. GOVERNING LAW AND JURISDICTION

10.1 This Agreement shall be governed by and construed in accordance with the laws of India.

10.2 Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts in {{jurisdiction}}.

11. MISCELLANEOUS

11.1 Entire Agreement: This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior discussions, agreements, and understandings between them.

11.2 Amendment: No amendment, modification, or waiver of any provision of this Agreement shall be effective unless in writing and signed by both Parties.

11.3 Severability: If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable.

11.4 Notices: All notices required under this Agreement shall be in writing and delivered personally or sent by registered mail to the addresses mentioned above.

IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date first above written.

            Landlord:                                                Tenant:

            _______________________                                 _______________________
            Signature                                               Signature

            Name: ___________________                               Name: ___________________
            Date: ___________________                               Date: ___________________
`

const agreementTemplates = {
  nda: {
    name: "Non-Disclosure Agreement (NDA)",
    template: ndaTemplate,
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
    name: "Employment Agreement",
    template: employmentTemplate,
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "employerName", label: "Employer Name", type: "text" },
      { name: "employerAddress", label: "Employer Address", type: "text" },
      { name: "employeeName", label: "Employee Name", type: "text" },
      { name: "employeeAddress", label: "Employee Address", type: "text" },
      { name: "businessDescription", label: "Business Description", type: "text" },
      { name: "designation", label: "Designation", type: "text" },
      { name: "reportingTo", label: "Reporting To", type: "text" },
      { name: "workLocation", label: "Work Location", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "employmentTerm", label: "Employment Term (years)", type: "number" },
      { name: "monthlySalary", label: "Monthly Salary (INR)", type: "number" },
      { name: "monthlySalaryInWords", label: "Monthly Salary (in words)", type: "text" },
      { name: "additionalBenefits", label: "Additional Benefits", type: "text" },
      { name: "probationPeriod", label: "Probation Period (months)", type: "number" },
      { name: "probationNoticePeriod", label: "Probation Notice Period (days)", type: "number" },
      { name: "nonCompetePeriod", label: "Non-Compete Period (months)", type: "number" },
      { name: "nonSolicitPeriod", label: "Non-Solicit Period (months)", type: "number" },
      { name: "noticePeriod", label: "Notice Period (months)", type: "number" },
      { name: "jurisdiction", label: "Jurisdiction", type: "text" },
    ],
  },
  rental: {
    name: "Rental Agreement",
    template: rentalAgreementTemplate,
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "landlordName", label: "Landlord Name", type: "text" },
      { name: "landlordAddress", label: "Landlord Address", type: "text" },
      { name: "tenantName", label: "Tenant Name", type: "text" },
      { name: "tenantAddress", label: "Tenant Address", type: "text" },
      { name: "propertyAddress", label: "Property Address", type: "text" },
      { name: "premisesDescription", label: "Premises Description", type: "text" },
      { name: "leaseTerm", label: "Lease Term (months)", type: "number" },
      { name: "leaseStartDate", label: "Lease Start Date", type: "date" },
      { name: "leaseEndDate", label: "Lease End Date", type: "date" },
      { name: "monthlyRent", label: "Monthly Rent (INR)", type: "number" },
      { name: "monthlyRentInWords", label: "Monthly Rent (in words)", type: "text" },
      { name: "rentDueDate", label: "Rent Due Date", type: "number" },
      { name: "securityDeposit", label: "Security Deposit (INR)", type: "number" },
      { name: "securityDepositInWords", label: "Security Deposit (in words)", type: "text" },
      { name: "noticePeriod", label: "Notice Period (months)", type: "number" },
      { name: "jurisdiction", label: "Jurisdiction", type: "text" },
    ],
  },
}

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("select")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [previewDocument, setPreviewDocument] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editableDocument, setEditableDocument] = useState("")
  const previewRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSelectTemplate = (templateKey: string) => {
    setSelectedTemplate(templateKey)
    setFormData({})
    setActiveTab("fill")
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const generatePreview = () => {
    if (!selectedTemplate) return

    let filledTemplate = agreementTemplates[selectedTemplate as keyof typeof agreementTemplates].template

    Object.keys(formData).forEach((key) => {
      filledTemplate = filledTemplate.replace(new RegExp(`{{${key}}}`, "g"), formData[key] || "_________")
    })

    setPreviewDocument(filledTemplate)
    setEditableDocument(filledTemplate)
    setIsPreviewMode(true)
    setActiveTab("preview")
  }

  const handleEditDocument = () => {
    setIsEditMode(true)
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, 0)
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
    const content = previewDocument.split("\n").join("\n")

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
    const templateName = agreementTemplates[selectedTemplate as keyof typeof agreementTemplates]?.name || "document"
    doc.save(`${templateName.toLowerCase().replace(/\s+/g, "-")}.pdf`)
  }

  const handleBackToEdit = () => {
    setActiveTab("fill")
    setIsPreviewMode(false)
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="select" disabled={activeTab === "preview" && !isEditMode}>
                  1. Select Template
                </TabsTrigger>
                <TabsTrigger value="fill" disabled={!selectedTemplate || (activeTab === "preview" && !isEditMode)}>
                  2. Fill Details
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={!isPreviewMode}>
                  3. Preview & Download
                </TabsTrigger>
              </TabsList>

              <TabsContent value="select" className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(agreementTemplates).map(([key, value]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedTemplate === key ? "border-primary ring-1 ring-primary" : ""
                      }`}
                      onClick={() => handleSelectTemplate(key)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-primary" />
                          {value.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-slate-500">
                          {key === "nda"
                            ? "Protect your confidential information when sharing with other parties."
                            : key === "employment"
                              ? "Formalize employment relationships with clear terms and conditions."
                              : "Document rental terms between landlord and tenant."}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => handleSelectTemplate(key)}
                        >
                          Select
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
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
                      <h3 className="text-lg font-medium">
                        {agreementTemplates[selectedTemplate as keyof typeof agreementTemplates].name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {agreementTemplates[selectedTemplate as keyof typeof agreementTemplates].fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          {field.type === "date" ? (
                            <Input
                              id={field.name}
                              type="date"
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                          ) : field.type === "number" ? (
                            <Input
                              id={field.name}
                              type="number"
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                          ) : field.type === "textarea" ? (
                            <Textarea
                              id={field.name}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              rows={3}
                            />
                          ) : (
                            <Input
                              id={field.name}
                              type="text"
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <AnimatedButton onClick={generatePreview} className="bg-primary hover:bg-primary/90">
                        <Eye className="h-4 w-4 mr-2" /> Preview Document
                      </AnimatedButton>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="preview" className="py-4">
                {isPreviewMode && (
                  <>
                    <div className="mb-4 flex items-center">
                      <Button variant="outline" size="sm" className="mr-2" onClick={handleBackToEdit}>
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Edit
                      </Button>
                      <h3 className="text-lg font-medium">
                        {agreementTemplates[selectedTemplate as keyof typeof agreementTemplates].name}
                      </h3>
                    </div>

                    <div className="border rounded-lg mb-6 bg-white">
                      {isEditMode ? (
                        <div className="p-6">
                          <Textarea
                            ref={textareaRef}
                            value={editableDocument}
                            onChange={(e) => setEditableDocument(e.target.value)}
                            className="w-full min-h-[500px] font-mono text-sm whitespace-pre-wrap"
                          />
                        </div>
                      ) : (
                        <div
                          ref={previewRef}
                          className="p-6 max-h-[600px] overflow-y-auto font-mono text-sm whitespace-pre-wrap"
                        >
                          {previewDocument}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <div>
                        {isEditMode ? (
                          <Button onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90">
                            <Save className="h-4 w-4 mr-2" /> Save Changes
                          </Button>
                        ) : (
                          <Button onClick={handleEditDocument} variant="outline">
                            <Edit2 className="h-4 w-4 mr-2" /> Edit Document
                          </Button>
                        )}
                      </div>
                      <div className="space-x-4">
                        <AnimatedButton
                          onClick={downloadAsPDF}
                          variant="outline"
                          className="border-primary text-primary"
                        >
                          <Download className="h-4 w-4 mr-2" /> Download PDF
                        </AnimatedButton>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
