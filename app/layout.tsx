import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AnimatedNavbar } from "@/components/animated-navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedBackground } from "@/components/background/animated-background"
import { LiveChat } from "@/components/live-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LegalSathi - Connect with Legal Professionals",
  description: "A legal-tech platform connecting clients with lawyers for seamless legal assistance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen bg-white">
            <AnimatedBackground />
            <AnimatedNavbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
            <LiveChat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
