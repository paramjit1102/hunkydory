import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-guard";
import { verifySmtpConnection, sendEmail, parseEmailList, getAdminReceiverEmails } from "@/lib/email";
import { SITE_NAME, CENTRE_LOCATION } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request, ["ADMIN", "SPECIALIST", "STAFF"]);
    if (!auth.authorized) return auth.response!;

    const body = await request.json().catch(() => ({}));
    let targetReceivers: string[] = [];

    if (body.testEmail) {
      targetReceivers = parseEmailList(body.testEmail);
    }

    if (targetReceivers.length === 0) {
      targetReceivers = getAdminReceiverEmails();
    }

    // 1. Verify SMTP Connection
    const verifyResult = await verifySmtpConnection();
    if (!verifyResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: verifyResult.message,
          configured: false
        },
        { status: 400 }
      );
    }

    // 2. Dispatch a Test Email to all target receivers
    const sendResult = await sendEmail({
      to: targetReceivers,
      subject: `[SMTP Test] ${SITE_NAME} Email Configuration Verified`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 2px solid #fed7aa; border-radius: 16px; background: #fffbf5;">
          <h2 style="color: #0b1e36; margin-top: 0;">🎉 SMTP Verification Successful</h2>
          <p style="color: #475569; font-size: 14px;">
            Your SMTP email configuration for <strong>${SITE_NAME}</strong> (${CENTRE_LOCATION}) is working properly!
          </p>
          <div style="background: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #fed7aa; margin: 16px 0; font-size: 13px;">
            <p style="margin: 4px 0;"><strong>Recipient(s):</strong> ${targetReceivers.join(", ")}</p>
            <p style="margin: 4px 0;"><strong>Sent At:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>Host:</strong> ${process.env.SMTP_HOST}</p>
            <p style="margin: 4px 0;"><strong>Port:</strong> ${process.env.SMTP_PORT || 587}</p>
          </div>
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Hunky Dory Special Children Platform • Mohali
          </p>
        </div>
      `,
      text: `SMTP Verification Successful. Your SMTP configuration for ${SITE_NAME} is working properly. Recipient(s): ${targetReceivers.join(", ")}`
    });

    if (!sendResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: sendResult.error || "Failed to transmit test email",
          configured: true
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email successfully sent to ${targetReceivers.join(", ")}!`,
      messageId: sendResult.messageId,
      recipients: targetReceivers,
      simulated: sendResult.simulated || false
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process SMTP test" }, { status: 500 });
  }
}
