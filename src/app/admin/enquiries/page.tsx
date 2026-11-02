"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Filter,
  Search,
  Eye,
  Trash2,
  X,
  AlertCircle,
  Loader2,
  Calendar,
  User,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { Enquiry, EnquiryStatus } from "@/lib/types";

const statusBadges: Record<EnquiryStatus, { bg: string; text: string }> = {
  NEW: { bg: "bg-rose-100", text: "text-rose-800" },
  IN_REVIEW: { bg: "bg-amber-100", text: "text-amber-800" },
  CONTACTED: { bg: "bg-teal-100", text: "text-teal-800" },
  ENROLLED: { bg: "bg-indigo-100", text: "text-indigo-800" },
  CLOSED: { bg: "bg-slate-200", text: "text-slate-700" }
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // View Modal State
  const [viewEnquiry, setViewEnquiry] = useState<Enquiry | null>(null);

  // Delete Modal State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const url = statusFilter !== "ALL" ? `/api/enquiries?status=${statusFilter}` : "/api/enquiries";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (viewEnquiry && viewEnquiry.id === id) {
          setViewEnquiry({ ...viewEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/enquiries?id=${deletingId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== deletingId));
        if (viewEnquiry && viewEnquiry.id === deletingId) {
          setViewEnquiry(null);
        }
        setDeletingId(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete enquiry.");
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      alert("Network error while deleting enquiry.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Client-side search filtering
  const filteredEnquiries = enquiries.filter((enq) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      enq.childName.toLowerCase().includes(q) ||
      enq.parentName.toLowerCase().includes(q) ||
      enq.phone.toLowerCase().includes(q) ||
      enq.email.toLowerCase().includes(q) ||
      enq.program.toLowerCase().includes(q) ||
      (enq.message && enq.message.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Parent Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review incoming questions, prospective students, and follow up with families.
          </p>
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          >
            <option value="ALL">All Enquiries ({enquiries.length})</option>
            <option value="NEW">New (Unread)</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="CONTACTED">Contacted</option>
            <option value="ENROLLED">Enrolled</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by child name, parent, phone, program..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      {/* Enquiries Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            <span className="text-xs">Loading parent enquiries...</span>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs sm:text-sm">
            No parent enquiries matching this query or status filter.
          </div>
        ) : (
          filteredEnquiries.map((enq) => {
            const badge = statusBadges[enq.status] || { bg: "bg-slate-100", text: "text-slate-800" };
            return (
              <div
                key={enq.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6"
              >
                {/* Left Info Column */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Child: {enq.childName}
                    </h3>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                      {enq.childAge} Years Old
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${badge.bg} ${badge.text}`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-500">
                    <span>
                      Parent: <strong className="text-slate-700">{enq.parentName}</strong>
                    </span>
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>{enq.phone}</span>
                    </a>
                    <a
                      href={`mailto:${enq.email}`}
                      className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold break-all"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>{enq.email}</span>
                    </a>
                  </div>

                  <p className="text-xs font-semibold text-amber-700">
                    Target Program: {enq.program}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100 mt-2 line-clamp-2">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>

                {/* Right Actions & Status Column */}
                <div className="lg:w-60 shrink-0 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Workflow Status
                    </label>
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value as EnquiryStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none focus:border-amber-500"
                    >
                      <option value="NEW">NEW</option>
                      <option value="IN_REVIEW">IN_REVIEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="ENROLLED">ENROLLED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{new Date(enq.createdAt).toLocaleDateString()}</span>

                    {/* View and Delete buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setViewEnquiry(enq)}
                        className="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                        title="View Full Enquiry Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingId(enq.id)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View Enquiry Details Modal */}
      {viewEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setViewEnquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-slate-100 pb-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white font-black text-xl flex items-center justify-center shadow-xs shrink-0">
                  {viewEnquiry.childName[0]}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {viewEnquiry.childName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Age: {viewEnquiry.childAge} Years Old • Parent: {viewEnquiry.parentName}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    statusBadges[viewEnquiry.status]?.bg || "bg-slate-100"
                  } ${statusBadges[viewEnquiry.status]?.text || "text-slate-700"}`}
                >
                  Status: {viewEnquiry.status}
                </span>
                <span className="text-[11px] text-slate-400">
                  Received on {new Date(viewEnquiry.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs">
              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
                  Parent / Guardian
                </span>
                <span className="text-slate-800 font-semibold">{viewEnquiry.parentName}</span>
              </div>

              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
                  Target Program
                </span>
                <span className="text-amber-800 font-bold">{viewEnquiry.program}</span>
              </div>

              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
                  Phone Number
                </span>
                <a
                  href={`tel:${viewEnquiry.phone}`}
                  className="text-amber-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{viewEnquiry.phone}</span>
                </a>
              </div>

              <div>
                <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
                  Email Address
                </span>
                <a
                  href={`mailto:${viewEnquiry.email}`}
                  className="text-amber-700 font-bold hover:underline inline-flex items-center gap-1 break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{viewEnquiry.email}</span>
                </a>
              </div>
            </div>

            {/* Parent Message */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>Parent Inquiry & Learning Needs</span>
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {viewEnquiry.message}
              </div>
            </div>

            {/* Quick Status Update Selector in Modal */}
            <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Update Status</span>
                <span className="text-[11px] text-slate-500">Change progress in student admissions workflow</span>
              </div>
              <select
                value={viewEnquiry.status}
                onChange={(e) => handleUpdateStatus(viewEnquiry.id, e.target.value as EnquiryStatus)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
              >
                <option value="NEW">NEW</option>
                <option value="IN_REVIEW">IN_REVIEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="ENROLLED">ENROLLED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeletingId(viewEnquiry.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setViewEnquiry(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
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
              <h3 className="text-base font-bold text-slate-900">Delete Parent Enquiry?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete this enquiry? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteEnquiry}
                disabled={deleteLoading}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {deleteLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{deleteLoading ? "Deleting..." : "Yes, Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
