"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, Cloud, ChevronRight } from "lucide-react";
import SelectGroup from "@/components/home/SelectGroup";
import Channels from "@/components/home/Channels";

interface IProps {
  isSidebarOpen: boolean;
}

export default function ({ isSidebarOpen }: IProps) {
  return (
    <>
      <div
        className={` md:rounded-r-lg flex flex-col h-full justify-between gap-2  ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="sticky top-0 p-2 w-full">
          <SelectGroup />
          <hr className="border-neutral-700 mt-3 w-full" />
          <Channels />
        </div>

        <div className="m-3 p-3">
          <hr className="border-neutral-700" />
          <Link href="/home/files" className="w-full ">
            <Button className="mt-2 w-full flex flex-row justify-between">
              <div className="flex flex-row gap-2 place-items-center">
                <Cloud fill="#fff" className="h-5 w-5 " />
                <span>Open Files</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

    </>
  );
}
