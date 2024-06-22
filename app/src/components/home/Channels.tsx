"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getChannels } from "@/actions/home/getChannels";
import { useToast } from "../ui/use-toast";
import { displayToast } from "@/lib/helpers/actionResHelpers";
import CreateNewChannel from "@/components/home/CreateNewChannel";
import { ChevronRightIcon } from "lucide-react";

interface IChatRoom {
  id: number;
  groupId: number;
  name: string;
}


export default function () {
  const params = useParams();
  const { toast } = useToast();
  const [channels, setChannels] = useState<IChatRoom[]>([]);
  const [loading, setIsLoading] = useState(true);
  const groupID = Array.isArray(params.groupID) ? null : params.groupID;

  useEffect(() => {
    if (!params || !params.groupID) return;
    setIsLoading(true);
    getChannels(parseInt(groupID)).then((res) => {
      if (res.success) setChannels(res.res);
      else displayToast(toast, res.err);
      setIsLoading(false);
    });
  }, [params.groupID]);

  if (!params || !params.groupID) return null;
  if (loading) return <p className="m-2 p-2">Loading...</p>;
  return (
    <>
      <div className="grid gap-1 p-2">
        {channels.map((channel,index) => {
          return (
            <Link
              key={channel.id}
              href={`/home/${channel.groupId}/chats/${channel.id}`}
              className="truncate overflow-hidden flex-1 text-md transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-gray-600 hover:text-neutral-50"
              prefetch={false}
            >
              <div className="flex justify-between text-white flex-row gap-3 place-items-center">
                <div className="flex flex-row place-items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${colors[index]}`} />
                  {channel.name}
                </div>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            </Link>
          );
        })}

        <CreateNewChannel />
      </div>
    </>
  );
}


const colors = [
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-pink-500",
];