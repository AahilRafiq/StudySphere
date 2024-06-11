"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, Cloud } from "lucide-react";
import SelectGroup from "@/components/home/SelectGroup";

interface IProps {
  isSidebarOpen: boolean;
}

export default function ({ isSidebarOpen }: IProps) {

  return (
    <>
      <div
        className={`bg-neutral-950 flex flex-col gap-2 text-white ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="sticky top-0 p-2">
          <SelectGroup />
        </div>

        <div>
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
