import { db } from "@/db/db";
import { Message } from "@/db/schema";
import { eq, and , sql ,asc } from "drizzle-orm";
import { UserChatRoomView , User } from "@/db/schema";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/auth";

export async function getChatMessages(chatID: number) {
  const token = cookies().get("auth_token");
  const user = verifyToken(token.value);

  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const UserChatRoomPair = await db
      .select()
      .from(UserChatRoomView)
      .where(
        and(
          eq(UserChatRoomView.userID, user.id),
          eq(UserChatRoomView.chatRoomID, chatID)
        )
      );
    if (!UserChatRoomPair || UserChatRoomPair.length === 0) {
      throw new Error("You dont belong to this chat room");
    }

    const messages = await db
      .select({
        id: Message.id,
        username: User.name,
        message: Message.message,
        ownMessage: sql<boolean>`(${Message.userID} = ${user.id})`.as('ownMessage'),
      })
      .from(Message)
      .innerJoin(User , eq(Message.userID , User.id))
      .where(eq(Message.roomID, chatID))
      .orderBy(asc(Message.id));      

    return messages;

  } catch (error) {
    console.log(error);
    throw new Error("An error occured while getting messages");
  }
}
