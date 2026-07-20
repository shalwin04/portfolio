"use client";

import { motion } from "framer-motion";
import {
  AnimatedLetters,
  AnimatedWords,
  FadeUp,
} from "@/components/ui/AnimatedText";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Top nav bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 border-b border-cream/10 z-30"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="font-accent italic text-cream text-base sm:text-lg">
            Shalwin Sanju
          </span>
          <span className="text-cream/60 text-xs sm:text-sm tracking-widest uppercase hidden md:block">
            Generative AI Engineer @ Cprime
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm text-cream/60">
          <a
            href="/showcase"
            className="hover:text-cream transition-colors hidden sm:block"
          >
            demos
          </a>
          <a
            href="#projects"
            className="hover:text-cream transition-colors hidden sm:block"
          >
            works
          </a>
          <a
            href="#about"
            className="hover:text-cream transition-colors hidden sm:block"
          >
            about
          </a>
          <a href="#contact" className="hover:text-cream transition-colors">
            contact
          </a>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-30 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mt-16 sm:mt-20 lg:mt-0">
        {/* Left side - Large typography */}
        <div className="space-y-3 sm:space-y-4">
          {/* Accent text */}
          <FadeUp delay={0.2}>
            <p className="font-accent italic text-cream/70 text-lg sm:text-xl md:text-2xl">
              @ Cprime, Inc.
            </p>
          </FadeUp>

          {/* Large display text with letter animation */}
          <h1 className="display-huge text-cream text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85]">
            <AnimatedLetters text="GEN AI" delay={0.3} />
            <br />
            <span className="text-outline">
              <AnimatedLetters text="ENGINEER" delay={0.5} />
            </span>
          </h1>

          {/* Secondary large text */}
          <div className="flex items-end gap-2 sm:gap-4">
            <FadeUp delay={0.8}>
              <span className="font-accent italic text-cream/50 text-xl sm:text-2xl md:text-3xl">
                &
              </span>
            </FadeUp>
            <h2 className="display-huge text-cream text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.85]">
              <AnimatedLetters text="BUILDER" delay={0.9} />
            </h2>
          </div>
        </div>

        {/* Right side - Description and status */}
        <div className="space-y-8 sm:space-y-12 lg:pl-12">
          {/* Status indicator */}
          <FadeUp delay={1.1}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="status-dot" />
                <span className="text-xs sm:text-sm text-cream/60 font-mono uppercase tracking-wider">
                  2026
                </span>
              </div>
              <span className="text-xs sm:text-sm text-cream uppercase tracking-wider ml-2 sm:ml-4">
                available for work
              </span>
            </div>
          </FadeUp>

          {/* Description with word animation */}
          <FadeUp delay={1.3}>
            <p className="text-cream text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide uppercase max-w-[500px]">
              <AnimatedWords
                text="I BUILD AGENTIC AI SYSTEMS FOR ENTERPRISE."
                delay={1.4}
              />{" "}
              <span className="text-cream/60">
                <AnimatedWords
                  text="$14,500 HACKATHON WINS ON THE SIDE. MCP SERVERS. LANGGRAPH."
                  delay={1.6}
                />
              </span>
            </p>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={1.8}>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="/showcase"
                className="pill-button text-cream text-sm sm:text-base"
              >
                Watch Demos
              </a>
              <a
                href="#projects"
                className="pill-button text-neon-cyan border-neon-cyan hover:bg-neon-cyan hover:text-void text-sm sm:text-base"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="pill-button text-neon-pink border-neon-pink hover:bg-neon-pink hover:text-void text-sm sm:text-base"
              >
                Contact Me
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 md:left-12 lg:left-20 right-4 sm:right-6 md:right-12 lg:right-20 flex items-end justify-between z-30"
      >
        {/* Scroll indicator */}
        <div className="flex items-center gap-2 sm:gap-4 text-cream/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 sm:w-8 h-px bg-cream/40"
          />
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 sm:gap-6 text-cream/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
          <a
            href="https://github.com/shalwin04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition-colors"
          >
            Github
          </a>
          <a
            href="https://linkedin.com/in/shalwin-sanju"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition-colors hidden sm:block"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/samshalwin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition-colors hidden sm:block"
          >
            X
          </a>
        </div>
      </motion.div>
    </section>
  );
}
