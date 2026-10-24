import { seoStore } from "@/lib/seo-store";

export async function GET() {
  const llms = seoStore.getLLMs();
  if (!llms.enabled) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(llms.content || "", {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
