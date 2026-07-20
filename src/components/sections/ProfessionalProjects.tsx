"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp } from "@/components/ui/AnimatedText";

interface ProfessionalProject {
  id: string;
  title: string;
  client: string;
  role: string;
  description: string;
  accent: string;
  tech: string[];
  features: string[];
  isConfidential?: boolean;
}

const professionalProjects: ProfessionalProject[] = [
  {
    id: "gsk-agentic",
    title: "AGENTIC AI PLATFORM",
    client: "Fortune 500 Pharma Company",
    role: "Generative AI Engineer",
    description:
      "Built Agentic AI platforms for bio-statistics domain. Natural language queries with autonomous task execution, from query assistance to application development, deployment, and CI/CD pipeline execution.",
    accent: "#00e5ff",
    tech: ["LangGraphJS", "MCP Servers", "Node.js", "TypeScript", "Cloud Native"],
    features: [
      "Natural language task execution",
      "Multi-agent orchestration",
      "CI/CD automation",
      "Enterprise MCP integration",
    ],
    isConfidential: true,
  },
  {
    id: "ai-sales-assistant",
    title: "AI SALES ASSISTANT",
    client: "Internal Engagement",
    role: "Associate Software Engineer",
    description:
      "AI-driven sales workflow automation supporting sales reps across multiple stages. Sales call preparation, real-time assistance, RFP response generation, and automated PowerPoint presentation creation.",
    accent: "#9d4edd",
    tech: ["Generative AI", "LangChain", "React", "Node.js", "Agentic Systems"],
    features: [
      "Sales call preparation",
      "Real-time call assistance",
      "RFP response generation",
      "Auto PowerPoint creation",
    ],
    isConfidential: true,
  },
  {
    id: "pcsat-platform",
    title: "PCSAT PLATFORM",
    client: "Internal Engagement",
    role: "Associate Software Engineer",
    description:
      "AI-powered customer satisfaction survey portal with intelligent feedback analysis. Extracts actionable insights and automates sentiment understanding using Generative AI techniques.",
    accent: "#4bff21",
    tech: ["Generative AI", "Sentiment Analysis", "React", "Node.js", "Analytics"],
    features: [
      "Customer feedback analysis",
      "Sentiment understanding",
      "Actionable insights extraction",
      "Data-driven decision support",
    ],
    isConfidential: true,
  },
];

function ProjectCard({ project, index, isInView }: { project: ProfessionalProject; index: number; isInView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group"
    >
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 py-8 sm:py-12 border-b border-cream/10">
        {/* Left - Title and client */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p
              className="font-mono text-[10px] sm:text-xs uppercase tracking-widest"
              style={{ color: project.accent }}
            >
              {project.client}
            </p>
            {project.isConfidential && (
              <span className="px-2 py-0.5 text-[8px] font-mono uppercase bg-cream/10 text-cream/40 rounded">
                NDA
              </span>
            )}
          </div>
          <h3 className="display-large text-cream text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 group-hover:text-outline-pink transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-cream/40 text-xs sm:text-sm font-mono">
            Role: {project.role}
          </p>
        </div>

        {/* Right - Details */}
        <div className="space-y-4 sm:space-y-6">
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            {project.features.map((feature) => (
              <li key={feature} className="text-cream/50 text-xs sm:text-sm flex items-center gap-2">
                <span style={{ color: project.accent }}>—</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono rounded"
                style={{
                  backgroundColor: `${project.accent}10`,
                  color: project.accent,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProfessionalProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="professional-projects" ref={ref} className="section bg-transparent relative overflow-hidden">
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        03
      </motion.div>

      <div className="w-full">
        {/* Section header */}
        <div className="mb-10 sm:mb-16">
          <h2 className="display-huge text-cream text-[14vw] sm:text-[12vw] md:text-[8vw] lg:text-[5vw] leading-[0.85] mb-3 sm:mb-4">
            <AnimatedLetters text="PROFESSIONAL" delay={0} />
            <br />
            <span className="text-outline">
              <AnimatedLetters text="WORK" delay={0.2} />
            </span>
          </h2>
          <FadeUp delay={0.4}>
            <p className="font-accent italic text-cream/50 text-base sm:text-lg">
              Enterprise solutions @ Cprime
            </p>
          </FadeUp>
        </div>

        {/* Projects list */}
        <div>
          {professionalProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
