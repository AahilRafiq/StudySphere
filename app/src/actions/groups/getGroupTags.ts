'use server'
import { db } from "@/db/db"
import { Tag , GroupTag} from "@/db/schema"
import { actionRes } from "@/types/serverActionResponse"
import { eq } from "drizzle-orm"

export async function getGroupTags(groupID: number):Promise<actionRes<string[]>> {
    let res:actionRes<string[]> = {
        success: undefined,
        message: undefined,
        res: undefined
    }

    try {
        let tags:string[] | {tagname:string}[] = await db
            .select({
                tagname : Tag.name
            })
            .from(Tag)
            .innerJoin(GroupTag , eq(GroupTag.tagId , Tag.id))
            .where(eq(GroupTag.groupId , groupID))

        tags = tags.map(tag => tag.tagname)
        
        res.success = true
        res.res = tags
        return res
    } catch(err) {
        console.log(err);
        res.success = false
        res.message = 'Internal Server Error'
    }
}