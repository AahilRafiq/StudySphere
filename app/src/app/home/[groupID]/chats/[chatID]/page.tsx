import { Button } from "@/components/ui/button";
import {
  SettingsIcon
} from "lucide-react";
import ChatBubble from "@/components/chats/ChatBubble";
import NewChatSection from "@/components/chats/NewChatSection";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/auth";
import { getChatMessages } from "@/lib/helpers/getChatMessages";
import { db } from "@/db/db";
import { ChatRoom } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getFirstRecord } from "@/db/helpers/getFirstRecord";

interface IParams {
  groupID: string;
  chatID: string;
}

export default async function ({ params }: { params: IParams }) {

  const token = cookies().get('auth_token');
  const user = verifyToken(token.value);

  if (!user) {
    return null;
  }

  const messages = await getChatMessages(parseInt(params.chatID));
  const chatRoomName = getFirstRecord(await db.select().from(ChatRoom).where(eq(ChatRoom.id, parseInt(params.chatID)))).name;

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)]">
      {/* Top bar */}
      <div className="sticky top-0 p-2  border-b-2 items-center justify-between hidden sm:block md:block">
        <div className="flex items-center gap-2 ">
          <div className="flex-1 truncate m-2">
            <div className="font-large text-lg">{chatRoomName}</div>
          </div>

          {/* Channel Settings */}
          <Button variant="ghost">
            <SettingsIcon className="w-5 h-5" />
          </Button>

        </div>
      </div>

      {/* Chats Container */}
      <div className="flex-1 min-h-full overflow-y-auto px-6 py-6">
        <div className="max-w-2xl min-h-full mx-auto flex flex-col items-start gap-8">

          {/* Existing Chat message */}
          {messages.map((message, i) => (
            <ChatBubble
              key={i}
              username={message.username}
              message={message.message}
              ownMessage={message.ownMessage}
            />
          ))
          }

          {/* Fresh Messages */}
           <NewChatSection token={token.value} userID={user.id.toString()} username={user.name} />
        </div>
      </div>


    </div>
  );
}
