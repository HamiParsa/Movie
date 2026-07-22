"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaStar,
  FaTimes,
  FaArrowLeft,
  FaCalendar,
  FaFilm,
  FaClock,
  FaHeart,
  FaShare,
  FaBookmark,
  FaImdb,
} from "react-icons/fa";
import Loading from "@/components/MovieLoader";
import moviesData from "@/data/db";
import Image from "next/image";
import Link from "next/link";

// ============================================================
// Types - Defined Inside This File
// ============================================================
interface Movie {
  id: number;
  title: string;
  poster: string;
  year: string | number;
  genre: string;
  rating?: string | number;
  duration?: string;
  description?: string;
  cast?: string[];
  trailerUrl?: string;
}

// ============================================================
// Movie Detail Page
// ============================================================
export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = Number(params?.id);

  // Fix: Type assertion to handle the data properly
  const allMovies: Movie[] = moviesData as Movie[];
  const movie: Movie | undefined = allMovies.find(
    (m: Movie) => m.id === movieId,
  );

  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Loading
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  // Not found
  if (!movie) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-center text-white/30">
          <p className="text-6xl mb-4">🎬</p>
          <p className="text-xl font-medium">Movie not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 text-sm transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Safe cast access
  const castList: string[] = movie.cast || [];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* ============================================================
          Background
          ============================================================ */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center scale-110 blur-2xl opacity-40"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* ============================================================
          Cinema Bars
          ============================================================ */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-yellow-500/60 via-white/30 to-yellow-500/60" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-yellow-500/60 via-white/30 to-yellow-500/60" />
      </div>

      {/* ============================================================
          Back Button - Top Left
          ============================================================ */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="absolute mt-10 top-4 left-4 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm"
      >
        <FaArrowLeft size={14} />
        <Link href='/movies'><span className="hidden sm:inline">Back</span></Link>
      </motion.button>

      {/* ============================================================
          Action Buttons - Bottom Right
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 z-50 flex flex-col gap-3"
      >
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="p-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 shadow-lg"
        >
          <FaHeart
            className={isLiked ? "text-red-500 fill-red-500" : ""}
            size={20}
          />
        </button>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 shadow-lg"
        >
          <FaBookmark
            className={isBookmarked ? "text-yellow-500 fill-yellow-500" : ""}
            size={20}
          />
        </button>

        <button className="p-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 shadow-lg">
          <FaShare size={20} />
        </button>
      </motion.div>

      {/* ============================================================
          Main Content
          ============================================================ */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-12">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-[280px] xl:w-[320px] flex-shrink-0"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 via-purple-500/20 to-yellow-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20">
                  <Image
                    width={1000}
                    height={1000}
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <div className="w-16 h-16 rounded-full bg-yellow-500/90 backdrop-blur flex items-center justify-center shadow-2xl shadow-yellow-500/50 hover:scale-110 transition-transform">
                      <FaPlay className="text-black text-2xl ml-1" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 text-center lg:text-left pb-4"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
                style={{ textShadow: "0 4px 60px rgba(0,0,0,0.6)" }}
              >
                {movie.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4"
              >
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium flex items-center gap-1.5">
                  <FaFilm size={10} />
                  {movie.genre}
                </span>

                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/50 text-xs font-medium flex items-center gap-1.5">
                  <FaCalendar size={10} />
                  {String(movie.year)}
                </span>

                {movie.rating && (
                  <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium flex items-center gap-1.5">
                    <FaStar size={10} />
                    {String(movie.rating)}
                  </span>
                )}

                {movie.duration && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/50 text-xs font-medium flex items-center gap-1.5">
                    <FaClock size={10} />
                    {movie.duration}
                  </span>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 mt-4"
              >
                {movie.description ||
                  "No description available for this movie."}
              </motion.p>

              {castList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4"
                >
                  <p className="text-white/20 text-xs uppercase tracking-wider mb-1.5">
                    Cast
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                    {castList.slice(0, 6).map((actor: string, i: number) => (
                      <span key={i} className="text-white/30 text-sm">
                        {actor}
                        {i < castList.slice(0, 6).length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6"
              >
                {movie.trailerUrl && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm hover:shadow-2xl hover:shadow-yellow-500/40 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <FaPlay size={14} />
                    Watch Trailer
                    <span className="text-black/40 group-hover:text-black/60 transition-colors">
                      →
                    </span>
                  </button>
                )}

                <button className="px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-white/70 font-medium text-sm hover:bg-white/15 hover:text-white transition-all hover:scale-105 flex items-center gap-2">
                  <FaImdb size={16} />
                  View on IMDB
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================
          Trailer Modal
          ============================================================ */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-14 right-0 text-white/30 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <FaTimes size={16} />
                Close
              </button>

              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20 bg-black">
                <iframe
                  src={movie.trailerUrl}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
