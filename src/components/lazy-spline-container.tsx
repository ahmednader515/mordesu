"use client"

import { useEffect, useState, useRef } from "react"
import { SplineContainer } from "./spline-container"

interface LazySplineContainerProps {
  sceneUrl: string
  className?: string
  fullHeight?: boolean
}

export function LazySplineContainer({ sceneUrl, className, fullHeight }: LazySplineContainerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        // Update visibility state based on intersection
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: "200px 0px", // Start loading when within 200px of viewport
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading 3D scene...</p>
          </div>
        </div>
      )}
      {isVisible && (
        <SplineContainer 
          sceneUrl={sceneUrl} 
          className={className} 
          fullHeight={fullHeight}
        />
      )}
    </div>
  )
} 