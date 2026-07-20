"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeonGridProps {
  reducedMotion: boolean;
}

export default function NeonGrid({ reducedMotion }: NeonGridProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader for the neon grid effect - Edgerunners palette
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#ff2a6d") }, // Neon pink
        uColor2: { value: new THREE.Color("#9d4edd") }, // Purple
        uColor3: { value: new THREE.Color("#00f0ff") }, // Cyan
        uFogColor: { value: new THREE.Color("#0a0a0f") },
        uFogNear: { value: 5 },
        uFogFar: { value: 30 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vFogDepth;

        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vFogDepth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;

        varying vec2 vUv;
        varying float vFogDepth;

        void main() {
          // Grid pattern - tighter grid for cyberpunk feel
          vec2 grid = abs(fract(vUv * 30.0 - 0.5) - 0.5) / fwidth(vUv * 30.0);
          float line = min(grid.x, grid.y);
          float gridAlpha = 1.0 - min(line, 1.0);

          // Major grid lines
          vec2 majorGrid = abs(fract(vUv * 6.0 - 0.5) - 0.5) / fwidth(vUv * 6.0);
          float majorLine = min(majorGrid.x, majorGrid.y);
          float majorAlpha = 1.0 - min(majorLine, 1.0);

          // Combine grids
          float combinedAlpha = gridAlpha * 0.3 + majorAlpha * 0.7;

          // Add glow effect
          float glow = combinedAlpha * 0.6 + pow(combinedAlpha, 3.0) * 0.4;

          // Color gradient - pink to purple to cyan
          vec3 color = mix(uColor1, uColor2, vUv.y);
          color = mix(color, uColor3, sin(vUv.x * 3.14159) * 0.3);

          // Traveling pulse effect
          float pulse = sin(vUv.y * 20.0 - uTime * 3.0) * 0.5 + 0.5;
          float horizontalPulse = sin(vUv.x * 15.0 + uTime * 2.0) * 0.5 + 0.5;
          glow *= 0.7 + pulse * 0.2 + horizontalPulse * 0.1;

          // Apply fog
          float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);

          vec3 finalColor = mix(color * glow, uFogColor, fogFactor);
          float finalAlpha = glow * (1.0 - fogFactor * 0.9);

          gl_FragColor = vec4(finalColor, finalAlpha * 0.7);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (materialRef.current && !reducedMotion) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[0, -3, -5]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <mesh>
        <planeGeometry args={[80, 50, 1, 1]} />
        <primitive object={shaderMaterial} ref={materialRef} attach="material" />
      </mesh>

      {/* Horizon glow line */}
      <mesh position={[0, 25, 0.1]}>
        <planeGeometry args={[80, 0.1]} />
        <meshBasicMaterial color="#ff2a6d" transparent opacity={0.6} />
      </mesh>

      {/* Secondary horizon line */}
      <mesh position={[0, 24.8, 0.05]}>
        <planeGeometry args={[80, 0.3]} />
        <meshBasicMaterial color="#9d4edd" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
