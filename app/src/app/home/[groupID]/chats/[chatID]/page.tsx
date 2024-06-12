import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowUpIcon,
  MoveHorizontalIcon,
  UsersIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import ChatBubble from "@/components/chats/ChatBubble";

import { Textarea } from "@/components/ui/textarea";

interface IProps {
  params: {
    groupID: string;
    chatID: string;
  };
}
export default async function ({ params }:IProps) {  

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
          {/* /* Chat message */ }
          <ChatBubble username="John Doe" message="Hey everyone, how's it going?" />
          <div className="flex items-start md:max-w-md max-w-xs bg-slate-200 rounded-3xl p-4 gap-4 justify-start">
            <div className="grid gap-1">
              <div className="font-bold text-sm">John Doe</div>
              <div>
                <pre className="text-wrap font-sans">Hey everyone, howasdfasdfa sdfasdfasdfasdfaffff fffffffffffffffffffffff ffsdfasdfasdfasdf's it going?</pre>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 ml-auto justify-end">
            <div className="grid gap-1">
              <div className="font-bold text-right">Sarah Anderson</div>
              <div className="prose prose-stone text-sm">
                <p>Doing great, thanks for asking!</p>
              </div>
            </div>
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">Michael Johnson</div>
              <div className="prose prose-stone text-sm">
                <p>Excited for the team meeting later!</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">Michael Johnson</div>
              <div className="prose prose-stone text-sm">
                <p>Excited for the team meeting later!</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">Michael Johnson</div>
              <div className="prose prose-stone text-sm">
                <p>Excited for the team meeting later!</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">Michael Johnson</div>
              <div className="prose prose-stone text-sm">
                <p>Excited for the team meeting later!</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">Michael Johnson</div>
              <div className="prose prose-stone text-sm">
                <p>Excited for the team meeting later!</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">Michael Johnson</div>
              <div className="prose prose-stone text-sm">
                <p>Excited for the team meeting later!</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 ml-auto justify-end">
            <div className="grid gap-1">
              <div className="font-bold text-right">Emily Martinez</div>
              <div className="prose prose-stone text-sm">
                <p>Can't wait to discuss the new project proposal.</p>
              </div>
            </div>
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
          </div>
          {/* Repeat more chat messages as needed */}
        </div>
      </div>

      {/* Chat Input */}
      <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-white dark:bg-gray-950">
        <div className="relative">
          <Textarea
            placeholder="Message #general"
            name="message"
            id="message"
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 dark:border-gray-800"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-3 right-3 w-8 h-8"
            disabled
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="text-xs text-center text-neutral-700 font-medium">
          Be kind and respectful in your messages.
        </p>
      </div>
    </div>
  );
}
