import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpIcon,
  MoveHorizontalIcon,
  UsersIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";

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
        <div className="flex items-center gap-2">
          <Avatar className="border w-8 h-8">
            <img src="/placeholder.svg" alt="Image" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <div className="font-medium text-sm">General</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              12 online
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoveHorizontalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <UsersIcon className="w-4 h-4 mr-2" />
                View members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="w-4 h-4 mr-2" />
                Channel settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2Icon className="w-4 h-4 mr-2" />
                Leave channel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chats Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto flex flex-col items-start gap-8">
          {/* Chat message */}
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="border w-8 h-8">
              <img src="/placeholder.svg" alt="Image" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-bold">John Doe</div>
              <div className="prose prose-stone text-sm">
                <p>Hey everyone, how's it going?</p>
              </div>
            </div>
          </div>

          {/* Chat message */}
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
