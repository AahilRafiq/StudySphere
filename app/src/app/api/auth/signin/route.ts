import { NextResponse , NextRequest} from "next/server"
import { generateToken } from "@/lib/auth/auth"
import { db } from "@/db/db"
import { User } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest , res: NextResponse) {

    interface signInReqBody {
        username:string,
        password:string
    }
    const {username , password}:signInReqBody = await req.json()

    const user = (await db.select().from(User).where(eq(User.name , username)).limit(1))[0]
    if(!user || user.password !== password) {
        return NextResponse.json({
            success:'false'
        },{
            status:401
        })
    }

    const newtoken = generateToken({id:user.id , name:user.name}) 
    const response = NextResponse.json({
            success:'true'
        },{
            status:200
        }
    )
    response.cookies.set('auth_token',newtoken)

    return response
}