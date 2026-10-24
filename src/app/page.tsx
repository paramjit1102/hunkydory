import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ProgramsSection from "@/components/ProgramsSection";
import ApproachSection from "@/components/ApproachSection";
import CentreSection from "@/components/CentreSection";
import ParentsSection from "@/components/ParentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactAppointmentSection from "@/components/ContactAppointmentSection";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Heart,
  Building,
  CalendarCheck,
  CheckCircle2,
  Users
} from "lucide-react";
import { CENTRE_LOCATION, CENTRE_PHONE } from "@/lib/constants";

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Hero with Brand Services Board */}
      <Hero />

      {/* About Section with Subpage Link */}
      <AboutSection>
        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm border-2 border-amber-200 transition-all hover:scale-102 max-w-full text-center"
        >
          <span>Learn More About Our Philosophy, Mission & Specialists</span>
          <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
        </Link>
      </AboutSection>

      {/* Why Choose Hunky Dory */}
      <WhyChooseSection />

      {/* Core Programs Section with Link to /programs and /services */}
      <ProgramsSection>
        <Link
          href="/programs"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm border-2 border-emerald-200 transition-all text-center"
        >
          <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Explore All Programs by Age Group</span>
          <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
        </Link>
        <Link
          href="/services"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs sm:text-sm border-2 border-sky-200 transition-all text-center"
        >
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
          <span>View All 10 Therapy Disciplines</span>
          <ArrowRight className="w-4 h-4 text-sky-600 shrink-0" />
        </Link>
      </ProgramsSection>

      {/* Learning Approach Section with Subpage Link */}
      <ApproachSection>
        <Link
          href="/approach"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-amber-200 shadow-xs transition-all hover:scale-102 max-w-full text-center"
        >
          <span>Read Our 4 Foundational Clinical Practice Pillars</span>
          <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
        </Link>
      </ApproachSection>

      {/* Centre Highlights with Link to /centre */}
      <CentreSection>
        <Link
          href="/centre"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs sm:text-sm border-2 border-teal-200 transition-all hover:scale-102 max-w-full text-center"
        >
          <Building className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Discover Sensory Room Features & Mohali Campus Info</span>
          <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
        </Link>
      </CentreSection>

      {/* Parents Partnership & Testimonials */}
      <ParentsSection />
      <TestimonialsSection>
        <Link
          href="/parents"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs sm:text-sm border-2 border-rose-200 transition-all hover:scale-102 max-w-full text-center"
        >
          <Users className="w-4 h-4 text-rose-600 shrink-0" />
          <span>View Full Parent Guide, Resources & FAQ</span>
          <ArrowRight className="w-4 h-4 text-rose-600 shrink-0" />
        </Link>
      </TestimonialsSection>

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Contact & Assessment Form */}
      <ContactAppointmentSection />
    </SiteLayout>
  );
}
