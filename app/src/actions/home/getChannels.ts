'use server'

import { actionResponseObj } from "@/lib/helpers/actionResHelpers"
import { cookies } from "next/headers"
import { db } from "@/db/db"
import { UserGroup ,ChatRoom } from "@/db/schema"
import { verifyToken } from "@/lib/auth/auth"
import { eq ,and} from "drizzle-orm"

interface IChatRoom {
    id: number,
    groupId: number
    name: string,
}

export async function getChannels(groupID: number) {
    const token = cookies().get('auth_token')
    if(!token) return actionResponseObj<IChatRoom[]>(false,'Unauthorized')

    try {
        const user = verifyToken(token.value)

        const usergroup = await db.select().from(UserGroup).where(
            and(
                eq(UserGroup.userId , user.id),
                eq(UserGroup.groupId , groupID)
            )
        )

        if(usergroup.length === 0) {
            return actionResponseObj<IChatRoom[]>(false,'You Dont Belong to this Group')
        }

        const channels = await db.select().from(ChatRoom).where(eq(ChatRoom.groupId,groupID))
        return actionResponseObj(true,'',channels)

    } catch(err) {
        console.log(err);
        return actionResponseObj<IChatRoom[]>(false,'Internal Server Error')
    }
}
