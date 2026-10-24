import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import ContactAppointmentSection from "@/components/ContactAppointmentSection";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  Navigation,
  Sparkles
} from "lucide-react";
import {
  CENTRE_LOCATION,
  CENTRE_PHONE,
  CENTRE_EMAIL
} from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/contact", {
    title: "Contact Us & Book an Assessment | Hunky Dory Mohali",
    description: "Schedule an initial developmental assessment or get in touch with Hunky Dory Special Children Center in 156, Phase 4, Mohali. Call 8725002488."
  });
}

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        badgeText="Get In Touch"
        title="Schedule an Assessment &"
        highlightedWord="Connect With Us"
        description="Whether you have questions about our services, want to book an initial assessment, or wish to schedule a walkthrough of our Mohali centre, our compassionate team is here to help."
        breadcrumbLabel="Contact"
      />

      {/* Quick Direct Info Strip */}
      <section className="bg-white py-10 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Phone */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-amber-100/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Direct Phone</p>
                <a
                  href={`tel:${CENTRE_PHONE}`}
                  className="font-black text-base text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  {CENTRE_PHONE}
                </a>
                <p className="text-[11px] text-slate-500 mt-0.5">Call or WhatsApp</p>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-amber-100/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Email Us</p>
                <a
                  href={`mailto:${CENTRE_EMAIL}`}
                  className="font-bold text-sm text-slate-900 hover:text-amber-700 transition-colors break-all"
                >
                  {CENTRE_EMAIL}
                </a>
                <p className="text-[11px] text-slate-500 mt-0.5">Quick 24h response</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-amber-100/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-800 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Mohali Campus</p>
                <p className="font-bold text-sm text-slate-900">{CENTRE_LOCATION}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Mohali, Punjab</p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-amber-100/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Center Timings</p>
                <p className="font-bold text-sm text-slate-900">Mon – Sat: 9am – 6:30pm</p>
                <p className="text-[11px] text-slate-500 mt-0.5">By Appointment</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Interactive Form Component */}
      <ContactAppointmentSection />

      {/* Tricity Coverage & Reassurance */}
      <section className="py-14 bg-gradient-to-b from-[#FFFDF9] to-white border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0B1E36] p-6 sm:p-12 text-white text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Navigation className="w-3.5 h-3.5" />
              <span>Chandigarh Tricity Regional Service</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold max-w-2xl mx-auto">
              Welcoming Families Across Mohali, Chandigarh, Panchkula & Beyond
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Our 156, Phase 4 campus is centrally accessible from all sectors of Chandigarh, Mohali phases, Zirakpur, and Kharar. Dedicated parking and peaceful residential environment ensure a stress-free arrival.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-amber-300">
              <span className="bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">✓ Confidential Consultations</span>
              <span className="bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">✓ Zero Long-Term Obligation</span>
              <span className="bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">✓ Certified Therapists</span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
