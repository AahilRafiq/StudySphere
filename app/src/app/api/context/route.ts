import { NextRequest , NextResponse } from "next/server"

const common = 'JS contexts'

export async function GET(req: NextRequest , res: NextResponse) {
    return NextResponse.json({common})
}

export async function POST(req: NextRequest , res: NextResponse) {
    return NextResponse.json({common})
}