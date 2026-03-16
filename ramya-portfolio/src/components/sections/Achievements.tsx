"use client";

import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";

export function Achievements() {
  return (
    <section className="w-full py-32 px-6 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7000ff] opacity-5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Key Milestones
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Achievements Col */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-[#ff007f]" />
              <h3 className="text-2xl font-semibold">Honors & Events</h3>
            </div>
            
            <div className="border border-white/10 p-6 rounded-2xl bg-[#111] hover:border-[#ff007f]/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold">TiE Women Summit</h4>
                <span className="text-sm font-mono text-gray-500">2020</span>
              </div>
              <p className="text-gray-400 text-sm">
                Selected among the <strong className="text-white">Top 5 Finalists</strong> out of 16 companies across India. Pitched "Inshades", demonstrating strong entrepreneurial capability alongside technical skills.
              </p>
            </div>

            <div className="border border-white/10 p-6 rounded-2xl bg-[#111] hover:border-[#ff007f]/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold">Endless</h4>
                <span className="text-sm font-mono text-gray-500">Google Play Store</span>
              </div>
              <p className="text-gray-400 text-sm">
                Successfully published a brain-activating 2D mobile runner game, handling the full development lifecycle from logic to global store deployment.
              </p>
            </div>
          </motion.div>

          {/* Certifications Col */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#00e5ff]" />
              <h3 className="text-2xl font-semibold">Certifications</h3>
            </div>

            {[
              { title: "Unity Certified Associate: Programmer", issuer: "Unity", date: "Feb 2026" },
              { title: "AI Engineer Agentic Track", issuer: "Udemy", date: "Jan 2026" },
              { title: "Claude Code in Action", issuer: "Anthropic", date: "March 2025" },
              { title: "Generative AI Learning Path", issuer: "Google Cloud", date: "Aug 2025" },
            ].map((cert, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 hover:border-[#00e5ff]/50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-200">{cert.title}</h4>
                  <span className="text-sm text-gray-500">{cert.issuer}</span>
                </div>
                <span className="text-xs font-mono text-[#00e5ff] px-2 py-1 bg-[#00e5ff]/10 rounded">
                  {cert.date}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
