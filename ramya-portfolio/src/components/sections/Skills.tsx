"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text } from "@react-three/drei";

const skillsData = {
  "XR & Game Engines": [
    { name: "Unity 3D / 2D", percentage: 95 },
    { name: "Unreal Engine C++/BP", percentage: 80 },
    { name: "ARCore / ARKit / Oculus SDK / Open XR", percentage: 90 },
    { name: "WebXR / Babylon.js", percentage: 85 },
    { name: "Photon / Multiplayer Netcode", percentage: 85 },
    { name: "C# Scripting", percentage: 95 }
  ],
  "AI & Logic": [
    { name: "Generative AI & LLMs", percentage: 85 },
    { name: "Python / ML", percentage: 85 },
    { name: "RAG Systems & Prompt Eng.", percentage: 80 },
    { name: "Model Training & Fine-tuning", percentage: 70 }
  ],
  "Frontend & Tools": [
    { name: "Git / Version Control", percentage: 90 },
    { name: "React / Next.js", percentage: 75 },
    { name: "Blender (3D Modeling)", percentage: 70 }
  ]
};

// Simple Planetary 3D Model
function TechStackOrbit() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00e5ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff007f" />

      {/* Central 'Suns' */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-1.5, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#00e5ff" wireframe opacity={0.5} transparent />
          <Text position={[0, 0, 1.6]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">XR</Text>
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1.5, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#ff007f" wireframe opacity={0.5} transparent />
          <Text position={[0, 0, 1.6]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">AI</Text>
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </>
  );
}

export function Skills() {
  return (
    <section className="w-full py-32 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Technical Arsenal
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
          {/* Skill Bars */}
          <div className="flex flex-col gap-12">
            {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-[#00e5ff]">{category}</h3>
                <div className="flex flex-col gap-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm font-mono text-gray-400">
                        <span>{skill.name}</span>
                        <span>{skill.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#00e5ff] to-[#7000ff] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Tech Stack Visualization */}
          <motion.div
            className="w-full h-[600px] bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 border border-white/10 rounded-full backdrop-blur-md text-xs font-mono text-gray-400">
              Interactive 3D Stack (Drag to orbit)
            </div>

            <Canvas camera={{ position: [0, 0, 8] }}>
              <TechStackOrbit />
            </Canvas>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
