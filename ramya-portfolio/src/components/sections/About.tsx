"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <motion.div 
          className="relative rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#00e5ff] rounded-full blur-[100px] opacity-20 -z-10 translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#7000ff] rounded-full blur-[100px] opacity-20 -z-10 -translate-x-1/2 -translate-y-1/2" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              <img 
                src="/media/Profile_Pic.jpg" 
                alt="Ramya" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex-1">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-6">
                I don’t just build virtual worlds—<span className="text-white font-medium">I make them think.</span>
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed font-mono">
                With deep expertise in Unity, Unreal Engine, and WebXR, I specialize in crafting multiplayer spatial experiences. Now, by integrating Large Language Models and Generative AI, I’m building next-generation applications where XR environments intelligently respond to, educate, and assist users.
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Engine Agnostic", value: "Unity & Unreal" },
                  { label: "AI Integration", value: "Local LLMs & SLMs" },
                  { label: "XR Architect", value: "WebXR & Standalone" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col border-l-2 border-[#ff007f] pl-4">
                    <span className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-lg text-white font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
