import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export type Role = "SUPER_ADMIN" | "ADMIN" | "STAFF";

/**
 * Verifies that the current session has an authenticated admin user.
 * Returns the session if authorized, or a 401 Response if not.
 */
export async function requireAdmin(roles?: Role[]) {
  const session = await auth();

  if (!session?.user) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (roles && session.user.role) {
    const userRole = session.user.role as Role;
    if (!roles.includes(userRole)) {
      return {
        session: null,
        errorResponse: NextResponse.json(
          { error: "Forbidden: insufficient permissions" },
          { status: 403 }
        ),
      };
    }
  }

  return { session, errorResponse: null };
}