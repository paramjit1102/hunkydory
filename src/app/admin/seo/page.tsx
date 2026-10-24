"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Bot,
  Map,
  FileCode,
  Settings2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Share2,
  Sliders,
  Code,
  Check,
  X,
  FileText,
  ShieldAlert,
  Loader2,
  Info
} from "lucide-react";
import {
  PageSEO,
  RobotsConfig,
  SitemapConfig,
  LLMsConfig,
  GlobalSEOConfig,
  FullSEOData,
  RobotsRule,
  CustomSitemapUrl
} from "@/lib/seo-types";

export default function AdminSEOPage() {
  const [activeTab, setActiveTab] = useState<"pages" | "robots" | "sitemap" | "llms" | "global">("pages");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Data states
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [robots, setRobots] = useState<RobotsConfig | null>(null);
  const [sitemap, setSitemap] = useState<SitemapConfig | null>(null);
  const [llms, setLLMs] = useState<LLMsConfig | null>(null);
  const [globalConfig, setGlobalConfig] = useState<GlobalSEOConfig | null>(null);

  // Page Search & Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Page SEO Modal
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null);
  const [isNewPage, setIsNewPage] = useState(false);
  const [pageModalTab, setPageModalTab] = useState<"meta" | "social" | "schema" | "preview">("meta");
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"google" | "facebook" | "twitter">("google");

  // Custom Sitemap URL Modal
  const [showCustomUrlModal, setShowCustomUrlModal] = useState(false);
  const [newCustomUrl, setNewCustomUrl] = useState<Omit<CustomSitemapUrl, "id">>({
    url: "",
    priority: 0.8,
    changeFreq: "weekly"
  });

  // Fetch full SEO data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seo");
      if (!res.ok) throw new Error("Failed to load SEO data");
      const data: FullSEOData = await res.json();
      setPages(data.pages || []);
      setRobots(data.robots || null);
      setSitemap(data.sitemap || null);
      setLLMs(data.llms || null);
      setGlobalConfig(data.global || null);
    } catch (err: any) {
      setNotification({ type: "error", message: err.message || "Failed to load SEO configuration" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Dispatch API action
  const saveAction = async (action: string, payload: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, payload })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      showToast("success", "SEO configuration successfully updated!");
      await fetchData();
      return true;
    } catch (err: any) {
      showToast("error", err.message || "Failed to save");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Page SEO Save
  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    const success = await saveAction("savePage", editingPage);
    if (success) {
      setEditingPage(null);
    }
  };

  // Page SEO Delete
  const handleDeletePage = async (id: string, pageName: string) => {
    if (!confirm(`Are you sure you want to remove SEO configuration for "${pageName}"?`)) return;
    await saveAction("deletePage", { id });
  };

  // Robots Save
  const handleSaveRobots = async () => {
    if (!robots) return;
    await saveAction("updateRobots", robots);
  };

  // Sitemap Save
  const handleSaveSitemap = async () => {
    if (!sitemap) return;
    await saveAction("updateSitemap", sitemap);
  };

  // LLMs Save
  const handleSaveLLMs = async () => {
    if (!llms) return;
    await saveAction("updateLLMs", llms);
  };

  // Global Save
  const handleSaveGlobal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalConfig) return;
    await saveAction("updateGlobal", globalConfig);
  };

  // Add Custom URL to Sitemap
  const handleAddCustomUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sitemap || !newCustomUrl.url) return;
    const item: CustomSitemapUrl = {
      ...newCustomUrl,
      id: `url_${Date.now()}`,
      lastModified: new Date().toISOString()
    };
    const updated = {
      ...sitemap,
      customUrls: [...(sitemap.customUrls || []), item]
    };
    setSitemap(updated);
    await saveAction("updateSitemap", updated);
    setShowCustomUrlModal(false);
    setNewCustomUrl({ url: "", priority: 0.8, changeFreq: "weekly" });
  };

  const handleDeleteCustomUrl = async (id: string) => {
    if (!sitemap) return;
    const updated = {
      ...sitemap,
      customUrls: sitemap.customUrls.filter((c) => c.id !== id)
    };
    setSitemap(updated);
    await saveAction("updateSitemap", updated);
  };

  // Filter pages
  const filteredPages = pages.filter(
    (p) =>
      p.pageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for title/description quality score
  const getLengthBadge = (len: number, min: number, max: number) => {
    if (len >= min && len <= max) {
      return <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{len} chars (Optimal)</span>;
    }
    if (len > max) {
      return <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">{len} chars (Too Long: max {max})</span>;
    }
    return <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{len} chars (Short: min {min})</span>;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-600">Loading SEO Management Console...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-bold border transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B1E36] via-[#112D4E] to-[#0B1E36] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <Globe className="w-3.5 h-3.5" />
              <span>Full-Stack SEO Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              SEO & Crawlers Command Center
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed">
              Comprehensive on-page SEO management, real-time Google & Social SERP previews, dynamic <code className="text-amber-300 bg-white/10 px-1 py-0.5 rounded">robots.txt</code>, <code className="text-amber-300 bg-white/10 px-1 py-0.5 rounded">sitemap.xml</code>, and modern <code className="text-amber-300 bg-white/10 px-1 py-0.5 rounded">llms.txt</code> for AI search engines.
            </p>
          </div>

          {/* Quick Endpoints Badges */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-sm border border-white/10 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-amber-300">
                <Bot className="w-3.5 h-3.5" /> /robots.txt
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-sm border border-white/10 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Map className="w-3.5 h-3.5" /> /sitemap.xml
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>

            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-sm border border-white/10 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-sky-300">
                <FileCode className="w-3.5 h-3.5" /> /llms.txt (AI)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("pages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "pages"
              ? "bg-[#0B1E36] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>Page SEO ({pages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("robots")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "robots"
              ? "bg-[#0B1E36] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <Bot className="w-4 h-4 text-amber-400" />
          <span>Robots.txt Editor</span>
        </button>

        <button
          onClick={() => setActiveTab("sitemap")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "sitemap"
              ? "bg-[#0B1E36] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <Map className="w-4 h-4 text-emerald-400" />
          <span>XML Sitemap ({pages.filter((p) => p.inSitemap).length + (sitemap?.customUrls?.length || 0)})</span>
        </button>

        <button
          onClick={() => setActiveTab("llms")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "llms"
              ? "bg-[#0B1E36] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <FileCode className="w-4 h-4 text-sky-400" />
          <span>LLMs.txt (AI Crawlers)</span>
        </button>

        <button
          onClick={() => setActiveTab("global")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "global"
              ? "bg-[#0B1E36] text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <Settings2 className="w-4 h-4 text-violet-400" />
          <span>Global SEO & Analytics</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PAGE SEO (ON-PAGE SEO) */}
      {/* ========================================================================= */}
      {activeTab === "pages" && (
        <div className="space-y-6">
          {/* Action & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search page by name, path, or meta title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <button
              onClick={() => {
                setIsNewPage(true);
                setEditingPage({
                  id: `page_${Date.now()}`,
                  path: "/new-page",
                  pageName: "New Landing Page",
                  title: `${globalConfig?.siteName || "Hunky Dory"} | New Page`,
                  description: globalConfig?.defaultDescription || "",
                  keywords: ["child development", "special education"],
                  robots: "index, follow",
                  ogTitle: "",
                  ogDescription: "",
                  ogImage: "/og-image.png",
                  twitterCard: "summary_large_image",
                  schemaType: "WebPage",
                  inSitemap: true,
                  sitemapPriority: 0.8,
                  sitemapChangeFreq: "weekly"
                });
                setPageModalTab("meta");
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Page SEO</span>
            </button>
          </div>

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                      {page.path}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          page.robots.includes("noindex")
                            ? "bg-rose-100 text-rose-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {page.robots}
                      </span>
                      {page.inSitemap ? (
                        <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                          Sitemap {page.sitemapPriority}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          No Sitemap
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base leading-tight mb-2">
                    {page.pageName}
                  </h3>

                  {/* Meta Title */}
                  <div className="space-y-1 mb-2.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Meta Title</span>
                      {getLengthBadge(page.title.length, 45, 65)}
                    </div>
                    <p className="text-xs text-slate-800 font-medium line-clamp-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {page.title}
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Meta Description</span>
                      {getLengthBadge(page.description.length, 120, 165)}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-relaxed">
                      {page.description}
                    </p>
                  </div>

                  {/* Focus Keywords Tags */}
                  {page.keywords && page.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {page.keywords.slice(0, 4).map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                        >
                          #{kw}
                        </span>
                      ))}
                      {page.keywords.length > 4 && (
                        <span className="text-[10px] font-bold text-slate-400">
                          +{page.keywords.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors"
                  >
                    <span>View Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    {page.path !== "/" && (
                      <button
                        onClick={() => handleDeletePage(page.id, page.pageName)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete page SEO"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsNewPage(false);
                        setEditingPage({ ...page });
                        setPageModalTab("meta");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Edit SEO</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ROBOTS.TXT EDITOR */}
      {/* ========================================================================= */}
      {activeTab === "robots" && robots && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-black text-slate-900">Robots.txt Directive Engine</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Control which search engines, web spiders, and AI crawlers can index your website.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robots.enabled}
                  onChange={(e) => setRobots({ ...robots, enabled: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Enable robots.txt</span>
              </label>

              <button
                onClick={handleSaveRobots}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#162D4A] text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-amber-400" />}
                <span>Save Robots.txt</span>
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setRobots({ ...robots, mode: "builder" })}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                robots.mode === "builder" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Visual Rule Builder
            </button>
            <button
              onClick={() => setRobots({ ...robots, mode: "custom" })}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                robots.mode === "custom" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Direct Raw Text Editor
            </button>
          </div>

          {robots.mode === "builder" ? (
            <div className="space-y-6">
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    setRobots({
                      ...robots,
                      rules: [
                        { userAgent: "*", allow: ["/"], disallow: ["/admin/", "/api/"], crawlDelay: 0 },
                        { userAgent: "GPTBot", allow: ["/"], disallow: ["/admin/"] },
                        { userAgent: "Claude-Web", allow: ["/"], disallow: ["/admin/"] },
                        { userAgent: "PerplexityBot", allow: ["/"], disallow: ["/admin/"] }
                      ]
                    })
                  }
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Recommended Standard
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setRobots({
                      ...robots,
                      rules: [{ userAgent: "*", allow: ["/"], disallow: [] }]
                    })
                  }
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Allow All
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setRobots({
                      ...robots,
                      rules: [
                        { userAgent: "*", allow: ["/"], disallow: ["/admin/", "/api/"] },
                        { userAgent: "GPTBot", allow: [], disallow: ["/"] },
                        { userAgent: "Claude-Web", allow: [], disallow: ["/"] },
                        { userAgent: "CCBot", allow: [], disallow: ["/"] }
                      ]
                    })
                  }
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Block AI Crawlers
                </button>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {robots.rules.map((rule, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                          User-Agent:
                        </label>
                        <input
                          type="text"
                          value={rule.userAgent}
                          onChange={(e) => {
                            const updated = [...robots.rules];
                            updated[idx].userAgent = e.target.value;
                            setRobots({ ...robots, rules: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-bold bg-white focus:outline-none focus:border-amber-500 w-48"
                        />
                      </div>

                      {robots.rules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = robots.rules.filter((_, i) => i !== idx);
                            setRobots({ ...robots, rules: updated });
                          }}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800"
                        >
                          Remove Rule
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Allowed Paths (comma separated)
                        </label>
                        <input
                          type="text"
                          value={rule.allow.join(", ")}
                          onChange={(e) => {
                            const updated = [...robots.rules];
                            updated[idx].allow = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setRobots({ ...robots, rules: updated });
                          }}
                          placeholder="/"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Disallowed Paths (comma separated)
                        </label>
                        <input
                          type="text"
                          value={rule.disallow.join(", ")}
                          onChange={(e) => {
                            const updated = [...robots.rules];
                            updated[idx].disallow = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setRobots({ ...robots, rules: updated });
                          }}
                          placeholder="/admin/, /api/"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setRobots({
                      ...robots,
                      rules: [...robots.rules, { userAgent: "NewBot", allow: ["/"], disallow: ["/admin/"] }]
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another User-Agent Rule</span>
                </button>
              </div>

              {/* Sitemap URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sitemap Reference URL
                </label>
                <input
                  type="text"
                  value={robots.sitemapUrl}
                  onChange={(e) => setRobots({ ...robots, sitemapUrl: e.target.value })}
                  placeholder="https://hunkydory.co.in/sitemap.xml"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700">
                Raw Content for /robots.txt
              </label>
              <textarea
                rows={12}
                value={robots.customContent || ""}
                onChange={(e) => setRobots({ ...robots, customContent: e.target.value })}
                placeholder="# User-agent: *&#10;Allow: /&#10;Disallow: /admin/"
                className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-mono bg-slate-900 text-amber-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: XML SITEMAP */}
      {/* ========================================================================= */}
      {activeTab === "sitemap" && sitemap && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-black text-slate-900">XML Sitemap Indexer</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage search engine crawl priorities, change frequencies, and custom indexing paths.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCustomUrlModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom URL</span>
              </button>

              <button
                onClick={handleSaveSitemap}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#162D4A] text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-amber-400" />}
                <span>Save Sitemap</span>
              </button>
            </div>
          </div>

          {/* Master Switch */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-sm font-bold text-slate-800">Dynamic /sitemap.xml Generation</p>
              <p className="text-xs text-slate-500">When enabled, Next.js dynamically serves the live XML sitemap.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sitemap.enabled}
                onChange={(e) => setSitemap({ ...sitemap, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {/* Core Pages Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Website Pages</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Page</th>
                    <th className="p-3.5">Route</th>
                    <th className="p-3.5">In Sitemap</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Frequency</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pages.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">{p.pageName}</td>
                      <td className="p-3.5 font-mono text-amber-700">{p.path}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.inSitemap ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {p.inSitemap ? "Indexed" : "Excluded"}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold">{p.sitemapPriority}</td>
                      <td className="p-3.5 font-semibold text-slate-500 capitalize">{p.sitemapChangeFreq}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setEditingPage({ ...p });
                            setPageModalTab("meta");
                          }}
                          className="text-amber-700 hover:text-amber-900 font-bold"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom Sitemap URLs */}
          {sitemap.customUrls && sitemap.customUrls.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Custom Indexed URLs</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Custom URL</th>
                      <th className="p-3.5">Priority</th>
                      <th className="p-3.5">Frequency</th>
                      <th className="p-3.5 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sitemap.customUrls.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5 font-mono text-slate-900">{c.url}</td>
                        <td className="p-3.5 font-bold">{c.priority}</td>
                        <td className="p-3.5 font-semibold capitalize">{c.changeFreq}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteCustomUrl(c.id)}
                            className="text-rose-600 hover:text-rose-800 font-bold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: LLMS.TXT (AI SEARCH ENGINES & CRAWLERS) */}
      {/* ========================================================================= */}
      {activeTab === "llms" && llms && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold mb-2">
                <Sparkles className="w-3 h-3 text-sky-600" />
                <span>Next-Gen AI Standard (llmstxt.org)</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">LLMs.txt Knowledge Manifest</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Provide structured, markdown-formatted knowledge for LLMs like ChatGPT, Claude, and Perplexity when parents ask questions about your centre.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={llms.enabled}
                  onChange={(e) => setLLMs({ ...llms, enabled: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Enable /llms.txt</span>
              </label>

              <button
                onClick={handleSaveLLMs}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#162D4A] text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-amber-400" />}
                <span>Save LLMs.txt</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Document H1 Title
              </label>
              <input
                type="text"
                value={llms.title}
                onChange={(e) => setLLMs({ ...llms, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Summary / Executive Overview
              </label>
              <input
                type="text"
                value={llms.summary}
                onChange={(e) => setLLMs({ ...llms, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Full Markdown Content</span>
              <span className="text-slate-400 font-normal">Markdown format conforms to llmstxt.org</span>
            </div>
            <textarea
              rows={18}
              value={llms.content}
              onChange={(e) => setLLMs({ ...llms, content: e.target.value })}
              className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-mono bg-slate-900 text-emerald-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: GLOBAL SEO & ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === "global" && globalConfig && (
        <form onSubmit={handleSaveGlobal} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-black text-slate-900">Global Website SEO & Tracking</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Site-wide metadata templates, Google Search Console, Bing Webmaster tags, and analytics IDs.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#162D4A] text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-amber-400" />}
              <span>Save Global Settings</span>
            </button>
          </div>

          {/* Section 1: Branding & Defaults */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" />
              <span>General Site Defaults</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site Brand Name</label>
                <input
                  type="text"
                  value={globalConfig.siteName}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, siteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Title Template <span className="font-normal text-slate-400">(use %s for page title)</span>
                </label>
                <input
                  type="text"
                  value={globalConfig.titleTemplate}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, titleTemplate: e.target.value })}
                  placeholder="%s | Hunky Dory"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Default Meta Description</label>
              <textarea
                rows={2}
                value={globalConfig.defaultDescription}
                onChange={(e) => setGlobalConfig({ ...globalConfig, defaultDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Canonical Base URL</label>
                <input
                  type="url"
                  value={globalConfig.siteUrl}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, siteUrl: e.target.value })}
                  placeholder="https://hunkydory.co.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Default OG Image Path</label>
                <input
                  type="text"
                  value={globalConfig.defaultOgImage}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, defaultOgImage: e.target.value })}
                  placeholder="/og-image.png"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Webmaster Verifications */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Webmaster Verification Codes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Search Console Verification
                </label>
                <input
                  type="text"
                  value={globalConfig.googleSiteVerification || ""}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, googleSiteVerification: e.target.value })}
                  placeholder="google-site-verification token"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bing Webmaster Verification
                </label>
                <input
                  type="text"
                  value={globalConfig.bingSiteVerification || ""}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, bingSiteVerification: e.target.value })}
                  placeholder="msvalidate.01 token"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Analytics & Tag Manager */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Analytics & Tag Tracking</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Analytics 4 (GA4 ID)
                </label>
                <input
                  type="text"
                  value={globalConfig.googleAnalyticsId || ""}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, googleAnalyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Tag Manager (GTM ID)
                </label>
                <input
                  type="text"
                  value={globalConfig.googleTagManagerId || ""}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, googleTagManagerId: e.target.value })}
                  placeholder="GTM-XXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Schema.org Organization Info */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-600" />
              <span>Structured Data Organization Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Phone</label>
                <input
                  type="text"
                  value={globalConfig.telephone}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, telephone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={globalConfig.email}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={globalConfig.streetAddress}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, streetAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT PAGE SEO */}
      {/* ========================================================================= */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 border-2 border-amber-300 shadow-2xl relative max-h-[92vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-black text-slate-900">
                  {isNewPage ? "Create Page SEO" : `Edit SEO: ${editingPage.pageName}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex items-center gap-2 pt-4 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setPageModalTab("meta")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pageModalTab === "meta" ? "bg-amber-100 text-amber-900" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                1. Metadata & Keywords
              </button>
              <button
                type="button"
                onClick={() => setPageModalTab("social")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pageModalTab === "social" ? "bg-amber-100 text-amber-900" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                2. Social / Open Graph
              </button>
              <button
                type="button"
                onClick={() => setPageModalTab("schema")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pageModalTab === "schema" ? "bg-amber-100 text-amber-900" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                3. Schema & Sitemap
              </button>
              <button
                type="button"
                onClick={() => setPageModalTab("preview")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  pageModalTab === "preview" ? "bg-[#0B1E36] text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live SERP Preview</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSavePage} className="flex-1 py-4 space-y-4">
              {/* SUBTAB 1: META */}
              {pageModalTab === "meta" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Page Path / URL Route <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPage.path}
                        onChange={(e) => setEditingPage({ ...editingPage, path: e.target.value })}
                        placeholder="/about"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Page Display Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPage.pageName}
                        onChange={(e) => setEditingPage({ ...editingPage, pageName: e.target.value })}
                        placeholder="About Us"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Meta Title</label>
                      {getLengthBadge(editingPage.title.length, 45, 65)}
                    </div>
                    <input
                      type="text"
                      required
                      value={editingPage.title}
                      onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                      placeholder="Title tag displayed in Google search"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Meta Description</label>
                      {getLengthBadge(editingPage.description.length, 120, 165)}
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={editingPage.description}
                      onChange={(e) => setEditingPage({ ...editingPage, description: e.target.value })}
                      placeholder="Snippet summary displayed in Google search results"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Focus Keywords Tag Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Focus Keywords & Search Queries
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={newKeywordInput}
                        onChange={(e) => setNewKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newKeywordInput.trim()) {
                            e.preventDefault();
                            if (!editingPage.keywords.includes(newKeywordInput.trim())) {
                              setEditingPage({
                                ...editingPage,
                                keywords: [...editingPage.keywords, newKeywordInput.trim()]
                              });
                            }
                            setNewKeywordInput("");
                          }
                        }}
                        placeholder="Type keyword and press Enter or click Add"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newKeywordInput.trim()) {
                            if (!editingPage.keywords.includes(newKeywordInput.trim())) {
                              setEditingPage({
                                ...editingPage,
                                keywords: [...editingPage.keywords, newKeywordInput.trim()]
                              });
                            }
                            setNewKeywordInput("");
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {editingPage.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
                        >
                          <span>{kw}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPage({
                                ...editingPage,
                                keywords: editingPage.keywords.filter((_, idx) => idx !== i)
                              });
                            }}
                            className="text-amber-600 hover:text-amber-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Robots Meta Directive
                      </label>
                      <select
                        value={editingPage.robots}
                        onChange={(e) => setEditingPage({ ...editingPage, robots: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="index, follow">index, follow (Standard Public)</option>
                        <option value="noindex, follow">noindex, follow (Hide from search)</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow (Complete block)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Canonical URL (Optional override)
                      </label>
                      <input
                        type="url"
                        value={editingPage.canonicalUrl || ""}
                        onChange={(e) => setEditingPage({ ...editingPage, canonicalUrl: e.target.value })}
                        placeholder="https://hunkydory.co.in/custom-path"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: SOCIAL / OPEN GRAPH */}
              {pageModalTab === "social" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Open Graph (OG) Title
                    </label>
                    <input
                      type="text"
                      value={editingPage.ogTitle || ""}
                      onChange={(e) => setEditingPage({ ...editingPage, ogTitle: e.target.value })}
                      placeholder="Defaults to Meta Title if blank"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Open Graph (OG) Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingPage.ogDescription || ""}
                      onChange={(e) => setEditingPage({ ...editingPage, ogDescription: e.target.value })}
                      placeholder="Defaults to Meta Description if blank"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        OG Image URL / Path
                      </label>
                      <input
                        type="text"
                        value={editingPage.ogImage || ""}
                        onChange={(e) => setEditingPage({ ...editingPage, ogImage: e.target.value })}
                        placeholder="/og-image.png"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Twitter Card Type
                      </label>
                      <select
                        value={editingPage.twitterCard || "summary_large_image"}
                        onChange={(e) => setEditingPage({ ...editingPage, twitterCard: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="summary_large_image">summary_large_image (Large Hero Card)</option>
                        <option value="summary">summary (Small Thumbnail)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 3: SCHEMA & SITEMAP */}
              {pageModalTab === "schema" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Schema.org Structured Type
                      </label>
                      <select
                        value={editingPage.schemaType || "EducationalOrganization"}
                        onChange={(e) => setEditingPage({ ...editingPage, schemaType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="EducationalOrganization">EducationalOrganization</option>
                        <option value="MedicalBusiness">MedicalBusiness (Therapy / Clinic)</option>
                        <option value="FAQPage">FAQPage</option>
                        <option value="Course">Course (Learning Program)</option>
                        <option value="WebPage">WebPage (General)</option>
                        <option value="Custom">Custom JSON-LD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Sitemap Priority (0.1 to 1.0)
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={editingPage.sitemapPriority}
                        onChange={(e) => setEditingPage({ ...editingPage, sitemapPriority: parseFloat(e.target.value) || 0.8 })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Sitemap Change Frequency
                      </label>
                      <select
                        value={editingPage.sitemapChangeFreq}
                        onChange={(e) => setEditingPage({ ...editingPage, sitemapChangeFreq: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPage.inSitemap}
                          onChange={(e) => setEditingPage({ ...editingPage, inSitemap: e.target.checked })}
                          className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                        />
                        <span>Include in sitemap.xml</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 4: PREVIEW */}
              {pageModalTab === "preview" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("google")}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        previewDevice === "google" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      Google Search SERP
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("facebook")}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        previewDevice === "facebook" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      Social / Facebook
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("twitter")}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        previewDevice === "twitter" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      Twitter / X
                    </button>
                  </div>

                  {/* Google SERP Preview */}
                  {previewDevice === "google" && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                          HD
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-slate-900 leading-none">Hunky Dory</span>
                          <span className="text-[10px] text-slate-500">
                            https://hunkydory.co.in{editingPage.path}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-blue-700 hover:underline font-medium text-base sm:text-lg leading-snug cursor-pointer">
                        {editingPage.title || "Page Title"}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {editingPage.description || "Page description preview in Google search engine results."}
                      </p>
                    </div>
                  )}

                  {/* Facebook / Social Preview */}
                  {previewDevice === "facebook" && (
                    <div className="max-w-md mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-slate-50">
                      <div className="h-44 bg-gradient-to-br from-amber-200 via-orange-100 to-rose-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {editingPage.ogImage ? `Image Preview: ${editingPage.ogImage}` : "Social Image"}
                      </div>
                      <div className="p-3 bg-white border-t border-slate-200 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">HUNKYDORY.CO.IN</span>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                          {editingPage.ogTitle || editingPage.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {editingPage.ogDescription || editingPage.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Twitter / X Preview */}
                  {previewDevice === "twitter" && (
                    <div className="max-w-md mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-slate-900 text-white">
                      <div className="h-40 bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">
                        {editingPage.ogImage ? `Image: ${editingPage.ogImage}` : "1200x630 Card Image"}
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="font-bold text-sm text-white line-clamp-1">
                          {editingPage.ogTitle || editingPage.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {editingPage.ogDescription || editingPage.description}
                        </p>
                        <span className="text-[10px] text-slate-500 block">hunkydory.co.in</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Page SEO</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD CUSTOM SITEMAP URL */}
      {/* ========================================================================= */}
      {showCustomUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-amber-300 shadow-2xl relative">
            <h3 className="text-lg font-black text-slate-900 mb-4">Add Custom URL to Sitemap</h3>
            <form onSubmit={handleAddCustomUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Path</label>
                <input
                  type="text"
                  required
                  value={newCustomUrl.url}
                  onChange={(e) => setNewCustomUrl({ ...newCustomUrl, url: e.target.value })}
                  placeholder="/custom-landing-page"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority (0.1 - 1.0)</label>
                  <input
                    type="number"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={newCustomUrl.priority}
                    onChange={(e) => setNewCustomUrl({ ...newCustomUrl, priority: parseFloat(e.target.value) || 0.8 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Change Frequency</label>
                  <select
                    value={newCustomUrl.changeFreq}
                    onChange={(e) => setNewCustomUrl({ ...newCustomUrl, changeFreq: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomUrlModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#0B1E36] text-white font-bold text-xs"
                >
                  Add URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
