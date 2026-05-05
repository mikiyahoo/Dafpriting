import { NextRequest, NextResponse } from "next/server";
import { insertBooking } from "@/lib/supabaseClient";
import { BookingFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // Validation
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!body.email || /^\S+@\S+\.\S+$/.test(body.email) === false) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!body.event_type) {
      return NextResponse.json(
        { success: false, error: "Event type is required" },
        { status: 400 }
      );
    }

    const data = await insertBooking({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || "",
      event_type: body.event_type,
      event_date: body.event_date || "",
      budget: body.budget || "",
      message: body.message?.trim() || "",
    });

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
