"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaGithub 
} from "react-icons/fa";

// ============================================================
// Footer Links Configuration
// ============================================================
const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "About", href: "/about" },
];

const GENRES = [
  { name: "Action", href: "/" },
  { name: "Comedy", href: "/" },
  { name: "Horror", href: "/" },
  { name: "Drama", href: "/" },
  { name: "Sci-Fi", href: "/" },
];

const SOCIAL_ICONS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaGithub, href: "https://github.com/HamiParsa/Movie", label: "GitHub" },
];

// ============================================================
// Footer Component
// ============================================================
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants for fade-up effect
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-black/90 border-t border-white/5 mt-20">
      {/* ============================================================
          Subtle Glow Effect
          ============================================================ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-r from-purple-600/5 via-cyan-400/5 to-pink-500/5 blur-3xl pointer-events-none" />

      {/* ============================================================
          Main Footer Content
          ============================================================ */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* ============================================================
              Column 1 - Brand
              ============================================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/"
              className="inline-block group mb-4"
              aria-label="Homepage"
            >
              <span className="text-2xl font-light tracking-widest text-white">
                <span className="font-bold">✦</span> CINE
              </span>
              <span className="text-white/20 text-xs tracking-[0.3em] group-hover:text-white/40 transition-colors ml-1">
                / STUDIO
              </span>
            </Link>

            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for movies and series. Explore trending,
              top rated, and upcoming films with a cinematic experience.
            </p>

            {/* Repository status */}
            <motion.a
              href="https://github.com/HamiParsa/Movie"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <FaGithub className="text-white/40 group-hover:text-white/70 transition-colors" size={14} />
              <span className="text-white/30 group-hover:text-white/50 text-xs tracking-wide transition-colors">
                View Repository
              </span>
              <span className="text-[10px] text-white/10 group-hover:text-white/20 transition-colors">
                →
              </span>
            </motion.a>

            {/* Copyright - visible on mobile */}
            <p className="text-white/10 text-xs mt-6 md:hidden">
              &copy; {currentYear} CineVerse. All rights reserved.
            </p>
          </motion.div>

          {/* ============================================================
              Column 2 - Quick Links
              ============================================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/30 hover:text-white/70 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ============================================================
              Column 3 - Genres
              ============================================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Genres
            </h3>
            <ul className="space-y-2.5">
              {GENRES.map((genre) => (
                <li key={genre.name}>
                  <Link
                    href={genre.href}
                    className="text-white/30 hover:text-white/70 text-sm transition-colors duration-300"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ============================================================
              Column 4 - Social & Copyright
              ============================================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.25 }}
          >
            <h3 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Follow Us
            </h3>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4 mb-6">
              {SOCIAL_ICONS.map((social, index) => {
                const Icon = social.icon;
                const isGithub = social.label === "GitHub";
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={isGithub ? "_blank" : undefined}
                    rel={isGithub ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -3,
                      rotate: isGithub ? 0 : undefined,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      text-white/30 hover:text-white/70 transition-all duration-300
                      ${isGithub ? "hover:text-white" : ""}
                    `}
                  >
                    <Icon size={isGithub ? 20 : 18} />
                  </motion.a>
                );
              })}
            </div>

            {/* GitHub stats - optional */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:block"
            >
              <div className="flex items-center gap-3 text-white/10 text-[10px] tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/30" />
                  Repository
                </span>
                <span className="text-white/5">|</span>
                <a 
                  href="https://github.com/HamiParsa/Movie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white/30 transition-colors"
                >
                  github.com/your-repo
                </a>
              </div>
            </motion.div>

            {/* Copyright - hidden on mobile (shown above) */}
            <p className="text-white/10 text-xs hidden md:block mt-4">
              &copy; {currentYear} CineVerse
              <br />
              All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          Bottom Bar - Minimal Divider
          ============================================================ */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <div className="flex gap-4 text-white/20">
              <a href="#" className="hover:text-white/40 transition-colors">
                Terms
              </a>
              <span className="text-white/5">|</span>
              <a href="#" className="hover:text-white/40 transition-colors">
                Privacy
              </a>
              <span className="text-white/5">|</span>
              <a href="#" className="hover:text-white/40 transition-colors">
                Cookies
              </a>
            </div>

            {/* GitHub link in bottom bar */}
            <a
              href="https://github.com/HamiParsa/Movie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/10 hover:text-white/30 transition-colors"
            >
              <FaGithub size={12} />
              <span>Repository</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}