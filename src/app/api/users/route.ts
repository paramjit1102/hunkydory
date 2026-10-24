import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";
import { hashPassword } from "@/lib/auth";
import { Role } from "@/lib/types";

// Only ADMIN can view staff user accounts
export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN"]);
    if (!auth.authorized) return auth.response!;

    const users = store.getUsers().map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    }));

    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch users" }, { status: 500 });
  }
}

// Only ADMIN can create/invite new staff or specialists
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role (ADMIN, SPECIALIST, STAFF) are required." },
        { status: 400 }
      );
    }

    const validRoles: Role[] = ["ADMIN", "SPECIALIST", "STAFF"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(", ")}` },
        { status: 400 }
      );
    }

    const existing = store.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser = store.createUser({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      passwordHash,
      role
    });

    return NextResponse.json(
      {
        success: true,
        message: `Account created for ${newUser.name} with role ${newUser.role}`,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create user" }, { status: 500 });
  }
}
