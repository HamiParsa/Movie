"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiCameraMovie } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useNavStore } from "../app/lib/useNavStore";

const links = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 
  const { activeLink, setActiveLink } = useNavStore();

  
  useEffect(() => {
    const current = links.find((l) => l.href === pathname);
    if (current) {
      setActiveLink(current.name);
    }
  }, [pathname, setActiveLink]);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-black/30 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-white text-3xl font-extrabold tracking-wide cursor-pointer flex"
        >
          Movie
          <BiCameraMovie className="mt-1 ml-1" />
        </Link>

        <ul className="hidden md:flex space-x-8">
          {links.map((link) => (
            <li key={link.name} className="relative">
              <Link
                href={link.href}
                className={`text-white font-medium flex items-center transition-colors duration-300 ${
                  activeLink === link.name ? "text-yellow-400" : ""
                }`}
              >
                {link.name}
              </Link>

              {activeLink === link.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-4px] left-0 w-full h-1 bg-yellow-400 rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/70 backdrop-blur-lg text-white flex flex-col space-y-4 px-6 py-4 overflow-hidden"
          >
            {links.map((link) => (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-medium w-full text-left ${
                    activeLink === link.name ? "text-yellow-400" : ""
                  }`}
                >
                  {link.name}
                </Link>

                {activeLink === link.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
