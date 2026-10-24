export type Role = "ADMIN" | "SPECIALIST" | "STAFF";

export type EnquiryStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "ENROLLED" | "CLOSED";

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type ProgramStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  studentName: string;
  dateOfBirth?: string;
  age: number;
  gender: string;
  parentName: string;
  phone: string;
  email: string;
  address?: string;
  learningNeeds: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: string;
  image?: string;
  status: ProgramStatus;
  badge?: string;
  iconName?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  parentName: string;
  childName: string;
  childAge: number;
  phone: string;
  email: string;
  program: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface Appointment {
  id: string;
  parentName: string;
  childName: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  program: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  assessmentDate: string;
  academicNotes?: string;
  communicationNotes?: string;
  behaviourNotes?: string;
  sensoryNotes?: string;
  socialNotes?: string;
  dailyLivingNotes?: string;
  recommendations?: string;
  createdAt: string;
}

export interface ProgressReport {
  id: string;
  studentId: string;
  reportDate: string;
  goals: string;
  progress: string;
  strengths: string;
  areasForImprovement: string;
  recommendations: string;
  createdAt: string;
}
