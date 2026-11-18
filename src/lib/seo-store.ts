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
import { connectToDatabase } from "./mongodb";
import { SEOConfigModel } from "@/models";

const SEO_FILE_PATH = path.join(process.cwd(), "src", "data", "seo-config.json");

class SEOStore {
  private data: FullSEOData;
  private lastDbFetchTime: number = 0;
  private syncPromise: Promise<FullSEOData> | null = null;

  constructor() {
    this.data = this.loadInitialData();
  }

  private loadInitialData(): FullSEOData {
    try {
      if (fs.existsSync(SEO_FILE_PATH)) {
        const fileContent = fs.readFileSync(SEO_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch {
      // Fallback to bundled JSON
    }
    return defaultSeoJson as FullSEOData;
  }

  /**
   * Syncs with MongoDB database to ensure serverless instances share identical state
   */
  async ensureDbSynced(force: boolean = false): Promise<FullSEOData> {
    const now = performance.now();
    // Cache for 30 seconds (30,000ms) unless explicitly forced
    if (!force && this.lastDbFetchTime > 0 && now - this.lastDbFetchTime < 30000) {
      return this.data;
    }

    if (this.syncPromise) {
      return this.syncPromise;
    }

    this.syncPromise = (async () => {
      try {
        await connectToDatabase();
        const record = await SEOConfigModel.findOne({ key: "global_seo" }).lean();

        if (record && record.data) {
          const dbData = record.data as FullSEOData;
          this.data = {
            ...this.data,
            ...dbData,
            global: {
              ...this.data.global,
              ...(dbData.global || {})
            }
          };
          this.lastDbFetchTime = performance.now();
        } else {
          // First run: seed MongoDB with initial defaults
          await SEOConfigModel.create({
            key: "global_seo",
            data: this.data
          });
          this.lastDbFetchTime = performance.now();
        }
      } catch (e) {
        console.warn("⚠️ [SEOStore] MongoDB sync notice (using cached data):", e);
      } finally {
        this.syncPromise = null;
      }
      return this.data;
    })();

    return this.syncPromise;
  }

  private async persistData(): Promise<void> {
    this.data.updatedAt = new Date().toISOString();
    this.lastDbFetchTime = performance.now();

    // 1. Persist to MongoDB
    try {
      await connectToDatabase();
      await SEOConfigModel.findOneAndUpdate(
        { key: "global_seo" },
        { $set: { data: this.data } },
        { upsert: true, returnDocument: "after" }
      );
    } catch (e) {
      console.error("❌ [SEOStore] Failed to persist SEO config to MongoDB:", e);
    }

    // 2. Persist to local JSON file if filesystem allows (dev / local build)
    try {
      const dir = path.dirname(SEO_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(SEO_FILE_PATH, JSON.stringify(this.data, null, 2), "utf-8");
    } catch {
      // In read-only serverless environments (like Vercel), this is expected to fail silently
    }
  }

  // Get full SEO dataset synchronously
  getAll(): FullSEOData {
    return this.data;
  }

  // Get full SEO dataset asynchronously with DB sync
  async getAllAsync(): Promise<FullSEOData> {
    await this.ensureDbSynced();
    return this.data;
  }

  // Page SEO methods
  getPages(): PageSEO[] {
    return this.data.pages;
  }

  async getPagesAsync(): Promise<PageSEO[]> {
    await this.ensureDbSynced();
    return this.data.pages;
  }

  getPageByPath(pathname: string): PageSEO | undefined {
    const cleanPath = pathname === "" ? "/" : pathname.split("?")[0];
    return this.data.pages.find((p) => p.path === cleanPath);
  }

  async getPageByPathAsync(pathname: string): Promise<PageSEO | undefined> {
    await this.ensureDbSynced();
    return this.getPageByPath(pathname);
  }

  getPageById(id: string): PageSEO | undefined {
    return this.data.pages.find((p) => p.id === id);
  }

  async savePage(pageData: Partial<PageSEO> & { path: string }): Promise<PageSEO> {
    await this.ensureDbSynced();

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

    await this.persistData();
    return updatedPage;
  }

  async deletePage(id: string): Promise<boolean> {
    await this.ensureDbSynced();
    const initialLength = this.data.pages.length;
    this.data.pages = this.data.pages.filter((p) => p.id !== id);
    if (this.data.pages.length !== initialLength) {
      await this.persistData();
      return true;
    }
    return false;
  }

  // Robots config
  getRobots(): RobotsConfig {
    return this.data.robots;
  }

  async getRobotsAsync(): Promise<RobotsConfig> {
    await this.ensureDbSynced();
    return this.data.robots;
  }

  async updateRobots(robots: Partial<RobotsConfig>): Promise<RobotsConfig> {
    await this.ensureDbSynced();
    this.data.robots = {
      ...this.data.robots,
      ...robots
    };
    await this.persistData();
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

  async getSitemapAsync(): Promise<SitemapConfig> {
    await this.ensureDbSynced();
    return this.data.sitemap;
  }

  async updateSitemap(sitemap: Partial<SitemapConfig>): Promise<SitemapConfig> {
    await this.ensureDbSynced();
    this.data.sitemap = {
      ...this.data.sitemap,
      ...sitemap
    };
    await this.persistData();
    return this.data.sitemap;
  }

  // LLMs config
  getLLMs(): LLMsConfig {
    return this.data.llms;
  }

  async getLLMsAsync(): Promise<LLMsConfig> {
    await this.ensureDbSynced();
    return this.data.llms;
  }

  async updateLLMs(llms: Partial<LLMsConfig>): Promise<LLMsConfig> {
    await this.ensureDbSynced();
    this.data.llms = {
      ...this.data.llms,
      ...llms
    };
    await this.persistData();
    return this.data.llms;
  }

  // Global SEO config
  getGlobal(): GlobalSEOConfig {
    return this.data.global;
  }

  async getGlobalAsync(): Promise<GlobalSEOConfig> {
    await this.ensureDbSynced();
    return this.data.global;
  }

  async updateGlobal(global: Partial<GlobalSEOConfig>): Promise<GlobalSEOConfig> {
    await this.ensureDbSynced();
    this.data.global = {
      ...this.data.global,
      ...global
    };
    await this.persistData();
    return this.data.global;
  }
}

// Global singleton across hot reloads
const globalForSeo = globalThis as unknown as { seoStoreInstance?: SEOStore };

export const seoStore = globalForSeo.seoStoreInstance || new SEOStore();
if (process.env.NODE_ENV !== "production") {
  globalForSeo.seoStoreInstance = seoStore;
}

/**
 * Standard Next.js Metadata generator for pages that consumes SEO store configuration
 */
export async function generatePageMetadata(pathname: string, fallback?: Record<string, any>) {
  const globalConfig = await seoStore.getGlobalAsync();
  const page = await seoStore.getPageByPathAsync(pathname);

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
