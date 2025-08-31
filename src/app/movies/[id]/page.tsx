"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/MovieLoader";
import { motion, AnimatePresence } from "framer-motion";
import movies from "@/data/db";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = Number(params?.id);
  const movie = movies.find((m) => m.id === movieId);

  const [showTrailer, setShowTrailer] = useState(false);

  if (!movie) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-black text-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100vh] bg-black text-white flex items-center justify-center px-4 md:px-10">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />

      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start gap-8 mt-16 md:mt-24">
        {/* Poster */}
        <motion.img
          src={movie.poster}
          alt={movie.title}
          className="w-2/3 sm:w-1/3 md:w-1/4 rounded-md shadow-2xl object-cover"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Movie Info */}
        <motion.div
          className="flex flex-col justify-center gap-4 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{movie.title}</h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
            <span className="px-3 py-1 bg-yellow-500 rounded-full text-black font-semibold">
              {movie.genre}
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-white">
              {movie.year}
            </span>
            <span className="px-3 py-1 bg-green-600 rounded-full font-semibold">
              {movie.rating || "N/A"} ⭐
            </span>
          </div>

          <p className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
            {movie.description || "No description available."}
          </p>

          <div className="flex gap-4 mt-6 justify-center md:justify-start flex-wrap">
            <button
              onClick={() => setShowTrailer(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition"
            >
              ▶ Watch Trailer
            </button>
          </div>
        </motion.div>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-3xl p-4">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-2 right-2 text-white text-2xl font-bold z-50"
              >
                ✕
              </button>
              <div className="w-full aspect-video rounded-md overflow-hidden shadow-2xl">
                <iframe
                  src={movie.trailerUrl}
                  title={movie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
