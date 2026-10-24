import fs from "fs";
import path from "path";
import {
  FullSEOData,
  PageSEO,
  RobotsConfig,
  SitemapConfig,
  LLMsConfig,
  GlobalSEOConfig
} from "./seo-types";
import defaultSeoJson from "@/data/seo-config.json";

const SEO_FILE_PATH = path.join(process.cwd(), "src", "data", "seo-config.json");

class SEOStore {
  private data: FullSEOData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): FullSEOData {
    try {
      if (fs.existsSync(SEO_FILE_PATH)) {
        const fileContent = fs.readFileSync(SEO_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (e) {
      console.warn("⚠️ Failed to load seo-config.json from filesystem, using default data", e);
    }
    return defaultSeoJson as FullSEOData;
  }

  private persistData(): void {
    try {
      this.data.updatedAt = new Date().toISOString();
      const dir = path.dirname(SEO_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(SEO_FILE_PATH, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (e) {
      console.error("❌ Failed to persist seo-config.json:", e);
    }
  }

  // Get full SEO dataset
  getAll(): FullSEOData {
    return this.data;
  }

  // Page SEO methods
  getPages(): PageSEO[] {
    return this.data.pages;
  }

  getPageByPath(pathname: string): PageSEO | undefined {
    const cleanPath = pathname === "" ? "/" : pathname.split("?")[0];
    return this.data.pages.find((p) => p.path === cleanPath);
  }

  getPageById(id: string): PageSEO | undefined {
    return this.data.pages.find((p) => p.id === id);
  }

  savePage(pageData: Partial<PageSEO> & { path: string }): PageSEO {
    const existingIndex = this.data.pages.findIndex(
      (p) => p.id === pageData.id || p.path === pageData.path
    );

    const now = new Date().toISOString();
    let updatedPage: PageSEO;

    if (existingIndex >= 0) {
      updatedPage = {
        ...this.data.pages[existingIndex],
        ...pageData,
        lastModified: now
      };
      this.data.pages[existingIndex] = updatedPage;
    } else {
      const id = pageData.id || `page_${Date.now()}`;
      updatedPage = {
        id,
        pageName: pageData.pageName || pageData.path,
        title: pageData.title || `${this.data.global.siteName} | Page`,
        description: pageData.description || this.data.global.defaultDescription,
        keywords: pageData.keywords || this.data.global.defaultKeywords,
        canonicalUrl: pageData.canonicalUrl || "",
        robots: pageData.robots || this.data.global.defaultRobots,
        ogTitle: pageData.ogTitle || pageData.title,
        ogDescription: pageData.ogDescription || pageData.description,
        ogImage: pageData.ogImage || this.data.global.defaultOgImage,
        ogType: pageData.ogType || "website",
        twitterCard: pageData.twitterCard || "summary_large_image",
        inSitemap: pageData.inSitemap ?? true,
        sitemapPriority: pageData.sitemapPriority ?? 0.8,
        sitemapChangeFreq: pageData.sitemapChangeFreq ?? "weekly",
        lastModified: now,
        ...pageData,
        path: pageData.path
      };
      this.data.pages.push(updatedPage);
    }

    this.persistData();
    return updatedPage;
  }

  deletePage(id: string): boolean {
    const initialLength = this.data.pages.length;
    this.data.pages = this.data.pages.filter((p) => p.id !== id);
    if (this.data.pages.length !== initialLength) {
      this.persistData();
      return true;
    }
    return false;
  }

  // Robots config
  getRobots(): RobotsConfig {
    return this.data.robots;
  }

  updateRobots(robots: Partial<RobotsConfig>): RobotsConfig {
    this.data.robots = {
      ...this.data.robots,
      ...robots
    };
    this.persistData();
    return this.data.robots;
  }

  generateRobotsTxt(): string {
    const config = this.data.robots;
    if (!config.enabled) {
      return "User-agent: *\nDisallow: /";
    }

    if (config.mode === "custom" && config.customContent?.trim()) {
      return config.customContent.trim();
    }

    // Build from rules
    const lines: string[] = ["# Dynamically generated robots.txt - Hunky Dory"];
    for (const rule of config.rules) {
      lines.push(`\nUser-agent: ${rule.userAgent}`);
      if (rule.crawlDelay && rule.crawlDelay > 0) {
        lines.push(`Crawl-delay: ${rule.crawlDelay}`);
      }
      for (const allow of rule.allow) {
        lines.push(`Allow: ${allow}`);
      }
      for (const disallow of rule.disallow) {
        lines.push(`Disallow: ${disallow}`);
      }
    }

    if (config.sitemapUrl) {
      lines.push(`\nSitemap: ${config.sitemapUrl}`);
    }

    return lines.join("\n");
  }

  // Sitemap config
  getSitemap(): SitemapConfig {
    return this.data.sitemap;
  }

  updateSitemap(sitemap: Partial<SitemapConfig>): SitemapConfig {
    this.data.sitemap = {
      ...this.data.sitemap,
      ...sitemap
    };
    this.persistData();
    return this.data.sitemap;
  }

  // LLMs config
  getLLMs(): LLMsConfig {
    return this.data.llms;
  }

  updateLLMs(llms: Partial<LLMsConfig>): LLMsConfig {
    this.data.llms = {
      ...this.data.llms,
      ...llms
    };
    this.persistData();
    return this.data.llms;
  }

  // Global SEO config
  getGlobal(): GlobalSEOConfig {
    return this.data.global;
  }

  updateGlobal(global: Partial<GlobalSEOConfig>): GlobalSEOConfig {
    this.data.global = {
      ...this.data.global,
      ...global
    };
    this.persistData();
    return this.data.global;
  }
}

// Global singleton
const globalForSeo = globalThis as unknown as { seoStoreInstance?: SEOStore };

export const seoStore = globalForSeo.seoStoreInstance || new SEOStore();
if (process.env.NODE_ENV !== "production") {
  globalForSeo.seoStoreInstance = seoStore;
}

/**
 * Standard Next.js Metadata generator for pages that consumes SEO store configuration
 */
export function generatePageMetadata(pathname: string, fallback?: Record<string, any>) {
  const page = seoStore.getPageByPath(pathname);
  const globalConfig = seoStore.getGlobal();

  if (!page) {
    return {
      title: fallback?.title || globalConfig.siteName,
      description: fallback?.description || globalConfig.defaultDescription,
      ...fallback
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords && page.keywords.length > 0 ? page.keywords : globalConfig.defaultKeywords,
    alternates: page.canonicalUrl ? { canonical: page.canonicalUrl } : undefined,
    openGraph: {
      title: page.ogTitle || page.title,
      description: page.ogDescription || page.description,
      images: page.ogImage ? [{ url: page.ogImage }] : undefined,
      type: page.ogType || "website"
    },
    twitter: {
      card: page.twitterCard || "summary_large_image",
      title: page.twitterTitle || page.ogTitle || page.title,
      description: page.twitterDescription || page.ogDescription || page.description,
      images: page.twitterImage || page.ogImage ? [page.twitterImage || page.ogImage!] : undefined
    },
    robots: {
      index: !page.robots.includes("noindex"),
      follow: !page.robots.includes("nofollow")
    }
  };
}
