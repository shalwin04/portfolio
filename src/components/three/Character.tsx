"use client";

import { useRef, useMemo, Suspense, useEffect, Component, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { CharacterState } from "@/hooks/useCharacterBehavior";

interface CharacterProps {
  state: CharacterState;
  reducedMotion: boolean;
}

// Error boundary for catching model load failures
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Try to load a GLB model if available, otherwise use geometric fallback
function CyberpunkModel({ state, reducedMotion }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);

  // Target positions based on state - centered and visible throughout
  const targetPosition = useMemo(() => {
    if (state.mode === "hero") {
      // Lower position in hero section
      return new THREE.Vector3(0, -1.5, 0);
    }
    // Slightly higher when scrolled
    return new THREE.Vector3(0, -0.5, 0);
  }, [state.mode]);

  // Scale - bigger in hero, smaller when docked but still visible
  const targetScale = state.mode === "docked" ? 2 : 3;

  // Calculate zoom based on scroll progress (subtle zoom as you scroll)
  const scrollZoom = 1 + state.scrollProgress * 0.3;

  useFrame((frameState) => {
    if (!groupRef.current) return;

    // Smooth position transition
    groupRef.current.position.lerp(targetPosition, 0.05);

    // Smooth scale transition with scroll zoom
    const currentScale = groupRef.current.scale.x;
    const finalScale = targetScale * scrollZoom;
    const newScale = THREE.MathUtils.lerp(currentScale, finalScale, 0.05);
    groupRef.current.scale.setScalar(newScale);

    // Rotation based on scroll - rotate as user scrolls
    if (!reducedMotion) {
      // Continuous rotation based on scroll progress
      const scrollRotation = state.scrollProgress * Math.PI * 2; // Full rotation over scroll

      // Add subtle idle rotation
      const idleRotation = Math.sin(frameState.clock.elapsedTime * 0.5) * 0.1;

      // Combine with look direction
      const targetRotY = scrollRotation + idleRotation + state.lookDirection.x * 0.2;

      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, targetRotY, 0.03);
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.5}
      rotationIntensity={reducedMotion ? 0 : 0.15}
      floatIntensity={reducedMotion ? 0 : 0.4}
    >
      <group ref={groupRef}>
        {/* Always try to load the model, with fallback */}
        <ModelErrorBoundary fallback={<GeometricCharacter />}>
          <Suspense fallback={<GeometricCharacter />}>
            <LoadedModel />
          </Suspense>
        </ModelErrorBoundary>
      </group>
    </Float>
  );
}

// Load the GLB model from public folder
function LoadedModel() {
  const { scene } = useGLTF("/models/cyberpunk-character.glb");

  // Clone and process the scene
  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Calculate scale to make model roughly 2 units tall
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;

    clone.scale.setScalar(scale);

    // Recalculate center after scaling
    const newBox = new THREE.Box3().setFromObject(clone);
    const newCenter = newBox.getCenter(new THREE.Vector3());

    // Center the model
    clone.position.sub(newCenter);
    clone.position.y += 0.5; // Lift slightly off ground

    // Ensure materials render correctly
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.side = THREE.DoubleSide;
              mat.needsUpdate = true;
            });
          } else {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
          }
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    console.log("Model loaded - size:", size, "scale applied:", scale);

    return clone;
  }, [scene]);

  return <primitive object={clonedScene} />;
}

// Geometric fallback character with Edgerunners styling
function GeometricCharacter() {
  const headRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Edgerunner color materials
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0a12",
        metalness: 0.95,
        roughness: 0.2,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1020",
        metalness: 0.9,
        roughness: 0.3,
      }),
    []
  );

  const pinkGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff2a6d",
        emissive: "#ff2a6d",
        emissiveIntensity: 1,
        metalness: 0.5,
        roughness: 0.2,
      }),
    []
  );

  const cyanGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f0ff",
        emissive: "#00f0ff",
        emissiveIntensity: 1,
        metalness: 0.5,
        roughness: 0.2,
      }),
    []
  );

  const yellowGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f8e602",
        emissive: "#f8e602",
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      }),
    []
  );

  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;

    if (headRef.current) {
      // Subtle breathing animation
      headRef.current.position.y = 1.2 + Math.sin(timeRef.current * 2) * 0.02;
    }
  });

  return (
    <group>
      {/* Head */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        {/* Main head - more angular */}
        <mesh>
          <boxGeometry args={[0.75, 0.7, 0.65]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>

        {/* Visor - Pink glow */}
        <mesh position={[0, 0.05, 0.34]}>
          <boxGeometry args={[0.7, 0.18, 0.04]} />
          <primitive object={pinkGlow} attach="material" />
        </mesh>

        {/* Eyes - Cyan */}
        <mesh position={[-0.15, 0.05, 0.35]}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
          <primitive object={cyanGlow} attach="material" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.35]}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
          <primitive object={cyanGlow} attach="material" />
        </mesh>

        {/* Yellow side accents */}
        <mesh position={[-0.38, 0.1, 0.15]}>
          <boxGeometry args={[0.02, 0.25, 0.25]} />
          <primitive object={yellowGlow} attach="material" />
        </mesh>
        <mesh position={[0.38, 0.1, 0.15]}>
          <boxGeometry args={[0.02, 0.25, 0.25]} />
          <primitive object={yellowGlow} attach="material" />
        </mesh>

        {/* Antenna */}
        <mesh position={[0.25, 0.42, -0.1]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[0.25, 0.58, -0.1]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <primitive object={pinkGlow} attach="material" />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.9, 0.8, 0.5]} />
        <primitive object={bodyMaterial} attach="material" />
      </mesh>

      {/* Chest panel */}
      <mesh position={[0, 0.35, 0.26]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        <primitive object={accentMaterial} attach="material" />
      </mesh>

      {/* Core light */}
      <mesh position={[0, 0.4, 0.28]}>
        <circleGeometry args={[0.08, 16]} />
        <primitive object={pinkGlow} attach="material" />
      </mesh>

      {/* Arms */}
      <group position={[-0.55, 0.35, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.04, 0.45, 0.02]} />
          <primitive object={cyanGlow} attach="material" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.12, 0.28, 0.12]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
      </group>

      <group position={[0.55, 0.35, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.04, 0.45, 0.02]} />
          <primitive object={cyanGlow} attach="material" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.12, 0.28, 0.12]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
      </group>

      {/* Lower body */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.7, 0.4, 0.4]} />
        <primitive object={bodyMaterial} attach="material" />
      </mesh>

      {/* Legs */}
      <group position={[-0.2, -0.65, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[0.11, 0, 0]}>
          <boxGeometry args={[0.02, 0.35, 0.08]} />
          <primitive object={pinkGlow} attach="material" />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[0.22, 0.25, 0.25]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
      </group>

      <group position={[0.2, -0.65, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.11, 0, 0]}>
          <boxGeometry args={[0.02, 0.35, 0.08]} />
          <primitive object={pinkGlow} attach="material" />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[0.22, 0.25, 0.25]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
      </group>

      {/* Ground glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
        <ringGeometry args={[1.2, 1.3, 32]} />
        <meshBasicMaterial
          color="#ff2a6d"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function Character(props: CharacterProps) {
  return <CyberpunkModel {...props} />;
}

// Preload model if it exists
try {
  useGLTF.preload("/models/cyberpunk-character.glb");
} catch {
  // Model doesn't exist yet, that's fine
}
