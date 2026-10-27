# Hunky Dory – Child Learning & Specialised Educational Support Platform

> **“Every Child Can Learn. Every Child Can Shine.”**

Hunky Dory is a modern, warm, child-centred educational and support platform designed specifically for **children with diverse learning, developmental, and educational needs**. Built with Next.js (App Router), TypeScript, Tailwind CSS, Mongoose ODM, and MongoDB.

---

## 🌟 Respectful Terminology & Principles
We celebrate each child's individual strengths, abilities, and neurodivergent profiles using respectful, affirming language:
- **Children with diverse learning needs**
- **Children with special educational needs**
- **Children with developmental and learning differences**
- Safe, sensory-friendly, low-stress learning environments

---

## 🚀 Key Features

### 1. Public Website Experience
- **Responsive Navigation**: Sticky header with logo badge, navigation links, mobile drawer menu, and direct CTA.
- **Hero Section**: Core tagline, dual CTAs (*Book an Assessment*, *Explore Our Programs*), and welcoming child-centred visuals.
- **About Hunky Dory**: Philosophy, values, expandable details, and 4 pillars of excellence.
- **Why Choose Us**: 6 cards (Individual Attention, Personalised Learning, Qualified Support, Child-Centred Approach, Safe & Inclusive Environment, Progress Tracking).
- **Our Programs**: 8 specialised programs with category filtering and an interactive curriculum modal:
  1. Special Education
  2. Early Intervention
  3. Communication & Language
  4. Sensory Development
  5. Social & Behavioural Skills
  6. Daily Living Skills
  7. Academic Support
  8. Individual Learning Plans
- **Our Learning Approach**: 6-step roadmap (*Understand, Assess, Plan, Teach, Track, Celebrate*) with central philosophy callout (*“Every small step is a big achievement.”*) and an interactive celebration button.
- **About Our Centre**: Introduces the physical learning environment with an interactive tabbed gallery (Classrooms, Sensory Room, 1-on-1 Suites, Social Arena, Motor Studio, Creative Corner) and 5 environment pillars (*Safe, Supportive, Inclusive, Child-friendly, Learning-focused*).
- **Parent Partnership**: 5 pillars explaining why parents are vital partners in the journey (*Regular communication, Progress updates, Home-learning guidance, Parent consultations, Individualised recommendations*).
- **Voices of Trust**: Authentic parent testimonial cards with privacy-respecting placeholders.
- **FAQ Accordion**: Fully accessible accordion addressing the top 7 parent questions.
- **Contact & Assessment Scheduler**: Interactive form with dual modes (General Enquiry / Direct Assessment Booking), client-side validation, instant feedback, and centre contact details.
- **Footer**: Brand philosophy, quick links, programs, contact info, social links, and accessibility compliance.

### 2. Admin & Specialist Portal (`/admin`)
- **Secure Authentication**: `/admin/login` with JWT sessions, password verification, and one-click demo login credentials (`admin@hunkydory.edu` / `Admin@123456`).
- **Dashboard Overview**: Real-time metric cards (Total Students, New Enquiries, Upcoming Appointments, Active Programs) and multi-domain milestone charts.
- **Student Management (`/admin/students`)**: Search and filter students, register new students, remove records, and view full profiles with clinical assessments and quarterly progress reports.
- **Enquiry Management (`/admin/enquiries`)**: Review questions, filter by workflow status (`NEW`, `IN_REVIEW`, `CONTACTED`, `ENROLLED`, `CLOSED`).
- **Appointment Management (`/admin/appointments`)**: Schedule tracking with status updates (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- **Assessments & Reports (`/admin/assessments`)**: Multi-domain observation entries (Academic, Communication, Sensory, Social, Daily Living) and quarterly progress milestones.
- **Programs Overview (`/admin/programs`)**: Review curriculum pathways.

---

## 🗄️ MongoDB Database Architecture (Mongoose ODM)

The database models are structured under `src/models/` with TypeScript types and Mongoose schemas:
1. **User** (`users`): System users (Admin, Specialist, Staff) with hashed passwords and RBAC.
2. **Student** (`students`): Student profiles, parent info, and individualised learning needs.
3. **Program** (`programs`): Curricular and therapy programs, badges, and features.
4. **Enquiry** (`enquiries`): Inquiries from parents with workflow status tracking.
5. **Appointment** (`appointments`): Clinical and assessment appointment schedules.
6. **Assessment** (`assessments`): Clinical observations across academic, sensory, communication, and behavioural domains.
7. **ProgressReport** (`progress_reports`): Milestone evaluations, goals, and recommendations.

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js** (v18.17+ or v20+)
- **npm** or **pnpm**
- **MongoDB** (MongoDB Atlas connection string or local MongoDB on `mongodb://127.0.0.1:27017/hunky_dory_db`)

### 2. Installation
```bash
cd hunky-dory
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Configure your MongoDB connection URI in `.env`:
```env
MONGODB_URI="mongodb+srv://USER:PASSWORD@cluster0.mongodb.net/?retryWrites=true&w=majority"
DATABASE_URL="mongodb+srv://USER:PASSWORD@cluster0.mongodb.net/?retryWrites=true&w=majority"
JWT_SECRET="hunky_dory_super_secret_jwt_key_2026_diverse_learners"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Seeding (Optional)
To initialize default administrator accounts and demo data:
```bash
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Site**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin`
  - Demo Admin Email: `admin@hunkydory.edu`
  - Demo Admin Password: `Admin@123456`

---

## ♿ Accessibility (WCAG 2.1 AA)
- High contrast colors meeting WCAG guidelines
- Skip to main content link
- Keyboard navigable controls and accordions
- `prefers-reduced-motion` CSS support
- Focus-visible outline styling
- ARIA expanded, controls, and landmark roles

---

## 📦 Production Deployment
To build for production:
```bash
npm run build
npm start
```
Deploy easily to Vercel, Railway, AWS, or Docker containers with zero code alterations.
# hunkydory
