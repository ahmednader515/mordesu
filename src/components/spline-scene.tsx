"use client"

import { useEffect, useRef } from "react"
import { Application } from "@splinetool/runtime"

interface SplineSceneProps {
  sceneUrl: string
  className?: string
}

export function SplineScene({ sceneUrl, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const app = new Application(canvasRef.current)
    appRef.current = app

    app.load(sceneUrl).catch((error: Error) => {
      console.error("Error loading Spline scene:", error)
    })

    return () => {
      app.dispose()
    }
  }, [sceneUrl])

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  )
} 