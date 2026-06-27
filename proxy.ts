import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@insforge/sdk/ssr";

export default async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Create combined CookieStore interface for request cookies
  const requestCookies = {
    get: (name: string) => request.cookies.get(name)?.value,
    set: (name: string, value: string, options: any) => {
      request.cookies.set({ name, value, ...options });
    },
    delete: (name: string) => {
      request.cookies.delete(name);
    }
  };

  // Create combined CookieStore interface for response cookies
  const responseCookies = {
    get: (name: string) => response.cookies.get(name)?.value,
    set: (name: string, value: string, options: any) => {
      response.cookies.set({ name, value, ...options });
    },
    delete: (name: string, options: any) => {
      response.cookies.delete(name);
    }
  };

  console.log(`[Proxy] request path: ${request.nextUrl.pathname}`);
  console.log(`[Proxy] request cookies:`, request.cookies.getAll().map(c => `${c.name}=${c.value ? '[EXISTS]' : '[EMPTY]'}`));

  // Update session & refresh tokens if needed
  const { accessToken } = await updateSession({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    requestCookies: requestCookies as any,
    responseCookies: responseCookies as any,
  });

  console.log(`[Proxy] updateSession output - accessToken: ${accessToken ? '[EXISTS]' : '[EMPTY]'}`);
  console.log(`[Proxy] response cookies:`, response.cookies.getAll().map(c => `${c.name}=${c.value ? '[EXISTS]' : '[EMPTY]'}`));

  const hasSession = !!accessToken;
  const path = request.nextUrl.pathname;

  // Protected and Auth routes configuration
  const protectedRoutes = ["/dashboard", "/profile", "/find-jobs"];
  const isProtected = protectedRoutes.some(route => path.startsWith(route));
  const isAuthPage = path === "/login";

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
