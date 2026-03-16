"use client";

import { useFrame } from "@react-three/fiber";
import { Sphere, Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00e5ff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff007f" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial color="#222" wireframe />
        </mesh>
      </Float>

      {/* Core Node */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#7000ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </>
  );
}
