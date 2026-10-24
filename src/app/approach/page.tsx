import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import ApproachSection from "@/components/ApproachSection";
import {
  Sparkles,
  HeartHandshake,
  Compass,
  CheckCircle2,
  CalendarCheck,
  ShieldCheck,
  Activity,
  Smile,
  Target,
  Users
} from "lucide-react";
import { CENTRE_LOCATION, CENTRE_PHONE } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/approach", {
    title: "Our Approach & Methodology | Hunky Dory",
    description: "Explore our structured, evidence-informed learning approach. Understand how we assess, plan, engage, monitor, and celebrate child milestones in Mohali."
  });
}

const pillars = [
  {
    title: "Regulation Precedes Learning",
    desc: "A dysregulated brain cannot absorb academic or therapy instruction. We prioritize sensory equilibrium, emotional safety, and physical comfort first so learning feels effortless.",
    icon: <Activity className="w-6 h-6 text-emerald-600" />,
    badge: "Sensory-First"
  },
  {
    title: "Neurodiversity-Affirming Mindset",
    desc: "We do not believe in 'fixing' or forcing conformity. We celebrate unique neurotypes, validate diverse expressions, and focus on functional communication, autonomy, and happiness.",
    icon: <Smile className="w-6 h-6 text-amber-600" />,
    badge: "Affirming"
  },
  {
    title: "Multidisciplinary Synergy",
    desc: "Speech pathologists, occupational therapists, and special educators work together rather than in silos. Your child receives a unified, cohesive intervention strategy.",
    icon: <Users className="w-6 h-6 text-purple-600" />,
    badge: "Collaborative"
  },
  {
    title: "Parent As Co-Therapist",
    desc: "A child spends 2-4 hours a week in therapy and 160+ hours with family. We empower parents with actionable home strategies, daily tips, and continuous support.",
    icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
    badge: "Partnership"
  }
];

export default function ApproachPage() {
  return (
    <SiteLayout>
      <PageHeader
        badgeText="Methodology & Ethos"
        title="Our Child-Centred"
        highlightedWord="Learning Approach"
        description="A structured, collaborative, and evidence-informed methodology designed to build emotional regulation, communication confidence, and joyful progress."
        breadcrumbLabel="Our Approach"
      />

      {/* Main 6-Step Interactive Approach Section with Confetti Celebration */}
      <ApproachSection />

      {/* 4 Foundational Philosophy Pillars */}
      <section className="py-16 md:py-24 bg-white border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Core Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Four Pillars of Our Clinical & Educational Practice
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Every session, activity, and therapy plan at Hunky Dory is anchored by these four non-negotiable principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-100/90 hover:border-amber-300 warm-shadow transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-200 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-100/80 text-amber-800">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Assessment to Celebration Workflow Banner */}
      <section className="py-16 bg-[#0B1E36] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Target className="w-3.5 h-3.5" />
            <span>Ready to Begin Step 1?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Schedule an Assessment with Our Mohali Team
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Experience our compassionate approach firsthand. We begin with a gentle, child-led discovery session where we observe your child&apos;s strengths and comfort zones.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book an Initial Assessment</span>
            </Link>
            <Link
              href="/centre"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <span>Explore Our Centre</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
