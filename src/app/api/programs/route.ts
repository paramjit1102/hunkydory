import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";
import { ProgramStatus } from "@/lib/types";

// Public & Admin: Fetch all programs (supports optional ?status=ACTIVE and ?search=...)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as ProgramStatus | null;
    const search = searchParams.get("search");

    const programs = await store.getPrograms(status, search || undefined);
    return NextResponse.json({ success: true, programs });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

// Protected (ADMIN, SUPERADMIN): Create new program
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SUPERADMIN"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const { name, slug, description, category, badge, iconName, features, status } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Program name and description are required fields." },
        { status: 400 }
      );
    }

    // Auto-generate or sanitize slug
    const cleanSlug = (slug || name)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug is unique
    const existing = await store.getProgramBySlug(cleanSlug);
    if (existing) {
      return NextResponse.json(
        { error: `A program with the slug "${cleanSlug}" already exists. Please choose a different title or slug.` },
        { status: 409 }
      );
    }

    const newProgram = await store.createProgram({
      name: String(name).trim(),
      slug: cleanSlug,
      description: String(description).trim(),
      category: category ? String(category).trim() : "Developmental",
      badge: badge ? String(badge).trim() : "All Ages",
      iconName: iconName ? String(iconName).trim() : "Sparkles",
      status: (status as ProgramStatus) || "ACTIVE",
      features: Array.isArray(features) ? features : []
    });

    return NextResponse.json(
      {
        success: true,
        message: `Program "${newProgram.name}" created successfully!`,
        program: newProgram
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create program" },
      { status: 500 }
    );
  }
}

// Protected (ADMIN, SUPERADMIN): Update existing program
export async function PUT(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SUPERADMIN"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const { id, name, slug, description, category, badge, iconName, features, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Program ID is required." }, { status: 400 });
    }

    // If slug is changed, check uniqueness
    if (slug) {
      const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await store.getProgramBySlug(cleanSlug);
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: `Another program with the slug "${cleanSlug}" already exists.` },
          { status: 409 }
        );
      }
    }

    const updates: any = {};
    if (name !== undefined) updates.name = String(name).trim();
    if (slug !== undefined) updates.slug = String(slug).trim();
    if (description !== undefined) updates.description = String(description).trim();
    if (category !== undefined) updates.category = String(category).trim();
    if (badge !== undefined) updates.badge = String(badge).trim();
    if (iconName !== undefined) updates.iconName = String(iconName).trim();
    if (status !== undefined) updates.status = status as ProgramStatus;
    if (features !== undefined) updates.features = Array.isArray(features) ? features : [];

    const updated = await store.updateProgram(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Program "${updated.name}" updated successfully!`,
      program: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update program" },
      { status: 500 }
    );
  }
}

// Also support PATCH for partial updates (e.g., quick status toggle)
export async function PATCH(request: Request) {
  return PUT(request);
}

// Protected (ADMIN, SUPERADMIN): Delete program
export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SUPERADMIN"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Program ID is required." }, { status: 400 });
    }

    const deleted = await store.deleteProgram(id);
    if (!deleted) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Program deleted successfully."
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete program" },
      { status: 500 }
    );
  }
}
