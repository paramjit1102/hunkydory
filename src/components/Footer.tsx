"use client";

import React from "react";
import Link from "next/link";
import { Heart, Phone, Mail, MapPin, ShieldCheck, Sun } from "lucide-react";
import {
  CENTRE_LOCATION,
  CENTRE_PHONE,
  CENTRE_EMAIL,
  MOTTO_HEART,
  MOTTO_CLOSING,
  SITE_TAGLINE
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0B1E36] text-slate-300 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-amber-950 shrink-0">
                <Sun className="w-5 h-5 text-amber-900" />
              </div>
              <div className="text-lg xs:text-xl font-black tracking-tight leading-none select-none">
                <span className="bubble-letter text-[#0284c7]">H</span>
                <span className="bubble-letter text-[#f59e0b]">U</span>
                <span className="bubble-letter text-[#16a34a]">N</span>
                <span className="bubble-letter text-[#ef4444]">K</span>
                <span className="bubble-letter text-[#06b6d4]">Y</span>
                <span className="mx-0.5 sm:mx-1"> </span>
                <span className="bubble-letter text-[#7c3aed]">D</span>
                <span className="bubble-letter text-[#f97316]">O</span>
                <span className="bubble-letter text-[#ec4899]">R</span>
                <span className="bubble-letter text-[#f43f5e]">Y</span>
              </div>
            </Link>

            <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40">
              SPECIAL CHILDREN CENTER • {CENTRE_LOCATION}
            </div>

            <p className="text-sm font-extrabold text-[#22c55e]">
              {SITE_TAGLINE}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {MOTTO_HEART} We provide evidence-based, compassionate care for children with diverse learning profiles, ADHD, Autism, Down Syndrome, speech delays, and developmental differences.
            </p>

            <p className="text-xs sm:text-sm italic font-bold text-pink-300 pt-1">
              &ldquo;{MOTTO_CLOSING}&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Pages
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-amber-400 transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-amber-400 transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/centre" className="hover:text-amber-400 transition-colors">
                  About Centre
                </Link>
              </li>
              <li>
                <Link href="/parents" className="hover:text-amber-400 transition-colors">
                  Parents & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Core Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • ADHD & Autism Support
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • Speech & Language
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • Learning Disability
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • Occupational Therapy
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • Behavior Therapy
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • Sensory Intervention
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  • Down Syndrome Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Mohali Centre
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{CENTRE_LOCATION}</p>
                  <p className="text-[11px] text-slate-400">Mohali, Punjab</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <a
                    href={`tel:${CENTRE_PHONE}`}
                    className="font-black text-base text-white hover:text-emerald-300 transition-colors"
                  >
                    {CENTRE_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="break-all">{CENTRE_EMAIL}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Staff & Admin Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Accessibility */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Hunky Dory Special Children Center, {CENTRE_LOCATION}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-[11px] text-slate-400">
            <span>WCAG 2.1 AA Accessible</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 shrink-0" />
              <span>We See Abilities. We Nurture Potential.</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
