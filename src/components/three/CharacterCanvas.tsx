"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Scene from "./Scene";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CharacterCanvas() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Delay mounting to not block LCP
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="canvas-container">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={prefersReducedMotion} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
