"use client"

import { useEffect, useRef, useState } from "react"
import { Application } from "@splinetool/runtime"

interface SplineSceneProps {
  sceneUrl?: string
  className?: string
}

export function SplineScene({ sceneUrl = "https://prod.spline.design/vos3y9G6NzsOGS4h/scene.splinecode", className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      // Use a more reliable mobile detection method
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      
      // Check for low-end devices
      const isLowEnd = isMobileDevice && (
        navigator.hardwareConcurrency <= 4
      )
      setIsLowEndDevice(isLowEnd)
      
      console.log("Device detection:", { isMobileDevice, isLowEnd, userAgent: navigator.userAgent })
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize Spline
  useEffect(() => {
    if (!canvasRef.current) return

    // Dispose of any existing app
    if (appRef.current) {
      appRef.current.dispose()
      appRef.current = null
    }

    // Show loading state
    setIsLoaded(false)
    setHasError(false)

    try {
      console.log("Initializing Spline app", { isMobile, isLowEndDevice })
      
      const app = new Application(canvasRef.current)
      appRef.current = app

      app.load(sceneUrl)
        .then(() => {
          console.log("Spline scene loaded successfully")
          setIsLoaded(true)
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
  }, [sceneUrl])

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
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
          transform: isLowEndDevice 
            ? 'scale(0.5)' 
            : isMobile 
              ? 'scale(1)'
              : 'none',
          transformOrigin: 'center center',
          imageRendering: isLowEndDevice ? 'pixelated' : 'auto',
          display: isLoaded && !hasError ? 'block' : 'none', // Use display instead of visibility
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  )
} 