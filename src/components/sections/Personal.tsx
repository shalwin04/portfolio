"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedLetters, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedText";

const tabs = [
  { id: "about", label: "About Me" },
  { id: "movies", label: "Movies" },
  { id: "music", label: "Music" },
  { id: "books", label: "Books & Poems" },
  { id: "misc", label: "Misc" },
];

const personalData = {
  about: {
    title: "A BIT ABOUT ME",
    items: [
      { label: "Location", value: "Chennai, India" },
      { label: "Languages", value: "English, Tamil" },
      { label: "Day Job", value: "Gen AI Engineer @ Cprime, Inc." },
      { label: "Hobby", value: "Winning international hackathons" },
      { label: "Fun Fact", value: "Won $14.5K building AI in 48-hour sprints" },
    ],
  },
  movies: {
    title: "FILMS I LOVE",
    items: [
      { name: "Blade Runner 2049", year: "2017", note: "Visual masterpiece" },
      { name: "Interstellar", year: "2014", note: "Time & love" },
      { name: "The Matrix", year: "1999", note: "Red pill, always" },
      { name: "Inception", year: "2010", note: "Dreams within dreams" },
      { name: "Ghost in the Shell", year: "1995", note: "Cyberpunk perfection" },
      { name: "Akira", year: "1988", note: "Neo-Tokyo vibes" },
    ],
  },
  music: {
    title: "SOUNDS I VIBE TO",
    subsections: [
      {
        category: "Artists",
        items: ["The Weeknd", "Daft Punk", "Radiohead", "Kendrick Lamar", "Pink Floyd"],
      },
      {
        category: "Albums",
        items: [
          { name: "After Hours", artist: "The Weeknd" },
          { name: "Random Access Memories", artist: "Daft Punk" },
          { name: "OK Computer", artist: "Radiohead" },
          { name: "Dark Side of the Moon", artist: "Pink Floyd" },
        ],
      },
      {
        category: "On Repeat",
        items: [
          { name: "Blinding Lights", artist: "The Weeknd" },
          { name: "Get Lucky", artist: "Daft Punk" },
          { name: "Paranoid Android", artist: "Radiohead" },
          { name: "Money Trees", artist: "Kendrick Lamar" },
        ],
      },
    ],
  },
  books: {
    title: "WORDS THAT MOVE ME",
    subsections: [
      {
        category: "Books",
        items: [
          { name: "Neuromancer", author: "William Gibson" },
          { name: "Snow Crash", author: "Neal Stephenson" },
          { name: "The Pragmatic Programmer", author: "Hunt & Thomas" },
          { name: "Sapiens", author: "Yuval Noah Harari" },
        ],
      },
      {
        category: "Poems",
        items: [
          { name: "The Road Not Taken", author: "Robert Frost" },
          { name: "If—", author: "Rudyard Kipling" },
          { name: "Invictus", author: "William Ernest Henley" },
        ],
      },
    ],
  },
  misc: {
    title: "RANDOM FAVORITES",
    subsections: [
      {
        category: "Anime",
        items: ["Cyberpunk: Edgerunners", "Attack on Titan", "Steins;Gate", "Death Note"],
      },
      {
        category: "Games",
        items: ["Cyberpunk 2077", "The Witcher 3", "Elden Ring", "Hollow Knight"],
      },
      {
        category: "Hobbies",
        items: ["Building side projects", "Exploring AI papers", "Night coding sessions", "Coffee brewing"],
      },
    ],
  },
};

function TabContent({ tabId }: { tabId: string }) {
  const data = personalData[tabId as keyof typeof personalData];

  if (tabId === "about") {
    const aboutData = data as typeof personalData.about;
    return (
      <div className="space-y-4">
        {aboutData.items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-cream/10"
          >
            <span className="text-cream/40 text-xs font-mono uppercase tracking-wider w-32 shrink-0">
              {item.label}
            </span>
            <span className="text-cream text-sm sm:text-base">{item.value}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (tabId === "movies") {
    const moviesData = data as typeof personalData.movies;
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moviesData.items.map((movie, index) => (
          <motion.div
            key={movie.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-4 border border-cream/10 rounded-lg hover:border-neon-pink/30 transition-colors"
          >
            <h4 className="text-cream text-sm sm:text-base font-medium group-hover:text-neon-pink transition-colors">
              {movie.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-cream/40 text-xs font-mono">{movie.year}</span>
              <span className="text-cream/20">•</span>
              <span className="text-cream/60 text-xs italic">{movie.note}</span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (tabId === "music") {
    const musicData = data as typeof personalData.music;
    return (
      <div className="space-y-8">
        {musicData.subsections.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.15 }}
          >
            <h4 className="text-cream/40 text-xs font-mono uppercase tracking-wider mb-4">
              {section.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item, index) => (
                <motion.span
                  key={typeof item === "string" ? item : item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: sectionIndex * 0.15 + index * 0.05 }}
                  className="px-3 py-1.5 text-xs sm:text-sm border border-cream/20 rounded-full hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors cursor-default"
                >
                  {typeof item === "string" ? (
                    <span className="text-cream">{item}</span>
                  ) : (
                    <>
                      <span className="text-cream">{item.name}</span>
                      <span className="text-cream/40 ml-1">— {item.artist}</span>
                    </>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (tabId === "books") {
    const booksData = data as typeof personalData.books;
    return (
      <div className="space-y-8">
        {booksData.subsections.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.15 }}
          >
            <h4 className="text-cream/40 text-xs font-mono uppercase tracking-wider mb-4">
              {section.category}
            </h4>
            <div className="space-y-3">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.15 + index * 0.1 }}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-neon-purple group-hover:text-neon-pink transition-colors">—</span>
                  <span className="text-cream text-sm sm:text-base">{item.name}</span>
                  <span className="text-cream/40 text-xs sm:text-sm">by {item.author}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (tabId === "misc") {
    const miscData = data as typeof personalData.misc;
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {miscData.subsections.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.15 }}
          >
            <h4 className="text-cream/40 text-xs font-mono uppercase tracking-wider mb-4">
              {section.category}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: sectionIndex * 0.15 + index * 0.05 }}
                  className="text-cream text-sm hover:text-neon-green transition-colors cursor-default"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}

export default function Personal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section id="personal" ref={ref} className="section bg-transparent relative overflow-hidden">
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 lg:left-20 text-cream/20 font-mono text-xs sm:text-sm"
      >
        06
      </motion.div>

      <div className="w-full">
        {/* Section header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="display-huge text-cream text-[14vw] sm:text-[12vw] md:text-[8vw] lg:text-[5vw] leading-[0.85] mb-3 sm:mb-4">
            <AnimatedLetters text="BEYOND" delay={0} />
            <br />
            <span className="text-outline">
              <AnimatedLetters text="THE CODE" delay={0.2} />
            </span>
          </h2>
          <FadeUp delay={0.4}>
            <p className="font-accent italic text-cream/50 text-base sm:text-lg">
              The human behind the terminal
            </p>
          </FadeUp>
        </div>

        {/* Tabs */}
        <FadeUp delay={0.5}>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 border-b border-cream/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-cream text-void"
                    : "text-cream/60 hover:text-cream hover:bg-cream/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Tab content */}
        <FadeUp delay={0.6}>
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-cream/40 text-xs font-mono uppercase tracking-widest mb-6">
                  {personalData[activeTab as keyof typeof personalData].title}
                </h3>
                <TabContent tabId={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
