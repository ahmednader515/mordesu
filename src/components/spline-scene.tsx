"use client"

import { useEffect, useRef, useState } from "react"
import { Application } from "@splinetool/runtime"

interface SplineSceneProps {
  sceneUrl?: string
  className?: string
  videoUrl?: string
}

export function SplineScene({ 
  sceneUrl = "https://prod.spline.design/ek0uvHF8rgKJI-NK/scene.splinecode", 
  className,
  videoUrl = "robot.mp4"
}: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Detect mobile devices and device capabilities
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Use a more reliable mobile detection method
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      
      // Check for low-end devices based on multiple factors
      const isLowEnd = isMobileDevice && (
        navigator.hardwareConcurrency <= 4 || 
        ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
        window.innerWidth <= 375 // Small screens are likely lower-end devices
      )
      setIsLowEndDevice(isLowEnd)
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsReducedMotion(prefersReducedMotion)
      
      console.log("Device detection:", { 
        isMobileDevice, 
        isLowEnd, 
        userAgent: navigator.userAgent,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: (navigator as { deviceMemory?: number }).deviceMemory ?? 'unknown',
        prefersReducedMotion
      })
    }
    
    checkDeviceCapabilities()
    window.addEventListener('resize', checkDeviceCapabilities)
    
    return () => window.removeEventListener('resize', checkDeviceCapabilities)
  }, [])

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once visible
        }
      },
      {
        rootMargin: '200px 0px', // Start loading when within 200px of viewport
        threshold: 0.1 // Trigger when at least 10% of the element is visible
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Initialize Spline only when visible and not on mobile
  useEffect(() => {
    if (!canvasRef.current || !isVisible || isMobile) return

    // Dispose of any existing app
    if (appRef.current) {
      appRef.current.dispose()
      appRef.current = null
    }

    // Show loading state
    setIsLoaded(false)
    setHasError(false)

    try {
      console.log("Initializing Spline app", { isMobile, isLowEndDevice, isReducedMotion })
      
      const app = new Application(canvasRef.current)
      appRef.current = app

      // Apply performance optimizations
      if (isLowEndDevice) {
        // Reduce quality for low-end devices
        // Note: These are custom properties that may not exist in the current API
        // We'll use a try-catch to handle this gracefully
        try {
          // @ts-expect-error - These methods might not be in the type definitions
          app.quality = 'low'
        } catch {
          console.log("Quality setting not supported")
        }
      } else if (isMobile) {
        try {
          // @ts-expect-error - These methods might not be in the type definitions
          app.quality = 'medium'
        } catch {
          console.log("Quality setting not supported")
        }
      }

      app.load(sceneUrl)
        .then(() => {
          console.log("Spline scene loaded successfully")
          setIsLoaded(true)
          
          // Apply additional optimizations after loading
          if (isLowEndDevice || isMobile) {
            try {
              // @ts-expect-error - These methods might not be in the type definitions
              app.animationSpeed = 0.8
            } catch {
              console.log("Animation speed setting not supported")
            }
          }
          
          if (isReducedMotion) {
            try {
              // @ts-expect-error - These methods might not be in the type definitions
              app.animationSpeed = 0.5
            } catch {
              console.log("Animation speed setting not supported")
            }
          }
        })
        .catch((error: Error) => {
          console.error("Error loading Spline scene:", error)
          setHasError(true)
          setIsLoaded(true)
        })
    } catch (error) {
      console.error("Error initializing Spline app:", error)
      setHasError(true)
      setIsLoaded(true)
    }

    return () => {
      if (appRef.current) {
        appRef.current.dispose()
        appRef.current = null
      }
    }
  }, [sceneUrl, isVisible, isMobile, isLowEndDevice, isReducedMotion])

  return (
    <div 
      ref={containerRef} 
      className="relative h-full overflow-hidden"
      style={{ 
        width: '100%',
        height: '100%'
      }}
    >
      {!isLoaded && isVisible && !isMobile && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading 3D scene...</p>
          </div>
        </div>
      )}
      
      {hasError && !isMobile && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-4">
            <p className="text-red-500 font-medium">Failed to load 3D scene</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Please try refreshing the page or check your internet connection.
            </p>
          </div>
        </div>
      )}
      
      {/* 3D Model - Only show on non-mobile devices */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className={className}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: isLoaded && !hasError ? 'block' : 'none',
            transformOrigin: 'center bottom',
          }}
        />
      )}
      
      {/* Video - Only show on mobile devices */}
      {isMobile && isVisible && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
} 