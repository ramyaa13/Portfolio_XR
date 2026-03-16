"use client";

import { Canvas } from "@react-three/fiber";
import { HeroScene } from "../3d/HeroScene";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquareCode, Download, Cpu } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleResumeDownload = () => {
    setIsDownloading(true);
    
    // Simulate holographic scan and download delay
    setTimeout(() => {
      setIsDownloading(false);
      const link = document.createElement('a');
      link.href = '/resume/ramya_resume.pdf';
      link.download = 'Ramya_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2500);
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <HeroScene />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
          <span className="text-sm tracking-wide text-gray-300">Available for XR & AI Engineering Roles</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.2, staggerChildren: 0.05 }
            }
          }}
        >
          Architecting the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#7000ff] overflow-hidden whitespace-nowrap inline-block">
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            >
              Intelligence of Immersion
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hi, I’m <span className="text-white font-sans font-semibold">Rajalakshmi (Ramya) M</span>.
          An XR & AI Developer bridging the gap between immersive spatial computing and generative AI systems. I develop AI powered XR applications,
          multiplayer VR environments, and intelligent spatial systems.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-lg font-semibold bg-white text-black hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            View Projects
          </button>
          
          <button
            onClick={() => window.dispatchEvent(new Event('open-chat'))}
            className="px-8 py-4 rounded-lg font-semibold border border-white/20 bg-black/50 backdrop-blur-md hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            <MessageSquareCode className="w-5 h-5 text-[#00e5ff] group-hover:scale-110 transition-transform" />
            Chat with my AI
          </button>

          <button
            onClick={handleResumeDownload}
            disabled={isDownloading}
            className="relative px-8 py-4 rounded-lg font-semibold border border-[#00e5ff]/30 bg-black/50 backdrop-blur-md hover:bg-[#00e5ff]/10 hover:border-[#00e5ff] transition-all flex items-center justify-center gap-2 group overflow-hidden w-full sm:w-auto min-w-[200px]"
          >
            <AnimatePresence mode="wait">
              {isDownloading ? (
                <motion.div
                  key="downloading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-[#00e5ff]"
                >
                  <Cpu className="w-4 h-4 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest">Retrieving...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-white group-hover:text-[#00e5ff] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="whitespace-nowrap">Download Resume</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scan animation */}
            {isDownloading && (
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </motion.div>

    </section>
  );
}
