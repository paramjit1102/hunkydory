import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");

    const reports = await store.getProgressReports(studentId);

    return NextResponse.json({ success: true, progressReports: reports });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch progress reports" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const {
      studentId,
      reportDate,
      goals,
      progress,
      strengths,
      areasForImprovement,
      recommendations
    } = body;

    if (!studentId || !goals || !progress || !strengths || !areasForImprovement || !recommendations) {
      return NextResponse.json(
        { error: "Student ID, goals, progress, strengths, areas for improvement and recommendations are required." },
        { status: 400 }
      );
    }

    const report = await store.createProgressReport({
      studentId,
      reportDate: reportDate || new Date().toISOString().split("T")[0],
      goals: String(goals).trim(),
      progress: String(progress).trim(),
      strengths: String(strengths).trim(),
      areasForImprovement: String(areasForImprovement).trim(),
      recommendations: String(recommendations).trim()
    });

    return NextResponse.json({ success: true, progressReport: report }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create progress report" }, { status: 500 });
  }
}
