import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const programs = store.getPrograms();
    return NextResponse.json({ success: true, programs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch programs" }, { status: 500 });
  }
}
