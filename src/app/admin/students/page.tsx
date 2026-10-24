"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Eye,
  X,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Student, Assessment, ProgressReport } from "@/lib/types";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentAssessments, setStudentAssessments] = useState<Assessment[]>([]);
  const [studentReports, setStudentReports] = useState<ProgressReport[]>([]);
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNewAssessmentModal, setShowNewAssessmentModal] = useState(false);
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    studentName: "",
    age: 6,
    gender: "Male",
    parentName: "",
    phone: "",
    email: "",
    address: "",
    learningNeeds: "",
    notes: ""
  });

  // New Assessment Form State
  const [newAssessment, setNewAssessment] = useState({
    academicNotes: "",
    communicationNotes: "",
    behaviourNotes: "",
    sensoryNotes: "",
    socialNotes: "",
    dailyLivingNotes: "",
    recommendations: ""
  });

  // New Report Form State
  const [newReport, setNewReport] = useState({
    goals: "",
    progress: "",
    strengths: "",
    areasForImprovement: "",
    recommendations: ""
  });

  const loadStudents = async () => {
    try {
      setLoading(true);
      const url = search ? `/api/students?search=${encodeURIComponent(search)}` : "/api/students";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [search]);

  // Load student detail data
  const handleSelectStudent = async (student: Student) => {
    setSelectedStudent(student);
    try {
      const [asmRes, repRes] = await Promise.all([
        fetch(`/api/assessments?studentId=${student.id}`),
        fetch(`/api/progress-reports?studentId=${student.id}`)
      ]);
      if (asmRes.ok) {
        const d = await asmRes.json();
        setStudentAssessments(d.assessments || []);
      }
      if (repRes.ok) {
        const d = await repRes.json();
        setStudentReports(d.progressReports || []);
      }
    } catch (err) {
      console.error("Error loading student details:", err);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent)
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewStudent({
          studentName: "",
          age: 6,
          gender: "Male",
          parentName: "",
          phone: "",
          email: "",
          address: "",
          learningNeeds: "",
          notes: ""
        });
        loadStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Are you sure you want to remove this student record?")) return;
    try {
      const res = await fetch(`/api/students?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedStudent?.id === id) setSelectedStudent(null);
        loadStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    try {
      const res = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          ...newAssessment
        })
      });
      if (res.ok) {
        setShowNewAssessmentModal(false);
        setNewAssessment({
          academicNotes: "",
          communicationNotes: "",
          behaviourNotes: "",
          sensoryNotes: "",
          socialNotes: "",
          dailyLivingNotes: "",
          recommendations: ""
        });
        handleSelectStudent(selectedStudent);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    try {
      const res = await fetch("/api/progress-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          ...newReport
        })
      });
      if (res.ok) {
        setShowNewReportModal(false);
        setNewReport({
          goals: "",
          progress: "",
          strengths: "",
          areasForImprovement: "",
          recommendations: ""
        });
        handleSelectStudent(selectedStudent);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Student Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain individualized learning profiles, assessments, and developmental goals.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name, parent, or learning needs..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Student Name</th>
                <th className="py-3.5 px-4">Age / Gender</th>
                <th className="py-3.5 px-4">Parent Contact</th>
                <th className="py-3.5 px-6">Learning Profile</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No students found matching your query.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {student.studentName}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {student.age} yrs • {student.gender}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="font-semibold text-slate-800">{student.parentName}</div>
                      <div className="text-[11px] text-slate-500">{student.phone}</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate text-slate-600">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-800 text-[11px] font-medium truncate max-w-full">
                        {student.learningNeeds}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleSelectStudent(student)}
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                        title="View Full Profile & Reports"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                        title="Delete Student Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile & Progress Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Overview */}
            <div className="border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 text-white font-black text-xl flex items-center justify-center shadow-xs">
                  {selectedStudent.studentName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {selectedStudent.studentName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedStudent.age} Years Old • {selectedStudent.gender} • Parent: {selectedStudent.parentName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs">
                <div>
                  <span className="font-bold text-slate-700">Contact: </span>
                  <span className="text-slate-600">{selectedStudent.phone} • {selectedStudent.email}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Learning Needs: </span>
                  <span className="text-slate-600">{selectedStudent.learningNeeds}</span>
                </div>
                {selectedStudent.notes && (
                  <div className="sm:col-span-2">
                    <span className="font-bold text-slate-700">Specialist Notes: </span>
                    <span className="text-slate-600">{selectedStudent.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Assessments Section */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                  <span>Clinical Assessments ({studentAssessments.length})</span>
                </h3>
                <button
                  onClick={() => setShowNewAssessmentModal(true)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 cursor-pointer"
                >
                  + Add Assessment
                </button>
              </div>

              {studentAssessments.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 bg-slate-50 rounded-xl text-center">
                  No assessments logged yet for this student.
                </p>
              ) : (
                studentAssessments.map((asm) => (
                  <div key={asm.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Date: {asm.assessmentDate}</span>
                      <span className="text-amber-700 font-mono text-[10px]">{asm.id}</span>
                    </div>
                    {asm.academicNotes && <p><span className="font-semibold text-slate-700">Academic: </span>{asm.academicNotes}</p>}
                    {asm.communicationNotes && <p><span className="font-semibold text-slate-700">Communication: </span>{asm.communicationNotes}</p>}
                    {asm.sensoryNotes && <p><span className="font-semibold text-slate-700">Sensory: </span>{asm.sensoryNotes}</p>}
                    {asm.recommendations && <p className="text-teal-800 font-medium bg-teal-50 p-2 rounded-lg"><span className="font-bold">Recommendations: </span>{asm.recommendations}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Progress Reports Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Quarterly Progress Reports ({studentReports.length})</span>
                </h3>
                <button
                  onClick={() => setShowNewReportModal(true)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 cursor-pointer"
                >
                  + Add Progress Report
                </button>
              </div>

              {studentReports.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 bg-slate-50 rounded-xl text-center">
                  No progress reports logged yet for this student.
                </p>
              ) : (
                studentReports.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Report Date: {rep.reportDate}</span>
                      <span className="text-teal-800 font-mono text-[10px]">{rep.id}</span>
                    </div>
                    <p><span className="font-semibold text-slate-700">Target Goals: </span>{rep.goals}</p>
                    <p><span className="font-semibold text-slate-700">Progress Observed: </span>{rep.progress}</p>
                    <p><span className="font-semibold text-slate-700">Core Strengths: </span>{rep.strengths}</p>
                    <p className="text-amber-900 bg-amber-50 p-2 rounded-lg font-medium">
                      <span className="font-bold">Home Recommendations: </span>{rep.recommendations}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-slate-900 mb-4">Register New Student</h2>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.studentName}
                  onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  placeholder="e.g. Arjun Kapoor"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    min="1"
                    max="18"
                    required
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  placeholder="e.g. Anjali Kapoor"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                    placeholder="+91 98765 00000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                    placeholder="parent@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Learning Profile / Needs *</label>
                <input
                  type="text"
                  required
                  value={newStudent.learningNeeds}
                  onChange={(e) => setNewStudent({ ...newStudent, learningNeeds: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  placeholder="e.g. Diverse learning needs, sensory regulation support"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Observations</label>
                <textarea
                  rows={2}
                  value={newStudent.notes}
                  onChange={(e) => setNewStudent({ ...newStudent, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  placeholder="Interests, sensory preferences..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                Save Student Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Assessment Modal */}
      {showNewAssessmentModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewAssessmentModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-black text-slate-900 mb-3">
              Log Assessment for {selectedStudent.studentName}
            </h2>

            <form onSubmit={handleAddAssessment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Observations</label>
                <textarea
                  rows={2}
                  value={newAssessment.academicNotes}
                  onChange={(e) => setNewAssessment({ ...newAssessment, academicNotes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Literacy, numeracy, attention..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Communication & Speech</label>
                <textarea
                  rows={2}
                  value={newAssessment.communicationNotes}
                  onChange={(e) => setNewAssessment({ ...newAssessment, communicationNotes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Verbal, non-verbal, AAC..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sensory & Regulation Notes</label>
                <textarea
                  rows={2}
                  value={newAssessment.sensoryNotes}
                  onChange={(e) => setNewAssessment({ ...newAssessment, sensoryNotes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Tactile, auditory, calming corners..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recommendations</label>
                <textarea
                  rows={2}
                  value={newAssessment.recommendations}
                  onChange={(e) => setNewAssessment({ ...newAssessment, recommendations: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Actionable recommendations for classroom and home..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer"
              >
                Record Assessment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Progress Report Modal */}
      {showNewReportModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewReportModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-black text-slate-900 mb-3">
              Add Progress Report for {selectedStudent.studentName}
            </h2>

            <form onSubmit={handleAddReport} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Goals *</label>
                <textarea
                  rows={2}
                  required
                  value={newReport.goals}
                  onChange={(e) => setNewReport({ ...newReport, goals: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Specific goals set for the quarter..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Progress Observed *</label>
                <textarea
                  rows={2}
                  required
                  value={newReport.progress}
                  onChange={(e) => setNewReport({ ...newReport, progress: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Milestones achieved and ongoing practice..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Core Strengths *</label>
                <textarea
                  rows={2}
                  required
                  value={newReport.strengths}
                  onChange={(e) => setNewReport({ ...newReport, strengths: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Celebrated strengths, joy, engagement..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Areas for Ongoing Support *</label>
                <textarea
                  rows={2}
                  required
                  value={newReport.areasForImprovement}
                  onChange={(e) => setNewReport({ ...newReport, areasForImprovement: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Next steps and emerging skills..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home Recommendations *</label>
                <textarea
                  rows={2}
                  required
                  value={newReport.recommendations}
                  onChange={(e) => setNewReport({ ...newReport, recommendations: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Collaborative tips for family..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer"
              >
                Publish Progress Report
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
