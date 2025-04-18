import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-sky-50 border-t border-sky-100 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary animated-text-subtle">Legal</span>
              <span className="text-xl font-bold text-gray-800">Sathi</span>
            </Link>
            <p className="mt-4 text-gray-600">Bridging the gap between clients and legal professionals.</p>
            <div className="mt-6 space-y-2">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/client/find-lawyer" className="text-gray-600 hover:text-primary transition-colors">
                  Find Lawyers
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client/ai-assistant" className="text-gray-600 hover:text-primary transition-colors">
                  AI Law Assistant
                </Link>
              </li>
              <li>
                <Link href="/lawyer/documents" className="text-gray-600 hover:text-primary transition-colors">
                  Document Generator
                </Link>
              </li>
              <li>
                <Link href="/client/post-case" className="text-gray-600 hover:text-primary transition-colors">
                  Post a Case
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-primary transition-colors">
                  Legal News
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-200 mt-12 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} LegalSathi. All rights reserved. Founded by{" "}
            <span className="font-semibold">Harsh Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
