import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About <span className="animated-text">LegalSathi</span>
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              LegalSathi was founded in 2023 by Harsh Kumar with a vision to revolutionize the legal industry in India.
              Recognizing the challenges faced by both clients seeking legal assistance and lawyers looking for clients,
              Harsh created a platform that bridges this gap using technology.
            </p>
            <p className="text-gray-600 mb-6">
              Our platform aims to make legal services more accessible, transparent, and efficient for everyone. We
              believe that quality legal help should be available to all, regardless of their location or background.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-4">
                  To create a seamless connection between clients and legal professionals, making legal assistance
                  accessible, affordable, and efficient through technology.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                    <span className="text-gray-600">
                      Simplify the process of finding and connecting with qualified legal professionals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                    <span className="text-gray-600">
                      Provide a secure platform for communication and document sharing
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                    <span className="text-gray-600">
                      Leverage AI and technology to make legal processes more efficient
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-4">
                  To become India's leading legal-tech platform, transforming how legal services are accessed and
                  delivered across the country.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                    <span className="text-gray-600">Create a nationwide network of verified legal professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                    <span className="text-gray-600">
                      Develop innovative tools that simplify complex legal processes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                    <span className="text-gray-600">Build a platform that serves both urban and rural communities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Meet Our Founder</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Harsh Kumar"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2">Harsh Kumar</h3>
                <p className="text-primary font-medium mb-4">Founder & CEO</p>
                <p className="text-gray-600 mb-4">
                  Harsh Kumar is a tech entrepreneur with a passion for making legal services accessible to everyone.
                  With a background in technology and law, he founded LegalSathi to bridge the gap between legal
                  professionals and those seeking legal assistance.
                </p>
                <p className="text-gray-600 mb-6">
                  His vision is to create a platform that leverages technology to simplify legal processes, making them
                  more efficient and accessible for all Indians.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span>+91 6261345283</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span>harshku612810@gmail.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span>Jabalpur, Madhya Pradesh, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're looking for legal assistance or you're a lawyer wanting to expand your practice, LegalSathi
            is here to help you connect and collaborate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=client">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Sign Up as Client
              </Button>
            </Link>
            <Link href="/register?role=lawyer">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Register as Lawyer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
