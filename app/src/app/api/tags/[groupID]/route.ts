import { db } from "@/db/db"
import { Tag , GroupTag} from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest , NextResponse } from "next/server"

export async function GET(request: NextRequest , {params}:{params : {groupID : string}}) {

    try {
        let tags:string[] | {tagname:string}[] = await db
            .select({
                tagname : Tag.name
            })
            .from(Tag)
            .innerJoin(GroupTag , eq(GroupTag.tagId , Tag.id))
            .where(eq(GroupTag.groupId , parseInt(params.groupID)))

        tags = tags.map(tag => tag.tagname)

        return NextResponse.json(tags , {status:200})
    } catch(err) {
        return NextResponse.json({error:err} , {status:500})
    }
}