'use server'
import { Group , GroupTag , Tag , Category } from "@/db/schema";
import { db } from "@/db/db";
import { InferSelectModel } from "drizzle-orm";
import { sql , inArray } from "drizzle-orm";
import { actionRes } from "@/types/serverActionResponse";

type TCategory = InferSelectModel<typeof Category>
type TTag = InferSelectModel<typeof Tag>
type TGroup = InferSelectModel<typeof Group>
interface IFilter {
    category: TCategory[],
    tags: TTag[],
}

export async function findGroups(filters:IFilter , search:string):Promise<actionRes<TGroup[]>> {

    let res:actionRes<TGroup[]> = {
        success: undefined,
        message: undefined,
        res: undefined
    }

    try {
        const q1 = db.select({ field1: GroupTag.groupId })
            .from(GroupTag)
            .where(inArray(GroupTag.tagId, filters.tags.map(tag => tag.id)))
            .as('q1');

        const groups = await db.select()
                       .from(Group)
                       .where(inArray(Group.id, db.select({ field1: q1.field1 }).from(q1)));

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