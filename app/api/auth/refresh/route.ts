import { createRefreshAuthRouter } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("insforge_refresh_token");
  console.log("[Refresh Route] insforge_refresh_token cookie value:", tokenCookie ? tokenCookie.value : "MISSING");

  const router = createRefreshAuthRouter({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    cookies: cookieStore,
  });

  return router.POST(request);
}
