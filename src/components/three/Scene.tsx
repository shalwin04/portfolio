"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Character from "./Character";
import AgentOrbs from "./AgentOrbs";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useCharacterBehavior } from "@/hooks/useCharacterBehavior";

interface SceneProps {
  reducedMotion: boolean;
}

export default function Scene({ reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const scrollProgress = useScrollProgress();
  const characterState = useCharacterBehavior(scrollProgress);

  // Minimal camera movement - keep character in view
  useFrame(() => {
    if (reducedMotion) return;

    // Very subtle camera movement
    const targetY = -scrollProgress * 0.5;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting - Night City style */}
      <ambientLight intensity={0.15} color="#1a1025" />

      {/* Main directional light - slightly purple */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        color="#f4d5fd"
      />

      {/* Neon pink accent light */}
      <pointLight
        position={[-4, 2, 3]}
        intensity={1.2}
        color="#ff2a6d"
        distance={15}
        decay={2}
      />

      {/* Cyan accent light */}
      <pointLight
        position={[4, -1, 2]}
        intensity={0.8}
        color="#00f0ff"
        distance={12}
        decay={2}
      />

      {/* Purple ambient */}
      <pointLight
        position={[0, 3, -5]}
        intensity={0.5}
        color="#9d4edd"
        distance={20}
        decay={2}
      />

      {/* Yellow highlight */}
      <pointLight
        position={[2, 0, 4]}
        intensity={0.3}
        color="#f8e602"
        distance={8}
        decay={2}
      />

      {/* Clean dark background - no stars or grid */}

      {/* Character */}
      <Character state={characterState} reducedMotion={reducedMotion} />

      {/* Agent orbs disabled for cleaner look */}
      {/* <AgentOrbs scrollProgress={scrollProgress} reducedMotion={reducedMotion} /> */}

    </group>
  );
}
