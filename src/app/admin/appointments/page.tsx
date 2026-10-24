"use client";

import React, { useState, useEffect } from "react";
import { CalendarCheck, Clock, Phone, Mail, Filter } from "lucide-react";
import { Appointment, AppointmentStatus } from "@/lib/types";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const url = statusFilter !== "ALL" ? `/api/appointments?status=${statusFilter}` : "/api/appointments";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        loadAppointments();
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
            Assessment Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Organize developmental assessments, parent consultations, and slot confirmations.
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
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Confirmation</option>
            <option value="CONFIRMED">Confirmed Slots</option>
            <option value="COMPLETED">Completed Assessments</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-xs text-slate-400 py-8 text-center">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs sm:text-sm">
            No appointments found for the selected filter.
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Child: {apt.childName}
                  </h3>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{apt.appointmentDate} at {apt.appointmentTime}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      apt.status === "CONFIRMED"
                        ? "bg-teal-100 text-teal-800"
                        : apt.status === "PENDING"
                        ? "bg-amber-100 text-amber-800"
                        : apt.status === "COMPLETED"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500">
                  <span>Parent: <strong className="text-slate-700">{apt.parentName}</strong></span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 shrink-0" /> {apt.phone}</span>
                  <span className="flex items-center gap-1 break-all"><Mail className="w-3.5 h-3.5 shrink-0" /> {apt.email}</span>
                </div>

                <p className="text-xs font-semibold text-amber-700">
                  Assessment Focus: {apt.program}
                </p>

                {apt.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    Notes: {apt.notes}
                  </p>
                )}
              </div>

              {/* Status Update Control */}
              <div className="md:w-48 shrink-0 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Slot Status
                </label>
                <select
                  value={apt.status}
                  onChange={(e) => handleUpdateStatus(apt.id, e.target.value as AppointmentStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>

                <span className="text-[10px] text-slate-400 font-mono">
                  Ref: {apt.id}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
