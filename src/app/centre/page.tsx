import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import CentreSection from "@/components/CentreSection";
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  Navigation,
  Heart
} from "lucide-react";
import {
  CENTRE_LOCATION,
  CENTRE_PHONE,
  CENTRE_EMAIL
} from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/centre", {
    title: "About Our Centre | Hunky Dory Special Children Center Mohali",
    description: "Explore Hunky Dory's purpose-designed sensory and learning facility in 156, Phase 4, Mohali. Tour our Sensory Room, Therapy Suites, and Child-Friendly Learning Zones."
  });
}

const safetyFeatures = [
  "Wheelchair accessible doorways, low threshold ramps, and tactile flooring",
  "Rounded soft furniture corners and non-toxic, child-safe sensory toys",
  "Acoustically treated quiet zones with distraction-minimized walls",
  "High-efficiency air circulation, clean sanitization protocols, and CCTV monitoring",
  "Calming dimmable LED lighting designed to avoid fluorescent flicker triggers",
  "Dedicated emergency first aid and child-safety certified educators"
];

export default function CentrePage() {
  return (
    <SiteLayout>
      <PageHeader
        badgeText="Physical Learning Environment"
        title="Purpose-Designed Learning &"
        highlightedWord="Sensory Haven"
        description="Our centre in 156, Phase 4, Mohali has been purposefully engineered to reduce sensory overload, spark natural curiosity, and provide a secure, joyful space for developmental growth."
        breadcrumbLabel="Centre"
      />

      {/* Main Centre Environment Section (with tabs and pillars) */}
      <CentreSection />

      {/* Campus Safety, Hygiene & Accessibility Guarantees */}
      <section className="py-16 md:py-24 bg-[#FFFDF9] border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Health & Safety Standards</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Safety, Dignity & Comfort Above All Else
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                We believe that physical spaces have a profound impact on a neurodivergent child&apos;s nervous system. Every texture, lighting source, and corner of our Mohali centre was selected with therapeutic intention.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book a Campus Walkthrough</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Facility Infrastructure Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {safetyFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#FFFDF9] border border-amber-100 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Location & Visiting Details */}
      <section className="py-16 md:py-20 bg-white border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Visit Us in Mohali</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Visiting Our Mohali Learning Hub
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Conveniently situated in 156, Phase 4, Mohali—accessible within minutes from all sectors of Chandigarh, Mohali, Panchkula, and Kharar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Address */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Campus Address</h3>
                <p className="text-sm font-semibold text-amber-700">{CENTRE_LOCATION}</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Located near central arterial roads of Phase 4, offering smooth vehicular parking and serene, residential surroundings.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
                >
                  <span>View Map & Directions →</span>
                </Link>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Working & Session Hours</h3>
                <p className="text-sm font-semibold text-emerald-700">Mon – Sat: 9:00 AM – 6:30 PM</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Sessions are scheduled by appointment to maintain small groups and dedicated 1-on-1 therapist focus. Sunday by special appointment.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100">
                <span className="text-xs font-bold text-emerald-800 inline-flex items-center gap-1">
                  <span>Flexible After-School Slots Available</span>
                </span>
              </div>
            </div>

            {/* Helpline */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-800 mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Direct Parent Helpline</h3>
                <a
                  href={`tel:${CENTRE_PHONE}`}
                  className="text-lg font-black text-sky-700 hover:text-sky-800 transition-colors block"
                >
                  {CENTRE_PHONE}
                </a>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Email us anytime at: <span className="font-semibold text-slate-700">{CENTRE_EMAIL}</span>
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100">
                <a
                  href={`tel:${CENTRE_PHONE}`}
                  className="text-xs font-bold text-sky-800 hover:text-sky-900 inline-flex items-center gap-1"
                >
                  <span>Call to Schedule Visit →</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0B1E36] to-[#112D4E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Come and Experience the Warmth of Hunky Dory
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            We welcome parents to visit, inspect our sensory room, and meet our caring therapists before making any decisions.
          </p>
          <div>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Schedule a Free Centre Tour</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
