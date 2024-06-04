"use server";
import { db } from "@/db/db";
import { Category } from "@/db/schema"
import { like } from "drizzle-orm"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"

export async function createNewCategory(str: string) {
    const input = toTitleCase(str)
    const existingCategory = getFirstRecord(await
        db.select()
        .from(Category)
        .where(like(Category.name , input))
        .limit(1)
    )
    
    if(existingCategory !== undefined) return null

    const newCatergory = getFirstRecord(await db.insert(Category).values({
        name:input
    }).returning())

    return newCatergory
}

function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
  }
  