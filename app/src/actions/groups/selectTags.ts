"use server"
import { db } from "@/db/db";
import { Tag } from "@/db/schema";
import { like } from "drizzle-orm";

export async function getExistingTags(str: string) {
  const input = str.toLocaleLowerCase()
  const res = await db
    .select()
    .from(Tag)
    .where(like(Tag.name, `%${input}%`))
    .limit(5)
  return res;
}
