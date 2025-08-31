"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiCameraMovie } from "react-icons/bi";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export default function CinematicLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Handle site loading state
  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Generate particles only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p: Particle[] = Array.from({ length: 40 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 2 + Math.random() * 4,
        color: ["#FFD700", "#FF4500", "#00BFFF", "#FF69B4"][Math.floor(Math.random() * 4)],
        duration: 2 + Math.random() * 3,
      }));
      setParticles(p);
    }
  }, []);

  return (
    <>
      {children}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 overflow-hidden">
          {/* Rotating camera icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-white text-7xl md:text-9xl drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
          >
            <BiCameraMovie />
          </motion.div>

          {/* Glowing halo around the camera */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute w-36 h-36 md:w-48 md:h-48 border-4 border-yellow-400 border-t-transparent rounded-full drop-shadow-lg"
          />

          {/* Animated glowing particles */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: p.x, y: p.y, opacity: 0.3 }}
              animate={{
                x: typeof window !== "undefined" ? Math.random() * window.innerWidth : p.x,
                y: typeof window !== "undefined" ? Math.random() * window.innerHeight : p.y,
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ repeat: Infinity, duration: p.duration, ease: "easeInOut" }}
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              }}
              className="absolute rounded-full blur-sm"
            />
          ))}

          {/* Loading text */}
          <div className="absolute bottom-20 text-white text-2xl md:text-3xl font-bold drop-shadow-lg animate-pulse">
            Loading Movies...
          </div>
        </div>
      )}
    </>
  );
}
