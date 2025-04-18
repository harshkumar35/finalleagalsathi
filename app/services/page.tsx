import Link from "next/link"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Gavel, Scale, Users, FileText, MessageSquare, Video, BookOpen, Bot, Shield, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="relative">
        {/* Hero Section */}
        <div className="relative bg-primary/90 text-white py-20">
          <div className="container mx-auto px-4">
            <MotionWrapper type="slideDown" className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Our Legal Services</h1>
              <p className="text-xl mb-8">
                LegalSathi offers a comprehensive range of legal services to meet your needs. Our technology-powered
                platform connects you with top legal professionals and innovative solutions.
              </p>
            </MotionWrapper>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <MotionWrapper className="mb-16 text-center">
              <h2 className="text-3xl font-bold mb-4">How LegalSathi Works</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our platform bridges the gap between clients and legal professionals, providing efficient, accessible,
                and technology-enhanced legal services.
              </p>
            </MotionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <AnimatedCard className="text-center p-6">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect</h3>
                <p className="text-slate-600">
                  Find the right legal professional for your specific needs from our network of verified lawyers.
                </p>
              </AnimatedCard>

              <AnimatedCard className="text-center p-6">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Collaborate</h3>
                <p className="text-slate-600">
                  Communicate, share documents, and work together seamlessly through our secure platform.
                </p>
              </AnimatedCard>

              <AnimatedCard className="text-center p-6">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resolve</h3>
                <p className="text-slate-600">
                  Get expert legal assistance to resolve your issues efficiently and effectively.
                </p>
              </AnimatedCard>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <AnimatedCard className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-3">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Legal Consultation</CardTitle>
                  </div>
                  <CardDescription>Get expert legal advice from qualified professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>One-on-one consultations with experienced lawyers</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Case evaluation and legal strategy development</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Clear explanation of your legal options</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/client/find-lawyer">
                    <Button className="bg-primary hover:bg-primary/90">Find a Lawyer</Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>

              <AnimatedCard className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Document Generation</CardTitle>
                  </div>
                  <CardDescription>Create legal documents quickly and accurately</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Customizable legal document templates</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Generate agreements, contracts, and legal forms</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Download in multiple formats (PDF, Word)</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/lawyer/documents">
                    <Button className="bg-primary hover:bg-primary/90">Generate Documents</Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>

              <AnimatedCard className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-3">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>AI Legal Assistant</CardTitle>
                  </div>
                  <CardDescription>Get instant answers to common legal questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>24/7 access to AI-powered legal guidance</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Research legal topics and understand basics</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Get recommendations for your specific situation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/client/ai-assistant">
                    <Button className="bg-primary hover:bg-primary/90">Try AI Assistant</Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>

              <AnimatedCard className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-3">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Virtual Consultations</CardTitle>
                  </div>
                  <CardDescription>Meet with lawyers remotely via secure video calls</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Secure, end-to-end encrypted video meetings</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Document sharing and collaborative review</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Schedule consultations at your convenience</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/client/video-calls">
                    <Button className="bg-primary hover:bg-primary/90">Schedule a Call</Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>

              <AnimatedCard className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-3">
                      <Gavel className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Case Management</CardTitle>
                  </div>
                  <CardDescription>Track and manage your legal cases in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Centralized case tracking and management</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Document organization and sharing</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Case timeline and milestone tracking</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/client/my-cases">
                    <Button className="bg-primary hover:bg-primary/90">Manage Cases</Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>

              <AnimatedCard className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-3">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Legal Resources</CardTitle>
                  </div>
                  <CardDescription>Access helpful legal articles, guides, and news</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Expert-written legal articles and guides</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up-to-date legal news and developments</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Case studies and practical examples</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/blogs">
                    <Button className="bg-primary hover:bg-primary/90">Browse Resources</Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>
            </div>

            <div className="bg-primary/5 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Join thousands of clients and lawyers already using LegalSathi to connect and collaborate on legal
                matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register?role=client">
                  <Button className="bg-primary hover:bg-primary/90">Sign Up as Client</Button>
                </Link>
                <Link href="/register?role=lawyer">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Register as Lawyer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
