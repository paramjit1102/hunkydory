import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Sparkles, MapPin, Phone } from "lucide-react";
import { CENTRE_LOCATION, CENTRE_PHONE } from "@/lib/constants";

interface PageHeaderProps {
  badgeText: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightedWord?: string;
  description: string;
  breadcrumbLabel: string;
}

export default function PageHeader({
  badgeText,
  badgeIcon,
  title,
  highlightedWord,
  description,
  breadcrumbLabel,
}: PageHeaderProps) {
  return (
    <div className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FFFDF9] to-[#FFFDF9] border-b border-amber-100/80 pt-7 pb-9 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Decorative Warm Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-amber-700 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-amber-600" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="text-amber-800 font-extrabold truncate max-w-[180px] xs:max-w-none" aria-current="page">
              {breadcrumbLabel}
            </li>
          </ol>
        </nav>

        {/* Content Header Grid */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-[11px] sm:text-xs font-black uppercase tracking-wider border border-amber-200">
            {badgeIcon || <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
            <span>{badgeText}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {title}{" "}
            {highlightedWord && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600">
                {highlightedWord}
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Quick Contact & Location Ribbon */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-amber-200/60 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-2.5 xs:gap-4 sm:gap-8 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <span>{CENTRE_LOCATION}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </span>
            <a href={`tel:${CENTRE_PHONE}`} className="hover:text-emerald-700 transition-colors">
              Direct Helpline: {CENTRE_PHONE}
            </a>
          </div>
          <div className="text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 hidden md:inline-block">
            Every Child Can Learn • Every Child Can Shine
          </div>
        </div>

      </div>
    </div>
  );
}
