"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Calendar, ArrowLeft, Quote, CheckCircle2, BadgeInfo, ThumbsUp } from "lucide-react"

// Same case studies data from the previous page
const caseStudies = [
  {
    id: "property-dispute",
    title: "Multi-Generational Property Dispute Resolution",
    category: "Real Estate",
    date: "October 15, 2023",
    shortDescription:
      "A complex multi-generational property dispute among family members that required careful legal navigation.",
    image: "/placeholder.svg?height=250&width=500",
    challenges: [
      "Multiple claimants from different generations",
      "Absence of clear documentation",
      "Emotional family dynamics complicating negotiations",
      "Property divided across multiple jurisdictions",
    ],
    approach: [
      "Comprehensive document verification and title search",
      "Family mediation sessions with all stakeholders",
      "Creation of a fair distribution plan based on legal entitlements",
      "Structured settlement agreement with clear terms",
    ],
    results: [
      "Successful out-of-court settlement saving significant litigation costs",
      "Preservation of family relationships through collaborative resolution",
      "Clear title documentation for all divided properties",
      "Implementation of tax-efficient transfer mechanisms",
    ],
    testimonial: {
      quote:
        "What seemed like an impossible situation with our family property was resolved with such professionalism and care. The team at LegalSathi not only understood the legal complexities but also the emotional aspects of our case.",
      author: "Rajesh Sharma, Delhi",
    },
    fullDescription: `
      This case involved a sprawling family property dispute that had remained unresolved for over two decades. The property in question was a large ancestral estate spanning multiple districts and included residential, commercial, and agricultural lands.

      The dispute had escalated over three generations, with family members having conflicting claims based on verbal promises, partial documentation, and traditional inheritance expectations. The emotional stakes were high, with relationships strained to breaking point.

      Our legal team approached this sensitive case with both legal rigor and emotional intelligence. We began by conducting an extensive documentation review, recovering historical records, and establishing a clear chain of title. This process involved coordinating with multiple local authorities and land records offices.

      Recognizing that a purely litigation-based approach would likely destroy family relationships and extend the conflict, we established a structured mediation process. This involved individual consultations with all stakeholders to understand their concerns, followed by facilitated group sessions.

      The breakthrough came when we developed a comprehensive asset division plan that respected legal entitlements while acknowledging emotional attachments to specific portions of the property. We incorporated innovative solutions such as shared ownership of certain commercial properties with clear management agreements, and equitable buyout arrangements for other portions.

      By focusing on both the legal and human dimensions of the dispute, we successfully guided the family to a comprehensive settlement agreement that was subsequently formalized through proper legal documentation. This approach saved the family years of potential litigation, preserved relationships, and established clear property rights for all parties involved.
    `,
    keyLearnings: [
      "Early intervention in family property disputes can prevent escalation and entrenchment of positions",
      "Combining legal expertise with mediation skills yields optimal outcomes in family disputes",
      "Thorough documentation and historical research are essential in complex property cases",
      "Creative legal solutions can address both legal rights and emotional needs",
    ],
  },
  {
    id: "corporate-restructuring",
    title: "Navigating Corporate Restructuring During Acquisition",
    category: "Corporate Law",
    date: "May 23, 2023",
    shortDescription: "Helping a mid-sized technology company restructure during a complex acquisition process.",
    image: "/placeholder.svg?height=250&width=500",
    challenges: [
      "Complex intellectual property rights assessment",
      "Employee retention and benefit transition issues",
      "International compliance requirements",
      "Shareholder disputes regarding valuation",
    ],
    approach: [
      "Comprehensive IP audit and valuation",
      "Development of employee transition plan with legal safeguards",
      "Multi-jurisdictional compliance strategy",
      "Mediated shareholder negotiations with fair valuation methods",
    ],
    results: [
      "Successful acquisition with 15% higher valuation than initial offer",
      "98% employee retention through legal protections",
      "Zero compliance issues post-acquisition",
      "Unanimous shareholder approval of final terms",
    ],
    testimonial: {
      quote:
        "The legal expertise provided during our company's acquisition was exceptional. The team's strategic approach to our IP assets and employee concerns made a significant difference in the final outcome.",
      author: "Priya Mehta, CEO, TechInnovate Solutions",
    },
    fullDescription: `
      This case involved a mid-sized technology company with operations in India and Southeast Asia that was being acquired by a multinational corporation. The client faced multiple challenges related to intellectual property rights, employee transitions, regulatory compliance across jurisdictions, and shareholder disagreements over valuation.

      The company's primary assets were its proprietary software platforms and algorithms, which had not been fully documented or protected. Additionally, key employees held significant institutional knowledge without adequate contractual protections. International operations introduced complex compliance requirements, and the diverse shareholder base had conflicting priorities.

      Our approach began with a comprehensive intellectual property audit to identify, document, and properly value all intangible assets. This process revealed several previously undervalued innovations and helped establish a stronger negotiating position. We implemented an IP protection strategy including patents, trademarks, and copyright registrations to secure these assets prior to the acquisition.

      For employee retention, we developed a structured transition plan with legal safeguards including retention agreements, non-compete provisions, and incentive structures that aligned with both the acquiring company's needs and employee interests. This included navigating complex benefit transitions and ensuring contractual consistency.

      The regulatory compliance strategy addressed the varying requirements across multiple jurisdictions, developing a phased implementation plan that minimized disruption while ensuring full compliance. This approach prevented potentially costly delays during the acquisition process.

      Perhaps most challenging was resolving shareholder disputes regarding valuation. We facilitated a mediated negotiation process, introducing independent valuation experts and creating a transparent framework for assessing the company's worth. This approach successfully aligned shareholder expectations and led to a significantly improved acquisition offer.

      The result was a successful acquisition that maximized value for all stakeholders, protected key assets, retained critical talent, and established a smooth transition process.
    `,
    keyLearnings: [
      "Proper IP auditing and protection can significantly enhance company valuation",
      "Employee retention strategies must balance legal protections with positive incentives",
      "Proactive compliance planning prevents costly delays in multi-jurisdictional transactions",
      "Structured shareholder mediation can align diverse stakeholder interests and improve outcomes",
    ],
  },
  {
    id: "divorce-settlement",
    title: "High-Net-Worth Divorce Settlement with Child Custody",
    category: "Family Law",
    date: "August 5, 2023",
    shortDescription: "A complex divorce case involving substantial assets and sensitive child custody arrangements.",
    image: "/placeholder.svg?height=250&width=500",
    challenges: [
      "High-value assets across multiple countries",
      "Complex business valuations and hidden assets",
      "Contentious child custody disagreements",
      "Tax implications of asset division",
    ],
    approach: [
      "Comprehensive asset discovery with forensic accounting",
      "Child-focused mediation with psychological support",
      "Strategic negotiation of maintenance provisions",
      "Tax-efficient settlement structure",
    ],
    results: [
      "Equitable asset division with minimal tax impact",
      "Child custody arrangement prioritizing children's welfare",
      "Structured settlement protecting long-term financial interests of both parties",
      "Amicable co-parenting agreement",
    ],
    testimonial: {
      quote:
        "In the most difficult time of my life, I found exceptional legal support that focused not just on the financial aspects but also on the emotional well-being of our children. The outcome was far better than I had hoped for.",
      author: "Anonymous Client, Mumbai",
    },
    fullDescription: `
      This case involved a high-net-worth divorce between two prominent business figures with three minor children. The marital assets included multiple residential and commercial properties in India and abroad, complex business interests, investment portfolios, and valuable personal assets. The initially contentious nature of the separation raised concerns about the children's emotional wellbeing and long-term financial security.

      Our client sought fair asset division, appropriate spousal maintenance, and a custody arrangement that would prioritize the children's welfare. The case presented numerous challenges including potential hidden assets, disputed business valuations, competing custody claims, and significant tax implications.

      Our approach combined rigorous financial investigation with compassionate family counseling. We assembled a team including forensic accountants to conduct a comprehensive asset discovery process that uncovered several previously undisclosed investments and business interests. This process established a complete picture of the marital estate, creating the foundation for fair negotiations.

      For the child custody matters, we prioritized a child-centered approach, engaging family counselors to assess and advocate for the children's needs. Rather than pursuing an adversarial custody battle, we established a mediation framework that helped both parents focus on their children's wellbeing. This process was supported by child psychology professionals who provided insights on developmental needs and stability considerations.

      The financial settlement required sophisticated tax planning to minimize transaction costs and preserve wealth for both parties and ultimately the children. We developed a phased asset transfer approach that maintained business continuity while equitably dividing value. The maintenance agreement incorporated flexibility to accommodate future changes in circumstances while providing necessary security.

      The result was a comprehensive settlement agreement that protected all parties' interests, particularly the children. The custody arrangement emphasized stability and meaningful relationships with both parents, including detailed provisions for education, healthcare, and parenting coordination. Financial outcomes provided equitable division while preserving asset value and minimizing tax impacts.
    `,
    keyLearnings: [
      "Child-centered approaches yield better outcomes in high-conflict divorces",
      "Forensic accounting is essential in cases with complex financial structures",
      "Tax planning should be integrated throughout the settlement negotiation process",
      "Structured mediation can transform adversarial proceedings into collaborative solutions",
    ],
  },
]

export default function CaseStudyPage() {
  const params = useParams()
  const router = useRouter()
  const caseId = params.id as string

  const caseStudy = caseStudies.find((study) => study.id === caseId)

  if (!caseStudy) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
        <p className="mb-8">The case study you're looking for doesn't exist or has been moved.</p>
        <Link href="/case-studies">
          <Button className="bg-primary hover:bg-primary/90">Return to Case Studies</Button>
        </Link>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-8 flex items-center text-primary hover:bg-primary/5"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
        </Button>

        <div className="max-w-4xl mx-auto">
          <MotionWrapper type="slideDown">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                  {caseStudy.category}
                </span>
                <div className="flex items-center text-sm text-slate-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {caseStudy.date}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h1>
              <p className="text-lg text-slate-600">{caseStudy.shortDescription}</p>
            </div>
          </MotionWrapper>

          <div className="mb-12">
            <img
              src={caseStudy.image || "/placeholder.svg"}
              alt={caseStudy.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="whitespace-pre-line">{caseStudy.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg flex items-center mb-4">
                  <BadgeInfo className="h-5 w-5 mr-2 text-primary" /> Challenges
                </h3>
                <ul className="space-y-2">
                  {caseStudy.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg flex items-center mb-4">
                  <BadgeInfo className="h-5 w-5 mr-2 text-primary" /> Our Approach
                </h3>
                <ul className="space-y-2">
                  {caseStudy.approach.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg flex items-center mb-4">
                  <ThumbsUp className="h-5 w-5 mr-2 text-primary" /> Results
                </h3>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h3 className="font-bold text-xl mb-4">Key Learnings</h3>
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <ul className="space-y-3">
                {caseStudy.keyLearnings?.map((learning, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-bold text-xl mb-4">Client Testimonial</h3>
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
              <Quote className="h-8 w-8 text-primary opacity-25 mb-4" />
              <p className="text-lg italic mb-4">{caseStudy.testimonial.quote}</p>
              <p className="font-semibold">— {caseStudy.testimonial.author}</p>
            </div>
          </div>

          <div className="text-center bg-primary/5 rounded-lg p-8 border border-primary/20">
            <h3 className="font-bold text-xl mb-3">Facing a Similar Challenge?</h3>
            <p className="text-lg text-slate-600 mb-6">
              Our team of experienced legal professionals is ready to help you find the right solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/client/find-lawyer">
                <Button className="bg-primary hover:bg-primary/90">Find a Lawyer</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
