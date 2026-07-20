"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedText";

const skills = [
  { category: "AI / Agents", items: ["LangChainJS", "LangGraphJS", "LangSmith", "RAG", "MCP Servers"] },
  { category: "Languages", items: ["TypeScript", "Python", "Java", "C"] },
  { category: "Frontend", items: ["React", "Next.js", "Figma", "Framer"] },
  { category: "Backend", items: ["Node.js", "Express", "Hono", "Bun", "Supabase", "PostgreSQL"] },
  { category: "Cloud & DevOps", items: ["AWS", "Azure", "GCP", "Docker", "Jenkins", "GitLab"] },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section bg-transparent relative overflow-hidden"
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        01
      </motion.div>

      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-start">
          {/* Left side - Large typography */}
          <div>
            <h2 className="display-huge text-cream text-[16vw] sm:text-[14vw] md:text-[10vw] lg:text-[6vw] leading-[0.85] mb-4 sm:mb-8">
              <AnimatedLetters text="HELLO." delay={0} />
              <br />
              <span className="text-outline">
                <AnimatedLetters text="I AM" delay={0.2} />
              </span>
              <br />
              <AnimatedLetters text="SHALWIN" delay={0.4} />
            </h2>

            <FadeUp delay={0.6}>
              <p className="font-accent italic text-cream/60 text-base sm:text-lg">
                Shalwin Sanju
              </p>
            </FadeUp>
          </div>

          {/* Right side - Description */}
          <div className="lg:pt-12">
            <div className="space-y-6 sm:space-y-8">
              <FadeUp delay={0.3}>
                <p className="text-cream text-base sm:text-lg md:text-xl leading-relaxed uppercase tracking-wide">
                  GENERATIVE AI ENGINEER AT CPRIME, BUILDING AGENTIC AI SOLUTIONS FOR FORTUNE 500 CLIENTS. I DESIGN MULTI-AGENT SYSTEMS, MCP SERVERS, AND RAG PIPELINES FOR ENTERPRISE.
                </p>
              </FadeUp>

              <FadeUp delay={0.5}>
                <p className="text-cream text-base sm:text-lg md:text-xl leading-relaxed uppercase tracking-wide">
                  FROM AUTONOMOUS TASK EXECUTION TO CI/CD AUTOMATION—I BUILD AI THAT UNDERSTANDS NATURAL LANGUAGE AND GETS WORK DONE.
                </p>
              </FadeUp>

              <FadeUp delay={0.7}>
                <p className="text-cream/60 text-sm sm:text-base leading-relaxed uppercase tracking-wide">
                  AND I WIN INTERNATIONAL HACKATHONS FOR FUN. $14,500 IN PRIZES. BUILDING NEVER STOPS.
                </p>
              </FadeUp>
            </div>

            {/* Signature note */}
            <FadeUp delay={0.9}>
              <div className="mt-8 sm:mt-12 flex items-center gap-4">
                <span className="font-accent italic text-cream/40 text-xs sm:text-sm">
                  Enterprise by day, hackathons by night
                </span>
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cream/20" viewBox="0 0 50 50" fill="none" stroke="currentColor">
                  <path d="M25 5 C 35 15, 45 25, 25 45 C 5 25, 15 15, 25 5" strokeWidth="1" />
                </svg>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Skills section */}
        <FadeUp delay={0.6}>
          <div className="mt-16 sm:mt-24 lg:mt-32">
            <div className="hr-gradient mb-8 sm:mb-12" />

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
              {skills.map((skill) => (
                <StaggerItem key={skill.category}>
                  <h3 className="text-cream/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3 sm:mb-4">
                    {skill.category}
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="text-cream text-xs sm:text-sm hover:text-neon-pink transition-colors cursor-default">
                        {item}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
