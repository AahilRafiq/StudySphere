"use server";
import { db } from "@/db/db";
import { Tag } from "@/db/schema"
import { like , InferInsertModel } from "drizzle-orm"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"
import type { actionRes } from "@/types/serverActionResponse";

type TTag = InferInsertModel<typeof Tag>

export async function createNewTag(str: string):Promise<actionRes<TTag>> {
    let res: actionRes<TTag> = {
        success : undefined,
        message : undefined,
        res : undefined
    }

    const input = str.toLowerCase()

    try {
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

        res.success = true
        res.res = newtag
        return res
    } catch(err) {
        console.log(err)
        res.success = false
        res.message = 'Internal Server Error!'
        return res
    }
}

  