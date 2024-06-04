"use server";
import { db } from "@/db/db";
import { Tag } from "@/db/schema"
import { like } from "drizzle-orm"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"

export async function createNewTag(str: string) {
    const input = str.toLowerCase()
    const existingTag = getFirstRecord(await
        db.select()
        .from(Tag)
        .where(like(Tag.name , input))
        .limit(1)
    )
    
    if(existingTag !== undefined) return null

    const newtag = getFirstRecord(await db.insert(Tag).values({
        name:input
    }).returning())

    return newtag
}

  