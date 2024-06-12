import { NextRequest } from "next/server"
import { authMiddleware } from "./middlewares/authMiddleware"
import { protectRoute } from "./middlewares/protectRouteMiddleware"

export function middleware(req: NextRequest) {
    const route = req.nextUrl.pathname
    if(route.startsWith('/auth')) return authMiddleware(req)
    if(route.startsWith('/groups')) return protectRoute(req)
    if(route.startsWith('/home')) return protectRoute(req)
}