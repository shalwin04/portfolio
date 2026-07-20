"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedText";

const education = {
  degree: "B.E. Computer Science and Engineering",
  school: "Loyola-ICAM College of Engineering and Technology",
  period: "2022 - 2026",
  highlights: [
    "Full-stack development focus",
    "AI & Agentic systems specialization",
    "2x International Hackathon Winner",
  ],
};

const certifications = [
  { name: "Notion Service Specialist", issuer: "Notion", year: "2025" },
  { name: "Notion Technical Specialist", issuer: "Notion", year: "2025" },
  { name: "Atlassian Accreditation", issuer: "Atlassian", year: "2025" },
  { name: "ROVO Fundamentals", issuer: "Atlassian", year: "2025" },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={ref} className="section bg-transparent relative overflow-hidden">
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        05
      </motion.div>

      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24">
          {/* Left side - Education */}
          <div>
            <h2 className="display-huge text-cream text-[12vw] sm:text-[10vw] md:text-[6vw] lg:text-[4vw] leading-[0.85] mb-8 sm:mb-12">
              <AnimatedLetters text="EDUCATION" delay={0} />
              <br />
              <span className="text-outline">
                <AnimatedLetters text="&" delay={0.2} />
              </span>
              <br />
              <AnimatedLetters text="CERTS" delay={0.3} />
            </h2>

            <FadeUp delay={0.5}>
              <div className="editorial-card rounded-lg p-4 sm:p-6">
                <h3 className="text-cream text-base sm:text-lg font-medium mb-1">
                  {education.degree}
                </h3>
                <p className="text-neon-cyan text-xs sm:text-sm mb-3 sm:mb-4">{education.school}</p>
                <p className="text-cream/40 text-[10px] sm:text-xs font-mono mb-3 sm:mb-4">{education.period}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {education.highlights.map((item, i) => (
                    <li key={i} className="text-cream/60 text-xs sm:text-sm flex items-center gap-2">
                      <span className="text-neon-pink">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          {/* Right side - Certifications */}
          <div className="lg:pt-24">
            <FadeUp delay={0.4}>
              <h3 className="text-cream/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-6 sm:mb-8">
                Certifications
              </h3>
            </FadeUp>

            <StaggerContainer staggerDelay={0.1} className="space-y-4 sm:space-y-6">
              {certifications.map((cert) => (
                <StaggerItem key={cert.name}>
                  <div className="flex items-center justify-between py-3 sm:py-4 border-b border-cream/10 hover:border-cream/20 transition-colors">
                    <div>
                      <h4 className="text-cream text-xs sm:text-sm">{cert.name}</h4>
                      <p className="text-cream/40 text-[10px] sm:text-xs font-mono">{cert.issuer}</p>
                    </div>
                    <span className="text-cream/30 text-[10px] sm:text-xs font-mono">{cert.year}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
