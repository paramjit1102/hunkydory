import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { EnquiryStatus } from "@/lib/types";
import { requireAuth } from "@/lib/auth-guard";
import { sendEnquiryNotificationEmail } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as EnquiryStatus | null;
    let enquiries = store.getEnquiries();

    if (status) {
      enquiries = enquiries.filter((e) => e.status === status);
    }

    return NextResponse.json({ success: true, enquiries });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch enquiries" }, { status: 500 });
  }
}

// Public endpoint: Parents can submit general enquiries
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentName, childName, childAge, phone, email, program, message } = body;

    if (!parentName || !childName || !phone || !email || !program) {
      return NextResponse.json(
        { error: "Parent name, child name, phone, email, and program are required fields." },
        { status: 400 }
      );
    }

    const newEnquiry = store.createEnquiry({
      parentName: String(parentName).trim(),
      childName: String(childName).trim(),
      childAge: Number(childAge) || 5,
      phone: String(phone).trim(),
      email: String(email).trim(),
      program: String(program).trim(),
      message: message ? String(message).trim() : "Enquiry regarding program placement and support."
    });

    // Send emails via SMTP in background without delaying user response
    sendEnquiryNotificationEmail(newEnquiry).catch((err) => {
      console.error("[Email Notification Failed]", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your enquiry has been received. Our care coordinator will contact you shortly.",
        enquiry: newEnquiry
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Enquiry ID and updated status are required." }, { status: 400 });
    }

    const updated = store.updateEnquiryStatus(id, status as EnquiryStatus);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update enquiry status" }, { status: 500 });
  }
}
