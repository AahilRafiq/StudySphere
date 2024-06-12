import { Button } from "@/components/ui/button";
import {
  SettingsIcon
} from "lucide-react";
import ChatBubble from "@/components/chats/ChatBubble";
import NewChatSection from "@/components/chats/NewChatSection";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/auth";

export default async function () {  

  const token = cookies().get('auth_token');
  const user = verifyToken(token.value);

  if(!user) {
    return null;
  }

  return (
    <div className="flex flex-col max-h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="sticky top-0 p-2 bg-white dark:bg-gray-950 shadow-sm items-center justify-between hidden sm:block md:block">
        <div className="flex items-center gap-2 ">
          <div className="flex-1 truncate m-2">
            <div className="font-large text-lg">General</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              12 online
            </div>
          </div>

          {/* Channel Settings */}
          <Button variant="ghost">
            <SettingsIcon className="w-5 h-5" />
          </Button>
          
        </div>
      </div>

      {/* Chats Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto flex flex-col items-start gap-8">
          {/* Existing Chat message */ }
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" />
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" />
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" ownMessage={true}/>
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" />
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" />
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" ownMessage={true}/>

          {/* Fresh Messages */}
          <NewChatSection token={token.value} userID={user.id.toString()} username={user.name}/>
        </div>
      </div>

      
    </div>
  );
}
