'use server'
import { db } from "@/db/db";
import { UserGroup } from "@/db/schema";
import { actionRes } from "@/types/serverActionResponse";
import { count, eq , sql} from "drizzle-orm";
import { getFirstRecord } from "@/db/helpers/getFirstRecord";

export async function getMembersCount(groupID:number):Promise<actionRes<number>> {

    let res:actionRes<number> = {
        success: undefined,
        message: undefined,
        res: undefined
    }

    try {
        const memberCount = getFirstRecord(await db.select({
            count: count(UserGroup.userId)
        })
        .from(UserGroup)
        .where(eq(UserGroup.groupId , groupID)))

        res.success = true
        res.res = memberCount.count
        return res
    } catch(err) {
        res.success = false
        res.message = 'Internal Server Error'
        return res
    }
}