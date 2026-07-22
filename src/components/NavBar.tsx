"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ============================================================
// Navigation Links
// ============================================================
const LINKS = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "About", href: "/about" },
];

// ============================================================
// Navbar Component
// ============================================================
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`
        fixed top-0 left-0 w-full z-50 px-4 py-4 transition-all duration-500
        ${scrolled || isOpen
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
        }
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* ============================================================
            Logo - Just text with dot
            ============================================================ */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Homepage"
        >
          <span className="text-2xl font-light tracking-widest text-white">
            <span className="font-bold">✦</span> CINE
          </span>
          <span className="text-white/20 text-xs tracking-[0.3em] group-hover:text-white/40 transition-colors">
            / STUDIO
          </span>
        </Link>

        {/* ============================================================
            Desktop Navigation - Clean & Simple
            ============================================================ */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.name} className="relative">
              <Link
                href={link.href}
                className={`
                  text-sm tracking-wide transition-all duration-300
                  ${isActive(link.href)
                    ? "text-white"
                    : "text-white/40 hover:text-white/80"
                  }
                `}
              >
                {link.name}
              </Link>

              {/* Simple dot indicator */}
              {isActive(link.href) && (
                <motion.div
                  layoutId="dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* ============================================================
            Mobile Toggle - Simple lines
            ============================================================ */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-5 h-[1.5px] bg-white rounded-full block"
          />
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
              width: isOpen ? 0 : "70%",
            }}
            transition={{ duration: 0.3 }}
            className="h-[1.5px] bg-white/60 rounded-full block"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-5 h-[1.5px] bg-white rounded-full block"
          />
        </button>
      </div>

      {/* ============================================================
          Mobile Menu - Clean overlay
          ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-6 pb-4 border-t border-white/5 mt-3">
              <ul className="flex flex-col gap-1">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center justify-between py-3 px-2 rounded-lg
                        transition-all duration-300
                        ${isActive(link.href)
                          ? "text-white bg-white/5"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <span className="text-base tracking-wide">{link.name}</span>
                      <span className="text-xs text-white/10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}