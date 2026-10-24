import {
  User,
  Student,
  Program,
  Enquiry,
  Appointment,
  Assessment,
  ProgressReport,
  EnquiryStatus,
  AppointmentStatus
} from "./types";
import { CORE_PROGRAMS } from "./constants";

// Seed Data
const initialUsers: User[] = [
  {
    id: "usr_admin_001",
    name: "Dr. Sarah Mitchell",
    email: "admin@hunkydory.edu",
    // bcrypt hash for "Admin@123456"
    passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "usr_spec_002",
    name: "Priya Sen (Specialist)",
    email: "specialist@hunkydory.edu",
    passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
    role: "SPECIALIST",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "usr_staff_003",
    name: "Rohan Verma (Staff)",
    email: "staff@hunkydory.edu",
    passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
    role: "STAFF",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const initialStudents: Student[] = [
  {
    id: "std_001",
    studentName: "Aarav Sharma",
    dateOfBirth: "2018-05-14",
    age: 7,
    gender: "Male",
    parentName: "Pooja & Rajesh Sharma",
    phone: "+91 98765 11223",
    email: "pooja.sharma@example.com",
    address: "B-42, Green Park Avenue, New Delhi",
    learningNeeds: "Developmental and sensory processing differences; Speech & language development support",
    notes: "Responds exceptionally well to visual timers, kinetic sandbox play, and musical prompts.",
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z"
  },
  {
    id: "std_002",
    studentName: "Ananya Patel",
    dateOfBirth: "2019-11-20",
    age: 6,
    gender: "Female",
    parentName: "Kavita Patel",
    phone: "+91 98765 44556",
    email: "kavita.p@example.com",
    address: "Flat 304, Sunshine Meadows, Bengaluru",
    learningNeeds: "Diverse learning profile; ADHD focus variations & executive functioning support",
    notes: "High creative thinking; benefits from structured multi-sensory breaks between reading tasks.",
    createdAt: "2026-02-10T09:30:00.000Z",
    updatedAt: "2026-03-12T14:20:00.000Z"
  },
  {
    id: "std_003",
    studentName: "Reyansh Gupta",
    dateOfBirth: "2021-03-18",
    age: 5,
    gender: "Male",
    parentName: "Vikram Gupta",
    phone: "+91 98765 77889",
    email: "v.gupta@example.com",
    address: "Plot 12, Riverview Enclave, Pune",
    learningNeeds: "Early intervention; Speech articulation and fine motor coordination",
    notes: "Shows immense interest in sorting puzzles and picture-word cards.",
    createdAt: "2026-02-28T11:15:00.000Z",
    updatedAt: "2026-03-25T16:00:00.000Z"
  },
  {
    id: "std_004",
    studentName: "Meera Nair",
    dateOfBirth: "2016-08-09",
    age: 9,
    gender: "Female",
    parentName: "Deepa Nair",
    phone: "+91 98765 99001",
    email: "deepa.nair@example.com",
    address: "House 18, Palm Grove Colony, Kochi",
    learningNeeds: "Special educational needs; Dyslexia and structured literacy support",
    notes: "Thriving with multi-sensory phonics and audio-assisted comprehension.",
    createdAt: "2026-01-20T08:45:00.000Z",
    updatedAt: "2026-04-02T11:00:00.000Z"
  }
];

const initialPrograms: Program[] = CORE_PROGRAMS.map((p, idx) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  category: p.tag,
  status: "ACTIVE",
  badge: p.ageRange,
  iconName: p.icon,
  features: p.features,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

const initialEnquiries: Enquiry[] = [
  {
    id: "enq_001",
    parentName: "Sunita Verma",
    childName: "Vihaan Verma",
    childAge: 6,
    phone: "+91 98111 22334",
    email: "sunita.v@example.com",
    program: "Early Intervention",
    message: "Vihaan has difficulty with transitions and social peer interaction. We would love to arrange an initial assessment.",
    status: "NEW",
    createdAt: "2026-04-05T09:20:00.000Z"
  },
  {
    id: "enq_002",
    parentName: "Amitabh Sen",
    childName: "Rohan Sen",
    childAge: 8,
    phone: "+91 98222 33445",
    email: "amitabh.sen@example.com",
    program: "Special Education",
    message: "Seeking individualized reading and attention support for Grade 3.",
    status: "IN_REVIEW",
    createdAt: "2026-04-03T14:10:00.000Z"
  },
  {
    id: "enq_003",
    parentName: "Neha Chawla",
    childName: "Samar Chawla",
    childAge: 5,
    phone: "+91 98333 44556",
    email: "neha.c@example.com",
    program: "Communication & Language",
    message: "We need speech and functional communication guidance for our son.",
    status: "CONTACTED",
    createdAt: "2026-03-28T16:45:00.000Z"
  }
];

const initialAppointments: Appointment[] = [
  {
    id: "apt_001",
    parentName: "Sunita Verma",
    childName: "Vihaan Verma",
    phone: "+91 98111 22334",
    email: "sunita.v@example.com",
    appointmentDate: "2026-04-12",
    appointmentTime: "10:30 AM",
    program: "Early Intervention",
    notes: "Introductory baseline assessment with parents present.",
    status: "CONFIRMED",
    createdAt: "2026-04-05T09:30:00.000Z"
  },
  {
    id: "apt_002",
    parentName: "Pooja Sharma",
    childName: "Aarav Sharma",
    phone: "+91 98765 11223",
    email: "pooja.sharma@example.com",
    appointmentDate: "2026-04-14",
    appointmentTime: "02:00 PM",
    program: "Sensory Development",
    notes: "Quarterly review and sensory integration observation.",
    status: "PENDING",
    createdAt: "2026-04-06T11:00:00.000Z"
  },
  {
    id: "apt_003",
    parentName: "Deepa Nair",
    childName: "Meera Nair",
    phone: "+91 98765 99001",
    email: "deepa.nair@example.com",
    appointmentDate: "2026-04-15",
    appointmentTime: "11:15 AM",
    program: "Academic Support",
    notes: "Structured phonics progress check.",
    status: "CONFIRMED",
    createdAt: "2026-04-07T08:15:00.000Z"
  }
];

const initialAssessments: Assessment[] = [
  {
    id: "asm_001",
    studentId: "std_001",
    assessmentDate: "2026-02-15",
    academicNotes: "Demonstrates strong visual-spatial memory. Grasps numerical patterns rapidly with tactile counters.",
    communicationNotes: "Expresses thoughts clearly in 3-4 word phrases; actively uses visual emotion cards.",
    behaviourNotes: "Calm and cooperative when provided with clear visual schedules and 2-minute transition warnings.",
    sensoryNotes: "Benefits from proprioceptive deep-pressure input and noise-reduction headphones during high-stimulus tasks.",
    socialNotes: "Enjoys parallel play; beginning to initiate collaborative block-building with educator encouragement.",
    dailyLivingNotes: "Independent in unpacking bag and washing hands; working on shoe-fastening routines.",
    recommendations: "Continue sensory circuit warm-up before 1-on-1 literacy sessions. Maintain visual routine chart at home.",
    createdAt: "2026-02-15T15:00:00.000Z"
  },
  {
    id: "asm_002",
    studentId: "std_002",
    assessmentDate: "2026-03-10",
    academicNotes: "Exceptional verbal storytelling. Requires chunked reading segments with highlighted tracking aids.",
    communicationNotes: "Highly articulate; benefits from gentle redirection to sustain focused dialogue.",
    behaviourNotes: "Energetic and enthusiastic. Thrives when allowed active movement breaks every 15 minutes.",
    sensoryNotes: "Responds well to wobble stools and resistance bands on chair legs.",
    socialNotes: "Empathetic and kind; excels as a group helper during peer collaborative activities.",
    dailyLivingNotes: "Demonstrates strong autonomy in organizing personal station.",
    recommendations: "Incorporate gamified literacy sprints with tactile letter tiles. Daily mindfulness calming moment.",
    createdAt: "2026-03-10T14:30:00.000Z"
  }
];

const initialProgressReports: ProgressReport[] = [
  {
    id: "rep_001",
    studentId: "std_001",
    reportDate: "2026-03-30",
    goals: "1. Expand expressive sentence structure to 5+ words. 2. Self-regulate sensory overload using calming corner. 3. Master letter-sound recognition for group 1 phonics.",
    progress: "Achieved 85% of phonics milestones. Aarav now voluntarily requests the sensory bubble corner when overwhelmed.",
    strengths: "Incredible perseverance, enthusiastic participation in musical storytelling, kind demeanor.",
    areasForImprovement: "Patience during unfamiliar motor activities; transition time between preferred and non-preferred tasks.",
    recommendations: "Provide positive reinforcement token board at home. Celebrate every successful routine transition.",
    createdAt: "2026-03-30T16:00:00.000Z"
  },
  {
    id: "rep_002",
    studentId: "std_002",
    reportDate: "2026-04-01",
    goals: "1. Complete 15 minutes of uninterrupted reading task. 2. Practice turn-taking in small group of 3 peers.",
    progress: "Sustained attention increased from 6 minutes to 16 minutes with visual timers and wobble seating.",
    strengths: "Creative problem solving, empathy toward peers, rich verbal vocabulary.",
    areasForImprovement: "Writing legibility and pencil grip fatigue.",
    recommendations: "Introduce ergonomic triangular pencil grips and clay squeezing exercises.",
    createdAt: "2026-04-01T12:00:00.000Z"
  }
];

// In-Memory Data Store (Persists during process runtime and acts as zero-config store)
class DataStore {
  private users: User[] = [...initialUsers];
  private students: Student[] = [...initialStudents];
  private programs: Program[] = [...initialPrograms];
  private enquiries: Enquiry[] = [...initialEnquiries];
  private appointments: Appointment[] = [...initialAppointments];
  private assessments: Assessment[] = [...initialAssessments];
  private progressReports: ProgressReport[] = [...initialProgressReports];

  // Users
  getUsers(): User[] {
    return [...this.users];
  }

  getUserByEmail(email: string): User | undefined {
    let user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      const fallback = initialUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (fallback) {
        this.users.push({ ...fallback });
        return fallback;
      }
    }
    return user;
  }

  getUserById(id: string): User | undefined {
    let user = this.users.find((u) => u.id === id);
    if (!user) {
      const fallback = initialUsers.find((u) => u.id === id);
      if (fallback) {
        this.users.push({ ...fallback });
        return fallback;
      }
    }
    return user;
  }

  createUser(data: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const newUser: User = {
      ...data,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  // Students
  getStudents(): Student[] {
    return [...this.students].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getStudentById(id: string): Student | undefined {
    return this.students.find((s) => s.id === id);
  }

  createStudent(data: Omit<Student, "id" | "createdAt" | "updatedAt">): Student {
    const newStudent: Student = {
      ...data,
      id: `std_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.students.unshift(newStudent);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>): Student | null {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.students[index] = {
      ...this.students[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.students[index];
  }

  deleteStudent(id: string): boolean {
    const lenBefore = this.students.length;
    this.students = this.students.filter((s) => s.id !== id);
    this.assessments = this.assessments.filter((a) => a.studentId !== id);
    this.progressReports = this.progressReports.filter((r) => r.studentId !== id);
    return this.students.length < lenBefore;
  }

  // Programs
  getPrograms(): Program[] {
    return [...this.programs];
  }

  getProgramBySlug(slug: string): Program | undefined {
    return this.programs.find((p) => p.slug === slug);
  }

  // Enquiries
  getEnquiries(): Enquiry[] {
    return [...this.enquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createEnquiry(data: Omit<Enquiry, "id" | "status" | "createdAt">): Enquiry {
    const newEnquiry: Enquiry = {
      ...data,
      id: `enq_${Date.now()}`,
      status: "NEW",
      createdAt: new Date().toISOString()
    };
    this.enquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: EnquiryStatus): Enquiry | null {
    const enq = this.enquiries.find((e) => e.id === id);
    if (!enq) return null;
    enq.status = status;
    return enq;
  }

  // Appointments
  getAppointments(): Appointment[] {
    return [...this.appointments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createAppointment(data: Omit<Appointment, "id" | "status" | "createdAt">): Appointment {
    const newAppointment: Appointment = {
      ...data,
      id: `apt_${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toISOString()
    };
    this.appointments.unshift(newAppointment);
    return newAppointment;
  }

  updateAppointmentStatus(id: string, status: AppointmentStatus): Appointment | null {
    const apt = this.appointments.find((a) => a.id === id);
    if (!apt) return null;
    apt.status = status;
    return apt;
  }

  // Assessments
  getAssessments(): Assessment[] {
    return [...this.assessments].sort(
      (a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime()
    );
  }

  getAssessmentsByStudentId(studentId: string): Assessment[] {
    return this.assessments.filter((a) => a.studentId === studentId);
  }

  createAssessment(data: Omit<Assessment, "id" | "createdAt">): Assessment {
    const newAssessment: Assessment = {
      ...data,
      id: `asm_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.assessments.unshift(newAssessment);
    return newAssessment;
  }

  // Progress Reports
  getProgressReports(): ProgressReport[] {
    return [...this.progressReports].sort(
      (a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime()
    );
  }

  getProgressReportsByStudentId(studentId: string): ProgressReport[] {
    return this.progressReports.filter((r) => r.studentId === studentId);
  }

  createProgressReport(data: Omit<ProgressReport, "id" | "createdAt">): ProgressReport {
    const newReport: ProgressReport = {
      ...data,
      id: `rep_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.progressReports.unshift(newReport);
    return newReport;
  }

  // Dashboard Metrics
  getDashboardStats() {
    return {
      totalStudents: this.students.length,
      newEnquiries: this.enquiries.filter((e) => e.status === "NEW").length,
      totalEnquiries: this.enquiries.length,
      upcomingAppointments: this.appointments.filter(
        (a) => a.status === "PENDING" || a.status === "CONFIRMED"
      ).length,
      activePrograms: this.programs.filter((p) => p.status === "ACTIVE").length,
      totalAssessments: this.assessments.length,
      totalReports: this.progressReports.length
    };
  }
}

// Global singleton to preserve state across API routes in Next.js dev server
const globalForStore = globalThis as unknown as { storeInstance?: DataStore };

export const store = new DataStore();
if (process.env.NODE_ENV !== "production") {
  globalForStore.storeInstance = store;
}
