'use server'

import { actionResponseObj } from "@/lib/helpers/actionResHelpers"
import { cookies } from "next/headers"
import { db } from "@/db/db"
import { Group , UserGroup } from "@/db/schema"
import { verifyToken } from "@/lib/auth/auth"
import { eq } from "drizzle-orm"

interface IGroup {
    id:number,
    name:string
}

export async function getGroups() {
    const token = cookies().get("auth_token")
    if(!token) {
        return actionResponseObj<IGroup[]>(false,'Unauthorized')
    }

    try {
        const user = verifyToken(token.value)
        const data = await db
            .select()
            .from(Group)
            .innerJoin(UserGroup, eq(Group.id, UserGroup.groupId))
            .where(eq(UserGroup.userId, user.id))
            .execute();

        let groups = data.map(val => {
            return {
                id: val.Group.id,
                name: val.Group.name
            }
        })

        return actionResponseObj(true,'',groups)

    } catch(err) {
        console.log(err);
        return actionResponseObj<IGroup[]>(false,'Internal Server Error!')
    }
}