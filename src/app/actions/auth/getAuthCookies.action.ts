"use server";

import { cookies } from "next/headers";

export async function getAuthCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token") || null;
  return token?.value;
}
