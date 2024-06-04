import { NextResponse , NextRequest} from "next/server"
import { generateToken } from "@/lib/auth/auth"
import { db } from "@/db/db"
import { User } from "@/db/schema"
import { eq, or } from "drizzle-orm"
import { getFirstRecord } from "@/db/helpers/getFirstRecord"

export async function POST(req: NextRequest , res: NextResponse) {
    
    interface signUpReqBody {
        username: string,
        password: string,
        email: string,
        confirmPass: string
    }
    const {username , password ,email , confirmPass }:signUpReqBody = await req.json()
    if(username.length < 4 || email.length < 4 || password !== confirmPass || password.length < 6) {
        return NextResponse.json({
            success:'false'
        },{ status:401 })
    }

    const exisitngUser = getFirstRecord( await 
        db.select().from(User).where(or(
            eq(User.name , username),
            eq(User.email , email)
        )).limit(1)
    )

    if(exisitngUser) {
        return NextResponse.json({
            success:'false'
        },{ status:409 })
    }

    const newuser = getFirstRecord(await db.insert(User).values({
        name:username,
        password,
        email,
    }).returning())

    const newtoken = generateToken({
        id: newuser.id,
        name: newuser.name
    })

    const response = NextResponse.json({
        success:'true'
    },{ status: 201})
    response.cookies.set('auth_token',newtoken)

    return response
}