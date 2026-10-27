import mongoose from "mongoose";
import { connectToDatabase } from "./mongodb";
import {
  User,
  Student,
  Program,
  Enquiry,
  Appointment,
  Assessment,
  ProgressReport
} from "@/models";
import {
  User as UserType,
  Student as StudentType,
  Program as ProgramType,
  Enquiry as EnquiryType,
  Appointment as AppointmentType,
  Assessment as AssessmentType,
  ProgressReport as ProgressReportType,
  EnquiryStatus,
  AppointmentStatus
} from "./types";
import { CORE_PROGRAMS } from "./constants";

// Helper to format Mongoose document to clean standard object with string id
function formatDoc<T>(doc: any): T {
  if (!doc) return doc;
  const obj = typeof doc.toObject === "function" ? doc.toObject({ virtuals: true }) : doc;
  return {
    ...obj,
    id: (obj._id || obj.id)?.toString(),
    createdAt: obj.createdAt ? new Date(obj.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt).toISOString() : new Date().toISOString()
  } as T;
}

function getFilterById(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: new mongoose.Types.ObjectId(id) };
  }
  return { _id: id };
}

class MongoDataStore {
  // Ensure default Admin exists in MongoDB if none present
  async ensureDefaultAdmin(): Promise<void> {
    await connectToDatabase();
    const adminCount = await User.countDocuments({ role: "ADMIN" });
    if (adminCount === 0) {
      await User.create({
        name: "Dr. Sarah Mitchell (Director)",
        email: "admin@hunkydory.edu",
        // Default bcrypt hash for "Admin@123456"
        passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
        role: "ADMIN"
      });
      console.log("✅ Seeded default Admin user [admin@hunkydory.edu] in MongoDB");
    }
  }

  // Ensure Core Programs exist in MongoDB if collection is empty
  async ensureCorePrograms(): Promise<void> {
    await connectToDatabase();
    const count = await Program.countDocuments();
    if (count === 0) {
      const initial = CORE_PROGRAMS.map((p) => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.tag,
        image: `/images/programs/${p.slug}.jpg`,
        status: "ACTIVE" as const,
        badge: p.tag,
        iconName: p.icon,
        features: p.features
      }));
      await Program.insertMany(initial);
      console.log(`✅ Seeded ${initial.length} core programs in MongoDB`);
    }
  }

  // Users
  async getUsers(): Promise<UserType[]> {
    await connectToDatabase();
    const docs = await User.find().sort({ createdAt: -1 });
    return docs.map((d) => formatDoc<UserType>(d));
  }

  async getUserByEmail(email: string): Promise<UserType | null> {
    await connectToDatabase();
    await this.ensureDefaultAdmin();
    const doc = await User.findOne({ email: email.trim().toLowerCase() });
    return doc ? formatDoc<UserType>(doc) : null;
  }

  async getUserById(id: string): Promise<UserType | null> {
    await connectToDatabase();
    try {
      const doc = await User.findOne(getFilterById(id));
      return doc ? formatDoc<UserType>(doc) : null;
    } catch {
      return null;
    }
  }

  async createUser(data: Omit<UserType, "id" | "createdAt" | "updatedAt">): Promise<UserType> {
    await connectToDatabase();
    const doc = await User.create({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      passwordHash: data.passwordHash,
      role: data.role
    });
    return formatDoc<UserType>(doc);
  }

  async deleteUser(id: string): Promise<boolean> {
    await connectToDatabase();
    try {
      const result = await User.deleteOne(getFilterById(id));
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  // Students
  async getStudents(searchQuery?: string): Promise<StudentType[]> {
    await connectToDatabase();
    let filter: any = {};
    if (searchQuery) {
      const regex = new RegExp(searchQuery.trim(), "i");
      filter = {
        $or: [
          { studentName: regex },
          { parentName: regex },
          { learningNeeds: regex },
          { email: regex },
          { phone: regex }
        ]
      };
    }
    const docs = await Student.find(filter).sort({ createdAt: -1 });
    return docs.map((d) => formatDoc<StudentType>(d));
  }

  async getStudentById(id: string): Promise<StudentType | null> {
    await connectToDatabase();
    try {
      const doc = await Student.findOne(getFilterById(id));
      return doc ? formatDoc<StudentType>(doc) : null;
    } catch {
      return null;
    }
  }

  async createStudent(data: Omit<StudentType, "id" | "createdAt" | "updatedAt">): Promise<StudentType> {
    await connectToDatabase();
    const doc = await Student.create({
      studentName: data.studentName.trim(),
      dateOfBirth: data.dateOfBirth,
      age: data.age,
      gender: data.gender,
      parentName: data.parentName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      address: data.address,
      learningNeeds: data.learningNeeds.trim(),
      notes: data.notes
    });
    return formatDoc<StudentType>(doc);
  }

  async updateStudent(id: string, updates: Partial<StudentType>): Promise<StudentType | null> {
    await connectToDatabase();
    try {
      const doc = await Student.findOneAndUpdate(getFilterById(id), { $set: updates }, { new: true });
      return doc ? formatDoc<StudentType>(doc) : null;
    } catch {
      return null;
    }
  }

  async deleteStudent(id: string): Promise<boolean> {
    await connectToDatabase();
    try {
      const res = await Student.deleteOne(getFilterById(id));
      if (res.deletedCount > 0) {
        // Clean up associated assessments and reports
        await Assessment.deleteMany({ studentId: id });
        await ProgressReport.deleteMany({ studentId: id });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Programs
  async getPrograms(): Promise<ProgramType[]> {
    await connectToDatabase();
    await this.ensureCorePrograms();
    const docs = await Program.find().sort({ createdAt: 1 });
    return docs.map((d) => formatDoc<ProgramType>(d));
  }

  async getProgramBySlug(slug: string): Promise<ProgramType | null> {
    await connectToDatabase();
    const doc = await Program.findOne({ slug });
    return doc ? formatDoc<ProgramType>(doc) : null;
  }

  // Enquiries
  async getEnquiries(status?: EnquiryStatus | null): Promise<EnquiryType[]> {
    await connectToDatabase();
    const filter = status ? { status } : {};
    const docs = await Enquiry.find(filter).sort({ createdAt: -1 });
    return docs.map((d) => formatDoc<EnquiryType>(d));
  }

  async createEnquiry(data: Omit<EnquiryType, "id" | "status" | "createdAt">): Promise<EnquiryType> {
    await connectToDatabase();
    const doc = await Enquiry.create({
      parentName: data.parentName.trim(),
      childName: data.childName.trim(),
      childAge: data.childAge || 5,
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      program: data.program.trim(),
      message: data.message || "Enquiry regarding program placement and support.",
      status: "NEW"
    });
    return formatDoc<EnquiryType>(doc);
  }

  async updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<EnquiryType | null> {
    await connectToDatabase();
    try {
      const doc = await Enquiry.findOneAndUpdate(getFilterById(id), { $set: { status } }, { new: true });
      return doc ? formatDoc<EnquiryType>(doc) : null;
    } catch {
      return null;
    }
  }

  // Appointments
  async getAppointments(status?: AppointmentStatus | null): Promise<AppointmentType[]> {
    await connectToDatabase();
    const filter = status ? { status } : {};
    const docs = await Appointment.find(filter).sort({ createdAt: -1 });
    return docs.map((d) => formatDoc<AppointmentType>(d));
  }

  async createAppointment(data: Omit<AppointmentType, "id" | "status" | "createdAt">): Promise<AppointmentType> {
    await connectToDatabase();
    const doc = await Appointment.create({
      parentName: data.parentName.trim(),
      childName: data.childName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      program: data.program.trim(),
      notes: data.notes,
      status: "PENDING"
    });
    return formatDoc<AppointmentType>(doc);
  }

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<AppointmentType | null> {
    await connectToDatabase();
    try {
      const doc = await Appointment.findOneAndUpdate(getFilterById(id), { $set: { status } }, { new: true });
      return doc ? formatDoc<AppointmentType>(doc) : null;
    } catch {
      return null;
    }
  }

  // Assessments
  async getAssessments(studentId?: string | null): Promise<AssessmentType[]> {
    await connectToDatabase();
    const filter = studentId ? { studentId } : {};
    const docs = await Assessment.find(filter).sort({ assessmentDate: -1, createdAt: -1 });
    return docs.map((d) => formatDoc<AssessmentType>(d));
  }

  async getAssessmentsByStudentId(studentId: string): Promise<AssessmentType[]> {
    return this.getAssessments(studentId);
  }

  async createAssessment(data: Omit<AssessmentType, "id" | "createdAt">): Promise<AssessmentType> {
    await connectToDatabase();
    const doc = await Assessment.create({
      studentId: data.studentId,
      assessmentDate: data.assessmentDate || new Date().toISOString().split("T")[0],
      academicNotes: data.academicNotes,
      communicationNotes: data.communicationNotes,
      behaviourNotes: data.behaviourNotes,
      sensoryNotes: data.sensoryNotes,
      socialNotes: data.socialNotes,
      dailyLivingNotes: data.dailyLivingNotes,
      recommendations: data.recommendations
    });
    return formatDoc<AssessmentType>(doc);
  }

  // Progress Reports
  async getProgressReports(studentId?: string | null): Promise<ProgressReportType[]> {
    await connectToDatabase();
    const filter = studentId ? { studentId } : {};
    const docs = await ProgressReport.find(filter).sort({ reportDate: -1, createdAt: -1 });
    return docs.map((d) => formatDoc<ProgressReportType>(d));
  }

  async getProgressReportsByStudentId(studentId: string): Promise<ProgressReportType[]> {
    return this.getProgressReports(studentId);
  }

  async createProgressReport(data: Omit<ProgressReportType, "id" | "createdAt">): Promise<ProgressReportType> {
    await connectToDatabase();
    const doc = await ProgressReport.create({
      studentId: data.studentId,
      reportDate: data.reportDate || new Date().toISOString().split("T")[0],
      goals: data.goals.trim(),
      progress: data.progress.trim(),
      strengths: data.strengths.trim(),
      areasForImprovement: data.areasForImprovement.trim(),
      recommendations: data.recommendations.trim()
    });
    return formatDoc<ProgressReportType>(doc);
  }

  // Dashboard Metrics directly computed from MongoDB
  async getDashboardStats() {
    await connectToDatabase();
    await this.ensureCorePrograms();

    const [
      totalStudents,
      newEnquiries,
      totalEnquiries,
      upcomingAppointments,
      activePrograms,
      totalAssessments,
      totalReports
    ] = await Promise.all([
      Student.countDocuments(),
      Enquiry.countDocuments({ status: "NEW" }),
      Enquiry.countDocuments(),
      Appointment.countDocuments({ status: { $in: ["PENDING", "CONFIRMED"] } }),
      Program.countDocuments({ status: "ACTIVE" }),
      Assessment.countDocuments(),
      ProgressReport.countDocuments()
    ]);

    return {
      totalStudents,
      newEnquiries,
      totalEnquiries,
      upcomingAppointments,
      activePrograms,
      totalAssessments,
      totalReports
    };
  }
}

export const store = new MongoDataStore();
export default store;
