import { NextRequest, NextResponse } from "next/server";
import { seoStore } from "@/lib/seo-store";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) {
      return auth.response;
    }

    const data = seoStore.getAll();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Error fetching SEO data:", error);
    return NextResponse.json(
      { error: "Failed to fetch SEO configuration" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) {
      return auth.response;
    }

    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case "savePage": {
        if (!payload || !payload.path) {
          return NextResponse.json(
            { error: "Missing required page fields (path is mandatory)" },
            { status: 400 }
          );
        }
        const saved = seoStore.savePage(payload);
        return NextResponse.json({ success: true, page: saved });
      }

      case "deletePage": {
        if (!payload?.id) {
          return NextResponse.json({ error: "Missing page id" }, { status: 400 });
        }
        const ok = seoStore.deletePage(payload.id);
        return NextResponse.json({ success: ok });
      }

      case "updateRobots": {
        const updated = seoStore.updateRobots(payload);
        return NextResponse.json({ success: true, robots: updated });
      }

      case "updateSitemap": {
        const updated = seoStore.updateSitemap(payload);
        return NextResponse.json({ success: true, sitemap: updated });
      }

      case "updateLLMs": {
        const updated = seoStore.updateLLMs(payload);
        return NextResponse.json({ success: true, llms: updated });
      }

      case "updateGlobal": {
        const updated = seoStore.updateGlobal(payload);
        return NextResponse.json({ success: true, global: updated });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error("❌ Error updating SEO configuration:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update SEO configuration" },
      { status: 500 }
    );
  }
}
