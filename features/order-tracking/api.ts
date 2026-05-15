import { prisma } from "@/lib/prisma";
import { TRACKING_STAGES } from "./types";

export async function createTracking(quoteRequestId: string, notes?: string) {
  const stages = TRACKING_STAGES.map((s, i) => ({
    stage: s.stage,
    label: s.label,
    completed: i === 0,
    completedAt: i === 0 ? new Date() : null,
    sortOrder: i,
  }));

  return prisma.orderTracking.create({
    data: {
      quoteRequestId,
      currentStage: "ORDER_RECEIVED",
      notes: notes || null,
      stages: { create: stages },
    },
    include: { stages: { orderBy: { sortOrder: "asc" } }, quoteRequest: { include: { customer: true, service: true } } },
  });
}

export async function getTrackingByQuote(quoteRequestId: string) {
  return prisma.orderTracking.findUnique({
    where: { quoteRequestId },
    include: { stages: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getTrackingById(id: string) {
  return prisma.orderTracking.findUnique({
    where: { id },
    include: {
      stages: { orderBy: { sortOrder: "asc" } },
      quoteRequest: { include: { customer: true, service: true } },
    },
  });
}

export async function getAllTracking() {
  return prisma.orderTracking.findMany({
    include: {
      stages: { orderBy: { sortOrder: "asc" } },
      quoteRequest: { include: { customer: true, service: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function updateStage(
  id: string,
  stage: string,
  note?: string
) {
  const stageIndex = TRACKING_STAGES.findIndex((s) => s.stage === stage);
  const stages = TRACKING_STAGES.map((s, i) => ({
    where: { stage: s.stage },
    data: {
      completed: i <= stageIndex,
      completedAt: i <= stageIndex ? new Date() : null,
      note: i === stageIndex && note ? note : undefined,
    },
  }));

  await prisma.$transaction(
    stages.map((s) =>
      prisma.orderStage.updateMany({
        where: { orderTrackingId: id, stage: s.where.stage },
        data: s.data,
      })
    )
  );

  return prisma.orderTracking.update({
    where: { id },
    data: { currentStage: stage, notes: note || undefined },
    include: { stages: { orderBy: { sortOrder: "asc" } } },
  });
}