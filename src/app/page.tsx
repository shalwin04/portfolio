"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import ProfessionalProjects from "@/components/sections/ProfessionalProjects";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Personal from "@/components/sections/Personal";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import ChatButton from "@/components/ui/ChatButton";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Lazy load 3D canvas to not block initial paint
const CharacterCanvas = dynamic(
  () => import("@/components/three/CharacterCanvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  return (
    <>
      {/* 3D Canvas layer */}
      <CharacterCanvas />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Sticky navigation (appears after scroll) */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <ProfessionalProjects />
        <Projects />
        <Education />
        <Personal />
        <Contact />
      </main>

      {/* Chat agent */}
      <ChatButton />
    </>
  );
}
