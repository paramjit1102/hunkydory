import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import ParentsSection from "@/components/ParentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import {
  HeartHandshake,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  MessageCircleQuestion,
  Users
} from "lucide-react";
import { CENTRE_PHONE } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/parents", {
    title: "Parents, Community & FAQs | Hunky Dory Special Children Center",
    description: "We partner deeply with parents. Read testimonials, discover what to expect during initial assessments, and browse our parent FAQs in Mohali."
  });
}

const firstVisitSteps = [
  {
    step: "01",
    title: "Gentle Welcome & Free Exploration",
    desc: "We give your child time to freely explore our sensory toys and play zones without rush or clinical pressure."
  },
  {
    step: "02",
    title: "Compassionate Parent Listening Session",
    desc: "A dedicated therapist sits down with you to listen to your observations, concerns, family routines, and hopes."
  },
  {
    step: "03",
    title: "Play-Based Strength Observation",
    desc: "Through gentle interactive games, we observe speech patterns, motor balance, attention span, and sensory responses."
  },
  {
    step: "04",
    title: "Clear, Reassuring Roadmap",
    desc: "We discuss our findings openly with zero judgment, explaining recommended therapy pathways and practical home strategies."
  }
];

export default function ParentsPage() {
  return (
    <SiteLayout>
      <PageHeader
        badgeText="Support & Collaboration"
        title="Supporting Parents."
        highlightedWord="Empowering Children."
        description="You know your child better than anyone. We work hand-in-hand with parents—providing transparent communication, home strategies, and emotional reassurance at every milestone."
        breadcrumbLabel="Parents & FAQ"
      />

      {/* Main Parent Partnership Section */}
      <ParentsSection />

      {/* What to Expect During Your First Visit */}
      <section className="py-16 md:py-24 bg-white border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Step-by-Step Guidance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What to Expect on Your First Visit
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We know visiting a developmental centre can feel overwhelming. We make the experience comfortable, gentle, and empowering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstVisitSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-7 border-2 border-amber-100/90 hover:border-amber-300 warm-shadow transition-all space-y-3"
              >
                <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Parent Testimonials */}
      <TestimonialsSection />

      {/* Comprehensive FAQ Section */}
      <FAQSection />

      {/* Direct Callout Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0B1E36] via-[#112D4E] to-[#0B1E36] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-400/20 text-rose-300 text-xs font-bold border border-rose-400/30">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>We Are Here With You</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            Have Questions About Your Child&apos;s Development?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Our parent counseling desk is available for confidential, non-judgmental guidance. Call us or send a note online.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Contact Us Online</span>
            </Link>
            <a
              href={`tel:${CENTRE_PHONE}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline ({CENTRE_PHONE})</span>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
