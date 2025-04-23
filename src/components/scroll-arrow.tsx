"use client"

import { useEffect, useState } from "react"

export function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Check if we're in the hero section (top of page)
      if (window.pageYOffset < 100) {
        if (!isVisible && !isFading) {
          setIsVisible(true)
        }
      } else {
        // If we're not in the hero section and the arrow is visible, start fading it out
        if (isVisible && !isFading) {
          setIsFading(true)
          setTimeout(() => {
            setIsVisible(false)
            setIsFading(false)
          }, 500) // Match this with the CSS transition duration
        }
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [isVisible, isFading])

  const scrollToSection = () => {
    // Start fading out
    setIsFading(true)
    
    // Scroll down to the featured games section
    const nextSection = document.getElementById('featured-games')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Hide the arrow after the fade animation completes
    setTimeout(() => {
      setIsVisible(false)
      setIsFading(false)
    }, 500)
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 p-3 text-white shadow-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-700 hover:scale-110 hover:shadow-xl border border-gray-700 ${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      aria-label="Scroll to featured games"
    >
      <svg
        className={`h-6 w-6 ${
          isHovered ? "animate-bounce-spring" : "animate-shake"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
} 