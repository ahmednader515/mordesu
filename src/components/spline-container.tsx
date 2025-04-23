"use client";

import { SplineScene } from "./spline-scene";

interface SplineContainerProps {
  sceneUrl: string;
  className?: string;
}

export function SplineContainer({ sceneUrl, className }: SplineContainerProps) {
  return (
    <>
      <SplineScene sceneUrl={sceneUrl} className={className} />
      <style jsx global>{`
        .spline-watermark {
          display: none !important;
        }
      `}</style>
    </>
  );
} 