"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp } from "@/components/ui/AnimatedText";

export interface Project {
  id: string;
  title: string;
  codename: string;
  description: string;
  longDescription: string;
  accent: string;
  tech: string[];
  features: string[];
  links: {
    github?: string;
    demo?: string;
  };
  crew?: {
    name: string;
    role: string;
    color: string;
  }[];
  highlight?: string;
}

const projects: Project[] = [
  {
    id: "agentic-cicd",
    title: "AGENTIC CI/CD",
    codename: "Google Cloud x GitLab Hackathon",
    description: "AI-powered DevOps automation",
    longDescription:
      "Multi-agent platform that automates CI/CD workflows using AI. Agents analyze PRs, monitor pipelines, fix common issues, and adapt workflows dynamically. Integrates with GitLab, Jenkins, and Prometheus.",
    accent: "#9d4edd",
    tech: ["LangGraph", "Gemini 2.5", "React", "Node.js", "TypeScript", "GitLab MCP"],
    features: [
      "PR analysis & suggestions",
      "Self-healing pipelines",
      "Natural language deployments",
      "Multi-tool integrations",
    ],
    links: {
      github: "https://github.com/shalwin04/GitLab-CICD-Agent",
      demo: "https://git-lab-cicd-agent.vercel.app/"
    },
    highlight: "$7,500 WINNER",
  },
  {
    id: "tableau-copilot",
    title: "TABLEAU AI COPILOT",
    codename: "Tableau Hackathon 2025",
    description: "Natural language analytics",
    longDescription:
      "Intelligent AI assistant that transforms Tableau Cloud interaction through natural language. Semantic discovery of dashboards, embedded visualizations in chat, and multi-agent coordination.",
    accent: "#4bff21",
    tech: ["React 18", "TypeScript", "LangChain.js", "LangGraph", "Gemini Pro", "Tableau API"],
    features: [
      "Natural language discovery",
      "Embedded visualizations",
      "Multi-agent system",
      "Real-time progress tracking",
    ],
    links: {
      github: "https://github.com/shalwin04/ai-insights-copilot",
      demo: "https://ai-insights-copilot.vercel.app/"
    },
    highlight: "$7,000 WINNER",
  },
  {
    id: "parity-flow",
    title: "PARITY FLOW",
    codename: "GitLab Transcend Hackathon 2026",
    description: "Code impact analysis before push",
    longDescription:
      "Know the blast radius of your code changes BEFORE you push. Combines local AST analysis with GitLab Orbit Remote and AI-powered insights to identify downstream impacts.",
    accent: "#ff6b35",
    tech: ["TypeScript", "Tree-sitter", "GitLab API", "GitLab Duo Flow", "SQLite"],
    features: [
      "Pre-push impact analysis",
      "VS Code extension",
      "Flaky test detection",
      "Dependency graph visualization",
    ],
    links: {
      github: "https://gitlab.com/shalwin.04/parity-flow"
    },
    highlight: "HACKATHON ENTRY",
  },
  {
    id: "aegisops",
    title: "AEGISOPS",
    codename: "Multi-Agent Platform",
    description: "Security & observability operations",
    longDescription:
      "Multi-agent AI platform unifying Security, Observability, and Platform operations via Splunk's MCP Server. Four specialized agents handle different aspects of ops.",
    accent: "#ff2a6d",
    tech: ["LangGraph JS", "Gemini", "Splunk MCP", "Node.js", "React"],
    features: [
      "4-agent coordination",
      "Security monitoring",
      "Observability integration",
      "Platform operations",
    ],
    links: { github: "https://github.com/shalwin04/aegis-ops" },
    crew: [
      { name: "Healer", role: "Observability", color: "#00f0ff" },
      { name: "Sentinel", role: "Security", color: "#ff2a6d" },
      { name: "Correlator", role: "Synthesis", color: "#9d4edd" },
      { name: "Architect", role: "Platform", color: "#4bff21" },
    ],
  },
  {
    id: "zerolock-studio",
    title: "ZEROLOCK STUDIO",
    codename: "Database Testing Tool",
    description: "Aurora DSQL transaction testing",
    longDescription:
      "Transaction testing and stress-testing tool for Aurora DSQL with real-time telemetry. Helps identify transaction conflicts and performance bottlenecks.",
    accent: "#00e5ff",
    tech: ["TypeScript", "Aurora DSQL", "Node.js", "React"],
    features: [
      "Transaction stress testing",
      "Real-time telemetry",
      "Conflict detection",
      "Performance analysis",
    ],
    links: { github: "https://github.com/shalwin04/zerolock-studio" },
  },
  {
    id: "agentops-copilot",
    title: "AGENTOPS COPILOT",
    codename: "AI Observability",
    description: "Datadog monitoring for AI agents",
    longDescription:
      "Datadog-integrated observability platform for AI agent systems. Monitors reasoning quality, cost efficiency, hallucination likelihood, and failure patterns in agentic workflows.",
    accent: "#7c3aed",
    tech: ["LangGraph JS", "Gemini", "Datadog APM", "OpenTelemetry", "Node.js"],
    features: [
      "Agent lifecycle telemetry",
      "Cost per task tracking",
      "Loop detection",
      "Hallucination scoring",
    ],
    links: { github: "https://github.com/shalwin04/agentops-copilot" },
  },
  {
    id: "emowell",
    title: "EMOWELL",
    codename: "Mental Health AI",
    description: "AI wellness companion",
    longDescription:
      "Mental health application with collaborative therapy, journaling, and emergency support agents. Empathetic AI companion for emotional wellness through thoughtful conversations.",
    accent: "#f8e602",
    tech: ["React", "Node.js", "LangChain", "Supabase", "TailwindCSS"],
    features: [
      "Therapy agents",
      "Journal analysis",
      "Emergency support",
      "Privacy-first design",
    ],
    links: { github: "https://github.com/shalwin04/EmoWell-BackEnd" },
  },
  {
    id: "code-reviewer-sensei",
    title: "CODE REVIEWER SENSEI",
    codename: "Educational Tool",
    description: "AI-powered PR reviews",
    longDescription:
      "Educational PR review system using LangGraph and Google Gemini. Helps developers learn best practices through intelligent code review feedback.",
    accent: "#10b981",
    tech: ["LangGraph", "Gemini", "TypeScript", "GitHub API"],
    features: [
      "Educational feedback",
      "Best practice suggestions",
      "Learning-focused reviews",
      "GitHub integration",
    ],
    links: { github: "https://github.com/shalwin04/code-reviewer-sensei" },
  },
  {
    id: "docs-gen",
    title: "DOCS-GEN",
    codename: "Documentation Generator",
    description: "AI documentation for code repos",
    longDescription:
      "Documentation Generator for local repositories using LangChain, Gemini, and LangGraph. Analyzes code and generates detailed, high-quality API documentation with improvement suggestions.",
    accent: "#06b6d4",
    tech: ["LangChain JS", "LangGraph", "Gemini API", "Node.js", "Supabase"],
    features: [
      "Code analysis",
      "API doc generation",
      "Improvement suggestions",
      "JS/TS support",
    ],
    links: { github: "https://github.com/shalwin04/Docs-Gen" },
  },
  {
    id: "kiddo",
    title: "KIDDO",
    codename: "Chrome Extension",
    description: "Productivity companion",
    longDescription:
      "Productivity-focused Chrome extension with Focus and Chill modes. Tracks activities, measures productivity, and features a chatbot for productivity and mental health support.",
    accent: "#f59e0b",
    tech: ["React", "Chrome Extension Manifest V3", "Chrome Built-In AI APIs"],
    features: [
      "Focus & Chill modes",
      "Activity tracking",
      "Productivity metrics",
      "AI chatbot support",
    ],
    links: { github: "https://github.com/shalwin04/productivity-extension" },
  },
];

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group"
    >
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 py-8 sm:py-12 border-b border-cream/10">
        {/* Left - Title and codename */}
        <div>
          <p
            className="font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2"
            style={{ color: project.accent }}
          >
            {project.codename}
          </p>
          <h3 className="display-large text-cream text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 group-hover:text-outline-pink transition-all duration-300">
            {project.title}
          </h3>
          {project.highlight && (
            <span
              className="inline-block px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-mono uppercase rounded"
              style={{ backgroundColor: project.accent, color: "#0a0a0a" }}
            >
              {project.highlight}
            </span>
          )}

          {/* Crew visualization for AegisOps */}
          {project.crew && (
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 flex-wrap">
              {project.crew.map((member) => (
                <div key={member.name} className="text-center">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold mb-1"
                    style={{
                      backgroundColor: `${member.color}20`,
                      border: `1px solid ${member.color}`,
                      color: member.color,
                    }}
                  >
                    {member.name[0]}
                  </div>
                  <span className="text-cream/40 text-[8px] sm:text-[10px] font-mono">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Details */}
        <div className="space-y-4 sm:space-y-6">
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
            {project.longDescription}
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

          <div className="flex gap-4 pt-2 sm:pt-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 text-[10px] sm:text-xs font-mono uppercase hover:text-cream transition-colors"
              >
                Github →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs font-mono uppercase hover:opacity-80 transition-opacity"
                style={{ color: project.accent }}
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="section bg-transparent relative overflow-hidden">
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        04
      </motion.div>

      <div className="w-full">
        {/* Section header */}
        <div className="mb-10 sm:mb-16">
          <h2 className="display-huge text-cream text-[14vw] sm:text-[12vw] md:text-[8vw] lg:text-[5vw] leading-[0.85] mb-3 sm:mb-4">
            <AnimatedLetters text="HACKATHONS" delay={0} />
            <br />
            <span className="text-outline">
              <AnimatedLetters text="& SIDE PROJECTS" delay={0.2} />
            </span>
          </h2>
          <FadeUp delay={0.4}>
            <p className="font-accent italic text-cream/50 text-base sm:text-lg">
              Building for fun & glory
            </p>
          </FadeUp>
        </div>

        {/* Projects list */}
        <div>
          {projects.map((project, index) => (
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
