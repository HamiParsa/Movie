"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from './../loading';
import data from '../../data/db'; 
import Link from "next/link";

export default function UltraMovieGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredMovies = data.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!data.length) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-white text-xl">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100vh] bg-black p-6 md:p-10">
      {/* Ultra Search Box */}
      <div className="max-w-xl mx-auto mb-10 relative mt-10">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl text-white font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition placeholder-gray-500"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-xl">🔍</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie, index) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <motion.div
              className="relative group cursor-pointer overflow-visible rounded-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* poster*/}
              <motion.img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover rounded-sm shadow-lg"
                whileHover={{ scale: 1.08, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {/* Overlay */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 rounded-sm"
                  >
                    <h2 className="text-lg md:text-xl font-bold">{movie.title}</h2>
                    <p className="text-sm md:text-base mt-1">{movie.genre}</p>
                    <p className="text-xs md:text-sm mt-1">{movie.year}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-sm transition">
                        ▶ Play
                      </button>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold text-sm transition">
                        ℹ Info
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RGB Glow */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-sm pointer-events-none"
                  animate={{ boxShadow: ["0 0 20px #FF2D55", "0 0 20px #00FFD1", "0 0 20px #FFB800"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
