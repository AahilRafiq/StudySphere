'use server'
import { Group , GroupTag , Tag ,  } from "@/db/schema";
import { db } from "@/db/db";
import { InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import Category from "@/components/groups/new/Category";
import { actionRes } from "@/types/serverActionResponse";

type TGroup = InferSelectModel<typeof Group>

export async function findGroups():Promise<actionRes<TGroup[]>> {

    let res:actionRes<TGroup[]> = {
        success: undefined,
        message: undefined,
        res: undefined
    }

    try {
        const groups = await db.select().from(Group).limit(15)
        
        res.success = true
        res.res = groups
        return res
    } catch(err) {
        console.log(err);
        res.success = false
        res.message = 'Internal Server Error'
        return res
    }
}