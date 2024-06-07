"use server";

import { signIn } from "@/lib/auth";

export default async function SocialSignIn(provider: string) {
  await signIn(provider, { redirectTo: "/dashboard" });
}
