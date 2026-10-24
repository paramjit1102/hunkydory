import nodemailer from "nodemailer";
import { CENTRE_EMAIL, CENTRE_LOCATION, CENTRE_PHONE, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { Enquiry, Appointment } from "@/lib/types";

// SMTP Configuration from Environment Variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_SECURE = process.env.SMTP_SECURE === "true" || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

/**
 * Safely parses and sanitizes the sender (FROM) address.
 * Guarantees a clean display name and RFC 5321 compliant envelope address,
 * eliminating the "Mail command failed: 451 4.0.0 Invalid from" error.
 */
export function getFromAddress(): { name: string; address: string } {
  const rawFrom = process.env.SMTP_FROM || "";
  const rawUser = process.env.SMTP_USER || "";

  // Strip backslashes, escaped quotes, and outer wrapping quotes
  const unescaped = rawFrom.replace(/\\/g, "").replace(/^["']|["']$/g, "").trim();

  let name = `${SITE_NAME} Mohali`;
  let address = "";

  const match = unescaped.match(/<([^>]+)>/) || unescaped.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (match) {
    address = match[1].trim();
  }

  // If address is missing, or is default/unconfigured while SMTP_USER has a valid email, use SMTP_USER
  if (!address || (address === CENTRE_EMAIL && rawUser && rawUser.includes("@"))) {
    if (rawUser && rawUser.includes("@")) {
      address = rawUser.trim();
    } else {
      address = CENTRE_EMAIL;
    }
  }

  if (unescaped.includes("<")) {
    const namePart = unescaped.split("<")[0].replace(/["']/g, "").trim();
    if (namePart) {
      name = namePart;
    }
  }

  return { name, address };
}

/**
 * Normalizes email address inputs (single string, comma/semicolon-separated string, or array)
 * into a clean array of valid email strings.
 */
export function parseEmailList(input?: string | string[] | null): string[] {
  if (!input) return [];
  const rawList = Array.isArray(input) ? input : input.split(/[,;]+/);
  const emails = rawList
    .map((e) => e.trim())
    .filter((e) => e.length > 0 && e.includes("@"));

  // Return unique emails
  return Array.from(new Set(emails));
}

/**
 * Retrieves the list of admin/coordinator receiver emails from environment variables.
 * Supports multiple comma-separated or semicolon-separated emails in:
 * - SMTP_ADMIN_EMAIL
 * - SMTP_RECEIVERS
 * - ADMIN_EMAIL
 * Defaults to CENTRE_EMAIL if not set.
 */
export function getAdminReceiverEmails(): string[] {
  const envVal =
    process.env.SMTP_ADMIN_EMAIL ||
    process.env.SMTP_RECEIVERS ||
    process.env.ADMIN_EMAIL ||
    CENTRE_EMAIL;

  const parsed = parseEmailList(envVal);
  return parsed.length > 0 ? parsed : [CENTRE_EMAIL];
}

/**
 * Creates and returns the Nodemailer SMTP transporter.
 * Returns null if SMTP is not configured.
 */
export function getMailTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production"
    }
  });
}

/**
 * Verifies if the SMTP transporter connects successfully.
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; message: string }> {
  const transporter = getMailTransporter();
  if (!transporter) {
    return {
      success: false,
      message: "SMTP is not configured in environment variables (requires SMTP_HOST, SMTP_USER, SMTP_PASS)."
    };
  }

  try {
    await transporter.verify();
    return { success: true, message: `Connected successfully to SMTP server at ${SMTP_HOST}:${SMTP_PORT}` };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to verify SMTP connection" };
  }
}

export interface SendEmailOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Base function to send an email via SMTP with support for multiple receivers
 * and fallback simulation for development.
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; simulated?: boolean; messageId?: string; error?: string; recipients?: string[] }> {
  const recipients = parseEmailList(options.to);
  const ccRecipients = options.cc ? parseEmailList(options.cc) : [];
  const bccRecipients = options.bcc ? parseEmailList(options.bcc) : [];

  if (recipients.length === 0) {
    return { success: false, error: "No valid recipient email address was provided." };
  }

  const transporter = getMailTransporter();

  if (!transporter) {
    console.log("--------------------------------------------------");
    console.log("📨 [SMTP MOCK / SIMULATION]");
    console.log(`To (${recipients.length} receiver${recipients.length > 1 ? "s" : ""}): ${recipients.join(", ")}`);
    if (ccRecipients.length > 0) console.log(`Cc: ${ccRecipients.join(", ")}`);
    if (bccRecipients.length > 0) console.log(`Bcc: ${bccRecipients.join(", ")}`);
    console.log(`Subject: ${options.subject}`);
    console.log("Notice: Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env to send real emails.");
    console.log("--------------------------------------------------");
    return { success: true, simulated: true, messageId: `mock-${Date.now()}`, recipients };
  }

  const fromInfo = getFromAddress();

  try {
    const allEnvelopeRecipients = Array.from(new Set([...recipients, ...ccRecipients, ...bccRecipients]));

    const info = await transporter.sendMail({
      from: {
        name: fromInfo.name,
        address: fromInfo.address
      },
      sender: fromInfo.address,
      replyTo: options.replyTo || fromInfo.address,
      envelope: {
        from: fromInfo.address, // Pure RFC 5321 sender without display names or quotes
        to: allEnvelopeRecipients
      },
      to: recipients,
      cc: ccRecipients.length > 0 ? ccRecipients : undefined,
      bcc: bccRecipients.length > 0 ? bccRecipients : undefined,
      subject: options.subject,
      html: options.html,
      text: options.text
    });

    console.log(`✅ [SMTP Sent] Message ID: ${info.messageId} from <${fromInfo.address}> to [${recipients.join(", ")}]`);
    return { success: true, messageId: info.messageId, recipients };
  } catch (err: any) {
    console.error(`❌ [SMTP Error] Failed to send email from <${fromInfo.address}>:`, err?.message || err);
    return { success: false, error: err?.message || "SMTP transmission failure", recipients };
  }
}

/**
 * Standard email HTML layout wrapper with Hunky Dory branding
 */
function wrapHtmlTemplate(title: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #fffbf5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 24px auto; background: #ffffff; border-radius: 20px; border: 2px solid #fed7aa; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0b1e36; padding: 28px 24px; text-align: center; }
    .logo-text { font-size: 24px; font-weight: 900; color: #f59e0b; letter-spacing: -0.5px; margin: 0; }
    .tagline { color: #86efac; font-size: 11px; font-weight: bold; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
    .content { padding: 32px 28px; }
    .title { font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 16px; }
    .card { background: #fffdf9; border: 1px solid #fde68a; border-radius: 14px; padding: 20px; margin: 20px 0; }
    .field { margin-bottom: 12px; }
    .field:last-child { margin-bottom: 0; }
    .field-label { font-size: 11px; font-weight: bold; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px; }
    .field-value { font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; background: #fef3c7; color: #92400e; }
    .footer { background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 20px 24px; font-size: 12px; color: #64748b; text-align: center; }
    .btn { display: inline-block; background: #ea580c; color: #ffffff !important; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 50px; text-decoration: none; margin-top: 16px; }
    a { color: #d97706; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo-text">HUNKY DORY</h1>
      <div class="tagline">Special Children Center • ${CENTRE_LOCATION}</div>
    </div>
    <div class="content">
      ${bodyContent}
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0;"><strong>Hunky Dory Special Children Center</strong></p>
      <p style="margin: 0 0 6px 0;">${CENTRE_LOCATION} • Helpline: <a href="tel:${CENTRE_PHONE}">${CENTRE_PHONE}</a> • <a href="mailto:${CENTRE_EMAIL}">${CENTRE_EMAIL}</a></p>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">${SITE_TAGLINE}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends notification emails to all configured admin receivers, and a warm confirmation to the parent.
 */
export async function sendEnquiryNotificationEmail(enquiry: Enquiry) {
  const adminReceivers = getAdminReceiverEmails();

  // 1. Send notification to all Centre Admin/Staff receivers
  const adminHtml = wrapHtmlTemplate(
    "New Parent Enquiry Received",
    `
      <h2 class="title">New Parent Enquiry Received</h2>
      <p style="color: #475569; font-size: 14px;">A new prospective student enquiry has been submitted through the Hunky Dory website:</p>

      <div class="card">
        <div class="field">
          <div class="field-label">Child's Name & Age</div>
          <div class="field-value">${enquiry.childName} (${enquiry.childAge} years old)</div>
        </div>
        <div class="field">
          <div class="field-label">Parent / Guardian</div>
          <div class="field-value">${enquiry.parentName}</div>
        </div>
        <div class="field">
          <div class="field-label">Contact Details</div>
          <div class="field-value">Phone: <strong>${enquiry.phone}</strong> | Email: <strong>${enquiry.email}</strong></div>
        </div>
        <div class="field">
          <div class="field-label">Interested Program</div>
          <div class="field-value"><span class="badge">${enquiry.program}</span></div>
        </div>
        <div class="field">
          <div class="field-label">Parent Message / Learning Needs</div>
          <div class="field-value" style="font-style: italic; background: #ffffff; padding: 10px; border-radius: 8px; border: 1px solid #f1f5f9; margin-top: 4px;">
            &ldquo;${enquiry.message}&rdquo;
          </div>
        </div>
        <div class="field">
          <div class="field-label">Submission Date</div>
          <div class="field-value">${new Date(enquiry.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/enquiries" class="btn">
          View in Staff Portal
        </a>
      </div>
    `
  );

  const adminPromise = sendEmail({
    to: adminReceivers,
    subject: `[New Enquiry] ${enquiry.childName} (${enquiry.program}) - Parent: ${enquiry.parentName}`,
    html: adminHtml,
    replyTo: enquiry.email
  });

  // 2. Send warm confirmation acknowledgement to Parent
  const parentHtml = wrapHtmlTemplate(
    "Thank you for contacting Hunky Dory",
    `
      <h2 class="title">Hello ${enquiry.parentName},</h2>
      <p style="color: #475569; font-size: 14px;">
        Thank you for reaching out to <strong>Hunky Dory Special Children Center</strong>. We have safely received your enquiry regarding <strong>${enquiry.childName}</strong> for our <strong>${enquiry.program}</strong> program.
      </p>

      <div class="card">
        <h3 style="margin-top: 0; font-size: 14px; font-weight: bold; color: #b45309;">Enquiry Summary</h3>
        <p style="margin: 4px 0; font-size: 13px;"><strong>Child:</strong> ${enquiry.childName} (${enquiry.childAge} years old)</p>
        <p style="margin: 4px 0; font-size: 13px;"><strong>Program:</strong> ${enquiry.program}</p>
        <p style="margin: 4px 0; font-size: 13px;"><strong>Phone:</strong> ${enquiry.phone}</p>
        <p style="margin: 4px 0; font-size: 13px;"><strong>Location:</strong> ${CENTRE_LOCATION}</p>
      </div>

      <p style="color: #475569; font-size: 14px;">
        Our care coordinator and developmental specialists will review your child&apos;s details and call you shortly to discuss how we can best support your family.
      </p>

      <p style="color: #475569; font-size: 14px;">
        If you have urgent questions or wish to arrange an immediate walk-through of our sensory-friendly facility, please feel free to call us directly at <a href="tel:${CENTRE_PHONE}"><strong>${CENTRE_PHONE}</strong></a>.
      </p>

      <p style="margin-top: 24px; font-size: 14px; color: #334155;">
        Warm regards,<br>
        <strong>The Hunky Dory Team</strong><br>
        <em>We See Abilities. We Nurture Potential.</em>
      </p>
    `
  );

  const parentPromise = sendEmail({
    to: enquiry.email,
    subject: `Thank you for contacting Hunky Dory (${enquiry.childName}'s Enquiry)`,
    html: parentHtml
  });

  return Promise.allSettled([adminPromise, parentPromise]);
}

/**
 * Sends notification emails to all configured admin receivers, and a confirmation to the parent.
 */
export async function sendAppointmentNotificationEmail(appointment: Appointment) {
  const adminReceivers = getAdminReceiverEmails();

  // 1. Send notification to all Centre Admin/Staff receivers
  const adminHtml = wrapHtmlTemplate(
    "New Assessment Appointment Booked",
    `
      <h2 class="title">New Assessment Booking Request</h2>
      <p style="color: #475569; font-size: 14px;">A parent has requested an assessment slot through the Hunky Dory booking calendar:</p>

      <div class="card">
        <div class="field">
          <div class="field-label">Scheduled Date & Time</div>
          <div class="field-value" style="font-size: 16px; color: #0284c7;">
            🗓️ <strong>${appointment.appointmentDate}</strong> at ⏰ <strong>${appointment.appointmentTime}</strong>
          </div>
        </div>
        <div class="field">
          <div class="field-label">Child's Name</div>
          <div class="field-value">${appointment.childName}</div>
        </div>
        <div class="field">
          <div class="field-label">Parent / Guardian</div>
          <div class="field-value">${appointment.parentName}</div>
        </div>
        <div class="field">
          <div class="field-label">Contact Details</div>
          <div class="field-value">Phone: <strong>${appointment.phone}</strong> | Email: <strong>${appointment.email}</strong></div>
        </div>
        <div class="field">
          <div class="field-label">Assessment Focus</div>
          <div class="field-value"><span class="badge">${appointment.program}</span></div>
        </div>
        ${
          appointment.notes
            ? `
        <div class="field">
          <div class="field-label">Parent Notes</div>
          <div class="field-value" style="font-style: italic; background: #ffffff; padding: 10px; border-radius: 8px; border: 1px solid #f1f5f9; margin-top: 4px;">
            &ldquo;${appointment.notes}&rdquo;
          </div>
        </div>`
            : ""
        }
        <div class="field">
          <div class="field-label">Appointment Reference</div>
          <div class="field-value" style="font-family: monospace; font-size: 12px; color: #64748b;">${appointment.id}</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/appointments" class="btn">
          Confirm Slot in Admin Portal
        </a>
      </div>
    `
  );

  const adminPromise = sendEmail({
    to: adminReceivers,
    subject: `[Appointment Request] ${appointment.childName} on ${appointment.appointmentDate} (${appointment.appointmentTime})`,
    html: adminHtml,
    replyTo: appointment.email
  });

  // 2. Send confirmation to the Parent
  const parentHtml = wrapHtmlTemplate(
    "Assessment Booking Request Received",
    `
      <h2 class="title">Dear ${appointment.parentName},</h2>
      <p style="color: #475569; font-size: 14px;">
        We have received your appointment request for <strong>${appointment.childName}</strong>'s initial developmental assessment at Hunky Dory.
      </p>

      <div class="card" style="border-left: 4px solid #ea580c;">
        <h3 style="margin-top: 0; font-size: 15px; font-weight: bold; color: #9a3412;">Assessment Details</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Child:</strong> ${appointment.childName}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Requested Date:</strong> ${appointment.appointmentDate}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Requested Time:</strong> ${appointment.appointmentTime}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Focus Area:</strong> ${appointment.program}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Campus:</strong> ${CENTRE_LOCATION}</p>
        <p style="margin: 6px 0; font-size: 12px; color: #64748b;"><strong>Reference:</strong> ${appointment.id}</p>
      </div>

      <h3 style="font-size: 15px; font-weight: bold; color: #1e293b; margin-top: 20px;">What Happens Next?</h3>
      <ol style="color: #475569; font-size: 13px; padding-left: 20px; line-height: 1.7;">
        <li>Our care coordinator will call you to confirm your slot and answer any preliminary questions.</li>
        <li>We conduct a warm, non-judgmental, play-based session designed to discover your child's comforts and strengths.</li>
        <li>Together, we will discuss practical developmental strategies and individualized learning goals.</li>
      </ol>

      <p style="color: #475569; font-size: 13px; margin-top: 16px;">
        Need to reschedule or speak with our team? Reach us at <a href="tel:${CENTRE_PHONE}"><strong>${CENTRE_PHONE}</strong></a> or email <a href="mailto:${CENTRE_EMAIL}"><strong>${CENTRE_EMAIL}</strong></a>.
      </p>

      <p style="margin-top: 24px; font-size: 14px; color: #334155;">
        Warmly,<br>
        <strong>The Hunky Dory Specialist Team</strong><br>
        <em>Together, we build better tomorrows.</em>
      </p>
    `
  );

  const parentPromise = sendEmail({
    to: appointment.email,
    subject: `Assessment Appointment Request Received - Hunky Dory (${appointment.childName})`,
    html: parentHtml
  });

  return Promise.allSettled([adminPromise, parentPromise]);
}
