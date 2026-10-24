export const SITE_NAME = "Hunky Dory";
export const SITE_TAGLINE = "Every Child. Every Ability. Every Day. A New Step Forward.";
export const SITE_CORE_TAGLINE = "Every Child Can Learn. Every Child Can Shine.";
export const SITE_SUBTITLE =
  "Supporting every child's unique journey through personalised learning, specialised therapy support and skill development in a joyful, sensory-friendly environment.";

export const CENTRE_LOCATION = "156, Phase 4, Mohali";
export const CENTRE_PHONE = "8725002488";
export const CENTRE_EMAIL = "care.hunkydory@gmail.com";

export const MOTTO_HEART = "We See Abilities. We Nurture Potential.";
export const MOTTO_CLOSING = "Together, we build better tomorrows.";

// Colorful Services Badges from the brand image
export const BRAND_SERVICES = [
  { name: "ADHD", color: "bg-[#6D28D9]", text: "text-white", border: "border-[#5B21B6]", icon: "Zap" },
  { name: "AUTISM", color: "bg-[#0284C7]", text: "text-white", border: "border-[#0369A1]", icon: "Puzzle" },
  { name: "LEARNING DISABILITY", color: "bg-[#15803D]", text: "text-white", border: "border-[#166534]", icon: "BookOpen" },
  { name: "SPEECH & LANGUAGE THERAPY", color: "bg-[#EA580C]", text: "text-white", border: "border-[#C2410C]", icon: "MessageSquare" },
  { name: "BEHAVIOR THERAPY", color: "bg-[#E11D48]", text: "text-white", border: "border-[#BE123C]", icon: "Heart" },
  { name: "DOWN SYNDROME", color: "bg-[#D97706]", text: "text-white", border: "border-[#B45309]", icon: "Smile" },
  { name: "DAILY LIVING SKILLS", color: "bg-[#0D9488]", text: "text-white", border: "border-[#0F766E]", icon: "Sun" },
  { name: "SENSORY INTERVENTION", color: "bg-[#65A30D]", text: "text-white", border: "border-[#4D7C0F]", icon: "Sparkles" },
  { name: "OCCUPATIONAL THERAPY", color: "bg-[#4F46E5]", text: "text-white", border: "border-[#4338CA]", icon: "Activity" },
  { name: "PHYSICAL THERAPY", color: "bg-[#1D4ED8]", text: "text-white", border: "border-[#1E40AF]", icon: "Dumbbell" }
];

// Creative Activities from the brand image
export const CREATIVE_ACTIVITIES = [
  { name: "ART & CRAFT", color: "bg-[#0284C7]", lightColor: "bg-sky-50 text-sky-700", icon: "Palette" },
  { name: "MUSIC THERAPY", color: "bg-[#DB2777]", lightColor: "bg-pink-50 text-pink-700", icon: "Music" },
  { name: "STORY TELLING", color: "bg-[#16A34A]", lightColor: "bg-green-50 text-green-700", icon: "BookOpen" },
  { name: "PUZZLE PLAY", color: "bg-[#9333EA]", lightColor: "bg-purple-50 text-purple-700", icon: "Puzzle" },
  { name: "YOGA & MINDFULNESS", color: "bg-[#EA580C]", lightColor: "bg-orange-50 text-orange-700", icon: "Heart" },
  { name: "SOCIAL SKILL TRAINING", color: "bg-[#0D9488]", lightColor: "bg-teal-50 text-teal-700", icon: "Users" },
  { name: "CELEBRATION & LIFE SKILLS", color: "bg-[#EAB308]", lightColor: "bg-amber-50 text-amber-800", icon: "Trophy" }
];

export const CORE_PROGRAMS = [
  {
    id: "prog_special_ed",
    slug: "special-education",
    name: "Special Education & Learning Disability",
    shortDesc: "Personalised academic and educational support based on each child's learning profile.",
    description:
      "Our special education curriculum focuses on adapted instruction tailored to each child's individual cognitive and learning style. We use multimodal strategies, multi-sensory techniques, and differentiated pacing to unlock potential.",
    icon: "GraduationCap",
    tag: "Individualised Learning",
    badgeColor: "bg-[#15803D]",
    ageRange: "Ages 4 - 16",
    features: [
      "Differentiated curriculum pathways",
      "Multi-sensory reading and math kits",
      "Executive function coaching",
      "Assistive learning technology integration"
    ]
  },
  {
    id: "prog_speech",
    slug: "speech-language-therapy",
    name: "Speech & Language Therapy",
    shortDesc: "Activities that encourage communication, language development and functional expression.",
    description:
      "Fostering expressive and receptive communication using visual supports, augmentative communication tools, oral motor activities, and positive verbal modeling.",
    icon: "MessageSquareHeart",
    tag: "Expression & Connection",
    badgeColor: "bg-[#EA580C]",
    ageRange: "Ages 3 - 16",
    features: [
      "Speech clarity and fluency guidance",
      "AAC & visual schedule implementation",
      "Social communication pragmatics",
      "Vocabulary building through interest-based games"
    ]
  },
  {
    id: "prog_occupational",
    slug: "occupational-therapy",
    name: "Occupational & Behavior Therapy",
    shortDesc: "Fine motor skills, sensory-motor regulation, daily autonomy and positive behaviour support.",
    description:
      "Our occupational therapy fosters fine motor precision, sensory processing, handwriting readiness, and self-care skills, alongside compassionate behavior support.",
    icon: "HeartHandshake",
    tag: "Sensory & Motor Autonomy",
    badgeColor: "bg-[#4F46E5]",
    ageRange: "Ages 2 - 16",
    features: [
      "Fine motor utensil and pencil grip strengthening",
      "Zones of Regulation emotional coaching",
      "Vestibular and proprioceptive sensory circuits",
      "Functional autonomy tasks"
    ]
  },
  {
    id: "prog_sensory_dev",
    slug: "sensory-intervention",
    name: "Sensory Intervention",
    shortDesc: "Structured sensory activities to support attention, emotional regulation and calm participation.",
    description:
      "Our purpose-designed sensory room provides calming bubble tubes, fiber optics, weighted elements, swings, and tactile installations that help children feel regulated, calm, and ready to learn.",
    icon: "Sparkles",
    tag: "Regulation & Calm",
    badgeColor: "bg-[#65A30D]",
    ageRange: "All Ages",
    features: [
      "Individualised sensory diet routines",
      "Tactile, proprioceptive & vestibular equipment",
      "Emotional self-regulation techniques",
      "Calm transition practices"
    ]
  },
  {
    id: "prog_autism_adhd",
    slug: "autism-adhd-support",
    name: "Autism & ADHD Support",
    shortDesc: "Neurodiversity-affirming guidance tailored for focus, executive functioning and social connection.",
    description:
      "Honouring autistic and ADHD strengths with movement-friendly seating, visual timetables, clear structure, and collaborative social play designed without stress.",
    icon: "Puzzle",
    tag: "Neurodiversity Affirming",
    badgeColor: "bg-[#0284C7]",
    ageRange: "Ages 3 - 18",
    features: [
      "Visual timers & structured step chaining",
      "Sensory movement breaks",
      "Hyperfocus project exploration",
      "Social communication circles"
    ]
  },
  {
    id: "prog_daily_living",
    slug: "daily-living-skills",
    name: "Daily Living Skills",
    shortDesc: "Development of independence, personal routines and practical everyday skills.",
    description:
      "Empowering children to gain everyday functional autonomy—from personal self-care, mealtime readiness, and dressing routines to task sequencing and fine-motor coordination.",
    icon: "SunMedium",
    tag: "Life Independence",
    badgeColor: "bg-[#0D9488]",
    ageRange: "Ages 4 - 18",
    features: [
      "Step-by-step task chaining",
      "Personal care and hygiene routines",
      "Fine motor utensil control and organization",
      "Community safety & navigation practice"
    ]
  },
  {
    id: "prog_early_intervention",
    slug: "early-intervention",
    name: "Early Intervention & Down Syndrome Support",
    shortDesc: "Early developmental stimulation designed to strengthen foundational cognitive and motor milestones.",
    description:
      "Timely, nurturing intervention in early childhood lays the foundation for lifelong development. Our play-based developmental sessions address motor skills, communication, attention, and sensory balance.",
    icon: "Baby",
    tag: "Foundational Growth",
    badgeColor: "bg-[#D97706]",
    ageRange: "Ages 2 - 6",
    features: [
      "Developmental play stimulation",
      "Early milestone reinforcement",
      "Parent-child collaborative play",
      "Foundational motor and cognitive tasks"
    ]
  },
  {
    id: "prog_ilp",
    slug: "individual-learning-plans",
    name: "Individual Learning Plans (ILP)",
    shortDesc: "Personalised goals and structured learning strategies based on each child's needs.",
    description:
      "A living, evolving blueprint tailored specifically for your child. Formulated collaboratively between educators, specialists, and parents, reviewed every quarter to track meaningful milestones.",
    icon: "Compass",
    tag: "Custom Roadmap",
    badgeColor: "bg-[#6D28D9]",
    ageRange: "All Ages",
    features: [
      "Quarterly SMART goal setting",
      "Baseline milestone assessments",
      "Multi-disciplinary specialist input",
      "Continuous parent review meetings"
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Individual Attention",
    desc: "Low educator-to-child ratios ensure your child receives undivided presence, patience, and tailored guidance at every stage.",
    icon: "UserCheck",
    color: "from-[#0284C7] to-[#0369A1]",
    bgColor: "bg-sky-50 text-sky-700"
  },
  {
    title: "Personalised Learning",
    desc: "Customised learning paces, sensory considerations, and adapted tools that fit your child rather than forcing your child to fit a mould.",
    icon: "Puzzle",
    color: "from-[#F59E0B] to-[#D97706]",
    bgColor: "bg-amber-50 text-amber-700"
  },
  {
    title: "Qualified Support",
    desc: "A multidisciplinary team of certified special educators, child developmental practitioners, and dedicated mentors.",
    icon: "Award",
    color: "from-[#16A34A] to-[#15803D]",
    bgColor: "bg-green-50 text-green-700"
  },
  {
    title: "Child-Centred Approach",
    desc: "We honour children's autonomy, natural interests, and emotional wellbeing, fostering genuine curiosity and joy.",
    icon: "Heart",
    color: "from-[#E11D48] to-[#BE123C]",
    bgColor: "bg-rose-50 text-rose-700"
  },
  {
    title: "Safe & Inclusive Environment",
    desc: "A calm, sensory-friendly physical environment designed with safety, warmth, and accessibility as paramount priorities.",
    icon: "ShieldCheck",
    color: "from-[#7C3AED] to-[#6D28D9]",
    bgColor: "bg-purple-50 text-purple-700"
  },
  {
    title: "Progress Tracking",
    desc: "Clear, transparent documentation and celebration of milestones so parents always know how their child is flourishing.",
    icon: "TrendingUp",
    color: "from-[#0D9488] to-[#0F766E]",
    bgColor: "bg-teal-50 text-teal-700"
  }
];

export const LEARNING_APPROACH_STEPS = [
  {
    step: "1",
    title: "Understand",
    desc: "Initial interaction and understanding of the child's strengths, interests, comforts, and unique learning profile.",
    icon: "HeartHandshake",
    badge: "Discovery",
    color: "bg-[#0284C7]"
  },
  {
    step: "2",
    title: "Assess",
    desc: "Identify current abilities, challenges, sensory responses, and specific areas requiring targeted support.",
    icon: "SearchCheck",
    badge: "Evaluation",
    color: "bg-[#F59E0B]"
  },
  {
    step: "3",
    title: "Plan",
    desc: "Create individualised learning goals, accommodating strategies, and step-by-step developmental roadmaps.",
    icon: "MapPin",
    badge: "Design",
    color: "bg-[#16A34A]"
  },
  {
    step: "4",
    title: "Teach",
    desc: "Use engaging, structured, multi-sensory and child-friendly teaching methods that spark joy and understanding.",
    icon: "Lightbulb",
    badge: "Empower",
    color: "bg-[#EA580C]"
  },
  {
    step: "5",
    title: "Track",
    desc: "Monitor progress regularly through qualitative observations, functional indicators, and milestone reviews.",
    icon: "LineChart",
    badge: "Observe",
    color: "bg-[#7C3AED]"
  },
  {
    step: "6",
    title: "Celebrate",
    desc: "Recognise every achievement, including small steps forward, building deep inner self-confidence.",
    icon: "Trophy",
    badge: "Celebrate",
    color: "bg-[#E11D48]"
  }
];

export const CENTRE_HIGHLIGHTS = [
  {
    title: "Sensory Calm & Regulation Room",
    category: "Sensory Activities",
    description: "Equipped with tactile wall installations, bubble columns, weighted elements, and swing anchors designed to support emotional de-escalation and sensory integration.",
    icon: "Sparkles",
    tag: "Sensory Environment",
    themeColor: "text-[#65A30D]"
  },
  {
    title: "Adaptive Learning Classrooms",
    category: "Classroom Spaces",
    description: "Sunlit spaces with ergonomic flexible seating, visual timers, clear boundaries, and multi-sensory teaching pods that minimise cognitive fatigue.",
    icon: "School",
    tag: "Focused Learning",
    themeColor: "text-[#0284C7]"
  },
  {
    title: "1-on-1 Specialised Support Suites",
    category: "One-to-One Teaching",
    description: "Distraction-reduced private suites engineered for high-engagement speech, occupational tasks, reading intervention, and individual assessments.",
    icon: "User",
    tag: "Private Coaching",
    themeColor: "text-[#6D28D9]"
  },
  {
    title: "Collaborative Social Play Arena",
    category: "Group Activities",
    description: "Interactive floor zones, structured board game stations, and collaborative build zones that foster social communication and friendship building.",
    icon: "Users",
    tag: "Peer Interaction",
    themeColor: "text-[#EA580C]"
  },
  {
    title: "Motor & Everyday Living Studio",
    category: "Learning Materials",
    description: "Functional simulated living spaces enabling kids to practice buttoning, shoelace tying, kitchen prep, and organizing backpacks in a playful setup.",
    icon: "Smile",
    tag: "Daily Autonomy",
    themeColor: "text-[#0D9488]"
  },
  {
    title: "Creative Arts & Expression Corner",
    category: "Activity Areas",
    description: "Washable finger-painting stations, tactile clay modelling, and music therapy instruments for non-verbal emotional expression.",
    icon: "Palette",
    tag: "Creative Exploration",
    themeColor: "text-[#E11D48]"
  }
];

export const PARENT_PILLARS = [
  {
    title: "Regular Communication",
    desc: "Continuous, transparent channels through phone, portal notes, and scheduled face-to-face debriefs after key sessions.",
    icon: "MessageCircle",
    color: "bg-sky-50 text-sky-700"
  },
  {
    title: "Progress Updates",
    desc: "Quarterly milestone reports and actionable visual graphs documenting real, tangible developmental breakthroughs.",
    icon: "FileCheck2",
    color: "bg-emerald-50 text-emerald-700"
  },
  {
    title: "Home-Learning Guidance",
    desc: "Practical, low-stress routines and calming sensory activities you can seamlessly integrate into your home routine.",
    icon: "Home",
    color: "bg-rose-50 text-rose-700"
  },
  {
    title: "Parent Consultations",
    desc: "Dedicated 1-on-1 strategy sessions with our educational specialists and developmental therapists.",
    icon: "CalendarCheck",
    color: "bg-purple-50 text-purple-700"
  },
  {
    title: "Individualised Recommendations",
    desc: "Evidence-based strategies adapted to your family's daily rhythm, school transitions, and environmental needs.",
    icon: "Sparkles",
    color: "bg-amber-50 text-amber-700"
  }
];

export const TESTIMONIALS = [
  {
    quote: "An encouraging environment where my child feels comfortable learning and trying new things. He used to dread structured learning, but now he bounds into Hunky Dory with a smile.",
    parentName: "Parent of a 7-year-old",
    tag: "Early Intervention & Speech",
    stars: 5,
    city: "Mohali"
  },
  {
    quote: "The team at Hunky Dory took the time to truly understand our daughter's sensory triggers and unique strengths. Her confidence in reading and making friends has blossomed beyond our expectations.",
    parentName: "Parent of a 10-year-old",
    tag: "Special Education & Social Skills",
    stars: 5,
    city: "Chandigarh"
  },
  {
    quote: "Their individualized learning plan gave us a clear, comforting roadmap. Seeing every small milestone celebrated has made a world of difference for our entire family.",
    parentName: "Parent of a 5-year-old",
    tag: "Sensory Development & ILP",
    stars: 5,
    city: "Panchkula"
  },
  {
    quote: "Professional, deeply compassionate, and completely respectful. They see our son for who he is—a bright, capable boy who just needed someone to meet him where he learns.",
    parentName: "Parent of an 8-year-old",
    tag: "Academic Support & Life Skills",
    stars: 5,
    city: "Mohali"
  }
];

export const FAQ_ITEMS = [
  {
    question: "What age groups do you support at Hunky Dory Mohali?",
    answer: "We welcome children and adolescents from 2 to 18 years of age. Our programs are thoughtfully divided into foundational Early Intervention (ages 2–6), Primary Academic & Social Development (ages 7–12), and Adolescent Skill Building & Life Autonomy (ages 13–18)."
  },
  {
    question: "What types of learning needs do you support?",
    answer: "We support children with ADHD, Autism, Learning Disabilities (Dyslexia/Dysgraphia/Dyscalculia), Speech & Language differences, Down Syndrome, Sensory Processing needs, and children requiring Occupational or Physical Therapy."
  },
  {
    question: "Do you provide individualised learning plans (ILPs)?",
    answer: "Yes, absolutely. Every child enrolled receives a comprehensive Individual Learning Plan (ILP) crafted with parents and specialists. It outlines targeted SMART milestones, preferred sensory accommodations, and structured progress indicators reviewed every quarter."
  },
  {
    question: "How does the assessment process work?",
    answer: "Our initial assessment at 156, Phase 4, Mohali is warm, playful, and low-stress. We spend time observing your child in interactive activities, chatting with parents to understand their daily experiences, and evaluating developmental milestones across academic, communication, sensory, and behavioural domains."
  },
  {
    question: "Can parents receive regular progress updates?",
    answer: "Yes. Parent collaboration is essential. We provide informal verbal debriefs after sessions, secure digital portal notes, and formal quarterly progress reports detailing achievements, strengths, and recommendations for home practice."
  },
  {
    question: "Do you provide one-to-one therapy and teaching sessions?",
    answer: "Yes, we offer both dedicated 1-on-1 specialist sessions (ideal for targeted intervention, speech, OT, or foundational literacy) as well as small, supportive peer groups (2–4 children) for developing collaborative social skills."
  },
  {
    question: "How can I book an assessment at 156, Phase 4, Mohali?",
    answer: "You can book an assessment directly through our online appointment form on this website, call our centre desk directly at 8725002488, or email care.hunkydory@gmail.com. Our care coordinator will confirm your preferred slot promptly."
  }
];
