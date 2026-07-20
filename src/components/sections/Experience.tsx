"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedText";

const experiences = [
  {
    title: "Generative AI Engineer",
    company: "Cprime, Inc.",
    client: "Fortune 500 Pharma Company",
    period: "Aug 2025 - Present",
    highlights: [
      "Building Agentic AI platforms for bio-statistics domain",
      "Natural language queries with autonomous task execution",
      "MCP servers for scalable agent orchestration",
      "CI/CD pipeline automation with AI agents",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Cprime, Inc.",
    period: "Aug 2025 - Present",
    highlights: [
      "AI Sales Assistant - sales call prep, RFP generation, auto presentations",
      "PCSAT Platform - AI-powered customer satisfaction analytics",
      "Full-stack development with React, Node.js, LangGraph",
      "Enterprise GenAI solutions and multi-agent systems",
    ],
  },
];

const awards = [
  { award: "AGENTIC CI/CD", platform: "GOOGLE CLOUD x GITLAB", project: "$7,500 Winner", highlight: true },
  { award: "TABLEAU AI COPILOT", platform: "TABLEAU 2025", project: "$7,000 Winner", highlight: true },
  { award: "PARITY FLOW", platform: "GITLAB TRANSCEND", project: "Hackathon Entry" },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="section bg-transparent relative overflow-hidden">
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        02
      </motion.div>

      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24">
          {/* Left side - Large typography */}
          <div>
            <h2 className="display-huge text-cream text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5vw] leading-[0.85] mb-4 sm:mb-6">
              <AnimatedLetters text="HACKATHON" delay={0} />
              <br />
              <span className="text-outline">
                <AnimatedLetters text="WINS" delay={0.2} />
              </span>
              <br />
              <AnimatedLetters text="&" delay={0.35} />
              <br />
              <AnimatedLetters text="EXPERIENCE" delay={0.5} />
            </h2>

            <FadeUp delay={0.8}>
              <p className="font-accent italic text-cream/50 text-base sm:text-lg">
                Building & competing globally
              </p>
            </FadeUp>

            {/* Awards counter */}
            <FadeUp delay={1}>
              <div className="mt-8 sm:mt-12 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neon-yellow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1">
                  <span className="display-large text-cream text-3xl sm:text-4xl">$14.5K</span>
                  <span className="text-cream/40 text-[10px] sm:text-xs uppercase tracking-wider ml-2">
                    hackathon
                    <br />
                    winnings
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right side - Awards table */}
          <div className="lg:pt-12">
            <FadeUp delay={0.4}>
              {/* Table header */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-cream/20 text-cream/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
                <span>Award</span>
                <span>Platform</span>
                <span>Project</span>
              </div>

              {/* Table rows */}
              <StaggerContainer staggerDelay={0.1}>
                {awards.map((item) => (
                  <StaggerItem key={item.award}>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-6 border-b border-cream/10 group hover:bg-cream/5 transition-colors">
                      <span className={`text-xs sm:text-sm uppercase ${item.highlight ? 'text-neon-yellow' : 'text-cream'}`}>
                        {item.award}
                      </span>
                      <span className="text-cream/60 text-xs sm:text-sm uppercase">
                        {item.platform}
                      </span>
                      <span className="font-accent italic text-cream/80 text-xs sm:text-sm">
                        {item.project}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeUp>

            {/* Experience cards */}
            <FadeUp delay={0.8}>
              <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    className="editorial-card rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
                      <div>
                        <h3 className="text-cream text-base sm:text-lg font-medium">{exp.title}</h3>
                        <p className="text-neon-pink text-xs sm:text-sm">{exp.company}</p>
                        {"client" in exp && exp.client && (
                          <p className="text-cream/40 text-[10px] sm:text-xs font-mono mt-1">Client: {exp.client}</p>
                        )}
                      </div>
                      <span className="text-cream/40 text-[10px] sm:text-xs font-mono">{exp.period}</span>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-cream/60 text-xs sm:text-sm flex items-start gap-2">
                          <span className="text-neon-pink mt-0.5 sm:mt-1">—</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* View more button */}
            <FadeUp delay={1.4}>
              <div className="mt-6 sm:mt-8 flex justify-end">
                <a href="/resume.pdf" target="_blank" className="pill-button text-cream text-xs sm:text-sm">
                  View Resume
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
