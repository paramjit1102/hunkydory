"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarCheck, Phone, MapPin, Sun, ShieldCheck } from "lucide-react";
import { CENTRE_LOCATION, CENTRE_PHONE } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);
  const pathname = usePathname();

  // Check if staff/admin is currently authenticated
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setIsStaffLoggedIn(true);
        } else {
          setIsStaffLoggedIn(false);
        }
      })
      .catch(() => {
        setIsStaffLoggedIn(false);
      });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Programs", href: "/programs" },
    { name: "Our Approach", href: "/approach" },
    { name: "Centre", href: "/centre" },
    { name: "Parents", href: "/parents" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Banner Bar with Mohali Location & Direct Phone */}
      <div className="bg-[#0B1E36] text-white py-1 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="flex items-center gap-1 text-amber-300 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{CENTRE_LOCATION}</span>
            </span>
            <span className="hidden md:inline-block text-slate-400">•</span>
            <span className="hidden md:inline-block text-emerald-300 truncate">
              Special Children Center & Learning Hub
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${CENTRE_PHONE}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Phone className="w-3 h-3 text-white" />
              </span>
              <span className="tracking-tight">{CENTRE_PHONE}</span>
            </a>
            {isStaffLoggedIn && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white underline pl-1 sm:pl-2"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Staff Portal</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-200/60 py-2 sm:py-2.5"
            : "bg-[#FFFBF5]/95 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-amber-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Colorful Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-0.5 sm:p-1 shrink-0"
              aria-label="Hunky Dory - Home"
            >
              <div className="relative flex items-center">
                {/* Cheerful Sun Icon */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-900 shadow-md mr-1.5 sm:mr-2 shrink-0 animate-spin-slow">
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] tracking-widest font-black uppercase text-[#451a03] leading-none">
                    EVERYTHING IS
                  </span>
                  
                  {/* Colorful Playful Bubble Letters: HUNKY DORY */}
                  <div className="text-lg xs:text-xl sm:text-2xl font-black tracking-tight leading-none mt-0.5 select-none whitespace-nowrap">
                    <span className="bubble-letter text-[#0284c7]">H</span>
                    <span className="bubble-letter text-[#f59e0b]">U</span>
                    <span className="bubble-letter text-[#16a34a]">N</span>
                    <span className="bubble-letter text-[#ef4444]">K</span>
                    <span className="bubble-letter text-[#06b6d4]">Y</span>
                    <span className="mx-0.5 sm:mx-1 text-slate-300"> </span>
                    <span className="bubble-letter text-[#7c3aed]">D</span>
                    <span className="bubble-letter text-[#f97316]">O</span>
                    <span className="bubble-letter text-[#ec4899]">R</span>
                    <span className="bubble-letter text-[#f43f5e]">Y</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs sm:text-sm font-bold transition-all px-2.5 py-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      active
                        ? "text-[#0284C7] bg-sky-50 font-extrabold shadow-xs border border-sky-100"
                        : "text-slate-700 hover:text-[#0284C7] hover:bg-amber-50/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button (Tablet & Desktop) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#E11D48] hover:from-[#D97706] hover:to-[#BE123C] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-md shadow-orange-200 hover:shadow-lg transition-all flex items-center gap-1.5 sm:gap-2 transform active:scale-95 whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Book an Assessment</span>
              </Link>
            </div>

            {/* Mobile Menu & Book Triggers */}
            <div className="flex items-center gap-1.5 lg:hidden shrink-0">
              <Link
                href="/contact"
                className="bg-[#EA580C] text-white font-bold text-[11px] xs:text-xs px-2.5 xs:px-3 py-1.5 rounded-full flex items-center gap-1 sm:hidden whitespace-nowrap shadow-xs active:scale-95 transition-transform"
              >
                <span>Book</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer & Backdrop */}
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[88px] sm:top-[98px] bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <div className="relative z-50 lg:hidden border-b border-amber-200 bg-[#FFFBF5] px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-5.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                        active
                          ? "bg-amber-100 text-amber-900 font-extrabold"
                          : "text-slate-700 hover:bg-amber-100/60 hover:text-amber-900"
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-amber-600" />}
                    </Link>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-amber-200 flex flex-col gap-2.5">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-transform"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book an Assessment</span>
                  </Link>

                  <a
                    href={`tel:${CENTRE_PHONE}`}
                    className="w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {CENTRE_PHONE} ({CENTRE_LOCATION})</span>
                  </a>

                  {isStaffLoggedIn && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center justify-center gap-1.5 transition-colors border border-amber-200"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Staff & Admin Portal</span>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}
