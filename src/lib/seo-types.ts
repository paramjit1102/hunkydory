export type RobotsDirective =
  | "index, follow"
  | "noindex, follow"
  | "index, nofollow"
  | "noindex, nofollow";

export type SitemapFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface PageSEO {
  id: string;
  path: string;
  pageName: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  robots: RobotsDirective;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";

  // Twitter / X
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;

  // Schema.org Structured Data
  schemaType?: "EducationalOrganization" | "MedicalBusiness" | "WebPage" | "FAQPage" | "Course" | "Custom";
  customSchemaJson?: string;

  // Sitemap settings
  inSitemap: boolean;
  sitemapPriority: number; // 0.1 to 1.0
  sitemapChangeFreq: SitemapFrequency;
  lastModified?: string;
}

export interface RobotsRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
}

export interface RobotsConfig {
  enabled: boolean;
  mode: "builder" | "custom";
  customContent?: string;
  rules: RobotsRule[];
  sitemapUrl: string;
}

export interface CustomSitemapUrl {
  id: string;
  url: string;
  priority: number;
  changeFreq: SitemapFrequency;
  lastModified?: string;
}

export interface SitemapConfig {
  enabled: boolean;
  customUrls: CustomSitemapUrl[];
}

export interface LLMsConfig {
  enabled: boolean;
  title: string;
  summary: string;
  content: string;
}

export interface GlobalSEOConfig {
  siteName: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  defaultRobots: RobotsDirective;
  siteUrl: string;
  
  // Webmaster Verification
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  yandexVerification?: string;
  
  // Analytics & Tracking
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  
  // Schema Organization Info
  telephone: string;
  email: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
  socialLinks: string[];
}

export interface FullSEOData {
  pages: PageSEO[];
  robots: RobotsConfig;
  sitemap: SitemapConfig;
  llms: LLMsConfig;
  global: GlobalSEOConfig;
  updatedAt: string;
}
