'use server'
import { db } from "@/db/db"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"
import { Category, Group , GroupTag , Tag, UserGroup } from "@/db/schema"
import { InferInsertModel } from "drizzle-orm"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth/auth"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import type { actionRes } from "@/types/serverActionResponse"
import { userRole } from "@/types/userRoleEnum"

type TCategory = InferInsertModel<typeof Category>
type TTag = InferInsertModel<typeof Tag>
type TGroupTag = InferInsertModel<typeof GroupTag>

export async function createNewGroup(title:string , description:string , category:TCategory , tags:TTag[]):Promise<actionRes> {
    
    let res: actionRes = {
        success : undefined,
        message : undefined,
        res : undefined
    }

    const authToken = cookies().get('auth_token')
    if(!validate.cookie(authToken)) {
        res.success = false,
        res.message = 'Not logged in'
    }
    
    /********** Input validation **********/ 
    if(!validate.title(title)) {
        res.success = false
        res.message = 'Title length should be atleast 4'
        return res
    }
    if(!validate.category(category)) {
        res.success = false
        res.message = 'Please select atleast one category'
        return res
    }
    if(!validate.tags(tags)) {
        res.success = false
        res.message = 'Select atleast 3 tags'
        return res
    }
    if(!validate.description(description)) {
        res.success = false
        res.message = 'Description length should be atleast 10'
        return res
    }
    
    /******* Update in DB **********/ 
    try {
        const existingGroup = getFirstRecord(await db.select().from(Group).where(eq(Group.name,title)).limit(1))
        if(existingGroup) {
            res.success = false
            res.message = 'Group already exists'
        }

        const user = verifyToken(authToken.value)
        const newGroup = getFirstRecord(await 
            db.insert(Group).values({
                name:title,
                categoryId:category.id,
                description
            }).returning()
        )
        const groupTags:TGroupTag[] = tags.map(tag => {
            return {
                groupId : newGroup.id,
                tagId : tag.id
            }
        })
        await db.insert(GroupTag).values(groupTags)
        await db.insert(UserGroup).values({
            role: userRole.creater,
            groupId: newGroup.id,
            userId: user.id
        })
        
        res.success = true
        return res
    } catch (err) {
        console.log(err)
        res.success = false
        res.message = 'Interval Server Error'
        return res
    }
}

const validate = {
    title(s: string) {
        return s.length >= 4
    },
    description(s: string) {
        return s.length >= 10
    },
    category(c: TCategory) {
        return (c !== undefined)
    },
    tags(t: TTag[]) {
        return (t && t.length >= 3)
    },
    cookie(c: RequestCookie) {
        return (c !== undefined)
    }
}