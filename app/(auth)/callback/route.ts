import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createAuthActions } from "@insforge/sdk/ssr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("insforge_code");
  const next = searchParams.get("next") || "/dashboard";

  const requestUrl = new URL(request.url);
  const loginRedirectUrl = new URL("/login", requestUrl.origin);

  if (!code) {
    loginRedirectUrl.searchParams.set("error", "No authorization code provided");
    return NextResponse.redirect(loginRedirectUrl);
  }

  const cookieStore = await cookies();
  const verifier = cookieStore.get("insforge_code_verifier")?.value;

  const destinationUrl = new URL(next, requestUrl.origin);
  const response = NextResponse.redirect(destinationUrl);

  const authActions = createAuthActions({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    requestCookies: cookieStore as any,
    responseCookies: response.cookies as any,
  });

  const { error } = await authActions.exchangeOAuthCode(code, verifier);

  const cookiesList = response.cookies.getAll();
  console.log("Cookies set in redirect response values:", cookiesList.map(c => `${c.name}=${c.value}`));

  // Clean up the verifier cookie on the redirect response
  response.cookies.delete("insforge_code_verifier");

  if (error) {
    console.error("Server-side OAuth code exchange failed:", error);
    loginRedirectUrl.searchParams.set("error", error.message || "Failed to complete authentication");
    const errorResponse = NextResponse.redirect(loginRedirectUrl);
    errorResponse.cookies.delete("insforge_code_verifier");
    return errorResponse;
  }

  return response;
}
