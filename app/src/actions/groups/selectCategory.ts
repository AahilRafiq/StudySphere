"use server";
import { db } from "@/db/db";
import { Category } from "@/db/schema";
import { like } from "drizzle-orm";

export async function getExistingCategories(str: string) {
  const input = toTitleCase(str);
  const tags = await db
    .select()
    .from(Category)
    .where(like(Category.name, `%${input}%`))
    .limit(5)
  return tags;
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}
