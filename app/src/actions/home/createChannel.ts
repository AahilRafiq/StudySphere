'use server'

import { actionResponseObj } from "@/lib/helpers/actionResHelpers"
import { cookies } from "next/headers"
import { db } from "@/db/db"
import { UserGroup ,ChatRoom } from "@/db/schema"
import { verifyToken } from "@/lib/auth/auth"
import { eq ,and} from "drizzle-orm"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"
import { InferInsertModel } from "drizzle-orm"

type TChatRoom = InferInsertModel<typeof ChatRoom>

export async function createChannel(groupID: number , name: string) {
    const token = cookies().get('auth_token')
    if(!token) return actionResponseObj<TChatRoom>(false,'Unauthorized')

    try {
        const user = verifyToken(token.value)

        // Check if the user belongs to the group
        const usergroup = await db.select().from(UserGroup).where(
            and(
                eq(UserGroup.userId , user.id),
                eq(UserGroup.groupId , groupID)
            )
        )
        if(usergroup.length === 0) {
            return actionResponseObj<TChatRoom>(false,'You Dont Belong to this Group')
        }

        const newChannel = getFirstRecord(await db.insert(ChatRoom).values({
            groupId: groupID,
            name: name
        }).returning())

        return actionResponseObj(true,'',newChannel)

    } catch(err) {
        console.log(err);
        return actionResponseObj<TChatRoom>(false,'Internal Server Error')
    }
}
