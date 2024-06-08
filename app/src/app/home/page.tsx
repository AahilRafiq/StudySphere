"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-[calc(100vh-4rem)] w-full">
      <div
        className={`bg-neutral-950 flex flex-col gap-2 text-white ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="sticky top-0 p-2">
          <Button
            variant="ghost"
            className="w-full text-left px-2 justify-start p hover:bg-neutral-900 hover:text-neutral-50 gap-2"
          >
            <div className="rounded-full bg-white text-black flex items-center justify-center w-7 h-7">
              <BotIcon className="h-4 w-4" />
            </div>
            <div className="grow text-ellipsis overflow-hidden whitespace-nowrap text-sm">
              Channels
            </div>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
          <div className="grid gap-1 p-2">
            <Link
              href="#"
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block bg-neutral-900 hover:bg-neutral-900 hover:text-neutral-50"
              prefetch={false}
            >
              General
            </Link>
            <Link
              href="#"
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
              prefetch={false}
            >
              Announcements
            </Link>
            <Link
              href="#"
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
              prefetch={false}
            >
              Random
            </Link>
            <Link
              href="#"
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
              prefetch={false}
            >
              Design
            </Link>
            <Link
              href="#"
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50"
              prefetch={false}
            >
              Engineering
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-[calc(100vh-4rem)]">
        <div className="sticky top-0 p-2 bg-white dark:bg-gray-950 shadow-sm flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="w-4 h-4" />
          </Button>
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
        
        {/* the div that displays chats */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto flex flex-col items-start gap-8">
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
    </div>
  );
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M4 15h4" />
      <path d="M16 15h4" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-.98 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-.99-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-.98H3a2 2 0 0 1 0-4h.09c.7 0 1.34-.39 1.51-.99a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.48.48 1.18.63 1.82.33.62-.26.99-.88.99-1.51V3a2 2 0 0 1 4 0v.09c0 .7.39 1.34.99 1.51.64.27 1.34.14 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.48.48-.63 1.18-.33 1.82.26.62.88.99 1.51.99H21a2 2 0 0 1 0 4h-.09c-.7 0-1.34.39-1.51.99z" />
    </svg>
  );
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M21 6l-1-2H4l-1 2" />
      <path d="M12 2l-1 2h2l-1-2" />
    </svg>
  );
}
