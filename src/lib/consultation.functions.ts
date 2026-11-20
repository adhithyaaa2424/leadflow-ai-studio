import { createServerFn } from "@tanstack/react-start";
import { consultationSchema } from "./consultation-schema";

export const submitConsultation = createServerFn({ method: "POST" })
  .validator((data: unknown) => consultationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: saved, error } = await supabaseAdmin
      .from("consultation_requests")
      .insert({
        full_name: data.fullName,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        service: data.service,
        budget: data.budget,
        preferred_date: data.preferredDate || null,
        message: data.message,
      })
      .select("id, full_name, email, company, phone, service, budget, preferred_date, message, created_at")
      .single();
    if (error || !saved) {
      console.error("consultation insert failed", error);
      throw new Error("We couldn't save your request. Please try again.");
    }

    // Only after the booking is saved: forward it to Make.com. This never throws,
    // so a webhook failure can't fail or undo the booking.
    const { sendBookingToMake } = await import("./make-webhook.server");
    await sendBookingToMake(saved, { webhookUrl: process.env["MAKE_WEBHOOK_URL"] });

    return { ok: true as const };
  });
