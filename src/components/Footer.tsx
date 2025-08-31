"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      {/* Upper Section: 4 columns */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">About CineVerse</h2>
          <p className="text-gray-400 text-sm">
            CineVerse is your ultimate destination for movies and series.
            Explore trending, top rated, and upcoming films with a cinematic experience.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Movies</a></li>
            <li><a href="#" className="hover:text-white transition">Series</a></li>
            <li><a href="#" className="hover:text-white transition">Top Rated</a></li>
            <li><a href="#" className="hover:text-white transition">New Releases</a></li>
          </ul>
        </div>

        {/* Genres Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">Genres</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Action</a></li>
            <li><a href="#" className="hover:text-white transition">Comedy</a></li>
            <li><a href="#" className="hover:text-white transition">Horror</a></li>
            <li><a href="#" className="hover:text-white transition">Drama</a></li>
            <li><a href="#" className="hover:text-white transition">Sci-Fi</a></li>
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-gray-400 text-xl">
            {/* Social icons */}
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaYoutube /></a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom Divider Section */}
      <div className="border-t border-gray-800 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <span>Terms of Service | Privacy Policy | Cookies</span>
          <span className="mt-2 md:mt-0">Designed with ❤️ by You</span>
        </div>
      </div>
    </footer>
  );
}
