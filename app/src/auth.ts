import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User } from "@/db/schema"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email : { label: "Email", type: "email" },
            password: {  label: "Password", type: "password" }
        },
        authorize : async (credentials:{email:string , password:string})=> {
            const user = await db.select().from(User).where(eq(User.email , credentials.email))
            if(user) return {
                userID: user[0].id,
                email: user[0].email,
                username: user[0].username,
            }
            return null
        }
    })
  ],
    callbacks: {
        jwt({ token, user }: any) {
            if (user) token = { ...token, id: user.userID , username: user.username , email: user.email }
            return token
        },
        session({ session, token }: any) {
            if (token) session = { ...session, user: { id: token.id, username: token.username , email: token.email } }
            return session
        }
    }
})