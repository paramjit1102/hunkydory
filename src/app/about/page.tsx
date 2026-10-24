import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import {
  Heart,
  Users,
  Target,
  Sparkles,
  Award,
  CalendarCheck,
  Compass,
  GraduationCap,
  Building,
  CheckCircle2
} from "lucide-react";
import { CENTRE_LOCATION, CENTRE_PHONE } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/about", {
    title: "About Us | Hunky Dory Special Children Center",
    description: "Learn about Hunky Dory, our child-centred ethos, neurodiversity-affirming philosophy, and multidisciplinary team supporting children in Mohali and Chandigarh Tricity."
  });
}

export default function AboutPage() {
  const teamRoles = [
    {
      title: "Special Educators",
      desc: "Experts in differentiated instruction, multisensory learning, and tailored curriculum adaptations for diverse learners.",
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Speech & Language Pathologists",
      desc: "Specialists in speech clarity, receptive and expressive language, social pragmatics, and augmentative communication (AAC).",
      icon: <Users className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Occupational Therapists",
      desc: "Focused on fine and gross motor integration, handwriting, sensory processing, and daily independence skills.",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />
    },
    {
      title: "Behavior & Developmental Guides",
      desc: "Compassionate professionals trained in neurodiversity-affirming positive behavior support and emotional self-regulation.",
      icon: <Heart className="w-6 h-6 text-rose-600" />
    }
  ];

  return (
    <SiteLayout>
      <PageHeader
        badgeText="Our Story & Philosophy"
        title="Believing in Strengths."
        highlightedWord="Nurturing Potential."
        description="At Hunky Dory, we see every child as a unique individual filled with latent gifts, distinctive curiosities, and limitless potential. We provide a nurturing, non-judgmental sanctuary where learning is joyful."
        breadcrumbLabel="About Us"
      />

      {/* Main Philosophy & About Section */}
      <AboutSection />

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-[#FFFDF9] border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-200/80 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Our Mission</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-4">
                Empowering Every Child to Shine
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                To provide holistic, individualized, and evidence-informed developmental programs in a sensory-optimized environment. We partner deeply with families to celebrate every step of progress and cultivate lifelong confidence and autonomy.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Respect child autonomy and developmental pacing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Foster functional real-world communication and living skills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Provide transparent, reassuring parent collaboration</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-emerald-200/80 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Our Vision</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-4">
                An Inclusive World That Honors Diversity
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                To be the benchmark for neurodiversity-affirming education and early intervention across Northern India, creating an environment where neurodivergent individuals are embraced, supported, and given every opportunity to thrive.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pioneering sensory-rich educational spaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Championing acceptance over conformity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Equipping children with strong foundational life skills</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Hunky Dory (Pillars) */}
      <WhyChooseSection />

      {/* Multidisciplinary Team Section */}
      <section className="py-16 md:py-24 bg-white border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span>Expert Care Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Collaborative Specialist Team
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Behind every successful child is an ensemble of passionate, certified specialists who meet regularly to align on your child&apos;s Individual Learning Plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamRoles.map((role) => (
              <div
                key={role.title}
                className="bg-[#FFFDF9] rounded-3xl p-6 border-2 border-amber-100 hover:border-amber-300 warm-shadow transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-100 flex items-center justify-center">
                  {role.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action / Visit Campus Callout Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0B1E36] via-[#112D4E] to-[#0B1E36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Building className="w-3.5 h-3.5" />
                <span>Visit Our Centre in {CENTRE_LOCATION}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Want to See Our Learning Spaces in Person?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Take a guided walkthrough of our sensory room, motor play arena, and therapy suites. Meet our warm educators and discover how we can support your child.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Guided Visit</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
