"use server";

import { createQuoteRequest } from "@/lib/db/quotes";
import { quoteFormSchema } from "@/lib/validations";

export async function submitQuoteRequest(
  prevState: { success: boolean; error?: string; quoteNumber?: string },
  formData: FormData
) {
  try {
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: (formData.get("company") as string) || undefined,
      serviceId: formData.get("serviceId") as string,
      quantity: formData.get("quantity") as string,
      size: formData.get("size") as string,
      material: formData.get("material") as string,
      notes: (formData.get("notes") as string) || undefined,
    };

    const validated = quoteFormSchema.parse(raw);

    const quote = await createQuoteRequest({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      company: validated.company,
      serviceId: validated.serviceId,
      quantity: validated.quantity,
      size: validated.size,
      material: validated.material,
      notes: validated.notes,
    });

    return {
      success: true,
      quoteNumber: quote.quoteNumber,
    };
  } catch (error) {
    console.error("Quote submission failed:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to submit quote request" };
  }
}