"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Baby,
  MessageSquareHeart,
  Sparkles,
  HeartHandshake,
  SunMedium,
  BookOpenCheck,
  Compass,
  Puzzle,
  Activity,
  Users,
  Palette,
  Music,
  Trophy,
  Zap,
  Dumbbell,
  Smile,
  Heart,
  CheckCircle2,
  Search,
  Plus,
  Trash2,
  Edit3,
  X,
  AlertCircle,
  Loader2,
  Filter,
  Check,
  Eye,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Program, ProgramStatus } from "@/lib/types";

// Available selectable icon components
const availableIcons: { name: string; label: string; icon: React.ReactNode }[] = [
  { name: "Sparkles", label: "Sparkles", icon: <Sparkles className="w-5 h-5" /> },
  { name: "GraduationCap", label: "Education", icon: <GraduationCap className="w-5 h-5" /> },
  { name: "Baby", label: "Early Child", icon: <Baby className="w-5 h-5" /> },
  { name: "MessageSquareHeart", label: "Speech", icon: <MessageSquareHeart className="w-5 h-5" /> },
  { name: "HeartHandshake", label: "Therapy", icon: <HeartHandshake className="w-5 h-5" /> },
  { name: "SunMedium", label: "Daily Living", icon: <SunMedium className="w-5 h-5" /> },
  { name: "BookOpenCheck", label: "Academic", icon: <BookOpenCheck className="w-5 h-5" /> },
  { name: "Compass", label: "Roadmap", icon: <Compass className="w-5 h-5" /> },
  { name: "Puzzle", label: "Autism / ADHD", icon: <Puzzle className="w-5 h-5" /> },
  { name: "Activity", label: "OT Motor", icon: <Activity className="w-5 h-5" /> },
  { name: "Users", label: "Social", icon: <Users className="w-5 h-5" /> },
  { name: "Palette", label: "Art Therapy", icon: <Palette className="w-5 h-5" /> },
  { name: "Music", label: "Music", icon: <Music className="w-5 h-5" /> },
  { name: "Trophy", label: "Life Skills", icon: <Trophy className="w-5 h-5" /> },
  { name: "Zap", label: "Focus / ADHD", icon: <Zap className="w-5 h-5" /> },
  { name: "Dumbbell", label: "Physical", icon: <Dumbbell className="w-5 h-5" /> },
  { name: "Smile", label: "Down Syndrome", icon: <Smile className="w-5 h-5" /> },
  { name: "Heart", label: "Behavior", icon: <Heart className="w-5 h-5" /> }
];

function renderProgramIcon(iconName?: string) {
  const match = availableIcons.find((i) => i.name === iconName);
  return match ? match.icon : <Sparkles className="w-5 h-5" />;
}

const defaultCategories = [
  "Individualised Learning",
  "Therapy Support",
  "Sensory & Motor",
  "Autism & ADHD",
  "Early Intervention",
  "Life Skills",
  "Developmental"
];

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [category, setCategory] = useState("Individualised Learning");
  const [badge, setBadge] = useState("Ages 3 - 16");
  const [iconName, setIconName] = useState("Sparkles");
  const [status, setStatus] = useState<ProgramStatus>("ACTIVE");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load programs from API
  const loadPrograms = async () => {
    try {
      setLoading(true);
      const url = statusFilter !== "ALL" ? `/api/programs?status=${statusFilter}` : "/api/programs";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setPrograms(data.programs || []);
      }
    } catch (err) {
      console.error("Error loading programs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, [statusFilter]);

  // Auto-generate slug when name changes (if user hasn't manually overridden it)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugCustomized) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const openCreateModal = () => {
    setModalMode("CREATE");
    setEditingId(null);
    setName("");
    setSlug("");
    setIsSlugCustomized(false);
    setCategory("Individualised Learning");
    setBadge("Ages 3 - 16");
    setIconName("Sparkles");
    setStatus("ACTIVE");
    setDescription("");
    setFeatures(["Individualized goal setting", "Multi-sensory learning pathways"]);
    setFeatureInput("");
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (prog: Program) => {
    setModalMode("EDIT");
    setEditingId(prog.id);
    setName(prog.name);
    setSlug(prog.slug);
    setIsSlugCustomized(true);
    setCategory(prog.category || "Developmental");
    setBadge(prog.badge || "All Ages");
    setIconName(prog.iconName || "Sparkles");
    setStatus(prog.status);
    setDescription(prog.description);
    setFeatures(prog.features || []);
    setFeatureInput("");
    setFormError("");
    setShowModal(true);
  };

  // Feature item handlers
  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    if (!features.includes(trimmed)) {
      setFeatures([...features, trimmed]);
    }
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Quick toggle status on card
  const handleQuickToggleStatus = async (prog: Program) => {
    const newStatus: ProgramStatus = prog.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      const res = await fetch("/api/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: prog.id, status: newStatus })
      });
      if (res.ok) {
        setPrograms((prev) =>
          prev.map((p) => (p.id === prog.id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle program status:", err);
    }
  };

  // Save (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Program name is required.");
      return;
    }
    if (!description.trim()) {
      setFormError("Description is required.");
      return;
    }

    setFormSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        category: category.trim(),
        badge: badge.trim(),
        iconName,
        status,
        description: description.trim(),
        features
      };

      const endpoint = "/api/programs";
      const method = modalMode === "CREATE" ? "POST" : "PUT";
      const body = modalMode === "CREATE" ? payload : { id: editingId, ...payload };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save program.");
      }

      setShowModal(false);
      loadPrograms();
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete program
  const handleDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/programs?id=${deletingId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setPrograms((prev) => prev.filter((p) => p.id !== deletingId));
        setDeletingId(null);
      } else {
        const d = await res.json();
        alert(d.error || "Failed to delete program.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting program.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Client-side search filter
  const filteredPrograms = programs.filter((p) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.badge && p.badge.toLowerCase().includes(query)) ||
      (p.features && p.features.some((f) => f.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Programs & Curricula Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, toggle active status, and organize developmental learning pathways.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Program</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by program name, category, or features..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === "ALL" ? "bg-white text-slate-900 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              All ({programs.length})
            </button>
            <button
              onClick={() => setStatusFilter("ACTIVE")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === "ACTIVE" ? "bg-white text-emerald-700 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter("INACTIVE")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === "INACTIVE" ? "bg-white text-slate-700 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Program Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
          <span className="text-xs">Loading programs from database...</span>
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs sm:text-sm">
          No programs found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => {
            const isActive = program.status === "ACTIVE";
            return (
              <div
                key={program.id}
                className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 ${
                  isActive
                    ? "border-slate-200/90 shadow-xs hover:border-amber-300"
                    : "border-slate-200 bg-slate-50/60 opacity-80"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs ${
                          isActive ? "bg-amber-500" : "bg-slate-400"
                        }`}
                      >
                        {renderProgramIcon(program.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {program.category || "Developmental"}
                        </span>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">/{program.slug}</p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <button
                      onClick={() => handleQuickToggleStatus(program)}
                      title="Click to toggle status"
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-600" : "bg-slate-500"}`} />
                      <span>{program.status}</span>
                    </button>
                  </div>

                  {/* Title & Age Badge */}
                  <div className="flex items-start justify-between gap-2 mt-2">
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {program.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full shrink-0">
                      {program.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                    {program.description}
                  </p>

                  {/* Features Preview */}
                  {program.features && program.features.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Modules ({program.features.length})
                      </p>
                      {program.features.slice(0, 3).map((f, i) => (
                        <p key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                          <span className="truncate">{f}</span>
                        </p>
                      ))}
                      {program.features.length > 3 && (
                        <p className="text-[10px] text-slate-400 italic pl-4">
                          +{program.features.length - 3} more modules...
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Updated: {new Date(program.updatedAt || program.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(program)}
                      className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                      title="Edit Program"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(program.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Delete Program"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Program Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">
              {modalMode === "CREATE" ? "Create New Program" : `Edit: ${name}`}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Fill in the curriculum details to display this program on the website and booking portal.
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Program Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Speech & Language Therapy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setIsSlugCustomized(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="e.g. speech-language-therapy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    list="categories-list"
                    placeholder="e.g. Therapy Support"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                  <datalist id="categories-list">
                    {defaultCategories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Age / Badge</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Ages 3 - 16"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProgramStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (Visible on Site)</option>
                    <option value="INACTIVE">INACTIVE (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Select Program Icon */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Visual Icon ({iconName})
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50/50">
                  {availableIcons.map((item) => {
                    const isSelected = iconName === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setIconName(item.name)}
                        className={`p-2 rounded-xl border text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500 border-amber-600 text-white shadow-xs font-bold"
                            : "bg-white border-slate-200 text-slate-600 hover:border-amber-300"
                        }`}
                      >
                        {item.icon}
                        <span className="text-[10px] truncate max-w-full">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Program Overview & Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description of the curriculum, methods, and clinical approaches..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                />
              </div>

              {/* Core Features & Modules */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Modules & Features ({features.length})
                </label>

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="e.g. Fine motor strengthening kits"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    + Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {features.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {features.length === 0 && (
                    <p className="text-[11px] text-slate-400 italic">No modules added yet.</p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {formSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{modalMode === "CREATE" ? "Create Program" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl relative text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">Delete Program?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete this program from the database? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
