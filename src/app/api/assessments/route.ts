import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");

    const assessments = studentId
      ? store.getAssessmentsByStudentId(studentId)
      : store.getAssessments();

    return NextResponse.json({ success: true, assessments });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch assessments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const {
      studentId,
      assessmentDate,
      academicNotes,
      communicationNotes,
      behaviourNotes,
      sensoryNotes,
      socialNotes,
      dailyLivingNotes,
      recommendations
    } = body;

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required." }, { status: 400 });
    }

    const assessment = store.createAssessment({
      studentId,
      assessmentDate: assessmentDate || new Date().toISOString().split("T")[0],
      academicNotes: academicNotes ? String(academicNotes).trim() : undefined,
      communicationNotes: communicationNotes ? String(communicationNotes).trim() : undefined,
      behaviourNotes: behaviourNotes ? String(behaviourNotes).trim() : undefined,
      sensoryNotes: sensoryNotes ? String(sensoryNotes).trim() : undefined,
      socialNotes: socialNotes ? String(socialNotes).trim() : undefined,
      dailyLivingNotes: dailyLivingNotes ? String(dailyLivingNotes).trim() : undefined,
      recommendations: recommendations ? String(recommendations).trim() : undefined
    });

    return NextResponse.json({ success: true, assessment }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create assessment" }, { status: 500 });
  }
}
