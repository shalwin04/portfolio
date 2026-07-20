"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const demos = [
  {
    id: "agentic-cicd",
    title: "AGENTIC CI/CD",
    subtitle: "Google Cloud x GitLab Hackathon",
    prize: "$7,500 WINNER",
    description: "AI-powered multi-agent CI/CD automation with natural language deployments",
    videoId: "lCwZ1eVZkLg",
    color: "#9d4edd",
    links: {
      demo: "https://git-lab-cicd-agent.vercel.app/",
      github: "https://github.com/shalwin04/GitLab-CICD-Agent",
      devpost: "https://devpost.com/software/agentic-cicd",
    },
  },
  {
    id: "tableau-copilot",
    title: "TABLEAU AI COPILOT",
    subtitle: "Tableau Hackathon 2025",
    prize: "$7,000 WINNER",
    description: "Natural language analytics with embedded Tableau visualizations",
    videoId: "n80pcvHKyI4",
    color: "#4bff21",
    links: {
      demo: "https://ai-insights-copilot.vercel.app/",
      github: "https://github.com/shalwin04/ai-insights-copilot",
      devpost: "https://devpost.com/software/tableau-ai-copilot",
    },
  },
  {
    id: "parity-flow",
    title: "PARITY FLOW",
    subtitle: "GitLab Transcend Hackathon",
    prize: "HACKATHON ENTRY",
    description: "Know the blast radius of your code changes before you push",
    videoId: "ecUysuQLp68",
    color: "#ff6b35",
    links: {
      github: "https://gitlab.com/shalwin.04/parity-flow",
    },
  },
  {
    id: "aegisops",
    title: "AEGISOPS",
    subtitle: "Multi-Agent Platform",
    description: "Security, Observability & Platform operations via Splunk MCP",
    videoId: "s7kuhtsof9k",
    color: "#ff2a6d",
    links: {
      github: "https://github.com/shalwin04/aegis-ops",
    },
  },
  {
    id: "zerolock-studio",
    title: "ZEROLOCK STUDIO",
    subtitle: "Database Testing Tool",
    description: "Aurora DSQL transaction testing with real-time telemetry",
    videoId: "f-RIbvQaVAo",
    color: "#00e5ff",
    links: {
      github: "https://github.com/shalwin04/zerolock-studio",
    },
  },
];

export default function ShowcasePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentDemo = demos[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % demos.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + demos.length) % demos.length);
  }, []);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, 15000); // Change video every 15 seconds
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentIndex, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
      if (e.key === "m") setIsMuted((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div className="fixed inset-0 bg-void overflow-hidden">
      {/* Video Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDemo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <iframe
            ref={playerRef}
            src={`https://www.youtube.com/embed/${currentDemo.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${currentDemo.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            className="absolute inset-0 w-full h-full scale-150 pointer-events-none"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/80" />
        </motion.div>
      </AnimatePresence>

      {/* Top navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6"
      >
        <Link
          href="/"
          className="text-cream/60 text-sm font-mono uppercase tracking-widest hover:text-cream transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-cream/60 hover:text-cream transition-colors p-2"
            title={isMuted ? "Unmute (M)" : "Mute (M)"}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-cream/60 hover:text-cream transition-colors p-2"
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* Project info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-40 px-6 sm:px-12 pb-8 sm:pb-12"
      >
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDemo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Prize badge */}
              {currentDemo.prize && (
                <span
                  className="inline-block px-3 py-1 text-xs font-mono uppercase rounded mb-4"
                  style={{ backgroundColor: currentDemo.color, color: "#0a0a0a" }}
                >
                  {currentDemo.prize}
                </span>
              )}

              {/* Title */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2"
                style={{ color: currentDemo.color }}
              >
                {currentDemo.title}
              </h1>

              {/* Subtitle */}
              <p className="text-cream/60 text-sm sm:text-base font-mono uppercase tracking-widest mb-4">
                {currentDemo.subtitle}
              </p>

              {/* Description */}
              <p className="text-cream text-base sm:text-lg max-w-xl mb-6">
                {currentDemo.description}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {currentDemo.links.demo && (
                  <a
                    href={currentDemo.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button text-cream text-sm"
                    style={{ borderColor: currentDemo.color }}
                  >
                    Live Demo
                  </a>
                )}
                {currentDemo.links.github && (
                  <a
                    href={currentDemo.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/60 text-sm font-mono uppercase hover:text-cream transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {currentDemo.links.devpost && (
                  <a
                    href={currentDemo.links.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/60 text-sm font-mono uppercase hover:text-cream transition-colors"
                  >
                    Devpost →
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-3 mt-8">
          {demos.map((demo, index) => (
            <button
              key={demo.id}
              onClick={() => goToIndex(index)}
              className="group relative"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8"
                    : "hover:opacity-100 opacity-40"
                }`}
                style={{
                  backgroundColor: index === currentIndex ? demo.color : "#fff",
                }}
              />
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono uppercase whitespace-nowrap bg-void/90 text-cream rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {demo.title}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        {isPlaying && (
          <div className="mt-4 h-0.5 bg-cream/10 rounded-full overflow-hidden max-w-md">
            <motion.div
              key={currentIndex}
              className="h-full rounded-full"
              style={{ backgroundColor: currentDemo.color }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 15, ease: "linear" }}
            />
          </div>
        )}
      </motion.div>

      {/* Arrow navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 p-3 text-cream/40 hover:text-cream transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 p-3 text-cream/40 hover:text-cream transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 right-6 sm:right-12 z-40 text-cream/20 text-[10px] font-mono uppercase tracking-wider hidden sm:block">
        ← → Navigate • Space Pause • M Mute
      </div>
    </div>
  );
}
