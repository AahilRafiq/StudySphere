'use server'
import { db } from "@/db/db"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"
import { Group , GroupTag } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
interface ICategory {
    id: number,
    name: string
}
interface ITag {
    id: number,
    name: string
}

interface IGroupTag {
    groupId:number,
    tagId:number
}

export async function createNewGroup(title:string , description:string , category:ICategory , tags:ITag[]) {
    
    const existingGroup = getFirstRecord(await db.select().from(Group).where(eq(Group.name,title)).limit(1))
    if(existingGroup) return false
    
    try {
        const newGroup = getFirstRecord(await 
            db.insert(Group).values({
                name:title,
                categoryId:category.id,
                description
            }).returning()
        )
        // Link Tags to group
        const groupTags:IGroupTag[] = tags.map(tag => {
            return {
                groupId : newGroup.id,
                tagId : tag.id
            }
        })
        await db.insert(GroupTag).values(groupTags)
        return true
    } catch (err) {
        console.log(err);
        return null
    }
}