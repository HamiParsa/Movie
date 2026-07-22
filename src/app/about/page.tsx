"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaFilm, 
  FaUsers, 
  FaBullseye, 
  FaRegSmile,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaArrowRight
} from "react-icons/fa";
import Link from "next/link";

// ============================================================
// About Page Component
// ============================================================
export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      
      {/* ============================================================
          Background Glow
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* ============================================================
          Cinema Bar - Top
          ============================================================ */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-yellow-500/40 via-white/20 to-yellow-500/40" />
      </div>

      {/* ============================================================
          Hero Header
          ============================================================ */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        
        {/* Background with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        
        {/* Glow Effect on Header */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[300px] bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Know Us Better</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
            About
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300"> Us</span>
          </h1>
          
          <p className="text-white/30 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Where cinema meets passion — discover the story behind our platform
          </p>
        </motion.div>
      </div>

      {/* ============================================================
          Main Content
          ============================================================ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* ============================================================
            Intro Section
            ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="w-12 h-1 bg-yellow-500/60 mx-auto mb-4 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Welcome to Our Cinema Universe
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed">
            This platform was created for true cinema lovers. Here, youll find trending films, 
            curated genres, and a unique cinematic experience right at your fingertips. 
            Our goal is to bring the big screen feeling into the digital space.
          </p>
        </motion.div>

        {/* ============================================================
            Feature Cards
            ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {[
            {
              icon: <FaFilm className="text-yellow-400" size={32} />,
              title: "Why This Website?",
              description: "Because movies are more than just stories—they're emotions, adventures, and experiences. We want to keep that passion alive with a sleek design and quality content."
            },
            {
              icon: <FaBullseye className="text-yellow-400" size={32} />,
              title: "Our Mission",
              description: "To bring you trending titles, personalized recommendations, and a stunning cinematic design that makes browsing movies exciting and fun."
            },
            {
              icon: <FaUsers className="text-yellow-400" size={32} />,
              title: "The Creator",
              description: "This website is built and designed by Hami Parsa, blending a passion for cinema with modern web design and development."
            },
            {
              icon: <FaRegSmile className="text-yellow-400" size={32} />,
              title: "Our Promise",
              description: "We are committed to delivering high-quality content, a smooth user experience, and a cinematic atmosphere every time you visit."
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-yellow-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/5"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ============================================================
            Divider
            ============================================================ */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* ============================================================
            Contact Section
            ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Get in Touch</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Wed Love to Hear From You
          </h3>
          <p className="text-white/30 text-sm mb-8">
            Have an idea, suggestion, or question? Reach out to us through any of the channels below.
          </p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <motion.a
              whileHover={{ scale: 1.05, y: -4 }}
              href="mailto:info@yourmovie.com"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300"
            >
              <FaEnvelope className="text-yellow-400" size={18} />
              <span className="text-sm">Email</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -4 }}
              href="#"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300"
            >
              <FaInstagram className="text-pink-500" size={18} />
              <span className="text-sm">Instagram</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -4 }}
              href="#"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300"
            >
              <FaTwitter className="text-blue-400" size={18} />
              <span className="text-sm">Twitter</span>
            </motion.a>
          </div>

          {/* CTA */}
          <Link href="/movies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300"
            >
              Explore Movies
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </motion.button>
          </Link>
        </motion.div>

      </div>

      {/* ============================================================
          Cinema Bar - Bottom
          ============================================================ */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-yellow-500/40 via-white/20 to-yellow-500/40" />
      </div>

    </div>
  );
}