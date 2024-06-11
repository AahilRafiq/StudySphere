"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, Cloud } from "lucide-react";
import SelectGroup from "@/components/home/SelectGroup";
import Channels from "@/components/home/Channels";

interface IProps {
  isSidebarOpen: boolean;
}

export default function ({ isSidebarOpen }: IProps) {
  return (
    <>
      <div
        className={`bg-neutral-900 md:rounded-r-lg flex flex-col gap-2 text-white ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="sticky top-0 p-2">
          <SelectGroup />
        </div>

        <hr className="border-neutral-700" />

        <div>

          <Channels/>

          <hr className="border-neutral-700" />
          <h2 className="font-bold text-lg ml-2 py-2">Files</h2>
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
