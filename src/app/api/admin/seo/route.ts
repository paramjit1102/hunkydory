import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { seoStore } from "@/lib/seo-store";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) {
      return auth.response;
    }

    const data = await seoStore.getAllAsync();
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

    let result: any = null;

    switch (action) {
      case "savePage": {
        if (!payload || !payload.path) {
          return NextResponse.json(
            { error: "Missing required page fields (path is mandatory)" },
            { status: 400 }
          );
        }
        const saved = await seoStore.savePage(payload);
        result = { success: true, page: saved };
        break;
      }

      case "deletePage": {
        if (!payload?.id) {
          return NextResponse.json({ error: "Missing page id" }, { status: 400 });
        }
        const ok = await seoStore.deletePage(payload.id);
        result = { success: ok };
        break;
      }

      case "updateRobots": {
        const updated = await seoStore.updateRobots(payload);
        result = { success: true, robots: updated };
        break;
      }

      case "updateSitemap": {
        const updated = await seoStore.updateSitemap(payload);
        result = { success: true, sitemap: updated };
        break;
      }

      case "updateLLMs": {
        const updated = await seoStore.updateLLMs(payload);
        result = { success: true, llms: updated };
        break;
      }

      case "updateGlobal": {
        const updated = await seoStore.updateGlobal(payload);
        result = { success: true, global: updated };
        break;
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    // Bust Next.js cache site-wide so changes take effect immediately on public pages
    try {
      revalidatePath("/", "layout");
    } catch (cacheErr) {
      console.warn("⚠️ [SEO API] revalidatePath warning:", cacheErr);
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ Error updating SEO configuration:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update SEO configuration" },
      { status: 500 }
    );
  }
}
