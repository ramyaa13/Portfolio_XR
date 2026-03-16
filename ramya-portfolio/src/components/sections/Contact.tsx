"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Download, Cpu } from "lucide-react";

export function Contact() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleResumeDownload = () => {
    setIsDownloading(true);
    
    // Trigger download synchronously to bypass browser popup blockers
    const link = document.createElement('a');
    link.href = '/resume/ramya_resume.pdf';
    link.download = 'Ramya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate holographic scan and download delay for visual effect
    setTimeout(() => {
      setIsDownloading(false);
    }, 2500);
  };

  return (
    <section className="w-full py-32 px-6 border-t border-white/5 bg-black relative overflow-hidden flex flex-col items-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#7000ff]">Future</span> Together
        </motion.h2>

        <motion.p 
          className="text-gray-400 font-mono text-lg mb-16 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Looking for a developer who understands both the rendering pipeline and the inference pipeline? Let's connect. (Or "Chat with my AI" on the homepage!)
        </motion.p>

        <div className="flex justify-center gap-6 mb-20 flex-wrap">
          {[
            { icon: Linkedin, href: "https://linkedin.com/in/rajalakshmi-mahadevan-0b5898159/", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/ramyaa13", label: "GitHub" },
            { icon: Mail, href: "mailto:ramyaa1304@gmail.com", label: "Email" },
            { icon: Phone, href: "tel:+919123599596", label: "Call" },
            { icon: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, href: "https://youtube.com/@doodlirn?si=5PSM_cRvuHzgp-Sd", label: "YouTube" },
            { icon: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, href: "https://www.instagram.com/_doodlirn._/", label: "Instagram" },
          ].map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#111] hover:bg-white/10 rounded-full border border-white/5 hover:border-[#00e5ff]/50 transition-colors group relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
            >
              <item.icon className="w-6 h-6 text-gray-400 group-hover:text-[#00e5ff] transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Holographic Resume Download Button */}
        <motion.div 
          className="relative inline-block w-full max-w-[300px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <button 
            onClick={handleResumeDownload}
            disabled={isDownloading}
            className="w-full relative overflow-hidden group bg-[#111] border border-[#00e5ff]/30 px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]"
          >
            <AnimatePresence mode="wait">
              {isDownloading ? (
                <motion.div 
                  key="downloading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-[#00e5ff]"
                >
                  <Cpu className="w-5 h-5 animate-pulse" />
                  <span className="font-mono text-sm uppercase tracking-widest">Retrieving Data...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-white group-hover:text-[#00e5ff] transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold text-lg">Download Resume (PDF)</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Holographic Scan Line Animation when active */}
            {isDownloading && (
              <motion.div 
                className="absolute inset-x-0 h-[2px] bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
