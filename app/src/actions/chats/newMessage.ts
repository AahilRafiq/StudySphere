'use server'

import { cookies } from "next/headers"
import { db } from "@/db/db"
import { eq , and } from "drizzle-orm"
import { UserChatRoomView, Message } from "@/db/schema"
import { verifyToken } from "@/lib/auth/auth"
import { actionResponseObj } from "@/lib/helpers/actionResHelpers"
import { actionRes } from "@/types/serverActionResponse"

export default async function insertNewMessageToDB(chatRoomID:number , message:string):Promise<actionRes<string>> {
  const token = cookies().get('auth_token')
  const user = verifyToken(token.value)

  try {
    if(!user) {
      return actionResponseObj(false, "User not authenticated")
    }

    const UserChatRoomPair = await db.select().from(UserChatRoomView).where(and(eq(UserChatRoomView.userID , user.id) , eq(UserChatRoomView.chatRoomID , chatRoomID)))
    if(!UserChatRoomPair || UserChatRoomPair.length === 0) {
      return actionResponseObj(false, "You dont belong to this chat room")
    }

    await db.insert(Message).values({
        message,
        roomID: chatRoomID,
        userID: user.id
    })

    return actionResponseObj(true)

  } catch (error) {
    console.log(error)
    return actionResponseObj(false, "An error occured while sending message")
  }
}