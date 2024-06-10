"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, BotIcon, ChevronDown, Cloud } from "lucide-react";
import SelectGroup from "@/components/home/SelectGroup";

export default function ({ isSidebarOpen }) {
  return (
    <>
      <div
        className={`bg-neutral-950 flex flex-col gap-2 text-white ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="sticky top-0 p-2">
          {/* <Button
            variant="ghost"
            className="w-full text-left px-2 justify-start p hover:bg-neutral-900 hover:text-neutral-50 gap-2"
          >
            <div className="rounded-full bg-white text-black flex items-center justify-center w-7 h-7">
              <BotIcon className="h-4 w-4" />
            </div>
            <div className="grow text-ellipsis overflow-hidden whitespace-nowrap text-sm">
              Group
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button> */}
          <SelectGroup />
        </div>

        <div >
          <h2 className="font-bold ml-4 py-2">Channels</h2>
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
            <Button className="w-24" size="sm">
              <PlusIcon className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <hr className="border-neutral-700" />
          <h2 className="font-bold ml-2 py-2">Files</h2>
          <Link href="/home/files">
            <Button variant="ghost">
              <Cloud className="h-4 w-4 mr-1" />
              Open Files
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
