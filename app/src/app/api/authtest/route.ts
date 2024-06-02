import { log } from "console"
import { get } from "http"
import { NextApiRequest , NextApiResponse } from "next"
import { decode , getToken } from "next-auth/jwt"
import { NextResponse , NextRequest } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {

    let session = req.cookies.get('authjs.session-token')
    session = await getToken({req , secret: process.env.AUTH_SECRET})
    log(session)

    return NextResponse.json({message: "Hello World"})
}