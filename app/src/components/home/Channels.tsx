"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getChannels } from "@/actions/home/getChannels";
import { useToast } from "../ui/use-toast";
import { displayToast } from "@/lib/helpers/actionResHelpers";

interface IChatRoom {
  id: number;
  groupId: number;
  name: string;
}

export default function () {
  const params = useParams();
  const { toast } = useToast();
  const [channels, setChannels] = useState<IChatRoom[]>([]);
  const groupID = Array.isArray(params.groupID) ? null : params.groupID;
  if (!params.groupID) return null;

  useEffect(() => {
    getChannels(parseInt(groupID)).then((res) => {
      if (res.success) setChannels(res.res);
      else displayToast(toast, res.err);
    });
  }, []);

  return (
    <>
      <h2 className="font-bold ml-4 py-2">Channels</h2>
      <div className="grid gap-1 p-2">
        
        {channels.map((channel) => {
          return (
            <Link
              href={`/home/${channel.groupId}/chats/${channel.id}`}
              className="truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block bg-neutral-900 hover:bg-neutral-900 hover:text-neutral-50"
              prefetch={false}
            >
              {channel.name}
            </Link>
          );
        })}

        <Button className="w-24" size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>
    </>
  );
}
