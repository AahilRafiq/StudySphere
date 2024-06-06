"use server";
import { db } from "@/db/db";
import { Category , User } from "@/db/schema"
import { InferInsertModel, like } from "drizzle-orm"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"
import type { actionRes } from "@/types/serverActionResponse";

type TCategory = InferInsertModel<typeof Category>

export async function createNewCategory(str: string):Promise<actionRes<TCategory>> {

    const res: actionRes<TCategory> = {
        success: undefined,
        message: undefined,
        res: undefined
    }

    try {
        const input = toTitleCase(str)
        const existingCategory = getFirstRecord(await
            db.select()
            .from(Category)
            .where(like(Category.name , input))
            .limit(1)
        )
        
        if(existingCategory !== undefined) {
            res.success = false
            res.message = 'Category already exists!'
        }
    
        const newCatergory = getFirstRecord(await db.insert(Category).values({
            name:input
        }).returning())
    
        res.success = true
        res.res = newCatergory
        return res
        
    } catch(err) {
        console.log(err)
        res.success = false
        res.message = 'Interal server error'
        return res
    }
}

function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
  }
  