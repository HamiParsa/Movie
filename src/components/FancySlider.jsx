"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// ============================================================
// Movie Data
// ============================================================
const MOVIES = [
  { 
    title: "Abigail", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/15278.jpg",
    year: "2024",
    genre: "Horror",
    rating: "8.4",
  },
  { 
    title: "John Wick", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/22291.jpg",
    year: "2023",
    genre: "Action",
    rating: "8.7",
  },
  { 
    title: "Joker 2", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/18429.jpg",
    year: "2024",
    genre: "Drama",
    rating: "8.9",
  },
  { 
    title: "The Godfather", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/13940.jpg",
    year: "1972",
    genre: "Crime",
    rating: "9.2",
  },
  { 
    title: "Deadpool & Wolverine", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/15857.jpg",
    year: "2024",
    genre: "Comedy",
    rating: "8.2",
  },
  { 
    title: "Garfield", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/16249.jpg",
    year: "2024",
    genre: "Comedy",
    rating: "7.8",
  },
  { 
    title: "Inside Out", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/15840.jpg",
    year: "2024",
    genre: "Animation",
    rating: "8.8",
  },
  { 
    title: "The Matrix", 
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/7093.jpg",
    year: "1999",
    genre: "Sci-Fi",
    rating: "9.0",
  },
];

// ============================================================
// Hero Slider
// ============================================================
export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const mainSwiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  const handleMainSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    if (thumbSwiperRef.current) {
      thumbSwiperRef.current.slideTo(swiper.realIndex);
    }
  };

  const handleThumbClick = (index) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };

  const currentMovie = MOVIES[activeIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      
      {/* ============================================================
          Background Glow Effect
          ============================================================ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* ============================================================
          Main Image - Blurred
          ============================================================ */}
      <div className="absolute inset-0 z-1">
        <Swiper
          modules={[Autoplay, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          grabCursor={true}
          onSlideChange={handleMainSlideChange}
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          className="w-full h-full"
        >
          {MOVIES.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div 
                  className="w-full h-full bg-cover bg-center scale-110"
                  style={{ 
                    backgroundImage: `url(${movie.image})`,
                    filter: "blur(6px)",
                  }}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ 
                    backgroundImage: `url(${movie.image})`,
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ============================================================
          Gradient Overlay
          ============================================================ */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      </div>

      {/* ============================================================
          Cinema Frame Bars
          ============================================================ */}
      <div className="absolute top-0 left-0 w-full h-[3px] z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-yellow-500/60 via-white/30 to-yellow-500/60" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-yellow-500/60 via-white/30 to-yellow-500/60" />
      </div>

      {/* ============================================================
          Navigation Arrows
          ============================================================ */}
      <button 
        className="custom-prev absolute left-8 top-1/2 -translate-y-1/2 z-30 text-white/20 hover:text-white/60 text-6xl transition-all hover:scale-125 hover:translate-x-[-4px] hidden md:block pointer-events-auto"
        aria-label="Previous"
      >
        ‹
      </button>
      <button 
        className="custom-next absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white/20 hover:text-white/60 text-6xl transition-all hover:scale-125 hover:translate-x-[4px] hidden md:block pointer-events-auto"
        aria-label="Next"
      >
        ›
      </button>

      {/* ============================================================
          Content - با تایتل کوچیک‌تر (همون استایل)
          ============================================================ */}
      <div className="relative z-20 h-full flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          <div className="max-w-3xl">
            
            {/* Badge */}
            <motion.div
              key={`badge-${activeIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6 pointer-events-auto"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">
                Now Showing
              </span>
            </motion.div>

            {/* Year, Genre, Rating */}
            <motion.div
              key={`meta-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-4 text-sm text-white/40 mb-4"
            >
              <span className="tracking-[0.2em] uppercase">{currentMovie.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="tracking-[0.2em] uppercase">{currentMovie.genre}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span>{currentMovie.rating}</span>
              </div>
            </motion.div>

            {/* Title - فقط سایزش کوچیک‌تر شده */}
            <motion.h1
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight"
              style={{
                textShadow: "0 0 80px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4)",
              }}
            >
              {currentMovie.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-white/30 text-sm max-w-md leading-relaxed hidden md:block"
            >
              Experience the cinematic journey like never before. 
              A masterpiece that will captivate your senses.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4 mt-8 pointer-events-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-3.5 rounded-full overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm transition-all hover:shadow-2xl hover:shadow-yellow-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  ▶ Watch Now
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium text-sm hover:bg-white/15 hover:border-white/40 transition-all"
              >
                More Info
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ============================================================
          Thumbnails - با اندازه مناسب و مرتب
          ============================================================ */}
      <div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl px-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          centeredSlides={false}
          loop={true}
          grabCursor={true}
          spaceBetween={16}
          onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
          className="w-full"
        >
          {MOVIES.map((movie, index) => (
            <SwiperSlide key={index} className="!w-[130px] md:!w-[180px]">
              <motion.button
                onClick={() => handleThumbClick(index)}
                whileHover={{ scale: 1.06, y: -6 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative w-full rounded-2xl overflow-hidden transition-all duration-500
                  ${activeIndex === index 
                    ? "ring-2 ring-yellow-500 shadow-2xl shadow-yellow-500/30 scale-105" 
                    : "ring-1 ring-white/10 opacity-50 hover:opacity-100 hover:ring-white/30"
                  }
                `}
              >
                <div className="aspect-square">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Active Glow */}
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/30 via-transparent to-transparent" />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 hover:opacity-100 transition-all duration-300 translate-y-2 hover:translate-y-0">
                  <p className="text-white text-sm font-medium truncate">{movie.title}</p>
                  <p className="text-white/40 text-xs">{movie.year}</p>
                </div>
              </motion.button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Premium Pagination */}
        <div className="flex justify-center items-center gap-3 mt-5">
          {MOVIES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={`
                transition-all duration-500 rounded-full
                ${activeIndex === index 
                  ? "w-10 h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg shadow-yellow-500/40" 
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }
              `}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================
          Slide Counter
          ============================================================ */}
      <div className="absolute top-8 right-8 z-30 hidden md:flex items-center gap-3 text-white/20 text-sm tracking-widest pointer-events-none">
        <span className="text-white/60 font-bold text-2xl">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-white/10 text-xs">/ {String(MOVIES.length).padStart(2, "0")}</span>
      </div>

      {/* ============================================================
          Scroll Indicator
          ============================================================ */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden md:block text-white/10 pointer-events-non"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>

    </section>
  );
}