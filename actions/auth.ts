"use server";

import { createAuthActions } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const cookieStore = await cookies();
  const authActions = createAuthActions({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    cookies: cookieStore,
  });

  await authActions.signOut();
  redirect("/login");
}

export async function signInWithOAuthAction(provider: "google" | "github", redirectTo: string) {
  const cookieStore = await cookies();
  const authActions = createAuthActions({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    cookies: cookieStore,
  });

  const { data, error } = await authActions.signInWithOAuth(provider, {
    redirectTo,
  });

  if (error) {
    return { data: null, error: { message: error.message } };
  }

  if (data?.codeVerifier) {
    cookieStore.set("insforge_code_verifier", data.codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300, // 5 minutes
      path: "/",
    });
  }

  return { data, error: null };
}
