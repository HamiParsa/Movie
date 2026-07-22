"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FaArrowTrendUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// Movie Data
// ============================================================
const MOVIES = [
  {
    id: 1,
    title: "Wonka",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/wonka_hjmhe2tk_500x749.jpg?v=1703001703",
    year: "2023",
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "We Live In Time",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/we-live-in-time_dfvsiaix_500x749.jpg?v=1740687984",
    year: "2024",
    genre: "Drama",
  },
  {
    id: 3,
    title: "Furiosa",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/furiosa-a-mad-max-saga_8mwswrhb-_1_500x749.jpg?v=1707785008",
    year: "2024",
    genre: "Action",
  },
  {
    id: 4,
    title: "Inside Out 2",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/inside-out-2_g44lec92_500x749.jpg?v=1722282562",
    year: "2024",
    genre: "Animation",
  },
  {
    id: 5,
    title: "Venom",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/venom-the-last-dance_90m5c26k_500x749.jpg?v=1718373670",
    year: "2024",
    genre: "Action",
  },
  {
    id: 6,
    title: "Moana 2",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/moana-2_h5f8f8rg_500x749.jpg?v=1728070136",
    year: "2024",
    genre: "Animation",
  },
  {
    id: 7,
    title: "The Wild Robot",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/wild_robot_500x749.jpg?v=1710787263",
    year: "2024",
    genre: "Sci-Fi",
  },
  {
    id: 8,
    title: "Deadpool & Wolverine",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/deadpool-wolverine_866a70e7-fb48-4f35-a44b-41594691ac76_500x749.jpg?v=1724680738",
    year: "2024",
    genre: "Comedy",
  },
];

// ============================================================
// Trending Movies Component
// ============================================================
export default function TrendingMovies() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-black relative overflow-hidden">
      
      {/* ============================================================
          Background Glow
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
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
            <div className="w-1 h-6 bg-yellow-500 rounded-full" />
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              Trending Now
            </h2>
            <FaArrowTrendUp className="text-yellow-500 text-xl md:text-2xl animate-pulse" />
          </div>
          
          <div className="flex items-center gap-2 text-white/20 text-sm">
            <span className="hidden md:inline">Discover</span>
            <span className="text-yellow-500/40">→</span>
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
              delay: 3000,
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
                      className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 via-transparent to-transparent"
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
                      layoutId="active-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"
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
                  ? "w-6 h-1.5 bg-yellow-500 shadow-lg shadow-yellow-500/30" 
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