import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { AppointmentStatus } from "@/lib/types";
import { requireAuth } from "@/lib/auth-guard";
import { sendAppointmentNotificationEmail } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as AppointmentStatus | null;
    let appointments = store.getAppointments();

    if (status) {
      appointments = appointments.filter((a) => a.status === status);
    }

    return NextResponse.json({ success: true, appointments });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch appointments" }, { status: 500 });
  }
}

// Public endpoint: Parents can schedule appointment assessments
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentName, childName, phone, email, appointmentDate, appointmentTime, program, notes } = body;

    if (!parentName || !childName || !phone || !email || !appointmentDate || !appointmentTime || !program) {
      return NextResponse.json(
        { error: "Parent name, child name, contact info, date, time, and program are required." },
        { status: 400 }
      );
    }

    const newAppointment = store.createAppointment({
      parentName: String(parentName).trim(),
      childName: String(childName).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      appointmentDate: String(appointmentDate),
      appointmentTime: String(appointmentTime),
      program: String(program).trim(),
      notes: notes ? String(notes).trim() : undefined
    });

    // In Vercel Serverless environment, background promises without await are frozen/terminated.
    // We await the email notification so the socket completes before the lambda returns.
    let emailStatus = { delivered: false, error: undefined as string | undefined };
    try {
      const emailOutcomes = await sendAppointmentNotificationEmail(newAppointment);
      const allSucceeded = emailOutcomes.every(
        (res) => res.status === "fulfilled" && res.value.success
      );
      emailStatus.delivered = allSucceeded;
      console.log(`[Appointment Email Outcome] All sent successfully: ${allSucceeded}`);
    } catch (emailErr: any) {
      console.error("[Appointment Email Notification Error]:", emailErr?.message || emailErr);
      emailStatus = { delivered: false, error: emailErr?.message || "Failed to transmit email notification" };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your assessment appointment request has been scheduled successfully! Our team will reach out to confirm.",
        appointment: newAppointment,
        emailStatus
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create appointment" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Appointment ID and status are required." }, { status: 400 });
    }

    const updated = store.updateAppointmentStatus(id, status as AppointmentStatus);
    if (!updated) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update appointment status" }, { status: 500 });
  }
}
