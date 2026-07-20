"use client";

import { useMemo } from "react";

export interface CharacterState {
  mode: "hero" | "docked";
  lookDirection: { x: number; y: number };
  activeSection: string;
  scrollProgress: number;
}

// Section scroll thresholds (approximate)
const sections = [
  { id: "hero", start: 0, end: 0.15 },
  { id: "about", start: 0.15, end: 0.3 },
  { id: "experience", start: 0.3, end: 0.45 },
  { id: "projects", start: 0.45, end: 0.7 },
  { id: "education", start: 0.7, end: 0.85 },
  { id: "contact", start: 0.85, end: 1 },
];

// Direction character should look for each section
const lookDirections: Record<string, { x: number; y: number }> = {
  hero: { x: 0, y: 0 },
  about: { x: -0.3, y: -0.1 },
  experience: { x: 0.2, y: -0.1 },
  projects: { x: -0.4, y: -0.2 },
  education: { x: 0.3, y: -0.1 },
  contact: { x: 0, y: -0.3 },
};

export function useCharacterBehavior(scrollProgress: number): CharacterState {
  return useMemo(() => {
    // Determine current section
    const currentSection = sections.find(
      (s) => scrollProgress >= s.start && scrollProgress < s.end
    );
    const activeSection = currentSection?.id || "hero";

    // Determine mode based on scroll position
    // Dock character after hero section (around 15% scroll)
    const mode = scrollProgress > 0.12 ? "docked" : "hero";

    // Get look direction for current section
    const lookDirection = lookDirections[activeSection] || { x: 0, y: 0 };

    return {
      mode,
      lookDirection,
      activeSection,
      scrollProgress,
    };
  }, [scrollProgress]);
}
