import { createServerFn } from "@tanstack/react-start";
import { consultationSchema } from "./consultation-schema";

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => consultationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("consultation_requests").insert({
      full_name: data.fullName,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      service: data.service,
      budget: data.budget,
      preferred_date: data.preferredDate || null,
      message: data.message,
    });
    if (error) {
      console.error("consultation insert failed", error);
      throw new Error("We couldn't save your request. Please try again.");
    }
    return { ok: true as const };
  });
