import { MetadataRoute } from "next";
import { seoStore } from "@/lib/seo-store";

export default function sitemap(): MetadataRoute.Sitemap {
  const globalConfig = seoStore.getGlobal();
  const sitemapConfig = seoStore.getSitemap();
  const pages = seoStore.getPages();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || globalConfig.siteUrl || "https://hunkydory.co.in";

  if (!sitemapConfig.enabled) {
    return [];
  }

  // Filter pages configured for inclusion in sitemap
  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((p) => p.inSitemap && !p.robots.includes("noindex"))
    .map((p) => {
      const url = p.path === "/" ? baseUrl : `${baseUrl}${p.path.startsWith("/") ? p.path : `/${p.path}`}`;
      return {
        url,
        lastModified: p.lastModified ? new Date(p.lastModified) : new Date(),
        changeFrequency: p.sitemapChangeFreq || "weekly",
        priority: p.sitemapPriority || 0.8
      };
    });

  // Include custom URLs configured by the SEO team
  const customEntries: MetadataRoute.Sitemap = (sitemapConfig.customUrls || []).map((c) => ({
    url: c.url.startsWith("http") ? c.url : `${baseUrl}${c.url.startsWith("/") ? c.url : `/${c.url}`}`,
    lastModified: c.lastModified ? new Date(c.lastModified) : new Date(),
    changeFrequency: c.changeFreq || "weekly",
    priority: c.priority || 0.8
  }));

  return [...pageEntries, ...customEntries];
}
