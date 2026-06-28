import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (!isAdmin) {
    return NextResponse.next();
  }

  if (!hasSupabaseEnv()) {
    return isLogin ? NextResponse.next() : NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLogin) {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies
    .getAll()
    .some(({ name }) => name.startsWith("sb-") && name.includes("-auth-token"));

  if (!hasSessionCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
