"use client";

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "./spline-scene";

interface SplineContainerProps {
  sceneUrl?: string;
  className?: string;
  aspectRatio?: number;
  fullHeight?: boolean;
}

export function SplineContainer({ 
  sceneUrl, 
  className = "", 
  aspectRatio = 16/9,
  fullHeight = false
}: SplineContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = fullHeight ? window.innerHeight : width / aspectRatio;
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [aspectRatio, fullHeight]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        rootMargin: '200px 0px', // Start loading when within 200px of viewport
        threshold: 0.1 // Trigger when at least 10% of the element is visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: '100%',
        height: fullHeight ? '100vh' : (dimensions.height > 0 ? `${dimensions.height}px` : 'auto'),
        minHeight: fullHeight ? '100vh' : '300px',
        maxHeight: fullHeight ? 'none' : '80vh'
      }}
    >
      {isVisible && (
        <SplineScene 
          sceneUrl={sceneUrl} 
          className="absolute inset-0 w-full h-full"
        />
      )}
      <style jsx global>{`
        .spline-watermark {
          display: none !important;
        }
        
        /* Optimize canvas rendering on mobile */
        @media (max-width: 768px) {
          canvas {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }
      `}</style>
    </div>
  );
} 