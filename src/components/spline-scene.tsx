"use client"

import { useState } from 'react'
import Spline from '@splinetool/react-spline'

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = (e: any) => {
    setError(e?.message || 'Failed to load 3D scene')
    setIsLoading(false)
  }

  return (
    <div className="spline-container">
      {error ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-destructive">Failed to load 3D scene: {error}</p>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <Spline 
            scene="https://prod.spline.design/6HNQS-T8WzExuqxK/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full [filter:saturate(1.5)_contrast(1.1)]"
          />
        </>
      )}
    </div>
  )
} 