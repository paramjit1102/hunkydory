"use client";

import React, { useState, useEffect } from "react";
import { Inbox, CheckCircle, Clock, Phone, Mail, Filter } from "lucide-react";
import { Enquiry, EnquiryStatus } from "@/lib/types";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

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
        loadEnquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

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

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="ALL">All Enquiries</option>
            <option value="NEW">New (Unread)</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="CONTACTED">Contacted</option>
            <option value="ENROLLED">Enrolled</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-xs text-slate-400 py-8 text-center">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs sm:text-sm">
            No parent enquiries matching this status filter.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Child: {enq.childName}
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                    {enq.childAge} Years Old
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      enq.status === "NEW"
                        ? "bg-rose-100 text-rose-800"
                        : enq.status === "CONTACTED"
                        ? "bg-teal-100 text-teal-800"
                        : enq.status === "ENROLLED"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500">
                  <span>Parent: <strong className="text-slate-700">{enq.parentName}</strong></span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 shrink-0" /> {enq.phone}</span>
                  <span className="flex items-center gap-1 break-all"><Mail className="w-3.5 h-3.5 shrink-0" /> {enq.email}</span>
                </div>

                <p className="text-xs font-semibold text-amber-700">
                  Target Program: {enq.program}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100 mt-2">
                  &ldquo;{enq.message}&rdquo;
                </p>
              </div>

              {/* Status Update Control */}
              <div className="md:w-48 shrink-0 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Update Workflow Status
                </label>
                <select
                  value={enq.status}
                  onChange={(e) => handleUpdateStatus(enq.id, e.target.value as EnquiryStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
                >
                  <option value="NEW">NEW</option>
                  <option value="IN_REVIEW">IN_REVIEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="ENROLLED">ENROLLED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>

                <span className="text-[10px] text-slate-400">
                  Received: {new Date(enq.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
