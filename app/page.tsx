"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Scale, Shield, MessageSquare, Phone, Mail, MapPin, Check } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector("h1")
      const heroText = heroRef.current.querySelector("p")
      const heroButtons = heroRef.current.querySelectorAll("a")

      gsap.fromTo(heroTitle, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(heroText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" })

      gsap.fromTo(
        heroButtons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.2, ease: "power3.out" },
      )
    }

    // Features section animations
    if (featuresRef.current) {
      const featureTitle = featuresRef.current.querySelector("h2")
      const featureItems = featuresRef.current.querySelectorAll(".feature-item")

      gsap.fromTo(
        featureTitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: featureTitle,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        featureItems,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
          },
        },
      )
    }

    // About section animations
    if (aboutRef.current) {
      const aboutTitle = aboutRef.current.querySelector("h2")
      const aboutContent = aboutRef.current.querySelector(".about-content")

      gsap.fromTo(
        aboutTitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: aboutTitle,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        aboutContent,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutContent,
            start: "top 80%",
          },
        },
      )
    }

    // CTA section animations
    if (ctaRef.current) {
      const ctaTitle = ctaRef.current.querySelector("h2")
      const ctaText = ctaRef.current.querySelector("p")
      const ctaButtons = ctaRef.current.querySelectorAll("a")

      gsap.fromTo(
        ctaTitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaTitle,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ctaText,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: ctaText,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ctaButtons,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.4,
          scrollTrigger: {
            trigger: ctaButtons,
            start: "top 85%",
          },
        },
      )
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Removed the pt-20 to fix the gap */}
      <section ref={heroRef} className="relative bg-gradient-to-b from-white to-sky-50 text-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Connect with <span className="animated-text">Legal Professionals</span> Instantly
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                LegalSathi bridges the gap between clients seeking legal assistance and lawyers offering their
                expertise. Get legal help, simplified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/client/find-lawyer">
                  <AnimatedButton size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Find a Lawyer <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
                <Link href="/register?role=lawyer">
                  <AnimatedButton size="lg" variant="outline" className="border-primary text-primary hover:bg-sky-50">
                    Join as a Lawyer
                  </AnimatedButton>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-lg shadow-lg overflow-hidden bg-white p-2">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Legal professionals"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How <span className="animated-text-subtle">LegalSathi</span> Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="feature-item flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Your Legal Case</h3>
              <p className="text-gray-600">
                Describe your legal issue and requirements to find the perfect legal professional.
              </p>
            </div>

            <div className="feature-item flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Lawyers</h3>
              <p className="text-gray-600">
                Browse profiles, reviews, and expertise to find the right lawyer for your needs.
              </p>
            </div>

            <div className="feature-item flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborate Seamlessly</h3>
              <p className="text-gray-600">
                Chat, video call, and share documents securely with your legal professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            About <span className="animated-text-subtle">LegalSathi</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center about-content">
            <div>
              <div className="relative rounded-lg shadow-lg overflow-hidden bg-white p-2">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Founder"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-lg"></div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Story</h3>
              <p className="text-gray-600 mb-6">
                LegalSathi was founded by Harsh Kumar with a vision to revolutionize the legal industry in India by
                making legal services more accessible, transparent, and efficient through technology.
              </p>

              <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
              <p className="text-gray-600 mb-6">
                To bridge the gap between clients seeking legal assistance and lawyers offering their expertise,
                creating a seamless platform that simplifies the legal process for everyone.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Accessibility:</span> Making legal help available to everyone,
                    regardless of location or background.
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Technology-Driven:</span> Leveraging AI and modern tech to
                    streamline legal processes.
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Quality Service:</span> Connecting clients with verified,
                    experienced legal professionals.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Founder & CEO</h4>
                <p className="text-gray-600 font-semibold">Harsh Kumar</p>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 6261345283</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>harshku612810@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Jabalpur, Madhya Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of clients and lawyers already using LegalSathi to connect and collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=client">
                <AnimatedButton size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Sign Up as Client
                </AnimatedButton>
              </Link>
              <Link href="/register?role=lawyer">
                <AnimatedButton size="lg" variant="outline" className="border-primary text-primary hover:bg-sky-50">
                  Register as Lawyer
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
