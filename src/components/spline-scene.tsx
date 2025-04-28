"use client"

import { useEffect, useRef, useState } from "react"
import { Application } from "@splinetool/runtime"

interface SplineSceneProps {
  sceneUrl?: string
  className?: string
}

export function SplineScene({ sceneUrl = "https://prod.spline.design/ek0uvHF8rgKJI-NK/scene.splinecode", className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Detect mobile devices and device capabilities
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Use a more reliable mobile detection method
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      
      // Check for low-end devices based on multiple factors
      const isLowEnd = isMobileDevice && (
        navigator.hardwareConcurrency <= 4 || 
        (navigator as any).deviceMemory <= 4 ||
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
        deviceMemory: (navigator as any).deviceMemory,
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

  // Initialize Spline only when visible
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return

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
          // @ts-ignore - These methods might not be in the type definitions
          app.quality = 'low'
        } catch (e) {
          console.log("Quality setting not supported")
        }
      } else if (isMobile) {
        try {
          // @ts-ignore - These methods might not be in the type definitions
          app.quality = 'medium'
        } catch (e) {
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
              // @ts-ignore - These methods might not be in the type definitions
              app.animationSpeed = 0.8
            } catch (e) {
              console.log("Animation speed setting not supported")
            }
          }
          
          if (isReducedMotion) {
            try {
              // @ts-ignore - These methods might not be in the type definitions
              app.animationSpeed = 0.5
            } catch (e) {
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
        width: '350%', 
        marginRight: '-125%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%'
      }}
    >
      {!isLoaded && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading 3D scene...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-4">
            <p className="text-red-500 font-medium">Failed to load 3D scene</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Please try refreshing the page or check your internet connection.
            </p>
          </div>
        </div>
      )}
      
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
          transform: isMobile ? 'scale(0.5)' : 'none',
          transformOrigin: 'center bottom',
        }}
      />
    </div>
  )
} 