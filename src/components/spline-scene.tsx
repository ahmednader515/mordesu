"use client"

import { useEffect, useRef, useState } from "react"
import { Application } from "@splinetool/runtime"

interface SplineSceneProps {
  sceneUrl?: string
  className?: string
}

export function SplineScene({ sceneUrl = "https://prod.spline.design/6HNQS-T8WzExuqxK/scene.splinecode", className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      
      // Check for low-end devices
      const isLowEnd = isMobileDevice && (
        // Check for older devices or low memory
        navigator.hardwareConcurrency <= 4 || 
        // Check for low-end GPUs
        /(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini)/i.test(navigator.userAgent)
      )
      setIsLowEndDevice(isLowEnd)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      const app = new Application(canvasRef.current, {
        // Use manual rendering mode for better performance
        renderMode: isMobile ? 'manual' : 'auto'
      })
      
      appRef.current = app

      app.load(sceneUrl)
        .then(() => {
          setIsLoaded(true)
          console.log("Spline scene loaded successfully")
        })
        .catch((error: Error) => {
          console.error("Error loading Spline scene:", error)
          setHasError(true)
          setIsLoaded(true) // Set loaded to true even on error to hide loading state
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
  }, [sceneUrl, isMobile])

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
            ? 'scale(0.5)' // Much lower resolution for low-end devices
            : isMobile 
              ? 'scale(0.75)' // Medium resolution for regular mobile devices
              : 'none', // Full resolution for desktop
          transformOrigin: 'center center',
          imageRendering: isLowEndDevice ? 'pixelated' : 'auto', // Use pixelated rendering for low-end devices
          visibility: isLoaded && !hasError ? 'visible' : 'hidden', // Hide canvas until loaded or if error
          position: 'relative', // Ensure canvas is positioned correctly
          zIndex: 1, // Ensure canvas is above background but below loading/error messages
        }}
      />
    </div>
  )
} 