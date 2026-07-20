"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AgentOrbsProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

interface Orb {
  name: string;
  color: string;
  position: THREE.Vector3;
  project: string;
}

// Edgerunners-themed orbs - each project has its crew
const orbs: Orb[] = [
  // AegisOps crew - like Maine's team
  { name: "Healer", color: "#00f0ff", position: new THREE.Vector3(-3, 1, -2), project: "aegisops" },
  { name: "Sentinel", color: "#ff2a6d", position: new THREE.Vector3(-2, 2, -3), project: "aegisops" },
  { name: "Correlator", color: "#9d4edd", position: new THREE.Vector3(-1, 1.5, -2.5), project: "aegisops" },
  { name: "Architect", color: "#4bff21", position: new THREE.Vector3(-2.5, 0.5, -2), project: "aegisops" },
  // Other project orbs
  { name: "CI/CD", color: "#9d4edd", position: new THREE.Vector3(3, 1, -2), project: "cicd" },
  { name: "Analytics", color: "#4bff21", position: new THREE.Vector3(2.5, 2, -3), project: "analytics" },
  { name: "EmoWell", color: "#f8e602", position: new THREE.Vector3(3.5, 0.5, -2.5), project: "emowell" },
];

// Pre-computed AegisOps orbs for connection lines
const aegisOrbs = orbs.filter((o) => o.project === "aegisops");

function Orb({
  orb,
  visible,
  reducedMotion,
}: {
  orb: Orb;
  visible: boolean;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>(null);
  const scaleRef = useRef(0);

  const color = useMemo(() => new THREE.Color(orb.color), [orb.color]);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    // Animate visibility
    const targetScale = visible ? 1 : 0;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.05);
    meshRef.current.scale.setScalar(scaleRef.current);
    glowRef.current.scale.setScalar(scaleRef.current * 1.5);

    if (reducedMotion || !visible) return;

    // Float animation
    const time = state.clock.elapsedTime;
    meshRef.current.position.y =
      orb.position.y + Math.sin(time * 2 + orb.position.x) * 0.15;

    // Rotation
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.z = Math.sin(time) * 0.15;

    // Pulse glow
    const pulse = Math.sin(time * 3) * 0.3 + 0.7;
    glowRef.current.material.opacity = pulse * 0.4;
  });

  return (
    <group position={orb.position}>
      {/* Main orb - icosahedron for that edgy cyberpunk look */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.18, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={0.7}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Inner solid core */}
      <mesh scale={0.6}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Point light */}
      {visible && (
        <pointLight
          color={orb.color}
          intensity={0.8}
          distance={4}
          decay={2}
        />
      )}
    </group>
  );
}

// Connection lines between AegisOps agents - like crew coordination
function ConnectionLines({ visible, reducedMotion }: { visible: boolean; reducedMotion: boolean }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!linesRef.current || reducedMotion) return;

    // Animate line opacity
    const targetOpacity = visible ? 0.4 : 0;
    linesRef.current.children.forEach((child) => {
      if (child instanceof THREE.Line) {
        const material = child.material as THREE.LineBasicMaterial;
        material.opacity = THREE.MathUtils.lerp(
          material.opacity,
          targetOpacity,
          0.05
        );
      }
    });

    // Pulse effect - simulating data flow
    const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.15 + 0.35;
    linesRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Line) {
        const material = child.material as THREE.LineBasicMaterial;
        material.opacity = visible ? pulse + i * 0.05 : 0;
      }
    });
  });

  // Create lines between adjacent orbs
  const lines = useMemo(() => {
    const lineGeometries: THREE.BufferGeometry[] = [];
    for (let i = 0; i < aegisOrbs.length; i++) {
      const nextIndex = (i + 1) % aegisOrbs.length;
      const points = [aegisOrbs[i].position, aegisOrbs[nextIndex].position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometries.push(geometry);
    }
    return lineGeometries;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((geometry, i) => (
        <line key={i}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial
            color="#ff2a6d"
            transparent
            opacity={0}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  );
}

export default function AgentOrbs({ scrollProgress, reducedMotion }: AgentOrbsProps) {
  // Show orbs when in projects section (roughly 40-70% scroll)
  const showAegis = scrollProgress > 0.35 && scrollProgress < 0.55;
  const showCicd = scrollProgress > 0.45 && scrollProgress < 0.6;
  const showAnalytics = scrollProgress > 0.5 && scrollProgress < 0.65;
  const showEmowell = scrollProgress > 0.55 && scrollProgress < 0.7;

  const isOrbVisible = (orb: Orb) => {
    switch (orb.project) {
      case "aegisops":
        return showAegis;
      case "cicd":
        return showCicd;
      case "analytics":
        return showAnalytics;
      case "emowell":
        return showEmowell;
      default:
        return false;
    }
  };

  return (
    <group>
      {orbs.map((orb) => (
        <Orb
          key={orb.name}
          orb={orb}
          visible={isOrbVisible(orb)}
          reducedMotion={reducedMotion}
        />
      ))}
      <ConnectionLines visible={showAegis} reducedMotion={reducedMotion} />
    </group>
  );
}
