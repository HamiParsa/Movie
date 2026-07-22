"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// Movie Data
// ============================================================
const MOVIES = [
  {
    id: 1,
    title: "Fight Club",
    poster:
      "https://m.media-amazon.com/images/I/61JuNAoksmL._UF894,1000_QL80_.jpg",
    year: "1999",
    genre: "Drama",
    rating: "8.8",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/spiderman_no_way_home_ver22_500x749.jpg?v=1693413935",
    year: "2021",
    genre: "Action",
    rating: "8.2",
  },
  {
    id: 3,
    title: "Ratatouille",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/8369e977f336e08d60913e0b5c22057b_edf92f4d-b32b-4eab-b820-b948058fc6fc_500x749.jpg?v=1573593631",
    year: "2007",
    genre: "Animation",
    rating: "8.1",
  },
  {
    id: 4,
    title: "Soul",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan009_ee8f8446-bc66-48f6-accc-d6d2210a4557_500x749.jpg?v=1672862954",
    year: "2020",
    genre: "Animation",
    rating: "8.0",
  },
  {
    id: 5,
    title: "I Want to Eat Your Pancreas",
    poster:
      "https://image.tmdb.org/t/p/original/gRvjvpblfJN3FXXnUX5ADJ0sVXl.jpg",
    year: "2018",
    genre: "Drama",
    rating: "8.5",
  },
  {
    id: 6,
    title: "Happy Death Day",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/f0e1c31c2376ca212fbef6c037ac6726_5b8025b9-1a78-43b6-9adc-b099f5afaffb_500x749.jpg?v=1573651291",
    year: "2017",
    genre: "Horror",
    rating: "6.6",
  },
  {
    id: 7,
    title: "Joker",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/924607fa629851bc686d925ab8a63e70_500x749.jpg?v=1573572635",
    year: "2019",
    genre: "Drama",
    rating: "8.4",
  },
  {
    id: 8,
    title: "The Matrix",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/the-matrix-resurrections_pk1zzzos_500x749.jpg?v=1639602774",
    year: "1999",
    genre: "Sci-Fi",
    rating: "8.7",
  },
];

// ============================================================
// Top Rated Component
// ============================================================
export default function TopRated() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-black relative overflow-hidden">
      
      {/* ============================================================
          Background Glow
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl" />
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
            <div className="w-1 h-6 bg-amber-500 rounded-full" />
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              Top Rated
            </h2>
            <FaStar className="text-amber-500 text-xl md:text-2xl animate-pulse" />
          </div>
          
          <div className="flex items-center gap-2 text-white/20 text-sm">
            <span className="hidden md:inline">Best of the best</span>
            <span className="text-amber-500/40">→</span>
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
              delay: 4000,
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
                      className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent"
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

                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/80 backdrop-blur-sm text-black text-[8px] md:text-[10px] font-bold tracking-wider flex items-center gap-0.5">
                      <FaStar className="text-[6px] md:text-[8px]" />
                      {movie.rating}
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
                          <div className="flex items-center justify-center gap-1 mt-1.5 text-amber-500 text-xs">
                            <FaStar />
                            <span>{movie.rating}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ============================================================
                      Active Indicator
                      ============================================================ */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="top-active-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"
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
                  ? "w-6 h-1.5 bg-amber-500 shadow-lg shadow-amber-500/30" 
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