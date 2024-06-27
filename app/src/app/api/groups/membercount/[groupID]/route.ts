import { db } from "@/db/db";
import { UserGroup } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { NextRequest , NextResponse } from "next/server";
import { getFirstRecord } from "@/db/helpers/getFirstRecord";

export async function GET(req: NextRequest , {params}:{params:{groupID:string}} ) {

    try {
        const memberCount = getFirstRecord(await db.select({
            count: count(UserGroup.userId)
        })
        .from(UserGroup)
        .where(eq(UserGroup.groupId , parseInt(params.groupID))))

        return NextResponse.json(memberCount.count , {status:200})

    } catch(err) {
        console.log(err.message);
        return NextResponse.json({error:err} , {status:500})
    }
}