"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getChannels } from "@/actions/home/getChannels";
import { useToast } from "../ui/use-toast";
import { displayToast } from "@/lib/helpers/actionResHelpers";
import CreateNewChannel from "@/components/home/CreateNewChannel";
import { MessageCircleMore } from "lucide-react";

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
  }, [params]);

  if (!params || !params.groupID) return null;
  if (loading) return <p className="m-2 p-2">Loading...</p>;
  return (
    <>
      <h2 className="font-bold text-lg ml-2">Channels</h2>
      <div className="grid gap-1 p-2">
        {channels.map((channel) => {
          return (
            <Link
              href={`/home/${channel.groupId}/chats/${channel.id}`}
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-800 hover:text-neutral-50"
              prefetch={false}
            >
              <div className="flex flex-row gap-2 place-items-center">
                <MessageCircleMore strokeWidth={3} absoluteStrokeWidth className="w-4 h-4" />
                {channel.name}
              </div>
            </Link>
          );
        })}

        <CreateNewChannel />
      </div>
    </>
  );
}
