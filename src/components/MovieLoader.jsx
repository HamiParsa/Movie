"use client";

import React from "react";
import { motion } from "framer-motion";

// ============================================================
// Movie Loader Component - Cinema Style
// ============================================================
export default function MovieLoader({ 
  size = 120, 
  accent = "#EAB308", 
  text = "Loading movies..." 
}) {
  const reelSize = size;
  const stripHeight = Math.round(size * 0.22);
  const playSize = Math.round(size * 0.28);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-6 min-h-[400px] w-full bg-black"
    >
      {/* ============================================================
          Background Glow
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* ============================================================
          Loader Container
          ============================================================ */}
      <div className="relative z-10">
        <div
          className="relative flex items-center justify-center"
          style={{ width: reelSize * 2.2, maxWidth: "100%" }}
        >
          
          {/* ============================================================
              Film Strip
              ============================================================ */}
          <div
            className="absolute left-0 right-0 mx-auto overflow-hidden rounded-md"
            style={{
              height: stripHeight,
              top: "60%",
              transform: `translateY(-50%)`,
              width: "90%",
            }}
          >
            <div
              className="film-strip"
              style={{
                height: "100%",
                backgroundImage: `
                  linear-gradient(90deg,
                    rgba(255,255,255,0.06) 0%,
                    rgba(255,255,255,0.12) 5%,
                    rgba(0,0,0,0.45) 6%,
                    rgba(0,0,0,0.45) 16%,
                    rgba(255,255,255,0.12) 17%,
                    rgba(255,255,255,0.06) 22%,
                    rgba(255,255,255,0.06) 100%
                  )
                `,
                backgroundSize: "240px 100%",
                animation: "film-scroll 1.6s linear infinite",
                borderRadius: 6,
                boxShadow: "inset 0 -6px 18px rgba(0,0,0,0.65)",
              }}
            />
          </div>

          {/* ============================================================
              Left Reel
              ============================================================ */}
          <motion.div
            className="reel"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              width: reelSize,
              height: reelSize,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
            }}
          >
            <svg width={reelSize} height={reelSize} viewBox="0 0 100 100">
              <defs>
                <radialGradient id="rim" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#222" />
                  <stop offset="60%" stopColor="#111" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
              </defs>

              <circle cx="50" cy="50" r="48" fill="url(#rim)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              
              {/* Holes */}
              {[0, 60, 120, 180, 240, 300].map((rot, i) => (
                <g key={i} transform={`rotate(${rot} 50 50)`}>
                  <rect x="49" y="10" width="2" height="14" rx="1" fill="#000" opacity="0.55" />
                </g>
              ))}
              
              <circle cx="50" cy="50" r="18" fill="#050505" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* ============================================================
              Play Button / Center
              ============================================================ */}
          <div
            className="absolute z-40 flex items-center justify-center"
            style={{
              width: playSize,
              height: playSize,
              borderRadius: "12px",
              transform: "translateY(-18%)",
            }}
          >
            <div
              className="play-wrap"
              style={{
                width: playSize,
                height: playSize,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25))",
                boxShadow: `0 6px 26px ${accent}40, inset 0 -6px 18px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Neon Ring */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: 12,
                  boxShadow: `0 0 28px ${accent}, 0 0 60px ${accent}66`,
                  filter: "blur(8px)",
                  opacity: 0.75,
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                }}
              />
              
              {/* Play Triangle */}
              <svg width={Math.round(playSize * 0.5)} height={Math.round(playSize * 0.5)} viewBox="0 0 24 24" fill="none">
                <path 
                  d="M5 3v18l15-9L5 3z" 
                  fill={accent} 
                  style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.6))" }} 
                />
              </svg>
            </div>
          </div>

          {/* ============================================================
              Right Reel (Mirror)
              ============================================================ */}
          <motion.div
            className="reel right-reel"
            animate={{ rotate: -360 }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
            style={{
              width: reelSize,
              height: reelSize,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
              transform: `translateX(${reelSize * 1.05}px)`,
            }}
          >
            <svg width={reelSize} height={reelSize} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="url(#rim)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              
              {[0, 60, 120, 180, 240, 300].map((rot, i) => (
                <g key={i} transform={`rotate(${rot} 50 50)`}>
                  <rect x="49" y="10" width="2" height="14" rx="1" fill="#000" opacity="0.55" />
                </g>
              ))}
              
              <circle cx="50" cy="50" r="18" fill="#050505" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </div>

        {/* ============================================================
            Loading Text
            ============================================================ */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: accent, fontSize: 14 }}
            >
              ●
            </motion.div>
            <span className="text-white font-medium text-sm tracking-wider">
              {text}
            </span>
          </div>
          
          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          Styles
          ============================================================ */}
      <style jsx>{`
        @keyframes film-scroll {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
      `}</style>
    </motion.div>
  );
}