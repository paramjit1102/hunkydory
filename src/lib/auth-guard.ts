import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, getSessionCookieName, SessionPayload } from "./auth";
import { Role } from "./types";

export interface AuthCheckResult {
  authorized: boolean;
  user?: SessionPayload;
  response?: NextResponse;
}

/**
 * Extracts and verifies the current session user from request headers or cookies.
 */
export async function getSessionUser(request?: Request): Promise<SessionPayload | null> {
  try {
    // 1. Check if middleware already verified and attached headers
    if (request) {
      const headerUserId = request.headers.get("x-user-id");
      const headerUserEmail = request.headers.get("x-user-email");
      const headerUserRole = request.headers.get("x-user-role");
      const headerUserName = request.headers.get("x-user-name");

      if (headerUserId && headerUserRole && headerUserEmail) {
        return {
          userId: headerUserId,
          email: headerUserEmail,
          role: headerUserRole as Role,
          name: headerUserName || "User"
        };
      }
    }

    // 2. Read from session cookie
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    if (!token) return null;

    return await verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Enforces Authentication and Role-Based Authorization.
 * If authentication fails, returns { authorized: false, response: 401 }.
 * If role is insufficient, returns { authorized: false, response: 403 }.
 */
export async function requireAuth(
  request?: Request,
  allowedRoles?: Role[]
): Promise<AuthCheckResult> {
  const user = await getSessionUser(request);

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Authentication required. Please log in with authorized staff credentials."
        },
        { status: 401 }
      )
    };
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return {
        authorized: false,
        user,
        response: NextResponse.json(
          {
            success: false,
            error: `Access Denied: Your role (${user.role}) does not have permission to perform this action. Required role: ${allowedRoles.join(" or ")}.`
          },
          { status: 403 }
        )
      };
    }
  }

  return { authorized: true, user };
}
