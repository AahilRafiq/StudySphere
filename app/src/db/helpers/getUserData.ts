import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/auth";
import { db } from "@/db/db";
import { User } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getFirstRecord } from "./getFirstRecord";

export async function getUserData() {
    const token = cookies().get('auth_token');

    if (!token) {
        return null;
    }

    const user = verifyToken(token.value);
    
    if (!user) {
        return null;
    }
    
    const userData = getFirstRecord(await db.select({name:User.name , email:User.email}).from(User).where(eq(User.id, user.id)))
    return userData;
}