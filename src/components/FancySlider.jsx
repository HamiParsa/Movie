"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

// Sample hero movies data
const movies = [
  {
    title: "Abigail",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/15278.jpg",
  },
  {
    title: "Wednesday 2",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/23051.jpg",
  },
  {
    title: "John Wick",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/22291.jpg",
  },
  {
    title: "KPop Demon",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/23703.jpg",
  },
  {
    title: "Elemental",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/9221.jpg",
  },
  {
    title: "Joker 2",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/18429.jpg",
  },
  {
    title: "The Godfather",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/13940.jpg",
  },
  {
    title: "Deadpool & Wolverine",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/15857.jpg",
  },
  {
    title: "Garfild",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/16249.jpg",
  },
  {
    title: "Iside Out",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/15840.jpg",
  },
  {
    title: "The Matrix",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/7093.jpg",
  },
];

export default function UltraHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Parallax blurred background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movies[activeIndex].image})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* Main swiper slider */}
      <div className="relative z-10 flex justify-center items-center h-full px-4 md:px-0">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          loop
          navigation
          pagination={{ clickable: true, el: ".thumbnails" }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={i}>
              <div className="relative group">
                {/* Movie image */}
                <motion.img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                  initial={{ scale: 0.95, opacity: 0.85 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Reflection effect */}
                <img
                  src={movie.image}
                  alt={`reflection-${i}`}
                  className="rounded-3xl opacity-20 scale-y-[-1] absolute top-full left-0 w-full"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                  }}
                />

                {/* Text and buttons overlay */}
                <motion.div
                  className="absolute bottom-8 left-6 md:left-10 text-white max-w-lg"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {movie.title}
                  </h2>
                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 shadow-lg transition">
                      ▶ Play
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition">
                      ℹ More Info
                    </button>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails navigation */}
      <div className="thumbnails absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {movies.map((movie, i) => (
          <div
            key={i}
            className={`w-16 h-10 md:w-24 md:h-14 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 ${
              i === activeIndex ? "scale-110 shadow-lg ring-2 ring-red-600" : ""
            }`}
            onClick={() => setActiveIndex(i)}
          >
            <img
              src={movie.image}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
