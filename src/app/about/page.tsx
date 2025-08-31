"use client";
import React from "react";
import { FaFilm, FaUsers, FaBullseye, FaRegSmile } from "react-icons/fa";

const AboutPage = () => (
  <div className="bg-black text-white min-h-screen">
    {/* Page header with background image and title */}
    <header className="relative bg-[url('https://source.unsplash.com/1600x900/?cinema,movie')] bg-cover bg-center h-[300px] flex items-center justify-center">
      <h1 className="text-5xl font-extrabold bg-black/40 px-6 py-2 rounded-md">
        About Us
      </h1>
    </header>

    {/* Main content section */}
    <section className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Intro paragraph */}
      <p className="text-lg leading-relaxed">
        Welcome to our world of movies! This platform was created for true
        cinema lovers. Here, you’ll find trending films, curated genres, and a
        unique cinematic experience right at your fingertips. Our goal is to
        bring the big screen feeling into the digital space.
      </p>

      {/* Info cards with icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Why This Website? */}
        <div className="flex items-start space-x-4">
          <FaFilm className="text-4xl text-yellow-400" />
          <div>
            <h2 className="text-2xl font-semibold">Why This Website?</h2>
            <p className="mt-2 text-gray-300">
              Because movies are more than just stories—they’re emotions,
              adventures, and experiences. We want to keep that passion alive
              with a sleek design and quality content.
            </p>
          </div>
        </div>

        {/* Card 2: Our Mission */}
        <div className="flex items-start space-x-4">
          <FaBullseye className="text-4xl text-yellow-400" />
          <div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-gray-300">
              To bring you trending titles, personalized recommendations, and a
              stunning cinematic design that makes browsing movies exciting and
              fun.
            </p>
          </div>
        </div>

        {/* Card 3: The Creator */}
        <div className="flex items-start space-x-4">
          <FaUsers className="text-4xl text-yellow-400" />
          <div>
            <h2 className="text-2xl font-semibold">The Creator</h2>
            <p className="mt-2 text-gray-300">
              This website is built and designed by{" "}
              <strong>Hami Parsa</strong>, blending a passion for cinema with
              modern web design and development.
            </p>
          </div>
        </div>

        {/* Card 4: Our Promise */}
        <div className="flex items-start space-x-4">
          <FaRegSmile className="text-4xl text-yellow-400" />
          <div>
            <h2 className="text-2xl font-semibold">Our Promise</h2>
            <p className="mt-2 text-gray-300">
              We are committed to delivering high-quality content, a smooth user
              experience, and a cinematic atmosphere every time you visit.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Contact section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p className="text-gray-300">
          Have an idea, suggestion, or question? We’d love to hear from you:
        </p>
        <ul className="space-y-2">
          <li>
            Email:{" "}
            <a
              href="mailto:info@yourmovie.com"
              className="text-yellow-400 hover:underline"
            >
              info@yourmovie.com
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a href="#" className="text-yellow-400 hover:underline">
              @YourMovieSite
            </a>
          </li>
          <li>
            Twitter:{" "}
            <a href="#" className="text-yellow-400 hover:underline">
              @YourMovieSite
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
);

export default AboutPage;
