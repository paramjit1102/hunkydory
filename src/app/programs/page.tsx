import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import ProgramsSection from "@/components/ProgramsSection";
import {
  Compass,
  Sparkles,
  Baby,
  GraduationCap,
  Users,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  Target,
  FileCheck2
} from "lucide-react";
import { CENTRE_PHONE } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/programs", {
    title: "Programs & Curricula | Hunky Dory Special Children Center",
    description: "Discover our individualized educational and therapy pathways, including Special Education, Speech, OT, Sensory, and Early Intervention programs in Mohali."
  });
}

const ageGroups = [
  {
    title: "Early Intervention",
    age: "Ages 2 – 6 Years",
    tagline: "Foundational neurodevelopmental play and milestone nurturing.",
    desc: "Capitalizing on early neural plasticity, our early intervention sessions build foundational communication, sensory modulation, and cooperative play habits.",
    icon: <Baby className="w-6 h-6 text-amber-600" />,
    badgeBg: "bg-amber-100 text-amber-900",
    features: [
      "Play-based motor coordination",
      "Early speech & language stimulation",
      "Sensory integration routines",
      "Caregiver-assisted play sessions"
    ]
  },
  {
    title: "Primary & Academic Bridge",
    age: "Ages 6 – 12 Years",
    tagline: "Structured special education, dyslexia support, and social emotional growth.",
    desc: "Targeted support for school-going children navigating learning differences, attention deficits, speech clarity issues, and fine-motor handwriting demands.",
    icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
    badgeBg: "bg-emerald-100 text-emerald-900",
    features: [
      "Multisensory reading & math phonics",
      "Executive function coaching",
      "Handwriting Without Tears protocol",
      "Social communication circles"
    ]
  },
  {
    title: "Teens & Life Skills Transition",
    age: "Ages 12 – 18+ Years",
    tagline: "Functional independence, self-advocacy, and practical daily living skills.",
    desc: "Fostering autonomy in personal hygiene, meal preparation, community safety, time management, and emotional self-advocacy for adolescent flourishing.",
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    badgeBg: "bg-indigo-100 text-indigo-900",
    features: [
      "Daily living & domestic autonomy",
      "Community navigation & money handling",
      "Emotional self-advocacy & confidence",
      "Vocational & craft skill building"
    ]
  }
];

export default function ProgramsPage() {
  return (
    <SiteLayout>
      <PageHeader
        badgeText="Individualized Pathways"
        title="Personalized Curricula &"
        highlightedWord="Developmental Programs"
        description="Every child follows a customized roadmap designed around their unique learning profile, developmental readiness, and personal strengths."
        breadcrumbLabel="Programs"
      />

      {/* Main Core Programs Interactive Grid (with details modal) */}
      <ProgramsSection />

      {/* Age Stages & Developmental Brackets */}
      <section className="py-16 md:py-24 bg-[#FFFDF9] border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tailored To Every Stage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Programs Categorized by Age & Readiness
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We meet children at their stage of readiness rather than imposing rigid chronological boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((group) => (
              <div
                key={group.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-100/90 hover:border-amber-300 warm-shadow transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                      {group.icon}
                    </div>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${group.badgeBg}`}>
                      {group.age}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {group.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 mb-4">
                    {group.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {group.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                      Core Program Modules:
                    </span>
                    <ul className="space-y-1.5">
                      {group.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <span>Enquire About {group.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How ILP Works (Individual Learning Plan) */}
      <section className="py-16 md:py-24 bg-white border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-purple-600" />
                <span>The Core of Hunky Dory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                How Our Individual Learning Plan (ILP) Works
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                An ILP is not just a document—it is a living, evolving roadmap crafted specifically for your child. Formulated collaboratively between educators, speech therapists, occupational therapists, and parents.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Start with an ILP Consultation</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  step: "Step 01",
                  title: "Comprehensive Baseline Assessment",
                  desc: "We screen communication, fine/gross motor skills, sensory profile, attention, and social interaction."
                },
                {
                  step: "Step 02",
                  title: "Collaborative SMART Goal Setting",
                  desc: "Therapists and parents establish measurable, achievable quarterly goals (e.g., speech clarity, pencil grasp, sitting tolerance)."
                },
                {
                  step: "Step 03",
                  title: "Multidisciplinary Session Delivery",
                  desc: "Sessions integrate speech, sensory, motor, and academic tasks into joyful play routines."
                },
                {
                  step: "Step 04",
                  title: "Quarterly Milestone Reviews & Celebrations",
                  desc: "We review progress reports with parents every 90 days, recalibrate goals, and celebrate every win."
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-6 border-2 border-amber-100/80 hover:border-amber-300 warm-shadow transition-all flex flex-col xs:flex-row items-start gap-3 sm:gap-4"
                >
                  <span className="px-3 py-1 rounded-xl bg-amber-500 text-white text-xs font-black shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0B1E36] to-[#1E3A8A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Explore the Right Program for Your Child?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Call our Mohali centre at {CENTRE_PHONE} or book an assessment online to meet our specialists.
          </p>
          <div>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book an Evaluation</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
