// Middleware: protect routes by checking for a `token` cookie.
// Note: Middleware runs on the server and cannot access localStorage.
// Make sure you set a cookie named `token` (e.g., on login) so middleware can read it.
import { NextResponse } from "next/server";

// List protected routes here. Adjust or extend as needed.
const protectedRoutes = ["/middleware"];

export function middleware(req) {
  // Read token from cookies (middleware runs on server)
  const tokenCookie = req.cookies.get("token");
  const isUserAuthenticated = !!(tokenCookie && tokenCookie.value);

  const pathname = req.nextUrl.pathname;

  const shouldProtect = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  if (!isUserAuthenticated && shouldProtect) {
    const redirectUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Tell Next.js which paths this middleware should run for.
// IMPORTANT: `matcher` must be a static array (statically analyzable).
// Update the array below to include your protected routes.
export const config = {
  matcher: ["/middleware"],
};
