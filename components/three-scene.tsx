"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

// A simplified fallback component that uses CSS and SVG instead of Three.js
export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (containerRef.current) {
      // Animate the elements using GSAP
      gsap.fromTo(
        ".legal-icon-hammer",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.2 },
      )

      gsap.fromTo(
        ".legal-icon-scale",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.4 },
      )

      gsap.fromTo(
        ".legal-icon-book",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.6 },
      )
    }
  }, [])

  if (!isClient) {
    return <div className="w-full h-[400px] md:h-[500px] bg-slate-800"></div>
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] md:h-[500px] bg-gradient-to-b from-slate-800 to-blue-900 relative overflow-hidden rounded-lg"
    >
      {/* Gavel/Hammer */}
      <div className="legal-icon-hammer absolute left-[20%] top-[30%] transform -rotate-45">
        <div className="w-32 h-10 bg-amber-800 rounded-md"></div>
        <div className="w-6 h-32 bg-amber-700 rounded-md absolute top-8 left-12 origin-top"></div>
      </div>

      {/* Scale of Justice */}
      <div className="legal-icon-scale absolute right-[20%] top-[30%]">
        <div className="w-4 h-32 bg-blue-500 rounded-md mx-auto"></div>
        <div className="w-32 h-2 bg-blue-500 rounded-md absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        <div className="w-12 h-3 bg-blue-400 rounded-full absolute top-0 left-0 -translate-x-1/2"></div>
        <div className="w-12 h-3 bg-blue-400 rounded-full absolute top-0 right-0 translate-x-1/2"></div>
        <div className="w-16 h-4 bg-blue-600 rounded-md absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
      </div>

      {/* Law Book */}
      <div className="legal-icon-book absolute bottom-[20%] left-1/2 transform -translate-x-1/2">
        <div className="w-40 h-8 bg-blue-900 rounded-sm transform rotate-6"></div>
        <div className="w-36 h-6 bg-white rounded-sm absolute top-1 left-2 transform rotate-6"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-900 to-transparent"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 7}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
