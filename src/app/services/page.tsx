import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import {
  Sparkles,
  Zap,
  Puzzle,
  BookOpen,
  MessageSquare,
  Heart,
  Smile,
  Sun,
  Activity,
  Dumbbell,
  Palette,
  Music,
  Users,
  Trophy,
  CheckCircle,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import {
  BRAND_SERVICES,
  CREATIVE_ACTIVITIES,
  CENTRE_LOCATION,
  CENTRE_PHONE
} from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo-store";

export function generateMetadata() {
  return generatePageMetadata("/services", {
    title: "Our Services | Hunky Dory Special Children Center",
    description: "Explore our 10 specialized therapy and learning services: ADHD, Autism, Speech Therapy, Occupational Therapy, Behavior Therapy, and Sensory Intervention in Mohali."
  });
}

const serviceDetails = [
  {
    name: "ADHD Support",
    tagline: "Channeling energy, sharpening focus, and building executive functions.",
    color: "bg-[#6D28D9]",
    badgeBg: "bg-purple-100 text-purple-800",
    icon: <Zap className="w-6 h-6 text-[#6D28D9]" />,
    challenges: "Inattention, impulsivity, task initiation, hyperactive restlessness, executive dysregulation.",
    interventions: [
      "Structured micro-tasks with visual timers",
      "Sensory motor movement breaks",
      "Impulse control strategies & Zones of Regulation",
      "Executive function coaching and organization tools"
    ],
    outcomes: "Enhanced sustained focus, smoother transitions, improved school performance, and confident self-regulation."
  },
  {
    name: "Autism Spectrum Support",
    tagline: "Neurodiversity-affirming guidance tailored for natural strengths and genuine connection.",
    color: "bg-[#0284C7]",
    badgeBg: "bg-sky-100 text-sky-800",
    icon: <Puzzle className="w-6 h-6 text-[#0284C7]" />,
    challenges: "Social communication barriers, sensory overload, repetitive patterns, emotional regulation, transitions.",
    interventions: [
      "Visual schedules and AAC communication supports",
      "Sensory-friendly low-arousal learning zones",
      "Special interest-driven social interaction games",
      "Compassionate, non-masking developmental support"
    ],
    outcomes: "Empowered self-expression, reduced anxiety, meaningful peer connections, and strong communicative autonomy."
  },
  {
    name: "Learning Disability Support",
    tagline: "Personalized academic pathways for dyslexia, dyscalculia, and cognitive processing differences.",
    color: "bg-[#15803D]",
    badgeBg: "bg-green-100 text-green-800",
    icon: <BookOpen className="w-6 h-6 text-[#15803D]" />,
    challenges: "Reading difficulties, phonological awareness gaps, handwriting challenges, math conceptualization, working memory.",
    interventions: [
      "Multisensory Orton-Gillingham inspired phonics",
      "Tactile math manipulatives and visual reasoning",
      "Assistive technology & audio-visual learning aids",
      "Individualized learning plans (ILPs) with step pacing"
    ],
    outcomes: "Rekindled love for learning, academic resilience, boosted literacy and numeracy, and restored self-esteem."
  },
  {
    name: "Speech & Language Therapy",
    tagline: "Unlocking functional communication, articulation clarity, and expressive language.",
    color: "bg-[#EA580C]",
    badgeBg: "bg-orange-100 text-orange-800",
    icon: <MessageSquare className="w-6 h-6 text-[#EA580C]" />,
    challenges: "Speech delays, stuttering/fluency, apraxia of speech, receptive comprehension, non-verbal communication.",
    interventions: [
      "Oral motor exercises and phonetic placement",
      "Augmentative and Alternative Communication (AAC)",
      "Play-based receptive and expressive language modeling",
      "Social communication pragmatics circles"
    ],
    outcomes: "Clearer articulation, confident social interaction, ability to express needs and thoughts without frustration."
  },
  {
    name: "Behavior Therapy",
    tagline: "Positive behavioral support rooted in emotional understanding and connection.",
    color: "bg-[#E11D48]",
    badgeBg: "bg-rose-100 text-rose-800",
    icon: <Heart className="w-6 h-6 text-[#E11D48]" />,
    challenges: "Meltdowns, aggressive expressions, severe frustration, resistance to routines, separation anxiety.",
    interventions: [
      "Antecedent-Behavior-Consequence functional analysis",
      "Replacement behavior coaching",
      "Emotional validation and co-regulation practices",
      "Parent partnership for home consistency"
    ],
    outcomes: "Calm responses to stress, constructive emotional expression, collaborative home and classroom participation."
  },
  {
    name: "Down Syndrome Support",
    tagline: "Holistic developmental stimulation strengthening foundational cognitive and motor milestones.",
    color: "bg-[#D97706]",
    badgeBg: "bg-amber-100 text-amber-800",
    icon: <Smile className="w-6 h-6 text-[#D97706]" />,
    challenges: "Hypotonia (low muscle tone), speech delays, developmental pacing differences, fine motor coordination.",
    interventions: [
      "Physical and oral motor muscle strengthening",
      "Play-based cognitive stimulation and memory reinforcement",
      "Social-emotional play circles and rhythm activities",
      "Visual instruction kits suited to visual learners"
    ],
    outcomes: "Accelerated developmental milestones, physical stamina, rich social bonding, and growing everyday independence."
  },
  {
    name: "Daily Living Skills Training",
    tagline: "Empowering children to master self-care, personal hygiene, and daily routines with autonomy.",
    color: "bg-[#0D9488]",
    badgeBg: "bg-teal-100 text-teal-800",
    icon: <Sun className="w-6 h-6 text-[#0D9488]" />,
    challenges: "Feeding struggles, dressing difficulty, grooming, utensil manipulation, lack of routine independence.",
    interventions: [
      "Chained backward and forward task sequencing",
      "Simulated home environment practice stations",
      "Adaptive utensils, button hooks, and visual checklists",
      "Safety awareness and community orientation"
    ],
    outcomes: "Pride in personal independence, relief for caregivers, and practical life skills that last a lifetime."
  },
  {
    name: "Sensory Intervention",
    tagline: "Calming sensory overloads and stimulating under-responsiveness in our dedicated Sensory Room.",
    color: "bg-[#65A30D]",
    badgeBg: "bg-lime-100 text-lime-900",
    icon: <Sparkles className="w-6 h-6 text-[#65A30D]" />,
    challenges: "Sensory seeking, sensory avoidance, tactile defensiveness, auditory sensitivity, vestibular instability.",
    interventions: [
      "Therapeutic swings, crash pads, and balance beams",
      "Fiber optic lights, bubble tubes, and soothing acoustics",
      "Tactile bins, weighted vests, and deep pressure therapy",
      "Tailored sensory diets formulated for school and home"
    ],
    outcomes: "Optimal nervous system regulation, extended attention span, reduced sensory meltdowns, and emotional serenity."
  },
  {
    name: "Occupational Therapy",
    tagline: "Fine motor precision, bilateral coordination, and visual-motor integration for real-world tasks.",
    color: "bg-[#4F46E5]",
    badgeBg: "bg-indigo-100 text-indigo-800",
    icon: <Activity className="w-6 h-6 text-[#4F46E5]" />,
    challenges: "Poor pencil grip, handwriting fatigue, weak hand strength, difficulty with scissors, hand-eye coordination.",
    interventions: [
      "Hand muscle strengthening through therapeutic putty and clay",
      "Scissor skills, buttoning, and bead threading exercises",
      "Handwriting Without Tears developmental protocols",
      "Bilateral integration and midline crossing activities"
    ],
    outcomes: "Confident handwriting, precise finger dexterity, effortless utensil control, and classroom readiness."
  },
  {
    name: "Physical Therapy",
    tagline: "Gross motor agility, posture, balance, and physical confidence.",
    color: "bg-[#1D4ED8]",
    badgeBg: "bg-blue-100 text-blue-800",
    icon: <Dumbbell className="w-6 h-6 text-[#1D4ED8]" />,
    challenges: "Unsteady gait, frequent tripping, poor core strength, toe-walking, motor planning dyspraxia.",
    interventions: [
      "Obstacle courses and balance board navigation",
      "Core stability exercises and therapeutic ball activities",
      "Gait training and corrective kinetic movement",
      "Endurance building through fun sports play"
    ],
    outcomes: "Sturdy balance, bodily awareness, active participation in playground play, and robust physical endurance."
  }
];

export default function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        badgeText="10 Specialized Core Disciplines"
        title="Comprehensive Therapy &"
        highlightedWord="Developmental Services"
        description="Every child's developmental profile is different. At Hunky Dory Mohali, we combine speech, occupational, sensory, and behavioral disciplines into one harmonious, child-centred care plan."
        breadcrumbLabel="Our Services"
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Evidence-Based Interventions</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our 10 Core Services & Support Areas
            </h2>
            <p className="text-slate-600 text-sm sm:text-lg">
              Delivered by certified therapists in 1-on-1 and small group sessions designed for safety, warmth, and joyful learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {serviceDetails.map((service, index) => (
              <div
                key={service.name}
                className="bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-5 xs:p-7 sm:p-8 border-2 border-amber-100/90 hover:border-amber-300 warm-shadow transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon, Index, Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-200 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <div>
                        <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${service.badgeBg}`}>
                          Service 0{index + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-amber-800 mb-5">
                    {service.tagline}
                  </p>

                  {/* Challenges Addressed */}
                  <div className="mb-4 bg-white p-4 rounded-2xl border border-amber-100">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                      Who It Helps & Challenges Addressed:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {service.challenges}
                    </p>
                  </div>

                  {/* Key Therapeutic Strategies */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                      Targeted Strategies & Activities:
                    </span>
                    <ul className="space-y-1.5">
                      {service.interventions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar: Outcomes & Action */}
                <div className="pt-4 border-t border-amber-200/60 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-slate-700">Focus: </span>
                    <span>{service.outcomes}</span>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shrink-0 shadow-xs"
                  >
                    <span>Book Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Creative Activities Board */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#FFFDF9] to-amber-50/40 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-900 text-xs font-black uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-rose-600" />
              <span>Multi-Sensory Joy</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Enrichment & Creative Activities
            </h2>
            <p className="text-slate-600 text-sm sm:text-lg">
              Therapy is woven into joyful, creative experiences. Our children look forward to every session because play is the natural language of learning.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {CREATIVE_ACTIVITIES.map((activity) => (
              <div
                key={activity.name}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 border-amber-100 hover:border-amber-300 warm-shadow transition-all text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white ${activity.color} shadow-sm shrink-0`}>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-base leading-snug">
                  {activity.name}
                </h4>
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${activity.lightColor}`}>
                  Expressive Learning
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-12 sm:py-16 bg-[#0B1E36] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Unsure Which Service Your Child Needs?</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Schedule an Initial Milestone & Developmental Assessment
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            Our multidisciplinary team will conduct an initial screening in Mohali to evaluate your child&apos;s strengths, challenges, and sensory preferences before recommending a personalized program.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-98"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              <span>Book an Initial Assessment</span>
            </Link>
            <a
              href={`tel:${CENTRE_PHONE}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
            >
              <span>Call {CENTRE_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
