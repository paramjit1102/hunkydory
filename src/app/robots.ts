import { MetadataRoute } from "next";
import { seoStore } from "@/lib/seo-store";

export default function robots(): MetadataRoute.Robots {
  const config = seoStore.getRobots();
  const globalConfig = seoStore.getGlobal();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || globalConfig.siteUrl || "https://hunkydory.co.in";

  if (!config.enabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"]
      }
    };
  }

  // If in custom mode, parse custom rules
  if (config.mode === "custom" && config.customContent?.trim()) {
    const lines = config.customContent.split("\n");
    let currentAgent = "*";
    const rulesMap = new Map<string, { allow: string[]; disallow: string[] }>();
    let parsedSitemap = config.sitemapUrl || `${baseUrl}/sitemap.xml`;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      if (line.toLowerCase().startsWith("user-agent:")) {
        currentAgent = line.substring(11).trim() || "*";
        if (!rulesMap.has(currentAgent)) {
          rulesMap.set(currentAgent, { allow: [], disallow: [] });
        }
      } else if (line.toLowerCase().startsWith("allow:")) {
        const path = line.substring(6).trim();
        if (path) {
          if (!rulesMap.has(currentAgent)) rulesMap.set(currentAgent, { allow: [], disallow: [] });
          rulesMap.get(currentAgent)!.allow.push(path);
        }
      } else if (line.toLowerCase().startsWith("disallow:")) {
        const path = line.substring(9).trim();
        if (path) {
          if (!rulesMap.has(currentAgent)) rulesMap.set(currentAgent, { allow: [], disallow: [] });
          rulesMap.get(currentAgent)!.disallow.push(path);
        }
      } else if (line.toLowerCase().startsWith("sitemap:")) {
        parsedSitemap = line.substring(8).trim();
      }
    }

    const parsedRules = Array.from(rulesMap.entries()).map(([userAgent, r]) => ({
      userAgent,
      allow: r.allow.length > 0 ? r.allow : undefined,
      disallow: r.disallow.length > 0 ? r.disallow : undefined
    }));

    return {
      rules: parsedRules.length > 0 ? parsedRules : { userAgent: "*", allow: ["/"], disallow: ["/admin/", "/api/"] },
      sitemap: parsedSitemap
    };
  }

  // Builder mode:
  const sitemapUrl = config.sitemapUrl || `${baseUrl}/sitemap.xml`;
  const rules = (config.rules && config.rules.length > 0)
    ? config.rules.map((r) => ({
        userAgent: r.userAgent || "*",
        allow: r.allow && r.allow.length > 0 ? r.allow : ["/"],
        disallow: r.disallow || ["/admin/", "/api/"],
        ...(r.crawlDelay && r.crawlDelay > 0 ? { crawlDelay: r.crawlDelay } : {})
      }))
    : {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin/", "/api/"]
      };

  return {
    rules,
    sitemap: sitemapUrl
  };
}
