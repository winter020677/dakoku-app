"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { attendances } from "@/db/schema";

export async function clockIn() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("ログインしてね");

  const now = new Date();
  await db.insert(attendances).values({
    userId: session.user.id,
    date: now.toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" }),
    clockIn: now,
  });
}
