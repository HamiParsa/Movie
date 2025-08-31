"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa6";

const movies = [
  {
    id: 1,
    title: "Fight Club",
    poster:
      "https://m.media-amazon.com/images/I/61JuNAoksmL._UF894,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "SpiderMan No Way Home",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/spiderman_no_way_home_ver22_500x749.jpg?v=1693413935",
  },
  {
    id: 3,
    title: "Ratatouille",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/8369e977f336e08d60913e0b5c22057b_edf92f4d-b32b-4eab-b820-b948058fc6fc_500x749.jpg?v=1573593631",
  },
  {
    id: 4,
    title: "Soul",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan009_ee8f8446-bc66-48f6-accc-d6d2210a4557_500x749.jpg?v=1672862954",
  },
  {
    id: 5,
    title: "IWantToEatYourPancreas",
    poster:
      "https://image.tmdb.org/t/p/original/gRvjvpblfJN3FXXnUX5ADJ0sVXl.jpg",
  },
  {
    id: 6,
    title: "Happy Death Day",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/f0e1c31c2376ca212fbef6c037ac6726_5b8025b9-1a78-43b6-9adc-b099f5afaffb_500x749.jpg?v=1573651291",
  },
  {
    id: 7,
    title: "Joker",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/924607fa629851bc686d925ab8a63e70_500x749.jpg?v=1573572635",
  },
  {
    id: 8,
    title: "Matrix",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/the-matrix-resurrections_pk1zzzos_500x749.jpg?v=1639602774",
  },
];

function SnakeBorderBox({ children }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto p-4 rounded-md">
      {/* Snake Border */}
      <h1 className="flex justify-center text-center text-2xl w-full text-white">
        Top Rated  <FaStar className="ml-1 mt-1 text-amber-400" />
      </h1>
      <br />
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <linearGradient
              id="rainbowGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="red">
                <animate
                  attributeName="stop-color"
                  values="red;lime;blue;red"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="lime">
                <animate
                  attributeName="stop-color"
                  values="lime;blue;red;lime"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="blue">
                <animate
                  attributeName="stop-color"
                  values="blue;red;lime;blue"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            fill="none"
            stroke="url(#rainbowGradient)"
            strokeWidth="4"
            rx="6"
          />
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function UltraPremiumHoverCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-black p-4 md:p-8">
      <SnakeBorderBox>
        <Swiper
          modules={[FreeMode, Navigation]}
          freeMode={true}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 1.5, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2.5, spaceBetween: 18 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 25 },
            1536: { slidesPerView: 5, spaceBetween: 30 },
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          className="relative z-10"
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div
                className="relative transition-transform duration-500 group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className={`w-full aspect-[2/3] object-cover rounded-sm shadow-lg transition-all duration-500
                      ${
                        hoveredIndex === index
                          ? "scale-110 shadow-[0_0_30px_rgba(0,255,255,0.7)]"
                          : ""
                      }`}
                  />

                  {/* نور لیزری */}
                  {hoveredIndex === index && (
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan pointer-events-none"></span>
                  )}
                </div>

                {/* Overlay متن */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-sm">
                    <p className="text-white font-bold text-lg md:text-xl text-center animate-typing whitespace-nowrap overflow-hidden border-r-2 border-white/70 pr-2">
                      {movie.title}
                    </p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrow Indicators سفید */}
        <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl opacity-80 cursor-pointer z-20">
          &#10094;
        </div>
        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl opacity-80 cursor-pointer z-20">
          &#10095;
        </div>
      </SnakeBorderBox>

      {/* انیمیشن‌ها */}
      <style jsx>{`
        .animate-typing {
          width: 0;
          animation: typing 2s steps(20, end) forwards,
            blink 0.8s step-end infinite;
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
