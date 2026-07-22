"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./../loading";
import data from "../../data/db";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

// ============================================================
// Movie Grid Component
// ============================================================
export default function MovieGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter movies based on search
  const filteredMovies = data.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-black">
        <div className="text-center text-white/30">
          <p className="text-6xl mb-4">🎬</p>
          <p className="text-lg font-medium">No movies available</p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full mt-10 min-h-screen bg-black py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* ============================================================
            Header
            ============================================================ */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-yellow-500 rounded-full" />
            <div>
              <h1 className="text-white text-2xl md:text-3xl font-bold">
                Movie Library
              </h1>
              <p className="text-white/20 text-sm">
                {filteredMovies.length} movies
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-yellow-500/50 focus:outline-none transition"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
            
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ============================================================
            Search Results Info
            ============================================================ */}
        {search && filteredMovies.length === 0 && (
          <div className="text-white/20 text-sm mb-4">
            No results for "{search}"
          </div>
        )}

        {/* ============================================================
            Grid
            ============================================================ */}
        {filteredMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/30">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg">No movies found</p>
            <p className="text-sm mt-1">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {filteredMovies.map((movie, index) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <motion.div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {/* Poster */}
                  <div className="relative rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Year Badge */}
                    {movie.year && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/40 text-[10px] font-medium">
                        {movie.year}
                      </div>
                    )}

                    {/* Rating Badge */}
                    {movie.rating && (
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-amber-500 text-[8px] font-bold">
                        ★ {movie.rating}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="mt-2">
                    <p className="text-white text-sm font-medium truncate">
                      {movie.title}
                    </p>
                    {movie.genre && (
                      <p className="text-white/20 text-xs truncate">
                        {movie.genre}
                      </p>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 backdrop-blur-sm rounded-xl"
                      >
                        <button className="px-3 py-1.5 rounded-full bg-yellow-500 text-black text-xs font-bold hover:bg-yellow-400 transition">
                          ▶ Play
                        </button>
                        <button className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition">
                          Info
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* ============================================================
            Footer
            ============================================================ */}
        {filteredMovies.length > 0 && (
          <div className="text-center mt-10 text-white/10 text-xs tracking-widest">
            {filteredMovies.length} movies • Scroll to explore
          </div>
        )}

      </div>
    </section>
  );
}