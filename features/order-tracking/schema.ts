import { z } from "zod";
import { TRACKING_STAGES } from "./types";

export const createTrackingSchema = z.object({
  quoteRequestId: z.string().min(1, "Quote is required"),
  notes: z.string().optional(),
});

export const updateTrackingStageSchema = z.object({
  stage: z.string().refine(
    (val) => TRACKING_STAGES.some((s) => s.stage === val),
    "Invalid stage"
  ),
  note: z.string().optional(),
});