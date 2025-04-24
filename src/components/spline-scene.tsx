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

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const app = new Application(canvasRef.current, {
      // Use manual rendering mode for better performance
      renderMode: isMobile ? 'manual' : 'auto'
    })
    
    appRef.current = app

    app.load(sceneUrl).catch((error: Error) => {
      console.error("Error loading Spline scene:", error)
    })

    return () => {
      app.dispose()
    }
  }, [sceneUrl, isMobile])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        transform: isMobile ? 'scale(0.75)' : 'none',
        transformOrigin: 'center center',
      }}
    />
  )
} 