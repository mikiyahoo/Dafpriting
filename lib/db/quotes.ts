import { prisma } from "@/lib/prisma";
import type { QuoteStatus } from "@/types/quote";

/**
 * Generate a unique quote number: QR-YYYYMMDD-XXXX
 */
export async function generateQuoteNumber(): Promise<string> {
  const now = new Date();
  const datePart =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const count = await prisma.quoteRequest.count({
    where: {
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      },
    },
  });

  return `QR-${datePart}-${String(count + 1).padStart(4, "0")}`;
}

/**
 * Create a new quote request
 */
export async function createQuoteRequest(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceId: string;
  quantity: number;
  size: string;
  material: string;
  notes?: string;
}) {
  const quoteNumber = await generateQuoteNumber();

  // Find or create customer
  let customer = await prisma.customer.findUnique({
    where: { email: data.email },
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company ?? null,
      },
    });
  } else {
    // Update existing customer info
    customer = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        name: data.name,
        phone: data.phone,
        company: data.company ?? null,
      },
    });
  }

  // Create quote request
  const quote = await prisma.quoteRequest.create({
    data: {
      quoteNumber,
      customerId: customer.id,
      serviceId: data.serviceId,
      quantity: data.quantity,
      size: data.size,
      material: data.material,
      notes: data.notes ?? null,
    },
    include: {
      customer: true,
      service: true,
      files: true,
    },
  });

  return quote;
}

/**
 * Get all quote requests with pagination
 */
export async function getQuotes(params: {
  status?: QuoteStatus;
  page?: number;
  limit?: number;
  search?: string;
}) {
  const { status, page = 1, limit = 20, search } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { customer: { name: { contains: search, mode: "insensitive" } } },
      { customer: { email: { contains: search, mode: "insensitive" } } },
      { quoteNumber: { contains: search, mode: "insensitive" } },
    ];
  }

  const [quotes, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      include: {
        customer: true,
        service: true,
        files: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.quoteRequest.count({ where }),
  ]);

  return {
    quotes,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get a single quote by ID
 */
export async function getQuoteById(id: string) {
  return prisma.quoteRequest.findUnique({
    where: { id },
    include: {
      customer: true,
      service: true,
      files: true,
      assignedUser: {
        select: { id: true, name: true, email: true },
      },
    },
  });
}

/**
 * Update quote status
 */
export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus,
  quotedPrice?: number,
  validUntil?: Date
) {
  return prisma.quoteRequest.update({
    where: { id },
    data: {
      status,
      ...(quotedPrice !== undefined && { quotedPrice }),
      ...(validUntil && { validUntil }),
    },
    include: {
      customer: true,
      service: true,
      files: true,
    },
  });
}

/**
 * Assign quote to a user
 */
export async function assignQuote(quoteId: string, userId: string) {
  return prisma.quoteRequest.update({
    where: { id: quoteId },
    data: { assignedTo: userId },
  });
}