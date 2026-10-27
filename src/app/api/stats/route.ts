import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const stats = await store.getDashboardStats();
    return NextResponse.json({ success: true, stats, user: auth.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch stats" }, { status: 500 });
  }
}
