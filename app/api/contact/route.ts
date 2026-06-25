import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipients = ["madhbhad@gmail.com", "henryyimbusiness@gmail.com"];

type ContactPayload = {
  name?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !pass || !from) {
      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const safe = {
      name: escapeHtml(payload.name!.trim()),
      businessName: escapeHtml(payload.businessName!.trim()),
      email: escapeHtml(payload.email!.trim()),
      phone: escapeHtml(payload.phone!.trim()),
      projectType: escapeHtml(payload.projectType!.trim()),
      budget: escapeHtml(payload.budget!.trim()),
      message: escapeHtml(payload.message!.trim()),
    };

    await transporter.sendMail({
      from,
      to: recipients,
      replyTo: payload.email!.trim(),
      subject: `New YB Visuals inquiry: ${payload.businessName!.trim()}`,
      text: [
        `Name: ${payload.name}`,
        `Restaurant / Business: ${payload.businessName}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Project Type: ${payload.projectType}`,
        `Budget: ${payload.budget}`,
        "",
        payload.message,
      ].join("\n"),
      html: `
        <h2>New YB Visuals inquiry</h2>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Restaurant / Business:</strong> ${safe.businessName}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Project Type:</strong> ${safe.projectType}</p>
        <p><strong>Budget:</strong> ${safe.budget}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message.replaceAll("\n", "<br />")}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return Response.json({ error: "Could not send message." }, { status: 500 });
  }
}

function validatePayload(payload: ContactPayload) {
  if (!payload.name?.trim()) return "Name is required.";
  if (!payload.businessName?.trim()) return "Restaurant or business name is required.";
  if (!payload.email?.trim() || !/^\S+@\S+\.\S+$/.test(payload.email)) {
    return "Valid email is required.";
  }
  if (!payload.phone?.trim()) return "Phone is required.";
  if (!payload.projectType?.trim()) return "Project type is required.";
  if (!payload.budget?.trim()) return "Budget is required.";
  if (!payload.message?.trim() || payload.message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  return "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
