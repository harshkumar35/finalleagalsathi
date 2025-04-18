"use client"

import Link from "next/link"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CheckCircle2, Calendar, ArrowRight } from "lucide-react"

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
  },
]

export default function CaseStudiesPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-4">Case Studies</h1>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto">
            Explore real-world examples of how LegalSathi has helped clients navigate complex legal challenges with
            innovative solutions and exceptional results.
          </p>
        </MotionWrapper>

        <Tabs defaultValue="all" className="mb-8 max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
            <TabsTrigger value="family">Family Law</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((study) => (
                <AnimatedCard key={study.id} className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                        {study.category}
                      </span>
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {study.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex-grow">
                    <CardDescription>{study.shortDescription}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/case-studies/${study.id}`}>
                      <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                        Read Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </AnimatedCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="real-estate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies
                .filter((study) => study.category === "Real Estate")
                .map((study) => (
                  <AnimatedCard key={study.id} className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                          {study.category}
                        </span>
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {study.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-grow">
                      <CardDescription>{study.shortDescription}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/case-studies/${study.id}`}>
                        <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                          Read Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </AnimatedCard>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="corporate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies
                .filter((study) => study.category === "Corporate Law")
                .map((study) => (
                  <AnimatedCard key={study.id} className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                          {study.category}
                        </span>
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {study.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-grow">
                      <CardDescription>{study.shortDescription}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/case-studies/${study.id}`}>
                        <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                          Read Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </AnimatedCard>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="family">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies
                .filter((study) => study.category === "Family Law")
                .map((study) => (
                  <AnimatedCard key={study.id} className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full">
                          {study.category}
                        </span>
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {study.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-grow">
                      <CardDescription>{study.shortDescription}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/case-studies/${study.id}`}>
                        <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                          Read Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </AnimatedCard>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="max-w-4xl mx-auto mt-16 bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">How We Approach Each Case</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Thorough Analysis</h3>
              <p className="text-slate-600">
                We conduct a comprehensive analysis of each case to understand all legal implications and possible
                approaches.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Strategic Planning</h3>
              <p className="text-slate-600">
                Our team develops tailored legal strategies that align with your specific needs and desired outcomes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Effective Execution</h3>
              <p className="text-slate-600">
                We implement legal solutions with precision and attention to detail, ensuring your interests are
                protected.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Facing a Complex Legal Challenge?</h2>
          <p className="text-lg text-slate-600 mb-6">
            Our team of expert lawyers is ready to help you navigate even the most difficult legal situations.
          </p>
          <Link href="/client/find-lawyer">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6">Consult with an Expert Today</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
