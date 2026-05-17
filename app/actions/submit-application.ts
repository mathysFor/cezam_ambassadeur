"use server";

import { Resend } from "resend";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitApplication(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const instagram = String(formData.get("instagram") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const followers = String(formData.get("followers") ?? "").trim();
  const niche = String(formData.get("niche") ?? "").trim();
  const motivation = String(formData.get("motivation") ?? "").trim();

  if (!firstName || !instagram || !email || !phone || !followers || !niche) {
    return {
      status: "error",
      message: "Tous les champs obligatoires doivent être remplis.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLICATION_TO_EMAIL;
  const from =
    process.env.APPLICATION_FROM_EMAIL ??
    "Cezam Ambassadeurs <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "[submitApplication] Missing env vars: RESEND_API_KEY and/or APPLICATION_TO_EMAIL",
    );
    console.log("[submitApplication] Submission received (not sent):", {
      firstName,
      instagram,
      email,
      phone,
      followers,
      niche,
      motivation,
    });
    return {
      status: "error",
      message: "Configuration serveur manquante. Contacte-nous directement.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouvelle candidature ambassadeur — ${firstName} (${instagram})`,
      text: [
        `Prénom : ${firstName}`,
        `Instagram : ${instagram}`,
        `Email : ${email}`,
        `WhatsApp : ${phone}`,
        `Abonnés : ${followers}`,
        `Niche : ${niche}`,
        ``,
        `Motivation :`,
        motivation || "(aucune)",
      ].join("\n"),
    });

    if (error) {
      console.error("[submitApplication] Resend returned error:", error);
      return {
        status: "error",
        message: "Envoi impossible. Réessaie dans un instant.",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[submitApplication] Unexpected error:", err);
    return {
      status: "error",
      message: "Envoi impossible. Réessaie dans un instant.",
    };
  }
}
