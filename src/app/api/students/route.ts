import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const students = await store.getStudents(search);

    return NextResponse.json({ success: true, students });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const {
      studentName,
      dateOfBirth,
      age,
      gender,
      parentName,
      phone,
      email,
      address,
      learningNeeds,
      notes
    } = body;

    if (!studentName || !parentName || !phone || !email || !learningNeeds) {
      return NextResponse.json(
        { error: "Student name, parent name, phone, email, and learning needs are required." },
        { status: 400 }
      );
    }

    const student = await store.createStudent({
      studentName: String(studentName).trim(),
      dateOfBirth: dateOfBirth ? String(dateOfBirth) : undefined,
      age: Number(age) || 6,
      gender: String(gender || "Not Specified"),
      parentName: String(parentName).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      address: address ? String(address).trim() : undefined,
      learningNeeds: String(learningNeeds).trim(),
      notes: notes ? String(notes).trim() : undefined
    });

    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create student" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Only ADMIN role can permanently delete student records
    const auth = await requireAuth(request, ["ADMIN"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Student ID is required." }, { status: 400 });
    }

    const deleted = await store.deleteStudent(id);
    if (!deleted) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Student record removed." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete student" }, { status: 500 });
  }
}
