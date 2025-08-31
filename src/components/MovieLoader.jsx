"use client";

import React from "react";


export default function MovieLoader({ size = 120, accent = "#FF2D55", text = "Loading movies..." }) {
  const reelSize = size;
  const stripHeight = Math.round(size * 0.22);
  const playSize = Math.round(size * 0.28);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4"
      style={{ width: "100%" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: reelSize * 2.2, maxWidth: "100%" }}
      >
        
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
              backgroundImage:
                `linear-gradient(90deg,
                  rgba(255,255,255,0.06) 0%,
                  rgba(255,255,255,0.12) 5%,
                  rgba(0,0,0,0.45) 6%,
                  rgba(0,0,0,0.45) 16%,
                  rgba(255,255,255,0.12) 17%,
                  rgba(255,255,255,0.06) 22%,
                  rgba(255,255,255,0.06) 100%)`,
              backgroundSize: "240px 100%",
              animation: "film-scroll 1.6s linear infinite",
              borderRadius: 6,
              boxShadow: "inset 0 -6px 18px rgba(0,0,0,0.65)",
            }}
          />
        </div>

        {/* Left reel */}
        <div
          className="reel"
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
          <svg width={reelSize} height={reelSize} viewBox="0 0 100 100" className="reel-svg">
            <defs>
              <radialGradient id="rim" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#222" />
                <stop offset="60%" stopColor="#111" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
            </defs>

            {/* rim */}
            <circle cx="50" cy="50" r="48" fill="url(#rim)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            {/* holes */}
            <g className="reel-holes" transform="translate(0,0)">
              {[0, 60, 120, 180, 240, 300].map((rot, i) => (
                <g key={i} transform={`rotate(${rot} 50 50)`}>
                  <rect x="49" y="10" width="2" height="14" rx="1" fill="#000" opacity="0.55" />
                </g>
              ))}
            </g>
            {/* center */}
            <circle cx="50" cy="50" r="18" fill="#050505" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Play button / center pulse */}
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
            {/* neon ring */}
            <div
              className="neon-ring"
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: 12,
                boxShadow: `0 0 28px ${accent}, 0 0 60px ${accent}66`,
                filter: "blur(8px)",
                opacity: 0.75,
                pointerEvents: "none",
                mixBlendMode: "screen",
                animation: "neonPulse 1.8s ease-in-out infinite",
              }}
            />
            {/* actual play triangle */}
            <svg width={Math.round(playSize * 0.5)} height={Math.round(playSize * 0.5)} viewBox="0 0 24 24" fill="none">
              <path d="M5 3v18l15-9L5 3z" fill={accent} style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.6))" }} />
            </svg>
          </div>
        </div>

        {/* Right reel (mirror) */}
        <div
          className="reel right-reel"
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
          <svg width={reelSize} height={reelSize} viewBox="0 0 100 100" className="reel-svg">
            <circle cx="50" cy="50" r="48" fill="url(#rim)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <g className="reel-holes" transform="translate(0,0)">
              {[0, 60, 120, 180, 240, 300].map((rot, i) => (
                <g key={i} transform={`rotate(${rot} 50 50)`}>
                  <rect x="49" y="10" width="2" height="14" rx="1" fill="#000" opacity="0.55" />
                </g>
              ))}
            </g>
            <circle cx="50" cy="50" r="18" fill="#050505" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* loading text */}
      <div className="text-center mt-2">
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            letterSpacing: 0.6,
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <span style={{ color: accent, fontSize: 14, opacity: 0.95 }}>●</span>
          <span style={{ fontSize: 16 }}>{text}</span>
        </div>
      </div>

      {/* styles */}
      <style jsx>{`
        /* film strip scroll */
        @keyframes film-scroll {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }

        /* reels rotate in opposite directions */
        .reel-svg { animation: reel-rotate 4s linear infinite; }
        .right-reel .reel-svg { animation: reel-rotate-rev 3.6s linear infinite; }

        @keyframes reel-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes reel-rotate-rev {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* neon pulse */
        @keyframes neonPulse {
          0% { opacity: 0.5; transform: scale(1); filter: blur(6px); }
          50% { opacity: 1; transform: scale(1.05); filter: blur(10px); }
          100% { opacity: 0.5; transform: scale(1); filter: blur(6px); }
        }

        /* scan line */
        .animate-scan { animation: scan 1.2s linear infinite; }
        @keyframes scan {
          0% { transform: translateY(-120%); opacity: 0; }
          10% { opacity: 0.6; }
          50% { transform: translateY(0%); opacity: 0.7; }
          90% { opacity: 0.2; }
          100% { transform: translateY(120%); opacity: 0; }
        }

        /* small responsive tweaks */
        @media (max-width: 640px) {
          .reel-svg { transform-origin: 50% 50%; }
        }
      `}</style>
    </div>
  );
}
