"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { MdNewReleases } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// Movie Data
// ============================================================
const MOVIES = [
  {
    id: 1,
    title: "Bad Guys 2",
    poster:
      "https://www.movieposters.com/cdn/shop/files/bad_guys_two_480x.progressive.jpg?v=1733262276",
    year: "2025",
    genre: "Animation",
  },
  {
    id: 2,
    title: "Superman",
    poster:
      "https://www.movieposters.com/cdn/shop/files/superman_zly2rtyi_480x.progressive.jpg?v=1750086913",
    year: "2025",
    genre: "Action",
  },
  {
    id: 3,
    title: "Together",
    poster:
      "https://www.movieposters.com/cdn/shop/files/together_bss8fa2o-_1_ae88c5fd-d93d-467b-b35c-016df3c17f8a_480x.progressive.jpg?v=1753818059",
    year: "2025",
    genre: "Drama",
  },
  {
    id: 4,
    title: "Wednesday 2",
    poster:
      "https://posterspy.com/wp-content/uploads/2023/01/Wednesday-2.jpg",
    year: "2025",
    genre: "Mystery",
  },
  {
    id: 5,
    title: "F1: The Movie",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/1000263477_500x749.jpg?v=1751050988",
    year: "2025",
    genre: "Sports",
  },
  {
    id: 6,
    title: "Elio",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/elio_4b8cvtas_500x749.jpg?v=1742499593",
    year: "2025",
    genre: "Animation",
  },
  {
    id: 7,
    title: "The Life of Chuck",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/the-life-of-chuck_4oo7ooa0_500x749.jpg?v=1745592829",
    year: "2025",
    genre: "Drama",
  },
  {
    id: 8,
    title: "Smurfs",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/scan_1512308f-a296-4075-941f-766b0118668a_500x749.jpg?v=1748376120",
    year: "2025",
    genre: "Animation",
  },
];

// ============================================================
// New Releases Component
// ============================================================
export default function NewReleases() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-black relative overflow-hidden">
      
      {/* ============================================================
          Background Glow
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* ============================================================
            Header
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full" />
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              New Releases
            </h2>
            <MdNewReleases className="text-blue-500 text-xl md:text-2xl animate-pulse" />
          </div>
          
          <div className="flex items-center gap-2 text-white/20 text-sm">
            <span className="hidden md:inline">Fresh</span>
            <span className="text-blue-500/40">→</span>
          </div>
        </motion.div>

        {/* ============================================================
            Carousel
            ============================================================ */}
        <div className="relative">
          
          <Swiper
            modules={[FreeMode, Navigation, Autoplay]}
            freeMode={{
              enabled: true,
              sticky: true,
            }}
            grabCursor={true}
            slidesPerView="auto"
            spaceBetween={16}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="w-full"
          >
            {MOVIES.map((movie, index) => (
              <SwiperSlide key={movie.id} className="!w-[160px] md:!w-[200px]">
                <motion.div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ============================================================
                      Poster
                      ============================================================ */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover transition-all duration-500"
                      loading="lazy"
                    />

                    {/* Hover Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent"
                    />

                    {/* Scan Line Effect */}
                    {hoveredIndex === index && (
                      <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"
                      />
                    )}

                    {/* New Badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-blue-500/80 backdrop-blur-sm text-white text-[8px] md:text-[10px] font-bold tracking-wider uppercase">
                      New
                    </div>
                  </div>

                  {/* ============================================================
                      Title Overlay on Hover
                      ============================================================ */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl"
                      >
                        <div className="text-center px-4">
                          <p className="text-white font-bold text-sm md:text-base">
                            {movie.title}
                          </p>
                          <p className="text-white/40 text-xs mt-1">
                            {movie.year} • {movie.genre}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ============================================================
                      Active Indicator
                      ============================================================ */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="new-active-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
                    />
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ============================================================
              Navigation Arrows
              ============================================================ */}
          <button 
            className="custom-prev absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 text-white/20 hover:text-white/60 text-3xl md:text-4xl transition-all hover:scale-110 hidden md:block"
            aria-label="Previous"
          >
            ‹
          </button>
          <button 
            className="custom-next absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 text-white/20 hover:text-white/60 text-3xl md:text-4xl transition-all hover:scale-110 hidden md:block"
            aria-label="Next"
          >
            ›
          </button>

        </div>

        {/* ============================================================
            Pagination Dots
            ============================================================ */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {MOVIES.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`
                transition-all duration-500 rounded-full
                ${activeIndex === index 
                  ? "w-6 h-1.5 bg-blue-500 shadow-lg shadow-blue-500/30" 
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }
              `}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}