"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedText";

const interests = [
  "AI AGENTS",
  "LANGGRAPH",
  "FULL-STACK DEV",
  "HACKATHONS",
  "MCP SERVERS",
  "DEVOPS",
  "OPEN SOURCE",
  "BUILDING PRODUCTS",
];

const socialLinks = [
  { name: "GITHUB", href: "https://github.com/shalwin04" },
  { name: "LINKEDIN", href: "https://linkedin.com/in/shalwin-sanju" },
  { name: "X", href: "https://x.com/samshalwin" },
  { name: "MEDIUM", href: "https://medium.com/@shalwinsanju" },
  { name: "EMAIL", href: "mailto:shalwinsanju.25cs@licet.ac.in" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="section bg-transparent relative overflow-hidden">
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        07
      </motion.div>

      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-start">
          {/* Left side - Large typography */}
          <div>
            <h2 className="display-huge text-cream text-[18vw] sm:text-[16vw] md:text-[12vw] lg:text-[8vw] leading-[0.85]">
              <AnimatedLetters text="LET'S" delay={0} />
              <br />
              <span className="text-outline-pink">
                <AnimatedLetters text="CONNECT" delay={0.2} />
              </span>
            </h2>
          </div>

          {/* Right side - Content */}
          <div className="lg:pt-12 space-y-8 sm:space-y-12">
            {/* Interests */}
            <FadeUp delay={0.4}>
              <p className="text-cream/60 text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6">
                I&apos;m always interested about
              </p>
              <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-2 sm:gap-3">
                {interests.map((interest) => (
                  <StaggerItem key={interest}>
                    <span className="tag-pill text-cream text-[10px] sm:text-xs">
                      {interest}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.8}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <span className="text-cream text-xs sm:text-sm uppercase tracking-wide">
                  Have a project in mind?
                </span>
                <a
                  href="mailto:shalwinsanju.25cs@licet.ac.in"
                  className="pill-button text-cream text-xs sm:text-sm w-fit"
                >
                  Contact Me
                </a>
              </div>
            </FadeUp>

            {/* Social links */}
            <FadeUp delay={1}>
              <div className="flex items-center gap-6 sm:gap-8 pt-4 sm:pt-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.name !== "EMAIL" ? "_blank" : undefined}
                    rel={link.name !== "EMAIL" ? "noopener noreferrer" : undefined}
                    className="text-cream/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest hover:text-cream transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FadeUp delay={1.2}>
        <footer className="mt-20 sm:mt-32 pt-6 sm:pt-8 border-t border-cream/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-cream/30 text-[10px] sm:text-xs font-mono text-center sm:text-left">
              Design inspired by Cyberpunk: Edgerunners
            </p>
            <div className="flex items-center gap-4 sm:gap-8 text-cream/30 text-[10px] sm:text-xs font-mono">
              <span>3D models from Sketchfab (CC-BY)</span>
              <span>© 2025</span>
            </div>
          </div>
        </footer>
      </FadeUp>
    </section>
  );
}
