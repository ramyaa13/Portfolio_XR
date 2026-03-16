"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Box } from "lucide-react";

// Project Data categorized exactly as requested
const projectCategories = ["AR", "VR", "WebXR", "AI & LLMs", "2D Games"] as const;
type Category = typeof projectCategories[number];

const portfolioData: Record<Category, { title: string, desc: string, tech: string[], link?: string, video?: string, image?: string }[]> = {
  "AR": [
    {
      title: "Unity AR + AI Learning App",
      desc: "AR Book using Multiple Image Tracking & AI Tutor Chatbot for kids.",
      tech: ["Unity", "AR Foundation", "AI"],
      link: "https://youtu.be/a7SIaEewhBo?si=q9z9WPmQNHDZjNvP",
      image: "/data/media/AR_Book.png"
    },
    {
      title: "Geospatial AR",
      desc: "Location-based AR experience overlaying 3D brand identity via real-world GPS coordinates.",
      tech: ["Unity", "ARCore Geospatial API"],
      video: "/data/media/GeoSpatial_AR.webm"
    },
    {
      title: "AR Rack Fixing System",
      desc: "Step-by-step 3D visual guide projected onto real-world environments for technicians.",
      tech: ["Unity", "AR SDKs"],
      video: "/data/media/AR Rack - Godrej Consulatncy Project.webm"
    },
    {
      title: "CAR MANIPULATION IN AR",
      desc: "3D car model manipulation, design view, error, and cost reduction for showroom visualization.",
      tech: ["Unity", "AR"],
      video: "/data/media/AR Car manipulation.webm"
    },
    {
      title: "AR / VR FLIGHT SIMULATION",
      desc: "Realistic flight simulator for Takeoff/Landing, Valley Flying, and Basic Air Combat.",
      tech: ["Unity", "AR/VR"],
      video: "/data/media/AR Flight.webm"
    },
    {
      title: "AR PORTAL FOR CONSTRUCTION",
      desc: "Virtual portals allowing exploration of virtual structures overlaid into the real world.",
      tech: ["Unity", "AR"],
      video: "/data/media/PORTAL AR.webm"
    }
  ],
  "VR": [
    {
      title: "Ramya's Art Gallery Multiplayer VR",
      desc: "Immersive multiplayer gallery showcasing hand-drawn art in shared virtual 3D space.",
      tech: ["Unity", "Unreal Engine", "Networking"],
      link: "https://youtu.be/Ob8XktS5AhU?si=bhN5t1OgckhWZvkc",
      image: "/data/media/VR_ArtGallery.png"
    },
    {
      title: "Thrissur Museum",
      desc: "Real-time collaborative cultural exploration bridging heritage storytelling with VR tech.",
      tech: ["Unity", "Photon Fusion", "XR Toolkit"],
      link: "https://youtu.be/kBJ-OTHRsVk?si=0SEQfgwc5_wSnmSy",
      image: "/data/media/VR_Thrissur Museum.jpg"
    },
    {
      title: "Kerala Arts and Crafts Village",
      desc: "Photogrammetry-based heritage preservation allowing exploration of authentic artisan studios.",
      tech: ["Meta Quest", "Spatial Metaverse"],
      link: "https://youtu.be/64yrwz7MGh4?si=se4cDX-mrYbD3__3",
      image: "/data/media/Kerala_ArtCraft_VR.png"
    }
  ],
  "WebXR": [
    {
      title: "IntelliShop XR",
      desc: "Browser-based 3D showroom featuring a localized SLM shopping assistant.",
      tech: ["Babylon.js", "WebXR", "SLM"],
      link: "https://virtual-showroom-rho.vercel.app/",
      image: "/data/media/WebXR_VirtualShowroom_IntelliShop.png"
    },
    {
      title: "Edugui 2020",
      desc: "3D multiplayer educational virtual fair supporting 100+ concurrent users with real-time video chat.",
      tech: ["Unity", "Networking"],
      image: "/data/media/Edugui2020.png"
    }
  ],
  "AI & LLMs": [
    {
      title: "Ramya’s CareerAgent!",
      desc: "Agentic conversational AI dynamically showcasing my portfolio skills and XR background.",
      tech: ["LLMs", "Prompt Engineering"],
      image: "/data/media/Career_Agent.png"
    },
    {
      title: "Unity → Unreal Code Translator",
      desc: "Python & LLM-based tool converting Unity C# to Unreal C++ & Blueprints.",
      tech: ["Python", "Mistral-7B", "Gradio"],
      link: "https://huggingface.co/spaces/ramyaa1113/unity-unreal-code-translator",
      image: "/data/media/Unity-Unreal-Code.jpg"
    }
  ],
  "2D Games": [
    {
      title: "Tic Tac Toe",
      desc: "A classic two-player Tic Tac Toe game featuring clean UI and responsive gameplay.",
      tech: ["Unity", "C#"],
      video: "/data/media/TicTacToe Game.webm"
    },
    {
      title: "Quiz Game",
      desc: "Interactive learning game dynamically loading questions and tracking player scores.",
      tech: ["Unity", "Scriptable Objects", "C#"],
      video: "/data/media/QuizGame.webm"
    },
    {
      title: "Endless",
      desc: "Brain-activation lane runner published globally, challenging reaction speed & coordination.",
      tech: ["Unity", "C#", "Mobile Optimization"],
      video: "/data/media/Endless.webm"
    }
  ]
};

export function Projects() {
  const [activeTab, setActiveTab] = useState<Category>("WebXR");

  return (
    <section id="projects" className="w-full py-32 px-6 border-t border-white/5 bg-gradient-to-t from-black to-[#050505]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        <div className="mb-16 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            The Interactive Gallery
          </motion.h2>
          <motion.p
            className="text-gray-400 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Select a domain to explore my work
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {projectCategories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-colors
                ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300 bg-white/5"}
              `}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-r from-[#00e5ff]/20 to-[#7000ff]/20 border border-[#00e5ff]/50 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="w-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {portfolioData[activeTab].map((project, idx) => (
                <div
                  key={idx}
                  className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#111] overflow-hidden group hover:border-[#00e5ff]/50 transition-colors"
                >
                  <div className="h-48 w-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center border-b border-white/5 relative overflow-hidden group-hover:border-[#00e5ff]/50 transition-colors">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <>
                        <Box className="w-12 h-12 text-gray-700 group-hover:text-[#00e5ff] transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50" />
                      </>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00e5ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-transparent hover:bg-white/10 rounded-full transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-[#00e5ff]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
