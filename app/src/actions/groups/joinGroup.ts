'use server'

import { db } from "@/db/db"
import { UserGroup } from "@/db/schema"
import { actionRes } from "@/types/serverActionResponse"
import { userRole } from "@/types/userRoleEnum"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth/auth"

export async function joinGroup(groupId: number):Promise<actionRes> {
    let res:actionRes = {
        success: undefined,
        message: undefined
    }
    const token = cookies().get('auth_token')

    try {
        const user = verifyToken(token.value)
        await db.insert(UserGroup).values({
            userId: user.id,
            groupId,
            role: userRole.member
        })
        res.success = true
        return res

    } catch(err) {

        console.log(res)
        res.success = false
        res.message = 'Internal Server Error'
        return res
    }    
}